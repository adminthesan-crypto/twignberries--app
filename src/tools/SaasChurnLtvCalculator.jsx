import React, { useState } from 'react';
import { Users, RefreshCw, TrendingUp, DollarSign, Award, ShieldCheck, AlertCircle, Activity } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};

const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function SaasChurnLtvCalculator() {
  const [arpu, setArpu] = useState(49.00);
  const [monthlyChurn, setMonthlyChurn] = useState(4.5);
  const [grossMargin, setGrossMargin] = useState(85);
  const [cac, setCac] = useState(120.00);

  const churnRateDec = monthlyChurn / 100;
  const customerLifetimeMonths = churnRateDec > 0 ? (1 / churnRateDec) : 0;
  const grossLtv = arpu * customerLifetimeMonths;
  const netLtv = grossLtv * (grossMargin / 100);
  const ltvCacRatio = cac > 0 ? (netLtv / cac) : 0;
  const paybackMonths = (arpu * (grossMargin / 100)) > 0 ? (cac / (arpu * (grossMargin / 100))) : 0;

  const isHealthy = ltvCacRatio >= 3.0 && paybackMonths <= 12;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            SaaS MRR Churn &amp; Lifetime Value (LTV:CAC)
          </h1>
          <span className={`badge ${ltvCacRatio >= 3 ? 'badge-success' : 'badge-brand'}`}>
            LTV:CAC • {ltvCacRatio.toFixed(1)}x
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Calculate customer lifetime value, CAC payback period, and unit economics health to understand true SaaS profitability.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* ── Left Column (Inputs) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Card 1: Revenue & Acquisition Cost */}
          <div className="form-card">
            <div style={SL}>
              <Users size={13} color="var(--brand)" /> 1. Revenue &amp; Acquisition Cost
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
              <div>
                <label>ARPU (monthly per user) ($)</label>
                <input
                  type="number"
                  step="1"
                  value={arpu}
                  onChange={(e) => setArpu(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  Average revenue billed per paying account each month.
                </div>
              </div>

              <div>
                <label>Customer acquisition cost ($)</label>
                <input
                  type="number"
                  step="5"
                  value={cac}
                  onChange={(e) => setCac(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  Total sales &amp; marketing ad spend divided by new customers.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Churn & Gross Margin */}
          <div className="form-card">
            <div style={SL}>
              <RefreshCw size={13} color="var(--brand)" /> 2. Churn Rate &amp; Gross Margin
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Monthly MRR churn rate (%)</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--brand)' }}>
                  {monthlyChurn}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="15.0"
                step="0.5"
                value={monthlyChurn}
                onChange={(e) => setMonthlyChurn(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                <span>1% (Enterprise B2B)</span>
                <span>5% (Prosumer SaaS)</span>
                <span>12% (High Churn)</span>
              </div>
            </div>

            <div style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Gross profit margin (%)</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--text-1)' }}>
                  {grossMargin}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                step="1"
                value={grossMargin}
                onChange={(e) => setGrossMargin(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--brand)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                <span>60% (AI / GPU SaaS)</span>
                <span>80% (Standard SaaS)</span>
                <span>95% (Pure Code)</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right Column (Results - Sticky) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>
          
          {/* Primary Hero Banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: isHealthy
              ? 'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.03))'
              : 'linear-gradient(135deg,rgba(255,92,0,0.08),rgba(255,92,0,0.03))',
            border: isHealthy ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(255,92,0,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              Net customer lifetime value (LTV)
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: isHealthy ? '#4ade80' : 'var(--brand)' }}>
              ${netLtv.toFixed(0)}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              LTV:CAC ratio is <strong style={{ color: isHealthy ? '#4ade80' : 'var(--brand)', fontFamily: 'var(--font-mono)' }}>{ltvCacRatio.toFixed(1)}x</strong> (target: 3.0x+)
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginTop: 18,
              paddingTop: 16,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: 600 }}>CAC Payback</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: paybackMonths <= 12 ? '#4ade80' : '#f87171', marginTop: 3 }}>
                  {paybackMonths.toFixed(1)} mos
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: 600 }}>Retention Span</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginTop: 3 }}>
                  {customerLifetimeMonths.toFixed(1)} mos
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                SaaS unit economics
              </span>
              <CopySummaryButton
                title="SaaS LTV & Churn Health Summary"
                lines={[
                  { label: 'Average Revenue per User (ARPU)', value: `$${arpu.toFixed(2)}/mo` },
                  { label: 'Gross Profit Margin', value: `${grossMargin}%` },
                  { label: 'Monthly MRR Churn Rate', value: `${monthlyChurn}%` },
                  { label: 'Customer Acquisition Cost (CAC)', value: `$${cac.toFixed(2)}` },
                  { label: 'Customer Retention Span', value: `${customerLifetimeMonths.toFixed(1)} months` },
                  { label: 'Gross Customer Lifetime Value', value: `$${grossLtv.toFixed(2)}` },
                  { label: 'Net Customer Lifetime Value (LTV)', value: `$${netLtv.toFixed(2)}` },
                  { label: 'LTV:CAC Health Ratio', value: `${ltvCacRatio.toFixed(2)}x` },
                  { label: 'CAC Payback Period', value: `${paybackMonths.toFixed(1)} months` },
                ]}
              />
            </div>

            {[
              { label: 'ARPU (monthly per user)', value: `$${arpu.toFixed(2)}/mo`, color: 'var(--text-2)', mono: true },
              { label: 'Customer retention span', value: `${customerLifetimeMonths.toFixed(1)} months`, color: 'var(--text-2)', mono: true },
              { label: 'Gross LTV (before margin)', value: `$${grossLtv.toFixed(0)}`, color: 'var(--text-4)', mono: true },
              { divider: true },
              { label: `Net LTV (@ ${grossMargin}% margin)`, value: `$${netLtv.toFixed(0)}`, color: '#4ade80', mono: true, bold: true },
              { label: 'Customer acquisition cost (CAC)', value: `$${cac.toFixed(2)}`, color: '#f87171', mono: true },
              { divider: true },
              { label: 'LTV:CAC health ratio', value: `${ltvCacRatio.toFixed(2)}x`, color: ltvCacRatio >= 3 ? '#4ade80' : 'var(--brand)', mono: true, bold: true },
              { label: 'CAC payback period', value: `${paybackMonths.toFixed(1)} months`, color: paybackMonths <= 12 ? '#4ade80' : '#f87171', mono: true, bold: true },
            ].map((r, i) =>
              r.divider ? <div key={i} style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} /> : (
                <div key={i} style={ROW}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{r.label}</span>
                  <span style={{ fontFamily: r.mono ? 'var(--font-mono)' : 'inherit', fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color }}>
                    {r.value}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> A healthy SaaS has an <strong style={{ color: 'var(--text-1)' }}>LTV:CAC ratio of 3.0x or higher</strong> and a <strong style={{ color: 'var(--text-1)' }}>CAC payback period under 12 months</strong>. Reducing monthly churn from {monthlyChurn}% to {(monthlyChurn * 0.7).toFixed(1)}% increases your net LTV by <strong style={{ color: '#4ade80' }}>+42%</strong> without spending an extra dollar on acquisition.
          </div>

        </div>
      </div>
    </div>
  );
}
