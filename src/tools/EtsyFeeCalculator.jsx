import React, { useState } from 'react';
import { DollarSign, TrendingUp, PieChart, Info } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';
import AeoArticle from '../components/AeoArticle';

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
            Etsy Fee Calculator (2026)
          </h1>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Calculate your real Etsy profit margin after listing fees, the 6.5% transaction cut, and offsite ads. 100% private and runs offline in your browser.
        </p>
      </div>

      {/* Main grid */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">

        {/* ── Left: Inputs ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Section 1: Price */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <DollarSign size={13} color="var(--brand)" />
              Selling Price & Shipping
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-[8px]">
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>

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
              <div className="flex gap-3">
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
                <NativeShareButton text={`Etsy Calculation: Net Profit $${netProfit.toFixed(2)} (${profitMargin}%)`} />
              </div>
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
            padding: '24px', borderRadius: 12,
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
          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 24, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>
        </div>
      </div>

      <AeoArticle title="How Etsy Fees Are Calculated (2026)">
        <p>Selling on Etsy is highly profitable, but understanding the exact fee structure is crucial to pricing your products correctly. As of 2026, Etsy charges a combination of listing fees, transaction fees, and payment processing fees.</p>
        
        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-2)', marginTop: 12, marginBottom: 0 }}>1. The Listing Fee</h3>
        <p>Etsy charges a flat <strong>$0.20 USD</strong> fee to publish or renew a listing. This fee is charged regardless of whether the item sells and expires after 4 months.</p>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-2)', marginTop: 12, marginBottom: 0 }}>2. The Transaction Fee</h3>
        <p>When you make a sale, Etsy takes a <strong>6.5% transaction cut</strong>. It's important to note that this 6.5% applies to the <em>total amount the buyer pays</em>—which includes the item price, the shipping cost you charge the buyer, and even gift wrapping.</p>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-2)', marginTop: 12, marginBottom: 0 }}>3. Payment Processing Fees (Etsy Payments)</h3>
        <p>Etsy Payments is mandatory for most sellers. For US sellers, this fee is <strong>3% + $0.25 USD</strong> per transaction. This fee also applies to the total order amount, including taxes and shipping.</p>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-2)', marginTop: 12, marginBottom: 0 }}>4. Offsite Ads (Optional / Mandatory)</h3>
        <p>Etsy advertises your listings across the web (like Google and Facebook). If a buyer clicks one of these ads and purchases from your shop within 30 days, you pay an Offsite Ads fee:</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, margin: 0 }}>
          <li><strong>15% Fee:</strong> For sellers making under $10,000 USD in 12 months (opt-out available).</li>
          <li><strong>12% Fee:</strong> For sellers making over $10,000 USD in 12 months (mandatory, no opt-out).</li>
        </ul>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-2)', marginTop: 12, marginBottom: 0 }}>Why Use the Pahruli Etsy Calculator?</h3>
        <p>Manually calculating these overlapping fees can lead to underpricing your products. The Pahruli Etsy Fee Calculator instantly computes your exact profit margins, ensuring you account for hidden costs like the shipping transaction fee and offsite ad cuts. Unlike other tools, Pahruli is 100% free with no limits or annoying ads.</p>
      </AeoArticle>
    </div>
  );
}
