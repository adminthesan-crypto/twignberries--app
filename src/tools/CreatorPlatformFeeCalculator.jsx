import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, Coffee, Heart } from 'lucide-react';

export default function CreatorPlatformFeeCalculator() {
  const [mrr, setMrr] = useState(2500); // $2,500/mo creator earnings
  const [platform, setPlatform] = useState('patreon_pro'); // patreon_pro 8%, patreon_premium 12%, bmc 5%
  const [avgSupport, setAvgSupport] = useState(10.00); // $10/mo support pledge

  const platforms = {
    patreon_lite: { name: 'Patreon Lite', cut: 0.05, paymentFee: 0.029, fixedFee: 0.30 },
    patreon_pro: { name: 'Patreon Pro', cut: 0.08, paymentFee: 0.029, fixedFee: 0.30 },
    patreon_premium: { name: 'Patreon Premium', cut: 0.12, paymentFee: 0.029, fixedFee: 0.30 },
    bmc: { name: 'BuyMeACoffee Standard', cut: 0.05, paymentFee: 0.029, fixedFee: 0.30 },
    ko_fi: { name: 'Ko-fi Gold', cut: 0.00, paymentFee: 0.029, fixedFee: 0.30 },
  };

  const selected = platforms[platform];
  const patronsCount = avgSupport > 0 ? (mrr / avgSupport) : 0;

  // Platform cut
  const platformFeeDollar = mrr * selected.cut;
  // CC processing cut
  const paymentFeeDollar = (mrr * selected.paymentFee) + (patronsCount * selected.fixedFee);
  const totalDeductions = platformFeeDollar + paymentFeeDollar;
  const netTakeHome = mrr - totalDeductions;
  const effectiveCutPercent = mrr > 0 ? ((totalDeductions / mrr) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-brand">
            <Sparkles className="w-3.5 h-3.5" /> Creator Economy 2026
          </span>
          <span className="text-xs text-gray-400 font-medium">Patreon vs BuyMeACoffee vs Ko-fi</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">
          Patreon & Creator Platform Cut Solver
        </h1>
        <p className="text-sm text-gray-400">
          Compare Patreon tiers (5%–12%), BuyMeACoffee (5%), and Ko-fi (0%) platform commissions plus CC processing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#FF5C00]" /> 1. Creator Membership Revenue
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Monthly Gross Member Revenue ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="50"
                  value={mrr}
                  onChange={(e) => setMrr(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono font-medium text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Average Member Pledge Amount ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="1"
                  value={avgSupport}
                  onChange={(e) => setAvgSupport(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono"
                />
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <Coffee className="w-4 h-4 text-[#FF5C00]" /> 2. Platform Comparison Tier
          </h2>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Select Creator Platform (2026 Cut Schedule)
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="glass-input font-medium"
            >
              <option value="patreon_pro">Patreon Pro (8% Platform Cut + 2.9% CC)</option>
              <option value="patreon_lite">Patreon Lite (5% Platform Cut + 2.9% CC)</option>
              <option value="patreon_premium">Patreon Premium (12% Platform Cut + 2.9% CC)</option>
              <option value="bmc">BuyMeACoffee Standard (5% Cut + Stripe CC)</option>
              <option value="ko_fi">Ko-fi Gold (0% Platform Cut + Stripe CC)</option>
            </select>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Net Take-Home Creator Earnings
              </span>
              <span className="badge badge-brand">
                Total Cut: {effectiveCutPercent.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                ${netTakeHome.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                / month
              </span>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Platform Cut ({selected.name} • {(selected.cut * 100).toFixed(0)}%)</span>
                <span className="font-mono text-white">${platformFeeDollar.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>CC & Micro-transaction Fees (~Stripe/PayPal)</span>
                <span className="font-mono text-white">${paymentFeeDollar.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-orange-400 font-semibold pt-1">
                <span>Total Deducted from Payouts</span>
                <span className="font-mono">${totalDeductions.toFixed(2)}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Est. Active Patrons</span>
                <span className="text-lg font-bold font-mono text-white">
                  {Math.round(patronsCount)} members
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Net per $100 Earned</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  ${(100 - effectiveCutPercent).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">Platform Insight:</strong> Patreon Pro's <strong>8% cut</strong> costs you <strong>${((0.08 - 0.05) * mrr).toFixed(2)}/month more</strong> than BuyMeACoffee at your current volume. Consider if Patreon's Discord role sync and community perks justify the difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
