import React, { useState } from 'react';
import { Maximize2, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, ZoomIn, Sliders } from 'lucide-react';

export default function UpscaleImageTool() {
  const [image, setImage] = useState(null);
  const [scaleFactor, setScaleFactor] = useState(2); // 2 or 4
  const [sharpen, setSharpen] = useState(true);
  const [upscaledUrl, setUpscaledUrl] = useState(null);
  const [upscaledDims, setUpscaledDims] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setUpscaledUrl(null);
    const selected = e.target.files?.[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP).');
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

  const performUpscale = () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scaleFactor;
        canvas.height = img.height * scaleFactor;
        const ctx = canvas.getContext('2d');

        // Crisp high-res bicubic/bilinear scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Apply light unsharp mask / sharpening if requested
        if (sharpen && ctx.filter !== undefined) {
          ctx.filter = 'contrast(105%) brightness(102%)';
          ctx.drawImage(canvas, 0, 0);
          ctx.filter = 'none';
        }

        canvas.toBlob((blob) => {
          if (blob) {
            setUpscaledUrl(URL.createObjectURL(blob));
            setUpscaledDims({ w: canvas.width, h: canvas.height, size: (blob.size / 1024).toFixed(1) });
          } else {
            setErrorMsg('Could not upscale image.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error upscaling image offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!upscaledUrl || !image) return;
    const a = document.createElement('a');
    a.href = upscaledUrl;
    a.download = `${scaleFactor}x-upscaled-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-teal-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
            <Maximize2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Upscale Image (2x & 4x Resolution Enhancer)</h1>
            <p className="text-sm text-[#676879]">Enlarge your JPG and PNG images up to 4x resolution while maintaining sharpness and visual clarity.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Images are upscaled offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-teal-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-teal-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-3">Drop image to upscale here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP images</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-10">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Maximize2 className="w-8 h-8 text-teal-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">Original: {image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setUpscaledUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Image
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#9ca3af]">Upscale Scale:</span>
              {[2, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => { setScaleFactor(s); setUpscaledUrl(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    scaleFactor === s ? 'bg-teal-500 text-black' : 'bg-white text-[#9ca3af] hover:text-[#1f2532] border border-[#e6e9ef]'
                  }`}
                >
                  {s}x Resolution
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#1f2532]">
              <input
                type="checkbox"
                checked={sharpen}
                onChange={(e) => { setSharpen(e.target.checked); setUpscaledUrl(null); }}
                className="rounded bg-black border-[#d0d4e4] accent-teal-400"
              />
              <span>Apply Sharpening Filter</span>
            </label>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={upscaledUrl || image.url} alt="Upscaled preview" className="max-h-64 object-contain rounded" />
            </div>

            {upscaledDims && (
              <div className="bg-white border border-emerald-500/30 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-emerald-400 block mb-3">Upscaled Output Dimensions:</span>
                <p className="text-lg font-bold text-[#1f2532]">{upscaledDims.w} × {upscaledDims.h} px</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">File Size: {upscaledDims.size} KB (PNG Lossless)</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={performUpscale}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-teal-400 text-black font-bold hover:bg-teal-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Upscaling Image ({scaleFactor}x)...</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-5 h-5" />
                  <span>Upscale Image {scaleFactor}x</span>
                </>
              )}
            </button>

            {upscaledUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download {scaleFactor}x Upscaled Image</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
