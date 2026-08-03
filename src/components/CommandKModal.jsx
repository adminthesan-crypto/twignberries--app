import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

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
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredTools.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredTools.length || 1)) % (filteredTools.length || 1));
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 animate-fade-in no-print">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Top Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#121622]">
          <Search className="w-5 h-5 text-[#ff6b00]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search 2026 calculators, fee estimators, generators..."
            className="w-full bg-transparent text-white placeholder-[#6b7280] text-base font-medium focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-[#9ca3af]">No utilities found matching "{query}"</p>
              <p className="text-xs text-[#6b7280] mt-1">Try searching "Etsy", "Invoice", "Stripe", or "GST"</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredTools.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                const isStarred = starredIds.includes(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool.id);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#ff6b00]/20 to-[#ff6b00]/10 border border-[#ff6b00]/40 text-white' 
                        : 'text-[#9ca3af] hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#ff6b00] text-white' : 'bg-white/5 text-[#9ca3af]'}`}>
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-white">{tool.name}</span>
                          <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-white/5 text-[#6b7280]">
                            {tool.category}
                          </span>
                          {isStarred && (
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <p className="text-xs text-[#6b7280] line-clamp-1 mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="text-xs font-mono text-[#ff8c3a] flex items-center gap-1">
                          Open <CornerDownLeft className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-[#0b0d14] border-t border-white/5 flex items-center justify-between text-[11px] text-[#6b7280]">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to open</span>
            <span>ESC to close</span>
          </div>
          <span className="font-mono text-[#ff6b00]">Twignberries OS v1.0</span>
        </div>
      </div>
    </div>
  );
}
