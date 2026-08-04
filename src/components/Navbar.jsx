import React from 'react';
import { Search, Command, LayoutGrid, DollarSign, Cpu, FileText, Link2, Sparkles, Layers, Image as ImageIcon, Globe } from 'lucide-react';

const CATEGORIES = [
  { id: 'All',           label: 'All Tools',      icon: LayoutGrid },
  { id: 'PDF Tools',     label: 'PDF Suite',      icon: Layers },
  { id: 'E-Commerce',    label: 'E-Commerce',     icon: DollarSign },
  { id: 'AI & Dev',      label: 'AI & Dev',       icon: Cpu },
  { id: 'Image & Media', label: 'Image & Media',  icon: ImageIcon },
  { id: 'SEO & Web',     label: 'SEO & Web',      icon: Globe },
  { id: 'Freelance',     label: 'Freelance',      icon: FileText },
  { id: 'Marketing',     label: 'Marketing',      icon: Link2 },
];

export default function Navbar({ onOpenSearch, selectedCategory, onSelectCategory }) {
  return (
    <header className="nav-panel sticky top-0 z-40 no-print" style={{ background: '#ffffff', borderBottom: '1px solid #e6e9ef' }}>
      {/* Top row: Monday.com style header with logo, search, and action pills */}
      <div className="flex items-center justify-between px-6 h-16 max-w-7xl mx-auto">
        {/* Left: Clean Brand Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSelectCategory('All', { scrollToTop: true })}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: '#6161ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(97,97,255,0.25)',
            }}
          >
            <div className="flex items-end gap-[3px] h-[18px]">
              <div style={{ width: 4, height: 10, background: '#ff3d8b', borderRadius: 99 }} />
              <div style={{ width: 4, height: 16, background: '#00c875', borderRadius: 99 }} />
              <div style={{ width: 4, height: 13, background: '#fdab3d', borderRadius: 99 }} />
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: '#1f2532', letterSpacing: '-0.03em' }}>
              pahruli<span style={{ color: '#6161ff', fontSize: 17, fontWeight: 700 }}>.com</span>
            </span>
            <span style={{
              fontSize: 11, fontWeight: 700,
              padding: '3px 9px', borderRadius: 99,
              background: '#eceeff', color: '#6161ff',
              letterSpacing: '0.02em'
            }}>
              100 Free Tools
            </span>
          </div>
        </div>

        {/* Center: Search bar (Cmd+K) */}
        <button
          onClick={onOpenSearch}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 24, padding: '8px 16px',
            borderRadius: 99, cursor: 'pointer',
            background: '#f6f8fa',
            border: '1.5px solid #e6e9ef',
            transition: 'all 0.15s ease',
            minWidth: 260,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#6161ff'; e.currentTarget.style.background = '#ffffff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e6e9ef'; e.currentTarget.style.background = '#f6f8fa'; }}
          title="Search utilities (⌘K)"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Search size={15} color="#6161ff" />
            <span style={{ fontSize: 13.5, color: '#676879', fontWeight: 500 }}>Search 100 utilities...</span>
          </div>
          <kbd style={{
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '2px 8px', borderRadius: 99,
            background: '#ffffff', border: '1px solid #d0d4e4',
            fontSize: 11, color: '#676879', fontFamily: 'monospace', fontWeight: 700
          }}>
            <Command size={11} /> K
          </kbd>
        </button>

        {/* Right: Monday.com CTA Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://donate.stripe.com/test_bJeaEZayMeCWgfD68RdfG00"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 15px',
              borderRadius: 99,
              background: '#f4efff',
              border: '1px solid #dcd1ff',
              color: '#5521e8',
              fontSize: 12.5,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(97,97,255,0.06)',
              transition: 'all 0.15s ease'
            }}
            title="Back Pahruli's free offline development via Stripe"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Back Pahruli</span>
          </a>
          <button
            onClick={() => onSelectCategory('All')}
            className="btn-secondary"
            style={{ fontSize: 13, padding: '8px 16px' }}
          >
            All tools
          </button>
          <button
            onClick={() => {
              onSelectCategory('All');
              const el = document.getElementById('tools-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
            style={{
              fontSize: 13, padding: '8px 18px',
              background: 'linear-gradient(90deg, #6161ff, #7f56d9)',
              border: 'none', cursor: 'pointer',
              color: 'white', fontWeight: 600,
              borderRadius: 99,
            }}
          >
            Get Started →
          </button>
        </div>
      </div>

      {/* Bottom row: Monday.com rounded-full category pills */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 24px 12px',
          borderTop: '1px solid #f0f2f5',
          overflowX: 'auto',
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`cat-pill ${isActive ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
