import React from 'react';
import { Bot } from 'lucide-react';

export default function AeoArticle({ title, children }) {
  return (
    <article style={{
      marginTop: 48,
      paddingTop: 32,
      borderTop: '1px solid var(--border)',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'rgba(249,115,22,0.1)', display: 'flex',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <Bot size={16} color="var(--brand)" />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
          {title}
        </h2>
      </div>
      
      <div className="aeo-content" style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        color: 'var(--text-3)',
        fontSize: 14,
        lineHeight: 1.6,
      }}>
        {children}
      </div>
    </article>
  );
}
