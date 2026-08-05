import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { FileText, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Type, AlignLeft } from 'lucide-react';

export default function WordToPdfTool() {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('document');
  const [fontSize, setFontSize] = useState(12);
  const [lineSpacing, setLineSpacing] = useState(1.4);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target?.result || '');
    };
    reader.onerror = () => setErrorMsg('Failed to read file contents.');
    reader.readAsText(file);
  };

  const generatePdf = async () => {
    if (!text.trim()) {
      setErrorMsg('Please enter or upload some document text first.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const margin = 50;
      const pageWidth = 595.28; // A4 width
      const pageHeight = 841.89; // A4 height
      const maxLineWidth = pageWidth - margin * 2;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      const lines = text.split('\n');
      for (const rawLine of lines) {
        const isHeader = rawLine.startsWith('# ');
        const lineFont = isHeader ? boldFont : font;
        const currentSize = isHeader ? fontSize + 4 : fontSize;
        const lineContent = isHeader ? rawLine.replace(/^#\s*/, '') : rawLine;

        // Simple text wrap
        const words = lineContent.split(' ');
        let currentLine = '';

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const textWidth = lineFont.widthOfTextAtSize(testLine, currentSize);
          if (textWidth > maxLineWidth && currentLine) {
            if (y < margin + currentSize) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - margin;
            }
            page.drawText(currentLine, { x: margin, y, size: currentSize, font: lineFont, color: rgb(0.15, 0.15, 0.18) });
            y -= currentSize * lineSpacing;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          if (y < margin + currentSize) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(currentLine, { x: margin, y, size: currentSize, font: lineFont, color: rgb(0.15, 0.15, 0.18) });
          y -= currentSize * lineSpacing;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
    } catch (err) {
      setErrorMsg('Could not generate PDF from text.');
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
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Word / Text to PDF</h1>
            <p className="text-sm text-[#676879]">Convert Word text, Markdown, or TXT files into cleanly formatted A4 PDF documents.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Documents are converted offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload or Paste */}
      <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#e6e9ef] hover:border-[#d0d4e4] text-[#1f2532] text-sm cursor-pointer transition-all">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Upload .TXT / .MD File</span>
            <input type="file" accept=".txt,.md,.doc,.docx" onChange={handleFileUpload} className="hidden" />
          </label>

          <div className="flex items-center gap-4 text-sm text-[#9ca3af]">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-blue-400" />
              <span>Font:</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-white border border-[#e6e9ef] rounded-lg px-2 py-1 text-[#1f2532]"
              >
                <option value={10}>10pt</option>
                <option value={12}>12pt</option>
                <option value={14}>14pt</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-blue-400" />
              <span>Spacing:</span>
              <select
                value={lineSpacing}
                onChange={(e) => setLineSpacing(Number(e.target.value))}
                className="bg-white border border-[#e6e9ef] rounded-lg px-2 py-1 text-[#1f2532]"
              >
                <option value={1.2}>Single</option>
                <option value={1.4}>1.4x</option>
                <option value={1.8}>1.8x</option>
              </select>
            </div>
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setPdfBlob(null); }}
          placeholder="Paste Word document text, Markdown, or upload a .txt/.md file..."
          rows={12}
          className="w-full bg-white border border-[#e6e9ef] rounded-xl p-4 text-[#1f2532] text-sm font-mono focus:outline-none focus:border-blue-500"
        />

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={generatePdf}
            disabled={loading || !text.trim()}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Convert to PDF</span>
              </>
            )}
          </button>

          {pdfBlob && (
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-5 h-5" />
              <span>Download A4 PDF</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
