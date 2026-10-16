/**
 * Share links for a page. Pure, so the links are complete in the static HTML
 * (the previous buttons read window.location at runtime, leaving `url=` empty
 * in the HTML that crawlers and link previews see).
 */

export interface ShareLinks {
  whatsapp: string
  linkedin: string
  x: string
}

export function shareLinks(url: string, title: string): ShareLinks {
  const u = encodeURIComponent(url)
  return {
    // WhatsApp takes a single text field: title, then the link.
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${u}`,
  }
}
