import PostStrip from '@/components/blog/PostStrip'
import { getPostsForProduct } from '@/lib/blog'
import type { ProductPageKey } from '@/lib/content/productMatch'
import type { Locale } from '@/lib/i18n'

const HEADING: Record<Locale, { latest: string; topic: string }> = {
  en: { latest: 'Latest insights', topic: 'From the blog' },
  ar: { latest: 'أحدث المقالات', topic: 'من المدونة' },
}

/**
 * Newest blog posts for the homepage, or the newest posts on a product's
 * topic for a product page. Renders nothing when no post matches.
 */
export default function BlogStrip({ locale, product = 'modules' }: { locale: Locale; product?: ProductPageKey }) {
  const heading = product === 'modules' ? HEADING[locale].latest : HEADING[locale].topic
  return <PostStrip id="blog-strip" heading={heading} posts={getPostsForProduct(product)} locale={locale} />
}
