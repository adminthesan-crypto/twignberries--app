import React, { useState } from 'react';
import { DollarSign, ArrowRightLeft, CreditCard, Info, TrendingUp, AlertCircle } from 'lucide-react';

export default function PayPalFeeCalculator() {
  const [amount, setAmount] = useState(150);
  const [feeType, setFeeType] = useState('standard'); // standard (2.99% + 0.49), micro (4.99% + 0.09), nonprofit (1.99% + 0.49)
  const [isInternational, setIsInternational] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [targetNet, setTargetNet] = useState(150);

  // Fee rates (2026 PayPal US Domestic baseline)
  let percentFee = 0.0299;
  let fixedFee = 0.49;

  if (feeType === 'micro') {
    percentFee = 0.0499;
    fixedFee = 0.09;
  } else if (feeType === 'nonprofit') {
    percentFee = 0.0199;
    fixedFee = 0.49;
  }

  if (isInternational) {
    percentFee += 0.015; // +1.5% international transaction surcharge
  }

  const grossAmount = Number(amount) || 0;
  const totalFee = grossAmount * percentFee + fixedFee;
  const netPayout = grossAmount - totalFee;
  const effectiveRate = grossAmount > 0 ? ((totalFee / grossAmount) * 100).toFixed(2) : 0;

  // Reverse Solver: What should you invoice to receive targetNet?
  // target = X - (X * percentFee + fixedFee) => X = (target + fixedFee) / (1 - percentFee)
  const solvedGross = (Number(targetNet) + fixedFee) / (1 - percentFee);
  const solvedFee = solvedGross - Number(targetNet);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-white">
              PayPal Fee & Net Payout Calculator (2026)
            </h1>
            <span className="badge badge-brand">2.99% + $0.49</span>
          </div>
          <p className="text-sm text-[#9ca3af] mt-1">
            Calculate standard, international, and micropayments PayPal fees with a reverse break-even invoice solver.
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Fee Calculation */}
        <div className="lg:col-span-6 glass-card space-y-5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#ff6b00]" /> 1. Transaction & Account Type
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

          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-2">
              PayPal Merchant Rate Plan
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'standard', label: 'Standard (2.99% + 49¢)' },
                { id: 'micro', label: 'Micropayments (4.99% + 9¢)' },
                { id: 'nonprofit', label: '501(c)(3) Charity (1.99%)' }
              ].map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setFeeType(plan.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    feeType === plan.id
                      ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-[#9ca3af] hover:bg-white/10'
                  }`}
                >
                  {plan.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <input
                type="checkbox"
                checked={isInternational}
                onChange={(e) => setIsInternational(e.target.checked)}
                className="rounded border-white/20 text-[#ff6b00] focus:ring-[#ff6b00]"
              />
              <div className="text-xs">
                <div className="font-semibold text-white">International / Cross-Border Payment (+1.50%)</div>
                <div className="text-[#6b7280]">Customer PayPal account is registered in a different country</div>
              </div>
            </label>
          </div>

          {/* Fee Breakdown Box */}
          <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 space-y-3 font-mono">
            <div className="flex justify-between text-xs text-[#9ca3af]">
              <span>PayPal Percentage Fee ({(percentFee * 100).toFixed(2)}%):</span>
              <span className="text-red-400">-{currency}{(grossAmount * percentFee).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#9ca3af]">
              <span>PayPal Fixed Fee:</span>
              <span className="text-red-400">-{currency}{fixedFee.toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between text-sm font-semibold text-white">
              <span>Total PayPal Fee ({effectiveRate}% cut):</span>
              <span className="text-red-400">-{currency}{totalFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold text-emerald-400 pt-1">
              <span>YOUR NET PAYOUT:</span>
              <span>{currency}{netPayout.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right: Reverse Invoice Solver */}
        <div className="lg:col-span-6 glass-card space-y-5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4 text-blue-400" /> 2. Reverse Invoice Break-Even Solver
          </h2>
          <p className="text-xs text-[#9ca3af] leading-relaxed">
            Want a specific dollar amount to hit your bank account after PayPal fees? Calculate the exact amount to invoice.
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

          <div className="p-5 rounded-xl bg-gradient-to-br from-[#121624] to-[#0e111c] border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-blue-400">YOU SHOULD INVOICE:</span>
              <span className="badge badge-brand">BREAK-EVEN TOTAL</span>
            </div>

            <div className="text-3xl font-bold font-mono text-white">
              {currency}{solvedGross.toFixed(2)}
            </div>

            <div className="space-y-1.5 text-xs font-mono text-[#9ca3af] pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Client Pays:</span>
                <span className="text-white">{currency}{solvedGross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>PayPal Fee ({(percentFee * 100).toFixed(2)}% + {currency}{fixedFee}):</span>
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
              <strong>Micropayments Tip:</strong> If your average transaction is under $10, switching to PayPal's Micropayment rate (4.99% + $0.09) saves significant money compared to standard $0.49 fixed fees.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
