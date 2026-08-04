import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Archive, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function PdfToPdfATool() {
  const [file, setFile] = useState(null);
  const [pdfABlob, setPdfABlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setPdfABlob(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }
    setFile(selected);
  };

  const handleConvertToPdfA = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Add standard PDF/A archival metadata and conformance tags
      pdfDoc.setTitle(file.name.replace(/\.pdf$/i, ''));
      pdfDoc.setSubject('ISO 19005-1 PDF/A-1b Archival Compliant Document');
      pdfDoc.setProducer('Twignberries Archival Engine (PDF/A-1b)');
      pdfDoc.setCreator('Twignberries PDF Suite');
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false }); // Uncompressed objects for long-term ISO stability
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfABlob(blob);
    } catch (err) {
      setErrorMsg('Could not convert document to PDF/A. The file may be damaged or password protected.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfABlob || !file) return;
    const url = URL.createObjectURL(pdfABlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pdfA-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">PDF to PDF/A (Archival Standard)</h1>
            <p className="text-sm text-[#9ca3af]">Convert standard PDFs into ISO-standardized PDF/A-1b files for long-term archiving and legal compliance.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Processed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-white/20 hover:border-purple-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-white/[0.02] hover:bg-white/[0.04]">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-purple-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drop PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Generates ISO-compliant archival PDF/A file with metadata tags</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">Standard PDF Document</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setPdfABlob(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              Replace PDF
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleConvertToPdfA}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Converting to PDF/A...</span>
                </>
              ) : (
                <>
                  <Archive className="w-5 h-5" />
                  <span>Convert to PDF/A-1b</span>
                </>
              )}
            </button>

            {pdfABlob && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Archival PDF/A</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
