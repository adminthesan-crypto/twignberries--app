import React, { useState } from 'react';
import { Package, Plus, Trash2, DollarSign, ShieldCheck, TrendingUp } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function BundleMarginTool() {
  const [items, setItems] = useState([
    { name: 'Core Product (Hero SKU)', cost: 18.00, retail: 50.00 },
    { name: 'Accessory Add-on A', cost: 3.50, retail: 15.00 },
    { name: 'Accessory Add-on B', cost: 2.00, retail: 10.00 }
  ]);
  const [bundlePrice, setBundlePrice] = useState(59.99);

  const addItem = () => {
    setItems([...items, { name: `Bundle SKU #${items.length + 1}`, cost: 5.00, retail: 15.00 }]);
  };

  const removeItem = (idx) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, field, val) => {
    const next = [...items];
    next[idx][field] = field === 'name' ? val : Number(val) || 0;
    setItems(next);
  };

  const totalCost = items.reduce((acc, it) => acc + Number(it.cost || 0), 0);
  const totalRetail = items.reduce((acc, it) => acc + Number(it.retail || 0), 0);
  const discountAmount = Math.max(0, totalRetail - bundlePrice);
  const discountPct = totalRetail > 0 ? ((discountAmount / totalRetail) * 100).toFixed(1) : 0;
  const netProfit = bundlePrice - totalCost;
  const marginPct = bundlePrice > 0 ? ((netProfit / bundlePrice) * 100).toFixed(1) : 0;
  const markupPct = totalCost > 0 ? (((bundlePrice - totalCost) / totalCost) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Product Bundle Margin & Discount Calculator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Calculate multi-item bundles, combined COGS, perceived customer savings discount %, and net profit margins offline."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <span style={SL}>Bundle Component Items</span>
            <button
              onClick={addItem}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>

          <div className="space-y-3">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#e6e9ef] shadow-sm flex items-center gap-4"
              >
                <input
                  type="text"
                  value={it.name}
                  onChange={(e) => updateItem(idx, 'name', e.target.value)}
                  className="flex-1 h-10 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532]"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#868894]">COGS:</span>
                  <input
                    type="number"
                    value={it.cost}
                    onChange={(e) => updateItem(idx, 'cost', e.target.value)}
                    className="w-20 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#868894]">MSRP:</span>
                  <input
                    type="number"
                    value={it.retail}
                    onChange={(e) => updateItem(idx, 'retail', e.target.value)}
                    className="w-20 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                  />
                </div>
                {items.length > 1 && (
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex items-center justify-between">
            <span className="text-xs font-bold text-[#676879]">Combined MSRP Value:</span>
            <span className="font-mono text-base font-bold text-[#1f2532]">${totalRetail.toFixed(2)}</span>
          </div>
        </div>

        {/* Pricing & Profit Sidebar */}
        <div className="space-y-10">
          <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-8">
            <div>
              <div style={SL}>Bundle Selling Price ($ USD)</div>
              <input
                type="number"
                value={bundlePrice}
                onChange={(e) => setBundlePrice(Number(e.target.value) || 0)}
                className="w-full h-12 px-4 rounded-xl border border-[#d0d4e4] font-mono text-xl font-bold text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
              />
            </div>

            <div className="pt-4 border-t border-[#f0f2f5] space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Customer Savings</span>
                <span className="font-mono font-bold text-green-700">
                  ${discountAmount.toFixed(2)} ({discountPct}% OFF)
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Combined COGS</span>
                <span className="font-mono font-bold text-[#1f2532]">${totalCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Net Bundle Profit</span>
                <span className="font-mono font-bold text-lg text-green-700">${netProfit.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f6ff] border border-[#d5d9fc] flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#6161ff]">Profit Margin</div>
                <div className="text-2xl font-bold text-[#1f2532] mt-0.5">{marginPct}%</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-[#6161ff]">Markup</div>
                <div className="text-lg font-bold text-[#1f2532] mt-0.5">{markupPct}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
