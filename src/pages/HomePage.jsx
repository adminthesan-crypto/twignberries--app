import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import CultureMemeWidget from '../components/CultureMemeWidget';
import TOOLS from '../data/toolsData';

function ToolCard({ tool, onClick }) {
  return (
    <div
      className="tool-card animate-fade-in"
      style={{ '--card-accent': tool.color }}
      onClick={onClick}
    >
      <div className="tool-card-icon" style={{ background: 'var(--bg-section)', color: tool.color, border: '1px solid var(--border)' }}>
        {tool.icon}
      </div>
      <div style={{ marginTop: 4 }}>
        <div className="tool-card-name">
          {tool.name}
        </div>
        <div className="tool-card-desc" style={{ marginTop: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {tool.description}
        </div>
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: tool.color, background: 'var(--brand-dim)', padding: '4px 10px', borderRadius: 'var(--radius-full)' }}>
          {tool.category}
        </span>
        <div className="tool-card-arrow">
          <span>Open</span>
          <span className="arrow-icon">→</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { BackdropTrigger } from '../contexts/BackdropContext';

export default function HomePage() {
  const { selectedCategory, handleSelectCategory, handleSelectTool, onOpenComparison, onOpenDonation } = useOutletContext();
  const filtered = selectedCategory === 'All' ? TOOLS : TOOLS.filter(t => t.category === selectedCategory);
  
  const [isGridVisible, setIsGridVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsGridVisible(entry.isIntersecting),
      { threshold: 0.01, rootMargin: '-100px 0px 0px 0px' }
    );

    // We observe the grid container which wraps the tools grid
    const el = document.getElementById('tools-grid-container');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ flex: 1, padding: '32px 40px' }}>
      {isGridVisible && <BackdropTrigger />}
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        {/* ─── Premium Editorial Hero ─── */}
        <div className="pb-hero">
          <h1 className="pb-display" style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400, letterSpacing: '-0.04em', fontStyle: 'italic', fontSize: 'clamp(48px, 8vw, 84px)', lineHeight: 0.95, marginBottom: '24px' }}>
            {TOOLS.length} tools.<br />
            Zero uploads.
          </h1>

          <p className="pb-subtitle" style={{ maxWidth: 540, margin: '0 auto 40px', fontSize: 18, color: '#e2e8f0', lineHeight: 1.6 }}>
            Powerful PDF, image, calculator and creator utilities that run entirely in your browser. 
            <strong style={{ color: '#fff', fontWeight: 600 }}> Private by default.</strong>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 48 }}>
            <a href="#tools-grid" className="btn btn-primary" style={{ background: '#ffffff', color: '#0f172a', padding: '14px 28px', borderRadius: 99 }}>
              Explore the toolkit →
            </a>
            <button onClick={() => {
              const randomTool = TOOLS[Math.floor(Math.random() * TOOLS.length)];
              handleSelectTool(randomTool.id);
            }} className="btn btn-ghost" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Surprise me 🎲
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

          {/* Grid Section Container */}
          <div id="tools-grid-container">
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
      </div>
    </main>
  );
}
