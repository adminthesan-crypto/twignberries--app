import React, { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';

/**
 * ShareDropdown — replaces the broken NativeShareButton.
 * Always shows a small "Share" pill. On click, opens a
 * dropdown with WhatsApp, X/Twitter, and Copy Link options.
 * Works on desktop AND mobile. No native share sheet needed.
 */
export default function NativeShareButton({
  text,
  fileUrl,
  fileName,
  buttonText = 'Share',
  className,
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://pahruli.com';

  const shareText = text
    ? text.substring(0, 200) + (text.length > 200 ? '…' : '')
    : `Check out this free tool on Pahruli: ${shareUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    shareText + '\n\n' + shareUrl
  )}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(shareUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 1800);
  };

  // The button style — small pill, fits anywhere inline
  const pillStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '6px 12px',
    borderRadius: 99,
    background: '#f1f5f9',
    border: '1px solid #cbd5e1',
    color: '#334155',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    position: 'relative',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={pillStyle}
        title="Share this result"
      >
        <Share2 size={13} />
        {buttonText}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 998,
            }}
          />
          {/* Dropdown */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              zIndex: 999,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 14,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
              padding: '8px',
              minWidth: 190,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '4px 8px 8px',
                borderBottom: '1px solid #f1f5f9',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Share via
              </span>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 2 }}
              >
                <X size={14} />
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 9,
                textDecoration: 'none',
                color: '#1f2532',
                fontSize: 13,
                fontWeight: 600,
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f0fdf4')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>📱</span>
              WhatsApp
            </a>

            {/* X / Twitter */}
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 9,
                textDecoration: 'none',
                color: '#1f2532',
                fontSize: 13,
                fontWeight: 600,
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>𝕏</span>
              X / Twitter
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 9,
                background: 'transparent',
                border: 'none',
                color: '#1f2532',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {copied ? (
                <Check size={16} color="#10b981" />
              ) : (
                <Copy size={16} color="#64748b" />
              )}
              {copied ? 'Link Copied!' : 'Copy Link'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
