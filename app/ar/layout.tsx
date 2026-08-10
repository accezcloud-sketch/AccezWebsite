import { LanguageProvider } from '@/contexts/LanguageContext'

/**
 * Arabic subtree.
 *
 * Every route under /ar is pinned to Arabic, so its HTML is server-rendered in
 * Arabic at build time. That is the whole fix: the Arabic translations already
 * existed in the codebase, but they only appeared after client-side state
 * changed, so the shipped HTML was always English and nothing could index them.
 *
 * This provider is nested inside the root one; React context resolves to the
 * nearest provider, so everything below here reads Arabic.
 *
 * `dir="rtl"` sits on this wrapper rather than <html> because a nested layout
 * cannot alter the root <html> element in the App Router. `dir` is valid on any
 * element and RTL styling inherits from here correctly. The <html lang> is also
 * corrected on the client for assistive tech — and Google explicitly does not
 * read lang attributes, so nothing is lost for search.
 */
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider routeLanguage="ar">
      <div lang="ar" dir="rtl">
        {children}
      </div>
    </LanguageProvider>
  )
}
