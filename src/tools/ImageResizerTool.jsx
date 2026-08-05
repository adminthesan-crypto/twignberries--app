import React, { useState } from 'react';
import { Image, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Lock, Unlock } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ImageResizerTool() {
  const [file, setFile] = useState(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState('image/png'); // image/png, image/jpeg, image/webp
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resizedUrl, setResizedUrl] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setResizedUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setErrorMsg(`"${selected.name}" is not a valid image file.`);
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        setOrigW(img.width);
        setOrigH(img.height);
        setWidth(img.width);
        setHeight(img.height);
        resizeImage(img, img.width, img.height, format);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(selected);
  };

  const resizeImage = (imgEl, targetW, targetH, targetFormat) => {
    setLoading(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, targetW);
      canvas.height = Math.max(1, targetH);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setResizedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Failed to resize image.');
          }
          setLoading(false);
        },
        targetFormat,
        0.92
      );
    } catch (err) {
      setErrorMsg(`Resize error: ${err.message}`);
      setLoading(false);
    }
  };

  const handleWidthChange = (val) => {
    const w = Math.max(1, Number(val) || 1);
    setWidth(w);
    let h = height;
    if (lockAspect && origW > 0) {
      h = Math.round((w / origW) * origH);
      setHeight(h);
    }
    if (file) {
      const img = new window.Image();
      img.onload = () => resizeImage(img, w, h, format);
      img.src = URL.createObjectURL(file);
    }
  };

  const handleHeightChange = (val) => {
    const h = Math.max(1, Number(val) || 1);
    setHeight(h);
    let w = width;
    if (lockAspect && origH > 0) {
      w = Math.round((h / origH) * origW);
      setWidth(w);
    }
    if (file) {
      const img = new window.Image();
      img.onload = () => resizeImage(img, w, h, format);
      img.src = URL.createObjectURL(file);
    }
  };

  const handleFormatChange = (newFmt) => {
    setFormat(newFmt);
    if (file) {
      const img = new window.Image();
      img.onload = () => resizeImage(img, width, height, newFmt);
      img.src = URL.createObjectURL(file);
    }
  };

  const handleDownload = () => {
    if (!resizedUrl || !file) return;
    const a = document.createElement('a');
    a.href = resizedUrl;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    a.download = `${file.name.replace(/\.[^/.]+$/, '')}_${width}x${height}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Image Dimension Resizer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Need to resize a banner for Shopify or scale an app icon without uploading your assets? Scale by exact pixel dimensions offline."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#c3c6d4] hover:border-[#6161ff] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-[#fbfbfc] hover:bg-[#f5f6ff] transition-all">
          <Upload className="text-[#6161ff] mb-3" size={36} />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1f2532' }}>
            Drop Image file to resize dimensions
          </span>
          <span style={{ fontSize: 13, color: '#868894', marginTop: 4 }}>
            PNG, JPG, WEBP • Zero cloud uploads
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-3">
              <Image className="text-[#6161ff]" size={24} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
                <div style={{ fontSize: 12, color: '#676879' }}>
                  Original: {origW}px × {origH}px → New: {width}px × {height}px
                </div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setResizedUrl(null); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50 transition"
            >
              Change Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <div style={SL}>Width (px)</div>
              <input
                type="number"
                min={1}
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532]"
              />
            </div>

            <div>
              <div style={SL}>Height (px)</div>
              <input
                type="number"
                min={1}
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532]"
              />
            </div>

            <div>
              <button
                onClick={() => setLockAspect(!lockAspect)}
                className={`w-full h-11 rounded-lg border flex items-center justify-center gap-2 text-xs font-bold transition ${
                  lockAspect
                    ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                    : 'border-[#d0d4e4] bg-white text-[#676879]'
                }`}
              >
                {lockAspect ? <Lock size={14} /> : <Unlock size={14} />}
                {lockAspect ? 'Aspect Locked' : 'Unlocked'}
              </button>
            </div>

            <div>
              <div style={SL}>Export Format</div>
              <select
                value={format}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532] bg-white"
              >
                <option value="image/png">PNG (Lossless)</option>
                <option value="image/jpeg">JPG (Standard)</option>
                <option value="image/webp">WEBP (Compact)</option>
              </select>
            </div>
          </div>

          {/* Preview Area */}
          <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex flex-col items-center justify-center min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-[#676879]">
                <RefreshCw className="animate-spin text-[#6161ff]" size={32} />
                <span className="text-sm font-bold">Resizing image...</span>
              </div>
            ) : resizedUrl ? (
              <img
                src={resizedUrl}
                alt="Resized Preview"
                className="max-h-[380px] rounded-lg shadow-md border border-[#e6e9ef]"
              />
            ) : null}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              ✓ 100% Offline Canvas Resizing
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                disabled={!resizedUrl || loading}
                className="btn-primary flex items-center gap-2"
                style={{ padding: '11px 24px', fontSize: 14 }}
              >
                <Download size={16} />
                Download ({width}×{height} {format === 'image/jpeg' ? 'JPG' : format === 'image/webp' ? 'WEBP' : 'PNG'})
              </button>
              {resizedUrl && !loading && (
                <NativeShareButton 
                  fileUrl={resizedUrl} 
                  fileName={`${file.name.replace(/\\.[^/.]+$/, '')}_${width}x${height}.${format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png'}`} 
                  mimeType={format} 
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
