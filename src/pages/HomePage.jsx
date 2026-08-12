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
        <div className="tool-card-icon" style={{ background: '#f8fafc', color: tool.color, border: '1px solid #f1f5f9' }}>
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
        <div className="tool-card-name" style={{ fontSize: 16 }}>
          {tool.marketingCopy || tool.name}
        </div>
        {tool.marketingCopy && (
          <div style={{ fontSize: 12, fontWeight: 700, color: tool.color, marginTop: 6, letterSpacing: '-0.01em' }}>
            {tool.name}
          </div>
        )}
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
        {/* ─── Premium Editorial Hero ─── */}
        <div className="pb-hero">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 24,
            color: '#a0aec0',
          }}>
            100 FREE TOOLS <span style={{ opacity: 0.5, margin: '0 8px' }}>·</span> 100% OFFLINE
          </div>

          <h1 className="pb-display" style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, letterSpacing: '-0.02em', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 84px)', lineHeight: 0.9, marginBottom: '24px' }}>
            100 tools.<br />
            Zero uploads.
          </h1>

          <p className="pb-subtitle" style={{ maxWidth: 540, margin: '0 auto 40px', fontSize: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            Powerful PDF, image, calculator and creator utilities that run entirely in your browser. 
            <strong style={{ color: '#fff', fontWeight: 600 }}> Private by default.</strong>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 48 }}>
            <a href="#tools-grid" className="pb-cta pb-cta-primary" style={{ textDecoration: 'none', background: '#fff', color: '#0f172a', fontWeight: 700, padding: '14px 28px', borderRadius: 99 }}>
              Explore the toolkit →
            </a>
            <button onClick={() => {
              const randomTool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
              window.location.href = `/tool/${randomTool.id}`;
            }} className="pb-cta pb-cta-secondary" style={{ textDecoration: 'none', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', color: '#fff', padding: '14px 28px', borderRadius: 99 }}>
              Surprise me
            </button>
          </div>

          {/* Trust Strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
              Made in India <span style={{ opacity: 0.3, margin: '0 12px' }}>·</span> Runs entirely on-device <span style={{ opacity: 0.3, margin: '0 12px' }}>·</span> No uploads
            </span>
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
