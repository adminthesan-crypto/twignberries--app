import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Image, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

// Initialize PDF.js worker
if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function PdfToImageTool() {
  const [file, setFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [format, setFormat] = useState('image/png'); // image/png, image/jpeg
  const [scale, setScale] = useState(2); // 1x, 2x, 3x Retina
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const canvasRef = useRef(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setPreviewUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
      setErrorMsg(`"${selected.name}" is not a valid PDF file.`);
      return;
    }
    try {
      setLoading(true);
      const buffer = await selected.arrayBuffer();
      const loadedPdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      setPdfDoc(loadedPdf);
      setTotalPages(loadedPdf.numPages);
      setSelectedPage(1);
      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
      await renderPage(loadedPdf, 1, 2, 'image/png');
    } catch (err) {
      if (err.message && err.message.includes('Password')) {
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Remove security before exporting images.`);
      } else {
        setErrorMsg(`❌ Could not load PDF file: ${err.message || 'Corrupt document format'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPage = async (doc, pageNum, renderScale, mimeType) => {
    if (!doc) return;
    try {
      setLoading(true);
      const page = await doc.getPage(pageNum);
      const viewport = page.getViewport({ scale: renderScale });
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');

      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;

      const dataUrl = canvas.toDataURL(mimeType, 0.92);
      setPreviewUrl(dataUrl);
    } catch (err) {
      setErrorMsg(`Failed to render page ${pageNum}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (newPage) => {
    const p = Math.max(1, Math.min(totalPages, Number(newPage) || 1));
    setSelectedPage(p);
    if (pdfDoc) await renderPage(pdfDoc, p, scale, format);
  };

  const handleScaleChange = async (newScale) => {
    setScale(newScale);
    if (pdfDoc) await renderPage(pdfDoc, selectedPage, newScale, format);
  };

  const handleFormatChange = async (newFormat) => {
    setFormat(newFormat);
    if (pdfDoc) await renderPage(pdfDoc, selectedPage, scale, newFormat);
  };

  const handleDownload = () => {
    if (!previewUrl || !file) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    const ext = format === 'image/jpeg' ? 'jpg' : 'png';
    a.download = `${file.name.replace(/\.pdf$/i, '')}_page_${selectedPage}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8">
      {/* Top Description Banner */}
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-6">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side PDF to Image Exporter
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "No need to upload sensitive decks or legal PDFs to online converters just to grab a high-res slide. We render your pages directly on your device's HTML5 Canvas."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {/* File Upload Zone */}
      {!file ? (
        <label className="dropzone">
          <div className="dropzone-icon"><Upload size={28} /></div>
          <span className="dropzone-title">
            Drop PDF file to export PNG/JPG pages
          </span>
          <span className="dropzone-sub">
            Zero server uploads • Offline Retina Canvas Rendering
          </span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-6 pb-4 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-6">
              <FileText className="text-[#6161ff]" size={24} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
                <div style={{ fontSize: 12, color: '#676879' }}>{file.size} • {totalPages} Total Pages</div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setPdfDoc(null); setPreviewUrl(null); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50 transition"
            >
              Change File
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div style={SL}>Select Page (1 - {totalPages})</div>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={selectedPage}
                onChange={(e) => handlePageChange(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532]"
              />
            </div>
            <div>
              <div style={SL}>Export Format</div>
              <select
                value={format}
                onChange={(e) => handleFormatChange(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532] bg-white"
              >
                <option value="image/png">High-Res PNG (Lossless)</option>
                <option value="image/jpeg">JPG Image (Compact)</option>
              </select>
            </div>
            <div>
              <div style={SL}>Resolution Quality</div>
              <select
                value={scale}
                onChange={(e) => handleScaleChange(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532] bg-white"
              >
                <option value={1}>1x Standard DPI (72 DPI)</option>
                <option value={2}>2x Retina Quality (144 DPI)</option>
                <option value={3}>3x Ultra-HD Print (216 DPI)</option>
              </select>
            </div>
          </div>

          {/* Canvas Preview Area */}
          <div className="p-6 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex flex-col items-center justify-center min-h-[320px]">
            {loading ? (
              <div className="flex flex-col items-center gap-6 text-[#676879]">
                <RefreshCw className="animate-spin text-[#6161ff]" size={32} />
                <span className="text-sm font-bold">Rendering page {selectedPage} at {scale}x Retina...</span>
              </div>
            ) : previewUrl ? (
              <div className="max-w-full overflow-auto flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt={`PDF Page ${selectedPage}`}
                  className="max-h-[460px] rounded-lg shadow-md border border-[#e6e9ef]"
                />
              </div>
            ) : (
              <span className="text-sm text-[#868894]">No page rendered yet.</span>
            )}
          </div>

          {/* Hidden Canvas Ref */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2">
            <span style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              ✓ 100% Client-Side Canvas Render • Zero Cloud Trace
            </span>
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                disabled={!previewUrl || loading}
                className="btn-primary flex items-center gap-3"
                style={{ padding: '11px 24px', fontSize: 14 }}
              >
                <Download size={16} />
                Download Page {selectedPage} ({format === 'image/jpeg' ? 'JPG' : 'PNG'})
              </button>
              {previewUrl && !loading && (
                <NativeShareButton 
                  fileUrl={previewUrl} 
                  fileName={`${file.name.replace(/\\.pdf$/i, '')}_page_${selectedPage}.${format === 'image/jpeg' ? 'jpg' : 'png'}`} 
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
