import React, { useState } from 'react';
import { Square, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Sliders, Layout } from 'lucide-react';

export default function ImageRoundCornersTool() {
  const [image, setImage] = useState(null);
  const [radius, setRadius] = useState(24);
  const [padding, setPadding] = useState(40);
  const [bgColor, setBgColor] = useState('#0f172a');
  const [shadow, setShadow] = useState(true);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setProcessedUrl(null);
    const selected = e.target.files?.[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file.');
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImage({
        file: selected,
        url: URL.createObjectURL(selected),
        width: img.width,
        height: img.height,
        name: selected.name,
      });
    };
    img.src = URL.createObjectURL(selected);
  };

  const applyRoundedCorners = () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const pad = Math.floor((padding / 100) * Math.min(img.width, img.height));
        canvas.width = img.width + pad * 2;
        canvas.height = img.height + pad * 2;
        const ctx = canvas.getContext('2d');

        // Draw outer background
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Apply shadow if checked
        if (shadow) {
          ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
          ctx.shadowBlur = Math.max(15, Math.floor(pad / 2));
          ctx.shadowOffsetY = Math.max(8, Math.floor(pad / 4));
        }

        // Draw rounded rectangle clip path
        const r = Math.floor((radius / 100) * Math.min(img.width, img.height));
        ctx.beginPath();
        ctx.roundRect(pad, pad, img.width, img.height, r);
        ctx.closePath();

        ctx.save();
        ctx.clip();
        ctx.drawImage(img, pad, pad, img.width, img.height);
        ctx.restore();

        canvas.toBlob((blob) => {
          if (blob) {
            setProcessedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not apply rounded corners.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error applying rounded corners offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedUrl || !image) return;
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = `rounded-screenshot-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-violet-500/10 border border-violet-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
            <Square className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Rounded Corners & Shadow Generator (macOS Screenshots)</h1>
            <p className="text-sm text-[#676879]">Add sleek rounded corners, padding backgrounds, and soft drop shadows to screenshots offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-violet-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Screenshot beautification happens offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-violet-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-violet-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop screenshot or photo to beautify here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP images</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Square className="w-8 h-8 text-violet-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setProcessedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Screenshot
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-white/5 items-center">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Corner Radius ({radius}%)</label>
              <input type="range" min="0" max="50" value={radius} onChange={(e) => { setRadius(Number(e.target.value)); setProcessedUrl(null); }} className="w-full accent-violet-400" />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Frame Padding ({padding}%)</label>
              <input type="range" min="0" max="60" value={padding} onChange={(e) => { setPadding(Number(e.target.value)); setProcessedUrl(null); }} className="w-full accent-violet-400" />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Frame Color</label>
              <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setProcessedUrl(null); }} className="w-full h-8 bg-transparent rounded cursor-pointer" />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1f2532] mt-4">
                <input type="checkbox" checked={shadow} onChange={(e) => { setShadow(e.target.checked); setProcessedUrl(null); }} className="rounded bg-black border-[#d0d4e4] accent-violet-400" />
                <span>Soft Drop Shadow</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-4">
              <img src={processedUrl || image.url} alt="Beautified screenshot" className="max-h-64 object-contain rounded" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={applyRoundedCorners}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-violet-500 text-black font-bold hover:bg-violet-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Beautifying Screenshot...</span>
                </>
              ) : (
                <>
                  <Square className="w-5 h-5" />
                  <span>Apply Corners & Shadow</span>
                </>
              )}
            </button>

            {processedUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Beautified PNG</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
