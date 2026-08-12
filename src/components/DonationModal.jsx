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
    const link = currentPricing.link;
    try {
      // First try chrome.tabs API if running in an extension context
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: link });
      } else {
        // Fallback to foolproof anchor click
        const a = document.createElement('a');
        a.href = link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (e) {
      window.open(link, '_blank');
    }
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: 'rgba(31, 37, 50, 0.6)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div 
        style={{ backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 24px 48px rgba(0,0,0,0.2)', width: '100%', maxWidth: '540px', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '24px 32px', backgroundColor: '#f8f6ff', borderBottom: '1px solid #e6e9ef', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2d9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
              💜
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em', margin: 0 }}>Support Pahruli</h3>
              <p style={{ fontSize: '14px', fontWeight: 500, color: '#676879', margin: '4px 0 0 0' }}>100% free. No ads. Runs offline.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', backgroundColor: 'transparent', border: 'none', color: '#676879', cursor: 'pointer', fontSize: '18px' }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          <p style={{ fontSize: '15px', color: '#4d5156', marginBottom: '32px', lineHeight: 1.6, marginTop: 0 }}>
            I don't want your email. I don't want your data. I just want to build the fastest offline tools on the internet.
            If Pahruli saved you from a bloated, ad-ridden cloud converter today, consider buying me a chai to fuel the development.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderRadius: '16px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                    border: isSelected ? '2px solid #6161ff' : '2px solid #e6e9ef',
                    backgroundColor: isSelected ? '#f8f6ff' : '#ffffff',
                    boxShadow: isSelected ? '0 4px 14px rgba(97,97,255,0.12)' : 'none',
                    transform: isSelected ? 'scale(1.01)' : 'scale(1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: isSelected ? '2.5px solid #6161ff' : '2.5px solid #b4b7c5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#6161ff' }} />}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '15.5px', color: isSelected ? '#1f2532' : '#4d5156' }}>
                      {tier.desc}
                    </span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '20px', color: isSelected ? '#6161ff' : '#1f2532' }}>
                    {currentPricing.symbol}{tier.amount}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleDonate}
            style={{
              width: '100%', padding: '18px 24px', borderRadius: '16px', fontWeight: 800, fontSize: '16.5px', color: '#ffffff', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #6161ff, #00b4d8)',
              boxShadow: '0 8px 24px rgba(97,97,255,0.4)',
              transition: 'all 0.2s'
            }}
          >
            Support {currentPricing.symbol}{currentPricing[selectedTier]} via {currentPricing.paymentMethod}
          </button>
          
          <p style={{ textAlign: 'center', fontSize: '13px', color: '#868894', marginTop: '20px', fontWeight: 600, marginBottom: 0 }}>
            Secure payments • Cancel anytime • 100% goes to development
          </p>
        </div>
      </div>
    </div>
  );
}
