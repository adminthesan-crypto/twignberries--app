import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Camera, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Trash2, Sliders } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function ScanToPdfTool() {
  const [images, setImages] = useState([]);
  const [filterMode, setFilterMode] = useState('enhanced'); // original, enhanced, bw
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setPdfBlob(null);
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) {
      setErrorMsg('Please select valid image scans (PNG, JPG, JPEG).');
      return;
    }
    const newImgs = valid.map((f) => ({
      file: f,
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setImages([...images, ...newImgs]);
  };

  const handleRemoveImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
    setPdfBlob(null);
  };

  const generateScannedPdf = async () => {
    if (images.length === 0) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgObj of images) {
        const arrayBuffer = await imgObj.file.arrayBuffer();
        let pdfImage;
        if (imgObj.file.type === 'image/png') {
          pdfImage = await pdfDoc.embedPng(arrayBuffer);
        } else {
          pdfImage = await pdfDoc.embedJpg(arrayBuffer);
        }

        // Scale down to standard document proportions
        const { width, height } = pdfImage.scaleToFit(595.28 - 40, 841.89 - 40);
        const page = pdfDoc.addPage([595.28, 841.89]);
        
        page.drawImage(pdfImage, {
          x: (595.28 - width) / 2,
          y: (841.89 - height) / 2,
          width,
          height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
    } catch (err) {
      setErrorMsg('Failed to compile scanned images into PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scanned-document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-teal-500/10 border border-teal-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Scan to PDF (Document Scanner)</h1>
            <p className="text-sm text-[#676879]">Compile document scans or camera photos into clean multi-page PDF files.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-teal-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Images are compiled offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-6 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Controls */}
      <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-teal-500 text-black font-semibold cursor-pointer hover:bg-teal-400 transition-all text-sm shadow-md">
            <Upload className="w-4 h-4" />
            <span>Upload Document Scans / Photos</span>
            <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
            <Sliders className="w-4 h-4 text-teal-400" />
            <span>Scan Mode:</span>
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="bg-white border border-[#e6e9ef] rounded-lg px-2.5 py-1 text-[#1f2532]"
            >
              <option value="enhanced">Enhanced Contrast (Doc)</option>
              <option value="original">Original Photo</option>
              <option value="bw">High-Contrast B&W</option>
            </select>
          </div>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {images.map((img, idx) => (
              <div key={idx} className="relative bg-white border border-[#e6e9ef] rounded-xl overflow-hidden p-2 group">
                <img
                  src={img.url}
                  alt={img.name}
                  className={`w-full h-32 object-contain rounded ${
                    filterMode === 'bw' ? 'grayscale contrast-200' : filterMode === 'enhanced' ? 'contrast-125' : ''
                  }`}
                />
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/80 text-[#1f2532] hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-center text-[#9ca3af] truncate mt-1">Page {idx + 1}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#9ca3af] border-2 border-dashed border-[#e6e9ef] rounded-xl">
            <p>No document images selected yet. Upload photos to generate PDF.</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-[#e6e9ef]">
          <button
            onClick={generateScannedPdf}
            disabled={loading || images.length === 0}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-teal-400 text-black font-bold hover:bg-teal-300 transition-all flex items-center justify-center gap-3 shadow-lg shadow-teal-500/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Compiling Scanned PDF...</span>
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                <span>Generate Scanned PDF ({images.length} pages)</span>
              </>
            )}
          </button>

          {pdfBlob && (
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF Document</span>
              </button>
              <NativeShareButton fileUrl={URL.createObjectURL(pdfBlob)} fileName="scanned-document.pdf" mimeType="application/pdf" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
