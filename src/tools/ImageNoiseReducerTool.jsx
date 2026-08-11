import React, { useState } from 'react';
import { Sliders, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Eye } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function ImageNoiseReducerTool() {
  const [image, setImage] = useState(null);
  const [strength, setStrength] = useState(30); // 0 to 100
  const [smoothness, setSmoothness] = useState(2);
  const [denoisedUrl, setDenoisedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setDenoisedUrl(null);
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

  const applyDenoise = () => {
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

        // Combined median/bilateral blur smoothing simulation offline
        ctx.filter = `blur(${smoothness}px) contrast(${100 + Math.floor(strength / 4)}%)`;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            setDenoisedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not denoise image.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error reducing image noise offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!denoisedUrl || !image) return;
    const a = document.createElement('a');
    a.href = denoisedUrl;
    a.download = `denoised-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-teal-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Image Denoise & Smooth Filter (Grain Reducer)</h1>
            <p className="text-sm text-[#676879]">Smooth grainy low-light camera noise and JPEG compression artifacts offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-teal-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Photos are smoothed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-4 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-teal-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop noisy or grainy photo here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP photos</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-6">
              <Sliders className="w-8 h-8 text-teal-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setDenoisedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Photo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-white/5">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Denoise Strength ({strength}%)</label>
              <input type="range" min="0" max="100" value={strength} onChange={(e) => { setStrength(Number(e.target.value)); setDenoisedUrl(null); }} className="w-full accent-teal-400" />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Smoothness Filter ({smoothness}px)</label>
              <input type="range" min="0" max="5" value={smoothness} onChange={(e) => { setSmoothness(Number(e.target.value)); setDenoisedUrl(null); }} className="w-full accent-teal-400" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={denoisedUrl || image.url} alt="Denoise preview" className="max-h-64 object-contain rounded" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-[#e6e9ef]">
            <button
              onClick={applyDenoise}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-teal-400 text-black font-bold hover:bg-teal-300 transition-all flex items-center justify-center gap-3 shadow-lg shadow-teal-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Smoothing Noise...</span>
                </>
              ) : (
                <>
                  <Sliders className="w-5 h-5" />
                  <span>Apply Noise Reduction</span>
                </>
              )}
            </button>

            {denoisedUrl && (
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Smoothed Photo</span>
                </button>
                <NativeShareButton 
                  fileUrl={denoisedUrl} 
                  fileName={`denoised-${image.name}`} 
                  mimeType="image/png" 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
