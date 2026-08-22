import React from 'react';
import { Star, Clock, ChevronRight } from 'lucide-react';

export default function Sidebar({ tools, activeToolId, onSelectTool, starredIds, recentIds }) {
  const activeTool = tools.find(t => t.id === activeToolId);
  const starredTools = tools.filter(t => starredIds.includes(t.id));
  const recentTools = recentIds
    .map(id => tools.find(t => t.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <aside
      className="hidden md:flex flex-col no-print shrink-0 overflow-y-auto"
      style={{
        width: 250,
        position: 'sticky',
        top: 110,
        height: 'calc(100vh - 110px)',
        alignSelf: 'flex-start',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        gap: 0,
        padding: '20px 14px',
      }}
    >
      {/* 1. Active Tool's Category Section */}
      {activeTool && (
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: '#6161ff',
            marginBottom: 10, padding: '0 6px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6161ff', display: 'inline-block' }} />
            {activeTool.category}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {tools
              .filter(t => t.category === activeTool.category)
              .map(t => {
                const isCurrent = t.id === activeToolId;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTool(t.id)}
                    className="sidebar-item"
                    style={{
                      background: isCurrent ? '#eceeff' : undefined,
                      color: isCurrent ? '#6161ff' : undefined,
                      borderColor: isCurrent ? 'rgba(97,97,255,0.35)' : undefined,
                      fontWeight: isCurrent ? 700 : 500,
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{t.name}</span>
                    {isCurrent && (
                      <span style={{
                        fontSize: 10, background: '#6161ff', color: '#fff',
                        padding: '1px 6px', borderRadius: 10, fontWeight: 700
                      }}>
                        OPEN
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* 2. Starred */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--text-3)',
          marginBottom: 10, padding: '0 6px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Star size={12} color="#fdab3d" fill="#fdab3d" />
          Starred Workspace
        </div>
        {starredTools.length === 0 ? (
          <div style={{
            fontSize: 12.5, color: 'var(--text-3)', padding: '10px 12px',
            background: '#ffffff', borderRadius: 10,
            border: '1px dashed #d0d4e4', lineHeight: 1.5,
          }}>
            Star any utility to pin it to your board
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {starredTools.map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className="sidebar-item"
                style={{
                  background: activeToolId === t.id ? '#eceeff' : undefined,
                  color: activeToolId === t.id ? '#6161ff' : undefined,
                  borderColor: activeToolId === t.id ? 'rgba(97,97,255,0.35)' : undefined,
                }}
              >
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{t.name}</span>
                <ChevronRight size={13} color="var(--text-3)" style={{ flexShrink: 0, opacity: 0.7 }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Recently Used */}
      <div>
        <div style={{
          fontSize: 11.5, fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--text-3)',
          marginBottom: 10, padding: '0 6px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Clock size={12} color="var(--text-3)" />
          Recent Utilities
        </div>
        {recentTools.length === 0 ? (
          <div style={{
            fontSize: 12.5, color: 'var(--text-3)', padding: '10px 12px',
            background: '#ffffff', borderRadius: 10,
            border: '1px dashed #d0d4e4', lineHeight: 1.5,
          }}>
            Recently opened tools appear here
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {recentTools.map(t => {
              const isActive = activeToolId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTool(t.id)}
                  className="sidebar-item"
                  style={{
                    background: isActive ? '#eceeff' : undefined,
                    color: isActive ? '#6161ff' : undefined,
                    borderColor: isActive ? 'rgba(97,97,255,0.35)' : undefined,
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
