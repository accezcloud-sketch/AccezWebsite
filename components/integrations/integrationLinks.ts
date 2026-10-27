import type { DetailLink } from '@/components/detail/DetailPage'
import type { Locale } from '@/lib/i18n'
import { INTEGRATION_SERVICES, integrationGroup, integrationGroupHref, type IntegrationGroup } from '@/lib/platform/integrations'

/** Link cards to groups on the /integrations/ page, for any detail page. */
export function integrationLinks(groups: IntegrationGroup[], locale: Locale): DetailLink[] {
  return groups.map((key) => ({
    label: integrationGroup(key)!.name[locale],
    text: INTEGRATION_SERVICES.filter((s) => s.group === key).map((s) => s.name[locale]).join(locale === 'ar' ? '، ' : ', '),
    href: integrationGroupHref(key),
  }))
}
