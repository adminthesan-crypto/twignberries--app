import React, { useState } from 'react';
import { Package, DollarSign } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};
const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function AmazonFbaCalculator() {
  const [price, setPrice] = useState(39.99);
  const [categoryRate, setCategoryRate] = useState(15);
  const [fbaTier, setFbaTier] = useState(4.75);
  const [cogs, setCogs] = useState(11.50);
  const [inboundShipping, setInboundShipping] = useState(1.20);

  // Math
  const referralFee = (price * (categoryRate / 100));
  const fbaFee = fbaTier;
  const totalAmazonFees = referralFee + fbaFee;
  const totalCosts = totalAmazonFees + cogs + inboundShipping;
  const netProfit = price - totalCosts;
  const marginPercent = price > 0 ? ((netProfit / price) * 100) : 0;
  const breakEvenPrice = (fbaFee + cogs + inboundShipping) / (1 - (categoryRate / 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Amazon FBA Referral &amp; Net Profit Calculator
          </h1>
          <span className="badge badge-brand">8%–17% REFERRAL</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          See your exact net margin after Amazon referral percentages and fulfillment tiers before you ship inventory.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* Left Column (Inputs) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-card">
            <div style={SL}>
              <Package size={13} color="var(--brand)" /> 1. Selling Price &amp; Category
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Selling price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label>Amazon referral fee category</label>
              <select
                value={categoryRate}
                onChange={(e) => setCategoryRate(parseFloat(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 13, fontWeight: 500 }}
              >
                <option value={8}>Electronics / Camera / Personal Computers (8%)</option>
                <option value={15}>Standard Categories (Home, Kitchen, Toys, Beauty) (15%)</option>
                <option value={17}>Apparel &amp; Clothing / Accessories (17%)</option>
                <option value={20}>Jewelry &amp; Fine Watches (20%)</option>
              </select>
            </div>
          </div>

          <div className="form-card">
            <div style={SL}>
              <DollarSign size={13} color="var(--brand)" /> 2. FBA Fulfillment &amp; Product Costs
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>FBA size &amp; weight tier (pick &amp; pack)</label>
              <select
                value={fbaTier}
                onChange={(e) => setFbaTier(parseFloat(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 13, fontWeight: 500 }}
              >
                <option value={3.22}>Small Standard (Under 4 oz) — $3.22</option>
                <option value={3.77}>Small Standard (4 to 8 oz) — $3.77</option>
                <option value={4.75}>Large Standard (1 lb) — $4.75</option>
                <option value={5.40}>Large Standard (1.5 lb) — $5.40</option>
                <option value={6.10}>Large Standard (2 lb) — $6.10</option>
                <option value={9.73}>Small Oversize (Up to 70 lb) — $9.73</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Unit COGS ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={cogs}
                  onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 16 }}
                />
              </div>

              <div>
                <label>Inbound shipping ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={inboundShipping}
                  onChange={(e) => setInboundShipping(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 16 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Results - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>
          {/* Primary Hero Banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: netProfit >= 0 ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))' : 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.03))',
            border: netProfit >= 0 ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(239,68,68,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              Your net profit
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: netProfit >= 0 ? '#4ade80' : '#f87171' }}>
              ${netProfit.toFixed(2)}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              Take-home profit per unit (<strong style={{ color: netProfit >= 0 ? '#4ade80' : '#f87171', fontFamily: 'var(--font-mono)' }}>{marginPercent.toFixed(1)}% margin</strong>) · Amazon keeps <strong style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>${totalAmazonFees.toFixed(2)}</strong>
            </div>
          </div>

          {/* Secondary Target Banner */}
          <div style={{
            padding: 18, borderRadius: 14,
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 6 }}>
              Break-even target
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
              ${breakEvenPrice.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 4 }}>
              Minimum selling price required to cover COGS, inbound shipping, referral, and FBA fees
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Unit economics breakdown
              </span>
              <CopySummaryButton
                title="Amazon FBA Fee & Margin Breakdown"
                lines={[
                  { label: 'Selling Price', value: `$${price.toFixed(2)}` },
                  { label: `Referral Fee (${categoryRate}%)`, value: `-$${referralFee.toFixed(2)}` },
                  { label: 'FBA Fulfillment Fee', value: `-$${fbaFee.toFixed(2)}` },
                  { label: 'Unit COGS', value: `-$${cogs.toFixed(2)}` },
                  { label: 'Inbound Shipping', value: `-$${inboundShipping.toFixed(2)}` },
                  { label: 'Net Profit per Unit', value: `$${netProfit.toFixed(2)} (${marginPercent.toFixed(1)}% Margin)` },
                  { label: 'Break-Even Selling Price', value: `$${breakEvenPrice.toFixed(2)}` },
                ]}
              />
            </div>

            {[
              { label: 'Selling price', value: `$${price.toFixed(2)}`, color: 'var(--text-1)', bold: true },
              { divider: true },
              { label: `Amazon referral fee (${categoryRate}%)`, value: `-$${referralFee.toFixed(2)}`, color: '#f87171' },
              { label: 'FBA pick & pack fee', value: `-$${fbaFee.toFixed(2)}`, color: '#f87171' },
              { label: 'Unit COGS', value: `-$${cogs.toFixed(2)}`, color: '#f87171' },
              { label: 'Inbound shipping', value: `-$${inboundShipping.toFixed(2)}`, color: '#f87171' },
              { divider: true },
              { label: 'Total Amazon cut', value: `-$${totalAmazonFees.toFixed(2)}`, color: '#f87171' },
              { label: `Net profit (${marginPercent.toFixed(1)}% margin)`, value: `$${netProfit.toFixed(2)}`, color: netProfit >= 0 ? '#4ade80' : '#f87171', bold: true },
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
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> Amazon applies a minimum $0.30 referral fee on most categories. If your unit COGS + FBA exceeds your break-even threshold of ${breakEvenPrice.toFixed(2)}, you will incur a loss per order.
          </div>
        </div>
      </div>
    </div>
  );
}
