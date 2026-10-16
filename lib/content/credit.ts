/**
 * Cover-photo attribution text. The content pipeline writes the credit as
 * "Photo by <name> on Unsplash"; older posts may hold just the name. Either
 * way the reader sees a single "Photo by".
 */
export function photoCreditText(credit: string): string {
  const text = credit.trim()
  return /^photo by\b/i.test(text) ? text : `Photo by ${text}`
}
