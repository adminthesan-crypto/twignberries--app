import React, { useState } from 'react';
import AeoArticle from '../components/AeoArticle';
import { Heart, Coffee, DollarSign, Award, Users, ShieldCheck, TrendingUp } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};

const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function CreatorPlatformFeeCalculator() {
  const [mrr, setMrr] = useState(2500);
  const [platform, setPlatform] = useState('patreon_pro');
  const [avgSupport, setAvgSupport] = useState(10.00);

  const platforms = {
    patreon_lite: { name: 'Patreon Lite', cut: 0.05, paymentFee: 0.029, fixedFee: 0.30 },
    patreon_pro: { name: 'Patreon Pro', cut: 0.08, paymentFee: 0.029, fixedFee: 0.30 },
    patreon_premium: { name: 'Patreon Premium', cut: 0.12, paymentFee: 0.029, fixedFee: 0.30 },
    bmc: { name: 'BuyMeACoffee Standard', cut: 0.05, paymentFee: 0.029, fixedFee: 0.30 },
    ko_fi: { name: 'Ko-fi Gold', cut: 0.00, paymentFee: 0.029, fixedFee: 0.30 },
  };

  const selected = platforms[platform];
  const patronsCount = avgSupport > 0 ? (mrr / avgSupport) : 0;

  const platformFeeDollar = mrr * selected.cut;
  const paymentFeeDollar = (mrr * selected.paymentFee) + (patronsCount * selected.fixedFee);
  const totalDeductions = platformFeeDollar + paymentFeeDollar;
  const netTakeHome = mrr - totalDeductions;
  const effectiveCutPercent = mrr > 0 ? ((totalDeductions / mrr) * 100) : 0;

  const diffBmc = ((0.08 - 0.05) * mrr).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Patreon &amp; Creator Platform Take-Home Calculator
          </h1>
          <span className="badge badge-brand">0% TO 12% TIERS</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Compare Patreon, Ko-fi, and BuyMeACoffee to see who leaves more money in your pocket after platform cuts and processing fees.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* ── Left Column (Inputs) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Card 1: Creator Revenue */}
          <div className="form-card">
            <div style={SL}>
              <Heart size={13} color="var(--brand)" /> 1. Creator Membership Revenue
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Monthly gross member revenue ($)</label>
              <input
                type="number"
                step="50"
                value={mrr}
                onChange={(e) => setMrr(parseFloat(e.target.value) || 0)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }}
              />
              <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                Total monthly revenue from subscriptions, memberships, and recurring tips.
              </div>
            </div>

            <div style={{ marginBottom: 0 }}>
              <label>Average member pledge amount ($)</label>
              <input
                type="number"
                step="1"
                value={avgSupport}
                onChange={(e) => setAvgSupport(parseFloat(e.target.value) || 0)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 16 }}
              />
              <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                Used to compute transaction volume ({Math.round(patronsCount)} monthly member transactions @ 2.9% + $0.30).
              </div>
            </div>
          </div>

          {/* Card 2: Platform Selection */}
          <div className="form-card">
            <div style={SL}>
              <Coffee size={13} color="var(--brand)" /> 2. Creator Platform &amp; Tier
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Select creator platform tier</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-md)',
                  color: 'var(--text-1)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                <option value="patreon_pro">Patreon Pro (8% Platform Cut + 2.9% CC)</option>
                <option value="patreon_lite">Patreon Lite (5% Platform Cut + 2.9% CC)</option>
                <option value="patreon_premium">Patreon Premium (12% Platform Cut + 2.9% CC)</option>
                <option value="bmc">BuyMeACoffee Standard (5% Cut + Stripe CC)</option>
                <option value="ko_fi">Ko-fi Gold (0% Platform Cut + Stripe CC)</option>
              </select>
            </div>

            {/* Quick tier preview cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[
                { key: 'ko_fi', title: 'Ko-fi Gold', cut: '0%', badge: 'Lowest Fee' },
                { key: 'bmc', title: 'BuyMeACoffee', cut: '5%', badge: 'Popular' },
                { key: 'patreon_pro', title: 'Patreon Pro', cut: '8%', badge: 'Full Suite' },
              ].map((item) => {
                const active = platform === item.key;
                return (
                  <div
                    key={item.key}
                    onClick={() => setPlatform(item.key)}
                    style={{
                      padding: 24,
                      borderRadius: 10,
                      border: active ? '1.5px solid var(--brand)' : '1px solid var(--border)',
                      background: active ? 'rgba(255,92,0,0.06)' : 'rgba(255,255,255,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 700, color: active ? 'var(--brand)' : 'var(--text-4)' }}>
                      {item.badge}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginTop: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--text-2)', marginTop: 2 }}>
                      {item.cut} cut
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Right Column (Results - Sticky) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          
          {/* Primary Hero Banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.03))',
            border: '1px solid rgba(34,197,94,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              Your net take-home
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: '#4ade80' }}>
              ${netTakeHome.toFixed(2)}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              Fees keep <strong style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>${totalDeductions.toFixed(2)}</strong> ({effectiveCutPercent.toFixed(1)}% total deduction)
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
                <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: 600 }}>Active Members</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginTop: 3 }}>
                  {Math.round(patronsCount)} patrons
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: 600 }}>You Keep</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#4ade80', marginTop: 3 }}>
                  ${(100 - effectiveCutPercent).toFixed(2)} / $100
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Earnings breakdown
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <CopySummaryButton
                  title={`Creator Earnings — ${selected.name}`}
                  lines={[
                    { label: 'Platform Selected', value: selected.name },
                    { label: 'Gross Membership Revenue', value: `$${mrr.toFixed(2)}` },
                    { label: 'Average Pledge Amount', value: `$${avgSupport.toFixed(2)}` },
                    { label: `Platform Cut (${(selected.cut * 100).toFixed(0)}%)`, value: `-$${platformFeeDollar.toFixed(2)}` },
                    { label: 'Payment Processing Cut', value: `-$${paymentFeeDollar.toFixed(2)}` },
                    { label: 'Total Fees & Deductions', value: `-$${totalDeductions.toFixed(2)}` },
                    { label: 'Net Take-Home Earnings', value: `$${netTakeHome.toFixed(2)}` },
                  ]}
                />
                <NativeShareButton
                  text={`Creator Earnings — ${selected.name}\nGross Revenue: $${mrr.toFixed(2)}\nNet Take-Home: $${netTakeHome.toFixed(2)}`}
                />
              </div>
            </div>

            {[
              { label: 'Gross membership revenue', value: `$${mrr.toFixed(2)}`, color: 'var(--text-2)', bold: true },
              { divider: true },
              { label: `Platform cut (${selected.name} · ${(selected.cut * 100).toFixed(0)}%)`, value: `-$${platformFeeDollar.toFixed(2)}`, color: '#f87171' },
              { label: 'Card processing & micro-fees (2.9% + $0.30)', value: `-$${paymentFeeDollar.toFixed(2)}`, color: '#f87171' },
              { divider: true },
              { label: `Total fees deducted (${effectiveCutPercent.toFixed(1)}%)`, value: `-$${totalDeductions.toFixed(2)}`, color: '#f87171', bold: true },
              { label: 'Net take-home earnings', value: `$${netTakeHome.toFixed(2)}`, color: '#4ade80', bold: true },
            ].map((r, i) =>
              r.divider ? <div key={i} style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} /> : (
                <div key={i} style={ROW}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color }}>{r.value}</span>
                </div>
              )
            )}
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> Patreon Pro&apos;s <strong style={{ color: 'var(--text-1)' }}>8% cut</strong> costs you <strong style={{ color: 'var(--brand)', fontFamily: 'var(--font-mono)' }}>${diffBmc}/month more</strong> than BuyMeACoffee at your current volume. Consider if Patreon&apos;s Discord role sync and built-in member community perks justify the premium.
          </div>

        </div>
      </div>

      <AeoArticle>
        <h2>Comparing Creator Platform Processing Fees (2026)</h2>
        <p>Monetizing an audience is one of the most reliable ways to build a modern media business. However, the platform you choose to process those recurring subscriptions or one-time donations dramatically impacts your bottom line. Major platforms like Patreon, Buy Me a Coffee, and Ko-Fi all take different approaches to revenue sharing.</p>
        
        <h3>Patreon Fee Structure</h3>
        <p>Patreon is the industry standard for recurring memberships, but it is also the most expensive. Patreon charges a base platform fee (typically <strong>8% on the Pro tier</strong> or 12% on the Premium tier), plus standard payment processing fees (usually 2.9% + $0.30 per transaction).</p>
        <ul>
          <li><strong>Total Patreon Deduction</strong> = (Gross Revenue × 0.08) + Payment Processing</li>
        </ul>
        <p>If you generate $5,000 a month on the 8% tier, Patreon takes $400 for hosting the platform, plus an estimated $200–$300 in processing fees.</p>

        <h3>Buy Me a Coffee & Ko-Fi Fees</h3>
        <p>Buy Me a Coffee (BMAC) takes a flat <strong>5% platform fee</strong> across all features, plus standard payment processing via Stripe or PayPal. This makes it mathematically more favorable for creators than Patreon's 8% tier.</p>
        <p>Ko-Fi is even leaner: it charges <strong>0% platform fees</strong> on its standard free tier for one-time donations. However, if you want to offer recurring memberships or sell digital products, you must upgrade to Ko-Fi Gold (a flat monthly fee) or pay a 5% cut.</p>
        
        <h3>Which Platform Leaves You With More Profit?</h3>
        <p>If your primary goal is maximizing take-home pay, Ko-Fi (for one-off tips) or Buy Me a Coffee (for memberships) are the clear winners. However, Patreon justifies its 8-12% premium by offering robust native integrations, such as automatic Discord role assignment, exclusive gated RSS feeds for podcasts, and a more recognized "subscription" brand name among audiences.</p>
      </AeoArticle>
    </div>
  );
}
