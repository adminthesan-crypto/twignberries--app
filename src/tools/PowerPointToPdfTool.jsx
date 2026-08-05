import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Presentation, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Plus, Trash2 } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function PowerPointToPdfTool() {
  const [slides, setSlides] = useState([
    { title: 'Welcome to Twignberries 2026', points: 'Comprehensive Offline Utility Workspace\n100% Client-Side Privacy\nDesigned for Founders & Creators' },
    { title: 'Why Offline PDF & UI Tools Matter', points: 'Zero Server Uploads — Complete Confidentiality\nInstant Processing Speed\nNo Subscription or Paywall Lock-in' },
    { title: 'Next Steps & Action Plan', points: 'Deploy to Vercel & Custom Domain\nLaunch on Reddit, HackerNews, and ProductHunt\nGrow Organically with SEO Utility Pages' }
  ]);
  const [fileName, setFileName] = useState('presentation-handout');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleAddSlide = () => {
    setSlides([...slides, { title: `Slide ${slides.length + 1}`, points: 'Add presentation bullet points here...' }]);
    setPdfBlob(null);
  };

  const handleRemoveSlide = (idx) => {
    setSlides(slides.filter((_, i) => i !== idx));
    setPdfBlob(null);
  };

  const handleSlideChange = (idx, field, value) => {
    const next = [...slides];
    next[idx][field] = value;
    setSlides(next);
    setPdfBlob(null);
  };

  const generatePresentationPdf = async () => {
    if (slides.length === 0) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 841.89; // A4 landscape width
      const pageHeight = 595.28; // A4 landscape height
      const margin = 60;

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Background card accent
        page.drawRectangle({
          x: margin - 15,
          y: margin - 15,
          width: pageWidth - (margin - 15) * 2,
          height: pageHeight - (margin - 15) * 2,
          color: rgb(0.98, 0.98, 0.99),
          borderColor: rgb(0.85, 0.88, 0.94),
          borderWidth: 2,
        });

        // Top brand bar
        page.drawRectangle({
          x: margin - 15,
          y: pageHeight - margin - 10,
          width: pageWidth - (margin - 15) * 2,
          height: 8,
          color: rgb(0.99, 0.42, 0.0), // #ff6b00 orange accent
        });

        // Slide Title
        page.drawText(slide.title.slice(0, 50), {
          x: margin,
          y: pageHeight - margin - 50,
          size: 26,
          font: boldFont,
          color: rgb(0.1, 0.1, 0.15),
        });

        // Bullet Points
        const lines = slide.points.split('\n').filter((l) => l.trim().length > 0);
        let y = pageHeight - margin - 110;
        lines.forEach((line) => {
          page.drawText('•  ' + line.slice(0, 80), {
            x: margin + 10,
            y,
            size: 16,
            font: font,
            color: rgb(0.25, 0.25, 0.3),
          });
          y -= 32;
        });

        // Footer / Slide Number
        page.drawText(`Slide ${i + 1} of ${slides.length} — ${fileName}`, {
          x: margin,
          y: margin,
          size: 10,
          font: font,
          color: rgb(0.6, 0.6, 0.65),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
    } catch (err) {
      setErrorMsg('Failed to generate Presentation PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">PowerPoint to PDF</h1>
            <p className="text-sm text-[#676879]">Create clean A4 landscape presentation handouts and slide decks offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Presentation slides are generated offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Slide Editor */}
      <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
          <div>
            <h3 className="text-[#1f2532] font-semibold">Presentation Slides Outline</h3>
            <p className="text-xs text-[#9ca3af]">Edit slide titles and bullet points below</p>
          </div>
          <button
            onClick={handleAddSlide}
            className="py-2 px-4 rounded-xl bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {slides.map((slide, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-[#e6e9ef] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Slide #{idx + 1}</span>
                {slides.length > 1 && (
                  <button
                    onClick={() => handleRemoveSlide(idx)}
                    className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
              <input
                type="text"
                value={slide.title}
                onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                placeholder="Slide Title..."
                className="w-full bg-white border border-[#e6e9ef] rounded-lg p-2.5 text-[#1f2532] font-semibold text-sm focus:outline-none focus:border-orange-500"
              />
              <textarea
                value={slide.points}
                onChange={(e) => handleSlideChange(idx, 'points', e.target.value)}
                placeholder="Bullet points (one per line)..."
                rows={3}
                className="w-full bg-white border border-[#e6e9ef] rounded-lg p-2.5 text-[#9ca3af] text-xs focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#e6e9ef]">
          <button
            onClick={generatePresentationPdf}
            disabled={loading || slides.length === 0}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating Slide Deck...</span>
              </>
            ) : (
              <>
                <Presentation className="w-5 h-5" />
                <span>Generate A4 Landscape Deck</span>
              </>
            )}
          </button>

          {pdfBlob && (
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Slides PDF</span>
              </button>
              <NativeShareButton 
                fileUrl={URL.createObjectURL(pdfBlob)}
                fileName={`${fileName}.pdf`}
                mimeType="application/pdf"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
