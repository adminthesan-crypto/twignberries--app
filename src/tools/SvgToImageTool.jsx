import React, { useState, useRef, useEffect } from 'react';
import { Image as ImageIcon, Upload, Code, Download, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" rx="40" fill="#6161ff" />
  <circle cx="100" cy="85" r="35" fill="#ffffff" />
  <path d="M50 160 C50 125, 150 125, 150 160" fill="none" stroke="#ffffff" stroke-width="14" stroke-linecap="round" />
</svg>`;

export default function SvgToImageTool() {
  const [svgCode, setSvgCode] = useState(DEFAULT_SVG);
  const [scale, setScale] = useState(2); // 1, 2, 4, 8
  const [format, setFormat] = useState('png'); // png, jpeg
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [dimensions, setDimensions] = useState({ w: 200, h: 200 });
  const canvasRef = useRef(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setResultUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith('.svg') && selected.type !== 'image/svg+xml') {
      setErrorMsg('Please select a valid SVG file.');
      return;
    }
    const text = await selected.text();
    setSvgCode(text);
  };

  const handleConvert = () => {
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgCode, 'image/svg+xml');
      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Invalid SVG XML syntax.');
      }

      const svgEl = doc.querySelector('svg');
      if (!svgEl) {
        throw new Error('No root <svg> element found.');
      }

      let width = parseInt(svgEl.getAttribute('width') || '300', 10);
      let height = parseInt(svgEl.getAttribute('height') || '300', 10);
      if (isNaN(width)) width = 300;
      if (isNaN(height)) height = 300;

      const scaledW = width * scale;
      const scaledH = height * scale;
      setDimensions({ w: scaledW, h: scaledH });

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = scaledW;
      canvas.height = scaledH;

      const ctx = canvas.getContext('2d');
      if (format === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, scaledW, scaledH);
      } else {
        ctx.clearRect(0, 0, scaledW, scaledH);
      }

      const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        ctx.drawImage(img, 0, 0, scaledW, scaledH);
        URL.revokeObjectURL(url);
        const dataUrl = canvas.toDataURL(`image/${format}`, 0.95);
        setResultUrl(dataUrl);
      };

      img.onerror = () => {
        setErrorMsg('Error rendering SVG onto HTML5 canvas.');
        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (err) {
      setErrorMsg(err.message || 'Failed to convert SVG.');
    }
  };

  useEffect(() => {
    handleConvert();
  }, [svgCode, scale, format]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: SVG Input & Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload SVG File or Paste SVG XML Code</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <label
              htmlFor="svg-upload"
              style={{
                padding: '8px 14px', borderRadius: 10, border: '1px solid #d0d4e4',
                background: '#f6f8fa', color: '#1f2532', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
              }}
            >
              <Upload size={14} /> Upload .svg File
              <input
                id="svg-upload"
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>

            <button
              type="button"
              onClick={() => { setSvgCode(DEFAULT_SVG); setResultUrl(null); }}
              style={{
                padding: '8px 14px', borderRadius: 10, border: '1px solid #e6e9ef',
                background: '#ffffff', color: '#676879', fontSize: 12.5, fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reset Sample
            </button>
          </div>

          <textarea
            value={svgCode}
            onChange={e => setSvgCode(e.target.value)}
            rows={8}
            placeholder="Paste raw <svg>...</svg> XML code here..."
            style={{
              width: '100%', padding: '12px', borderRadius: 12, border: '1px solid #d0d4e4',
              background: '#f6f8fa', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#1f2532',
              resize: 'vertical'
            }}
          />

          {errorMsg && (
            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Export Resolution & Format Card */}
        <div className="form-card">
          <div style={SL}>2. Scale Resolution & Image Format</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 8 }}>
                Resolution Scale
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {[
                  { id: 1, label: '1x' },
                  { id: 2, label: '2x' },
                  { id: 4, label: '4x' },
                  { id: 8, label: '8x' }
                ].map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScale(s.id)}
                    style={{
                      padding: '10px 0', borderRadius: 10,
                      border: scale === s.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                      background: scale === s.id ? '#f3f5ff' : '#ffffff',
                      color: scale === s.id ? '#6161ff' : '#1f2532',
                      fontWeight: 700, fontSize: 13.5, cursor: 'pointer', textAlign: 'center'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 8 }}>
                Output Format
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { id: 'png', label: 'PNG (Transparent)' },
                  { id: 'jpeg', label: 'JPG (White Bg)' }
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    style={{
                      padding: '10px 8px', borderRadius: 10,
                      border: format === f.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                      background: format === f.id ? '#f3f5ff' : '#ffffff',
                      color: format === f.id ? '#6161ff' : '#1f2532',
                      fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'center'
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">SVG Export Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 26, color: '#6161ff' }}>
              {dimensions.w} × {dimensions.h} px
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {scale}x Scale • {format.toUpperCase()} Output
            </div>
          </div>

          <div style={{
            padding: '16px', borderRadius: 14, background: '#f7f9fc', border: '1px solid #e6e9ef',
            display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 160,
            marginBottom: 16, overflow: 'hidden'
          }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: 200, display: resultUrl ? 'block' : 'none', borderRadius: 8 }} />
            {!resultUrl && <span style={{ fontSize: 13, color: '#676879' }}>Rendering SVG...</span>}
          </div>

          {resultUrl && (
            <a
              href={resultUrl}
              download={`Twignberries-SVG-Export-${scale}x.${format === 'jpeg' ? 'jpg' : 'png'}`}
              className="btn-primary"
              style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Download size={16} /> Download {format.toUpperCase()} ({scale}x)
            </a>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>HTML5 canvas rasterization. Zero cloud uploads.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side SVG Export?</div>
          Converting logos and vector assets on third-party servers can leak pre-release brand art. Twignberries renders vectors inside your GPU canvas offline.
        </div>
      </div>
    </div>
  );
}
