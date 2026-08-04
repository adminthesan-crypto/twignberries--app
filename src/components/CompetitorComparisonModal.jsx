import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Sparkles, X, Lock, Zap, Heart } from 'lucide-react';

export default function CompetitorComparisonModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const comparisonData = [
    {
      feature: 'Daily Task Limit',
      pahruli: { text: 'Unlimited (100% Free Forever)', good: true },
      smallpdf: { text: '2 tasks / day then $12/mo (₹1,000/mo)', good: false },
      ilovepdf: { text: 'File size caps & upgrade nags', good: false },
      pdf24: { text: 'Unlimited', good: true },
    },
    {
      feature: 'Document Privacy & Cloud Uploads',
      pahruli: { text: '0% Upload (100% Client-Side WebAssembly)', good: true },
      smallpdf: { text: 'Uploads files to remote servers', good: false },
      ilovepdf: { text: 'Uploads files to remote servers', good: false },
      pdf24: { text: 'Uploads to servers or clunky desktop app', good: false },
    },
    {
      feature: 'Aadhaar, GST & NDA Security',
      pahruli: { text: 'Never leaves your browser / offline safe', good: true },
      smallpdf: { text: 'Stored on cloud servers', good: false },
      ilovepdf: { text: 'Stored on cloud servers', good: false },
      pdf24: { text: 'Server processing', good: false },
    },
    {
      feature: 'Page Load Speed',
      pahruli: { text: '0.4s Instant Load (Zero ad trackers)', good: true },
      smallpdf: { text: '3.2s+ (Heavy scripts & paywall checks)', good: false },
      ilovepdf: { text: '2.8s+ (Ad networks & banners)', good: false },
      pdf24: { text: '2.5s+ (Clunky 2010 German UI)', good: false },
    },
    {
      feature: 'Total Built-in Utilities',
      pahruli: { text: '100 Tools (PDFs, Images, Dev, Calculators)', good: true },
      smallpdf: { text: '21 tools (PDF only)', good: false },
      ilovepdf: { text: '25 tools (PDF only)', good: false },
      pdf24: { text: '30 tools (PDF only)', good: false },
    },
    {
      feature: 'Built with Pride from India 🇮🇳',
      pahruli: { text: 'Yes — Designed for Indian & Global Creators', good: true },
      smallpdf: { text: 'Switzerland 🇨🇭', good: false },
      ilovepdf: { text: 'Spain 🇪🇸', good: false },
      pdf24: { text: 'Germany 🇩🇪', good: false },
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 24,
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
          border: '1px solid #e2e8f0',
          padding: '28px 32px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 99,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                <Sparkles size={12} />
                Why 60M Indians Are Switching
              </span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              Pahruli vs. Smallpdf, iLovePDF & PDF24
            </h2>
            <p style={{ fontSize: 14, color: '#64748b', margin: '4px 0 0 0' }}>
              Why pay ₹1,000/month or upload your confidential bank statements and Aadhaar cards to overseas servers?
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: 10,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b',
              transition: 'all 0.15s ease',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Comparison Table */}
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#475569', width: '28%' }}>Feature</th>
                <th style={{ padding: '12px 16px', fontSize: 14, fontWeight: 800, color: '#059669', background: '#f0fdf4', borderRadius: '12px 12px 0 0', width: '26%' }}>
                  🇮🇳 Pahruli (Us)
                </th>
                <th style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#1e293b', width: '23%' }}>Smallpdf</th>
                <th style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: '#1e293b', width: '23%' }}>iLovePDF / PDF24</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontSize: 13, fontWeight: 600, color: '#334155' }}>
                    {row.feature}
                  </td>
                  {/* Pahruli column */}
                  <td style={{
                    padding: '14px 16px',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#047857',
                    background: '#f0fdf4',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <CheckCircle2 size={16} color="#10b981" />
                      <span>{row.pahruli.text}</span>
                    </div>
                  </td>
                  {/* Smallpdf column */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <XCircle size={16} color="#ef4444" />
                      <span>{row.smallpdf.text}</span>
                    </div>
                  </td>
                  {/* iLovePDF / PDF24 column */}
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <AlertTriangle size={16} color="#f59e0b" />
                      <span>{row.ilovepdf.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer CTA box inside Modal */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: 16,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <h4 style={{ color: '#ffffff', fontSize: 16, fontWeight: 700, margin: '0 0 4px 0' }}>
              100% Client-Side. Zero Server Uploads. Zero Paywalls.
            </h4>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
              Use all 100 tools offline right now. No signups, no credit cards, no ₹1,000/mo locks.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: 99,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            <span>Start Using Free Tools</span>
            <Zap size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
