import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, FileCode } from 'lucide-react';

if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function PdfToWordTool() {
  const [file, setFile] = useState(null);
  const [docContent, setDocContent] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setDocContent(null);
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

      let fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${selected.name}</title><style>body{font-family:Arial,sans-serif;line-height:1.5;margin:40px;color:#222;} h2{color:#111;border-bottom:1px solid #ccc;padding-bottom:6px;} p{margin-bottom:12px;}</style></head><body>`;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullHtml += `<h2>Page ${i}</h2>`;
        let paragraph = '';
        content.items.forEach((item) => {
          if (item.str.trim()) {
            paragraph += item.str + ' ';
          } else if (paragraph) {
            fullHtml += `<p>${paragraph.trim()}</p>`;
            paragraph = '';
          }
        });
        if (paragraph) {
          fullHtml += `<p>${paragraph.trim()}</p>`;
        }
      }
      fullHtml += '</body></html>';
      setDocContent(fullHtml);
    } catch (err) {
      setErrorMsg('Failed to read PDF text. The document may be encrypted or scanned.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadWord = () => {
    if (!docContent || !file) return;
    const blob = new Blob([docContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, '')}-extracted.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-sky-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">PDF to Word (.DOCX / .DOC)</h1>
            <p className="text-sm text-[#9ca3af]">Extract headings, paragraphs, and text from PDF into editable Microsoft Word documents.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Documents are processed entirely offline.</span>
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
          <p className="text-white font-medium mb-1">Drop PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Extracts editable paragraphs and layout to Microsoft Word format</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{pageCount} page{pageCount !== 1 ? 's' : ''} extracted</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setDocContent(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              Replace PDF
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#9ca3af] flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
              <span>Analyzing PDF structure and building Word document...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-white font-bold">Word Document Ready!</h3>
                    <p className="text-xs text-[#9ca3af]">Extracted text from {pageCount} page(s) into Word-compatible .DOC file.</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadWord}
                  className="py-2.5 px-6 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Word Document</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
