import React, { useState } from 'react';
import { Image, Upload, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ImagePaletteTool() {
  const [file, setFile] = useState(null);
  const [colors, setColors] = useState([]);
  const [copiedHex, setCopiedHex] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setColors([]);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setErrorMsg(`"${selected.name}" is not a valid image file.`);
      return;
    }

    setFile(selected);
    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);

    const img = new window.Image();
    img.onload = () => extractPalette(img);
    img.onerror = () => setErrorMsg('Failed to load image.');
    img.src = url;
  };

  const extractPalette = (imgEl) => {
    try {
      const canvas = document.createElement('canvas');
      const w = Math.min(100, imgEl.width);
      const h = Math.min(100, imgEl.height);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, w, h);

      const data = ctx.getImageData(0, 0, w, h).data;
      const colorMap = {};

      for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
        const r = Math.round(data[i] / 24) * 24;
        const g = Math.round(data[i + 1] / 24) * 24;
        const b = Math.round(data[i + 2] / 24) * 24;
        const a = data[i + 3];
        if (a < 128) continue; // skip transparent

        const hex = '#' + [r, g, b].map((x) => Math.min(255, x).toString(16).padStart(2, '0')).join('').toUpperCase();
        colorMap[hex] = (colorMap[hex] || 0) + 1;
      }

      const sorted = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([hex]) => hex);

      setColors(sorted);
    } catch (err) {
      setErrorMsg(`Palette extraction error: ${err.message}`);
    }
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-4">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Image Palette Extractor
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Drop a brand logo or inspirational photo to automatically extract the top 10 dominant hex colors right in your browser."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-4 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {!file ? (
        <label className="dropzone">
          <div className="dropzone-icon"><Upload size={28} /></div>
          <span className="dropzone-title">
            Drop Image file to extract hex colors
          </span>
          <span className="dropzone-sub">
            PNG, JPG, WEBP, SVG • Offline Canvas Sampling
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-6 pb-4 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-6">
              <Image className="text-[#6161ff]" size={24} />
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
            </div>
            <button
              onClick={() => { setFile(null); setColors([]); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50"
            >
              Change Image
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center p-6 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef]">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Uploaded Source"
                  className="max-h-[320px] rounded-lg shadow-md border border-[#e6e9ef]"
                />
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div style={{ ...SL, marginBottom: 0 }}>Extracted Dominant Palette (Click Hex to Copy)</div>
                {colors.length > 0 && (
                  <NativeShareButton text={colors.join(', ')} />
                )}
              </div>
              <div className="grid grid-cols-2 gap-5">
                {colors.map((hex, i) => (
                  <button
                    key={hex}
                    onClick={() => copyToClipboard(hex)}
                    className="flex items-center justify-between p-6 rounded-xl border border-[#e6e9ef] hover:border-[#6161ff] transition bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className="w-7 h-7 rounded-lg border border-black/10 shadow-inner"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="font-mono font-bold text-sm text-[#1f2532]">{hex}</span>
                    </div>
                    {copiedHex === hex ? (
                      <Check size={16} className="text-green-600" />
                    ) : (
                      <Copy size={16} className="text-[#868894]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
