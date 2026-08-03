import React, { useState } from 'react';
import { CreditCard, DollarSign, ArrowRightLeft, TrendingUp, Info } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function StripeFeeCalculator() {
  const [amount, setAmount] = useState(100);
  const [isInternational, setIsInternational] = useState(false);
  const [currencyConv, setCurrencyConv] = useState(false);
  const [targetNet, setTargetNet] = useState(100);
  const [currency, setCurrency] = useState('$');

  // Stripe USA standard fee: 2.9% + $0.30
  // +1.5% for international cards
  // +1% for currency conversion
  let percentFee = 0.029;
  if (isInternational) percentFee += 0.015;
  if (currencyConv) percentFee += 0.010;
  const fixedFee = 0.30;

  const grossAmount = Number(amount);
  const totalStripeFee = grossAmount * percentFee + fixedFee;
  const netPayout = grossAmount - totalStripeFee;
  const effectiveRate = grossAmount > 0 ? ((totalStripeFee / grossAmount) * 100).toFixed(2) : 0;

  // Reverse Solver: What price should I charge to get targetNet?
  // target = X - (X * percentFee + fixedFee)
  // target + fixedFee = X * (1 - percentFee)
  // X = (target + fixedFee) / (1 - percentFee)
  const solvedGross = (Number(targetNet) + fixedFee) / (1 - percentFee);
  const solvedFee = solvedGross - Number(targetNet);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Stripe Fee &amp; Break-even Solver
          </h1>
          <span className="badge badge-brand">2.9% + $0.30</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Calculate domestic, international, and reverse break-even Stripe payment processing fees.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Standard Calculator */}
        <div className="lg:col-span-6 glass-card space-y-5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#ff6b00]" /> 1. Transaction Amount
          </h2>

          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
              Customer Payment Amount ({currency})
            </label>
            <input
              type="number"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glass-input text-xl font-mono"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="block text-xs font-medium text-[#9ca3af]">
              Card Origin & Pricing Tiers
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={isInternational}
                  onChange={(e) => setIsInternational(e.target.checked)}
                  className="rounded border-white/20 text-[#ff6b00] focus:ring-[#ff6b00]"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">International / Non-US Card (+1.5%)</div>
                  <div className="text-[#6b7280]">Customer card was issued outside your home country</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={currencyConv}
                  onChange={(e) => setCurrencyConv(e.target.checked)}
                  className="rounded border-white/20 text-[#ff6b00] focus:ring-[#ff6b00]"
                />
                <div className="text-xs">
                  <div className="font-semibold text-white">Currency Conversion Required (+1.0%)</div>
                  <div className="text-[#6b7280]">Customer paid in a currency different from your payout account</div>
                </div>
              </label>
            </div>
          </div>

          {/* Output Card */}
          <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 space-y-3 font-mono">
            <div className="flex justify-between text-xs text-[#9ca3af]">
              <span>Stripe Percentage Fee ({(percentFee * 100).toFixed(1)}%):</span>
              <span className="text-red-400">-{currency}{(grossAmount * percentFee).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#9ca3af]">
              <span>Stripe Fixed Transaction Fee:</span>
              <span className="text-red-400">-{currency}{fixedFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between text-sm font-semibold text-white">
              <span>Total Stripe Cut ({effectiveRate}%):</span>
              <span className="text-red-400">-{currency}{totalStripeFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-emerald-400 pt-1">
              <span>NET PAYOUT TO YOU:</span>
              <span>{currency}{netPayout.toFixed(2)}</span>
            </div>
            <div className="pt-2 flex justify-end">
              <CopySummaryButton
                title="Stripe Fee & Net Payout Calculation"
                lines={[
                  { label: 'Gross Charge Amount', value: `${currency}${grossAmount.toFixed(2)}` },
                  { label: 'Percentage Cut', value: `${(percentFee * 100).toFixed(1)}% (${currency}${(grossAmount * percentFee).toFixed(2)})` },
                  { label: 'Fixed Fee', value: `${currency}${fixedFee.toFixed(2)}` },
                  { label: 'Total Stripe Fees', value: `${currency}${totalStripeFee.toFixed(2)} (${effectiveRate}% cut)` },
                  { label: 'NET PAYOUT TO YOU', value: `${currency}${netPayout.toFixed(2)}` }
                ]}
              />
            </div>
          </div>
        </div>

        {/* Right: Reverse Solver */}
        <div className="lg:col-span-6 glass-card space-y-5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-blue-400" /> 2. Reverse Price Solver (Target Net)
          </h2>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            Want to receive an exact net amount in your bank account after Stripe takes its fee? We calculate the exact price to charge.
          </p>

          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
              Target Net Payout You Want ({currency})
            </label>
            <input
              type="number"
              step="1"
              value={targetNet}
              onChange={(e) => setTargetNet(e.target.value)}
              className="glass-input text-xl font-mono text-emerald-400"
            />
          </div>

          {/* Solver Result */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#121624] to-[#0e111c] border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-blue-400">YOU SHOULD CHARGE:</span>
              <span className="badge badge-brand">BREAK-EVEN PRICE</span>
            </div>

            <div className="text-3xl font-bold font-mono text-white">
              {currency}{solvedGross.toFixed(2)}
            </div>

            <div className="space-y-1.5 text-xs font-mono text-[#9ca3af] pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Customer Pays:</span>
                <span className="text-white">{currency}{solvedGross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Stripe Fee ({(percentFee * 100).toFixed(1)}% + {currency}{fixedFee}):</span>
                <span className="text-red-400">-{currency}{solvedFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 pt-1">
                <span>Your Exact Bank Payout:</span>
                <span>{currency}{Number(targetNet).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#9ca3af] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
            <span>
              Tip: SaaS businesses often absorb standard domestic processing fees, while high-ticket B2B agencies use this solver to invoice the exact processing surcharge.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
