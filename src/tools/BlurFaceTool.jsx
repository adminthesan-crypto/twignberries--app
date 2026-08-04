import React, { useState, useRef } from 'react';
import { EyeOff, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Trash2, Sliders } from 'lucide-react';

export default function BlurFaceTool() {
  const [image, setImage] = useState(null);
  const [blurBoxes, setBlurBoxes] = useState([]); // { x, y, w, h } in percentages
  const [blurIntensity, setBlurIntensity] = useState(15);
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
      // Add one default blur box in the center top (face area)
      setBlurBoxes([{ x: 35, y: 20, w: 30, h: 25 }]);
    };
    img.src = URL.createObjectURL(selected);
  };

  const addBlurBox = () => {
    setBlurBoxes([...blurBoxes, { x: 40, y: 40, w: 20, h: 20 }]);
    setProcessedUrl(null);
  };

  const removeBlurBox = (idx) => {
    setBlurBoxes(blurBoxes.filter((_, i) => i !== idx));
    setProcessedUrl(null);
  };

  const updateBox = (idx, key, val) => {
    const next = [...blurBoxes];
    next[idx][key] = Number(val);
    setBlurBoxes(next);
    setProcessedUrl(null);
  };

  const applyPrivacyBlur = () => {
    if (!image || blurBoxes.length === 0) return;
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

        // Apply pixelate/blur on selected boxes
        blurBoxes.forEach((box) => {
          const bx = Math.floor((box.x / 100) * img.width);
          const by = Math.floor((box.y / 100) * img.height);
          const bw = Math.floor((box.w / 100) * img.width);
          const bh = Math.floor((box.h / 100) * img.height);

          // Mosaic / Pixelate effect for strong privacy
          const pixelSize = Math.max(8, Math.floor(blurIntensity * (img.width / 500)));
          for (let y = by; y < by + bh; y += pixelSize) {
            for (let x = bx; x < bx + bw; x += pixelSize) {
              const p = ctx.getImageData(x, y, 1, 1).data;
              ctx.fillStyle = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
              ctx.fillRect(x, y, pixelSize, pixelSize);
            }
          }
        });

        canvas.toBlob((blob) => {
          if (blob) {
            setProcessedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not apply privacy blur.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error applying privacy blur offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedUrl || !image) return;
    const a = document.createElement('a');
    a.href = processedUrl;
    a.download = `privacy-blurred-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500/10 via-rose-500/10 to-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Blur Face & Privacy Redactor (Faces & License Plates)</h1>
            <p className="text-sm text-[#9ca3af]">Easily blur out faces, license plates, addresses, and sensitive details in photos offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Photos and privacy redactions are processed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-white/20 hover:border-red-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-white/[0.02] hover:bg-white/[0.04]">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drop photo to redact faces/plates here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP photos</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <EyeOff className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-white font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={addBlurBox}
                className="px-3 py-1.5 text-xs font-bold bg-red-500 text-black rounded-lg hover:bg-red-400"
              >
                + Add Blur Region
              </button>
              <button
                onClick={() => { setImage(null); setProcessedUrl(null); }}
                className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10"
              >
                Replace Photo
              </button>
            </div>
          </div>

          {/* Region Sliders */}
          <div className="space-y-3">
            {blurBoxes.map((box, idx) => (
              <div key={idx} className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-black/30 p-3 rounded-xl border border-white/5 items-center">
                <span className="text-xs font-bold text-red-400">Region #{idx + 1}</span>
                <div>
                  <label className="text-[10px] text-[#9ca3af]">X (%): {box.x}%</label>
                  <input type="range" min="0" max="90" value={box.x} onChange={(e) => updateBox(idx, 'x', e.target.value)} className="w-full accent-red-400" />
                </div>
                <div>
                  <label className="text-[10px] text-[#9ca3af]">Y (%): {box.y}%</label>
                  <input type="range" min="0" max="90" value={box.y} onChange={(e) => updateBox(idx, 'y', e.target.value)} className="w-full accent-red-400" />
                </div>
                <div>
                  <label className="text-[10px] text-[#9ca3af]">Size (%): {box.w}% × {box.h}%</label>
                  <input type="range" min="5" max="80" value={box.w} onChange={(e) => { updateBox(idx, 'w', e.target.value); updateBox(idx, 'h', e.target.value); }} className="w-full accent-red-400" />
                </div>
                <button onClick={() => removeBlurBox(idx)} className="p-1.5 text-red-400 hover:text-red-300 ml-auto">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={processedUrl || image.url} alt="Privacy preview" className="max-h-64 object-contain rounded" />
              {!processedUrl && blurBoxes.map((box, idx) => (
                <div
                  key={idx}
                  className="absolute border-2 border-red-500 bg-red-500/20 pointer-events-none rounded transition-all"
                  style={{
                    left: `${box.x}%`,
                    top: `${box.y}%`,
                    width: `${box.w}%`,
                    height: `${box.h}%`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={applyPrivacyBlur}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-red-500 text-black font-bold hover:bg-red-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Applying Privacy Blur...</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-5 h-5" />
                  <span>Apply Privacy Blur Now</span>
                </>
              )}
            </button>

            {processedUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Redacted Photo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
