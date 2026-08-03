import React, { useState } from 'react';
import { DollarSign, PieChart, Info, TrendingUp, HelpCircle, AlertCircle } from 'lucide-react';

export default function EtsyFeeCalculator() {
  const [salePrice, setSalePrice] = useState(35);
  const [shippingCharged, setShippingCharged] = useState(5);
  const [itemCost, setItemCost] = useState(10);
  const [shippingCost, setShippingCost] = useState(4.5);
  const [offsiteAds, setOffsiteAds] = useState('none'); // none, 15, 12
  const [currency, setCurrency] = useState('$');

  // Etsy 2026 constants
  const listingFee = 0.20;
  const totalRevenue = Number(salePrice) + Number(shippingCharged);
  const transactionFee = totalRevenue * 0.065; // 6.5% on price + shipping
  const paymentFee = totalRevenue * 0.03 + 0.25; // USA 3% + 0.25

  let offsiteAdFee = 0;
  if (offsiteAds === '15') offsiteAdFee = totalRevenue * 0.15;
  if (offsiteAds === '12') offsiteAdFee = totalRevenue * 0.12;

  const totalFees = listingFee + transactionFee + paymentFee + offsiteAdFee;
  const totalCosts = Number(itemCost) + Number(shippingCost);
  const netProfit = totalRevenue - totalFees - totalCosts;
  const profitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0;
  const etsyCutPercent = totalRevenue > 0 ? ((totalFees / totalRevenue) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-white">
              Etsy Profit Margin & Fee Calculator (2026)
            </h1>
            <span className="badge badge-success">UPDATED FOR 2026</span>
          </div>
          <p className="text-sm text-[#9ca3af] mt-1">
            Calculate your exact listing fee, 6.5% transaction cut, processing fees, and true net profit.
          </p>
        </div>
      </div>

      {/* Grid Layout: Left Inputs, Right Interactive Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-7 glass-card space-y-5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#ff6b00]" /> 1. Selling Price & Shipping
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
                Item Selling Price ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="glass-input text-lg font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
                Shipping Charged to Buyer ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                value={shippingCharged}
                onChange={(e) => setShippingCharged(e.target.value)}
                className="glass-input text-lg font-mono"
              />
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> 2. Your Production Costs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
                Item Material / Craft Cost ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                value={itemCost}
                onChange={(e) => setItemCost(e.target.value)}
                className="glass-input font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
                Actual Shipping Label Cost ({currency})
              </label>
              <input
                type="number"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                className="glass-input font-mono"
              />
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <PieChart className="w-4 h-4 text-blue-400" /> 3. Etsy Offsite Ads (Optional)
          </h2>

          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
              Did this sale come from Etsy Offsite Ads?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'No Offsite Ad (0%)' },
                { id: '15', label: 'Standard Ad (15%)' },
                { id: '12', label: 'High Volume (12%)' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOffsiteAds(opt.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                    offsiteAds === opt.id
                      ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-[#9ca3af] hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Profit Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card bg-gradient-to-br from-[#121624] to-[#0e121e] border-white/15">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#9ca3af] mb-4">
              Financial Breakdown
            </h3>

            {/* Net Profit Big Banner */}
            <div className={`p-4 rounded-xl border mb-6 ${
              netProfit >= 0 
                ? 'bg-emerald-500/10 border-emerald-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#9ca3af]">ESTIMATED NET PROFIT</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  netProfit >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {profitMargin}% MARGIN
                </span>
              </div>
              <div className={`text-3xl font-bold font-mono mt-1 ${
                netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {currency}{netProfit.toFixed(2)}
              </div>
            </div>

            {/* Itemized list */}
            <div className="space-y-3 text-sm font-mono">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Total Customer Payment:</span>
                <span className="text-white font-semibold">{currency}{totalRevenue.toFixed(2)}</span>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Etsy Listing Fee:</span>
                <span className="text-red-400">-{currency}{listingFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Transaction Fee (6.5%):</span>
                <span className="text-red-400">-{currency}{transactionFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Payment Processing (3% + $0.25):</span>
                <span className="text-red-400">-{currency}{paymentFee.toFixed(2)}</span>
              </div>
              {offsiteAdFee > 0 && (
                <div className="flex justify-between text-xs text-[#9ca3af]">
                  <span>Offsite Ad Fee ({offsiteAds}%):</span>
                  <span className="text-red-400">-{currency}{offsiteAdFee.toFixed(2)}</span>
                </div>
              )}

              <div className="h-px bg-white/10 my-2" />

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Total Etsy Fees ({etsyCutPercent}% cut):</span>
                <span className="text-red-400 font-bold">-{currency}{totalFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Your Production Costs:</span>
                <span className="text-amber-400">-{currency}{totalCosts.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Habit/SEO Educational Tip Card */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#9ca3af] space-y-2">
            <div className="font-semibold text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#ff6b00]" /> Why know your Etsy Margin?
            </div>
            <p className="leading-relaxed">
              Etsy charges a mandatory 6.5% transaction fee on both the item price <strong className="text-white">and</strong> shipping fee. Bookmark this tool to check margins before listing new handmade inventory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
