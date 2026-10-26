import LegalLayout, { LegalCallout, LegalTable, legalDocumentParts } from '@/components/LegalLayout'
import { REFUND_SECTIONS, type AudienceView } from '@/lib/legal/audience'

const LAST_UPDATED = '25 August 2026'
const EFFECTIVE = '25 August 2026'

export default function RefundContent({ audience }: { audience: AudienceView }) {
  const { S, Only, SectionNo, DocLink } = legalDocumentParts(REFUND_SECTIONS, audience, 'en')
  return (
    <LegalLayout
      locale="en"
      title="Refund & Cancellation Policy"
      subtitle={audience === 'pm' ? 'How cancellations and refunds work for reservations and Accez subscriptions, and who bears which fees.' : 'How cancellations and refunds work for marketplace bookings and Accez subscriptions, and who bears which fees.'}
      lastUpdated={LAST_UPDATED}
      effectiveDate={EFFECTIVE}
      doc="refund-policy"
      sections={REFUND_SECTIONS}
      audience={audience}
    >
      <LegalCallout title="The one thing to understand first">
        <p>
          Accez processes payments, but Accez is <strong>not the seller</strong> of what was
          booked. This policy explains how refunds and fees are handled.
        </p>
      </LegalCallout>

      <S id="overview" title="Overview: which policy applies to you">
        <Only for="pm">
          <LegalTable
            head={['What was paid for', 'Who sets the terms', 'Details']}
            rows={[
              [
                <strong key="a">A stay in a unit</strong>,
                'You, the property manager, per unit',
                <>The cancellation policy set for the unit (section <SectionNo to="reservations" />)</>,
              ],
              [
                <strong key="c">An Accez subscription</strong>,
                'Accez',
                <>Non-refundable; access continues to period end (section <SectionNo to="subscriptions" />)</>,
              ],
              [
                <strong key="d">A property purchase payment</strong>,
                'The seller and the sale contract',
                <>Handled outside the platform (section <SectionNo to="sales" />)</>,
              ],
            ]}
          />
        </Only>
        <Only for="sp">
          <LegalTable
            head={['What was paid for', 'Who sets the terms', 'Details']}
            rows={[
              [
                <strong key="c">An Accez subscription</strong>,
                'Accez',
                <>Non-refundable; access continues to period end (section <SectionNo to="subscriptions" />)</>,
              ],
            ]}
          />
        </Only>
      </S>

      <S id="reservations" title="Unit reservations and stays">
        <p>
          Each unit can carry its own cancellation policy, set by the property manager. Where one
          has been set, <strong>it is the policy that applies</strong>, and the guest is shown it
          before confirming the booking.
        </p>
        <p>
          The platform lets you set that policy however you choose, including a scale that varies
          with how much notice the guest gives before check-in. Whatever you set is what applies.
        </p>
        <LegalCallout tone="warning" title="Accez does not impose a cancellation policy">
          <p>
            Accez does not set the cancellation policy. The terms that apply to a booking are the
            terms you set for that unit and that were shown to the guest before they confirmed.
          </p>
        </LegalCallout>
        <p>
          Payment processing fees are not returned by the payment processor when a payment is
          refunded, so the amount that reaches the guest is the amount you approve less those fees
          (see section <SectionNo to="fees-on-refund" />).
        </p>
      </S>


      <S id="deposits" title="Deposits and part payments">
        <Only for="sp">
          <p>
            Some bookings are taken with a deposit, with the balance payable later or directly to the
            provider. Where a deposit was taken through the platform:
          </p>
        </Only>
        <Only for="pm">
          <p>Where a reservation was paid with a deposit through the platform:</p>
        </Only>
        <ul>
          <Only for="pm" as="li">refund calculations apply to the amount <strong>actually collected</strong>, not the full booking value;</Only>
          <Only for="sp" as="li">refund calculations apply to the amount <strong>actually collected</strong>, not the full booking value; and</Only>
          <Only for="pm" as="li">the platform fee charged on the deposit is not automatically returned (section <SectionNo to="fees-on-refund" />).</Only>
          <Only for="sp" as="li">any balance a customer paid you directly, outside the platform, is a matter between you and that customer. We have no record of it and cannot refund it.</Only>
        </ul>
        <Only for="pm">
          <h3>Security deposits on tenancies</h3>
          <p>
            Security deposits recorded against a lease are <strong>record-keeping entries</strong>.
            The platform tracks the amount and whether it is refundable, but it does{' '}
            <strong>not</strong> hold or move that money. Return of a security deposit is entirely a
            matter between the tenant and the property manager, under the tenancy agreement and
            applicable law.
          </p>
        </Only>
      </S>

      <S id="subscriptions" title="Accez subscription fees">
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
          <a href="/support/">our support form</a> with the invoice reference.
        </p>
      </S>

      <S id="fees-on-refund" title="What happens to fees when money is refunded">
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
        <Only for="pm">
          <LegalCallout tone="warning" title="Processing fees on reservation refunds">
            <p>
              For unit reservation refunds, the processing fee retained by the payment processor is{' '}
              <strong>deducted from the refund</strong>. The refund record shows the deduction, so
              you can see exactly what was withheld and why.
            </p>
          </LegalCallout>
        </Only>

        <Only for="pm">
          <h3>Accez platform fees</h3>
          <p>We would rather state this plainly than let it be discovered later:</p>
          <p>
            On a <strong>unit reservation</strong>, the platform fee is{' '}
            <strong>not automatically returned</strong>. The refund is funded from the amount
            transferred to you, so you bear the refund while the platform fee already charged
            remains charged.
          </p>
          <p>
            Property managers should take this into account when setting cancellation policies and
            pricing. If you believe a platform fee should be returned in a particular case (for
            example where a booking was cancelled because of a platform fault), contact{' '}
            <a href="/support/">our support form</a> and we will review it.
          </p>
        </Only>
      </S>

      <S id="how-to-request" title="How to request a refund">
        <Only for="pm">
          <LegalTable
            head={['Who', 'How a refund is handled']}
            rows={[
              [
                'A guest who booked a stay with you',
                'They cancel through the platform, or contact you. Cancelling applies the unit policy automatically.',
              ],
              [
                'You, the property manager',
                'Approve or reject refund requests from your dashboard, or issue a refund directly.',
              ],
              [
                'You, as an Accez subscriber',
                <>Contact us through <a key="e" href="/support/">our support form</a> with your invoice reference.</>,
              ],
            ]}
          />
        </Only>
        <Only for="sp">
          <LegalTable
            head={['Who', 'How a refund is handled']}
            rows={[
              [
                'You, as an Accez subscriber',
                <>Contact us through <a key="f" href="/support/">our support form</a> with your invoice reference.</>,
              ],
            ]}
          />
        </Only>
        <p>
          Refunds are returned to the <strong>original payment method</strong>. We cannot send a
          refund to a different card or account. If the original card has expired or been closed,
          the refund normally still reaches you through your card issuer. Contact your bank
          if it does not appear.
        </p>
      </S>

      <S id="timing" title="How long a refund takes">
        <p>
          Once approved, the refund is submitted to our payment processor, which submits it to the
          customer&apos;s bank or card issuer. <strong>From that point the timing is set by the
          processor and the bank, not by us.</strong> The figures below are the payment
          processor&apos;s own published statements about its refund handling.
        </p>
        <LegalTable
          head={['What the payment processor states', 'Time it gives']}
          rows={[
            [
              'A refund appears on the customer’s statement as a credit',
              'Approximately 5 to 10 business days after the refund is submitted, depending on the bank',
            ],
            [
              'A failed refund is returned by the bank and added back to the account balance',
              'Up to 30 days from when the refund was requested',
            ],
            [
              'A trace reference for the refund (ARN, STAN or RRN) becomes available',
              'Up to 7 business days after the refund is initiated, where the financial partner supports one',
            ],
          ]}
          caption="These are the payment processor’s published figures at the date of this policy and it may change them. We do not control them and cannot shorten them."
        />
        <LegalCallout title="A refund issued soon after payment looks different">
          <p>
            The payment processor states that a refund issued shortly after the original charge is
            handled as a <strong>reversal</strong> rather than a refund: the original charge drops
            off the statement and <strong>no separate credit is issued</strong>. A trace reference
            is not available for a reversal, because the original charge is not processed.
          </p>
        </LegalCallout>
        <p>
          A refund can fail where the bank or card issuer cannot process it, for example a
          closed or cancelled account. The amount returns to us within the period above, and we will
          then contact you to arrange another way to return it. Refunds to an expired or cancelled
          card are handled by the card issuer, which usually credits a replacement card or, if there
          is none, returns the money by another route.
        </p>
      </S>

      <S id="chargebacks" title="Chargebacks and payment disputes">
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

      <S id="sales" title="Property sale payments">
        <p>
          Payments recorded against a property sale (deposits, instalments and settlement
          amounts) are <strong>recorded</strong> in the platform but are made and returned{' '}
          <strong>outside</strong> it, directly between buyer and seller.
        </p>
        <p>
          Accez does not hold, transfer or refund sale funds. Any refund of a sale payment is
          governed by the sale contract between the parties and by applicable Saudi law, including
          any rules on registration fees and taxes. Contact the seller or the brokerage, not us.
        </p>
      </S>

      <S id="exceptions" title="Exceptions and unusual circumstances">
        <Only for="pm">
          <p>
            A business using Accez may choose to issue a more generous refund than
            their policy requires. Nothing here prevents that.
          </p>
          <p>
            Where what was booked could not go ahead because of circumstances outside
            everyone&apos;s control (a natural event, an official restriction, a utility
            failure), we encourage the parties to reach a fair outcome, and we
            will support a business that chooses to refund in full. Accez does not decide
            those cases, and does not fund refunds beyond what was collected through the platform.
          </p>
        </Only>
        <p>
          Nothing in this policy limits rights you may have under mandatory Saudi consumer
          protection or e-commerce law.
        </p>
      </S>

      <S id="contact" title="Contact">
        <p>
          <strong>Cloud Valley LLC</strong>
          <br />
          Commercial registration: 1010637845
          <br />
          Riyadh, Kingdom of Saudi Arabia
        </p>
        <p>
          Billing and subscription refunds:{' '}
          <a href="/support/">our support form</a>
          <br />
          General support: <a href="/support/">our support form</a>
        </p>
        <p>
          Related documents: <DocLink to="terms">Terms of Service</DocLink> &middot;{' '}
          <DocLink to="privacy">Privacy Policy</DocLink>
        </p>
      </S>
    </LegalLayout>
  )
}
