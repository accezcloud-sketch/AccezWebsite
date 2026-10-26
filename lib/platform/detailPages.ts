/**
 * The shape of the site's detail pages: one page per module of a solution,
 * per kind of customer, and per integration. Each is plain bilingual data,
 * rendered by one template (components/detail/DetailPage.tsx), so every
 * detail page looks and reads the same way and a new one is only data.
 *
 * Every statement must be true of the product today: only facts the owner
 * has confirmed, and only what the real screenshots show.
 */
import type { LucideIcon } from 'lucide-react'
import type { ShotKey } from '@/lib/product/shots'
import type { Bilingual } from './solutions'

/** A real screenshot with a short caption. */
export interface DetailShot {
  shot: ShotKey
  title: Bilingual
  text: Bilingual
}

/** One benefit: an icon, a few words and one line. */
export interface DetailPoint {
  icon: LucideIcon
  title: Bilingual
  text: Bilingual
}

/** A question answered in the page's own text. */
export interface DetailFaq {
  q: Bilingual
  a: Bilingual
}

export interface DetailPageData {
  /** URL segment, e.g. "channel-manager". */
  slug: string
  /** Short name, for breadcrumbs, menus and link cards. */
  name: Bilingual
  /** One line for link cards. */
  summary: Bilingual
  /** Search title without the " | Accez" suffix; holds the phrase people search for. */
  metaTitle: Bilingual
  /** Search description, 140 to 155 characters. */
  metaDescription: Bilingual
  /** The headline (with the search phrase), its accented end, and one line. */
  hero: { title: Bilingual; accent?: Bilingual; subtitle: Bilingual }
  /** Real screenshots; the first one sits in the page top. */
  shots: DetailShot[]
  /** 3 to 6 benefits. */
  points: DetailPoint[]
  /** A few short questions, answered with facts only. */
  faqs: DetailFaq[]
  /** Blog posts to read next (slugs of existing posts), 2 or 3. */
  posts: string[]
}
