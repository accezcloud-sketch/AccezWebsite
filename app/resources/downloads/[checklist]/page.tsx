import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ChecklistPage from '@/components/resources/ChecklistPage'
import { staticPageMetadata } from '@/lib/content/pageMetadata'
import { checklistById, CHECKLISTS } from '@/lib/resources/checklists'
import { checklistRoute } from '@/lib/resources/routes'

// One page per printable checklist (lib/resources/checklists.ts); others 404.
export const dynamicParams = false

export function generateStaticParams() {
  return CHECKLISTS.map((c) => ({ checklist: c.id }))
}

interface PageProps {
  params: Promise<{ checklist: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const checklist = checklistById((await params).checklist)
  if (!checklist) return {}
  return staticPageMetadata({ route: checklistRoute(checklist.id), locale: 'en', title: checklist.title.en, description: checklist.summary.en })
}

export default async function Page({ params }: PageProps) {
  const checklist = checklistById((await params).checklist)
  if (!checklist) notFound()
  return <ChecklistPage checklist={checklist} locale="en" />
}
