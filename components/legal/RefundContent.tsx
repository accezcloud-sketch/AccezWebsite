'use client'

import LegalLayout, {
  LegalSectionBlock as S,
  LegalCallout,
  LegalTable,
} from '@/components/LegalLayout'

const LAST_UPDATED = '25 August 2026'
const EFFECTIVE = '25 August 2026'

const sections = [
  { id: 'overview', title: '1. Overview — which policy applies to you' },
  { id: 'reservations', title: '2. Unit reservations and stays' },
  { id: 'marketplace', title: '3. Marketplace service bookings' },
  { id: 'deposits', title: '4. Deposits and part payments' },
  { id: 'subscriptions', title: '5. Accez subscription fees' },
  { id: 'fees-on-refund', title: '6. What happens to fees when money is refunded' },
  { id: 'how-to-request', title: '7. How to request a refund' },
  { id: 'timing', title: '8. How long a refund takes' },
  { id: 'chargebacks', title: '9. Chargebacks and payment disputes' },
  { id: 'sales', title: '10. Property sale payments' },
  { id: 'exceptions', title: '11. Exceptions and unusual circumstances' },
  { id: 'contact', title: '12. Contact' },
]

export default function RefundContent() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      subtitle="How cancellations and refunds work across reservations, marketplace bookings and Accez subscriptions — including who bears which fees."
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE}
      sections={sections}
    >
      <LegalCallout title="The one thing to understand first">
        <p>
          Accez processes payments, but Accez is <strong>not the seller</strong> of the stay or the
          service you booked. The cancellation terms that apply to a booking are set by the{' '}
          <strong>property manager or service provider</strong> you booked with. This policy
          explains how those terms are applied, what the defaults are when none has been set, and
          how fees are handled.
        </p>
      </LegalCallout>

      <S id="overview" title="1. Overview — which policy applies to you">
        <LegalTable
          head={['What you paid for', 'Who sets the terms', 'Default if none set']}
          rows={[
            [
              <strong key="a">A stay in a unit</strong>,
              'The property manager, per unit',
              'A sliding scale based on notice before check-in (section 2)',
            ],
            [
              <strong key="b">A service booking</strong>,
              'The service provider',
              <><strong key="n">No refund</strong> — see section 3</>,
            ],
            [
              <strong key="c">An Accez subscription</strong>,
              'Accez',
              'Non-refundable; access continues to period end (section 5)',
            ],
            [
              <strong key="d">A property purchase payment</strong>,
              'The seller and the sale contract',
              'Handled outside the platform (section 10)',
            ],
          ]}
        />
      </S>

      <S id="reservations" title="2. Unit reservations and stays">
        <p>
          Each unit can carry its own cancellation policy, set by the property manager. Where one
          has been set, <strong>it takes precedence</strong> and is shown to you before you confirm
          the booking. Always check it at the time of booking.
        </p>
        <p>Where a unit has no specific policy, this default applies, based on how far ahead of check-in you cancel:</p>
        <LegalTable
          head={['Notice given before check-in', 'Refund of the amount paid']}
          rows={[
            ['30 days or more', <strong key="1">100%</strong>],
            ['14 to 29 days', '75%'],
            ['7 to 13 days', '50%'],
            ['3 to 6 days', '25%'],
            ['24 to 48 hours', '10%'],
            ['Less than 24 hours', <strong key="2">No refund</strong>],
            ['After check-in has begun', <strong key="3">No refund</strong>],
          ]}
          caption="Percentages apply to the amount actually paid. The payment processing fee is deducted — see section 6."
        />
        <h3>If the property manager cancels</h3>
        <p>
          Where the <strong>property manager</strong> cancels rather than the guest, a more generous
          scale applies, because the cancellation was not your decision. In that case you receive a
          full refund if the cancellation happens well before check-in, and a substantial refund at
          shorter notice. The exact amount is calculated by the platform and shown on the
          cancellation record.
        </p>
      </S>

      <S id="marketplace" title="3. Marketplace service bookings">
        <p>
          Each service provider configures its own cancellation policy, covering how far in advance
          you must cancel for a full refund, what partial refund applies inside that window, and
          what happens if you do not attend.
        </p>
        <p>The policy is shown before you confirm a booking. When you cancel, the platform quotes the refund due under that provider&apos;s policy before you confirm the cancellation.</p>
        <LegalCallout tone="warning" title="If a provider has not configured a policy">
          <p>
            If a provider has not set a cancellation policy, or the booking has no scheduled start
            time recorded, the platform quotes <strong>no refund</strong>. This is the system&apos;s
            conservative default, not a judgement about the merits. If you believe a refund is fair
            in those circumstances, contact the provider directly &mdash; they can issue a refund
            manually, in full or in part, at any time.
          </p>
        </LegalCallout>
        <h3>Non-attendance</h3>
        <p>
          Where the booking start time has passed and you did not attend, the provider&apos;s
          no-show terms apply, which may be a reduced refund or none.
        </p>
        <h3>Partial refunds</h3>
        <p>
          Providers can issue partial refunds up to the amount actually charged. Where you paid only
          a deposit, refunds are limited to that deposit.
        </p>
      </S>

      <S id="deposits" title="4. Deposits and part payments">
        <p>
          Some bookings are taken with a deposit, with the balance payable later or directly to the
          provider. Where a deposit was taken through the platform:
        </p>
        <ul>
          <li>refund calculations apply to the amount <strong>actually collected</strong>, not the full booking value;</li>
          <li>platform fees are charged proportionately on the deposit, so a refund reverses them proportionately; and</li>
          <li>any balance you paid directly to a provider outside the platform is a matter between you and that provider &mdash; we have no record of it and cannot refund it.</li>
        </ul>
        <h3>Security deposits on tenancies</h3>
        <p>
          Security deposits recorded against a lease are <strong>record-keeping entries</strong>.
          The platform tracks the amount and whether it is refundable, but it does{' '}
          <strong>not</strong> hold or move that money. Return of a security deposit is entirely a
          matter between the tenant and the property manager, under the tenancy agreement and
          applicable law.
        </p>
      </S>

      <S id="subscriptions" title="5. Accez subscription fees">
        <p>
          Subscription fees are billed in advance and are <strong>non-refundable</strong>, including
          for partial periods and for periods left unused after a cancellation.
        </p>
        <p>
          When you cancel, your subscription remains active until the end of the period you have
          already paid for; it simply does not renew. Plan upgrades and downgrades are prorated by
          our payment processor.
        </p>
        <p>We will refund a subscription fee where:</p>
        <ul>
          <li>we charged you in error, or charged an amount you did not agree to;</li>
          <li>we withdraw a material part of a paid plan during a period you have paid for, in which case a pro-rata refund applies for the unused remainder; or</li>
          <li>a refund is required by applicable Saudi law.</li>
        </ul>
        <p>
          Requests for a subscription refund should go to{' '}
          <a href="mailto:billing@accez.cloud">billing@accez.cloud</a> with the invoice reference.
        </p>
      </S>

      <S id="fees-on-refund" title="6. What happens to fees when money is refunded">
        <p>
          This is the part most policies leave vague. It has a direct effect on how much money
          actually comes back, so it is set out here explicitly.
        </p>

        <h3>Payment processing fees</h3>
        <p>
          Our payment processor does <strong>not</strong> return its processing fee when a payment
          is refunded. The only exception is a payment cancelled very soon after it is taken, which
          may be processed as a reversal, in which case no processing fee is retained.
        </p>
        <LegalCallout tone="warning" title="Processing fees on reservation refunds">
          <p>
            For unit reservation refunds, the processing fee retained by the payment processor is{' '}
            <strong>deducted from the refund</strong>. The refund record shows the deduction, so you
            can see exactly what was withheld and why.
          </p>
        </LegalCallout>

        <h3>Accez platform fees</h3>
        <p>The treatment differs by booking type, and we would rather state that plainly than let it be discovered later:</p>
        <LegalTable
          head={['Booking type', 'What happens to the Accez platform fee']}
          rows={[
            [
              <strong key="a">Marketplace service bookings</strong>,
              <>The commission is <strong>refunded proportionately</strong>. On a full refund, the full commission is returned.</>,
            ],
            [
              <strong key="b">Unit reservations</strong>,
              <>The platform fee is <strong>not automatically returned</strong>. The refund is funded from the amount transferred to the property manager, so the manager bears the refund while the platform fee already charged remains charged.</>,
            ],
          ]}
        />
        <p>
          Property managers should take this into account when setting cancellation policies and
          pricing. If you believe a platform fee should be returned in a particular case &mdash; for
          example where a booking was cancelled because of a platform fault &mdash; contact{' '}
          <a href="mailto:billing@accez.cloud">billing@accez.cloud</a> and we will review it.
        </p>
      </S>

      <S id="how-to-request" title="7. How to request a refund">
        <LegalTable
          head={['If you are', 'Do this']}
          rows={[
            [
              'A guest who booked a stay',
              'Cancel through the platform, or contact the property manager. Cancelling applies the unit policy automatically.',
            ],
            [
              'A customer who booked a service',
              'Cancel through the platform or contact the provider. The refund due is quoted before you confirm.',
            ],
            [
              'A property manager',
              'Approve or reject refund requests from your dashboard, or issue a refund directly.',
            ],
            [
              'A service provider',
              'Issue a refund on your own booking from your dashboard, in full or in part.',
            ],
            [
              'An Accez subscriber',
              <>Email <a key="e" href="mailto:billing@accez.cloud">billing@accez.cloud</a> with your invoice reference.</>,
            ],
          ]}
        />
        <p>
          Refunds are returned to the <strong>original payment method</strong>. We cannot send a
          refund to a different card or account. If the original card has expired or been closed,
          the refund normally still reaches you through your card issuer &mdash; contact your bank
          if it does not appear.
        </p>
      </S>

      <S id="timing" title="8. How long a refund takes">
        <p>
          Once approved, a refund is submitted to the payment processor promptly. From there the
          timing is controlled by your bank or card issuer, and typically takes several business
          days to appear on your statement.
        </p>
        <p>
          Refunds issued very soon after the original payment may appear as the original charge
          disappearing from your statement, rather than as a separate credit.
        </p>
        <p>
          In rare cases a refund can fail &mdash; for example a closed account. The funds return to
          us, and we will contact you to arrange another way to return them.
        </p>
        <p>
          Where a refund cannot be processed automatically because the original payment record is
          incomplete, it is flagged for manual handling and may take longer. We will tell you if
          that applies to your refund.
        </p>
      </S>

      <S id="chargebacks" title="9. Chargebacks and payment disputes">
        <p>
          If you believe a charge is wrong, <strong>please contact us or the business you booked
          with first</strong>. Most issues are resolved faster that way than through a bank dispute,
          which can take weeks or months.
        </p>
        <p>
          If you do raise a dispute with your bank, the disputed amount and any dispute fee are
          debited from Accez, and we recover them from the business that received the payment. Both
          Accez and that business may submit evidence to the card network, including booking
          records, messages and cancellation history.
        </p>
        <p>
          Raising a chargeback for a booking you actually received, after a refund has already been
          issued, or in place of following the cancellation policy you agreed to, may result in
          suspension of your account.
        </p>
      </S>

      <S id="sales" title="10. Property sale payments">
        <p>
          Payments recorded against a property sale &mdash; deposits, instalments and settlement
          amounts &mdash; are <strong>recorded</strong> in the platform but are made and returned{' '}
          <strong>outside</strong> it, directly between buyer and seller.
        </p>
        <p>
          Accez does not hold, transfer or refund sale funds. Any refund of a sale payment is
          governed by the sale contract between the parties and by applicable Saudi law, including
          any rules on registration fees and taxes. Contact the seller or the brokerage, not us.
        </p>
      </S>

      <S id="exceptions" title="11. Exceptions and unusual circumstances">
        <p>
          A property manager or service provider may choose to issue a more generous refund than
          their policy requires. Nothing here prevents that.
        </p>
        <p>
          Where a stay or service could not go ahead because of circumstances outside everyone&apos;s
          control &mdash; a natural event, an official restriction, a utility failure making a
          property uninhabitable &mdash; we encourage the parties to reach a fair outcome, and we
          will support a manager or provider who chooses to refund in full. Accez does not decide
          those cases, and does not fund refunds beyond what was collected through the platform.
        </p>
        <p>
          Nothing in this policy limits rights you may have under mandatory Saudi consumer
          protection or e-commerce law.
        </p>
      </S>

      <S id="contact" title="12. Contact">
        <p>
          <strong>Cloud Valley LLC</strong>
          <br />
          Commercial registration: 1010637845
          <br />
          Riyadh, Kingdom of Saudi Arabia
        </p>
        <p>
          Billing and subscription refunds:{' '}
          <a href="mailto:billing@accez.cloud">billing@accez.cloud</a>
          <br />
          General support: <a href="mailto:support@accez.cloud">support@accez.cloud</a>
        </p>
        <p>
          Related documents: <a href="/terms/">Terms of Service</a> &middot;{' '}
          <a href="/privacy/">Privacy Policy</a>
        </p>
      </S>
    </LegalLayout>
  )
}
