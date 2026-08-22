import React, { useState } from 'react';
import AeoArticle from '../components/AeoArticle';
import { Calculator, Percent, Copy, Check, ShieldCheck, ArrowRightLeft, DollarSign } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

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

  const sectionLabelStyle = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--text-4)',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Is that price with GST or without?
          </h1>
          <span className="badge badge-success">CGST / SGST</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Flip it either direction in one click. No more guessing on a client call.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Left Column (Inputs / Editor) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Form Card 1: Mode & Currency */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <ArrowRightLeft size={14} color="var(--brand)" />
              1. Calculation Mode &amp; Currency
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-2">
                  Tax Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcType('exclusive')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      calcType === 'exclusive'
                        ? 'bg-[#ff6b00] border-[#ff6b00] text-[#1f2532] shadow-sm'
                        : 'bg-white border-[#e6e9ef] text-[#9ca3af] hover:bg-gray-100 hover:text-[#1f2532]'
                    }`}
                  >
                    + Add GST (Exclusive)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcType('inclusive')}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all ${
                      calcType === 'inclusive'
                        ? 'bg-[#ff6b00] border-[#ff6b00] text-[#1f2532] shadow-sm'
                        : 'bg-white border-[#e6e9ef] text-[#9ca3af] hover:bg-gray-100 hover:text-[#1f2532]'
                    }`}
                  >
                    - Remove GST (Inclusive)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-2">
                  Currency Symbol
                </label>
                <div className="flex gap-3">
                  {['₹', '$', '€', '£'].map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setCurrency(curr)}
                      className={`w-10 h-10 rounded-xl text-sm font-mono font-bold border transition-all ${
                        currency === curr
                          ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-[#1f2532]'
                          : 'bg-white border-[#e6e9ef] text-[#9ca3af] hover:bg-gray-100 hover:text-[#1f2532]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Card 2: Amount & Tax Slab */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <Calculator size={14} color="var(--brand)" />
              2. Amount &amp; Standard GST Slab
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
                  {calcType === 'exclusive' ? 'Net Amount Before Tax' : 'Total Invoice Amount With Tax'} ({currency})
                </label>
                <input
                  type="number"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="glass-input text-xl font-mono w-full"
                  placeholder="1000"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-2">
                  Select GST Slab Rate (%)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {[3, 5, 12, 18, 28].map((slab) => (
                    <button
                      key={slab}
                      type="button"
                      onClick={() => setGstRate(slab)}
                      className={`py-2.5 rounded-xl text-sm font-mono font-semibold border transition-all ${
                        gstRate === slab
                          ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-[#1f2532]'
                          : 'bg-white border-[#e6e9ef] text-[#9ca3af] hover:bg-gray-100 hover:text-[#1f2532]'
                      }`}
                    >
                      {slab}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Results / Live Preview - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          {/* Primary Hero Banner */}
          <div className="form-card" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(18, 22, 36, 0.9))', borderColor: 'rgba(255, 107, 0, 0.3)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8c3a] block mb-1">
              TOTAL PAYABLE ({calcType.toUpperCase()})
            </span>
            <div className="text-4xl font-mono font-bold text-[#1f2532] mb-2">
              {currency}{grossPrice.toFixed(2)}
            </div>
            <div className="flex items-center justify-between text-xs text-[#9ca3af] font-mono">
              <span>Net: {currency}{netPrice.toFixed(2)}</span>
              <span>GST ({rate}%): +{currency}{gstAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Breakdown / Action Card */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <Percent size={14} color="var(--brand)" />
              Tax Breakdown
            </div>

            <div className="space-y-6 font-mono text-sm mb-5">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Net Taxable Value:</span>
                <span className="text-[#1f2532] font-semibold">{currency}{netPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>CGST (Central Tax — {(rate / 2).toFixed(1)}%):</span>
                <span className="text-[#ff8c3a]">+{currency}{cgst.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>SGST (State Tax — {(rate / 2).toFixed(1)}%):</span>
                <span className="text-[#ff8c3a]">+{currency}{sgst.toFixed(2)}</span>
              </div>

              <div className="h-px bg-gray-100 my-2" />

              <div className="flex justify-between text-[#9ca3af]">
                <span>Total GST ({rate}%):</span>
                <span className="text-[#ff6b00] font-bold">+{currency}{gstAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-lg font-bold text-[#1f2532] pt-2 border-t border-[#e6e9ef]">
                <span>Final Total:</span>
                <span className="text-emerald-400">{currency}{grossPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary w-full justify-center text-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Tax Summary' : 'Copy Summary Text'}</span>
              </button>

              <div className="flex gap-3">
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
                <NativeShareButton text={`Net Price: ${currency}${netPrice.toFixed(2)} | GST (${rate}%): ${currency}${gstAmount.toFixed(2)} | Total: ${currency}${grossPrice.toFixed(2)}`} />
              </div>
            </div>
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            💡 Pro tip: For intra-state sales within the same state, GST is split equally into CGST + SGST. For inter-state sales across borders, bill the full percentage as IGST on your invoice.
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 24, fontStyle: 'italic' }}>Nothing saved, nothing tracked. It's just math.</p>
        </div>
      </div>

      <AeoArticle>
        <h2>How to Calculate GST in India (2026 Rules)</h2>
        <p>The Goods and Services Tax (GST) is an indirect, multi-stage, destination-based tax levied on every value addition in India. To manually calculate GST on any product or service, you need to understand the difference between inclusive and exclusive pricing.</p>
        
        <h3>GST Exclusive Formula (Adding GST)</h3>
        <p>When a price is quoted as "excluding GST", the tax is added on top of the base value. The mathematical formula is:</p>
        <ul>
          <li><strong>GST Amount</strong> = Base Price × (GST Rate / 100)</li>
          <li><strong>Total Gross Price</strong> = Base Price + GST Amount</li>
        </ul>
        <p>For example, if you sell a software subscription for ₹1,000 and the GST rate is 18%, the GST amount is ₹1,000 × 0.18 = ₹180. The total payable amount by the customer is ₹1,180.</p>

        <h3>GST Inclusive Formula (Extracting GST)</h3>
        <p>When a price is quoted as "inclusive of GST", the tax is already baked into the final sticker price. To find the original base price and the tax component, use this formula:</p>
        <ul>
          <li><strong>Base Price (Net)</strong> = Total Price / [1 + (GST Rate / 100)]</li>
          <li><strong>GST Amount</strong> = Total Price - Base Price</li>
        </ul>
        <p>If a mobile phone is sold for ₹20,000 inclusive of 18% GST, the base price is ₹20,000 / 1.18 = ₹16,949.15. The GST amount collected by the government is ₹3,050.85.</p>

        <h3>CGST, SGST, and IGST Explained</h3>
        <p>Depending on where the buyer and seller are located, GST is split into different components:</p>
        <ul>
          <li><strong>Intra-State Sales (Same State):</strong> The GST is split 50/50 between the Central Government (CGST) and the State Government (SGST). An 18% tax becomes 9% CGST + 9% SGST.</li>
          <li><strong>Inter-State Sales (Different States):</strong> The entire tax is billed as Integrated GST (IGST). An 18% tax is simply billed as 18% IGST.</li>
        </ul>
      </AeoArticle>
    </div>
  );
}
