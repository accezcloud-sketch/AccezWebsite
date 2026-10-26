/**
 * Arabic pages are rendered by the same root layout as English ones, which
 * writes <html lang="en">. After a static export, this sets the right language
 * and direction in the HTML file itself, so browsers, screen readers and
 * translation tools read Arabic from the first byte (the inline script in the
 * layout still covers client-side navigation).
 */

/** Whether an exported file (path relative to out/) is an Arabic page. */
export function isArabicPage(relPath) {
  return /^ar(\/|\.html$)/.test(relPath.split('\\').join('/'))
}

/** The page's HTML with lang/dir on the <html> tag set for Arabic. */
export function setArabicHtmlLang(html) {
  return html.replace(/<html\b([^>]*)>/i, (_tag, attrs) => {
    const rest = attrs.replace(/\s(lang|dir)="[^"]*"/gi, '')
    return `<html lang="ar" dir="rtl"${rest}>`
  })
}
