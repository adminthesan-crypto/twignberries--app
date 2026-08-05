import React, { useState } from 'react';
import { Stamp, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Type, Sliders, Layout } from 'lucide-react';

export default function WatermarkImageTool() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('PAHRULI COPYRIGHT');
  const [opacity, setOpacity] = useState(0.4);
  const [fontSize, setFontSize] = useState(36);
  const [position, setPosition] = useState('center'); // center, bottom-right, tiled
  const [color, setColor] = useState('#FFFFFF');
  const [watermarkedUrl, setWatermarkedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setWatermarkedUrl(null);
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

  const applyWatermark = () => {
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

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (position === 'center') {
          ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        } else if (position === 'bottom-right') {
          ctx.textAlign = 'right';
          ctx.fillText(text, canvas.width - 40, canvas.height - 40);
        } else if (position === 'tiled') {
          ctx.rotate((-30 * Math.PI) / 180);
          for (let x = -canvas.width; x < canvas.width * 2; x += 300) {
            for (let y = -canvas.height; y < canvas.height * 2; y += 150) {
              ctx.fillText(text, x, y);
            }
          }
        }

        canvas.toBlob((blob) => {
          if (blob) {
            setWatermarkedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not apply watermark.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error generating watermark offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!watermarkedUrl || !image) return;
    const a = document.createElement('a');
    a.href = watermarkedUrl;
    a.download = `watermarked-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Stamp className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Watermark IMAGE (Text Stamp & Copyright)</h1>
            <p className="text-sm text-[#676879]">Stamp custom text or copyright notices over images with adjustable opacity, tiled mode, or corners.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Watermarks are stamped offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-purple-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop image to watermark here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP images</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Stamp className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setWatermarkedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-white/5">
            <div className="sm:col-span-2">
              <label className="text-[11px] text-[#9ca3af] block mb-1">Watermark Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => { setText(e.target.value); setWatermarkedUrl(null); }}
                className="w-full bg-white border border-[#e6e9ef] rounded-lg px-3 py-1.5 text-[#1f2532] text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Position Mode</label>
              <select
                value={position}
                onChange={(e) => { setPosition(e.target.value); setWatermarkedUrl(null); }}
                className="w-full bg-white border border-[#e6e9ef] rounded-lg px-2 py-1.5 text-[#1f2532] text-sm"
              >
                <option value="center">Center Stamp</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="tiled">Repeated Diagonal Tiles</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Opacity ({Math.round(opacity * 100)}%)</label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => { setOpacity(Number(e.target.value)); setWatermarkedUrl(null); }}
                className="w-full accent-purple-400 mt-1"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={watermarkedUrl || image.url} alt="Watermark preview" className="max-h-64 object-contain rounded" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={applyWatermark}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-purple-500 text-black font-bold hover:bg-purple-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Stamping Watermark...</span>
                </>
              ) : (
                <>
                  <Stamp className="w-5 h-5" />
                  <span>Apply Watermark Stamp</span>
                </>
              )}
            </button>

            {watermarkedUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Watermarked Image</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
