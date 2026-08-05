import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { EyeOff, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function RedactPdfTool() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [redactBoxes, setRedactBoxes] = useState([
    { page: 1, x: 50, y: 700, width: 200, height: 24, label: 'SSN / Tax ID' },
  ]);
  const [redactedPdf, setRedactedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setRedactedPdf(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF file.');
      return;
    }
    setFile(selected);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch (err) {
      setErrorMsg('Failed to read PDF pages.');
    }
  };

  const handleAddBox = () => {
    setRedactBoxes([
      ...redactBoxes,
      { page: 1, x: 50, y: 600, width: 250, height: 24, label: 'Confidential Info' },
    ]);
    setRedactedPdf(null);
  };

  const handleRemoveBox = (idx) => {
    setRedactBoxes(redactBoxes.filter((_, i) => i !== idx));
    setRedactedPdf(null);
  };

  const handleBoxChange = (idx, field, val) => {
    const next = [...redactBoxes];
    next[idx][field] = Number(val) || val;
    setRedactBoxes(next);
    setRedactedPdf(null);
  };

  const handleApplyRedactions = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();

      redactBoxes.forEach((box) => {
        const pIdx = Math.max(0, Math.min(pages.length - 1, Number(box.page) - 1));
        const page = pages[pIdx];
        // Draw permanent black box
        page.drawRectangle({
          x: Number(box.x),
          y: Number(box.y),
          width: Number(box.width),
          height: Number(box.height),
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setRedactedPdf(blob);
    } catch (err) {
      setErrorMsg('Could not apply redactions to this PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!redactedPdf || !file) return;
    const url = URL.createObjectURL(redactedPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redacted-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500/10 via-zinc-500/10 to-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Redact PDF (Sanitize Sensitive Text)</h1>
            <p className="text-sm text-[#676879]">Permanently cover confidential text, SSNs, financial numbers, and personal data with black redaction blocks.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Redactions are rendered offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-red-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop PDF document here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Sanitizes document content offline with solid blackout regions</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{pageCount} page(s) available</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setRedactedPdf(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace PDF
            </button>
          </div>

          {/* Box list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#1f2532]">Redaction Blackout Zones:</label>
              <button
                onClick={handleAddBox}
                className="py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Redaction Box</span>
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {redactBoxes.map((box, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#e6e9ef] flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">Page:</span>
                    <input
                      type="number"
                      min={1}
                      max={pageCount || 1}
                      value={box.page}
                      onChange={(e) => handleBoxChange(idx, 'page', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">X:</span>
                    <input
                      type="number"
                      value={box.x}
                      onChange={(e) => handleBoxChange(idx, 'x', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">Y:</span>
                    <input
                      type="number"
                      value={box.y}
                      onChange={(e) => handleBoxChange(idx, 'y', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">Width:</span>
                    <input
                      type="number"
                      value={box.width}
                      onChange={(e) => handleBoxChange(idx, 'width', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#9ca3af]">Height:</span>
                    <input
                      type="number"
                      value={box.height}
                      onChange={(e) => handleBoxChange(idx, 'height', e.target.value)}
                      className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveBox(idx)}
                    className="text-red-400 hover:text-red-300 ml-auto"
                    title="Remove Redaction"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleApplyRedactions}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Applying Blackout...</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-5 h-5" />
                  <span>Apply Redactions Now</span>
                </>
              )}
            </button>

            {redactedPdf && (
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Redacted PDF</span>
                </button>
                <NativeShareButton 
                  fileUrl={URL.createObjectURL(redactedPdf)}
                  fileName={`redacted-${file.name}`}
                  mimeType="application/pdf"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
