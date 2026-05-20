'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useLanguage } from '@/contexts/LanguageContext'
import FadeUp from '@/components/animations/FadeUp'
import RevealLine from '@/components/animations/RevealLine'

export default function Contact() {
  const { t, isRTL } = useLanguage()
  const tc = t.contact as Record<string, string>

  useEffect(() => {
    const timestamp = () => {
      const response = document.getElementById('g-recaptcha-response') as HTMLInputElement | null
      if (response == null || response.value.trim() === '') {
        const captchaSettings = document.getElementsByName('captcha_settings')[0] as HTMLInputElement
        if (captchaSettings) {
          const elems = JSON.parse(captchaSettings.value)
          elems['ts'] = JSON.stringify(new Date().getTime())
          captchaSettings.value = JSON.stringify(elems)
        }
      }
    }

    const interval = setInterval(timestamp, 500)
    return () => clearInterval(interval)
  }, [])

  const inputClass =
    'w-full px-4 py-3 rounded-lg text-white placeholder:text-slate-500 transition-all duration-200 outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent'

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  }

  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />

      <section className="py-20" id="contact" style={{ background: '#080c18' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeUp>
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div
                    className="h-px w-8"
                    style={{ background: isRTL
                      ? 'linear-gradient(to left, transparent, #6366f1)'
                      : 'linear-gradient(to right, transparent, #6366f1)' }}
                  />
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: '#818cf8' }}
                  >
                    {tc.eyebrow}
                  </span>
                  <div
                    className="h-px w-8"
                    style={{ background: isRTL
                      ? 'linear-gradient(to right, transparent, #6366f1)'
                      : 'linear-gradient(to left, transparent, #6366f1)' }}
                  />
                </div>

                <h2
                  className="text-white font-bold text-center leading-tight tracking-tight mb-4"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    fontFamily: 'var(--font-manrope), var(--font-inter), system-ui, sans-serif',
                    fontWeight: 800,
                  }}
                >
                  {tc.titleLead}{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {tc.titleAccent}
                  </span>
                </h2>

                <p
                  className="text-slate-400 text-center max-w-xl mx-auto leading-relaxed"
                  style={{ fontSize: 17 }}
                >
                  {tc.subtitle}
                </p>
              </div>
            </FadeUp>

            <RevealLine className="w-full mb-10" delay={0.05} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left side - Contact Info */}
              <FadeUp>
                <div className="space-y-6">
                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/18444603371"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: '#25D366',
                      boxShadow: '0 4px 16px rgba(37, 211, 102, 0.25)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="text-sm">{tc.whatsappCta}</span>
                  </a>

                  {/* Business hours card */}
                  <div
                    className="flex items-start gap-4 rounded-2xl p-5"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(99,102,241,0.12)',
                        border: '1px solid rgba(99,102,241,0.25)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="#818cf8" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{tc.businessHours}</h3>
                      <p className="text-slate-400 text-sm">{tc.businessHoursDetails}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Right side - Salesforce Web-to-Lead Form */}
              <FadeUp delay={0.15}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                  }}
                  className="rounded-2xl p-6 sm:p-8"
                >
                  <form
                    action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D41000002kA0p"
                    method="POST"
                  >
                    {/* Hidden Salesforce Fields */}
                    <input
                      type="hidden"
                      name="captcha_settings"
                      value='{"keyname":"AccezV2","fallback":"true","orgId":"00D41000002kA0p","ts":""}'
                    />
                    <input type="hidden" name="oid" value="00D41000002kA0p" />
                    <input type="hidden" name="retURL" value="https://accez.cloud/thankyou" />
                    <input type="hidden" name="recordType" id="recordType" value="012Pm000004jdap" />
                    <input type="hidden" name="lead_source" value="Web" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium text-slate-300 mb-2">
                          {tc.firstName}
                        </label>
                        <input
                          id="first_name"
                          maxLength={40}
                          name="first_name"
                          type="text"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium text-slate-300 mb-2">
                          {tc.lastName}
                        </label>
                        <input
                          id="last_name"
                          maxLength={80}
                          name="last_name"
                          type="text"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        {tc.emailLabel}
                      </label>
                      <input
                        id="email"
                        maxLength={80}
                        name="email"
                        type="email"
                        className={inputClass}
                        style={inputStyle}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                        {tc.company}
                      </label>
                      <input
                        id="company"
                        maxLength={40}
                        name="company"
                        type="text"
                        className={inputClass}
                        style={inputStyle}
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-slate-300 mb-2">
                          {tc.mobile}
                        </label>
                        <input
                          id="mobile"
                          maxLength={40}
                          name="mobile"
                          type="tel"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-2">
                          {tc.city}
                        </label>
                        <input
                          id="city"
                          maxLength={40}
                          name="city"
                          type="text"
                          className={inputClass}
                          style={inputStyle}
                          placeholder="New York"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="Description" className="block text-sm font-medium text-slate-300 mb-2">
                        {tc.comments}
                      </label>
                      <textarea
                        id="Description"
                        maxLength={3000}
                        name="description"
                        rows={4}
                        className={`${inputClass} resize-vertical min-h-[120px]`}
                        style={inputStyle}
                        placeholder={tc.commentsPlaceholder}
                      ></textarea>
                    </div>

                    {/* reCAPTCHA */}
                    <div
                      className="g-recaptcha mb-6"
                      data-sitekey="6LdtnJAqAAAAAJe1H98R4i-d0Ge3hiGZUTWS3btY"
                      data-theme="dark"
                    ></div>

                    <button
                      type="submit"
                      name="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
                      }}
                    >
                      {tc.sendMessage}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        style={{ transform: isRTL ? 'scaleX(-1)' : undefined }}
                      >
                        <path
                          d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
