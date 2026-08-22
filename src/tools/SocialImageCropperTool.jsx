import React, { useState, useRef, useEffect } from 'react';
import { Crop, Upload, Image as ImageIcon, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

const PRESETS = [
  { id: 'insta-sq', label: 'Instagram Square (1:1)', width: 1080, height: 1080, ratio: '1 / 1' },
  { id: 'insta-story', label: 'Story / Reel / TikTok (9:16)', width: 1080, height: 1920, ratio: '9 / 16' },
  { id: 'yt-thumb', label: 'YouTube Thumbnail (16:9)', width: 1280, height: 720, ratio: '16 / 9' },
  { id: 'li-banner', label: 'LinkedIn Banner (4:1)', width: 1584, height: 396, ratio: '4 / 1' },
];

export default function SocialImageCropperTool() {
  const [file, setFile] = useState(null);
  const [preset, setPreset] = useState(PRESETS[0]);
  const [zoom, setZoom] = useState(1); // 1 to 2.5
  const [fitMode, setFitMode] = useState('cover'); // cover, contain
  const [bgColor, setBgColor] = useState('#ffffff');
  const [resultUrl, setResultUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setResultUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFile({
        name: selected.name,
        src: event.target.result
      });
    };
    reader.readAsDataURL(selected);
  };

  const renderCrop = () => {
    if (!file || !file.src) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      const targetW = preset.width;
      const targetH = preset.height;
      canvas.width = targetW;
      canvas.height = targetH;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetW, targetH);

      const imgW = img.width;
      const imgH = img.height;

      let scale = 1;
      if (fitMode === 'cover') {
        scale = Math.max(targetW / imgW, targetH / imgH) * zoom;
      } else {
        scale = Math.min(targetW / imgW, targetH / imgH) * zoom;
      }

      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const dx = (targetW - drawW) / 2;
      const dy = (targetH - drawH) / 2;

      ctx.drawImage(img, dx, dy, drawW, drawH);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setResultUrl(dataUrl);
    };
    img.src = file.src;
  };

  useEffect(() => {
    renderCrop();
  }, [file, preset, zoom, fitMode, bgColor]);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
      {/* Left Column: Image Input & Social Presets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload Image (JPG, PNG, WEBP) — 100% Client-Side</div>
          
          {!file ? (
            <label
              htmlFor="crop-upload"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '36px 26px', border: '2px dashed #d0d4e4', borderRadius: 16,
                background: '#f6f8fa', cursor: 'pointer', transition: 'all 0.15s ease',
                textAlign: 'center'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#6161ff'; e.currentTarget.style.background = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#d0d4e4'; e.currentTarget.style.background = '#f6f8fa'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#eceeff', color: '#6161ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Upload size={22} />
              </div>
              <span className="dropzone-title">Click to select an image file</span>
              <span style={{ fontSize: 13, color: '#676879', marginTop: 4 }}>
                Offline social media cropping • Zero server uploads
              </span>
              <input
                id="crop-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderRadius: 14, background: '#f7f9fc', border: '1px solid #e6e9ef' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#eceeff', color: '#6161ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ImageIcon size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
                    Loaded • 100% Local GPU Processing
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setResultUrl(null); }}
                style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#ffffff', color: '#1f2532', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Change file
              </button>
            </div>
          )}

          {errorMsg && (
            <div style={{ marginTop: 16, padding: '24px 26px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Social Presets & Crop Controls */}
        <div className="form-card">
          <div style={SL}>2. Social Media Platform Aspect Ratios</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[20px]">
            {PRESETS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p)}
                style={{
                  padding: '14px 12px', borderRadius: 12,
                  border: preset.id === p.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                  background: preset.id === p.id ? '#f3f5ff' : '#ffffff',
                  color: preset.id === p.id ? '#6161ff' : '#1f2532',
                  fontWeight: 700, fontSize: 13.5, cursor: 'pointer', textAlign: 'left'
                }}
              >
                <div>{p.label}</div>
                <div style={{ fontSize: 11, color: '#676879', fontWeight: 500, marginTop: 2 }}>
                  {p.width} × {p.height} px
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[16px]">
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Fit Mode
              </label>
              <select
                value={fitMode}
                onChange={e => setFitMode(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value="cover">Cover (Fill Whole Frame)</option>
                <option value="contain">Contain (Fit inside with padding)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Background Padding Color
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                style={{ width: '100%', height: 42, padding: 4, borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              Zoom Scale: {Math.round(zoom * 100)}%
            </label>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={e => setZoom(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 26, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Social Crop Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 28, color: '#6161ff' }}>
              {preset.width} × {preset.height}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {preset.label}
            </div>
          </div>

          <div style={{
            padding: '24px', borderRadius: 14, background: '#f7f9fc', border: '1px solid #e6e9ef',
            display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180,
            marginBottom: 16, overflow: 'hidden'
          }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: 220, display: file ? 'block' : 'none', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
            {!file && <span style={{ fontSize: 13, color: '#676879' }}>Upload an image to preview crop</span>}
          </div>

          {resultUrl && file && (
            <div className="flex gap-3 w-full">
              <a
                href={resultUrl}
                download={`Pahruli-${preset.id}-${preset.width}x${preset.height}.jpg`}
                className="btn-primary"
                style={{ flex: 1, background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download {preset.width}×{preset.height} JPG
              </a>
              <NativeShareButton 
                fileUrl={resultUrl} 
                fileName={`Pahruli-${preset.id}-${preset.width}x${preset.height}.jpg`} 
                mimeType="image/jpeg" 
              />
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Browser-canvas image resizing. Zero cloud storage.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side Social Cropping?</div>
          Online croppers upload your photography to external servers. Pahruli crops and exports your creative assets inside your browser GPU in milliseconds.
        </div>
      </div>
    </div>
  );
}
