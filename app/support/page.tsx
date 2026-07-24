'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SupportPage() {
  const { language, isRTL } = useLanguage()

  const content = {
    en: {
      eyebrow: 'Support',
      title: 'How can we help?',
      subtitle: 'Need help? Submit a support ticket and our team in Riyadh will get back to you as soon as possible.',
      contactName: 'Contact Name',
      email: 'Email',
      phone: 'Phone',
      subject: 'Subject',
      description: 'Description',
      company: 'Company',
      submit: 'Submit ticket',
      placeholders: {
        name: 'Your full name',
        email: 'your@email.com',
        phone: '+966 5X XXX XXXX',
        subject: 'Brief summary of your issue',
        description: 'Please describe your issue in detail...',
        company: 'Your company name',
      },
    },
    ar: {
      eyebrow: 'الدعم',
      title: 'كيف يمكننا مساعدتك؟',
      subtitle: 'هل تحتاج مساعدة؟ قدّم تذكرة دعم وسيتواصل معك فريقنا في الرياض في أقرب وقت ممكن.',
      contactName: 'اسم جهة الاتصال',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      subject: 'الموضوع',
      description: 'الوصف',
      company: 'الشركة',
      submit: 'إرسال التذكرة',
      placeholders: {
        name: 'اسمك الكامل',
        email: 'بريدك@الإلكتروني.com',
        phone: '+966 5X XXX XXXX',
        subject: 'ملخص موجز لمشكلتك',
        description: 'يرجى وصف مشكلتك بالتفصيل...',
        company: 'اسم شركتك',
      },
    },
  }

  const t = content[language]

  useEffect(() => {
    const timestamp = () => {
      const response = document.getElementById('g-recaptcha-response') as HTMLTextAreaElement | null
      if (response == null || response.value.trim() == '') {
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

  const fieldClass =
    'w-full px-4 py-3 rounded-lg border transition-all duration-200 outline-none text-white focus:ring-2'
  const fieldStyle = {
    background: 'var(--bg)',
    borderColor: 'var(--border-hi)',
    ['--tw-ring-color' as string]: 'var(--accent)',
  } as React.CSSProperties
  const labelClass = 'block text-sm font-medium mb-2'
  const labelStyle = { color: 'var(--text-muted)' } as React.CSSProperties

  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />
      <Header />

      <section className="relative overflow-hidden page-top pb-20">
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: '60%', background: 'radial-gradient(120% 70% at 50% 0%, #18384A 0%, rgba(24,56,74,0.3) 30%, transparent 62%)' }} aria-hidden="true" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-5" style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-line)', color: 'var(--accent-hi)' }}>
                {t.eyebrow}
              </span>
              <h1 className="text-white font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontFamily: 'var(--font-heading), var(--font-inter), system-ui, sans-serif', fontWeight: 800 }}>
                {t.title}
              </h1>
              <p className="leading-relaxed" style={{ fontSize: 17, color: 'var(--text-muted)' }}>{t.subtitle}</p>
            </div>

            <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <form
                action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00D41000002kA0p"
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="captcha_settings" value='{"keyname":"AccezV2","fallback":"true","orgId":"00D41000002kA0p","ts":""}' />
                <input type="hidden" name="orgid" value="00D41000002kA0p" />
                <input type="hidden" name="retURL" value="https://accez.cloud/thankyou" />

                <div>
                  <label htmlFor="name" className={labelClass} style={labelStyle}>{t.contactName} <span style={{ color: '#f87171' }}>*</span></label>
                  <input id="name" maxLength={80} name="name" type="text" required placeholder={t.placeholders.name} className={fieldClass} style={fieldStyle} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass} style={labelStyle}>{t.email} <span style={{ color: '#f87171' }}>*</span></label>
                  <input id="email" maxLength={80} name="email" type="email" required placeholder={t.placeholders.email} className={fieldClass} style={fieldStyle} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass} style={labelStyle}>{t.phone}</label>
                  <input id="phone" maxLength={40} name="phone" type="tel" placeholder={t.placeholders.phone} className={fieldClass} style={fieldStyle} />
                </div>
                <div>
                  <label htmlFor="company" className={labelClass} style={labelStyle}>{t.company}</label>
                  <input id="company" maxLength={80} name="company" type="text" placeholder={t.placeholders.company} className={fieldClass} style={fieldStyle} />
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass} style={labelStyle}>{t.subject} <span style={{ color: '#f87171' }}>*</span></label>
                  <input id="subject" maxLength={80} name="subject" type="text" required placeholder={t.placeholders.subject} className={fieldClass} style={fieldStyle} />
                </div>
                <div>
                  <label htmlFor="description" className={labelClass} style={labelStyle}>{t.description} <span style={{ color: '#f87171' }}>*</span></label>
                  <textarea id="description" name="description" rows={5} required placeholder={t.placeholders.description} className={`${fieldClass} resize-none`} style={fieldStyle} />
                </div>

                <div className="flex justify-center">
                  <div className="g-recaptcha" data-sitekey="6LdtnJAqAAAAAJe1H98R4i-d0Ge3hiGZUTWS3btY" />
                </div>

                <button type="submit" className="w-full py-3.5 text-white font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--accent)' }}>
                  {t.submit}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
