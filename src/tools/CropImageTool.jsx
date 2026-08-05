import React, { useState, useRef, useEffect } from 'react';
import { Crop, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Maximize2, Sliders } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function CropImageTool() {
  const [image, setImage] = useState(null);
  const [aspect, setAspect] = useState('free'); // free, 1:1, 4:3, 16:9, 9:16
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, w: 80, h: 80 }); // percentages
  const [croppedUrl, setCroppedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setCroppedUrl(null);
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
      setCropBox({ x: 15, y: 15, w: 70, h: 70 });
    };
    img.src = URL.createObjectURL(selected);
  };

  const handleAspectChange = (preset) => {
    setAspect(preset);
    setCroppedUrl(null);
    if (preset === '1:1') {
      setCropBox({ x: 20, y: 20, w: 60, h: 60 });
    } else if (preset === '16:9') {
      setCropBox({ x: 10, y: 25, w: 80, h: 45 });
    } else if (preset === '9:16') {
      setCropBox({ x: 30, y: 10, w: 40, h: 70 });
    } else if (preset === '4:3') {
      setCropBox({ x: 15, y: 20, w: 70, h: 52 });
    }
  };

  const performCrop = () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const sx = (cropBox.x / 100) * img.width;
        const sy = (cropBox.y / 100) * img.height;
        const sw = (cropBox.w / 100) * img.width;
        const sh = (cropBox.h / 100) * img.height;

        canvas.width = Math.max(10, Math.floor(sw));
        canvas.height = Math.max(10, Math.floor(sh));
        const ctx = canvas.getContext('2d');

        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setCroppedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not crop image.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error cropping image offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!croppedUrl || !image) return;
    const a = document.createElement('a');
    a.href = croppedUrl;
    a.download = `cropped-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-sky-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Crop className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Crop IMAGE (Aspect Ratio & Custom Box)</h1>
            <p className="text-sm text-[#676879]">Crop JPG, PNG, WEBP, or GIF images with visual rectangle controls and aspect ratio presets.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Cropping is processed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-cyan-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop image file to crop here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, WEBP, SVG, and GIF</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Crop className="w-8 h-8 text-cyan-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px original</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setCroppedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace Image
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#9ca3af] mr-1">Preset Ratios:</span>
            {['free', '1:1', '4:3', '16:9', '9:16'].map((preset) => (
              <button
                key={preset}
                onClick={() => handleAspectChange(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  aspect === preset
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-white text-[#9ca3af] hover:text-[#1f2532] border border-[#e6e9ef]'
                }`}
              >
                {preset.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Crop Box Sliders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-white/5">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Left X (%): {cropBox.x}%</label>
              <input
                type="range"
                min="0"
                max="90"
                value={cropBox.x}
                onChange={(e) => {
                  setCropBox({ ...cropBox, x: Number(e.target.value) });
                  setCroppedUrl(null);
                }}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Top Y (%): {cropBox.y}%</label>
              <input
                type="range"
                min="0"
                max="90"
                value={cropBox.y}
                onChange={(e) => {
                  setCropBox({ ...cropBox, y: Number(e.target.value) });
                  setCroppedUrl(null);
                }}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Width (%): {cropBox.w}%</label>
              <input
                type="range"
                min="10"
                max={100 - cropBox.x}
                value={cropBox.w}
                onChange={(e) => {
                  setCropBox({ ...cropBox, w: Number(e.target.value) });
                  setCroppedUrl(null);
                }}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Height (%): {cropBox.h}%</label>
              <input
                type="range"
                min="10"
                max={100 - cropBox.y}
                value={cropBox.h}
                onChange={(e) => {
                  setCropBox({ ...cropBox, h: Number(e.target.value) });
                  setCroppedUrl(null);
                }}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Preview Container */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={image.url} alt="Original" className="max-h-64 object-contain rounded opacity-80" />
              {/* Overlay crop box indicator */}
              <div
                className="absolute border-2 border-cyan-400 bg-cyan-500/20 pointer-events-none rounded transition-all"
                style={{
                  left: `${cropBox.x}%`,
                  top: `${cropBox.y}%`,
                  width: `${cropBox.w}%`,
                  height: `${cropBox.h}%`,
                }}
              />
            </div>

            {croppedUrl && (
              <div className="bg-white border border-emerald-500/30 rounded-xl p-3 flex flex-col items-center">
                <span className="text-xs font-bold text-emerald-400 mb-2">Cropped Output:</span>
                <img src={croppedUrl} alt="Cropped" className="max-h-56 object-contain rounded" />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={performCrop}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Cropping Image...</span>
                </>
              ) : (
                <>
                  <Crop className="w-5 h-5" />
                  <span>Crop Image Selection</span>
                </>
              )}
            </button>

            {croppedUrl && (
              <>
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Cropped Image</span>
                </button>
                <NativeShareButton
                  fileUrl={croppedUrl}
                  fileName={`cropped-${image.name}`}
                  mimeType="image/png"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
