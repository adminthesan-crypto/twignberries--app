import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import TOOLS from '../data/toolsData';

export default function WidgetLayout() {
  const { id } = useParams();
  const tool = TOOLS.find(t => t.id === id);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#ffffff',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Optional: A very tiny header just showing the tool name */}
      {tool && (
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #f0f2f5',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: 24, height: 24, borderRadius: 6,
            background: tool.bg || '#f5f6f8',
            color: tool.color || '#676879',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            {typeof tool.icon === 'function' ? <tool.icon size={12} /> : React.cloneElement(tool.icon, { width: 12, height: 12 })}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#1f2532' }}>
            {tool.name}
          </span>
        </div>
      )}

      {/* Main Tool Content */}
      <div style={{ flex: 1, padding: '24px 16px', overflowY: 'auto' }}>
        <Outlet />
      </div>

      {/* Trojan Horse Branding */}
      <a 
        href={`https://free.pahruli.in/tool/${id}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: 'block',
          textAlign: 'center',
          padding: '12px',
          background: '#f8f6ff',
          color: '#5521e8',
          fontSize: 12,
          fontWeight: 700,
          textDecoration: 'none',
          borderTop: '1px solid #e2d9ff',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#f0ebff'}
        onMouseLeave={e => e.currentTarget.style.background = '#f8f6ff'}
      >
        ⚡ Powered by Pahruli — 100% Offline
      </a>
    </div>
  );
}
