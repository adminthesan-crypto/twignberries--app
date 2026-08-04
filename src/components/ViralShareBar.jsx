import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export default function ViralShareBar({ toolName = 'Pahruli' }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://pahruli.com';
  const whatsappText = encodeURIComponent(
    `Found this free offline alternative to Smallpdf & iLovePDF (built in India 🇮🇳, zero cloud uploads, 100 free tools): ${shareUrl}`
  );
  const twitterText = encodeURIComponent(
    `No more ₹1,000/month Smallpdf paywalls or uploading private docs to iLovePDF servers. Using Pahruli — 100 free offline browser tools built in India 🇮🇳 ⚡\n\n${shareUrl}`
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="no-print my-6"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcefeb 100%)',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Share2 size={18} />
        </div>
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 2px 0' }}>
            Help keep Pahruli 100% Free & Offline
          </h4>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>
            Share with colleagues or WhatsApp groups so nobody pays ₹1,000/month for a PDF merger.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {/* WhatsApp Button */}
        <a
          href={`https://api.whatsapp.com/send?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#25d366',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 700,
            padding: '8px 14px',
            borderRadius: 99,
            textDecoration: 'none',
            transition: 'opacity 0.15s ease',
          }}
          title="Share on WhatsApp"
        >
          <span>WhatsApp</span>
        </a>

        {/* X / Twitter Button */}
        <a
          href={`https://twitter.com/intent/tweet?text=${twitterText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#0f172a',
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 700,
            padding: '8px 14px',
            borderRadius: 99,
            textDecoration: 'none',
          }}
          title="Share on X"
        >
          <span>X / Twitter</span>
        </a>

        {/* Copy Link Button */}
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#f1f5f9',
            color: '#334155',
            border: '1px solid #cbd5e1',
            fontSize: 12,
            fontWeight: 600,
            padding: '7px 14px',
            borderRadius: 99,
            cursor: 'pointer',
          }}
        >
          {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
          <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}
