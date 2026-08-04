import React, { useState } from 'react';
import { RotateCw, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Trash2, FlipHorizontal, FlipVertical } from 'lucide-react';

export default function RotateImageTool() {
  const [images, setImages] = useState([]);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [processed, setProcessed] = useState({}); // idx -> url
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setProcessed({});
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) {
      setErrorMsg('Please upload valid image files (PNG, JPG, WEBP).');
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
    const nextProc = { ...processed };
    delete nextProc[idx];
    setProcessed(nextProc);
  };

  const rotateAllImages = () => {
    if (images.length === 0) return;
    setLoading(true);
    setErrorMsg(null);
    const newProcessed = {};
    let completed = 0;

    images.forEach((imgObj, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const isSwapped = rotation === 90 || rotation === 270;
        canvas.width = isSwapped ? img.height : img.width;
        canvas.height = isSwapped ? img.width : img.height;
        const ctx = canvas.getContext('2d');

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);

        canvas.toBlob((blob) => {
          if (blob) {
            newProcessed[idx] = {
              blob,
              url: URL.createObjectURL(blob),
              size: (blob.size / 1024).toFixed(1),
            };
          }
          completed++;
          if (completed === images.length) {
            setProcessed(newProcessed);
            setLoading(false);
          }
        }, imgObj.file.type || 'image/png');
      };
      img.onerror = () => {
        completed++;
        if (completed === images.length) {
          setProcessed(newProcessed);
          setLoading(false);
        }
      };
      img.src = imgObj.url;
    });
  };

  const downloadOne = (idx) => {
    const item = processed[idx];
    if (!item) return;
    const origName = images[idx]?.name || 'image';
    const a = document.createElement('a');
    a.href = item.url;
    a.download = `rotated-${origName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 border border-sky-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400">
            <RotateCw className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Rotate & Flip IMAGE (90°, 180°, Mirror)</h1>
            <p className="text-sm text-[#9ca3af]">Rotate multiple JPG, PNG, or WEBP images simultaneously or mirror them horizontally/vertically.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-sky-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Images are rotated offline in your browser.</span>
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
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 text-black font-semibold cursor-pointer hover:bg-sky-400 transition-all text-sm shadow-md">
            <Upload className="w-4 h-4" />
            <span>Upload Images to Rotate</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setRotation((rotation + 90) % 360); setProcessed({}); }}
              className="py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5 text-sky-400" />
              <span>Rotate 90° ({rotation}°)</span>
            </button>
            <button
              onClick={() => { setFlipH(!flipH); setProcessed({}); }}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                flipH ? 'bg-sky-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <FlipHorizontal className="w-3.5 h-3.5" />
              <span>Flip H</span>
            </button>
            <button
              onClick={() => { setFlipV(!flipV); setProcessed({}); }}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                flipV ? 'bg-sky-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <FlipVertical className="w-3.5 h-3.5" />
              <span>Flip V</span>
            </button>
          </div>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden p-2 group flex flex-col items-center">
                <img
                  src={processed[idx] ? processed[idx].url : img.url}
                  alt={img.name}
                  className="w-full h-32 object-contain rounded"
                />
                <button
                  onClick={() => handleRemove(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <p className="text-[11px] text-[#9ca3af] truncate max-w-full mt-1">{img.name}</p>
                {processed[idx] && (
                  <button
                    onClick={() => downloadOne(idx)}
                    className="w-full mt-2 py-1 rounded bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#9ca3af] border-2 border-dashed border-white/10 rounded-xl">
            <p>No images selected yet. Upload PNG, JPG, or WEBP photos to rotate and flip.</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              onClick={rotateAllImages}
              disabled={loading}
              className="py-3 px-6 rounded-xl bg-sky-400 text-black font-bold hover:bg-sky-300 transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Rotating {images.length} Images...</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-5 h-5" />
                  <span>Apply Rotation ({rotation}°)</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
