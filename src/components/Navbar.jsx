import React from 'react';
import { Search, Sparkles, Command, Star, Layers } from 'lucide-react';

export default function Navbar({ onOpenSearch, starredCount = 0, currentCategory = 'All' }) {
  return (
    <header className="glass-panel sticky top-0 z-40 border-b border-white/10 px-6 py-3.5 flex items-center justify-between no-print">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff6b00] to-[#ff4400] flex items-center justify-center shadow-lg shadow-[#ff6b00]/30">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg tracking-tight text-white">
              Twignberries
            </span>
            <span className="badge badge-brand">
              <Sparkles className="w-3 h-3" /> DAILY WORKSPACE
            </span>
          </div>
          <p className="text-xs text-[#9ca3af]">
            Zero-friction 2026 utilities • Bookmark-ready
          </p>
        </div>
      </div>

      {/* Universal Search (Cmd + K trigger) */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-between gap-6 px-4 py-2 rounded-xl bg-[#131722]/80 border border-white/10 hover:border-[#ff6b00]/50 hover:bg-[#181d2c] transition-all group min-w-[260px]"
          title="Search all utilities (Cmd + K)"
        >
          <div className="flex items-center gap-2.5 text-[#9ca3af] group-hover:text-white">
            <Search className="w-4 h-4 text-[#ff6b00]" />
            <span className="text-sm font-medium">Search 100+ tools...</span>
          </div>
          <kbd className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-[#9ca3af]">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>

        {/* Starred Counter */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{starredCount} Starred</span>
        </div>
      </div>
    </header>
  );
}
