import React, { useState } from 'react';
import { TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, Target, BarChart2 } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function RoasCalculator() {
  const [price, setPrice] = useState(79.99);
  const [cogs, setCogs] = useState(24.00);
  const [cpc, setCpc] = useState(1.45); // average CPC
  const [convRate, setConvRate] = useState(2.8); // 2.8% conversion rate

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
            ROAS & Ad Spend Break-Even Calculator
          </h1>
          <span className="badge badge-brand">PAID ADS</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Calculate exact Break-Even ROAS, Target CPA, and paid ad profitability from your unit margins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-[#FF5C00]" /> 1. Unit Economics & Margin
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Selling Price ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Unit COGS ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={cogs}
                  onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono"
                />
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <BarChart2 className="w-4 h-4 text-[#FF5C00]" /> 2. Paid Ad Performance Sliders
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-400">
                  Cost Per Click (CPC)
                </label>
                <span className="text-xs font-mono font-bold text-white">
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
                className="w-full accent-[#FF5C00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>$0.20 (Cheap)</span>
                <span>$1.50 (Standard)</span>
                <span>$6.00 (High-Intent)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-400">
                  Conversion Rate (%)
                </label>
                <span className="text-xs font-mono font-bold text-[#FF5C00]">
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
                className="w-full accent-[#FF5C00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>1% (Cold Traffic)</span>
                <span>2.8% (Average)</span>
                <span>8% (High-Converting)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Break-Even ROAS Target
              </span>
              <div className="flex items-center gap-2">
                <CopySummaryButton
                  title="ROAS & Profitability Target Summary"
                  lines={[
                    { label: 'Selling Price', value: `$${price.toFixed(2)}` },
                    { label: 'COGS & Fulfillment', value: `$${cogs.toFixed(2)} (${cogsPercent.toFixed(1)}%)` },
                    { label: 'Ad Spend per Sale (CPA)', value: `$${targetCpa.toFixed(2)}` },
                    { label: 'Break-Even ROAS Target', value: `${breakEvenRoas.toFixed(2)}x` },
                    { label: 'Max Allowable Cost per Click (CPC)', value: `$${maxCpc.toFixed(2)}` },
                    { label: 'Net Profit After Ads', value: `$${netProfitAfterAds.toFixed(2)} (${netMarginPercent.toFixed(1)}% Margin)` }
                  ]}
                />
                <span className={`badge ${netProfitAfterAds >= 0 ? 'badge-success' : 'badge-brand'}`}>
                  {netProfitAfterAds >= 0 ? 'Profitable Ad Campaign' : 'Loss-Making at this CPC'}
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                {breakEvenRoas.toFixed(2)}x
              </span>
              <span className="text-sm font-medium text-gray-400">
                min. ROAS required
              </span>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Actual Campaign ROAS</span>
                <span className={`text-xl font-bold font-mono ${actualRoas >= breakEvenRoas ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {actualRoas.toFixed(2)}x
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Net Profit / Sale (After Ads)</span>
                <span className={`text-xl font-bold font-mono ${netProfitAfterAds >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  ${netProfitAfterAds.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] text-gray-400 block">Ad Spend to Get 1 Sale</span>
                <span className="text-sm font-semibold font-mono text-white">${adSpendPerSale.toFixed(2)}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] text-gray-400 block">Max Target CPA (Break-Even)</span>
                <span className="text-sm font-semibold font-mono text-white">${breakEvenCpa.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">ROAS Formula:</strong> Break-Even ROAS = <code>1 / Gross Margin %</code>. If your gross margin is <strong>{(grossMarginPercent * 100).toFixed(1)}%</strong>, any ad campaign running below <strong>{breakEvenRoas.toFixed(2)}x ROAS</strong> is burning money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
