import React, { useState } from 'react';
import { CreditCard, DollarSign, ShieldCheck, AlertCircle, ArrowRightLeft } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function StripePaypalTool() {
  const [amount, setAmount] = useState(100);
  const [txnType, setTxnType] = useState('domestic'); // domestic, international, micropay

  // Stripe rates: Domestic (2.9% + $0.30), Intl (3.9% + $0.30)
  // PayPal rates: Domestic (3.49% + $0.49), Intl (4.99% + $0.49), Micropay (5.0% + $0.05)

  const calcStripe = (val, type) => {
    let rate = 0.029;
    let fixed = 0.30;
    if (type === 'international') {
      rate = 0.039;
      fixed = 0.30;
    } else if (type === 'micropay') {
      rate = 0.05; // Stripe micro
      fixed = 0.10;
    }
    const fee = val * rate + fixed;
    const net = val - fee;
    return { fee: fee.toFixed(2), net: net.toFixed(2), ratePct: (rate * 100).toFixed(2), fixed };
  };

  const calcPayPal = (val, type) => {
    let rate = 0.0349;
    let fixed = 0.49;
    if (type === 'international') {
      rate = 0.0499;
      fixed = 0.49;
    } else if (type === 'micropay') {
      rate = 0.05;
      fixed = 0.05;
    }
    const fee = val * rate + fixed;
    const net = val - fee;
    return { fee: fee.toFixed(2), net: net.toFixed(2), ratePct: (rate * 100).toFixed(2), fixed };
  };

  const s = calcStripe(Number(amount) || 0, txnType);
  const p = calcPayPal(Number(amount) || 0, txnType);

  const diffFee = (Number(p.fee) - Number(s.fee)).toFixed(2);
  const winner = Number(s.fee) < Number(p.fee) ? 'Stripe' : Number(p.fee) < Number(s.fee) ? 'PayPal' : 'Tie';

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-6">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Stripe vs PayPal Fee Comparator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Compare processing fees, net payouts, and break-even differences side by side for domestic, international, and micropayment transactions."
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div style={SL}>Transaction Amount ($ USD)</div>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-3.5 text-[#868894]" size={18} />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, e.target.value))}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#d0d4e4] font-mono text-lg font-bold text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
            />
          </div>
        </div>

        <div>
          <div style={SL}>Payment Category</div>
          <select
            value={txnType}
            onChange={(e) => setTxnType(e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#d0d4e4] text-sm font-bold text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          >
            <option value="domestic">Domestic Standard Card</option>
            <option value="international">International / Currency Conversion</option>
            <option value="micropay">Micropayments (&lt; $10.00)</option>
          </select>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stripe Card */}
        <div className={`p-6 rounded-2xl border-2 transition ${winner === 'Stripe' ? 'border-green-500 bg-green-50/20' : 'border-[#e6e9ef] bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-[#1f2532]">Stripe Payments</span>
            {winner === 'Stripe' && <span className="badge badge-success">Cheaper by ${Math.abs(diffFee)}</span>}
          </div>
          <div className="space-y-6">
            <div className="flex justify-between text-sm">
              <span className="text-[#676879]">Rate Structure</span>
              <span className="font-mono font-bold text-[#1f2532]">{s.ratePct}% + ${s.fixed.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#676879]">Total Fee Cut</span>
              <span className="font-mono font-bold text-red-600">-${s.fee}</span>
            </div>
            <div className="pt-3 border-t border-[#f0f2f5] flex justify-between items-baseline">
              <span className="font-bold text-[#1f2532]">Net Take-Home</span>
              <span className="font-mono text-2xl font-bold text-green-700">${s.net}</span>
            </div>
          </div>
        </div>

        {/* PayPal Card */}
        <div className={`p-6 rounded-2xl border-2 transition ${winner === 'PayPal' ? 'border-green-500 bg-green-50/20' : 'border-[#e6e9ef] bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-[#1f2532]">PayPal Commerce</span>
            {winner === 'PayPal' && <span className="badge badge-success">Cheaper by ${Math.abs(diffFee)}</span>}
          </div>
          <div className="space-y-6">
            <div className="flex justify-between text-sm">
              <span className="text-[#676879]">Rate Structure</span>
              <span className="font-mono font-bold text-[#1f2532]">{p.ratePct}% + ${p.fixed.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#676879]">Total Fee Cut</span>
              <span className="font-mono font-bold text-red-600">-${p.fee}</span>
            </div>
            <div className="pt-3 border-t border-[#f0f2f5] flex justify-between items-baseline">
              <span className="font-bold text-[#1f2532]">Net Take-Home</span>
              <span className="font-mono text-2xl font-bold text-green-700">${p.net}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <NativeShareButton text={`Stripe vs PayPal Comparison for $${amount}\nStripe Fee: $${s.fee} (Net: $${s.net})\nPayPal Fee: $${p.fee} (Net: $${p.net})\nWinner: ${winner}`} />
      </div>
    </div>
  );
}
