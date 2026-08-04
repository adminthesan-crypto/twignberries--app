import React, { useState } from 'react';
import { DollarSign, TrendingUp, PieChart, Info } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function EtsyFeeCalculator() {
  const [salePrice, setSalePrice] = useState(35);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [itemCost, setItemCost] = useState(10);
  const [shippingCost, setShippingCost] = useState(4.5);
  const [offsiteAds, setOffsiteAds] = useState('none');
  const [currency, setCurrency] = useState('$');

  const listingFee = 0.20;
  const totalRevenue = Number(salePrice) + Number(shippingCharged);
  const transactionFee = totalRevenue * 0.065;
  const paymentFee = totalRevenue * 0.03 + 0.25;

  let offsiteAdFee = 0;
  if (offsiteAds === '15') offsiteAdFee = totalRevenue * 0.15;
  if (offsiteAds === '12') offsiteAdFee = totalRevenue * 0.12;

  const totalFees = listingFee + transactionFee + paymentFee + offsiteAdFee;
  const totalCosts = Number(itemCost) + Number(shippingCost);
  const netProfit = totalRevenue - totalFees - totalCosts;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;
  const etsyCutPercent = totalRevenue > 0 ? ((totalFees / totalRevenue) * 100).toFixed(1) : 0;

  const inputStyle = { fontFamily: 'var(--font-mono)', fontSize: 16 };
  const sectionLabelStyle = {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
    textTransform: 'uppercase', color: 'var(--text-4)',
    display: 'flex', alignItems: 'center', gap: 7,
    marginBottom: 16, paddingBottom: 12,
    borderBottom: '1px solid var(--border)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em', lineHeight: 1.2 }}>
            What Etsy actually leaves you with
          </h1>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Listing fee, 6.5% transaction cut, payment processing, offsite ads if it applies — all of it, before you hit publish.
        </p>
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>

        {/* ── Left: Inputs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Section 1: Price */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <DollarSign size={13} color="var(--brand)" />
              Selling Price & Shipping
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label>Item Selling Price ({currency})</label>
                <input type="number" step="0.01" value={salePrice}
                  onChange={e => setSalePrice(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label>Shipping Charged to Buyer ({currency})</label>
                <input type="number" step="0.01" value={shippingCharged}
                  onChange={e => setShippingCharged(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Section 2: Costs */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <TrendingUp size={13} color="#22c55e" />
              Your Production Costs
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label>Item Material / Craft Cost ({currency})</label>
                <input type="number" step="0.01" value={itemCost}
                  onChange={e => setItemCost(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label>Actual Shipping Label Cost ({currency})</label>
                <input type="number" step="0.01" value={shippingCost}
                  onChange={e => setShippingCost(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Section 3: Offsite Ads */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <PieChart size={13} color="#3b82f6" />
              Etsy Offsite Ads (Optional)
            </div>
            <label>Did this sale come from Etsy Offsite Ads?</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 8 }}>
              {[
                { id: 'none', label: 'No Ad (0%)' },
                { id: '15',   label: 'Standard (15%)' },
                { id: '12',   label: 'High Vol. (12%)' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOffsiteAds(opt.id)}
                  style={{
                    padding: '10px 8px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.14s ease',
                    background: offsiteAds === opt.id ? 'rgba(249,115,22,0.12)' : 'rgba(255,255,255,0.03)',
                    border: offsiteAds === opt.id ? '1.5px solid rgba(249,115,22,0.5)' : '1.5px solid var(--border-md)',
                    color: offsiteAds === opt.id ? 'var(--brand-light)' : 'var(--text-3)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: Results ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>

          {/* Net profit banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: netProfit >= 0
              ? 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.04))'
              : 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.04))',
            border: netProfit >= 0 ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(239,68,68,0.25)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              What you actually keep
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700,
              letterSpacing: '-0.04em', lineHeight: 1,
              color: netProfit >= 0 ? '#4ade80' : '#f87171',
            }}>
              {currency}{netProfit.toFixed(2)}
            </div>
            <div style={{
              marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700,
              background: netProfit >= 0 ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
              color: netProfit >= 0 ? '#4ade80' : '#f87171',
            }}>
              {profitMargin}% Profit Margin
            </div>
          </div>

          {/* Fee breakdown */}
          <div className="form-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
                textTransform: 'uppercase', color: 'var(--text-4)' }}>Fee Breakdown</span>
              <CopySummaryButton
                title="Etsy Fee & Margin Calculation"
                lines={[
                  { label: 'Selling Price', value: `$${Number(salePrice).toFixed(2)}` },
                  { label: 'Etsy Transaction Cut (6.5%)', value: `$${transactionFee.toFixed(2)}` },
                  { label: 'Payment Processing Fee', value: `$${paymentFee.toFixed(2)}` },
                  { label: 'Total Etsy Fees', value: `$${totalFees.toFixed(2)} (${etsyCutPercent}%)` },
                  { label: 'Net Profit per Sale', value: `$${netProfit.toFixed(2)} (${profitMargin}% Margin)` },
                ]}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Total Customer Payment', value: `${currency}${totalRevenue.toFixed(2)}`, color: 'var(--text-2)', bold: true },
                { label: '—', isDivider: true },
                { label: 'Etsy Listing Fee', value: `-${currency}${listingFee.toFixed(2)}`, color: '#f87171' },
                { label: 'Transaction Fee (6.5%)', value: `-${currency}${transactionFee.toFixed(2)}`, color: '#f87171' },
                { label: 'Payment Processing (3% + $0.25)', value: `-${currency}${paymentFee.toFixed(2)}`, color: '#f87171' },
                offsiteAdFee > 0 && { label: `Offsite Ad Fee (${offsiteAds}%)`, value: `-${currency}${offsiteAdFee.toFixed(2)}`, color: '#f87171' },
                { label: `Total Etsy Fees (${etsyCutPercent}%)`, value: `-${currency}${totalFees.toFixed(2)}`, color: '#f87171', bold: true },
                { label: '—', isDivider: true },
                { label: 'Your Production Costs', value: `-${currency}${totalCosts.toFixed(2)}`, color: '#fbbf24' },
              ].filter(Boolean).map((row, i) =>
                row.isDivider ? (
                  <div key={i} style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
                ) : (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: row.bold ? 700 : 500, color: row.color }}>
                      {row.value}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Tip */}
          <div style={{
            padding: '14px 16px', borderRadius: 12,
            background: 'rgba(249,115,22,0.05)', border: '1px solid rgba(249,115,22,0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
              <Info size={13} color="var(--brand)" />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)' }}>Note</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-4)', lineHeight: 1.5 }}>
              Etsy applies its mandatory 6.5% transaction cut to both item price and shipping.
            </p>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 12, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>
        </div>
      </div>
    </div>
  );
}
