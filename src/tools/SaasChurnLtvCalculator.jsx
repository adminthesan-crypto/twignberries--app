import React, { useState } from 'react';
import AeoArticle from '../components/AeoArticle';
import { Users, RefreshCw, TrendingUp, DollarSign, Award, ShieldCheck, AlertCircle, Activity } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

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

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* ── Left Column (Inputs) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Card 1: Revenue & Acquisition Cost */}
          <div className="form-card">
            <div style={SL}>
              <Users size={13} color="var(--brand)" /> 1. Revenue &amp; Acquisition Cost
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[0px]">
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
                <span className="dropzone-title">
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
                <span className="dropzone-title">
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          
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
          <div className="form-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                SaaS unit economics
              </span>
              <div className="flex gap-3">
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
                <NativeShareButton text={`SaaS LTV & Churn Health Summary\nAverage Revenue per User (ARPU): $${arpu.toFixed(2)}/mo\nGross Profit Margin: ${grossMargin}%\nMonthly MRR Churn Rate: ${monthlyChurn}%\nCustomer Acquisition Cost (CAC): $${cac.toFixed(2)}\nCustomer Retention Span: ${customerLifetimeMonths.toFixed(1)} months\nGross Customer Lifetime Value: $${grossLtv.toFixed(2)}\nNet Customer Lifetime Value (LTV): $${netLtv.toFixed(2)}\nLTV:CAC Health Ratio: ${ltvCacRatio.toFixed(2)}x\nCAC Payback Period: ${paybackMonths.toFixed(1)} months`} />
              </div>
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

      <AeoArticle>
        <h2>SaaS MRR Churn and LTV Formulas Explained</h2>
        <p>For any Software-as-a-Service (SaaS) business, growth isn't just about acquiring new users—it's about retaining them. Two of the most critical metrics investors look at are Customer Lifetime Value (LTV) and Monthly Recurring Revenue (MRR) Churn.</p>
        
        <h3>How to Calculate Customer Lifetime Value (LTV)</h3>
        <p>LTV represents the total gross profit you expect to earn from a single customer throughout their entire relationship with your business. The standard formula uses Average Revenue Per User (ARPU), your Gross Margin, and your Monthly Churn Rate.</p>
        <ul>
          <li><strong>LTV Formula</strong> = (ARPU × Gross Margin %) / Monthly Churn Rate</li>
        </ul>
        <p>For example, if your software costs $50/month, your gross margin (after server costs) is 80%, and your monthly churn rate is 5%: your LTV is ($50 × 0.80) / 0.05 = <strong>$800</strong>. This means, on average, every new signup is worth $800 to your business.</p>

        <h3>Understanding Customer Acquisition Cost (CAC) Payback</h3>
        <p>Knowing your LTV is useless if you don't know how much it costs to acquire that customer. CAC includes marketing spend, sales commissions, and onboarding costs. The <strong>CAC Payback Period</strong> is the number of months it takes to recoup those acquisition costs from a new customer.</p>
        <ul>
          <li><strong>Payback Period (Months)</strong> = CAC / (ARPU × Gross Margin %)</li>
        </ul>
        <p>If it costs $150 to acquire a customer, and they generate $40 of gross profit a month, your payback period is $150 / $40 = <strong>3.75 months</strong>. A payback period under 12 months is generally considered excellent for bootstrapped SaaS businesses.</p>
        
        <h3>The Golden Rule: LTV:CAC Ratio</h3>
        <p>Venture capitalists and SaaS operators aim for an <strong>LTV:CAC ratio of 3:1 or higher</strong>. If your LTV is $800 and your CAC is $150, your ratio is 5.3x. This indicates a highly efficient growth engine. If the ratio drops near 1:1, you are spending just as much to acquire a customer as they will eventually pay you, which leads to cash flow death.</p>
      </AeoArticle>
    </div>
  );
}
