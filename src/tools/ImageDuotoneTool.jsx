import React, { useState } from 'react';
import { Sparkles, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Palette } from 'lucide-react';

export default function ImageDuotoneTool() {
  const [image, setImage] = useState(null);
  const [preset, setPreset] = useState('spotify'); // spotify, cyberpunk, sunset, sepia
  const [duotoneUrl, setDuotoneUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const presets = {
    spotify: { name: 'Spotify Green & Dark', dark: [13, 24, 33], light: [30, 215, 96] },
    cyberpunk: { name: 'Cyberpunk Neon Pink & Blue', dark: [24, 0, 80], light: [0, 240, 255] },
    sunset: { name: 'Sunset Warm Gold & Red', dark: [50, 0, 20], light: [255, 180, 0] },
    vintage: { name: 'Vintage Sepia Gold', dark: [40, 25, 15], light: [230, 210, 180] },
  };

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setDuotoneUrl(null);
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

  const applyDuotone = () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const p = presets[preset];

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Grayscale luminance
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          data[i] = Math.round(p.dark[0] + lum * (p.light[0] - p.dark[0]));
          data[i + 1] = Math.round(p.dark[1] + lum * (p.light[1] - p.dark[1]));
          data[i + 2] = Math.round(p.dark[2] + lum * (p.light[2] - p.dark[2]));
        }

        ctx.putImageData(imgData, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setDuotoneUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not apply duotone filter.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error applying duotone filter offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!duotoneUrl || !image) return;
    const a = document.createElement('a');
    a.href = duotoneUrl;
    a.download = `${preset}-duotone-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 border border-pink-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Duotone & Color Tint Filter (Spotify & Cyberpunk)</h1>
            <p className="text-sm text-[#676879]">Apply stylish Spotify-style two-color duotone gradients and cyberpunk tints to photos offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-pink-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Color filters are mapped offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-pink-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-pink-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-3">Drop photo to apply duotone filter here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP photos</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-pink-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setDuotoneUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Photo
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-white/5">
            <span className="text-xs font-semibold text-[#9ca3af]">Duotone Theme:</span>
            {Object.entries(presets).map(([key, item]) => (
              <button
                key={key}
                onClick={() => { setPreset(key); setDuotoneUrl(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  preset === key ? 'bg-pink-500 text-black' : 'bg-gray-100 text-[#1f2532]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={duotoneUrl || image.url} alt="Duotone preview" className="max-h-64 object-contain rounded" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={applyDuotone}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-pink-500 text-black font-bold hover:bg-pink-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Applying Duotone...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Apply Duotone Filter</span>
                </>
              )}
            </button>

            {duotoneUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Duotone Photo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
