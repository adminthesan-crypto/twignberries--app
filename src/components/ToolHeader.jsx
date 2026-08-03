import React from 'react';

/**
 * Shared compact header shown at the top of each tool.
 * The big h1 is gone — the tool name lives in the breadcrumb in App.jsx.
 * This just shows a one-line description and an optional action button.
 */
export default function ToolHeader({ title, description, badge, action }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      gap: 16, marginBottom: 28, flexWrap: 'wrap',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <h1 style={{
            fontSize: 22, fontWeight: 700, color: 'var(--text-1)',
            letterSpacing: '-0.025em', lineHeight: 1.2,
          }}>
            {title}
          </h1>
          {badge && (
            <span className="badge badge-success" style={{ fontSize: 10 }}>{badge}</span>
          )}
        </div>
        {description && (
          <p style={{ fontSize: 13, color: 'var(--text-4)', marginTop: 4, lineHeight: 1.5 }}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <div style={{ flexShrink: 0 }}>
          {action}
        </div>
      )}
    </div>
  );
}
