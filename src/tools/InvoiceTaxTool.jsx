import React, { useState } from 'react';
import { FileText, Plus, Trash2, DollarSign, ShieldCheck, Printer, Download } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function InvoiceTaxTool() {
  const [items, setItems] = useState([
    { desc: 'Custom SaaS Dashboard Frontend', qty: 1, price: 2500, taxRate: 10 },
    { desc: 'Cloud API Auth & Database Integration', qty: 20, price: 120, taxRate: 10 },
    { desc: '12 Months SLA Maintenance', qty: 1, price: 1000, taxRate: 0 }
  ]);
  const [discountPct, setDiscountPct] = useState(5);
  const [currency, setCurrency] = useState('USD');

  const addItem = () => {
    setItems([...items, { desc: `New Invoice Line Item`, qty: 1, price: 100, taxRate: 10 }]);
  };

  const removeItem = (idx) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, field, val) => {
    const next = [...items];
    next[idx][field] = field === 'desc' ? val : Math.max(0, Number(val) || 0);
    setItems(next);
  };

  const lineCalculations = items.map((it) => {
    const sub = Number(it.qty) * Number(it.price);
    const tax = sub * (Number(it.taxRate) / 100);
    const total = sub + tax;
    return { sub, tax, total };
  });

  const grossSubtotal = lineCalculations.reduce((acc, l) => acc + l.sub, 0);
  const discountAmt = grossSubtotal * (Number(discountPct) / 100);
  const discountedSubtotal = Math.max(0, grossSubtotal - discountAmt);
  const totalTaxAmt = lineCalculations.reduce((acc, l) => acc + l.tax, 0);
  const finalInvoiceTotal = discountedSubtotal + totalTaxAmt;

  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'INR' ? '₹' : '$';

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-4">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Multi-Item Invoice Tax & Discount Calculator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Calculate multi-line item totals, apply client discount %, compute per-item sales tax/VAT rates, and inspect the final bill offline."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <span style={SL}>Invoice Line Items</span>
            <div className="flex items-center gap-6">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="h-8 px-2 rounded border border-[#d0d4e4] text-xs font-bold text-[#1f2532] bg-white"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
              <button
                onClick={addItem}
                className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
              >
                <Plus size={14} /> Add Line
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-[#e6e9ef] shadow-sm flex items-center gap-6 flex-wrap"
              >
                <input
                  type="text"
                  value={it.desc}
                  onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                  className="flex-1 min-w-[180px] h-10 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532]"
                />
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-[#868894]">Qty:</span>
                  <input
                    type="number"
                    value={it.qty}
                    onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                    className="w-14 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-[#868894]">Price ({symbol}):</span>
                  <input
                    type="number"
                    value={it.price}
                    onChange={(e) => updateItem(idx, 'price', e.target.value)}
                    className="w-20 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold text-[#868894]">Tax%:</span>
                  <input
                    type="number"
                    value={it.taxRate}
                    onChange={(e) => updateItem(idx, 'taxRate', e.target.value)}
                    className="w-14 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
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
        </div>

        {/* Totals Summary */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
            <div>
              <div style={SL}>Overall Client Discount (%)</div>
              <input
                type="number"
                value={discountPct}
                onChange={(e) => setDiscountPct(Math.max(0, Math.min(100, e.target.value)))}
                className="w-full h-12 px-4 rounded-xl border border-[#d0d4e4] font-mono text-xl font-bold text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
              />
            </div>

            <div className="pt-4 border-t border-[#f0f2f5] space-y-6">
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Gross Subtotal</span>
                <span className="font-mono font-bold text-[#1f2532]">
                  {symbol}{grossSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Client Discount ({discountPct}%)</span>
                <span className="font-mono font-bold text-red-600">
                  -{symbol}{discountAmt.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Total Sales Tax / VAT</span>
                <span className="font-mono font-bold text-[#1f2532]">
                  +{symbol}{totalTaxAmt.toFixed(2)}
                </span>
              </div>
            </div>

            <div style={{
              padding: '20px 16px',
              borderRadius: 16,
              background: '#f5f6ff',
              border: '1px solid #d5d9fc',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, color: '#6161ff', letterSpacing: '0.06em', marginBottom: 4 }}>
                Total Invoice Amount Due
              </div>
              <div style={{ fontSize: 28, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#1f2532', marginBottom: 12, wordBreak: 'break-all' }}>
                {symbol}{finalInvoiceTotal.toFixed(2)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NativeShareButton
                  text={`Invoice Summary\nGross Subtotal: ${symbol}${grossSubtotal.toFixed(2)}\nDiscount: -${symbol}${discountAmt.toFixed(2)}\nTax: +${symbol}${totalTaxAmt.toFixed(2)}\nTotal Due: ${symbol}${finalInvoiceTotal.toFixed(2)}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
