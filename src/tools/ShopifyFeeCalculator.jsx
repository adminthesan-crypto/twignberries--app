import React, { useState } from 'react';
import { ShoppingBag, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, CreditCard, Layers } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function ShopifyFeeCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000); // $15k/mo
  const [avgOrderValue, setAvgOrderValue] = useState(65.00); // $65 avg order
  const [plan, setPlan] = useState('basic'); // 'basic' | 'shopify' | 'advanced'
  const [useShopifyPayments, setUseShopifyPayments] = useState(true);

  // Plan pricing 2026
  const plans = {
    basic: { name: 'Shopify Basic', monthly: 39, ccRate: 0.029, ccFixed: 0.30, externalFee: 0.02 },
    shopify: { name: 'Shopify Standard', monthly: 105, ccRate: 0.026, ccFixed: 0.30, externalFee: 0.01 },
    advanced: { name: 'Shopify Advanced', monthly: 399, ccRate: 0.024, ccFixed: 0.30, externalFee: 0.006 },
  };

  const selectedPlan = plans[plan];
  const orderCount = avgOrderValue > 0 ? (monthlyRevenue / avgOrderValue) : 0;

  // Credit card processing fees
  const ccPercentageCost = monthlyRevenue * selectedPlan.ccRate;
  const ccFixedCost = orderCount * selectedPlan.ccFixed;
  const totalCcFees = ccPercentageCost + ccFixedCost;

  // External payment gateway penalty (if not using Shopify Payments)
  const externalPenalty = useShopifyPayments ? 0 : (monthlyRevenue * selectedPlan.externalFee);

  const totalShopifyMonthlyCost = selectedPlan.monthly + totalCcFees + externalPenalty;
  const effectiveFeePercent = monthlyRevenue > 0 ? ((totalShopifyMonthlyCost / monthlyRevenue) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Shopify Plan & Transaction Fee Estimator
          </h1>
          <span className="badge badge-success">COMPARE PLANS</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Compare Shopify Basic, Standard, and Advanced monthly CC rates and external gateway penalties.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF5C00]" /> 1. Monthly Store Volume
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Monthly Gross Store Revenue ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="100"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono font-medium text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Average Order Value (AOV) ($)
              </label>
              <div className="input-group">
                <span className="input-prefix">$</span>
                <input
                  type="number"
                  step="1"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(parseFloat(e.target.value) || 0)}
                  className="glass-input glass-input-prefix font-mono"
                />
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <CreditCard className="w-4 h-4 text-[#FF5C00]" /> 2. Shopify Plan & Payments
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Shopify Subscription Tier (2026)
              </label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="glass-input font-medium"
              >
                <option value="basic">Shopify Basic ($39/mo • 2.9% + 30¢)</option>
                <option value="shopify">Shopify Standard ($105/mo • 2.6% + 30¢)</option>
                <option value="advanced">Shopify Advanced ($399/mo • 2.4% + 30¢)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
              <div>
                <span className="text-xs font-medium text-white block">Use Shopify Payments?</span>
                <span className="text-[11px] text-gray-400">Avoids 0.6%–2% external gateway penalty</span>
              </div>
              <button
                type="button"
                onClick={() => setUseShopifyPayments(!useShopifyPayments)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  useShopifyPayments ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400'
                }`}
              >
                {useShopifyPayments ? 'Yes (0% penalty)' : 'No (External)'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Total Shopify Monthly Cost
              </span>
              <div className="flex items-center gap-2">
                <CopySummaryButton
                  title="Shopify Fee & Plan Breakdown"
                  lines={[
                    { label: 'Selected Plan', value: selectedPlan.name },
                    { label: 'Monthly GMV', value: `$${monthlyRevenue.toLocaleString()}` },
                    { label: 'Total Orders / Month', value: `${Math.round(orderCount)} orders` },
                    { label: 'Credit Card Processing Fees', value: `$${totalCcFees.toFixed(2)}` },
                    { label: 'Third-Party Transaction Fees', value: `$${externalPenalty.toFixed(2)}` },
                    { label: 'Total Shopify Monthly Cost', value: `$${totalShopifyMonthlyCost.toFixed(2)} (${effectiveFeePercent.toFixed(2)}% Effective Cut)` }
                  ]}
                />
                <span className="badge badge-brand">
                  Effective Cut: {effectiveFeePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                ${totalShopifyMonthlyCost.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                / month
              </span>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Monthly Subscription Plan ({selectedPlan.name})</span>
                <span className="font-mono text-white">${selectedPlan.monthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>CC Processing ({selectedPlan.ccRate * 100}% + 30¢)</span>
                <span className="font-mono text-white">${totalCcFees.toFixed(2)}</span>
              </div>
              {!useShopifyPayments && (
                <div className="flex justify-between text-orange-400">
                  <span>External Gateway Penalty ({selectedPlan.externalFee * 100}%)</span>
                  <span className="font-mono">${externalPenalty.toFixed(2)}</span>
                </div>
              )}
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Est. Monthly Orders</span>
                <span className="text-lg font-bold font-mono text-white">
                  {Math.round(orderCount)} orders
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Cost per Order</span>
                <span className="text-lg font-bold font-mono text-orange-400">
                  ${orderCount > 0 ? (totalShopifyMonthlyCost / orderCount).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">Upgrade Threshold:</strong> Upgrading from <strong>Shopify Basic ($39)</strong> to <strong>Shopify Standard ($105)</strong> pays for itself automatically once your store revenue exceeds <strong>$22,000/month</strong> due to the 0.3% CC processing savings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
