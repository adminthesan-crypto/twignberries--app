import React, { useEffect, useRef } from 'react';

export default function AdUnit({ variant = 'banner', placement = 'tool-footer' }) {
  const adInitialized = useRef(false);

  useEffect(() => {
    // In React 18 Strict Mode, components mount, unmount, and mount again.
    // This ref ensures we only call adsbygoogle.push once per actual DOM node.
    if (adInitialized.current) return;
    
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
        adInitialized.current = true;
      }
    } catch (err) {
      console.warn('AdSense initialization error:', err);
    }
  }, []);

  // ==========================================
  // ACTION REQUIRED: Add your AdSense details here!
  // ==========================================
  const PUBLISHER_ID = 'ca-pub-4399618621076160';
  const AD_SLOT_ID = '2927650853';

  return (
    <div
      className="no-print my-6 transition-all duration-300"
      style={{
        background: variant === 'banner' ? 'linear-gradient(135deg, #f8f9fe 0%, #f1f4ff 100%)' : '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '16px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        // Prevent layout shift (CLS) while AdSense loads
        minHeight: variant === 'banner' ? '120px' : '280px', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
        <span style={{ 
          fontSize: 10, 
          fontWeight: 700, 
          color: '#94a3b8', 
          background: variant === 'banner' ? '#ffffff' : '#f1f5f9', 
          padding: '2px 8px', 
          borderRadius: 4, 
          letterSpacing: '0.5px' 
        }}>
          ADVERTISEMENT
        </span>
      </div>
      
      {/* Official Google AdSense Tag */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%', minHeight: variant === 'banner' ? '90px' : '250px' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={AD_SLOT_ID}
        data-ad-format={variant === 'banner' ? 'horizontal' : 'auto'}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
