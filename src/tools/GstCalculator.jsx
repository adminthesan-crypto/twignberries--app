import React, { useState } from 'react';
import { Calculator, Percent, Copy, Check, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function GstCalculator() {
  const [amount, setAmount] = useState(1000);
  const [gstRate, setGstRate] = useState(18); // 3, 5, 12, 18, 28
  const [calcType, setCalcType] = useState('exclusive'); // 'exclusive' (add GST) vs 'inclusive' (remove GST)
  const [currency, setCurrency] = useState('₹');
  const [copied, setCopied] = useState(false);

  const baseVal = Number(amount) || 0;
  const rate = Number(gstRate) || 0;

  let netPrice = 0;
  let gstAmount = 0;
  let grossPrice = 0;

  if (calcType === 'exclusive') {
    // We ADD GST to amount
    netPrice = baseVal;
    gstAmount = baseVal * (rate / 100);
    grossPrice = netPrice + gstAmount;
  } else {
    // Amount already INCLUDES GST
    grossPrice = baseVal;
    netPrice = baseVal / (1 + rate / 100);
    gstAmount = grossPrice - netPrice;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  const handleCopy = () => {
    const text = `Net Price: ${currency}${netPrice.toFixed(2)} | GST (${rate}%): ${currency}${gstAmount.toFixed(2)} | Total: ${currency}${grossPrice.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-white">
              GST Tax Inclusive & Exclusive Calculator (2026)
            </h1>
            <span className="badge badge-brand">INSTANT CGST / SGST</span>
          </div>
          <p className="text-sm text-[#9ca3af] mt-1">
            Easily add or remove GST from invoice totals, showing split Central (CGST) and State (SGST) tax shares.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="btn-secondary text-xs"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Breakdown' : 'Copy Summary'}</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-6 glass-card space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#ff6b00]" /> 1. Calculation Mode
            </h2>
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setCalcType('exclusive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  calcType === 'exclusive'
                    ? 'bg-[#ff6b00] text-white shadow'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                + Add GST (Exclusive)
              </button>
              <button
                type="button"
                onClick={() => setCalcType('inclusive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  calcType === 'inclusive'
                    ? 'bg-[#ff6b00] text-white shadow'
                    : 'text-[#9ca3af] hover:text-white'
                }`}
              >
                - Remove GST (Inclusive)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
              {calcType === 'exclusive' ? 'Net Amount Before Tax' : 'Total Invoice Amount With Tax'} ({currency})
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
              Select Standard GST Slab (%)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[3, 5, 12, 18, 28].map((slab) => (
                <button
                  key={slab}
                  type="button"
                  onClick={() => setGstRate(slab)}
                  className={`py-2.5 rounded-xl text-sm font-mono font-semibold border transition-all ${
                    gstRate === slab
                      ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-white'
                      : 'bg-white/5 border-white/10 text-[#9ca3af] hover:bg-white/10'
                  }`}
                >
                  {slab}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Summary Card */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-br from-[#121624] to-[#0e111a] border border-white/15 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase text-[#9ca3af]">TAX SUMMARY REPORT</span>
              <div className="flex items-center gap-2">
                <CopySummaryButton
                  title={`GST Tax Calculation Report (${rate}% Slab)`}
                  lines={[
                    { label: 'Calculation Mode', value: calcType === 'exclusive' ? 'GST Exclusive (Added)' : 'GST Inclusive (Included)' },
                    { label: 'Net Taxable Value', value: `${currency}${netPrice.toFixed(2)}` },
                    { label: 'CGST (Central Tax)', value: `${currency}${cgst.toFixed(2)} (${(rate / 2).toFixed(1)}%)` },
                    { label: 'SGST (State Tax)', value: `${currency}${sgst.toFixed(2)} (${(rate / 2).toFixed(1)}%)` },
                    { label: 'Total GST Amount', value: `${currency}${gstAmount.toFixed(2)} (${rate}%)` },
                    { label: 'Final Total Price (Inc. GST)', value: `${currency}${grossPrice.toFixed(2)}` }
                  ]}
                />
                <span className="text-xs font-mono text-emerald-400 font-semibold">{rate}% GST SLAB</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Net Taxable Price:</span>
                <span className="text-white font-semibold">{currency}{netPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>CGST (Central Tax - {(rate / 2).toFixed(1)}%):</span>
                <span className="text-[#ff8c3a]">+{currency}{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>SGST (State Tax - {(rate / 2).toFixed(1)}%):</span>
                <span className="text-[#ff8c3a]">+{currency}{sgst.toFixed(2)}</span>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex justify-between text-[#9ca3af]">
                <span>Total GST Amount ({rate}%):</span>
                <span className="text-[#ff6b00] font-bold">+{currency}{gstAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-xl font-bold text-white pt-2 border-t border-white/10">
                <span>TOTAL PAYABLE:</span>
                <span className="text-emerald-400">{currency}{grossPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#9ca3af] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
            <span>
              <strong>Intra-state vs. Inter-state:</strong> For sales within the same state, GST is split equally into <strong>CGST + SGST</strong>. For sales across state borders, the full amount applies as <strong>IGST</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
