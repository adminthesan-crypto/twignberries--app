import React, { useState } from 'react';
import { FileImage, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, ZoomIn, Sliders } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function SvgToPngConverterTool() {
  const [svgFile, setSvgFile] = useState(null);
  const [scale, setScale] = useState(2); // 1x, 2x, 4x, 8x
  const [format, setFormat] = useState('image/png');
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [convertedDims, setConvertedDims] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setConvertedUrl(null);
    const selected = e.target.files?.[0];
    if (!selected || (!selected.type.includes('svg') && !selected.name.endsWith('.svg'))) {
      setErrorMsg('Please upload a valid SVG vector file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const svgText = event.target.result;
      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      setSvgFile({
        name: selected.name,
        url: URL.createObjectURL(blob),
      });
    };
    reader.readAsText(selected);
  };

  const convertSvgToRaster = () => {
    if (!svgFile) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const img = new Image();
      img.onload = () => {
        const w = Math.max(300, img.width || 500) * scale;
        const h = Math.max(300, img.height || 500) * scale;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        if (format === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, w, h);
        }

        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedUrl(URL.createObjectURL(blob));
            setConvertedDims({ w, h, size: (blob.size / 1024).toFixed(1) });
          } else {
            setErrorMsg('Could not convert SVG.');
          }
          setLoading(false);
        }, format, 0.95);
      };
      img.onerror = () => {
        setErrorMsg('Error decoding SVG XML offline.');
        setLoading(false);
      };
      img.src = svgFile.url;
    } catch (err) {
      setErrorMsg('Error converting SVG offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !svgFile) return;
    const ext = format === 'image/png' ? 'png' : 'jpg';
    const a = document.createElement('a');
    a.href = convertedUrl;
    a.download = `${svgFile.name.replace(/\.svg$/i, '')}-${scale}x.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <FileImage className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">SVG to PNG / JPG Vector to Raster Converter</h1>
            <p className="text-sm text-[#676879]">Convert vector SVG files into high-resolution PNG or JPG images up to 8x resolution offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Vector rendering happens offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!svgFile ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-blue-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept=".svg,image/svg+xml" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop SVG vector file here</p>
          <p className="text-xs text-[#9ca3af]">Supports .svg icons, logos, and vector illustrations</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <FileImage className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{svgFile.name}</p>
                <p className="text-xs text-[#9ca3af]">SVG Vector Illustration</p>
              </div>
            </div>
            <button
              onClick={() => { setSvgFile(null); setConvertedUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace SVG
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#9ca3af]">Resolution Scale:</span>
              {[1, 2, 4, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => { setScale(s); setConvertedUrl(null); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    scale === s ? 'bg-blue-500 text-black' : 'bg-gray-100 text-[#1f2532]'
                  }`}
                >
                  {s}x DPI
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-semibold text-[#9ca3af]">Export Format:</span>
              <select
                value={format}
                onChange={(e) => { setFormat(e.target.value); setConvertedUrl(null); }}
                className="bg-white border border-[#e6e9ef] rounded-lg px-2.5 py-1 text-xs text-[#1f2532]"
              >
                <option value="image/png">PNG (Transparent)</option>
                <option value="image/jpeg">JPG (White Background)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-4">
              <img src={convertedUrl || svgFile.url} alt="SVG Preview" className="max-h-64 object-contain" />
            </div>

            {convertedDims && (
              <div className="bg-white border border-emerald-500/30 rounded-xl p-4 text-center">
                <span className="text-xs font-bold text-emerald-400 block mb-1">Converted Output:</span>
                <p className="text-lg font-bold text-[#1f2532]">{convertedDims.w} × {convertedDims.h} px</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Size: {convertedDims.size} KB ({format === 'image/png' ? 'PNG' : 'JPG'})</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={convertSvgToRaster}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-black font-bold hover:bg-blue-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Rendering Vector ({scale}x)...</span>
                </>
              ) : (
                <>
                  <ZoomIn className="w-5 h-5" />
                  <span>Convert to {format === 'image/png' ? 'PNG' : 'JPG'} ({scale}x)</span>
                </>
              )}
            </button>

            {convertedUrl && (
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download {scale}x High-Res Image</span>
                </button>
                <NativeShareButton 
                  fileUrl={convertedUrl} 
                  fileName={`${svgFile.name.replace(/\.svg$/i, '')}-${scale}x.${format === 'image/png' ? 'png' : 'jpg'}`} 
                  mimeType={format} 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
