import type { ComponentType } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { AudienceView } from '@/lib/legal/audience'
import { legalVersionMetadata } from '@/lib/legal/documents'
import type { Locale } from '@/lib/i18n'
import { PLATFORM_SOLUTIONS, solutionByKey } from '@/lib/platform/solutions'
import TermsContent from './TermsContent'
import TermsContentAr from './TermsContentAr'
import RefundContent from './RefundContent'
import RefundContentAr from './RefundContentAr'
import PrivacyContent from './PrivacyContent'
import PrivacyContentAr from './PrivacyContentAr'

/** The source of each per-solution document, by language. */
const CONTENT: Record<'terms' | 'refund-policy' | 'privacy', Record<Locale, ComponentType<{ audience: AudienceView }>>> = {
  terms: { en: TermsContent, ar: TermsContentAr },
  'refund-policy': { en: RefundContent, ar: RefundContentAr },
  privacy: { en: PrivacyContent, ar: PrivacyContentAr },
}

interface PageProps {
  params: Promise<{ solution: string }>
}

/**
 * Everything a /<document>/<solution>/ route exports, so the six route files
 * (three documents × two languages) are one line each and cannot drift apart.
 */
export function legalVersionRoute(doc: keyof typeof CONTENT, locale: Locale) {
  const Content = CONTENT[doc][locale]
  return {
    generateStaticParams: () => PLATFORM_SOLUTIONS.map((s) => ({ solution: s.key })),
    generateMetadata: async ({ params }: PageProps): Promise<Metadata> => {
      const solution = solutionByKey((await params).solution)
      return solution ? legalVersionMetadata(doc, solution, locale) : {}
    },
    Page: async function LegalVersionPage({ params }: PageProps) {
      const solution = solutionByKey((await params).solution)
      if (!solution) notFound()
      return <Content audience={solution.legalAudience} />
    },
  }
}
