'use client'

import Script from 'next/script'

/**
 * A placeholder value is any unset/dummy ID left over from scaffolding.
 *
 * These were previously shipped to production as fallbacks: GTM-XXXXXXX and
 * phc_xxxxxxxxxxxxxxxxx were present in the built JS bundles, so every visitor's
 * browser opened a connection to googletagmanager.com for a container that does
 * not exist and initialised PostHog against an invalid key. Two third-party
 * round-trips per page load, no data collected, and third-party JavaScript is a
 * common cause of poor INP.
 *
 * Now: if a real ID isn't configured at build time, the script simply isn't
 * rendered.
 */
function isConfigured(value: string | undefined): value is string {
  if (!value) return false
  const v = value.trim()
  if (v === '') return false
  // Reject scaffolding placeholders like GTM-XXXXXXX / phc_xxxxxxxxxxxxxxxxx
  return !/^(GTM-X+|phc_x+|G-X+|UA-X+)$/i.test(v)
}

export function Analytics() {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-GBPD3L2X7T'
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
  const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

  const gtmEnabled = isConfigured(GTM_ID)
  const posthogEnabled = isConfigured(POSTHOG_KEY)
  const gaEnabled = isConfigured(GA_MEASUREMENT_ID)

  return (
    <>
      {/* Google Tag Manager — only when a real container ID is configured */}
      {gtmEnabled && (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
          }}
        />
      )}

      {/* Google Analytics */}
      {gaEnabled && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </>
      )}

      {/* PostHog — only when a real project key is configured */}
      {posthogEnabled && (
        <Script
          id="posthog-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${POSTHOG_KEY}',{api_host:'${POSTHOG_HOST}'})
          `,
          }}
        />
      )}
    </>
  )
}
