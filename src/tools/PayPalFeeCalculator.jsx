import React, { useState } from 'react';
import { CreditCard, ArrowRightLeft, Info } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';
const SL = { /* section label style */
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};
const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function PayPalFeeCalculator() {
  const [amount, setAmount] = useState(150);
  const [feeType, setFeeType] = useState('standard');
  const [isInternational, setIsInternational] = useState(false);
  const [targetNet, setTargetNet] = useState(150);

  let percentFee = 0.0299;
  let fixedFee = 0.49;
  if (feeType === 'micro') { percentFee = 0.0499; fixedFee = 0.09; }
  else if (feeType === 'nonprofit') { percentFee = 0.0199; fixedFee = 0.49; }
  if (isInternational) percentFee += 0.015;

  const grossAmount = Number(amount) || 0;
  const totalFee = grossAmount * percentFee + fixedFee;
  const netPayout = grossAmount - totalFee;
  const effectiveRate = grossAmount > 0 ? ((totalFee / grossAmount) * 100).toFixed(2) : 0;

  const solvedGross = (Number(targetNet) + fixedFee) / (1 - percentFee);
  const solvedFee = solvedGross - Number(targetNet);

  const healthyPayout = netPayout >= grossAmount * 0.9;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            PayPal's cut, before it surprises you
          </h1>
          <span className="badge badge-brand">2.99% + $0.49</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Standard rate, micropayment rate, whichever applies — see your real payout first.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>

        {/* ── Left ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Calculator */}
          <div className="form-card">
            <div style={SL}><CreditCard size={13} color="var(--brand)" /> Fee Calculator</div>

            <div style={{ marginBottom: 16 }}>
              <label>Customer pays ($)</label>
              <input type="number" step="1" value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 600 }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Account type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[
                  { id: 'standard',  label: 'Standard',     sub: '2.99% + 49¢' },
                  { id: 'micro',     label: 'Micropayment', sub: '4.99% + 9¢' },
                  { id: 'nonprofit', label: 'Charity',      sub: '1.99% + 49¢' },
                ].map(plan => (
                  <button key={plan.id} type="button" onClick={() => setFeeType(plan.id)}
                    style={{
                      padding: '10px 8px', borderRadius: 8, cursor: 'pointer',
                      textAlign: 'center', transition: 'all 0.14s ease',
                      background: feeType === plan.id ? 'var(--brand-dim)' : 'rgba(255,255,255,0.03)',
                      border: feeType === plan.id ? '1.5px solid rgba(249,115,22,0.45)' : '1.5px solid var(--border-md)',
                      color: feeType === plan.id ? 'var(--brand-light)' : 'var(--text-3)',
                    }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{plan.label}</div>
                    <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2, fontFamily: 'var(--font-mono)' }}>{plan.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              padding: 12, borderRadius: 8, border: '1.5px solid var(--border-md)',
              background: 'rgba(255,255,255,0.02)', marginBottom: 0 }}>
              <input type="checkbox" checked={isInternational}
                onChange={e => setIsInternational(e.target.checked)} style={{ width: 'auto' }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>
                  International / cross-border (+1.50%)
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-4)' }}>
                  Customer's PayPal is registered in a different country
                </div>
              </div>
            </label>
          </div>

          {/* Break-even solver */}
          <div className="form-card">
            <div style={SL}><ArrowRightLeft size={13} color="var(--info)" /> Invoice break-even solver</div>
            <p style={{ fontSize: 13, color: 'var(--text-4)', marginBottom: 16, lineHeight: 1.5 }}>
              Want exactly <strong style={{ color: 'var(--text-2)' }}>${Number(targetNet).toFixed(2)}</strong> in your bank account? Here's the exact amount to invoice.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>

          {/* Main result */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
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
              PayPal keeps <strong style={{ color: '#f87171', fontFamily: 'var(--font-mono)' }}>${totalFee.toFixed(2)}</strong> ({effectiveRate}% effective cut)
            </div>
          </div>

          {/* Break-even result */}
          <div style={{
            padding: 20, borderRadius: 14,
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: 8 }}>
              Invoice this amount to get ${Number(targetNet).toFixed(2)}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.03em' }}>
              ${solvedGross.toFixed(2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 6 }}>
              PayPal fee: <span style={{ fontFamily: 'var(--font-mono)', color: '#f87171' }}>−${solvedFee.toFixed(2)}</span>
              {' · '}You keep: <span style={{ fontFamily: 'var(--font-mono)', color: '#4ade80' }}>${Number(targetNet).toFixed(2)}</span>
            </div>
          </div>

          {/* Breakdown */}
          <div className="form-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>Fee breakdown</span>
              <div className="flex gap-2">
                <CopySummaryButton title="PayPal Fee & Net Payout"
                  lines={[
                    { label: 'Gross invoice', value: `$${grossAmount.toFixed(2)}` },
                    { label: `Percentage fee (${(percentFee*100).toFixed(2)}%)`, value: `-$${(grossAmount*percentFee).toFixed(2)}` },
                    { label: 'Fixed fee', value: `-$${fixedFee.toFixed(2)}` },
                    { label: 'Total PayPal cut', value: `-$${totalFee.toFixed(2)}` },
                    { label: 'You receive', value: `$${netPayout.toFixed(2)}` },
                  ]}
                />
                <NativeShareButton text={`PayPal Fee & Net Payout\nGross invoice: $${grossAmount.toFixed(2)}\nPercentage fee: -$${(grossAmount*percentFee).toFixed(2)}\nFixed fee: -$${fixedFee.toFixed(2)}\nTotal PayPal cut: -$${totalFee.toFixed(2)}\nYou receive: $${netPayout.toFixed(2)}`} />
              </div>
            </div>
            {[
              { label: 'Customer pays', value: `$${grossAmount.toFixed(2)}`, color: 'var(--text-2)', bold: true },
              { divider: true },
              { label: `Percentage fee (${(percentFee*100).toFixed(2)}%)`, value: `-$${(grossAmount*percentFee).toFixed(2)}`, color: '#f87171' },
              { label: 'Fixed transaction fee', value: `-$${fixedFee.toFixed(2)}`, color: '#f87171' },
              { divider: true },
              { label: `Total PayPal cut (${effectiveRate}%)`, value: `-$${totalFee.toFixed(2)}`, color: '#f87171', bold: true },
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
            <strong style={{ color: 'var(--text-2)' }}>💡 Micropayments tip:</strong> If you're charging under $10, switching to PayPal's Micropayment rate (4.99% + $0.09) saves money vs the standard $0.49 fixed fee.
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 12, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>
        </div>
      </div>
    </div>
  );
}
