import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, CornerDownLeft } from 'lucide-react';

export default function CommandKModal({ isOpen, onClose, tools, onSelectTool, starredIds }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    t.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(p => (p + 1) % (filteredTools.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(p => (p - 1 + (filteredTools.length || 1)) % (filteredTools.length || 1));
      } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
        e.preventDefault();
        onSelectTool(filteredTools[selectedIndex].id);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex, onSelectTool, onClose]);

  if (!isOpen) return null;

  return (
    <div className="no-print" style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '14vh 16px 0',
    }}>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="animate-fade-in" style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 620,
        background: 'var(--bg-card)',
        border: '1px solid var(--border-md)',
        borderRadius: 16,
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        overflow: 'hidden',
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 18px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-input)',
        }}>
          <Search size={16} color="var(--brand)" strokeWidth={2.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            placeholder={`Search ${tools.length} PDF, E-Commerce, Dev & SEO utilities...`}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: 'var(--text-1)', fontSize: 15, fontWeight: 500,
              fontFamily: 'var(--font)', caretColor: 'var(--brand)',
            }}
          />
          <button
            onClick={onClose}
            style={{
              padding: '4px 6px', borderRadius: 7, border: 'none',
              background: 'rgba(255,255,255,0.06)', cursor: 'pointer',
              color: 'var(--text-4)', transition: 'all 0.13s ease',
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: '8px' }}>
          {filteredTools.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--text-4)' }}>No results for "{query}"</p>
              <p style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 4, opacity: 0.6 }}>
                Try "Etsy", "Invoice", "Stripe", or "GST"
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredTools.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                const isStarred = starredIds.includes(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => { onSelectTool(tool.id); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '11px 12px', borderRadius: 10, cursor: 'pointer',
                      transition: 'all 0.12s ease',
                      background: isSelected ? 'rgba(249,115,22,0.1)' : 'transparent',
                      border: isSelected ? '1px solid rgba(249,115,22,0.25)' : '1px solid transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* Color dot from tool */}
                      <div style={{
                        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                        background: tool.bg || 'rgba(255,255,255,0.06)',
                        color: tool.color || 'var(--text-4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {tool.icon || <Search size={15} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-1)' }}>
                            {tool.name}
                          </span>
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
                            textTransform: 'uppercase', color: 'var(--text-4)',
                            padding: '2px 7px', borderRadius: 99,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--border)',
                          }}>
                            {tool.category}
                          </span>
                          {isStarred && <Star size={11} color="#f59e0b" fill="#f59e0b" />}
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 2 }}>
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--brand-light)',
                        flexShrink: 0,
                      }}>
                        Open <CornerDownLeft size={11} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div style={{
          padding: '9px 18px',
          borderTop: '1px solid var(--border)',
          background: 'rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 11, color: 'var(--text-4)',
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>ESC close</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand)', opacity: 0.8 }}>
            Pahruli
          </span>
        </div>
      </div>
    </div>
  );
}
