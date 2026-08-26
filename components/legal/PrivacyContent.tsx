'use client'

import LegalLayout, {
  LegalSectionBlock as S,
  LegalCallout,
  LegalTable,
} from '@/components/LegalLayout'
import { PRIVACY_AUDIENCE } from '@/components/legal/audience'

const LAST_UPDATED = '25 August 2026'
const EFFECTIVE = '25 August 2026'

export default function PrivacyContent() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Cloud Valley LLC collects, uses, shares and protects personal data in the Accez platform and marketplace, and the rights you have under the Saudi Personal Data Protection Law."
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE}
      audienceMap={PRIVACY_AUDIENCE}
    >
      <LegalCallout title="Summary">
        <p>
          We collect what we need to run a property operations platform and a service marketplace.
          We do not sell personal data. Card details never reach our servers &mdash; Stripe handles
          them. Much of the data in the platform belongs to the business that uploaded it, not to
          us, and in those cases you should contact that business first. You can reach us any time
          at <a href="/support/">our support form</a>.
        </p>
      </LegalCallout>

      <S id="scope" title="1. Who we are and what this covers">
        <p>
          Accez is operated by <strong>Cloud Valley LLC</strong>, commercial registration{' '}
          <strong>1010637845</strong>, Riyadh, Kingdom of Saudi Arabia.
        </p>
        <p>
          This policy covers personal data processed through the Accez website, platform, portals,
          mobile applications and the Accez service marketplace. It is written to meet the
          requirements of the <strong>Saudi Personal Data Protection Law</strong> (Royal Decree
          M/19, as amended) and its Implementing Regulations.
        </p>
        <p>
          It does not cover the separate privacy practices of businesses that use Accez, or of
          third-party services we link to.
        </p>
      </S>

      <S id="what-we-collect" title="2. What we collect">
        <h3>Account and identity</h3>
        <p>
          Name, email address, phone number, password (stored only in hashed form), profile photo,
          job title and role, and account status. Depending on the account
          type and what the business using Accez requires, this can also include date of birth,
          gender, nationality, national identity or residency number, and address.
        </p>

        <h3>Identity documents</h3>
        <p>
          Where an account type or a check-in flow requires it, images of identity documents such
          as an ID card or passport, and business documents such as a commercial registration or
          tax certificate.
        </p>

        <h3>Property and operational data</h3>
        <p>
          Property, unit and room records, leases and tenancies, reservations and stays, guest
          details, work orders and maintenance requests with photographs, service bookings, owner
          statements and earnings records, and sale or brokerage records where those modules are
          used.
        </p>

        <h3>Payment data</h3>
        <p>
          Transaction amounts, currency, status, references and payout records. Where you receive
          money through the platform, bank account details you enter are{' '}
          <strong>passed directly to Stripe</strong>, which holds them.
        </p>
        <LegalCallout title="We never see or store card numbers">
          <p>
            Card details are entered into fields hosted by Stripe and go straight to Stripe. Card
            numbers, expiry dates and security codes do not pass through or rest on Accez servers.
          </p>
        </LegalCallout>

        <h3>Communications</h3>
        <p>
          Messages sent through the platform&apos;s inbox and chat, and the content of SMS and
          WhatsApp messages sent or received through the platform&apos;s messaging features,
          together with the phone numbers involved. Support tickets and any correspondence with us.
        </p>

        <h3>Content you upload</h3>
        <p>
          Photographs, documents, listings, reviews and ratings, community posts, and signatures
          captured on-screen where a contract is signed electronically.
        </p>

        <h3>Technical data</h3>
        <p>
          Device and browser information, IP address, pages visited, error diagnostics and
          approximate country derived from your connection. We use approximate country only to
          choose which language version of the website to show you.
        </p>

        <h3>Business location data</h3>
        <p>
          Coordinates of properties, units and provider venues, so they can appear on a map.{' '}
          <strong>We do not track the live location of any person&apos;s device.</strong>
        </p>
      </S>

      <S id="sources" title="3. Where it comes from">
        <ul>
          <li><strong>From you</strong> — when you register, complete a profile, make or accept a booking, upload content, or contact us.</li>
          <li>
            <strong>From a business using Accez</strong> — a property manager or service provider
            may add you as a resident, tenant, owner, staff member or customer. In that case we
            receive your data from them.
          </li>
          <li>
            <strong>From connected services</strong> — for example, guest details supplied by a
            connected reservation channel, or verification status supplied by Stripe.
          </li>
          <li><strong>Automatically</strong> — technical data generated as you use the platform.</li>
        </ul>
        <p>
          Where we receive your data from someone other than you, and we are the controller of it,
          we will provide the information in this policy within{' '}
          <strong>30 days</strong>, unless an exemption applies.
        </p>
      </S>

      <S id="why" title="4. Why we use it, and our legal basis">
        <LegalTable
          head={['Purpose', 'Legal basis']}
          rows={[
            ['Creating and administering your account', 'Performance of a contract with you'],
            ['Providing the platform and its features', 'Performance of a contract'],
            ['Processing payments, payouts, refunds and disputes', 'Performance of a contract; legal obligation'],
            ['Sending service messages — confirmations, reminders, alerts', 'Performance of a contract'],
            ['Support and troubleshooting', 'Performance of a contract; legitimate interest'],
            ['Security, fraud detection and abuse prevention', 'Legitimate interest; legal obligation'],
            ['Keeping records and issuing invoices', 'Legal obligation'],
            ['Improving and developing the platform', 'Legitimate interest'],
            ['Marketing about our own services', 'Your consent'],
            ['Responding to lawful requests from authorities', 'Legal obligation'],
          ]}
        />
        <p>
          Where we rely on legitimate interest, we first assess and document whether that interest
          is outweighed by your rights and interests, and we do not rely on it for special
          categories of data.
        </p>
        <p>
          We do not use personal data for a new, unrelated purpose without telling you first and,
          where the law requires it, obtaining your consent.
        </p>
      </S>

      <S id="mandatory" title="5. What is required and what is optional">
        <p>
          Some data is <strong>required</strong>: without it we cannot provide the service. That
          includes your name, email address and, for accounts that receive money, the identity and
          bank information Stripe needs for verification. If you do not provide it, you will not be
          able to create an account, take payments or receive payouts.
        </p>
        <p>
          Other data is <strong>optional</strong>: a profile photograph, a secondary phone number,
          or optional fields in a property or listing record. Not providing it will not stop you
          using the platform, though some features may be less useful.
        </p>
        <p>
          Where a business using Accez has made a field mandatory in its own workflow, that is that
          business&apos;s decision, and you should ask them why it is needed.
        </p>
      </S>

      <S id="sharing" title="6. Who we share it with">
        <p>We do not sell personal data. We share it only as described here.</p>

        <h3>The business you are dealing with</h3>
        <p>
          If you are a resident, tenant, guest, owner or customer, your data is visible to the
          property manager or service provider you are dealing with. That is the point of the
          platform.
        </p>

        <h3>Service providers who process data on our behalf</h3>
        <LegalTable
          head={['Category', 'What they receive']}
          rows={[
            ['Payment processing', 'Name, email, phone, transaction and verification data'],
            ['SMS and WhatsApp messaging', 'Phone number and message content'],
            ['Email delivery', 'Recipient address and message content'],
            ['File and media storage', 'Uploaded images and documents'],
            ['Error monitoring and diagnostics', 'Technical data, and an account identifier'],
            ['Bot and abuse protection', 'Technical signals from your browser'],
            ['Mapping and address lookup', 'The address or coordinates being looked up'],
            ['Channel management for reservations', 'Reservation and guest details for connected properties'],
            ['Customer relationship and support tools', 'Enquiry and ticket details you submit'],
          ]}
          caption="We contract each of these to process data only on our instructions and to protect it. The named providers in each category can change — for example, if we appoint an additional payment processor — and a current list of named sub-processors is available on request through our support form."
        />

        <h3>Other disclosures</h3>
        <ul>
          <li>
            <strong>Legal and regulatory</strong> — where we are required to disclose by law, court
            order or a competent authority.
          </li>
          <li>
            <strong>Protecting rights and safety</strong> — to investigate fraud, enforce our terms
            or protect people from harm.
          </li>
          <li>
            <strong>Business transfer</strong> — if the business is merged, acquired or
            reorganised, subject to the same protections and with notice where required.
          </li>
        </ul>

              </S>

      <S id="transfers" title="7. Transfers outside Saudi Arabia">
        <p>
          Some of the services we rely on operate outside the Kingdom, so personal data may be
          transferred, stored or processed outside Saudi Arabia.
        </p>
        <p>
          Where that happens, we transfer only what is necessary, and we rely on the safeguards the
          Saudi Personal Data Protection Law permits &mdash; principally the{' '}
          <strong>Standard Contractual Clauses issued by SDAIA</strong>, and where applicable an
          accreditation certificate or binding common rules. We assess the risks of a transfer
          before making it, and we document that assessment.
        </p>
        <p>
          You can ask us which safeguard applies to a particular transfer by writing to{' '}
          <a href="/support/">our support form</a>.
        </p>
      </S>

      <S id="storage" title="8. Where it is stored and for how long">
        <p>
          Platform data is held on servers operated for us, and uploaded files are held with a
          media storage provider. We will confirm the current hosting locations on request, and we
          will update this section whenever they change.
        </p>
        <h3>Retention</h3>
        <p>We keep personal data for as long as we need it for the purpose it was collected for. In practice that means:</p>
        <ul>
          <li>
            <strong>Account data</strong> — for as long as the account is active, and afterwards
            only as long as needed to resolve disputes and meet legal obligations.
          </li>
          <li>
            <strong>Transaction, invoice and tax records</strong> — for the period required by
            Saudi tax and commercial law.
          </li>
          <li>
            <strong>Data uploaded by a business using Accez</strong> — for as long as that business
            instructs us to keep it, and then in accordance with its instructions.
          </li>
          <li>
            <strong>Support correspondence</strong> — for as long as needed to handle the matter and
            keep a record of it.
          </li>
        </ul>
        <p>
          Where we no longer have a purpose or a legal reason to keep personal data, we delete it or
          irreversibly anonymise it.
        </p>
      </S>

      <S id="security" title="9. How we protect it">
        <p>We use organisational and technical measures appropriate to the risk, including:</p>
        <ul>
          <li>encryption of data in transit;</li>
          <li>passwords stored using one-way hashing, never in readable form;</li>
          <li>role-based access controls, so people see only what their role requires;</li>
          <li>separation between the data of different businesses using the platform;</li>
          <li>account protections including verification codes, optional two-factor authentication and lockout after repeated failed sign-ins; and</li>
        </ul>
        <p>
          No system is completely secure, and we do not claim otherwise. If you find a vulnerability,
          please report it to <a href="/support/">our support form</a> rather
          than disclosing it publicly, and we will work with you on it.
        </p>
      </S>

      <S id="rights" title="10. Your rights and how to use them">
        <p>Under the Saudi Personal Data Protection Law you have the right to:</p>
        <ul>
          <li><strong>Be informed</strong> — know the legal basis and purpose for which your data is collected;</li>
          <li><strong>Access</strong> — obtain confirmation and a copy of your personal data we hold;</li>
          <li><strong>Obtain a copy</strong> — receive it in a readable, clear format;</li>
          <li><strong>Correct</strong> — have inaccurate or incomplete data corrected, completed or updated;</li>
          <li><strong>Request destruction</strong> — have data deleted when it is no longer needed for the purpose it was collected for;</li>
          <li><strong>Withdraw consent</strong> — where we rely on consent; and</li>
          <li><strong>Complain</strong> — to us and to the supervisory authority.</li>
        </ul>
        <p>
          Some rights have limits. We may need to keep data to comply with a legal obligation, to
          establish or defend a legal claim, or where a business using Accez has its own retention
          obligation.
        </p>
        <LegalCallout title="How long we take">
          <p>
            Write to <a href="/support/">our support form</a>. We respond{' '}
            <strong>within 30 days</strong>. If a request is unusually complex we may extend by up
            to a further <strong>30 days</strong>, and we will tell you before the first period ends
            and explain why.
          </p>
          <p>
            We may need to verify your identity first. We do not charge a fee for handling a
            request.
          </p>
        </LegalCallout>
      </S>

      <S id="consent" title="11. Withdrawing consent">
        <p>
          Where we rely on your consent, you can withdraw it at any time, and withdrawing is as
          straightforward as giving it was. Withdrawal does not affect processing already carried
          out, and does not affect processing that rests on another basis &mdash; for example, we
          still need to keep transaction records for tax purposes even if you withdraw marketing
          consent.
        </p>
      </S>

      <S id="cookies" title="12. Cookies and similar technologies">
        <p>We use a small number of browser technologies:</p>
        <ul>
          <li>
            <strong>Strictly necessary</strong> — to keep you signed in, keep your session secure,
            and remember your language choice. The platform cannot work without these.
          </li>
          <li>
            <strong>Analytics and diagnostics</strong> — where enabled, to understand how the
            platform is used and to diagnose errors.
          </li>
        </ul>
        <p>
          You can block or delete cookies in your browser settings, but strictly necessary cookies
          are required for sign-in to work. We do not use cookies to build advertising profiles and
          we do not sell browsing data.
        </p>
      </S>

      <S id="breach" title="13. If something goes wrong">
        <p>
          If a personal data breach occurs that may cause harm to personal data, or to a person&apos;s
          rights or interests, we notify the <strong>Saudi Data &amp; AI Authority (SDAIA) within 72
          hours</strong> of becoming aware of it.
        </p>
        <p>
          Where the breach may cause harm to you, we will notify you{' '}
          <strong>without undue delay</strong>, in plain language, describing what happened, the
          likely risks, what we have done, and what you can do to protect yourself.
        </p>
        <p>
          Where we process data on behalf of a business using Accez, we notify that business without
          undue delay so it can meet its own obligations.
        </p>
      </S>

      <S id="capacity" title="14. Children and people without full legal capacity">
        <p>
          Accez is a business platform and is not directed at children. We do not knowingly create
          accounts for people who lack full legal capacity to consent.
        </p>
        <p>
          A guest record on a reservation may include a minor travelling with an adult. In that
          case the data is provided by the responsible adult or by the property manager, and must be
          limited to what the stay actually requires.
        </p>
        <p>
          Where a person lacks full legal capacity, rights under this policy are exercised by their
          legal guardian, and a guardian&apos;s consent must not be used in a way that harms that
          person&apos;s interests. If you believe we hold a child&apos;s data without a proper
          basis, contact us and we will investigate.
        </p>
      </S>

      <S id="automated" title="15. Our support chatbot">
        <p>
          Our website carries a <strong>support chatbot</strong> in the corner of the page. It is an
          automated assistant, not a person, and we do not present it as one.
        </p>
        <p>
          The chatbot runs as a separate service, so <strong>what you type into it is sent to that
          service</strong> in order to generate a reply, together with the technical information any
          web request carries. We use it to answer questions about Accez and to pass you to our team
          when it cannot. Please do not enter passwords, card numbers or identity document numbers
          into it &mdash; use <a href="/support/">our support form</a> for anything sensitive.
        </p>
        <p>
          You never have to use it. If you would rather deal with a person, say so and we will route
          you to one, or use the support form instead.
        </p>
        <p>
          Separately, and whatever tools we use: <strong>we do not make decisions that produce legal
          effects for you, or similarly significant effects, based solely on automated processing
          without human involvement.</strong>
        </p>
      </S>

      <S id="customers" title="16. If your data was uploaded by a business">
        <p>
          If you are a tenant, resident, guest, owner, staff member or marketplace customer, the
          business you deal with decided to collect your data and decided why. In law they are the
          controller and we are the processor acting on their instructions.
        </p>
        <p>
          <strong>Contact that business first</strong> to access, correct or delete your data, or to
          ask why it was collected. If you cannot reach them, or they do not respond, write to us at{' '}
          <a href="/support/">our support form</a> and we will help you identify
          the right party and pass your request on.
        </p>
      </S>

      <S id="complaints" title="17. Complaints">
        <p>
          If you are unhappy with how we have handled your personal data, tell us first at{' '}
          <a href="/support/">our support form</a>. We will acknowledge your
          complaint, investigate, and respond with our findings and what we intend to do.
        </p>
        <p>
          You also have the right to complain to the supervisory authority in the Kingdom of Saudi
          Arabia, the <strong>Saudi Data &amp; AI Authority (SDAIA)</strong>, at{' '}
          <a href="https://sdaia.gov.sa" target="_blank" rel="noopener noreferrer">
            sdaia.gov.sa
          </a>
          . You may also have the right to seek compensation for material or moral damage through
          the competent courts.
        </p>
      </S>

      <S id="changes" title="18. Changes to this policy">
        <p>
          We update this policy when our practices change or the law changes. The date at the top
          always shows the current version. For material changes we give reasonable notice before
          they take effect, and where the law requires consent for a new purpose we will ask for it
          rather than assume it.
        </p>
      </S>

      <S id="contact" title="19. Contact us">
        <p>
          <strong>Cloud Valley LLC</strong>
          <br />
          Commercial registration: 1010637845
          <br />
          Riyadh, Kingdom of Saudi Arabia
        </p>
        <p>
          Privacy and data protection:{' '}
          <a href="/support/">our support form</a>
          <br />
          Security reports: <a href="/support/">our support form</a>
          <br />
          General support: <a href="/support/">our support form</a>
        </p>
      </S>
    </LegalLayout>
  )
}
