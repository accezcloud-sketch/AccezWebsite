import Image from 'next/image'
import Link from 'next/link'
import { localeHref, type Locale } from '@/lib/i18n'

const COPY: Record<Locale, { heading: string; text: string; link: string }> = {
  en: {
    heading: 'About the Accez team',
    text: 'This article was written by the Accez team in Riyadh, the people who build the Accez property management solution and the Accez solution for service providers. We write about running rentals, sales and service businesses in Saudi Arabia.',
    link: 'More about Accez',
  },
  ar: {
    heading: 'عن فريق أكسيز',
    text: 'كتب هذه المقالة فريق أكسيز في الرياض، الفريق الذي يبني حل إدارة العقارات وحل مقدمي الخدمات في أكسيز. نكتب عن إدارة الإيجارات والمبيعات وأعمال الخدمات في السعودية.',
    link: 'تعرّف على أكسيز',
  },
}

/**
 * The author box at the end of a post written by the Accez team (the blog's
 * only author). Server-rendered, so it is in the static HTML.
 */
export default function AuthorBox({ locale }: { locale: Locale }) {
  const c = COPY[locale]
  return (
    <aside aria-labelledby="post-author" className="ui-card mt-10 p-5 sm:p-6 flex items-start gap-4">
      <Image src="/images/accez-logo.png" alt="" width={112} height={116} className="rounded-xl shrink-0 w-11 h-auto" />
      <div className="min-w-0">
        <h2 id="post-author" className="text-strong font-semibold mb-1.5" style={{ fontSize: 16 }}>
          {c.heading}
        </h2>
        <p className="text-muted leading-relaxed mb-2" style={{ fontSize: 14.5 }}>
          {c.text}
        </p>
        <Link href={localeHref('/about', locale)} prefetch={false} className="text-accent-hi hover:text-strong underline underline-offset-2 text-sm font-medium">
          {c.link}
        </Link>
      </div>
    </aside>
  )
}
