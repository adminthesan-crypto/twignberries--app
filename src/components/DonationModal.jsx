import React, { useState, useEffect } from 'react';

export default function DonationModal({ isOpen, onClose }) {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [currency, setCurrency] = useState('INR'); // Default to INR based on traffic
  
  useEffect(() => {
    // Simple mock geolocation based on timezone
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Jakarta') || tz.includes('Makassar') || tz.includes('Jayapura')) {
      setCurrency('IDR');
    } else if (tz.includes('Sao_Paulo') || tz.includes('Brazil')) {
      setCurrency('BRL');
    } else if (tz.includes('Manila')) {
      setCurrency('PHP');
    } else if (tz.includes('America/New_York') || tz.includes('America/Los_Angeles') || tz.includes('Europe/London')) {
      setCurrency('USD');
    } else {
      setCurrency('INR'); // Default for India/Others
    }
  }, []);

  if (!isOpen) return null;

  const pricing = {
    INR: { symbol: '₹', small: 49, standard: 99, high: 249, smallDesc: 'Buy me a cutting chai ☕', standardDesc: 'Keep Pahruli ad-free 💜', highDesc: 'Sponsor a new tool 🔥', paymentMethod: 'UPI / Cards' },
    IDR: { symbol: 'Rp', small: '10,000', standard: '25,000', high: '50,000', smallDesc: 'Beli kopi ☕', standardDesc: 'Tanpa iklan 💜', highDesc: 'Dukung fitur baru 🔥', paymentMethod: 'QRIS / GoPay' },
    BRL: { symbol: 'R$', small: 5, standard: 12, high: 30, smallDesc: 'Pague um café ☕', standardDesc: 'Mantenha sem anúncios 💜', highDesc: 'Patrocine uma nova ferramenta 🔥', paymentMethod: 'Pix / Cartão' },
    PHP: { symbol: '₱', small: 50, standard: 120, high: 250, smallDesc: 'Buy me coffee ☕', standardDesc: 'Keep it ad-free 💜', highDesc: 'Sponsor a new tool 🔥', paymentMethod: 'GCash / Maya' },
    USD: { symbol: '$', small: 1, standard: 3, high: 5, smallDesc: 'Buy me a coffee ☕', standardDesc: 'Keep Pahruli ad-free 💜', highDesc: 'Sponsor a new tool 🔥', paymentMethod: 'Card / PayPal' }
  };

  const currentPricing = pricing[currency];

  const tiers = [
    { id: 'small', amount: currentPricing.small, desc: currentPricing.smallDesc },
    { id: 'standard', amount: currentPricing.standard, desc: currentPricing.standardDesc },
    { id: 'high', amount: currentPricing.high, desc: currentPricing.highDesc }
  ];

  const handleDonate = () => {
    // In a real app, this would redirect to Razorpay/Stripe based on currency
    alert(`Redirecting to ${currentPricing.paymentMethod} gateway for ${currentPricing.symbol}${currentPricing[selectedTier]}...`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1f2532]/40 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#f8f6ff] border-b border-[#e6e9ef] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-[#e2d9ff] flex items-center justify-center">
              <span className="text-xl">💜</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1f2532] leading-tight">Support Pahruli</h3>
              <p className="text-xs text-[#676879] mt-0.5">100% free. No ads. Runs offline.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#e2d9ff]/50 text-[#676879] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-[#4d5156] mb-6 leading-relaxed">
            I built Pahruli because I was tired of uploading my private documents to cloud converters just to merge PDFs or compress images. 
            If these offline tools saved you time today, consider supporting the development!
          </p>

          <div className="space-y-3 mb-6">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedTier === tier.id 
                    ? 'border-[#6161ff] bg-[#f8f6ff] shadow-[0_4px_14px_rgba(97,97,255,0.1)]' 
                    : 'border-[#e6e9ef] bg-white hover:border-[#dcd1ff]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedTier === tier.id ? 'border-[#6161ff]' : 'border-[#b4b7c5]'
                  }`}>
                    {selectedTier === tier.id && <div className="w-2.5 h-2.5 rounded-full bg-[#6161ff]" />}
                  </div>
                  <span className={`font-semibold text-sm ${selectedTier === tier.id ? 'text-[#1f2532]' : 'text-[#4d5156]'}`}>
                    {tier.desc}
                  </span>
                </div>
                <span className={`font-bold text-lg ${selectedTier === tier.id ? 'text-[#6161ff]' : 'text-[#1f2532]'}`}>
                  {currentPricing.symbol}{tier.amount}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleDonate}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-[0_4px_14px_rgba(97,97,255,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(97,97,255,0.4)] transition-all"
            style={{ background: 'linear-gradient(135deg, #6161ff, #00b4d8)' }}
          >
            Support {currentPricing.symbol}{currentPricing[selectedTier]} via {currentPricing.paymentMethod}
          </button>
          
          <p className="text-center text-xs text-[#868894] mt-4 font-medium">
            Secure payments • Cancel anytime • 100% goes to development
          </p>
        </div>
      </div>
    </div>
  );
}
