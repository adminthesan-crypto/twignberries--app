import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

export default function NavbarSearch({ tools = [], toolsCount = 100, onSelectTool }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const filteredTools = tools.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase()) ||
    t.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 6); // Limit to 6 items in dropdown for better height

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(p => (p + 1) % (filteredTools.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(p => (p - 1 + (filteredTools.length || 1)) % (filteredTools.length || 1));
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      e.preventDefault();
      onSelectTool(filteredTools[selectedIndex].id);
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          height: 38,
          borderRadius: 99,
          background: '#f5f6f8',
          border: isOpen ? '1px solid #6161ff' : '1px solid #e6e9ef',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 8,
          boxShadow: isOpen ? '0 0 0 3px rgba(97,97,255,0.1)' : 'none',
          transition: 'all 0.2s',
        }}
      >
        <Search size={16} color={isOpen ? "#6161ff" : "#676879"} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={`Search ${toolsCount} utilities...`}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 13,
            color: '#1f2532',
          }}
        />
        {!isOpen && !query && (
          <kbd style={{
            fontSize: 11, padding: '2px 6px', background: '#ffffff',
            borderRadius: 6, border: '1px solid #dcdce5', color: '#676879', fontWeight: 600
          }}>
            ⌘K
          </kbd>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 8,
          background: '#ffffff',
          borderRadius: 12,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #e6e9ef',
          overflow: 'hidden',
          zIndex: 1000,
        }}>
          {filteredTools.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#676879', fontSize: 13 }}>
              No tools found matching "{query}"
            </div>
          ) : (
            <div style={{ maxHeight: 400, overflowY: 'auto', padding: 8 }}>
              {filteredTools.map((t, i) => {
                const isActive = i === selectedIndex;
                const Icon = typeof t.icon === 'function' ? t.icon : () => null;
                return (
                  <div
                    key={t.id}
                    onClick={() => {
                      onSelectTool(t.id);
                      setIsOpen(false);
                      setQuery('');
                      inputRef.current?.blur();
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      background: isActive ? '#f4efff' : 'transparent',
                      color: isActive ? '#5521e8' : '#1f2532',
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: isActive ? '#e0d4ff' : t.bg || '#f5f6f8',
                      color: isActive ? '#5521e8' : t.color || '#676879',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {typeof t.icon === 'function' ? <Icon size={16} /> : t.icon}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {t.name}
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: '2px 6px',
                          borderRadius: 99, background: 'rgba(0,0,0,0.05)', color: '#676879',
                          whiteSpace: 'nowrap'
                        }}>
                          {t.category.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: 11, color: '#676879', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
