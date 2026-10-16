import BlogPostClient from '@/components/BlogPostClient'
import PostFooter from '@/components/blog/PostFooter'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { renderArticle } from '@/lib/content/markdown'
import { postSchemas } from '@/lib/content/postSchema'
import type { Locale } from '@/lib/i18n'

/**
 * A blog post page in either language: structured data, the article
 * (markdown rendered here, on the server) and what follows it. Shared by
 * the English and Arabic routes.
 */
export default function BlogPostPage({ slug, locale }: { slug: string; locale: Locale }) {
  const meta = getAllPosts().find((p) => p.slug === slug) ?? null
  const post = getPostBySlug(slug)
  const article = post
    ? renderArticle(locale === 'ar' ? post.contentAr : post.content, { locale })
    : { html: '', toc: [] }

  return (
    <>
      {meta &&
        postSchemas(meta, locale).map((schema, index) => (
          <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}
      <BlogPostClient
        post={meta}
        contentHtml={article.html}
        toc={article.toc}
        afterArticle={<PostFooter slug={slug} locale={locale} />}
      />
    </>
  )
}
