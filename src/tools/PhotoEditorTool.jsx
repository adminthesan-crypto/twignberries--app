import React, { useState } from 'react';
import { Sliders, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Sun, Contrast, Droplet, Eye } from 'lucide-react';

export default function PhotoEditorTool() {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [blur, setBlur] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [editedUrl, setEditedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setEditedUrl(null);
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

  const applyFilters = () => {
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

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%)`;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            setEditedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not apply photo edits.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error editing photo offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!editedUrl || !image) return;
    const a = document.createElement('a');
    a.href = editedUrl;
    a.download = `edited-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 border border-rose-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Photo Editor (Brightness, Contrast & Filters)</h1>
            <p className="text-sm text-[#9ca3af]">Adjust photo brightness, contrast, saturation, blur, and sepia color filters offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-rose-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Photos are edited offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-white/20 hover:border-rose-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-white/[0.02] hover:bg-white/[0.04]">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drop image to edit here</p>
          <p className="text-xs text-[#9ca3af]">Supports JPG, PNG, and WEBP photos</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Sliders className="w-8 h-8 text-rose-400" />
              <div>
                <p className="text-white font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setEditedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10"
            >
              Replace Photo
            </button>
          </div>

          {/* Filter Sliders */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-black/30 p-4 rounded-xl border border-white/5">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Brightness ({brightness}%)</label>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => { setBrightness(Number(e.target.value)); setEditedUrl(null); }}
                className="w-full accent-rose-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Contrast ({contrast}%)</label>
              <input
                type="range"
                min="0"
                max="200"
                value={contrast}
                onChange={(e) => { setContrast(Number(e.target.value)); setEditedUrl(null); }}
                className="w-full accent-rose-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Saturation ({saturation}%)</label>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => { setSaturation(Number(e.target.value)); setEditedUrl(null); }}
                className="w-full accent-rose-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Blur ({blur}px)</label>
              <input
                type="range"
                min="0"
                max="20"
                value={blur}
                onChange={(e) => { setBlur(Number(e.target.value)); setEditedUrl(null); }}
                className="w-full accent-rose-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Sepia ({sepia}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={sepia}
                onChange={(e) => { setSepia(Number(e.target.value)); setEditedUrl(null); }}
                className="w-full accent-rose-400"
              />
            </div>
          </div>

          {/* Live CSS filter preview */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img
                src={editedUrl || image.url}
                alt="Edited preview"
                className="max-h-64 object-contain rounded"
                style={!editedUrl ? { filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px) sepia(${sepia}%)` } : {}}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={applyFilters}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-rose-500 text-black font-bold hover:bg-rose-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Rendering Edits...</span>
                </>
              ) : (
                <>
                  <Sliders className="w-5 h-5" />
                  <span>Render Photo Edits</span>
                </>
              )}
            </button>

            {editedUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Edited Photo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
