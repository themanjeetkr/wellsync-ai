import { useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "A thoughtful place to begin.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: ["Unlimited private journaling", "Mood tracking", "Weekly reflection"],
  },
  {
    id: "plus",
    name: "MindScribe Plus",
    description: "More room for meaningful progress.",
    monthlyPrice: 299,
    yearlyPrice: 249,
    features: ["Everything in Free", "Unlimited AI reflections", "Advanced mood insights", "Nutrition analyzer"],
    featured: true,
  },
  {
    id: "care",
    name: "MindScribe Care",
    description: "A deeper view of your wellbeing.",
    monthlyPrice: 599,
    yearlyPrice: 499,
    features: ["Everything in Plus", "Personalized wellness plans", "Priority support", "Early access to new tools"],
  },
];

const formatPrice = (amount) => `₹${amount.toLocaleString("en-IN")}`;

function CheckoutPreview({ plan, billingCycle, onClose }) {
  const price = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
  const dueToday = billingCycle === "yearly" ? price * 12 : price;

  const handlePreview = () => {
    onClose();
    toast("Checkout preview only. No payment was processed.");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#151720] shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase text-sage-300">Checkout preview</p>
            <h2 id="checkout-title" className="mt-1 font-display text-xl font-semibold text-ink-100">Review your plan</h2>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 transition hover:bg-white/[0.06] hover:text-white" aria-label="Close checkout preview">
            <X size={17} />
          </button>
        </div>

        <div className="space-y-5 px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-ink-100">{plan.name}</p>
              <p className="mt-1 text-xs text-ink-500">{billingCycle === "yearly" ? "Annual billing" : "Monthly billing"}</p>
            </div>
            <p className="text-right text-sm font-semibold text-ink-100">
              {formatPrice(dueToday)}<span className="font-normal text-ink-500"> / {billingCycle === "yearly" ? "year" : "month"}</span>
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-ink-200">
              <CreditCard size={15} className="text-sage-300" /> Payment method
            </div>
            <p className="mt-2 text-xs leading-5 text-ink-500">Payment setup will appear here when checkout is connected.</p>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg border border-amber-300/15 bg-amber-300/[0.06] p-3 text-xs leading-5 text-amber-100/80">
            <LockKeyhole size={14} className="mt-0.5 shrink-0 text-amber-200" />
            This is a frontend preview. No payment details are collected and no charge will be made.
          </div>

          <button type="button" onClick={handlePreview} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-sage-500 px-4 text-sm font-semibold text-[#07120f] transition hover:bg-sage-400">
            Finish preview <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default function Billing() {
  const [billingCycle, setBillingCycle] = useState("yearly");
  const [checkoutPlan, setCheckoutPlan] = useState(null);

  return (
    <DashboardLayout title="Billing">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-9 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase text-sage-300">
              <Sparkles size={13} /> Membership
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">Choose care that fits.</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink-400">Simple plans for a steadier relationship with your wellbeing.</p>
          </div>
          <div className="inline-flex self-start rounded-xl border border-white/[0.07] bg-white/[0.025] p-1 sm:self-auto" aria-label="Billing frequency">
            {[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly", note: "Save 17%" },
            ].map(({ value, label, note }) => (
              <button
                key={value}
                type="button"
                aria-pressed={billingCycle === value}
                onClick={() => setBillingCycle(value)}
                className={`flex min-h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium transition ${billingCycle === value ? "bg-white/[0.09] text-ink-100" : "text-ink-500 hover:text-ink-200"}`}
              >
                {label}
                {note && <span className="rounded-md bg-sage-400/10 px-1.5 py-1 text-[10px] text-sage-300">{note}</span>}
              </button>
            ))}
          </div>
        </div>

        <section className="mb-8 grid gap-3 rounded-2xl border border-white/[0.07] bg-[#12141b]/90 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5" aria-labelledby="current-plan-title">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage-400/10 text-sage-300"><ShieldCheck size={18} /></span>
            <div>
              <p className="text-xs text-ink-500">CURRENT PLAN</p>
              <h3 id="current-plan-title" className="mt-1 font-display text-base font-semibold text-ink-100">Free <span className="ml-1 text-xs font-normal text-ink-500">· Active</span></h3>
              <p className="mt-1 text-xs leading-5 text-ink-500">Your account is on the free plan. Pick a plan below to preview an upgrade.</p>
            </div>
          </div>
          <span className="pl-[52px] text-sm font-medium text-ink-200 sm:pl-0">No payment method on file</span>
        </section>

        <section aria-label="Available plans" className="grid items-stretch gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const monthlyPrice = billingCycle === "yearly" ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <article
                key={plan.id}
                className={`relative flex min-w-0 flex-col rounded-2xl border p-5 transition duration-300 sm:p-6 ${plan.featured ? "border-sage-400/35 bg-[linear-gradient(145deg,rgba(78,140,124,0.14),rgba(22,24,30,0.96)_55%)] shadow-[0_18px_60px_rgba(39,103,86,0.12)]" : "border-white/[0.07] bg-[#12141b]/85"}`}
                style={{ animation: "fadeUp 420ms ease both", animationDelay: `${index * 90}ms` }}
              >
                {plan.featured && <span className="absolute right-4 top-4 rounded-full border border-sage-300/20 bg-sage-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase text-sage-200">Most popular</span>}
                <div className="mb-5 pr-20">
                  <h3 className="font-display text-base font-semibold text-ink-100">{plan.name}</h3>
                  <p className="mt-1.5 min-h-10 text-xs leading-5 text-ink-500">{plan.description}</p>
                </div>
                <div className="mb-5">
                  <p className="flex items-baseline gap-1 text-3xl font-semibold text-ink-100">
                    {formatPrice(monthlyPrice)}<span className="text-xs font-normal text-ink-500">/ month</span>
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    {monthlyPrice === 0 ? "Always free" : billingCycle === "yearly" ? `${formatPrice(monthlyPrice * 12)} billed yearly` : "Billed monthly"}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={plan.id === "free"}
                  onClick={() => setCheckoutPlan(plan)}
                  className={`flex min-h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition disabled:cursor-default ${plan.featured ? "bg-sage-400 text-[#07120f] hover:bg-sage-300" : "border border-white/10 bg-white/[0.04] text-ink-200 hover:bg-white/[0.08]"} disabled:opacity-70`}
                >
                  {plan.id === "free" ? "Current plan" : <>Preview plan <ChevronRight size={15} /></>}
                </button>
                <div className="my-5 border-t border-white/[0.07]" />
                <p className="mb-3 text-[10px] font-semibold uppercase text-ink-500">What’s included</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs leading-5 text-ink-300">
                      <Check size={14} className="mt-0.5 shrink-0 text-sage-300" />{feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <section className="mt-8 border-t border-white/[0.07] pt-6" aria-labelledby="payment-history-title">
          <div className="mb-4 flex items-center gap-2.5">
            <ReceiptText size={16} className="text-ink-400" />
            <h3 id="payment-history-title" className="font-display text-sm font-semibold text-ink-200">Payment history</h3>
          </div>
          <div className="flex flex-col items-start gap-2 rounded-xl border border-dashed border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-ink-500"><CreditCard size={16} /></span>
            <div>
              <p className="text-sm text-ink-300">No payments yet</p>
              <p className="mt-1 text-xs text-ink-500">Receipts will be listed here after billing is connected.</p>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-[11px] text-ink-600">Plans can be reviewed at any time from your account.</p>
      </div>

      {checkoutPlan && <CheckoutPreview plan={checkoutPlan} billingCycle={billingCycle} onClose={() => setCheckoutPlan(null)} />}
    </DashboardLayout>
  );
}