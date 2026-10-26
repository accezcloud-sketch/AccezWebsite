/**
 * Reading time of a post body, measured at build time (lib/blog.ts).
 *
 * Kept apart from the label in ./readingTime.ts: the `reading-time` package
 * brings Node stream code, which must never end up in a browser bundle.
 * Each post file contains the English and the Arabic article, so the time is
 * measured on one language's half only (measuring the whole file roughly
 * doubled every estimate).
 */
import readingTime from 'reading-time'

/** Whole minutes to read a markdown body; never less than 1. */
export function readingMinutes(markdown: string): number {
  return Math.max(1, Math.ceil(readingTime(markdown).minutes))
}
