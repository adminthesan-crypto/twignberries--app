import React, { useState } from 'react';
import { Eraser, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Sliders, Check } from 'lucide-react';

export default function RemoveBgImageTool() {
  const [image, setImage] = useState(null);
  const [targetColor, setTargetColor] = useState('#FFFFFF'); // color to remove
  const [tolerance, setTolerance] = useState(35); // 0 - 100
  const [removedUrl, setRemovedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setRemovedUrl(null);
    const selected = e.target.files?.[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP).');
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

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 255, g: 255, b: 255 };
  };

  const performRemoveBg = () => {
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
        const target = hexToRgb(targetColor);
        const tol = (tolerance / 100) * 441; // Euclidean distance max ~441

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const dist = Math.sqrt((r - target.r) ** 2 + (g - target.g) ** 2 + (b - target.b) ** 2);
          if (dist <= tol) {
            data[i + 3] = 0; // Transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setRemovedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not remove background.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error removing background offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!removedUrl || !image) return;
    const a = document.createElement('a');
    a.href = removedUrl;
    a.download = `transparent-${image.name.replace(/\.[^/.]+$/, '')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-fuchsia-500/10 border border-fuchsia-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
            <Eraser className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Remove Background (Transparent PNG Cutout)</h1>
            <p className="text-sm text-[#676879]">Instantly erase white, green, or solid backgrounds and export a transparent PNG cutout offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-fuchsia-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Background removal is computed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-fuchsia-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-fuchsia-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-3">Drop image to remove background here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP photos</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Eraser className="w-8 h-8 text-fuchsia-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setRemovedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-white/5">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-3">Background Color to Remove</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={targetColor}
                  onChange={(e) => { setTargetColor(e.target.value); setRemovedUrl(null); }}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-[#d0d4e4]"
                />
                <div className="flex gap-1.5">
                  {[
                    { hex: '#FFFFFF', label: 'White' },
                    { hex: '#00FF00', label: 'Green Screen' },
                    { hex: '#000000', label: 'Black' },
                  ].map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() => { setTargetColor(preset.hex); setRemovedUrl(null); }}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        targetColor === preset.hex ? 'bg-fuchsia-500 text-black' : 'bg-gray-100 text-[#1f2532]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-3">Removal Tolerance ({tolerance}%)</label>
              <input
                type="range"
                min="5"
                max="80"
                value={tolerance}
                onChange={(e) => { setTolerance(Number(e.target.value)); setRemovedUrl(null); }}
                className="w-full accent-fuchsia-400 mt-2"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div
              className="relative border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-4"
              style={{
                backgroundImage: `radial-gradient(#ffffff22 15%, transparent 16%)`,
                backgroundSize: '16px 16px',
                backgroundColor: '#0d0d12',
              }}
            >
              <img src={removedUrl || image.url} alt="Cutout preview" className="max-h-64 object-contain" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={performRemoveBg}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-fuchsia-500 text-black font-bold hover:bg-fuchsia-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Removing Background...</span>
                </>
              ) : (
                <>
                  <Eraser className="w-5 h-5" />
                  <span>Remove Background Now</span>
                </>
              )}
            </button>

            {removedUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Transparent PNG</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
