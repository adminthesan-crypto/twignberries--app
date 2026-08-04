import React, { useState } from 'react';
import { Sparkles, ExternalLink, Heart, ShieldCheck, X } from 'lucide-react';

export default function AdUnit({ variant = 'banner', placement = 'tool-footer' }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  // Banner variant (horizontal banner below tools or in grid)
  if (variant === 'banner') {
    return (
      <div
        className="no-print my-6 transition-all duration-300 hover:shadow-md"
        style={{
          background: 'linear-gradient(135deg, #f8f9fe 0%, #f1f4ff 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: 16,
          padding: '16px 20px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          boxShadow: '0 2px 10px rgba(97, 97, 255, 0.04)',
        }}
      >
        {/* Decorative background glow */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 120,
            height: 120,
            background: 'radial-gradient(circle, rgba(97,97,255,0.12) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Left: Ad Label + Sponsor Copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 260 }}>
          {/* Ad badge */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
              color: '#475569',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              flexShrink: 0,
            }}
          >
            <span>AD</span>
            <span style={{ color: '#94a3b8' }}>•</span>
            <span style={{ color: '#059669' }}>Verified</span>
          </div>

          {/* Ad Content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                Hostinger India — Cloud & NVMe Hosting for Developers
              </span>
              <span
                style={{
                  fontSize: 11,
                  background: 'rgba(5, 150, 105, 0.1)',
                  color: '#059669',
                  padding: '1px 6px',
                  borderRadius: 99,
                  fontWeight: 600,
                }}
              >
                ₹149/mo
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0 0', lineHeight: 1.4 }}>
              Deploy full-stack web apps, Node.js, and databases with 99.9% uptime & 24/7 Indian support.
            </p>
          </div>
        </div>

        {/* Right: CTA Button + Sponsor link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <a
            href="https://www.hostinger.in/"
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'linear-gradient(135deg, #6161ff 0%, #4f46e5 100%)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 99,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(97,97,255,0.25)',
              transition: 'transform 0.15s ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <span>Explore Offer</span>
            <ExternalLink size={13} />
          </a>

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            title="Dismiss ad"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* AdSense Placeholder Note for Developer */}
        {/*
          TO REPLACE WITH GOOGLE ADSENSE:
          Replace the JSX above with:
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXX"
               data-ad-slot="YYYYYYYYYY"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        */}
      </div>
    );
  }

  // Card variant (for grid or sidebar placement)
  return (
    <div
      className="no-print my-4"
      style={{
        background: '#ffffff',
        border: '1px dashed #cbd5e1',
        borderRadius: 16,
        padding: '16px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', background: '#f1f5f9', padding: '2px 8px', borderRadius: 4 }}>
          ADVERTISEMENT
        </span>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', margin: '0 0 4px 0' }}>
        Support 100% Free, Offline Utilities
      </p>
      <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 12px 0' }}>
        Pahruli never locks you behind a $12/month paywall. Support our Indian engineering team.
      </p>
      <a
        href="https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: '#10b981',
          color: '#ffffff',
          fontSize: 12,
          fontWeight: 700,
          padding: '8px 16px',
          borderRadius: 99,
          textDecoration: 'none',
        }}
      >
        <Heart size={13} />
        <span>Support Pahruli on Stripe</span>
      </a>
    </div>
  );
}
