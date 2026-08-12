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
    INR: { symbol: '₹', small: 49, standard: 99, high: 249, smallDesc: 'Buy me a cutting chai ☕', standardDesc: 'Keep Pahruli ad-free 💜', highDesc: 'Sponsor a new tool 🔥', paymentMethod: 'UPI / Cards', link: 'https://rzp.io/l/pahruli-inr' },
    IDR: { symbol: 'Rp', small: '10,000', standard: '25,000', high: '50,000', smallDesc: 'Beli kopi ☕', standardDesc: 'Tanpa iklan 💜', highDesc: 'Dukung fitur baru 🔥', paymentMethod: 'QRIS / GoPay', link: 'https://buy.stripe.com/pahruli-idr' },
    BRL: { symbol: 'R$', small: 5, standard: 12, high: 30, smallDesc: 'Pague um café ☕', standardDesc: 'Mantenha sem anúncios 💜', highDesc: 'Patrocine uma nova ferramenta 🔥', paymentMethod: 'Pix / Cartão', link: 'https://buy.stripe.com/pahruli-brl' },
    PHP: { symbol: '₱', small: 50, standard: 120, high: 250, smallDesc: 'Buy me coffee ☕', standardDesc: 'Keep it ad-free 💜', highDesc: 'Sponsor a new tool 🔥', paymentMethod: 'GCash / Maya', link: 'https://buy.stripe.com/pahruli-php' },
    USD: { symbol: '$', small: 1, standard: 3, high: 5, smallDesc: 'Buy me a coffee ☕', standardDesc: 'Keep Pahruli ad-free 💜', highDesc: 'Sponsor a new tool 🔥', paymentMethod: 'Card / PayPal', link: 'https://buy.stripe.com/pahruli-usd' }
  };

  const currentPricing = pricing[currency];

  const tiers = [
    { id: 'small', amount: currentPricing.small, desc: currentPricing.smallDesc },
    { id: 'standard', amount: currentPricing.standard, desc: currentPricing.standardDesc },
    { id: 'high', amount: currentPricing.high, desc: currentPricing.highDesc }
  ];

  const handleDonate = () => {
    // Redirect to the payment gateway in a new tab
    window.open(currentPricing.link, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1f2532]/60 backdrop-blur-md transition-opacity duration-300" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.2)] w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 bg-[#f8f6ff] border-b border-[#e6e9ef] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-[#e2d9ff] flex items-center justify-center">
              <span className="text-2xl">💜</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#1f2532] tracking-tight">Support Pahruli</h3>
              <p className="text-sm font-medium text-[#676879] mt-1">100% free. No ads. Runs offline.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e2d9ff]/50 text-[#676879] transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-[15px] text-[#4d5156] mb-8 leading-relaxed">
            I built Pahruli because I was tired of uploading my private documents to cloud converters just to merge PDFs or compress images. 
            If these offline tools saved you time today, consider supporting the development!
          </p>

          <div className="space-y-4 mb-8">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                  selectedTier === tier.id 
                    ? 'border-[#6161ff] bg-[#f8f6ff] shadow-[0_4px_14px_rgba(97,97,255,0.12)] scale-[1.01]' 
                    : 'border-[#e6e9ef] bg-white hover:border-[#dcd1ff]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center ${
                    selectedTier === tier.id ? 'border-[#6161ff]' : 'border-[#b4b7c5]'
                  }`}>
                    {selectedTier === tier.id && <div className="w-3 h-3 rounded-full bg-[#6161ff]" />}
                  </div>
                  <span className={`font-semibold text-[15px] ${selectedTier === tier.id ? 'text-[#1f2532]' : 'text-[#4d5156]'}`}>
                    {tier.desc}
                  </span>
                </div>
                <span className={`font-bold text-xl ${selectedTier === tier.id ? 'text-[#6161ff]' : 'text-[#1f2532]'}`}>
                  {currentPricing.symbol}{tier.amount}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleDonate}
            className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-white shadow-[0_8px_24px_rgba(97,97,255,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(97,97,255,0.5)] transition-all"
            style={{ background: 'linear-gradient(135deg, #6161ff, #00b4d8)' }}
          >
            Support {currentPricing.symbol}{currentPricing[selectedTier]} via {currentPricing.paymentMethod}
          </button>
          
          <p className="text-center text-[13px] text-[#868894] mt-5 font-semibold">
            Secure payments • Cancel anytime • 100% goes to development
          </p>
        </div>
      </div>
    </div>
  );
}
