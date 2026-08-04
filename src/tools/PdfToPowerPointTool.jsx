import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Presentation, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function PdfToPowerPointTool() {
  const [file, setFile] = useState(null);
  const [extractedDeck, setExtractedDeck] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setExtractedDeck(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }
    setFile(selected);
    setLoading(true);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPageCount(pdf.numPages);

      const slides = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        let slideTitle = `Slide #${i}`;
        const bulletPoints = [];
        let index = 0;

        content.items.forEach((item) => {
          const trimmed = item.str.trim();
          if (!trimmed) return;
          if (index === 0 && trimmed.length < 50) {
            slideTitle = trimmed;
          } else {
            bulletPoints.push(trimmed);
          }
          index++;
        });

        slides.push({
          number: i,
          title: slideTitle,
          notes: bulletPoints.slice(0, 10),
        });
      }

      setExtractedDeck(slides);
    } catch (err) {
      setErrorMsg('Failed to parse PDF slides.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDeckText = () => {
    if (!extractedDeck || !file) return;
    let output = `# ${file.name.toUpperCase()} — PRESENTATION SLIDES OUTLINE\n\n`;
    extractedDeck.forEach((slide) => {
      output += `## SLIDE ${slide.number}: ${slide.title}\n`;
      slide.notes.forEach((note) => {
        output += `  - ${note}\n`;
      });
      output += `\n--------------------------------------------\n\n`;
    });

    const blob = new Blob([output], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, '')}-presentation-outline.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">PDF to PowerPoint / Slide Notes</h1>
            <p className="text-sm text-[#9ca3af]">Convert PDF presentation pages into PowerPoint slide outlines and speaker notes.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Presentation slides are analyzed offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-white/20 hover:border-orange-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-white/[0.02] hover:bg-white/[0.04]">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drop PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Extracts slide headings and bullet points into PowerPoint/Keynote outline format</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Presentation className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{pageCount} slide(s) parsed</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setExtractedDeck(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
            >
              Replace PDF
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#9ca3af] flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-orange-400" />
              <span>Analyzing PDF slide layout and extracting speaker notes...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-white font-bold">Slide Deck Outline Extracted!</h3>
                    <p className="text-xs text-[#9ca3af]">Parsed {pageCount} slide(s) with titles and bullet points.</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadDeckText}
                  className="py-2.5 px-6 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Presentation Outline (.MD)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
