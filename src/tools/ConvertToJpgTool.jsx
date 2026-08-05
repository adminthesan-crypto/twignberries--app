import React, { useState } from 'react';
import { FileImage, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Trash2, Sliders } from 'lucide-react';

export default function ConvertToJpgTool() {
  const [images, setImages] = useState([]);
  const [quality, setQuality] = useState(0.92); // JPG quality 0.1 to 1.0
  const [converted, setConverted] = useState({}); // idx -> url
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setConverted({});
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) {
      setErrorMsg('Please upload valid image files (PNG, WEBP, GIF, SVG).');
      return;
    }
    const newImgs = valid.map((f) => ({
      file: f,
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setImages([...images, ...newImgs]);
  };

  const handleRemove = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
    const nextConv = { ...converted };
    delete nextConv[idx];
    setConverted(nextConv);
  };

  const convertAllToJpg = () => {
    if (images.length === 0) return;
    setLoading(true);
    setErrorMsg(null);
    const newConverted = {};
    let completed = 0;

    images.forEach((imgObj, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        // Fill white background for transparent PNG/SVG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            newConverted[idx] = {
              blob,
              url: URL.createObjectURL(blob),
              size: (blob.size / 1024).toFixed(1),
            };
          }
          completed++;
          if (completed === images.length) {
            setConverted(newConverted);
            setLoading(false);
          }
        }, 'image/jpeg', Number(quality));
      };
      img.onerror = () => {
        completed++;
        if (completed === images.length) {
          setConverted(newConverted);
          setLoading(false);
        }
      };
      img.src = imgObj.url;
    });
  };

  const downloadOne = (idx) => {
    const item = converted[idx];
    if (!item) return;
    const origName = images[idx]?.name || 'image';
    const a = document.createElement('a');
    a.href = item.url;
    a.download = `${origName.replace(/\.[^/.]+$/, '')}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <FileImage className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Convert to JPG (Bulk PNG, WEBP, SVG to JPG)</h1>
            <p className="text-sm text-[#676879]">Turn PNG, WEBP, GIF, BMP, or SVG files into high-quality JPG images in bulk offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Images are converted offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Controls */}
      <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-black font-semibold cursor-pointer hover:bg-amber-400 transition-all text-sm shadow-md">
            <Upload className="w-4 h-4" />
            <span>Upload PNG, WEBP, SVG, GIF</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>JPG Quality ({Math.round(quality * 100)}%):</span>
            <input
              type="range"
              min="0.4"
              max="1.0"
              step="0.05"
              value={quality}
              onChange={(e) => { setQuality(Number(e.target.value)); setConverted({}); }}
              className="accent-amber-400 w-28"
            />
          </div>
        </div>

        {images.length > 0 ? (
          <div className="space-y-3">
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e6e9ef]">
                <div className="flex items-center gap-3 truncate">
                  <img src={img.url} alt={img.name} className="w-10 h-10 object-contain rounded bg-white" />
                  <div className="truncate">
                    <p className="text-[#1f2532] text-sm font-medium truncate">{img.name}</p>
                    {converted[idx] && (
                      <p className="text-xs text-emerald-400">Converted to JPG • {converted[idx].size} KB</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {converted[idx] && (
                    <button
                      onClick={() => downloadOne(idx)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all"
                    >
                      Download JPG
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#9ca3af] border-2 border-dashed border-[#e6e9ef] rounded-xl">
            <p>No images uploaded yet. Select PNG, WEBP, or SVG files to convert to JPG.</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="flex justify-end pt-4 border-t border-[#e6e9ef]">
            <button
              onClick={convertAllToJpg}
              disabled={loading}
              className="py-3 px-6 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Converting {images.length} Images...</span>
                </>
              ) : (
                <>
                  <FileImage className="w-5 h-5" />
                  <span>Convert All to JPG</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
