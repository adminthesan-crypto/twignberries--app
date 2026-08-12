import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CultureMemeWidget from '../components/CultureMemeWidget';
import TOOLS from '../data/toolsData';

function ToolCard({ tool, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="tool-card animate-fade-in"
      style={{ '--card-accent': tool.color }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div className="tool-card-icon" style={{ background: tool.bg, color: tool.color }}>
          {tool.icon}
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-4)'
          }}
        >
          {tool.category}
        </span>
      </div>
      <div style={{ marginTop: 4 }}>
        <div className="tool-card-name" style={{ fontSize: 16 }}>{tool.name}</div>
        <div className="tool-card-desc" style={{ marginTop: 6, fontSize: 13, color: '#676879' }}>{tool.description}</div>
      </div>
      <div
        className="tool-card-arrow"
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid #f0f2f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 700,
          color: hovered ? '#6161ff' : '#676879'
        }}
      >
        <span>Open utility</span>
        <span style={{ transform: hovered ? 'translateX(3px)' : 'none', transition: 'transform 0.15s ease' }}>→</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { selectedCategory, handleSelectCategory, handleSelectTool, onOpenComparison, onOpenDonation } = useOutletContext();
  const filtered = selectedCategory === 'All' ? TOOLS : TOOLS.filter(t => t.category === selectedCategory);

  return (
    <main style={{ flex: 1, padding: '32px 40px' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        {/* ─── PhantomBuster-Inspired Hero ─── */}
        <div className="pb-hero">
          {/* Floating gradient blobs (pure CSS via ::before) */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: 24,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#90e0ef',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}>
            <span className="w-2 h-2 rounded-full bg-[#00c875] animate-pulse"></span>
            {TOOLS.length} free offline tools — no signup needed
          </div>

          <h1 className="pb-display" style={{ letterSpacing: '-0.04em' }}>
            The offline toolkit<br />
            for <span className="highlight">builders</span> &<br />
            creators.
          </h1>

          <p className="pb-subtitle" style={{ maxWidth: 540, margin: '0 auto 32px' }}>
            Stop giving your private documents and data to bloated, ad-ridden cloud apps. 
            Lightning-fast PDF utilities, calculators, and image tools that run 100% locally in your browser.
          </p>

          {/* Trust Strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#90e0ef', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🇮🇳</span> Made in India
            </span>
            <span style={{ color: '#0077b6' }}>•</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#90e0ef', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>🔒</span> 100% Offline
            </span>
            <span style={{ color: '#0077b6' }}>•</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#90e0ef', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>⚡</span> Sub-second Speed
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
            <a href="#tools-grid" className="pb-cta pb-cta-primary" style={{ textDecoration: 'none' }}>
              Explore all {TOOLS.length} tools →
            </a>
            <button onClick={onOpenDonation} className="pb-cta pb-cta-secondary" style={{ textDecoration: 'none' }}>
              ⚡ Support Pahruli
            </button>
          </div>

          {/* Why 60M Indians are switching badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <button
              onClick={onOpenComparison}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                borderRadius: 99,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                backdropFilter: 'blur(10px)',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.15s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span>🇮🇳</span>
              <span>Why 60M Indians are switching from Smallpdf & iLovePDF →</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="pb-stats">
            <div className="pb-stat">
              <div className="pb-stat-value">{TOOLS.length}</div>
              <div className="pb-stat-label">Offline Tools</div>
            </div>
            <div className="pb-stat">
              <div className="pb-stat-value">0</div>
              <div className="pb-stat-label">Cloud Uploads</div>
            </div>
            <div className="pb-stat">
              <div className="pb-stat-value">$0</div>
              <div className="pb-stat-label">Forever</div>
            </div>
            <div className="pb-stat">
              <div className="pb-stat-value">6</div>
              <div className="pb-stat-label">Platform Integrations</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Trust Brand Strip — Polished Third-Party Platforms */}
          <div className="text-center" style={{ marginBottom: 64, marginTop: 12 }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: '#868894',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 20
            }}>
              Accurate calculations & formatting for
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
              gap: '24px 40px', alignItems: 'center', opacity: 0.6
            }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em' }}>Etsy</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                Shopify
              </span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em' }}>amazon</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em' }}>Stripe</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em', fontStyle: 'italic' }}>PayPal</span>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#1f2532', letterSpacing: '-0.02em' }}>TikTok Shop</span>
            </div>
          </div>

          {/* Culture Meme Widget */}
          <div style={{ marginBottom: 64, marginTop: 32, padding: '0 8px' }}>
            <CultureMemeWidget toolsCount={TOOLS.length} onOpenDonation={onOpenDonation} />
          </div>

          {/* Grid Section Heading */}
          <div id="tools-grid" className="pb-section-header">
            <div>
              <h2 className="pb-h2">
                {selectedCategory === 'All' ? 'The Offline Arsenal' : `${selectedCategory} tools`}
              </h2>
              <p className="pb-p">Everything runs in your browser. No data leaves your machine. Ever.</p>
            </div>
            {selectedCategory === 'All' && (
              <div className="pb-category-pills hidden md:flex" style={{ marginTop: 0 }}>
                <span style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>11 TOOLS</span>
                <span style={{ background: '#eceeff', color: '#6161ff', padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>35 TOOLS</span>
                <span style={{ background: 'rgba(236,72,153,0.12)', color: '#ec4899', padding: '5px 12px', borderRadius: 99, fontSize: 11, fontWeight: 700 }}>29 TOOLS</span>
              </div>
            )}
          </div>

          <div className="pb-grid" style={{ marginBottom: 96 }}>
            {filtered.map(tool => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => handleSelectTool(tool.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
