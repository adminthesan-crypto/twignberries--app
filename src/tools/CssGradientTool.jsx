import React, { useState } from 'react';
import { Palette, Copy, Check, ShieldCheck } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function CssGradientTool() {
  const [type, setType] = useState('linear'); // linear, radial
  const [angle, setAngle] = useState(135);
  const [color1, setColor1] = useState('#6161ff');
  const [color2, setColor2] = useState('#00e699');
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedTailwind, setCopiedTailwind] = useState(false);

  const cssStr = type === 'linear'
    ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
    : `radial-gradient(circle, ${color1}, ${color2})`;

  const tailwindAngleMap = {
    0: 'bg-gradient-to-t',
    45: 'bg-gradient-to-tr',
    90: 'bg-gradient-to-r',
    135: 'bg-gradient-to-br',
    180: 'bg-gradient-to-b',
    225: 'bg-gradient-to-bl',
    270: 'bg-gradient-to-l',
    315: 'bg-gradient-to-tl'
  };

  const closestAngle = Object.keys(tailwindAngleMap).reduce((prev, curr) => {
    return Math.abs(curr - angle) < Math.abs(prev - angle) ? curr : prev;
  }, 135);

  const tailwindStr = `${tailwindAngleMap[closestAngle]} from-[${color1}] to-[${color2}]`;

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${cssStr};`);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const copyTailwind = () => {
    navigator.clipboard.writeText(tailwindStr);
    setCopiedTailwind(true);
    setTimeout(() => setCopiedTailwind(false), 2000);
  };

  const presets = [
    { name: 'Hyper Indigo', c1: '#6161ff', c2: '#a361ff' },
    { name: 'Emerald Aura', c1: '#059669', c2: '#34d399' },
    { name: 'Sunset Peach', c1: '#f97316', c2: '#ec4899' },
    { name: 'Cyber Neon', c1: '#06b6d4', c2: '#3b82f6' },
    { name: 'Midnight Charcoal', c1: '#111827', c2: '#374151' }
  ];

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Offline CSS & Tailwind Gradient Generator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Build silky linear and radial gradients with custom angles and color stops. Copy production-ready CSS or Tailwind v3/v4 classes instantly."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Live Preview Area */}
        <div
          className="w-full h-80 rounded-2xl shadow-lg border border-[#e6e9ef] flex items-center justify-center relative overflow-hidden transition-all"
          style={{ background: cssStr }}
        >
          <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-xl shadow-sm border border-white/40 text-center">
            <div className="text-sm font-bold text-[#1f2532]">{type.toUpperCase()} GRADIENT</div>
            <div className="font-mono text-xs text-[#676879] mt-0.5">{color1} → {color2}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div style={SL}>Gradient Type</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setType('linear')}
                  className={`h-10 rounded-lg text-xs font-bold border transition ${
                    type === 'linear'
                      ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                      : 'border-[#d0d4e4] bg-white text-[#676879]'
                  }`}
                >
                  Linear
                </button>
                <button
                  onClick={() => setType('radial')}
                  className={`h-10 rounded-lg text-xs font-bold border transition ${
                    type === 'radial'
                      ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                      : 'border-[#d0d4e4] bg-white text-[#676879]'
                  }`}
                >
                  Radial
                </button>
              </div>
            </div>

            {type === 'linear' && (
              <div>
                <div style={SL}>Angle ({angle}°)</div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-[#6161ff]"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div style={SL}>Start Color</div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-11 h-11 rounded-lg border border-[#d0d4e4] cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532]"
                />
              </div>
            </div>

            <div>
              <div style={SL}>End Color</div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-11 h-11 rounded-lg border border-[#d0d4e4] cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532]"
                />
              </div>
            </div>
          </div>

          <div>
            <div style={SL}>Curated Brand Presets</div>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => { setColor1(p.c1); setColor2(p.c2); }}
                  className="px-3 py-1.5 rounded-lg border border-[#e6e9ef] hover:border-[#6161ff] text-xs font-bold text-[#1f2532] flex items-center gap-2 bg-white shadow-sm"
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full"
                    style={{ background: `linear-gradient(135deg, ${p.c1}, ${p.c2})` }}
                  />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex items-center justify-between">
              <code className="font-mono text-xs text-[#1f2532]">background: {cssStr};</code>
              <div className="flex gap-2">
                <button
                  onClick={copyCss}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
                >
                  {copiedCss ? <Check size={14} /> : <Copy size={14} />}
                  {copiedCss ? 'Copied!' : 'Copy CSS'}
                </button>
                <NativeShareButton text={`background: ${cssStr};`} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex items-center justify-between">
              <code className="font-mono text-xs text-[#1f2532]">{tailwindStr}</code>
              <div className="flex gap-2">
                <button
                  onClick={copyTailwind}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d0d4e4] text-[#1f2532] text-xs font-bold hover:bg-white"
                >
                  {copiedTailwind ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  {copiedTailwind ? 'Copied!' : 'Copy Tailwind'}
                </button>
                <NativeShareButton text={tailwindStr} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
