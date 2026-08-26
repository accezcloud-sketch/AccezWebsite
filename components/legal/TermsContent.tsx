'use client'

import LegalLayout, {
  LegalSectionBlock as S,
  LegalCallout,
  LegalTable,
  Only,
} from '@/components/LegalLayout'
import { TERMS_AUDIENCE } from '@/components/legal/audience'

const LAST_UPDATED = '25 August 2026'
const EFFECTIVE = '25 August 2026'

export default function TermsContent() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The agreement between you and Cloud Valley LLC governing your use of the Accez platform and the Accez service marketplace."
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE}
      audienceMap={TERMS_AUDIENCE}
    >
      <LegalCallout title="Read this first">
        <p>
          These Terms are a binding agreement. They cover money, liability and the handling of
          other people&apos;s personal data, so the sections on{' '}
          <a href="#fees">platform fees</a>, <a href="#refunds">refunds and chargebacks</a>,{' '}
          <a href="#payouts">payouts</a> and <a href="#liability">limitation of liability</a>{' '}
          deserve particular attention. If you are accepting on behalf of a company, you confirm
          you are authorised to bind it.
        </p>
      </LegalCallout>

      <S id="about" title="1. Who we are and what this covers">
        <p>
          Accez is operated by <strong>Cloud Valley LLC</strong>{' '}
          (&ldquo;Accez&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a company registered in the
          Kingdom of Saudi Arabia under commercial registration number{' '}
          <strong>1010637845</strong>.
        </p>
        <p>These Terms govern your use of:</p>
        <ul>
          <li>the Accez web platform, portals and mobile applications;</li>
          <Only for="sp" as="li">
            the <strong>Accez marketplace</strong>, where customers browse and book services; and
          </Only>
          <li>any related APIs, integrations and support we provide.</li>
        </ul>
        <p>
          By creating an account, accessing the platform, or making or accepting a booking through
          it, you agree to these Terms and to our{' '}
          <a href="/privacy/">Privacy Policy</a> and{' '}
          <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>, which form part of this
          agreement. If you do not agree, do not use the platform.
        </p>
      </S>

      <S id="venue" title="2. What Accez does and does not do">
        <p>
          Accez provides software and a place for others to transact. That distinction matters, and this section states it
          plainly rather than leaving it to be inferred.
        </p>
        <Only for="pm">
          <p>
            <strong>What you get.</strong> The property manager portal is operations software for
            your business: property, unit and room records, leases and tenancies, reservations and
            stays, work orders and maintenance, staff with schedules and task assignment, resident
            and guest communication including message and email templates, a customer record, owner
            earnings statements and payout records, and billing for your own subscription. You
            operate your properties with it. We do not operate them with you.
          </p>
        </Only>
        <Only for="sp">
          <p>
            <strong>What you get.</strong> Two things. A <strong>listing on the Accez
            marketplace</strong>, where customers browse businesses, pick a service and a time and
            book you; and the <strong>service provider portal</strong>, where you set up your
            business profile and venue, publish services with their durations and prices, manage
            your calendar and availability, add staff with their schedules and assign bookings to
            them, and see your bookings and billing. We list you and take the booking. We do not
            perform the service, set your prices, or employ you or your staff.
          </p>
        </Only>
        <p><strong>We do not:</strong></p>
        <ul>
          <Only for="pm" as="li">
            own, lease, manage, inspect or maintain any property, unit or room listed on the
            platform;
          </Only>
          <Only for="pm" as="li">
            act as a party to any lease, tenancy, reservation or sale contract made through the
            platform;
          </Only>
          <Only for="pm" as="li">act as a real estate broker, letting agent, or property manager; or</Only>
          <Only for="sp" as="li">
            perform, supervise or inspect any service you list &mdash; cleaning, maintenance, salon,
            spa, fitness, photography or anything else;
          </Only>
          <Only for="sp" as="li">act as a party to any booking a customer makes with you;</Only>
          <Only for="sp" as="li">employ you or your staff, or act as your agent; or</Only>
        </ul>
        <LegalCallout tone="warning" title="Disputes about what was booked or supplied">
          <p>
            Any dispute about what was booked or supplied &mdash; its condition, quality or safety,
            a cancellation, a deposit, or the conduct of anyone involved &mdash; is{' '}
            <strong>between those parties</strong>. We are not a party to it
            and do not adjudicate it. We may, at our discretion, provide records held on the
            platform to help the parties resolve it.
          </p>
        </LegalCallout>
      </S>

      <S id="eligibility" title="3. Eligibility and your account">
        <p>
          You must have full legal capacity to enter into contracts, and be using the platform for
          business or professional purposes, not purely personal ones. Accounts are for named
          people; you may not share credentials.
        </p>
        <p>
          You are responsible for everything done under your account. Keep your credentials secure,
          enable the account protections we offer, and tell us promptly at{' '}
          <a href="/support/">our support form</a> if you believe your account
          has been compromised.
        </p>
        <p>
          Where you add other people to your account, you confirm you have the authority and the
          lawful basis to provide their information to us, and you are responsible for what they do
          on the platform.
        </p>
      </S>

      <S id="subscriptions" title="4. Subscriptions, plans and free usage">
        <p>
          Paid plans are billed in advance through our payment processor on a recurring basis and{' '}
          <strong>renew automatically</strong> until cancelled. Cancelling takes effect at the end
          of the period you have already paid for; you keep access until then.
        </p>
        <Only for="sp">
          <p>
            <strong>Provider plan tiers.</strong> Provider listings run on tiers &mdash; a free tier
            and paid tiers. The tiers available to you, their prices and what each includes are shown
            in the plan picker when you set up your business and in your billing page afterwards.
            Some features are limited on the free and entry tiers. Choosing a paid plan takes you to
            the payment processor&apos;s checkout.
          </p>
          <LegalCallout tone="warning" title="The free tier costs a commission instead of a fee">
            <p>
              The free tier has <strong>no time limit and no recurring fee</strong>. Instead, we
              charge a commission of <strong>5% of the value of each booking</strong> you take
              through the marketplace while you are on it. Paid tiers carry a lower commission or,
              on a subscription billing model, none at all.
            </p>
          </LegalCallout>
        </Only>
        <Only for="pm">
          <p>
            Plan changes are prorated. Where a plan includes usage limits &mdash; for example the
            number of properties, units, residents, staff seats, check-ins or work orders &mdash;
            those limits are enforced by the platform, and exceeding them may require an upgrade or
            an additional seat purchase.
          </p>
        </Only>
        <Only for="sp">
          <p>
            Plan changes are prorated. Where a tier gates a feature or sets a limit, the platform
            enforces that, and going beyond it requires changing tier.
          </p>
        </Only>
        <LegalCallout title="Free usage is limited by capacity, not by time">
          <p>
            Our free tier is not a countdown trial that expires. It is ongoing access with
            <strong> capped usage</strong>. When you reach a cap, that feature stops until you
            upgrade. We may change the caps on notice.
          </p>
        </LegalCallout>
        <p>
          We may change subscription prices. We will give you reasonable advance notice before a
          change takes effect, and the new price applies from your next renewal. Continuing to use
          a paid plan after that renewal is acceptance of the new price.
        </p>
        <p>
          Subscription fees already paid are non-refundable except where the{' '}
          <a href="/refund-policy/">Refund &amp; Cancellation Policy</a> or applicable Saudi law
          says otherwise.
        </p>
      </S>

      <S id="payments" title="5. Payments, our processor and merchant of record">
        <p>
          Card payments are handled by a licensed third-party{' '}
          <strong>payment processor</strong>. Our payment processor is currently{' '}
          <strong>Stripe</strong>, and every reference to Stripe in these Terms means the payment
          processor we use at that time. We may appoint an additional or different payment
          processor. If we do, we will identify it in your account before it is used for your
          transactions, and the processor&apos;s own agreement and fees will apply in place of the
          ones described here. Changing processor does not change the platform fees we charge.
        </p>
        <p>
          Where you receive money through
          the platform, you must complete Stripe onboarding and are bound by the{' '}
          <a href="https://stripe.com/legal/connect-account" target="_blank" rel="noopener noreferrer">
            Stripe Connected Account Agreement
          </a>{' '}
          in addition to these Terms. Stripe carries out its own identity and business
          verification. We do not control its decisions, and Stripe may limit or suspend a
          connected account independently of us.
        </p>
        <p>
          <strong>Card details are never held by Accez.</strong> Card data is entered directly into
          Stripe&apos;s hosted fields and does not reach our servers. We store only Stripe
          references, never a card number.
        </p>
        <LegalCallout title="Who the merchant of record is">
          <p>
            For payments taken through the platform, the charge is created on the{' '}
            <strong>Accez platform account</strong> and the relevant share is then transferred to
            your connected account. This means Accez is the settlement merchant, and refunds and
            card disputes are debited from the Accez account in the first instance.
          </p>
          <p>
            That is a mechanical fact about how funds move &mdash; it does{' '}
            <strong>not</strong> make us the seller of your goods or services, or a party to your
            contract with your customer. Where a refund or chargeback relates to your booking, we
            are entitled to recover it from you, including by reversing the corresponding transfer,
            deducting from amounts we owe you, or setting it off against future payouts.
          </p>
        </LegalCallout>
      </S>

      <S id="fees" title="6. Platform fees">
        <p>
          We charge a platform fee on transactions processed through the platform, in addition to
          any subscription fee. Fees are deducted at the time the transaction is processed, before
          funds reach you.
        </p>
        <Only for="pm">
          <p>The fee depends on the type of transaction:</p>
          <LegalTable
            head={['Transaction type', 'Fee basis']}
            rows={[
              ['Unit reservations', 'A percentage of the reservation value, set out in your account.'],
              [
                'Resident and guest service bookings',
                'A percentage of the booking value, set out in your account.',
              ],
            ]}
            caption="The rates applicable to your account are shown in the platform and in your order form."
          />
        </Only>
        <Only for="sp">
          <p>The fee depends on the type of transaction and on your plan:</p>
          <LegalTable
            head={['Transaction type', 'Fee basis']}
            rows={[
              [
                'Marketplace bookings',
                'A commission that varies by provider plan tier, shown in your provider dashboard before you list.',
              ],
              [
                'Providers on a subscription billing model',
                'No per-transaction commission; a flat recurring fee applies instead.',
              ],
            ]}
            caption="The rates applicable to your account are shown in the platform and in your provider dashboard. We may agree different rates with individual providers."
          />
        </Only>
        <p><strong>How the fee is calculated:</strong></p>
        <ul>
          <Only for="sp" as="li">
            it is charged on the service subtotal. <strong>Tips are not subject to platform fees</strong>{' '}
            and pass to you in full;
          </Only>
          <li>
            where a booking is taken with a partial deposit, the fee is charged proportionately on
            the amount actually collected;
          </li>
        </ul>
        <LegalCallout tone="warning" title="Payment processing fees are set by Stripe, not by us">
          <p>
            Stripe charges its own fees on each transaction. They are deducted by Stripe, borne by
            the party receiving the funds, and we add nothing on top. The rates below are Stripe&apos;s
            published rates &mdash; each links to the page we took it from.
          </p>
          <LegalTable
            head={['Stripe fee', 'Rate', 'Source']}
            rows={[
              [
                'Base, per successful card transaction',
                <strong key="r1">2.9% + USD 0.30</strong>,
                <a key="s1" href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer">stripe.com/pricing</a>,
              ],
              [
                'International card (issued outside our account\u2019s country)',
                <strong key="r2">+ 1.5%</strong>,
                <a key="s2" href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer">stripe.com/pricing</a>,
              ],
              [
                'Currency conversion',
                <strong key="r3">+ 1%</strong>,
                <a key="s3" href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer">stripe.com/pricing</a>,
              ],
            ]}
            caption="Stripe\u2019s published rates as at 26 August 2026. Stripe sets them and may change them; its published page prevails over this table. The three are cumulative where all apply. Stripe does not offer accounts established in Saudi Arabia, so the international card fee applies to most Saudi-issued cards."
          />
          <p>
            Stripe does not return its processing fee when a payment is refunded (
            <a href="https://docs.stripe.com/refunds" target="_blank" rel="noopener noreferrer">docs.stripe.com/refunds</a>
            ). If we change payment processor, the fees that apply may change and the processor then
            in use will be identified in your account.
          </p>
        </LegalCallout>
        <p>
          We may change platform fees on reasonable notice. Where a change is scheduled in advance
          for your account, the platform will show the new rate and the date it takes effect.
        </p>
      </S>

      <S id="payouts" title="7. Payouts">
        <p>
          Funds owed to you accumulate in your connected Stripe account after platform fees and
          processing fees are deducted. <strong>Payouts are initiated on request</strong> through
          the platform rather than on an automatic schedule, so you control when funds move to your
          bank account.
        </p>
        <p>Payouts are only available once Stripe has completed verification of your connected account and enabled payouts on it. Until then, funds accumulate but cannot be withdrawn. We do not control the timing of Stripe&apos;s verification.</p>
        <p>
          We may delay the release of funds where a booking is still within a cancellation or
          refund window, where we are investigating suspected fraud or a breach of these Terms, or
          where we are required to do so by law or by Stripe.
        </p>
      </S>

      <S id="tax" title="8. Tax and invoicing">
        <p>
          You are responsible for determining, charging, collecting, reporting and remitting all
          taxes arising from your own sales and services, including value added tax at
          the applicable Saudi rate, and for issuing compliant tax invoices to your customers.
        </p>
        <p>
          Amounts we charge you may be exclusive of tax, in which case applicable tax is added. We
          do not provide tax or legal advice.
        </p>
      </S>

      <S id="refunds" title="9. Refunds, cancellations and chargebacks">
        <p>
          Refund entitlements differ depending on what was booked. They are set out in full in our{' '}
          <a href="/refund-policy/">Refund &amp; Cancellation Policy</a>, which forms part of these
          Terms. In summary:
        </p>
        <ul>
          <Only for="pm" as="li">
            <strong>Unit reservations</strong> follow the cancellation policy set for the unit, or a
            default sliding scale based on notice given before check-in.
          </Only>
        </ul>
        <p>
          <strong>Chargebacks.</strong> If a customer disputes a card payment, the disputed amount
          and any dispute fee are debited from the Accez platform account, and we are entitled to
          recover the full amount from you. You agree to cooperate promptly in contesting disputes,
          including providing evidence within the deadlines the card networks set. Excessive
          chargebacks may result in suspension.
        </p>
        <p>
          <strong>Negative balances.</strong> If refunds, reversals or chargebacks exceed your
          available balance, you must repay the shortfall on demand, and you authorise us to
          recover it from future receipts.
        </p>
      </S>

      <S id="providers" title="10. Service providers on the marketplace">
        <p>This section applies to service providers listing on the Accez marketplace.</p>
        <p>
          You are an <strong>independent business</strong>. Nothing in these Terms creates an
          employment, agency, partnership or joint-venture relationship between you and Accez. You
          decide what services you offer, your prices, your availability and how you perform the
          work. You are responsible for your own licences, permits, insurance, tax, staff and
          equipment.
        </p>
        <p>You are responsible for:</p>
        <ul>
          <li>the accuracy of your listing, prices, durations and photographs;</li>
          <li>performing bookings you accept, and for the quality and safety of your work;</li>
          <li>your own cancellation and no-show policy, and honouring it;</li>
          <li>customer service for your own bookings, including complaints and remedies; and</li>
          <li>complying with all laws applicable to your trade.</li>
        </ul>
        <p>
          By listing, you grant us a non-exclusive, worldwide, royalty-free licence to display your
          business name, description, images, service list and prices for the purpose of operating
          and promoting the marketplace. You can remove your listing at any time; this licence ends
          when the listing is removed, save for copies retained in backups, records or material
          already published.
        </p>
        <p>
          <strong>Reviews.</strong> Customers may leave ratings and reviews. Reviews are published
          as submitted. You may respond publicly and may report a review that breaches these Terms,
          but you may not require, incentivise or condition service on a favourable review, and you
          may not delete a review because you disagree with it.
        </p>
      </S>

      <S id="customer-content" title="11. Your content, your customers, your policies">
        <Only for="pm">
          <p>
            You keep ownership of everything you upload &mdash; property and unit records,
            documents, photographs, contracts and messages
            (&ldquo;<strong>Your Content</strong>&rdquo;).
          </p>
        </Only>
        <Only for="sp">
          <p>
            You keep ownership of everything you upload &mdash; your service listings, descriptions,
            pricing, photographs, documents and messages
            (&ldquo;<strong>Your Content</strong>&rdquo;).
          </p>
        </Only>
        <p>
          You grant us a licence to host, store, copy, transmit, display and process Your Content
          strictly to operate and support the platform for you, and to comply with law. We do not
          sell Your Content and do not use it to advertise to your customers.
        </p>
        <p>
          <strong>Legal text you publish to your own customers</strong> is <strong>your</strong>{' '}
          content and your responsibility. We host and display it; we do not review it, and we are
          not responsible for its legality, accuracy or enforceability.
        </p>
        <Only for="pm">
          <p>
            The same applies to lease and sale contract documents generated from templates in the
            platform. The platform assembles a document from the information and clauses{' '}
            <strong>you</strong> supply. It is not legal advice, we do not verify that a document is
            valid or enforceable in your jurisdiction, and you should have your contract templates
            reviewed by a qualified lawyer.
          </p>
        </Only>
      </S>

      <S id="acceptable-use" title="12. Acceptable use">
        <p>You must not, and must not permit anyone else to:</p>
        <ul>
          <li>use the platform for anything unlawful, or in breach of Saudi law;</li>
          <li>upload content that is fraudulent, defamatory, obscene, or infringes someone&apos;s rights;</li>
          <Only for="sp" as="li">list a service you are not licensed or qualified to perform;</Only>
          <Only for="pm" as="li">misrepresent a property, unit, price or availability;</Only>
          <Only for="sp" as="li">misrepresent a service, its price, its duration or your availability;</Only>
          <li>
            upload personal data about another person without a lawful basis, or upload special
            categories of data where you have no lawful basis to do so;
          </li>
          <li>
            send marketing to anyone without the consent required by Saudi law, or use contact
            details obtained through the platform for unrelated marketing;
          </li>
          <li>
            attempt to circumvent platform fees by taking a booking introduced through the platform
            off-platform in order to avoid them;
          </li>
          <li>
            probe, scan, penetration-test, scrape, reverse-engineer or overload the platform, or
            access data belonging to another account; or
          </li>
          <li>resell or white-label the platform without our written agreement.</li>
        </ul>
      </S>

      <S id="integrations" title="13. Third-party services and integrations">
        <p>
          The platform interoperates with third-party services, including payment processing,
          messaging and email delivery, media storage, mapping and error monitoring. Those services are operated by their providers under their
          own terms, and we are not responsible for their acts, omissions, availability or pricing.
        </p>
        <Only for="pm">
        <LegalCallout title="How reservation channels actually connect">
          <Only for="pm">
            <p>
              Reservation synchronisation with external booking channels operates through{' '}
              <strong>calendar feed import and export</strong> and through a connected channel
              management service. It does not depend on us holding an account or a direct API
              relationship with any particular booking site, and we make no commitment that any
              specific channel is or will remain connected.
            </p>
          </Only>
        </LegalCallout>
        </Only>
        <p>
          Where you connect a third-party account, you confirm you are entitled to do so and that
          doing so does not breach that service&apos;s terms.
        </p>
      </S>

      <S id="data" title="14. Data protection">
        <p>
          Our handling of personal data is described in the{' '}
          <a href="/privacy/">Privacy Policy</a>. In summary, and for the purposes of the Saudi
          Personal Data Protection Law:
        </p>
        <ul>
          <Only for="pm" as="li">
            for personal data you upload about your tenants, residents, owners, staff and
            customers, <strong>you</strong> decide the purposes and means, and we process it on
            your instructions;
          </Only>
          <Only for="sp" as="li">
            for personal data you hold about your own customers and staff, <strong>you</strong>{' '}
            decide the purposes and means, and we process it on your instructions;
          </Only>
          <li>
            for account, billing, security and product-improvement data, and for data relating to
            people who deal with Accez directly, <strong>we</strong> determine the purposes; and
          </li>
          <li>
            we do not intend to act as joint controllers with you; each of us is responsible for
            our own processing.
          </li>
        </ul>
        <p>
          You are responsible for giving the people whose data you upload the notices, and
          obtaining the consents, that the law requires &mdash; including consent for any marketing
          you send through the platform. You must not instruct us to process personal data in a way
          that would breach the law.
        </p>
      </S>

      <S id="ip" title="15. Intellectual property">
        <p>
          The platform, its software, design, documentation and trade marks are owned by us or our
          licensors. We grant you a limited, non-exclusive, non-transferable, revocable right to use
          the platform during your subscription, for your own business purposes.
        </p>
        <p>
          You may not copy, modify, create derivative works from, or attempt to derive the source
          code of the platform, except to the extent that restriction is prohibited by law.
        </p>
        <p>
          If you send us feedback or suggestions, we may use them without obligation or
          compensation. We may also produce aggregated and de-identified statistics from platform
          usage, provided they do not identify you, your customers or any individual.
        </p>
      </S>

      <S id="availability" title="16. Availability, support and changes">
        <p>
          We aim to keep the platform available and to resolve problems promptly, but we do not
          guarantee uninterrupted or error-free operation. Maintenance, third-party outages and
          events beyond our control can interrupt service.
        </p>
        <p>
          Unless we have separately agreed a written service level agreement with you, no uptime
          commitment, response time or service credit applies.
        </p>
        <p>
          We develop the platform continuously. Features may be added, changed or removed. We will
          not make a change that materially reduces the core functionality of a paid plan during a
          period you have paid for, without giving you notice and, where the change is materially
          adverse to you, a pro-rata refund for the unused remainder of that period.
        </p>
        <p>
          We may amend these Terms. For material changes we will give reasonable notice before they
          take effect. Continuing to use the platform after that date is acceptance. If you do not
          accept, you may terminate and stop using the platform.
        </p>
      </S>

      <S id="warranties" title="17. Disclaimers">
        <p>
          To the fullest extent permitted by law, the platform is provided{' '}
          <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>, and we disclaim all
          warranties, conditions and representations not expressly stated in these Terms, whether
          express, implied or statutory, including implied warranties of merchantability, fitness
          for a particular purpose and non-infringement.
        </p>
        <p>We specifically do not warrant that:</p>
        <ul>
          <li>the platform will be uninterrupted, secure or free of errors;</li>
          <Only for="pm" as="li">
            any owner, resident, guest or customer you deal with is trustworthy, licensed, solvent
            or suitable;
          </Only>
          <Only for="sp" as="li">
            any customer who books you is trustworthy, or that any business listed alongside you is
            licensed, solvent or suitable;
          </Only>
          <li>
            any document, contract or report generated by the platform is legally valid, complete
            or enforceable; or
          </li>
          <li>
            any calculation, statement or report is free of error &mdash; you should verify figures
            before relying on them.
          </li>
        </ul>
        <p>
          Nothing in these Terms excludes liability that cannot lawfully be excluded, including for
          fraud or fraudulent misrepresentation.
        </p>
      </S>

      <S id="liability" title="18. Limitation of liability">
        <LegalCallout tone="warning" title="What this section does not limit">
          <p>
            Nothing in this section limits or excludes: (a) liability for death or personal injury
            caused by negligence; (b) liability for fraud or fraudulent misrepresentation; (c) any
            right to compensation you have under the Personal Data Protection Law, which is a
            statutory right and is not capped by this agreement; or (d) any remedy that consumer
            protection law gives you and does not allow to be limited by contract.
          </p>
        </LegalCallout>
        <p>
          To the fullest extent permitted by law, neither party is liable for indirect, incidental,
          special, consequential or punitive loss, or for loss of profit, revenue, goodwill,
          business opportunity, or loss or corruption of data, however arising.
        </p>
        <p>
          We are not liable for losses arising from what any other user of the platform sells,
          supplies, prices or agrees, or from their conduct, acts or omissions, or from any dispute
          between them.
        </p>
      </S>

      <S id="indemnity" title="19. Indemnity">
        <p>
          You will indemnify and hold harmless Cloud Valley LLC, its affiliates, officers and
          employees against claims, losses, liabilities, damages, costs and reasonable legal fees
          arising out of or relating to:
        </p>
        <ul>
          <li>your use of the platform;</li>
          <Only for="pm" as="li">Your Content, contract templates and customer-facing policies;</Only>
          <Only for="sp" as="li">Your Content, your listings and your customer-facing policies;</Only>
          <Only for="pm" as="li">your tenancies, sales, reservations or stays;</Only>
          <Only for="sp" as="li">the services you provide and the bookings you accept;</Only>
          <li>your breach of these Terms or of any applicable law; or</li>
          <li>
            your handling of personal data, including any claim by a person whose data you uploaded.
          </li>
        </ul>
        <p>
          We will notify you of any claim, allow you to control the defence with counsel reasonably
          acceptable to us, and cooperate at your expense. You may not settle a claim in a way that
          imposes an obligation or admission on us without our written consent.
        </p>
      </S>

      <S id="suspension" title="20. Suspension and termination">
        <p>You may stop using the platform at any time, and cancel a subscription as described in section 4.</p>
        <p>
          We may suspend or restrict access immediately where we reasonably believe it is necessary
          to prevent fraud, protect the platform or its users, comply with law or a request from
          Stripe or a card network, or address a serious breach of these Terms. Where practical we
          will tell you why and what is needed to restore access.
        </p>
        <p>
          We may terminate this agreement for material breach that is not remedied within{' '}
          <strong>30 days</strong> of written notice, or immediately where the breach is not capable
          of remedy.
        </p>
        <p>
          <strong>On termination:</strong> your right to use the platform ends; fees already accrued
          remain payable; and any funds legitimately owed to you remain payable subject to any
          refunds, chargebacks or amounts you owe us.
        </p>
        <LegalCallout tone="warning" title="Export your data before you leave">
          <p>
            You are responsible for exporting your data before your account closes. After
            termination we are not obliged to retain or make available data associated with your
            account, other than what we must keep by law. If you need an export, ask us{' '}
            <strong>before</strong> you terminate, and we will make reasonable efforts to help.
          </p>
        </LegalCallout>
      </S>

      <S id="law" title="21. Governing law and disputes">
        <p>
          These Terms and any dispute arising out of or in connection with them, including
          non-contractual disputes, are governed by the laws of the{' '}
          <strong>Kingdom of Saudi Arabia</strong>.
        </p>
        <p>
          The parties will first attempt in good faith to resolve any dispute through discussion. If
          it is not resolved within <strong>30 days</strong>, it will be submitted to the competent
          courts of the Kingdom of Saudi Arabia, sitting in <strong>Riyadh</strong>, which have
          exclusive jurisdiction.
        </p>
        <p>
          Nothing in this section prevents either party from seeking urgent injunctive or interim
          relief from any court of competent jurisdiction.
        </p>
        <p>
          <strong>If you are a consumer.</strong> Nothing in this section removes any right you have
          to bring a claim before the court or authority that consumer protection law makes
          available to you, or requires you to give up a protection that law does not allow to be
          given up by contract.
        </p>
      </S>

      <S id="general" title="22. General">
        <p>
          <strong>Entire agreement.</strong> These Terms, the Privacy Policy, the Refund &amp;
          Cancellation Policy and any order form you sign form the whole agreement between us on
          this subject and replace any earlier understanding.
        </p>
        <p>
          <strong>Order of precedence.</strong> If there is a conflict, a signed order form prevails
          over these Terms, and these Terms prevail over the other policies, except that the Privacy
          Policy prevails on the handling of personal data.
        </p>
        <p>
          <strong>Assignment.</strong> You may not assign this agreement without our written
          consent. We may assign it to an affiliate or in connection with a merger, reorganisation
          or sale of the business.
        </p>
        <p>
          <strong>Severability.</strong> If any provision is held unenforceable, the rest remains in
          force and the unenforceable provision is modified to the minimum extent necessary.
        </p>
        <p>
          <strong>No waiver.</strong> A failure to enforce a right is not a waiver of it.
        </p>
        <p>
          <strong>Force majeure.</strong> Neither party is liable for failure to perform caused by
          events beyond its reasonable control, excluding payment obligations.
        </p>
        <p>
          <strong>No third-party rights.</strong> No person other than the parties has any right to
          enforce these Terms.
        </p>
      </S>

      <S id="contact" title="23. How to contact us">
        <p>
          <strong>Cloud Valley LLC</strong>
          <br />
          Commercial registration: 1010637845
          <br />
          Riyadh, Kingdom of Saudi Arabia
        </p>
        <p>
          General and contractual enquiries:{' '}
          <a href="/support/">our support form</a>
          <br />
          Privacy and data protection:{' '}
          <a href="/support/">our support form</a>
        </p>
      </S>
    </LegalLayout>
  )
}
