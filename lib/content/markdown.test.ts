import { describe, expect, it } from 'vitest'
import { renderArticle, renderMarkdown, slugifyHeading, youTubeId } from './markdown'

const html = (md: string, locale: 'en' | 'ar' = 'en') => renderMarkdown(md, { locale })

describe('renderMarkdown: formatting the old renderer got wrong', () => {
  it('renders * bullets as a list, not literal asterisks', () => {
    const out = html('* first\n* second')
    expect(out).toContain('<ul>')
    expect(out).toContain('<li>first</li>')
    expect(out).not.toContain('* first')
  })

  it('renders #### as a heading', () => {
    expect(html('#### Small heading')).toContain('<h4>Small heading</h4>')
  })

  it('demotes a body # heading so the page keeps a single h1', () => {
    const out = html('# Title inside the body')
    expect(out).not.toContain('<h1')
    expect(out).toMatch(/<h2 id="title-inside-the-body">Title inside the body<\/h2>/)
  })

  it('wraps a heading followed by text into a heading and a paragraph', () => {
    expect(html('### Question?\nThe answer.')).toMatch(/<h3[^>]*>Question\?<\/h3>\s*<p>The answer.<\/p>/)
  })

  it('renders tables inside a scroll wrapper', () => {
    const out = html('| Plan | Price |\n| --- | --- |\n| Basic | 40 SAR |')
    expect(out).toContain('<div class="table-wrap"><table>')
    expect(out).toContain('<th>Plan</th>')
    expect(out).toContain('<td>40 SAR</td>')
  })

  it('renders images lazily', () => {
    expect(html('![Dashboard](/images/dash.png)')).toContain(
      '<img src="/images/dash.png" alt="Dashboard" loading="lazy" decoding="async">',
    )
  })

  it('keeps the summary blockquote', () => {
    expect(html('> A short answer.')).toContain('<blockquote>\n<p>A short answer.</p>\n</blockquote>')
  })
})

describe('renderMarkdown: links', () => {
  it('opens external links in a new tab', () => {
    expect(html('[Ejar](https://www.ejar.sa/)')).toContain(
      '<a href="https://www.ejar.sa/" target="_blank" rel="noopener noreferrer">Ejar</a>',
    )
  })

  it('keeps internal links in the same tab and adds the trailing slash', () => {
    const out = html('[Owners](/owners)')
    expect(out).toContain('<a href="/owners/">Owners</a>')
    expect(out).not.toContain('target=')
  })

  it('treats absolute links to our own site as internal', () => {
    expect(html('[Home](https://accez.cloud/blog/x)')).toContain('<a href="/blog/x/">Home</a>')
  })

  it('localises internal links on Arabic pages', () => {
    expect(html('[المالكون](/owners)', 'ar')).toContain('<a href="/ar/owners/">المالكون</a>')
  })

  it('refuses javascript: links', () => {
    expect(html('[x](javascript:alert(1))')).not.toContain('href="javascript:')
  })
})

describe('renderMarkdown: safety', () => {
  it('escapes raw HTML instead of rendering it', () => {
    const out = html('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>')
    expect(out).not.toContain('<script>')
    expect(out).not.toContain('<img src=x')
    expect(out).toContain('&lt;script&gt;')
  })
})

describe('renderMarkdown: headings', () => {
  it('gives repeated headings unique ids', () => {
    const out = html('## FAQ\n\n## FAQ')
    expect(out).toContain('<h2 id="faq">')
    expect(out).toContain('<h2 id="faq-2">')
  })

  it('keeps Arabic heading text in ids', () => {
    expect(html('## الأسئلة الشائعة')).toContain('<h2 id="الأسئلة-الشائعة">')
  })

  it('slugifies punctuation away', () => {
    expect(slugifyHeading('What Is RevPAR? (And Why It Matters)')).toBe('what-is-revpar-and-why-it-matters')
  })
})

describe('renderMarkdown: video', () => {
  it('embeds a paragraph that is only a YouTube link, keeping the link', () => {
    const out = html('[Watch: Create units](https://youtu.be/YYPe_ZtuYWc?si=abc)')
    expect(out).toContain('<iframe src="https://www.youtube-nocookie.com/embed/YYPe_ZtuYWc"')
    expect(out).toContain('title="Watch: Create units"')
    expect(out).toContain('loading="lazy"')
    expect(out).toMatch(/<figcaption><a href="https:\/\/youtu.be\/YYPe_ZtuYWc\?si=abc"[^>]*>Watch: Create units<\/a><\/figcaption><\/figure>/)
  })

  it('leaves a YouTube link inside a sentence as a normal link', () => {
    const out = html('See [the video](https://youtu.be/YYPe_ZtuYWc) for details.')
    expect(out).not.toContain('<iframe')
    expect(out).toContain('<p>See <a href="https://youtu.be/YYPe_ZtuYWc"')
  })

  it('parses the common YouTube URL forms', () => {
    expect(youTubeId('https://youtu.be/qKjzk0ysrKo')).toBe('qKjzk0ysrKo')
    expect(youTubeId('https://www.youtube.com/watch?v=qKjzk0ysrKo&t=3')).toBe('qKjzk0ysrKo')
    expect(youTubeId('https://youtube.com/embed/qKjzk0ysrKo')).toBe('qKjzk0ysrKo')
    expect(youTubeId('https://example.com/watch?v=qKjzk0ysrKo')).toBeNull()
    expect(youTubeId('not a url')).toBeNull()
  })
})

describe('renderArticle', () => {
  it('returns the headings with the exact ids used in the HTML', () => {
    const { html, toc } = renderArticle('# Intro\n\nText\n\n## Costs\n\n### Detail\n\n## Costs')
    expect(toc).toEqual([
      { id: 'intro', text: 'Intro', level: 2 },
      { id: 'costs', text: 'Costs', level: 2 },
      { id: 'detail', text: 'Detail', level: 3 },
      { id: 'costs-2', text: 'Costs', level: 2 },
    ])
    toc.forEach((h) => expect(html).toContain(`id="${h.id}"`))
  })

  it('uses plain heading text, without markup', () => {
    expect(renderArticle('## **Bold** heading').toc[0].text).toBe('Bold heading')
  })
})
