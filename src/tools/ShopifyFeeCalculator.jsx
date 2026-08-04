import React, { useState } from 'react';
import { CreditCard, Layers } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};
const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function ShopifyFeeCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000);
  const [avgOrderValue, setAvgOrderValue] = useState(65.00);
  const [plan, setPlan] = useState('basic');
  const [useShopifyPayments, setUseShopifyPayments] = useState(true);

  // Plan pricing 2026
  const plans = {
    basic: { name: 'Shopify Basic', monthly: 39, ccRate: 0.029, ccFixed: 0.30, externalFee: 0.02 },
    shopify: { name: 'Shopify Standard', monthly: 105, ccRate: 0.026, ccFixed: 0.30, externalFee: 0.01 },
    advanced: { name: 'Shopify Advanced', monthly: 399, ccRate: 0.024, ccFixed: 0.30, externalFee: 0.006 },
  };

  const selectedPlan = plans[plan];
  const orderCount = avgOrderValue > 0 ? (monthlyRevenue / avgOrderValue) : 0;

  // Credit card processing fees
  const ccPercentageCost = monthlyRevenue * selectedPlan.ccRate;
  const ccFixedCost = orderCount * selectedPlan.ccFixed;
  const totalCcFees = ccPercentageCost + ccFixedCost;

  // External payment gateway penalty (if not using Shopify Payments)
  const externalPenalty = useShopifyPayments ? 0 : (monthlyRevenue * selectedPlan.externalFee);

  const totalShopifyMonthlyCost = selectedPlan.monthly + totalCcFees + externalPenalty;
  const effectiveFeePercent = monthlyRevenue > 0 ? ((totalShopifyMonthlyCost / monthlyRevenue) * 100) : 0;
  const netRevenueAfterShopify = monthlyRevenue - totalShopifyMonthlyCost;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Which Shopify plan actually pays for itself?
          </h1>
          <span className="badge badge-success">COMPARE PLANS</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Compare monthly cost against your real card processing rates before you commit.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* Left Column (Inputs) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-card">
            <div style={SL}>
              <Layers size={13} color="var(--brand)" /> 1. Monthly Store Volume
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Monthly gross store revenue ($)</label>
              <input
                type="number"
                step="100"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(parseFloat(e.target.value) || 0)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label>Average order value (AOV) ($)</label>
              <input
                type="number"
                step="1"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(parseFloat(e.target.value) || 0)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 18 }}
              />
            </div>
          </div>

          <div className="form-card">
            <div style={SL}>
              <CreditCard size={13} color="var(--brand)" /> 2. Shopify Plan &amp; Payments
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Shopify subscription tier (2026)</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 13, fontWeight: 500 }}
              >
                <option value="basic">Shopify Basic ($39/mo • 2.9% + 30¢)</option>
                <option value="shopify">Shopify Standard ($105/mo • 2.6% + 30¢)</option>
                <option value="advanced">Shopify Advanced ($399/mo • 2.4% + 30¢)</option>
              </select>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 14, borderRadius: 10, background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border)'
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>Use Shopify Payments?</div>
                <div style={{ fontSize: 12, color: 'var(--text-4)' }}>Avoids 0.6%–2% external gateway penalty</div>
              </div>
              <button
                type="button"
                onClick={() => setUseShopifyPayments(!useShopifyPayments)}
                style={{
                  padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  background: useShopifyPayments ? 'var(--brand)' : 'rgba(255,255,255,0.1)',
                  color: useShopifyPayments ? '#fff' : 'var(--text-4)'
                }}
              >
                {useShopifyPayments ? 'Yes (0% penalty)' : 'No (External)'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Results - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>
          {/* Primary Hero Banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: netRevenueAfterShopify >= 0 ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))' : 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.03))',
            border: netRevenueAfterShopify >= 0 ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(239,68,68,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              You keep (after Shopify)
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: netRevenueAfterShopify >= 0 ? '#4ade80' : '#f87171' }}>
              ${netRevenueAfterShopify.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              Shopify keeps <strong style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>${totalShopifyMonthlyCost.toFixed(2)}</strong> ({effectiveFeePercent.toFixed(2)}% effective cut)
            </div>
          </div>

          {/* Secondary Cost Summary */}
          <div style={{
            padding: 18, borderRadius: 14,
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 6 }}>
              Total monthly Shopify cost
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
              ${totalShopifyMonthlyCost.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 4 }}>
              Est. {Math.round(orderCount)} monthly orders · <span style={{ fontFamily: 'var(--font-mono)' }}>${orderCount > 0 ? (totalShopifyMonthlyCost / orderCount).toFixed(2) : '0.00'}</span> average fee per order
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Fee breakdown
              </span>
              <CopySummaryButton
                title="Shopify Fee & Plan Breakdown"
                lines={[
                  { label: 'Selected Plan', value: selectedPlan.name },
                  { label: 'Monthly Gross Store Revenue', value: `$${monthlyRevenue.toLocaleString()}` },
                  { label: 'Total Orders / Month', value: `${Math.round(orderCount)} orders` },
                  { label: 'Credit Card Processing Fees', value: `$${totalCcFees.toFixed(2)}` },
                  { label: 'Third-Party Transaction Fees', value: `$${externalPenalty.toFixed(2)}` },
                  { label: 'Total Shopify Monthly Cost', value: `$${totalShopifyMonthlyCost.toFixed(2)} (${effectiveFeePercent.toFixed(2)}% Effective Cut)` },
                ]}
              />
            </div>

            {[
              { label: 'Monthly GMV', value: `$${monthlyRevenue.toLocaleString()}`, color: 'var(--text-1)', bold: true },
              { divider: true },
              { label: `Subscription plan (${selectedPlan.name})`, value: `-$${selectedPlan.monthly.toFixed(2)}`, color: '#f87171' },
              { label: `CC processing (${(selectedPlan.ccRate * 100).toFixed(1)}% + 30¢)`, value: `-$${totalCcFees.toFixed(2)}`, color: '#f87171' },
              ...(useShopifyPayments ? [] : [
                { label: `External gateway penalty (${(selectedPlan.externalFee * 100).toFixed(1)}%)`, value: `-$${externalPenalty.toFixed(2)}`, color: '#f87171' }
              ]),
              { divider: true },
              { label: `Total Shopify cut (${effectiveFeePercent.toFixed(2)}%)`, value: `-$${totalShopifyMonthlyCost.toFixed(2)}`, color: '#f87171', bold: true },
              { label: 'Net revenue after Shopify', value: `$${netRevenueAfterShopify.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, color: '#4ade80', bold: true },
            ].map((r, i) =>
              r.divider ? (
                <div key={i} style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} />
              ) : (
                <div key={i} style={ROW}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color }}>
                    {r.value}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> Upgrading from Shopify Basic ($39) to Shopify Standard ($105) pays for itself automatically once your store revenue exceeds $22,000/month due to the 0.3% CC processing savings.
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 12, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>
        </div>
      </div>
    </div>
  );
}
