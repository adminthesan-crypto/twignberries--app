import React from 'react';
import { Star, Clock, ChevronRight } from 'lucide-react';

export default function Sidebar({ tools, activeToolId, onSelectTool, starredIds, recentIds }) {
  const starredTools = tools.filter(t => starredIds.includes(t.id));
  const recentTools = recentIds
    .map(id => tools.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <aside
      className="no-print shrink-0 overflow-y-auto"
      style={{
        width: 220,
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        padding: '16px 12px',
      }}
    >
      {/* Starred */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase', color: 'var(--text-4)',
          marginBottom: 8, padding: '0 4px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Star size={11} color="#f59e0b" fill="#f59e0b" />
          Starred
        </div>
        {starredTools.length === 0 ? (
          <div style={{
            fontSize: 12, color: 'var(--text-4)', padding: '8px 10px',
            background: 'rgba(255,255,255,0.02)', borderRadius: 8,
            border: '1px dashed rgba(255,255,255,0.08)', lineHeight: 1.5,
          }}>
            Star any tool to pin it here
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {starredTools.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className="sidebar-item"
                style={{
                  background: activeToolId === t.id ? 'var(--brand-dim)' : undefined,
                  color: activeToolId === t.id ? 'var(--brand-light)' : undefined,
                  borderColor: activeToolId === t.id ? 'rgba(249,115,22,0.3)' : undefined,
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{t.name}</span>
                <ChevronRight size={12} color="var(--text-4)" style={{ flexShrink: 0, opacity: 0.5 }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recently Used */}
      <div>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.07em',
          textTransform: 'uppercase', color: 'var(--text-4)',
          marginBottom: 8, padding: '0 4px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Clock size={11} color="var(--text-4)" />
          Recent
        </div>
        {recentTools.length === 0 ? (
          <div style={{
            fontSize: 12, color: 'var(--text-4)', padding: '8px 10px',
            background: 'rgba(255,255,255,0.02)', borderRadius: 8,
            border: '1px dashed rgba(255,255,255,0.08)', lineHeight: 1.5,
          }}>
            Recently opened tools appear here
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentTools.map(t => {
              const isActive = activeToolId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTool(t.id)}
                  className="sidebar-item"
                  style={{
                    background: isActive ? 'var(--brand-dim)' : undefined,
                    color: isActive ? 'var(--brand-light)' : undefined,
                    borderColor: isActive ? 'rgba(249,115,22,0.3)' : undefined,
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{t.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
