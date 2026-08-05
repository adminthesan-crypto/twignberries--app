import React from 'react';
import { Search, Command, LayoutGrid, DollarSign, Cpu, FileText, Link2, Sparkles, Layers, Image as ImageIcon, Globe } from 'lucide-react';
import NavbarSearch from './NavbarSearch';

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

export default function Navbar({ tools = [], onSelectTool, selectedCategory, onSelectCategory, toolsCount = 100, onOpenComparison }) {
  return (
    <header className="nav-panel no-print" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e6e9ef' }}>
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
              {toolsCount} Free Tools
            </span>
          </div>
        </div>

        {/* Center: Inline Search Dropdown */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <NavbarSearch 
            tools={tools} 
            toolsCount={toolsCount} 
            onSelectTool={onSelectTool} 
          />
        </div>

        {/* Right: Monday.com CTA Pills */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenComparison}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 14px',
              borderRadius: 99,
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#059669',
              fontSize: 12.5,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            title="See how Pahruli compares to Smallpdf & iLovePDF"
          >
            <span>🇮🇳</span>
            <span className="hidden sm:inline">vs. Smallpdf & iLovePDF</span>
          </button>
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
            title="Support Pahruli's free offline development via Stripe"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Support Pahruli</span>
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
