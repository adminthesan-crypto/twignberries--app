import React, { useState } from 'react';
import { Image, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Sliders } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ImageCompressorTool() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(0.75); // 0.1 to 1.0
  const [format, setFormat] = useState('image/jpeg'); // image/jpeg, image/webp
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setCompressedUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setErrorMsg(`"${selected.name}" is not a valid image file.`);
      return;
    }

    setFile(selected);
    setOriginalSize(selected.size);
    compressImage(selected, quality, format);
  };

  const compressImage = (imgFile, q, targetFormat) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              setCompressedUrl(URL.createObjectURL(blob));
            } else {
              setErrorMsg('Failed to compress image.');
            }
            setLoading(false);
          },
          targetFormat,
          q
        );
      };
      img.onerror = () => {
        setErrorMsg('Could not read image file.');
        setLoading(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(imgFile);
  };

  const handleQualityChange = (newQ) => {
    setQuality(newQ);
    if (file) compressImage(file, newQ, format);
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    if (file) compressImage(file, quality, newFormat);
  };

  const handleDownload = () => {
    if (!compressedUrl || !file) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    const ext = format === 'image/webp' ? 'webp' : 'jpg';
    a.download = `${file.name.replace(/\.[^/.]+$/, '')}_compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const savingsPercent = originalSize > 0
    ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
    : 0;

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Image Compression & Optimizer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Stop sending heavy product photos to online compressors that store your graphics. We compress JPG, PNG, and WEBP directly in your browser memory."
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
            Drop Image file to compress & reduce size
          </span>
          <span style={{ fontSize: 13, color: '#868894', marginTop: 4 }}>
            JPG, PNG, WEBP • Zero cloud uploads
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
                  Original: {(originalSize / 1024).toFixed(1)} KB → Compressed: {(compressedSize / 1024).toFixed(1)} KB ({savingsPercent}% saved)
                </div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setCompressedUrl(null); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50 transition"
            >
              Change Image
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div style={SL}>Compression Quality ({Math.round(quality * 100)}%)</div>
              <input
                type="range"
                min={10}
                max={100}
                value={Math.round(quality * 100)}
                onChange={(e) => handleQualityChange(Number(e.target.value) / 100)}
                className="w-full accent-[#6161ff]"
              />
              <div className="flex justify-between text-xs text-[#868894] mt-1 font-bold">
                <span>Smaller file (10%)</span>
                <span>Best quality (100%)</span>
              </div>
            </div>

            <div>
              <div style={SL}>Target Format</div>
              <select
                value={format}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532] bg-white"
              >
                <option value="image/jpeg">JPG (Standard Universal)</option>
                <option value="image/webp">WEBP (Next-Gen Smallest Size)</option>
              </select>
            </div>
          </div>

          {/* Preview Area */}
          <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex flex-col items-center justify-center min-h-[300px]">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-[#676879]">
                <RefreshCw className="animate-spin text-[#6161ff]" size={32} />
                <span className="text-sm font-bold">Compressing image...</span>
              </div>
            ) : compressedUrl ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={compressedUrl}
                  alt="Compressed Preview"
                  className="max-h-[380px] rounded-lg shadow-md border border-[#e6e9ef]"
                />
                <span className="badge badge-success text-xs">
                  Saved {( (originalSize - compressedSize) / 1024 ).toFixed(1)} KB ({savingsPercent}%)
                </span>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              ✓ 100% Offline Browser Compression
            </span>
            <button
              onClick={handleDownload}
              disabled={!compressedUrl || loading}
              className="btn-primary flex items-center gap-2"
              style={{ padding: '11px 24px', fontSize: 14 }}
            >
              <Download size={16} />
              Download Compressed {format === 'image/webp' ? 'WEBP' : 'JPG'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
