import PostStrip from '@/components/blog/PostStrip'
import { getPostsForPage } from '@/lib/blog'
import type { PostAudience } from '@/lib/content/postAudience'
import type { Locale } from '@/lib/i18n'

const HEADING: Record<Locale, string> = { en: 'Related reading', ar: 'مقالات ذات صلة' }

/**
 * Blog posts for a page that is not a post, chosen by what the page is about
 * (lib/blog.ts getPostsForPage). New posts show up here without editing the
 * page. Renders nothing when the audience has no posts yet.
 */
export default function RelatedPosts({ about, audience, locale }: { about: string; audience?: PostAudience; locale: Locale }) {
  return <PostStrip id="related-posts" heading={HEADING[locale]} posts={getPostsForPage({ about, audience })} locale={locale} />
}
