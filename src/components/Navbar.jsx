import React, { useState } from 'react';
import { Search, Command, LayoutGrid, DollarSign, Cpu, FileText, Link2, Sparkles, Layers, Image as ImageIcon, Globe, Gift, X } from 'lucide-react';
import NavbarSearch from './NavbarSearch';
import AdUnit from './AdUnit';

const CATEGORIES = [
  { id: 'PDF Tools',     label: 'PDF Suite',      icon: Layers },
  { id: 'E-Commerce',    label: 'E-Commerce',     icon: DollarSign },
  { id: 'AI & Dev',      label: 'AI & Dev',       icon: Cpu },
  { id: 'Image & Media', label: 'Image & Media',  icon: ImageIcon },
  { id: 'SEO & Web',     label: 'SEO & Web',      icon: Globe },
  { id: 'Freelance',     label: 'Freelance',      icon: FileText },
  { id: 'Marketing',     label: 'Marketing',      icon: Link2 },
];

export default function Navbar({ tools = [], onSelectTool, selectedCategory, onSelectCategory, onOpenComparison, onOpenDonation }) {
  const [showSurpriseAd, setShowSurpriseAd] = useState(false);
  const BrandDot = () => <span style={{ color: 'var(--brand)' }}>.</span>;

  return (
    <header className="nav-panel no-print w-full" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e6e9ef' }}>
      {/* Top row: Monday.com style header with logo, search, and action pills */}
      <div className="flex items-center justify-between px-6 h-16 w-full" style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => onSelectCategory('All', { scrollToTop: true })}>
          {/* Premium Tech Logo Mark */}
          <span style={{
            fontFamily: '"Impact", "Arial Black", sans-serif',
            fontSize: 42,
            fontWeight: 900,
            color: '#0f172a',
            letterSpacing: '-0.04em', 
            lineHeight: 0.9,
            fontStyle: 'italic',
            textTransform: 'uppercase',
            WebkitTextStroke: '0.5px #0f172a',
            transform: 'skewX(-6deg)',
            display: 'inline-block'
          }}>
            PAHRULI<BrandDot />
          </span>
          <span style={{
            fontSize: 10, fontWeight: 700,
            padding: '2px 8px', borderRadius: 'var(--radius-full)',
            background: 'var(--bg-input)', color: 'var(--text-3)',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}>
            {tools.length} tools
          </span>
        </div>

        {/* Center: Inline Search Dropdown */}
        <div className="hidden md:flex items-center justify-center w-full max-w-md mx-8">
          <NavbarSearch 
            tools={tools} 
            toolsCount={tools.length} 
            onSelectTool={onSelectTool} 
          />
        </div>

        {/* Right: Monday.com CTA Pills */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 ml-auto">
          <button
            onClick={onOpenDonation}
            className="btn"
            style={{
              background: '#f4efff',
              color: '#5521e8',
            }}
            title="Support Pahruli's free offline development"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Support Pahruli</span>
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '8px 24px 12px',
          borderTop: '1px solid #f0f2f5',
          maxWidth: 1040, margin: '0 auto', width: '100%',
        }}
      >
        {CATEGORIES.map((cat, index) => {
          const isActive = selectedCategory === cat.id;
          return (
            <React.Fragment key={cat.id}>
              {index > 0 && <span style={{ color: '#e2e8f0' }}>·</span>}
              <button
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#0f172a' : '#64748b',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  padding: '4px 4px',
                  transition: 'color 0.15s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#0f172a'}
                onMouseOut={(e) => { if (!isActive) e.target.style.color = '#64748b'; }}
              >
                {cat.label}
              </button>
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Surprise Me Dropdown Curtain */}
      <div 
        style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#ffffff',
          borderBottom: showSurpriseAd ? '1px solid #e6e9ef' : 'none',
          boxShadow: showSurpriseAd ? '0 10px 25px rgba(0,0,0,0.1)' : 'none',
          overflow: 'hidden',
          maxHeight: showSurpriseAd ? '500px' : '0px',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: -1
        }}
      >
        <div className="max-w-7xl mx-auto p-6 relative">
          <button 
            onClick={() => setShowSurpriseAd(false)}
            className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1"
          >
            <X size={16} />
          </button>
          <div className="text-center mb-4">
            <h3 className="font-extrabold text-xl text-[#1f2532] flex items-center justify-center gap-2">
              <Sparkles className="text-[#ff3d8b]" /> A Special Surprise Just For You!
            </h3>
            <p className="text-gray-500 text-sm mt-1">Thanks for clicking! Check out this awesome offer:</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <AdUnit />
          </div>
        </div>
      </div>
    </header>
  );
}
