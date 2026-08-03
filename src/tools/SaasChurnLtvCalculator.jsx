import React, { useState } from 'react';
import { TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, Users, BarChart3, RefreshCw } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function SaasChurnLtvCalculator() {
  const [arpu, setArpu] = useState(49.00); // $49/mo Average Revenue Per User
  const [monthlyChurn, setMonthlyChurn] = useState(4.5); // 4.5% monthly churn
  const [grossMargin, setGrossMargin] = useState(85); // 85% gross margin
  const [cac, setCac] = useState(120.00); // Customer Acquisition Cost $120

  // Math
  const churnRateDec = monthlyChurn / 100;
  const customerLifetimeMonths = churnRateDec > 0 ? (1 / churnRateDec) : 0;
  const grossLtv = arpu * customerLifetimeMonths;
  const netLtv = grossLtv * (grossMargin / 100);
  const ltvCacRatio = cac > 0 ? (netLtv / cac) : 0;
  const paybackMonths = (arpu * (grossMargin / 100)) > 0 ? (cac / (arpu * (grossMargin / 100))) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-brand">
            <Sparkles className="w-3.5 h-3.5" /> SaaS & Software 2026
          </span>
          <span className="text-xs text-gray-400 font-medium">B2B & Micro-SaaS Financial Spec</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">
          SaaS MRR Churn & Lifetime Value (LTV:CAC) Calculator
        </h1>
        <p className="text-sm text-gray-400">
          Calculate true customer Lifetime Value, LTV:CAC health ratio, and CAC payback period months based on monthly churn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-[#FF5C00]" /> 1. Revenue & Acquisition Cost
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                ARPU (Monthly per User) ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="1"
                  value={arpu}
                  onChange={(e) => setArpu(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Customer Acquisition Cost ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="5"
                  value={cac}
                  onChange={(e) => setCac(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono font-medium"
                />
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <RefreshCw className="w-4 h-4 text-[#FF5C00]" /> 2. Churn & Gross Margin
          </h2>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-400">
                  Monthly Churn Rate (%)
                </label>
                <span className="text-xs font-mono font-bold text-[#FF5C00]">
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
                className="w-full accent-[#FF5C00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>1% (Enterprise B2B)</span>
                <span>5% (Prosumer SaaS)</span>
                <span>12% (High Churn)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-400">
                  Gross Profit Margin (%)
                </label>
                <span className="text-xs font-mono font-bold text-white">
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
                className="w-full accent-[#FF5C00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>60% (AI/GPU SaaS)</span>
                <span>80% (Standard SaaS)</span>
                <span>95% (Pure Code)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Net Customer Lifetime Value (LTV)
              </span>
              <div className="flex items-center gap-2">
                <CopySummaryButton
                  title="SaaS LTV & Churn Health Summary"
                  lines={[
                    { label: 'Average Revenue per User (ARPU)', value: `$${arpu.toFixed(2)}/mo` },
                    { label: 'Gross Margin', value: `${grossMargin}%` },
                    { label: 'Monthly MRR Churn Rate', value: `${churnRate}%` },
                    { label: 'Customer Acquisition Cost (CAC)', value: `$${cac.toFixed(2)}` },
                    { label: 'Customer Retention Span', value: `${customerLifespanMonths.toFixed(1)} months` },
                    { label: 'Net Customer Lifetime Value (LTV)', value: `$${netLtv.toFixed(2)}` },
                    { label: 'LTV:CAC Health Ratio', value: `${ltvCacRatio.toFixed(2)}x` },
                    { label: 'CAC Payback Period', value: `${paybackMonths.toFixed(1)} months` }
                  ]}
                />
                <span className={`badge ${ltvCacRatio >= 3 ? 'badge-success' : 'badge-brand'}`}>
                  LTV:CAC Ratio — {ltvCacRatio.toFixed(1)}x
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                ${netLtv.toFixed(0)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                / customer lifetime
              </span>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Customer Retention Span</span>
                <span className="text-lg font-bold font-mono text-white">
                  {customerLifetimeMonths.toFixed(1)} months
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">CAC Payback Period</span>
                <span className={`text-lg font-bold font-mono ${paybackMonths <= 12 ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {paybackMonths.toFixed(1)} months
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] text-gray-400 block">Gross LTV (Before Margin)</span>
                <span className="text-sm font-semibold font-mono text-white">${grossLtv.toFixed(0)}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[11px] text-gray-400 block">Net Profit per Customer</span>
                <span className="text-sm font-semibold font-mono text-emerald-400">${(netLtv - cac).toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">VC & Growth Health Rule:</strong> A healthy SaaS has an <strong>LTV:CAC ratio of 3.0x or higher</strong> and a <strong>CAC payback period under 12 months</strong>. Reducing monthly churn from {monthlyChurn}% to {(monthlyChurn * 0.7).toFixed(1)}% increases your net LTV by <strong>+42%</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
