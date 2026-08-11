import React, { useState } from 'react';
import { Target, BarChart2 } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};
const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function RoasCalculator() {
  const [price, setPrice] = useState(79.99);
  const [cogs, setCogs] = useState(24.00);
  const [cpc, setCpc] = useState(1.45);
  const [convRate, setConvRate] = useState(2.8);

  // Math
  const grossMarginDollar = price - cogs;
  const grossMarginPercent = price > 0 ? (grossMarginDollar / price) : 0;
  const breakEvenRoas = grossMarginPercent > 0 ? (1 / grossMarginPercent) : 0;
  const breakEvenCpa = grossMarginDollar;

  // Ad campaign projection per sale
  const clicksPerSale = convRate > 0 ? (100 / convRate) : 0;
  const adSpendPerSale = clicksPerSale * cpc;
  const actualRoas = adSpendPerSale > 0 ? (price / adSpendPerSale) : 0;
  const netProfitAfterAds = grossMarginDollar - adSpendPerSale;
  const cogsPercent = price > 0 ? ((cogs / price) * 100) : 0;
  const targetCpa = breakEvenCpa;
  const maxCpc = clicksPerSale > 0 ? (breakEvenCpa / clicksPerSale) : 0;
  const netMarginPercent = price > 0 ? ((netProfitAfterAds / price) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            ROAS &amp; Paid Ad Profitability Calculator
          </h1>
          <span className="badge badge-brand">PAID ADS</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Find your exact break-even ROAS and target CPA before you scale ad spend.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        {/* Left Column (Inputs) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="form-card">
            <div style={SL}>
              <Target size={13} color="var(--brand)" /> 1. Unit Economics &amp; Margin
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <label>Selling price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}
                />
              </div>

              <div>
                <label>Unit COGS ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={cogs}
                  onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 18 }}
                />
              </div>
            </div>
          </div>

          <div className="form-card">
            <div style={SL}>
              <BarChart2 size={13} color="var(--brand)" /> 2. Paid Ad Performance Sliders
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Cost per click (CPC)</label>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-1)' }}>
                  ${cpc.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="8.00"
                step="0.05"
                value={cpc}
                onChange={(e) => setCpc(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                <span>$0.20 (Cheap)</span>
                <span>$1.50 (Standard)</span>
                <span>$6.00 (High-Intent)</span>
              </div>
            </div>

            <div style={{ marginBottom: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Conversion rate (%)</label>
                <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--brand)' }}>
                  {convRate}%
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="10.0"
                step="0.1"
                value={convRate}
                onChange={(e) => setConvRate(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                <span>1% (Cold Traffic)</span>
                <span>2.8% (Average)</span>
                <span>8% (High-Converting)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Results - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          {/* Primary Hero Banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: netProfitAfterAds >= 0 ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))' : 'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.03))',
            border: netProfitAfterAds >= 0 ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(239,68,68,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              Your net profit (after ads)
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: netProfitAfterAds >= 0 ? '#4ade80' : '#f87171' }}>
              ${netProfitAfterAds.toFixed(2)}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              Actual ROAS: <strong style={{ color: actualRoas >= breakEvenRoas ? '#4ade80' : '#f87171', fontFamily: 'var(--font-mono)' }}>{actualRoas.toFixed(2)}x</strong> (<strong style={{ color: netProfitAfterAds >= 0 ? '#4ade80' : '#f87171', fontFamily: 'var(--font-mono)' }}>{netMarginPercent.toFixed(1)}% margin</strong>)
            </div>
          </div>

          {/* Secondary Target Banner */}
          <div style={{
            padding: 24, borderRadius: 14,
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 6 }}>
              Break-even target
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
              {breakEvenRoas.toFixed(2)}x ROAS
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 4 }}>
              Max allowable CPA: <span style={{ fontFamily: 'var(--font-mono)' }}>${targetCpa.toFixed(2)}</span> · Max CPC: <span style={{ fontFamily: 'var(--font-mono)' }}>${maxCpc.toFixed(2)}</span>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Per-sale breakdown
              </span>
              <div className="flex gap-3">
                <CopySummaryButton
                  title="ROAS & Profitability Target Summary"
                  lines={[
                    { label: 'Selling Price', value: `$${price.toFixed(2)}` },
                    { label: 'COGS & Fulfillment', value: `$${cogs.toFixed(2)} (${cogsPercent.toFixed(1)}%)` },
                    { label: 'Ad Spend per Sale (CPA)', value: `$${adSpendPerSale.toFixed(2)}` },
                    { label: 'Break-Even ROAS Target', value: `${breakEvenRoas.toFixed(2)}x` },
                    { label: 'Max Allowable Cost per Click (CPC)', value: `$${maxCpc.toFixed(2)}` },
                    { label: 'Net Profit After Ads', value: `$${netProfitAfterAds.toFixed(2)} (${netMarginPercent.toFixed(1)}% Margin)` },
                  ]}
                />
                <NativeShareButton text={`ROAS & Profitability Target Summary\nSelling Price: $${price.toFixed(2)}\nCOGS & Fulfillment: $${cogs.toFixed(2)} (${cogsPercent.toFixed(1)}%)\nAd Spend per Sale (CPA): $${adSpendPerSale.toFixed(2)}\nBreak-Even ROAS Target: ${breakEvenRoas.toFixed(2)}x\nMax Allowable Cost per Click (CPC): $${maxCpc.toFixed(2)}\nNet Profit After Ads: $${netProfitAfterAds.toFixed(2)} (${netMarginPercent.toFixed(1)}% Margin)`} />
              </div>
            </div>

            {[
              { label: 'Customer pays', value: `$${price.toFixed(2)}`, color: 'var(--text-1)', bold: true },
              { divider: true },
              { label: `Unit COGS (${cogsPercent.toFixed(1)}%)`, value: `-$${cogs.toFixed(2)}`, color: '#f87171' },
              { label: 'Ad spend to acquire 1 sale', value: `-$${adSpendPerSale.toFixed(2)}`, color: '#f87171' },
              { divider: true },
              { label: 'Gross margin (before ads)', value: `$${grossMarginDollar.toFixed(2)}`, color: 'var(--text-2)' },
              { label: `Net profit (${netMarginPercent.toFixed(1)}% margin)`, value: `$${netProfitAfterAds.toFixed(2)}`, color: netProfitAfterAds >= 0 ? '#4ade80' : '#f87171', bold: true },
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
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> Break-even ROAS = <code>1 / Gross Margin %</code>. With a gross margin of <strong>{(grossMarginPercent * 100).toFixed(1)}%</strong>, any ad campaign running below <strong>{breakEvenRoas.toFixed(2)}x ROAS</strong> is burning money.
          </div>
        </div>
      </div>
    </div>
  );
}
