import React from 'react';
import { Search, Command, Star, LayoutGrid, DollarSign, Cpu, FileText, Link2 } from 'lucide-react';

const CATEGORIES = [
  { id: 'All',        label: 'All Tools',      icon: LayoutGrid },
  { id: 'E-Commerce', label: 'E-Commerce',     icon: DollarSign },
  { id: 'AI & Dev',   label: 'AI & Dev',       icon: Cpu },
  { id: 'Freelance',  label: 'Freelance',      icon: FileText },
  { id: 'Marketing',  label: 'Marketing',      icon: Link2 },
];

export default function Navbar({ onOpenSearch, selectedCategory, onSelectCategory }) {
  return (
    <header className="nav-panel sticky top-0 z-40 no-print">
      {/* Top row: logo + search */}
      <div className="flex items-center justify-between px-5 h-14">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            style={{
              width: 32, height: 32, borderRadius: 10,
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(249,115,22,0.35)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: 16, color: '#f1f5f9', letterSpacing: '-0.03em' }}>
              Twignberries
            </span>
            <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1, marginTop: 1 }}>
              15 free calculators
            </div>
          </div>
        </div>

        {/* Search bar */}
        <button
          onClick={onOpenSearch}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 32, padding: '8px 14px',
            borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.1)',
            transition: 'all 0.15s ease',
            minWidth: 240,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          title="Search utilities (⌘K)"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={14} color="#f97316" />
            <span style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>Search tools...</span>
          </div>
          <kbd style={{
            display: 'flex', alignItems: 'center', gap: 3,
            padding: '2px 7px', borderRadius: 6,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            fontSize: 11, color: '#64748b', fontFamily: 'monospace',
          }}>
            <Command size={10} /> K
          </kbd>
        </button>
      </div>

      {/* Bottom row: category pills */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '0 16px 10px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 8,
          overflowX: 'auto',
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
