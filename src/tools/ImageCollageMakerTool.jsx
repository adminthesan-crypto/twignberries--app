import React, { useState } from 'react';
import { Layout, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Trash2, Plus } from 'lucide-react';

export default function ImageCollageMakerTool() {
  const [images, setImages] = useState([]);
  const [layout, setLayout] = useState('2-side'); // 2-side, 3-story, 4-grid
  const [gap, setGap] = useState(20);
  const [bgColor, setBgColor] = useState('#0d0d12');
  const [collageUrl, setCollageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setCollageUrl(null);
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) return;
    const newImgs = valid.map((f) => ({
      file: f,
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setImages([...images, ...newImgs].slice(0, 4)); // max 4 photos
  };

  const removeImg = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
    setCollageUrl(null);
  };

  const generateCollage = () => {
    if (images.length === 0) return;
    setLoading(true);
    setErrorMsg(null);

    const canvas = document.createElement('canvas');
    const w = 1200;
    const h = layout === '3-story' ? 1600 : 1200;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);

    let loaded = 0;
    const imgElements = [];

    images.forEach((imgObj, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imgElements[idx] = img;
        loaded++;
        if (loaded === images.length) {
          drawAll(ctx, imgElements, w, h);
        }
      };
      img.src = imgObj.url;
    });

    const drawAll = (ctx, imgs, w, h) => {
      const g = gap;
      if (layout === '2-side' || (layout === '4-grid' && imgs.length <= 2)) {
        const boxW = (w - g * 3) / 2;
        const boxH = h - g * 2;
        imgs.forEach((img, i) => {
          if (i > 1) return;
          const x = g + i * (boxW + g);
          ctx.drawImage(img, x, g, boxW, boxH);
        });
      } else if (layout === '3-story') {
        const boxW = w - g * 2;
        const boxH = (h - g * 4) / 3;
        imgs.forEach((img, i) => {
          if (i > 2) return;
          const y = g + i * (boxH + g);
          ctx.drawImage(img, g, y, boxW, boxH);
        });
      } else if (layout === '4-grid') {
        const boxW = (w - g * 3) / 2;
        const boxH = (h - g * 3) / 2;
        imgs.forEach((img, i) => {
          if (i > 3) return;
          const r = Math.floor(i / 2);
          const c = i % 2;
          const x = g + c * (boxW + g);
          const y = g + r * (boxH + g);
          ctx.drawImage(img, x, y, boxW, boxH);
        });
      }

      canvas.toBlob((blob) => {
        if (blob) {
          setCollageUrl(URL.createObjectURL(blob));
        } else {
          setErrorMsg('Could not render photo collage.');
        }
        setLoading(false);
      }, 'image/png');
    };
  };

  const handleDownload = () => {
    if (!collageUrl) return;
    const a = document.createElement('a');
    a.href = collageUrl;
    a.download = `photo-collage-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Photo Collage Maker (2, 3, 4 Image Layouts)</h1>
            <p className="text-sm text-[#9ca3af]">Combine up to 4 photos into side-by-side comparisons, Instagram stories, or square grids offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Photo collages are stitched offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-black font-semibold cursor-pointer hover:bg-amber-400 transition-all text-sm shadow-md">
            <Plus className="w-4 h-4" />
            <span>Add Photos ({images.length}/4)</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: '2-side', label: '2 Side-by-Side' },
              { id: '3-story', label: '3 Vertical Stack' },
              { id: '4-grid', label: '4 Square Grid' },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => { setLayout(l.id); setCollageUrl(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  layout === l.id ? 'bg-amber-500 text-black' : 'bg-white/10 text-white'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden p-2 group">
                <img src={img.url} alt={img.name} className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => removeImg(idx)}
                  className="absolute top-2 right-2 p-1 rounded bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#9ca3af] border-2 border-dashed border-white/10 rounded-xl">
            <p>No photos added yet. Upload 2, 3, or 4 photos to generate a collage.</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <label className="text-[10px] text-[#9ca3af] block">Border Gap ({gap}px)</label>
                  <input type="range" min="0" max="60" value={gap} onChange={(e) => { setGap(Number(e.target.value)); setCollageUrl(null); }} className="accent-amber-400" />
                </div>
                <div>
                  <label className="text-[10px] text-[#9ca3af] block">Border Color</label>
                  <input type="color" value={bgColor} onChange={(e) => { setBgColor(e.target.value); setCollageUrl(null); }} className="w-8 h-8 rounded cursor-pointer bg-transparent" />
                </div>
              </div>

              <button
                onClick={generateCollage}
                disabled={loading}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Layout className="w-5 h-5" />}
                <span>Render Photo Collage</span>
              </button>
            </div>

            {collageUrl && (
              <div className="space-y-3 pt-2">
                <img src={collageUrl} alt="Collage" className="max-h-80 mx-auto object-contain rounded-xl border border-white/10 shadow-lg" />
                <button
                  onClick={handleDownload}
                  className="w-full py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Photo Collage</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
