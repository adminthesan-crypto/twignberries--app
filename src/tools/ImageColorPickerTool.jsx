import React, { useState, useRef } from 'react';
import { Pipette, Upload, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function ImageColorPickerTool() {
  const [image, setImage] = useState(null);
  const [pickedColor, setPickedColor] = useState({ hex: '#38BDF8', rgb: 'rgb(56, 189, 248)', hsl: 'hsl(198, 93%, 60%)' });
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const canvasRef = useRef(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
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

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0], g = pixel[1], b = pixel[2];
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    const rgb = `rgb(${r}, ${g}, ${b})`;
    const hsl = rgbToHsl(r, g, b);

    setPickedColor({ hex, rgb, hsl });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-sky-500/10 border border-sky-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
            <Pipette className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Image Color Picker (Pixel Eyedropper & Palette)</h1>
            <p className="text-sm text-[#676879]">Click any pixel on an uploaded image to inspect and copy its HEX, RGB, and HSL color values offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-sky-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Color sampling is processed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-6 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-sky-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop image to sample colors here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, WEBP, and SVG</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-6">
              <Pipette className="w-8 h-8 text-sky-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px • Click image to sample</p>
              </div>
            </div>
            <button
              onClick={() => setImage(null)}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Image
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-[#e6e9ef] rounded-xl overflow-auto max-h-96 flex items-center justify-center p-2">
              <canvas
                ref={(node) => {
                  if (node && image) {
                    canvasRef.current = node;
                    const img = new Image();
                    img.onload = () => {
                      node.width = img.width;
                      node.height = img.height;
                      const ctx = node.getContext('2d');
                      ctx.drawImage(img, 0, 0);
                    };
                    img.src = image.url;
                  }
                }}
                onClick={handleCanvasClick}
                className="max-h-80 object-contain cursor-crosshair rounded"
              />
            </div>

            <div className="bg-white border border-[#e6e9ef] rounded-xl p-6 space-y-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#9ca3af] block mb-2">Picked Color Preview</span>
                <div
                  className="w-full h-20 rounded-xl border border-[#d0d4e4] shadow-inner flex items-center justify-center text-[#1f2532] font-bold text-sm"
                  style={{ backgroundColor: pickedColor.hex }}
                >
                  {pickedColor.hex}
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'HEX', val: pickedColor.hex },
                  { label: 'RGB', val: pickedColor.rgb },
                  { label: 'HSL', val: pickedColor.hsl },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-white/5">
                    <div>
                      <span className="text-[10px] text-[#9ca3af] block">{item.label}</span>
                      <span className="text-xs font-mono text-[#1f2532]">{item.val}</span>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => copyToClipboard(item.val)}
                        className="p-1.5 rounded bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs flex items-center gap-3"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <NativeShareButton text={item.val} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
