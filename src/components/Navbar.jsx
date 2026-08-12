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
  { id: 'Surprise',      label: '🎁 Surprise Me', icon: Gift }, // At the end, right side
];

export default function Navbar({ tools = [], onSelectTool, selectedCategory, onSelectCategory, toolsCount = 100, onOpenComparison, onOpenDonation }) {
  const [showSurpriseAd, setShowSurpriseAd] = useState(false);

  return (
    <header className="nav-panel no-print w-full" style={{ position: 'sticky', top: 0, zIndex: 1000, background: '#ffffff', borderBottom: '1px solid #e6e9ef' }}>
      {/* Top row: Monday.com style header with logo, search, and action pills */}
      <div className="flex items-center justify-between px-6 h-16 w-full" style={{ maxWidth: 1040, margin: '0 auto' }}>
        <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => onSelectCategory('All', { scrollToTop: true })}>
          {/* Premium Tech Logo Mark */}
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="34" height="34" rx="10" fill="url(#logo-bg)"/>
              <rect x="0.75" y="0.75" width="32.5" height="32.5" rx="9.25" stroke="url(#logo-border)" strokeWidth="1.5" />
              <path d="M12 10.5C12 9.67157 12.6716 9 13.5 9H18.5C21.5376 9 24 11.4624 24 14.5C24 17.5376 21.5376 20 18.5 20H15.5V23.5C15.5 24.3284 14.8284 25 14 25C13.1716 25 12.5 24.3284 12.5 23.5V10.5H12Z" fill="url(#p-gradient)"/>
              <path d="M15.5 12.5V16.5H18.5C19.6046 16.5 20.5 15.6046 20.5 14.5C20.5 13.3954 19.6046 12.5 18.5 12.5H15.5Z" fill="#FFFFFF"/>
              <defs>
                <linearGradient id="logo-bg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0F172A"/>
                  <stop offset="1" stopColor="#1E293B"/>
                </linearGradient>
                <linearGradient id="logo-border" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#475569" stopOpacity="0.8"/>
                  <stop offset="1" stopColor="#0F172A" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="p-gradient" x1="12" y1="9" x2="24" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8"/>
                  <stop offset="1" stopColor="#818CF8"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400, fontSize: 28, color: '#0f172a',
            letterSpacing: '-0.02em', lineHeight: 1,
            marginLeft: 4, fontStyle: 'normal',
          }}>
            pahruli<span style={{ color: '#38bdf8' }}>.</span>
          </span>
          <span style={{
            fontSize: 10, fontWeight: 700,
            padding: '2px 8px', borderRadius: 99,
            background: '#f0f2f5', color: '#676879',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}>
            {toolsCount} tools
          </span>
        </div>

        {/* Center: Inline Search Dropdown */}
        <div className="hidden md:flex items-center justify-center w-full max-w-md mx-8">
          <NavbarSearch 
            tools={tools} 
            toolsCount={toolsCount} 
            onSelectTool={onSelectTool} 
          />
        </div>

        {/* Right: Monday.com CTA Pills */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 ml-auto">
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
          <button
            onClick={onOpenDonation}
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
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(97,97,255,0.06)',
              transition: 'all 0.15s ease'
            }}
            title="Support Pahruli's free offline development"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Support Pahruli</span>
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

      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          padding: '8px 24px 12px',
          borderTop: '1px solid #f0f2f5',
          maxWidth: 1040, margin: '0 auto', width: '100%',
        }}
      >
        {CATEGORIES.map(cat => {
          if (cat.id === 'Surprise') {
            return (
              <button
                key={cat.id}
                onClick={() => setShowSurpriseAd(!showSurpriseAd)}
                className="cat-pill"
                style={{
                  background: 'linear-gradient(135deg, #ff3d8b, #6161ff)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  padding: '7px 20px',
                  fontSize: 13,
                  letterSpacing: '0.01em'
                }}
              >
                {cat.label}
              </button>
            );
          }
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
