import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, Sliders } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function PdfCropTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [cropTop, setCropTop] = useState(20);
  const [cropBottom, setCropBottom] = useState(20);
  const [cropLeft, setCropLeft] = useState(20);
  const [cropRight, setCropRight] = useState(20);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [croppedPdfUrl, setCroppedPdfUrl] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setCroppedPdfUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
      setErrorMsg(`"${selected.name}" is not a valid PDF file.`);
      return;
    }
    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: false });
      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB',
        buffer
      });
      setTotalPages(pdf.getPageCount());
    } catch (err) {
      setErrorMsg(`🔒 Failed to load PDF: ${err.message}`);
    }
  };

  const handleApplyCrop = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const pdfDoc = await PDFDocument.load(file.buffer);
      const pages = pdfDoc.getPages();

      for (let page of pages) {
        const { x, y, width, height } = page.getMediaBox();
        const t = Math.min(height / 2 - 10, Number(cropTop) || 0);
        const b = Math.min(height / 2 - 10, Number(cropBottom) || 0);
        const l = Math.min(width / 2 - 10, Number(cropLeft) || 0);
        const r = Math.min(width / 2 - 10, Number(cropRight) || 0);

        page.setCropBox(
          x + l,
          y + b,
          width - (l + r),
          height - (t + b)
        );
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setCroppedPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(`❌ Failed to crop PDF: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!croppedPdfUrl || !file) return;
    const a = document.createElement('a');
    a.href = croppedPdfUrl;
    a.download = `${file.name.replace(/\.pdf$/i, '')}_cropped.pdf`;
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
            100% Client-Side PDF Margin & Crop Box Editor
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Got ugly scanner borders or excess white margins around your PDF slides? Trim top, bottom, left, and right crop boxes across all pages offline."
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
            Drop PDF file to edit page margins & crop boxes
          </span>
          <span style={{ fontSize: 13, color: '#868894', marginTop: 4 }}>
            Zero cloud uploads • Offline pdf-lib processing
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
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-3">
              <FileText className="text-[#6161ff]" size={24} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
                <div style={{ fontSize: 12, color: '#676879' }}>{file.size} • {totalPages} Pages</div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setCroppedPdfUrl(null); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50 transition"
            >
              Change File
            </button>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div style={SL}>Top Margin Trim ({cropTop} pt)</div>
              <input
                type="range"
                min={0}
                max={150}
                value={cropTop}
                onChange={(e) => setCropTop(Number(e.target.value))}
                className="w-full accent-[#6161ff]"
              />
            </div>
            <div>
              <div style={SL}>Bottom Trim ({cropBottom} pt)</div>
              <input
                type="range"
                min={0}
                max={150}
                value={cropBottom}
                onChange={(e) => setCropBottom(Number(e.target.value))}
                className="w-full accent-[#6161ff]"
              />
            </div>
            <div>
              <div style={SL}>Left Trim ({cropLeft} pt)</div>
              <input
                type="range"
                min={0}
                max={150}
                value={cropLeft}
                onChange={(e) => setCropLeft(Number(e.target.value))}
                className="w-full accent-[#6161ff]"
              />
            </div>
            <div>
              <div style={SL}>Right Trim ({cropRight} pt)</div>
              <input
                type="range"
                min={0}
                max={150}
                value={cropRight}
                onChange={(e) => setCropRight(Number(e.target.value))}
                className="w-full accent-[#6161ff]"
              />
            </div>
          </div>

          {/* Visual Indicator Box */}
          <div className="p-8 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex flex-col items-center justify-center">
            <div
              className="bg-white border-2 border-dashed border-[#6161ff] rounded shadow-md flex items-center justify-center"
              style={{
                width: 220,
                height: 300,
                paddingTop: `${cropTop / 2}px`,
                paddingBottom: `${cropBottom / 2}px`,
                paddingLeft: `${cropLeft / 2}px`,
                paddingRight: `${cropRight / 2}px`
              }}
            >
              <div className="w-full h-full bg-[#eceeff] rounded flex items-center justify-center text-xs font-bold text-[#6161ff] text-center p-2">
                Cropped Area<br />(-{cropTop}t, -{cropBottom}b, -{cropLeft}l, -{cropRight}r)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              ✓ 100% Offline Margin Cropping
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleApplyCrop}
                disabled={loading}
                className="px-5 py-2.5 rounded-lg border border-[#6161ff] text-[#6161ff] text-sm font-bold hover:bg-[#eceeff]"
              >
                {loading ? 'Cropping...' : 'Apply Crop Box'}
              </button>
              {croppedPdfUrl && (
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-2"
                  style={{ padding: '11px 24px', fontSize: 14 }}
                >
                  <Download size={16} />
                  Download Cropped PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
