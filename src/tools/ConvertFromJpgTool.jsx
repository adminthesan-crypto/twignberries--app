import React, { useState } from 'react';
import { FileImage, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Trash2, Sliders } from 'lucide-react';

export default function ConvertFromJpgTool() {
  const [images, setImages] = useState([]);
  const [targetFormat, setTargetFormat] = useState('image/png'); // image/png, image/webp
  const [converted, setConverted] = useState({}); // idx -> url
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const formatNames = {
    'image/png': 'PNG (Lossless & Transparent)',
    'image/webp': 'WEBP (Next-Gen Web)',
  };

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setConverted({});
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.type.includes('jpeg') || f.type.includes('jpg') || f.name.match(/\.jpe?g$/i));
    if (valid.length === 0) {
      setErrorMsg('Please upload valid JPG / JPEG image files.');
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

  const convertAllFromJpg = () => {
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
        }, targetFormat, 0.95);
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
    const ext = targetFormat === 'image/png' ? 'png' : 'webp';
    const a = document.createElement('a');
    a.href = item.url;
    a.download = `${origName.replace(/\.[^/.]+$/, '')}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
            <FileImage className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Convert from JPG (JPG to PNG or WEBP)</h1>
            <p className="text-sm text-[#9ca3af]">Turn JPG and JPEG images into lossless PNG or modern WEBP files in bulk offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-yellow-400 font-medium">
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
      <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-500 text-black font-semibold cursor-pointer hover:bg-yellow-400 transition-all text-sm shadow-md">
            <Upload className="w-4 h-4" />
            <span>Upload JPG / JPEG Images</span>
            <input type="file" accept="image/jpeg,image/jpg" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
            <Sliders className="w-4 h-4 text-yellow-400" />
            <span>Target Format:</span>
            <select
              value={targetFormat}
              onChange={(e) => { setTargetFormat(e.target.value); setConverted({}); }}
              className="bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-white"
            >
              <option value="image/png">PNG (.png)</option>
              <option value="image/webp">WEBP (.webp)</option>
            </select>
          </div>
        </div>

        {images.length > 0 ? (
          <div className="space-y-3">
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center gap-3 truncate">
                  <img src={img.url} alt={img.name} className="w-10 h-10 object-contain rounded bg-white/5" />
                  <div className="truncate">
                    <p className="text-white text-sm font-medium truncate">{img.name}</p>
                    {converted[idx] && (
                      <p className="text-xs text-emerald-400">Converted to {targetFormat === 'image/png' ? 'PNG' : 'WEBP'} • {converted[idx].size} KB</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {converted[idx] && (
                    <button
                      onClick={() => downloadOne(idx)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-all"
                    >
                      Download {targetFormat === 'image/png' ? 'PNG' : 'WEBP'}
                    </button>
                  )}
                  <button
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#9ca3af] border-2 border-dashed border-white/10 rounded-xl">
            <p>No JPG images uploaded yet. Select JPG / JPEG files to convert.</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              onClick={convertAllFromJpg}
              disabled={loading}
              className="py-3 px-6 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Converting {images.length} Images...</span>
                </>
              ) : (
                <>
                  <FileImage className="w-5 h-5" />
                  <span>Convert All to {targetFormat === 'image/png' ? 'PNG' : 'WEBP'}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
