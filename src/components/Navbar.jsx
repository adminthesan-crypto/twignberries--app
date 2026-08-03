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
        {/* Left: Monday-style Logo & Status Dots */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => onSelectCategory('All')}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 12,
              background: '#6161ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(97,97,255,0.3)',
              position: 'relative'
            }}
            className="flex items-center justify-center"
          >
            {/* Monday.com iconic 3-bar / dots motif */}
            <div className="flex items-end gap-[3px] h-[18px]">
              <div style={{ width: 4, height: 10, background: '#ff3d8b', borderRadius: 99 }} />
              <div style={{ width: 4, height: 16, background: '#00c875', borderRadius: 99 }} />
              <div style={{ width: 4, height: 13, background: '#fdab3d', borderRadius: 99 }} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22, color: '#1f2532', letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                pahruli<span style={{ color: '#6161ff', fontStyle: 'normal', fontFamily: 'var(--font)', fontSize: 16, fontWeight: 700 }}>.com</span>
              </span>
              <span className="badge badge-success" style={{ fontSize: 10, padding: '2px 8px' }}>
                Free
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: '#676879', fontWeight: 500, lineHeight: 1, marginTop: 1 }}>
              60 offline tools. No cloud uploads. No signups.
            </div>
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
            <span style={{ fontSize: 13.5, color: '#676879', fontWeight: 500 }}>Search 30 utilities...</span>
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
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              borderRadius: 99,
              background: '#fff3cd',
              border: '1px solid #ffeeba',
              color: '#856404',
              fontSize: 12.5,
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              transition: 'all 0.15s ease'
            }}
            title="Support free offline utility development"
          >
            <span>☕</span>
            <span className="hidden sm:inline">Buy me a coffee</span>
          </a>
          <button
            onClick={() => onSelectCategory('All')}
            className="btn-secondary"
            style={{ fontSize: 13, padding: '8px 16px' }}
          >
            All tools
          </button>
          <a
            href="#tools"
            className="btn-primary"
            style={{
              fontSize: 13, padding: '8px 18px',
              background: 'linear-gradient(90deg, #6161ff, #7f56d9)',
              textDecoration: 'none'
            }}
          >
            Get Started →
          </a>
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
