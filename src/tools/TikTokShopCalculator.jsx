import React, { useState } from 'react';
import { ShoppingBag, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, Users } from 'lucide-react';

export default function TikTokShopCalculator() {
  const [price, setPrice] = useState(29.99);
  const [platformFeePercent, setPlatformFeePercent] = useState(6); // 2026 standard 6%
  const [affiliateCut, setAffiliateCut] = useState(15); // 15% creator commission
  const [shippingSubsidy, setShippingSubsidy] = useState(0);
  const [cogs, setCogs] = useState(7.50);

  // Math
  const tiktokPlatformFee = (price * (platformFeePercent / 100));
  const creatorCommission = (price * (affiliateCut / 100));
  const totalFees = tiktokPlatformFee + creatorCommission + shippingSubsidy;
  const netSellerRevenue = price - totalFees;
  const netProfit = netSellerRevenue - cogs;
  const marginPercent = price > 0 ? ((netProfit / price) * 100) : 0;

  // Percentage breakdown bar
  const tiktokPct = price > 0 ? Math.min(100, Math.max(0, (tiktokPlatformFee / price) * 100)) : 0;
  const creatorPct = price > 0 ? Math.min(100, Math.max(0, (creatorCommission / price) * 100)) : 0;
  const cogsPct = price > 0 ? Math.min(100, Math.max(0, ((cogs + shippingSubsidy) / price) * 100)) : 0;
  const profitPct = price > 0 ? Math.min(100, Math.max(0, (netProfit / price) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-brand">
            <Sparkles className="w-3.5 h-3.5" /> E-Commerce 2026
          </span>
          <span className="text-xs text-gray-400 font-medium">TikTok Shop Standard Cut</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">
          TikTok Shop Seller Fee & Creator Cut Calculator
        </h1>
        <p className="text-sm text-gray-400">
          Calculate TikTok Shop's 6% platform fee, affiliate creator commissions, and exact net payouts per item.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#FF5C00]" /> 1. Selling Price & Creator Cut
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Item Selling Price ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono font-medium text-base"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-400">
                  Affiliate Creator Commission Cut (%)
                </label>
                <span className="text-xs font-mono font-bold text-[#FF5C00]">
                  {affiliateCut}% (${creatorCommission.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="1"
                value={affiliateCut}
                onChange={(e) => setAffiliateCut(parseFloat(e.target.value))}
                className="w-full accent-[#FF5C00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>0% (No Affiliates)</span>
                <span>15% (Standard)</span>
                <span>35% (Viral Boost)</span>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <DollarSign className="w-4 h-4 text-[#FF5C00]" /> 2. Platform Cut & COGS
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                TikTok Shop Standard Cut (%)
              </label>
              <select
                value={platformFeePercent}
                onChange={(e) => setPlatformFeePercent(parseFloat(e.target.value))}
                className="glass-input font-medium"
              >
                <option value={6}>Standard Shop Commission (6% standard)</option>
                <option value={5}>Electronics / Large Appliances (5%)</option>
                <option value={8}>Beauty & Personal Care (8%)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
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

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Shipping Subsidy ($)
                </label>
                <div className="input-group">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={shippingSubsidy}
                    onChange={(e) => setShippingSubsidy(parseFloat(e.target.value) || 0)}
                    className="glass-input glass-input-prefix font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Net Profit per Item
              </span>
              <span className="badge badge-brand">
                Margin: {marginPercent.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                ${netProfit.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                / sale
              </span>
            </div>

            {/* Three-Way Visual Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-gray-400">
                <span>Revenue Allocation Breakdown</span>
                <span>100% of Price</span>
              </div>
              <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden flex">
                <div style={{ width: `${tiktokPct}%` }} title="TikTok Cut" className="bg-orange-500 h-full" />
                <div style={{ width: `${creatorPct}%` }} title="Creator Commission" className="bg-pink-500 h-full" />
                <div style={{ width: `${cogsPct}%` }} title="COGS + Shipping" className="bg-blue-500 h-full" />
                <div style={{ width: `${profitPct}%` }} title="Net Profit" className="bg-emerald-500 h-full" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  TikTok ({platformFeePercent}%): <strong className="text-white">${tiktokPlatformFee.toFixed(2)}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  Creator Cut ({affiliateCut}%): <strong className="text-white">${creatorCommission.toFixed(2)}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  COGS + Shipping: <strong className="text-white">${(cogs + shippingSubsidy).toFixed(2)}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Net Profit: <strong className="text-emerald-400">${netProfit.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Net Seller Revenue</span>
                <span className="text-lg font-bold font-mono text-white">
                  ${netSellerRevenue.toFixed(2)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Total Platform & Affiliate Cut</span>
                <span className="text-lg font-bold font-mono text-orange-400">
                  ${(tiktokPlatformFee + creatorCommission).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <Users className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">Affiliate Strategy:</strong> In 2026, TikTok Shop creators prioritize products offering <strong>15% to 20% commission</strong>. Pricing with a <strong>60%+ gross margin</strong> ensures you retain healthy net profit even when creators go viral.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
