/** Every string inside a value (objects, arrays, nested), for copy checks in tests. */
export function stringsIn(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(stringsIn)
  if (value && typeof value === 'object') return Object.values(value).flatMap(stringsIn)
  return []
}

/** Em or en dashes, or a spaced hyphen used as punctuation (the site's copy rule). */
export const DASH_PUNCTUATION = /[–—]| - /
