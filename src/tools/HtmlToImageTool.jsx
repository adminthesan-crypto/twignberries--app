import React, { useState } from 'react';
import { Code, Download, ShieldCheck, AlertCircle, RefreshCw, Eye, Sparkles } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function HtmlToImageTool() {
  const [htmlContent, setHtmlContent] = useState(
    `<div style="padding: 40px; background: linear-gradient(135deg, #1e1e24, #111116); border-radius: 20px; color: white; font-family: sans-serif; border: 1px solid rgba(255,255,255,0.1); max-width: 500px;">
  <h1 style="margin: 0 0 10px 0; color: #38bdf8; font-size: 28px;">Pahruli Image Studio</h1>
  <p style="margin: 0; color: #9ca3af; font-size: 15px; line-height: 1.5;">
    Convert HTML cards, code snippets, and social banners directly into high-DPI PNG images offline.
  </p>
  <div style="margin-top: 25px; display: flex; gap: 10px;">
    <span style="background: rgba(56,189,248,0.2); color: #38bdf8; padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: bold;">100% Offline</span>
    <span style="background: rgba(16,185,129,0.2); color: #10b981; padding: 6px 14px; border-radius: 99px; font-size: 12px; font-weight: bold;">Retina DPI</span>
  </div>
</div>`
  );
  const [imageFormat, setImageFormat] = useState('image/png');
  const [renderedUrl, setRenderedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const convertHtmlToImage = () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // Offline SVG foreignObject canvas rendering technique
      const width = 650;
      const height = 380;
      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #09090b;">
              ${htmlContent}
            </div>
          </foreignObject>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width * 2; // Retina 2x DPI
        canvas.height = height * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);

        canvas.toBlob((blob) => {
          if (blob) {
            setRenderedUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not render HTML to image.');
          }
          setLoading(false);
        }, imageFormat);
      };

      img.onerror = () => {
        setErrorMsg('Error rendering SVG foreignObject. Check for external URLs or broken HTML tags.');
        setLoading(false);
      };

      img.src = url;
    } catch (err) {
      setErrorMsg('Error converting HTML to image offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!renderedUrl) return;
    const ext = imageFormat === 'image/png' ? 'png' : 'jpg';
    const a = document.createElement('a');
    a.href = renderedUrl;
    a.download = `html-card-preview.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">HTML to IMAGE (Convert Web Code & Cards)</h1>
            <p className="text-sm text-[#676879]">Convert live HTML and inline CSS code cards directly into high-DPI Retina PNG or JPG images offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — HTML rendering happens offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-6 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Editor & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400">HTML & Inline CSS Markup</span>
            <select
              value={imageFormat}
              onChange={(e) => setImageFormat(e.target.value)}
              className="bg-white border border-[#e6e9ef] rounded px-2 py-1 text-xs text-[#1f2532]"
            >
              <option value="image/png">Retina PNG</option>
              <option value="image/jpeg">JPG Image</option>
            </select>
          </div>
          <textarea
            value={htmlContent}
            onChange={(e) => { setHtmlContent(e.target.value); setRenderedUrl(null); }}
            rows={12}
            className="w-full bg-white border border-[#e6e9ef] rounded-xl p-6 text-[#1f2532] font-mono text-xs focus:border-cyan-500 outline-none"
          />
          <button
            onClick={convertHtmlToImage}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Rendering Retina Image...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Render HTML to Image</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-[#9ca3af] block mb-3">Live HTML Render Preview</span>
            <div
              className="border border-[#e6e9ef] rounded-xl p-6 bg-white min-h-[220px] flex items-center justify-center overflow-auto"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>

          {renderedUrl && (
            <div className="space-y-6 pt-4 border-t border-[#e6e9ef]">
              <span className="text-xs font-bold text-emerald-400 block">Rendered Output:</span>
              <img src={renderedUrl} alt="Rendered HTML" className="w-full rounded-xl border border-[#e6e9ef] bg-white" />
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-3"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-DPI Image</span>
                </button>
                <NativeShareButton fileUrl={renderedUrl} fileName={`html-card-preview.${imageFormat === 'image/png' ? 'png' : 'jpg'}`} mimeType={imageFormat} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
