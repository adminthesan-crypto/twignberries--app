import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Columns, Upload, FileText, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function ComparePdfTool() {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [diffStats, setDiffStats] = useState({ added: 0, removed: 0, identical: true });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const extractPdfText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      content.items.forEach((item) => {
        if (item.str) fullText += item.str + ' ';
      });
      fullText += '\n';
    }
    return fullText.trim();
  };

  const handleCompare = async () => {
    if (!fileA || !fileB) {
      setErrorMsg('Please upload both Original and Modified PDF files.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const [tA, tB] = await Promise.all([extractPdfText(fileA), extractPdfText(fileB)]);
      setTextA(tA);
      setTextB(tB);

      const wordsA = tA.split(/\s+/);
      const wordsB = tB.split(/\s+/);
      const setA = new Set(wordsA);
      const setB = new Set(wordsB);

      let added = 0;
      let removed = 0;
      wordsB.forEach((w) => { if (!setA.has(w)) added++; });
      wordsA.forEach((w) => { if (!setB.has(w)) removed++; });

      setDiffStats({
        added,
        removed,
        identical: tA === tB,
      });
    } catch (err) {
      setErrorMsg('Could not read or compare text from the uploaded PDFs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Columns className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Compare PDF (Side-by-Side Document Diff)</h1>
            <p className="text-sm text-[#676879]">Compare two PDF versions side-by-side to instantly spot additions, deletions, and wording changes.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Documents are compared offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload both files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-4">
          <h3 className="text-[#1f2532] font-bold text-sm">1. Original PDF Version</h3>
          {!fileA ? (
            <label className="border-2 border-dashed border-[#d0d4e4] hover:border-purple-500/50 rounded-xl p-8 text-center cursor-pointer block bg-[#f6f8fa]">
              <input type="file" accept="application/pdf" onChange={(e) => setFileA(e.target.files?.[0])} className="hidden" />
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-[#1f2532] font-medium text-sm">Select Original PDF</p>
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e6e9ef]">
              <span className="text-[#1f2532] text-sm truncate">{fileA.name}</span>
              <button onClick={() => { setFileA(null); setTextA(''); }} className="text-xs text-red-400 hover:text-red-300">
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-4">
          <h3 className="text-[#1f2532] font-bold text-sm">2. Modified PDF Version</h3>
          {!fileB ? (
            <label className="border-2 border-dashed border-[#d0d4e4] hover:border-purple-500/50 rounded-xl p-8 text-center cursor-pointer block bg-[#f6f8fa]">
              <input type="file" accept="application/pdf" onChange={(e) => setFileB(e.target.files?.[0])} className="hidden" />
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-[#1f2532] font-medium text-sm">Select Modified PDF</p>
            </label>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#e6e9ef]">
              <span className="text-[#1f2532] text-sm truncate">{fileB.name}</span>
              <button onClick={() => { setFileB(null); setTextB(''); }} className="text-xs text-red-400 hover:text-red-300">
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleCompare}
          disabled={loading || !fileA || !fileB}
          className="py-3 px-8 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-600 disabled:opacity-50 transition-all inline-flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Comparing Document Streams...</span>
            </>
          ) : (
            <>
              <Columns className="w-5 h-5" />
              <span>Compare PDF Versions</span>
            </>
          )}
        </button>
      </div>

      {/* Comparison View */}
      {(textA || textB) && (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#e6e9ef] text-sm">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#1f2532]">Comparison Report:</span>
              {diffStats.identical ? (
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold">Identical Documents</span>
              ) : (
                <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-semibold">Differences Detected</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="text-emerald-400">+{diffStats.added} unique words in Modified</span>
              <span className="text-red-400">-{diffStats.removed} unique words in Original</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Original Document Content:</h4>
              <textarea
                value={textA}
                readOnly
                rows={12}
                className="w-full bg-white border border-[#e6e9ef] rounded-xl p-4 text-[#9ca3af] font-mono text-xs focus:outline-none"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Modified Document Content:</h4>
              <textarea
                value={textB}
                readOnly
                rows={12}
                className="w-full bg-white border border-[#e6e9ef] rounded-xl p-4 text-[#1f2532] font-mono text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
