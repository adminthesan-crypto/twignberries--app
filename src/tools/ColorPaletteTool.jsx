import React, { useState } from 'react';
import { Palette, CheckCircle2, XCircle, Copy, Check, ShieldCheck } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ColorPaletteTool() {
  const [fg, setFg] = useState('#1f2532');
  const [bg, setBg] = useState('#ffffff');
  const [copiedHex, setCopiedHex] = useState(null);

  const getLuminance = (hex) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    const rgb = [
      parseInt(c.substring(0, 2), 16) / 255,
      parseInt(c.substring(2, 4), 16) / 255,
      parseInt(c.substring(4, 6), 16) / 255
    ].map(v => {
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };

  const getContrastRatio = (h1, h2) => {
    const l1 = getLuminance(h1);
    const l2 = getLuminance(h2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const ratio = parseFloat(getContrastRatio(fg, bg));

  const passAANormal = ratio >= 4.5;
  const passAALarge = ratio >= 3.0;
  const passAAANormal = ratio >= 7.0;
  const passAAALarge = ratio >= 4.5;

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const generateShades = (hex) => {
    return [
      '#6161ff', '#00c875', '#fdab3d', '#e2445c', '#1f2532', '#f6f8fa'
    ];
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Color Inputs & Accessibility Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Foreground & Background Color Pairing</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 8 }}>
                Foreground Text Color
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="color"
                  value={fg}
                  onChange={e => setFg(e.target.value)}
                  style={{ width: 48, height: 44, borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', cursor: 'pointer', padding: 2 }}
                />
                <input
                  type="text"
                  value={fg}
                  onChange={e => setFg(e.target.value)}
                  style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #d0d4e4', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 8 }}>
                Background Color
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input
                  type="color"
                  value={bg}
                  onChange={e => setBg(e.target.value)}
                  style={{ width: 48, height: 44, borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', cursor: 'pointer', padding: 2 }}
                />
                <input
                  type="text"
                  value={bg}
                  onChange={e => setBg(e.target.value)}
                  style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #d0d4e4', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}
                />
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div style={{
            padding: '28px 24px', borderRadius: 16, background: bg, color: fg,
            border: '2px solid #e6e9ef', transition: 'all 0.15s ease'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              WCAG 2.1 AA & AAA Contrast Preview
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.9 }}>
              This is normal body paragraph text. Sufficient contrast ensures readability for users with visual impairments or screen glare.
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 12, opacity: 0.8 }}>
              Large bold caption text (18pt / 24px+)
            </div>
          </div>
        </div>

        {/* WCAG Compliance Checks Card */}
        <div className="form-card">
          <div style={SL}>2. WCAG 2.1 Accessibility Compliance Breakdown</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { name: 'WCAG AA (Normal Text)', req: '>= 4.5:1', pass: passAANormal },
              { name: 'WCAG AA (Large Text)', req: '>= 3.0:1', pass: passAALarge },
              { name: 'WCAG AAA (Normal Text)', req: '>= 7.0:1', pass: passAAANormal },
              { name: 'WCAG AAA (Large Text)', req: '>= 4.5:1', pass: passAAALarge }
            ].map(test => (
              <div
                key={test.name}
                style={{
                  padding: '16px', borderRadius: 14,
                  border: test.pass ? '1px solid #00c875' : '1px solid #e2445c',
                  background: test.pass ? '#f0faf5' : '#fff2f4',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>{test.name}</div>
                  <div style={{ fontSize: 12, color: '#676879', marginTop: 2 }}>Requirement: {test.req}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: test.pass ? '#00c875' : '#e2445c' }}>
                  {test.pass ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                  <span>{test.pass ? 'PASS' : 'FAIL'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Contrast Ratio</div>
            <span className={`badge ${ratio >= 4.5 ? 'badge-success' : ratio >= 3.0 ? 'badge-brand' : 'badge-danger'}`} style={{ fontSize: 11 }}>
              {ratio >= 4.5 ? 'WCAG AA PASS' : ratio >= 3.0 ? 'LARGE TEXT ONLY' : 'FAIL'}
            </span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 36, color: ratio >= 4.5 ? '#00c875' : ratio >= 3.0 ? '#fdab3d' : '#e2445c' }}>
              {ratio}:1
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {fg} text on {bg} background
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#676879', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
              Quick Monday SaaS Tints
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {generateShades().map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setFg(h)}
                  style={{
                    padding: '10px 8px', borderRadius: 10, background: h,
                    border: '1px solid #d0d4e4', cursor: 'pointer',
                    color: getLuminance(h) > 0.5 ? '#1f2532' : '#ffffff',
                    fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
                  }}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleCopy(`${fg} / ${bg} (Ratio ${ratio}:1)`)}
            className="btn-primary"
            style={{ width: '100%', background: '#6161ff', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {copiedHex ? <Check size={16} /> : <Copy size={16} />}
            {copiedHex ? 'Copied Specs!' : 'Copy WCAG Specs Report'}
          </button>

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>100% offline relative luminance calculation.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why test WCAG Contrast?</div>
          The ADA and European Accessibility Act require public web apps to maintain a 4.5:1 text contrast ratio. Test your HEX pairs before shipping CSS.
        </div>
      </div>
    </div>
  );
}
