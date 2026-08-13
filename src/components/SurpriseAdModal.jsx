import React, { useEffect, useState } from 'react';
import AdUnit from './AdUnit';

export default function SurpriseAdModal({ isOpen, onClose, onContinue }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15,23,42,0.85)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, padding: '24px'
    }}>
      {/* Container */}
      <div 
        className="animate-fade-in"
        style={{
          width: '100%', maxWidth: '520px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 32px 20px',
          backgroundColor: '#f8f9fc',
          borderBottom: '1px solid #e6e9ef',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
        }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em', margin: 0 }}>
              Rolling the dice... 🎲
            </h3>
            <p style={{ fontSize: '14px', fontWeight: 500, color: '#676879', margin: '4px 0 0 0' }}>
              Fetching a random tool for you.
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{ 
              width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              borderRadius: '50%', backgroundColor: 'transparent', border: 'none', color: '#676879', cursor: 'pointer', fontSize: '18px' 
            }}
          >
            ✕
          </button>
        </div>

        {/* Content / Ad */}
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <AdUnit variant="banner" placement="surprise-interstitial" />
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 32px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e6e9ef',
          display: 'flex', justifyContent: 'center'
        }}>
          <button
            onClick={onContinue}
            disabled={countdown > 0}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: countdown > 0 ? '#e2e8f0' : '#1f2532',
              color: countdown > 0 ? '#94a3b8' : '#ffffff',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              cursor: countdown > 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {countdown > 0 ? `Wait ${countdown}s to continue...` : 'Continue to tool →'}
          </button>
        </div>
      </div>
    </div>
  );
}
