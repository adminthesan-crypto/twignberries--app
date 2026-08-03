import React, { useState } from 'react';
import { Package, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function AmazonFbaCalculator() {
  const [price, setPrice] = useState(39.99);
  const [categoryRate, setCategoryRate] = useState(15); // 15% standard
  const [fbaTier, setFbaTier] = useState(4.75); // Large Standard 1 lb
  const [cogs, setCogs] = useState(11.50);
  const [inboundShipping, setInboundShipping] = useState(1.20);

  // Math
  const referralFee = (price * (categoryRate / 100));
  const fbaFee = fbaTier;
  const totalAmazonFees = referralFee + fbaFee;
  const totalCosts = totalAmazonFees + cogs + inboundShipping;
  const netProfit = price - totalCosts;
  const marginPercent = price > 0 ? ((netProfit / price) * 100) : 0;
  const breakEvenPrice = (fbaFee + cogs + inboundShipping) / (1 - (categoryRate / 100));

  // Percentage bar breakdown
  const referralPct = price > 0 ? Math.min(100, Math.max(0, (referralFee / price) * 100)) : 0;
  const fbaPct = price > 0 ? Math.min(100, Math.max(0, (fbaFee / price) * 100)) : 0;
  const cogsPct = price > 0 ? Math.min(100, Math.max(0, ((cogs + inboundShipping) / price) * 100)) : 0;
  const profitPct = price > 0 ? Math.min(100, Math.max(0, (netProfit / price) * 100)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-brand">
            <Sparkles className="w-3.5 h-3.5" /> E-Commerce 2026
          </span>
          <span className="text-xs text-gray-400 font-medium">Amazon Seller Central Spec</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">
          Amazon FBA Referral & Profit Calculator
        </h1>
        <p className="text-sm text-gray-400">
          Calculate true FBA fulfillment fees, category referral cuts (8%-17%), and exact net margins per unit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Package className="w-4 h-4 text-[#FF5C00]" /> 1. Selling Price & Category
          </h2>

          <div className="space-y-4">
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
                  className="glass-input glass-input-prefix font-mono font-medium text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Amazon Referral Fee Category
              </label>
              <select
                value={categoryRate}
                onChange={(e) => setCategoryRate(parseFloat(e.target.value))}
                className="glass-input font-medium"
              >
                <option value={8}>Electronics / Camera / Personal Computers (8%)</option>
                <option value={15}>Standard Categories (Home, Kitchen, Toys, Beauty) (15%)</option>
                <option value={17}>Apparel & Clothing / Accessories (17%)</option>
                <option value={20}>Jewelry & Fine Watches (20%)</option>
              </select>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <DollarSign className="w-4 h-4 text-[#FF5C00]" /> 2. FBA Fulfillment & COGS
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                FBA Size & Weight Tier (Pick & Pack)
              </label>
              <select
                value={fbaTier}
                onChange={(e) => setFbaTier(parseFloat(e.target.value))}
                className="glass-input font-medium"
              >
                <option value={3.22}>Small Standard (Under 4 oz) — $3.22</option>
                <option value={3.77}>Small Standard (4 to 8 oz) — $3.77</option>
                <option value={4.75}>Large Standard (1 lb) — $4.75</option>
                <option value={5.40}>Large Standard (1.5 lb) — $5.40</option>
                <option value={6.10}>Large Standard (2 lb) — $6.10</option>
                <option value={9.73}>Small Oversize (Up to 70 lb) — $9.73</option>
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
                  Inbound Shipping ($)
                </label>
                <div className="input-group">
                  <span className="input-prefix">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={inboundShipping}
                    onChange={(e) => setInboundShipping(parseFloat(e.target.value) || 0)}
                    className="glass-input glass-input-prefix font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results & Linear Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Net Profit per Unit
              </span>
              <div className="flex items-center gap-2">
                <CopySummaryButton
                  title="Amazon FBA Fee & Margin Breakdown"
                  lines={[
                    { label: 'Selling Price', value: `$${price.toFixed(2)}` },
                    { label: 'Referral Fee', value: `$${referralFee.toFixed(2)}` },
                    { label: 'FBA Fulfillment Fee', value: `$${fbaFee.toFixed(2)}` },
                    { label: 'Unit Cost (COGS + Shipping)', value: `$${(cogs + inboundShipping).toFixed(2)}` },
                    { label: 'Net Profit per Unit', value: `$${netProfit.toFixed(2)} (${marginPercent.toFixed(1)}% Margin)` },
                    { label: 'Break-Even Selling Price', value: `$${breakEvenPrice.toFixed(2)}` }
                  ]}
                />
                <span className="badge badge-brand">
                  Margin: {marginPercent.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                ${netProfit.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                / sale
              </span>
            </div>

            {/* Visual Margin Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-gray-400">
                <span>Revenue Allocation Breakdown</span>
                <span>$100% of Sale</span>
              </div>
              <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden flex">
                <div style={{ width: `${referralPct}%` }} title="Referral Fee" className="bg-orange-500 h-full" />
                <div style={{ width: `${fbaPct}%` }} title="FBA Fulfillment" className="bg-amber-500 h-full" />
                <div style={{ width: `${cogsPct}%` }} title="COGS + Shipping" className="bg-blue-500 h-full" />
                <div style={{ width: `${profitPct}%` }} title="Net Profit" className="bg-emerald-500 h-full" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  Referral ({categoryRate}%): <strong className="text-white">${referralFee.toFixed(2)}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  FBA Pick/Pack: <strong className="text-white">${fbaFee.toFixed(2)}</strong>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  COGS + Inbound: <strong className="text-white">${(cogs + inboundShipping).toFixed(2)}</strong>
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
                <span className="text-xs text-gray-400 block font-medium">Break-Even Price</span>
                <span className="text-lg font-bold font-mono text-white">
                  ${breakEvenPrice.toFixed(2)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Total Amazon Cut</span>
                <span className="text-lg font-bold font-mono text-orange-400">
                  ${totalAmazonFees.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">Pro Tip:</strong> Amazon applies a minimum $0.30 referral fee on most categories. If your unit COGS + FBA exceeds your break-even threshold of <strong>${breakEvenPrice.toFixed(2)}</strong>, you will incur a loss per order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
