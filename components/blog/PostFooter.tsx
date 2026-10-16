import ProductCta from '@/components/blog/ProductCta'
import RelatedPosts from '@/components/blog/RelatedPosts'
import { getAllPosts, getRelatedPosts } from '@/lib/blog'
import { matchProductPage } from '@/lib/content/productMatch'
import type { Locale } from '@/lib/i18n'

/**
 * Everything after a blog article: the product page that matches the post's
 * topic, then related articles. Shared by the English and Arabic post routes.
 */
export default function PostFooter({ slug, locale }: { slug: string; locale: Locale }) {
  const post = getAllPosts().find((p) => p.slug === slug)
  if (!post) return null

  return (
    <>
      <ProductCta product={matchProductPage(post)} locale={locale} />
      <RelatedPosts posts={getRelatedPosts(slug)} locale={locale} />
    </>
  )
}
