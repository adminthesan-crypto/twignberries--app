import React, { useState, useEffect } from 'react';

export default function DonationModal({ isOpen, onClose }) {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [currency, setCurrency] = useState('INR');
  const [payMethod, setPayMethod] = useState('upi'); // 'upi' or 'card'
  
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz.includes('Jakarta') || tz.includes('Makassar') || tz.includes('Jayapura')) {
      setCurrency('IDR'); setPayMethod('card');
    } else if (tz.includes('Sao_Paulo') || tz.includes('Brazil')) {
      setCurrency('BRL'); setPayMethod('card');
    } else if (tz.includes('Manila')) {
      setCurrency('PHP'); setPayMethod('card');
    } else if (tz.includes('America/New_York') || tz.includes('America/Los_Angeles') || tz.includes('Europe/London')) {
      setCurrency('USD'); setPayMethod('card');
    } else {
      setCurrency('INR'); setPayMethod('upi');
    }
  }, []);

  if (!isOpen) return null;

  const pricing = {
    INR: {
      symbol: '₹', small: 49, standard: 99, high: 249,
      smallDesc: 'Buy me a cutting chai ☕', standardDesc: 'Keep Pahruli ad-free 💜', highDesc: 'Sponsor a new tool 🔥',
      upiLink: 'https://razorpay.me/@pahruli',
      cardLink: 'https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00',
    },
    IDR: {
      symbol: 'Rp', small: '10,000', standard: '25,000', high: '50,000',
      smallDesc: 'Beli kopi ☕', standardDesc: 'Tanpa iklan 💜', highDesc: 'Dukung fitur baru 🔥',
      upiLink: null,
      cardLink: 'https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00',
    },
    BRL: {
      symbol: 'R$', small: 5, standard: 12, high: 30,
      smallDesc: 'Pague um café ☕', standardDesc: 'Mantenha sem anúncios 💜', highDesc: 'Patrocine uma nova ferramenta 🔥',
      upiLink: null,
      cardLink: 'https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00',
    },
    PHP: {
      symbol: '₱', small: 50, standard: 120, high: 250,
      smallDesc: 'Buy me coffee ☕', standardDesc: 'Keep it ad-free 💜', highDesc: 'Sponsor a new tool 🔥',
      upiLink: null,
      cardLink: 'https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00',
    },
    USD: {
      symbol: '$', small: 1, standard: 3, high: 5,
      smallDesc: 'Buy me a coffee ☕', standardDesc: 'Keep Pahruli ad-free 💜', highDesc: 'Sponsor a new tool 🔥',
      upiLink: null,
      cardLink: 'https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00',
    }
  };

  const cp = pricing[currency];
  const tiers = [
    { id: 'small', amount: cp.small, desc: cp.smallDesc },
    { id: 'standard', amount: cp.standard, desc: cp.standardDesc },
    { id: 'high', amount: cp.high, desc: cp.highDesc }
  ];

  const openLink = (url) => {
    try {
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url });
      } else {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (e) {
      window.open(url, '_blank');
    }
    onClose();
  };

  const handleDonate = () => {
    const link = payMethod === 'upi' ? cp.upiLink : cp.cardLink;
    if (link) openLink(link);
  };

  const showUpiOption = currency === 'INR';

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
          <p style={{ fontSize: '15px', color: '#4d5156', marginBottom: '28px', lineHeight: 1.6, marginTop: 0 }}>
            I don't want your email. I don't want your data. I just want to build the fastest offline tools on the internet.
            If Pahruli saved you from a bloated, ad-ridden cloud converter today, consider buying me a chai to fuel the development.
          </p>

          {/* Tier Selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderRadius: '14px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s',
                    border: isSelected ? '2px solid #6161ff' : '2px solid #e6e9ef',
                    backgroundColor: isSelected ? '#f8f6ff' : '#ffffff',
                    boxShadow: isSelected ? '0 4px 14px rgba(97,97,255,0.12)' : 'none',
                    transform: isSelected ? 'scale(1.01)' : 'scale(1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: isSelected ? '2.5px solid #6161ff' : '2.5px solid #b4b7c5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6161ff' }} />}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '15px', color: isSelected ? '#1f2532' : '#4d5156' }}>
                      {tier.desc}
                    </span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '19px', color: isSelected ? '#6161ff' : '#1f2532' }}>
                    {cp.symbol}{tier.amount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Payment Method Toggle (only show for Indian users) */}
          {showUpiOption && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', backgroundColor: '#f6f8fa', borderRadius: '12px', padding: '4px' }}>
              <button
                onClick={() => setPayMethod('upi')}
                style={{
                  flex: 1, padding: '10px 16px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', border: 'none',
                  backgroundColor: payMethod === 'upi' ? '#ffffff' : 'transparent',
                  color: payMethod === 'upi' ? '#1f2532' : '#676879',
                  boxShadow: payMethod === 'upi' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                ⚡ UPI / NetBanking
              </button>
              <button
                onClick={() => setPayMethod('card')}
                style={{
                  flex: 1, padding: '10px 16px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', border: 'none',
                  backgroundColor: payMethod === 'card' ? '#ffffff' : 'transparent',
                  color: payMethod === 'card' ? '#1f2532' : '#676879',
                  boxShadow: payMethod === 'card' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                💳 Card / Stripe
              </button>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleDonate}
            style={{
              width: '100%', padding: '18px 24px', borderRadius: '16px', fontWeight: 800, fontSize: '16px', color: '#ffffff', border: 'none', cursor: 'pointer',
              background: payMethod === 'upi'
                ? 'linear-gradient(135deg, #6161ff, #00b4d8)'
                : 'linear-gradient(135deg, #635BFF, #7A73FF)',
              boxShadow: '0 8px 24px rgba(97,97,255,0.35)',
              transition: 'all 0.2s'
            }}
          >
            {payMethod === 'upi'
              ? `Support ${cp.symbol}${cp[selectedTier]} via UPI`
              : `Support ${cp.symbol}${cp[selectedTier]} via Card`
            }
          </button>

          {/* Trust signals */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: '#868894', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              🔒 Secure payments
            </span>
            <span style={{ fontSize: '12px', color: '#868894', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              {payMethod === 'upi' ? '⚡ Razorpay' : '💳 Stripe'}
            </span>
            <span style={{ fontSize: '12px', color: '#868894', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              💯 100% to development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
