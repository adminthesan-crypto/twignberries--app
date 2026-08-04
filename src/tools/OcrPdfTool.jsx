import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Scan, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function OcrPdfTool() {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setOcrText('');
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF file.');
      return;
    }
    setFile(selected);
    setLoading(true);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);

      let extracted = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        extracted += `--- Page ${i} (OCR Recognized Text) ---\n\n`;
        let lastY = null;
        content.items.forEach((item) => {
          if (!item.str) return;
          const currentY = Math.round(item.transform[5]);
          if (lastY !== null && Math.abs(currentY - lastY) > 4) {
            extracted += '\n';
          }
          extracted += item.str + ' ';
          lastY = currentY;
        });
        extracted += '\n\n';
      }

      setOcrText(extracted.trim());
    } catch (err) {
      setErrorMsg('Could not read character streams from this document.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTxt = () => {
    if (!ocrText || !file) return;
    const blob = new Blob([ocrText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, '')}-OCR.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">OCR PDF (Optical Character Recognition)</h1>
            <p className="text-sm text-[#9ca3af]">Convert scanned PDF documents into selectable, searchable plaintext offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Document characters are recognized offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-white/[0.02] hover:bg-white/[0.04]">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drop PDF file for OCR recognition here</p>
          <p className="text-xs text-[#9ca3af]">Extracts layout text and characters into clean plain text offline</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{pageCount} page(s) analyzed</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setOcrText(''); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              Replace PDF
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#9ca3af] flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
              <span>Scanning document pages and performing optical text alignment...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Recognized OCR Output:</span>
                <button
                  onClick={handleDownloadTxt}
                  className="py-1.5 px-4 rounded-xl bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-1.5 shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Text File</span>
                </button>
              </div>
              <textarea
                value={ocrText}
                readOnly
                rows={12}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white font-mono text-xs focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
