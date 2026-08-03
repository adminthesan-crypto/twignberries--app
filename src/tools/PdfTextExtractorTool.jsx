import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { FileText, Upload, Download, Copy, Check, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfTextExtractorTool() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setExtractedText('');
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
      setErrorMsg(`"${selected.name}" is not a valid PDF file.`);
      return;
    }
    try {
      setLoading(true);
      const buffer = await selected.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      setPageCount(pdf.numPages);
      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB'
      });

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items.map((item) => item.str).join(' ');
        fullText += `--- Page ${i} ---\n` + pageStrings + '\n\n';
      }

      if (!fullText.trim() || fullText.replace(/--- Page \d+ ---/g, '').trim().length === 0) {
        setErrorMsg('⚠️ This PDF contains no selectable text (it may be a scanned image).');
      } else {
        setExtractedText(fullText.trim());
      }
    } catch (err) {
      setErrorMsg(`❌ Failed to extract text: ${err.message || 'Corrupt PDF structure'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!extractedText || !file) return;
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${file.name.replace(/\.pdf$/i, '')}_extracted.txt`;
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
            100% Private PDF Text & Table Extractor
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "No need to copy-paste page by page or upload contracts to OCR servers. We extract every selectable string and table right in your browser memory."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#c3c6d4] hover:border-[#6161ff] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-[#fbfbfc] hover:bg-[#f5f6ff] transition-all">
          <Upload className="text-[#6161ff] mb-3" size={36} />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1f2532' }}>
            Drop PDF file to extract text & strings
          </span>
          <span style={{ fontSize: 13, color: '#868894', marginTop: 4 }}>
            Zero server uploads • Offline PDF.js parser
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
                <div style={{ fontSize: 12, color: '#676879' }}>{file.size} • {pageCount} Pages Parsed</div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setExtractedText(''); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50 transition"
            >
              Change File
            </button>
          </div>

          {loading ? (
            <div className="p-12 flex flex-col items-center gap-3 text-[#676879]">
              <RefreshCw className="animate-spin text-[#6161ff]" size={32} />
              <span className="text-sm font-bold">Extracting text across {pageCount} pages...</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#676879', textTransform: 'uppercase' }}>
                  Extracted Content ({extractedText.length.toLocaleString()} characters)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!extractedText}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] hover:bg-gray-50"
                  >
                    {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    disabled={!extractedText}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
                  >
                    <Download size={14} />
                    Download .TXT
                  </button>
                </div>
              </div>
              <textarea
                value={extractedText}
                readOnly
                placeholder="Extracted text will appear here..."
                rows={14}
                className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-[#fbfbfc] focus:outline-none"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
