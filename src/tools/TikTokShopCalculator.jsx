import React, { useState } from 'react';
import { ShoppingBag, DollarSign } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};
const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function TikTokShopCalculator() {
  const [price, setPrice] = useState(29.99);
  const [platformFeePercent, setPlatformFeePercent] = useState(6);
  const [affiliateCut, setAffiliateCut] = useState(15);
  const [shippingSubsidy, setShippingSubsidy] = useState(0);
  const [cogs, setCogs] = useState(7.50);

  // Math
  const tiktokPlatformFee = (price * (platformFeePercent / 100));
  const creatorCommission = (price * (affiliateCut / 100));
  const totalFees = tiktokPlatformFee + creatorCommission + shippingSubsidy;
  const netSellerRevenue = price - totalFees;
  const netProfit = netSellerRevenue - cogs;
  const marginPercent = price > 0 ? ((netProfit / price) * 100) : 0;
  const breakEvenPrice = (cogs + shippingSubsidy) / (1 - ((platformFeePercent + affiliateCut) / 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            TikTok Shop Profit &amp; Commission Calculator
          </h1>
          <span className="badge badge-brand">6% PLATFORM FEE</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          See exactly what hits your bank account after TikTok's 6% platform fee, creator affiliate cuts, and shipping costs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* Left Column (Inputs) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-card">
            <div style={SL}>
              <ShoppingBag size={13} color="var(--brand)" /> 1. Selling Price &amp; Creator Cut
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Item selling price ($)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }}
              />
            </div>

            <div style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Affiliate creator commission cut (%)</label>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand)' }}>
                  {affiliateCut}% (${creatorCommission.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={affiliateCut}
                onChange={(e) => setAffiliateCut(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                <span>0% (No Affiliates)</span>
                <span>15% (Standard)</span>
                <span>35% (Viral Boost)</span>
              </div>
            </div>
          </div>

          <div className="form-card">
            <div style={SL}>
              <DollarSign size={13} color="var(--brand)" /> 2. Platform Fee &amp; Product Costs
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>TikTok Shop platform cut (%)</label>
              <select
                value={platformFeePercent}
                onChange={(e) => setPlatformFeePercent(parseFloat(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border)', color: 'var(--text-1)', fontSize: 13, fontWeight: 500 }}
              >
                <option value={6}>Standard Shop Commission (6% standard)</option>
                <option value={5}>Electronics / Large Appliances (5%)</option>
                <option value={8}>Beauty &amp; Personal Care (8%)</option>
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
                <label>Shipping subsidy ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingSubsidy}
                  onChange={(e) => setShippingSubsidy(parseFloat(e.target.value) || 0)}
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
              Take-home profit per order (<strong style={{ color: netProfit >= 0 ? '#4ade80' : '#f87171', fontFamily: 'var(--font-mono)' }}>{marginPercent.toFixed(1)}% margin</strong>)
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
              Minimum price required to cover COGS, shipping, and TikTok/affiliate fees
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Per-order breakdown
              </span>
              <CopySummaryButton
                title="TikTok Shop Fee & Margin Breakdown"
                lines={[
                  { label: 'Selling Price', value: `$${price.toFixed(2)}` },
                  { label: `Platform Fee (${platformFeePercent}%)`, value: `-$${tiktokPlatformFee.toFixed(2)}` },
                  { label: `Creator Commission (${affiliateCut}%)`, value: `-$${creatorCommission.toFixed(2)}` },
                  { label: 'Shipping Subsidy', value: `-$${shippingSubsidy.toFixed(2)}` },
                  { label: 'Unit COGS', value: `-$${cogs.toFixed(2)}` },
                  { label: 'Net Profit', value: `$${netProfit.toFixed(2)} (${marginPercent.toFixed(1)}% Margin)` },
                  { label: 'Break-Even Selling Price', value: `$${breakEvenPrice.toFixed(2)}` },
                ]}
              />
            </div>

            {[
              { label: 'Customer pays', value: `$${price.toFixed(2)}`, color: 'var(--text-1)', bold: true },
              { divider: true },
              { label: `TikTok platform fee (${platformFeePercent}%)`, value: `-$${tiktokPlatformFee.toFixed(2)}`, color: '#f87171' },
              { label: `Creator affiliate cut (${affiliateCut}%)`, value: `-$${creatorCommission.toFixed(2)}`, color: '#f87171' },
              { label: 'Shipping subsidy', value: `-$${shippingSubsidy.toFixed(2)}`, color: '#f87171' },
              { label: 'Unit COGS', value: `-$${cogs.toFixed(2)}`, color: '#f87171' },
              { divider: true },
              { label: 'Net seller revenue', value: `$${netSellerRevenue.toFixed(2)}`, color: 'var(--text-2)' },
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
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> In 2026, top TikTok Shop affiliates prioritize products offering at least a 15%–20% commission. Pricing for a 60%+ gross margin ensures you stay profitable even during viral spikes.
          </div>
        </div>
      </div>
    </div>
  );
}
