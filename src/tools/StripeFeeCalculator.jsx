import React, { useState } from 'react';
import { CreditCard, ArrowRightLeft } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};
const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function StripeFeeCalculator() {
  const [amount, setAmount] = useState(100);
  const [isInternational, setIsInternational] = useState(false);
  const [currencyConv, setCurrencyConv] = useState(false);
  const [targetNet, setTargetNet] = useState(100);
  const [currency, setCurrency] = useState('$');

  let percentFee = 0.029;
  if (isInternational) percentFee += 0.015;
  if (currencyConv) percentFee += 0.010;
  const fixedFee = 0.30;

  const grossAmount = Number(amount);
  const totalStripeFee = grossAmount * percentFee + fixedFee;
  const netPayout = grossAmount - totalStripeFee;
  const effectiveRate = grossAmount > 0 ? ((totalStripeFee / grossAmount) * 100).toFixed(2) : 0;

  const solvedGross = (Number(targetNet) + fixedFee) / (1 - percentFee);
  const solvedFee = solvedGross - Number(targetNet);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            How much do you need to charge to actually break even?
          </h1>
          <span className="badge badge-brand">2.9% + 30¢</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Domestic or international, Stripe takes its slice either way. This works backward from your target.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

        {/* ── Left ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Calculator */}
          <div className="form-card">
            <div style={SL}><CreditCard size={13} color="var(--brand)" /> 1. Transaction Amount</div>

            <div style={{ marginBottom: 16 }}>
              <label>Customer pays ($)</label>
              <input type="number" step="1" value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Card origin & currency</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                  padding: 20, borderRadius: 8, border: '1.5px solid var(--border-md)',
                  background: 'rgba(255,255,255,0.02)', marginBottom: 0 }}>
                  <input type="checkbox" checked={isInternational}
                    onChange={e => setIsInternational(e.target.checked)} style={{ width: 'auto' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                      International / Non-US Card (+1.50%)
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-4)' }}>
                      Customer's card was issued outside your country
                    </div>
                  </div>
                </label>

                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
                  padding: 20, borderRadius: 8, border: '1.5px solid var(--border-md)',
                  background: 'rgba(255,255,255,0.02)', marginBottom: 0 }}>
                  <input type="checkbox" checked={currencyConv}
                    onChange={e => setCurrencyConv(e.target.checked)} style={{ width: 'auto' }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                      Currency Conversion (+1.00%)
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-4)' }}>
                      Customer paid in a different currency
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Solver */}
          <div className="form-card">
            <div style={SL}><ArrowRightLeft size={13} color="var(--info)" /> 2. Reverse Invoice Break-even</div>
            <p style={{ fontSize: 13, color: 'var(--text-4)', marginBottom: 16, lineHeight: 1.5 }}>
              Want exactly <strong style={{ color: 'var(--text-2)' }}>${Number(targetNet).toFixed(2)}</strong> in your bank account? Here's the exact amount to charge.
            </p>
            <div style={{ marginBottom: 0 }}>
              <label>Target amount to receive ($)</label>
              <input type="number" step="1" value={targetNet}
                onChange={e => setTargetNet(e.target.value)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 18 }} />
            </div>
          </div>

        </div>

        {/* ── Right: Results ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>

          {/* Main Result */}
          <div style={{
            padding: 26, borderRadius: 16, textAlign: 'center',
            background: netPayout >= 0 ? 'linear-gradient(135deg,rgba(34,197,94,0.08),rgba(34,197,94,0.03))' : 'linear-gradient(135deg,rgba(239,68,68,0.08),rgba(239,68,68,0.03))',
            border: netPayout >= 0 ? '1px solid rgba(34,197,94,0.2)' : '1px solid rgba(239,68,68,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              You receive
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: netPayout >= 0 ? '#4ade80' : '#f87171' }}>
              ${netPayout.toFixed(2)}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              Stripe keeps <strong style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>${totalStripeFee.toFixed(2)}</strong> ({effectiveRate}% effective cut)
            </div>
          </div>

          {/* Solver Result */}
          <div style={{
            padding: 24, borderRadius: 14,
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 8 }}>
              Charge this amount to get ${Number(targetNet).toFixed(2)}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
              ${solvedGross.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 6 }}>
              Stripe fee: <span style={{ fontFamily: 'var(--font-mono)', color: '#f87171' }}>−${solvedFee.toFixed(2)}</span>
              {' · '}You keep: <span style={{ fontFamily: 'var(--font-mono)', color: '#4ade80' }}>${Number(targetNet).toFixed(2)}</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="form-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>Fee breakdown</span>
              <div className="flex gap-3">
                <CopySummaryButton title="Stripe Fee & Net Payout"
                  lines={[
                    { label: 'Gross charge', value: `$${grossAmount.toFixed(2)}` },
                    { label: `Percentage fee (${(percentFee*100).toFixed(1)}%)`, value: `-$${(grossAmount*percentFee).toFixed(2)}` },
                    { label: 'Fixed fee', value: `-$${fixedFee.toFixed(2)}` },
                    { label: 'Total Stripe cut', value: `-$${totalStripeFee.toFixed(2)}` },
                    { label: 'You receive', value: `$${netPayout.toFixed(2)}` },
                  ]}
                />
                <NativeShareButton text={`Stripe Fee & Net Payout\nGross charge: $${grossAmount.toFixed(2)}\nPercentage fee (${(percentFee*100).toFixed(1)}%): -$${(grossAmount*percentFee).toFixed(2)}\nFixed fee: -$${fixedFee.toFixed(2)}\nTotal Stripe cut: -$${totalStripeFee.toFixed(2)}\nYou receive: $${netPayout.toFixed(2)}`} />
              </div>
            </div>
            {[
              { label: 'Customer pays', value: `$${grossAmount.toFixed(2)}`, color: 'var(--text-2)', bold: true },
              { divider: true },
              { label: `Percentage fee (${(percentFee*100).toFixed(1)}%)`, value: `-$${(grossAmount*percentFee).toFixed(2)}`, color: '#f87171' },
              { label: 'Fixed transaction fee', value: `-$${fixedFee.toFixed(2)}`, color: '#f87171' },
              { divider: true },
              { label: `Total Stripe cut (${effectiveRate}%)`, value: `-$${totalStripeFee.toFixed(2)}`, color: '#f87171', bold: true },
            ].map((r, i) =>
              r.divider ? <div key={i} style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} /> : (
                <div key={i} style={ROW}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{r.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color }}>{r.value}</span>
                </div>
              )
            )}
          </div>

          {/* Tip */}
          <div className="insight-block">
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> SaaS businesses usually absorb these processing fees, but high-ticket agencies often use the break-even solver to invoice the exact processing surcharge to clients.
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 24, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>

        </div>
      </div>
    </div>
  );
}
