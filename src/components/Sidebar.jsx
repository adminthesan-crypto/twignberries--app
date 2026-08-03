import React from 'react';
import { 
  Star, 
  Clock, 
  Calculator, 
  FileText, 
  Link2, 
  DollarSign, 
  LayoutGrid,
  ChevronRight,
  BookmarkCheck,
  Cpu
} from 'lucide-react';

export default function Sidebar({ 
  tools, 
  activeToolId, 
  onSelectTool, 
  starredIds, 
  onToggleStar, 
  recentIds, 
  selectedCategory,
  onSelectCategory 
}) {
  const categories = [
    { id: 'All', label: 'All Utilities', icon: LayoutGrid },
    { id: 'E-Commerce', label: 'E-Commerce & Fees', icon: DollarSign },
    { id: 'AI & Dev', label: 'AI & Developer', icon: Cpu },
    { id: 'Freelance', label: 'Freelance & SaaS', icon: FileText },
    { id: 'Marketing', label: 'Marketing & Web', icon: Link2 },
  ];

  const starredTools = tools.filter(t => starredIds.includes(t.id));
  const recentTools = recentIds
    .map(id => tools.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <aside className="w-64 glass-panel border-r border-white/10 p-4 flex flex-col gap-6 no-print shrink-0">
      {/* Category Navigation */}
      <div>
        <div className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase px-3 mb-2">
          Browse Categories
        </div>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#ff6b00]/15 text-[#ff8c3a] border border-[#ff6b00]/30 font-semibold'
                    : 'text-[#9ca3af] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff6b00]' : 'text-[#6b7280]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Starred / Pinned Workspace */}
      <div>
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase flex items-center gap-1.5">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> Starred Tools
          </span>
          <span className="text-xs text-[#6b7280] font-mono">{starredTools.length}</span>
        </div>
        {starredTools.length === 0 ? (
          <div className="px-3 py-2.5 text-xs text-[#6b7280] bg-white/[0.02] rounded-xl border border-white/5">
            Click the ☆ star on any tool to pin it here.
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {starredTools.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                  activeToolId === t.id
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="truncate">{t.name}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#ff6b00]" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recent History */}
      <div>
        <div className="text-[11px] font-bold tracking-wider text-[#6b7280] uppercase px-3 mb-2 flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#3b82f6]" /> Recently Used
        </div>
        {recentTools.length === 0 ? (
          <div className="px-3 py-2.5 text-xs text-[#6b7280] bg-white/[0.02] rounded-xl border border-white/5">
            Tools you use will appear here automatically.
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {recentTools.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                  activeToolId === t.id
                    ? 'bg-white/10 text-white font-medium border border-white/15'
                    : 'text-[#9ca3af] hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="truncate">{t.name}</span>
                <span className="text-[10px] text-[#6b7280] group-hover:text-[#ff6b00] font-mono">
                  open
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Habit Builder Tip Banner */}
      <div className="mt-auto p-3.5 rounded-xl bg-gradient-to-br from-[#121622] to-[#181d2c] border border-white/10">
        <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
          <BookmarkCheck className="w-4 h-4 text-[#ff6b00]" />
          <span>Why Twignberries?</span>
        </div>
        <p className="text-[11px] text-[#9ca3af] leading-relaxed">
          Zero signups, instant client-side math, and your workflow saved automatically to localStorage.
        </p>
      </div>
    </aside>
  );
}
