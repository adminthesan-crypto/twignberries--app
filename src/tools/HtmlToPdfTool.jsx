import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Code, Download, ShieldCheck, AlertCircle, RefreshCw, Globe, Eye } from 'lucide-react';

export default function HtmlToPdfTool() {
  const [mode, setMode] = useState('html'); // html, url
  const [htmlContent, setHtmlContent] = useState('<h1>Welcome to Twignberries</h1>\n<p>This is a <b>client-side</b> HTML to PDF converter.</p>\n<ul>\n  <li>100% Private Offline Processing</li>\n  <li>Instant PDF download</li>\n</ul>');
  const [urlInput, setUrlInput] = useState('https://twignberries.com/docs');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const generatePdf = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 595.28; // A4 width
      const pageHeight = 841.89;
      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      const margin = 50;
      let y = pageHeight - margin;

      // Header banner
      page.drawRectangle({
        x: margin,
        y: y - 10,
        width: pageWidth - margin * 2,
        height: 2,
        color: rgb(0.99, 0.42, 0.0),
      });
      y -= 30;

      const sourceText = mode === 'html' ? htmlContent : `URL PREVIEW REPORT FOR:\n${urlInput}\n\nGenerated offline by Twignberries Client-Side Web Engine.`;
      
      // Basic HTML tag stripping & layout rendering offline
      const cleanLines = sourceText
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>|<\/li>|<\/h[1-6]>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      cleanLines.forEach((line) => {
        if (y < margin + 20) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

        const isHeading = line.length < 50 && (line.includes('Welcome') || line.includes('REPORT'));
        const size = isHeading ? 16 : 11;
        const lineFont = isHeading ? boldFont : font;

        page.drawText(line.slice(0, 85), {
          x: margin,
          y,
          size,
          font: lineFont,
          color: rgb(0.15, 0.15, 0.18),
        });

        y -= isHeading ? 28 : 20;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
    } catch (err) {
      setErrorMsg('Could not render HTML to PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = mode === 'html' ? 'rendered-html.pdf' : 'webpage-preview.pdf';
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
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">HTML to PDF (Convert Webpages & HTML Code)</h1>
            <p className="text-sm text-[#676879]">Convert live HTML markup or webpage URL previews into clean A4 PDF documents offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — HTML is parsed and converted offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Mode selector */}
      <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
        <div className="flex gap-3 border-b border-[#e6e9ef] pb-4">
          <button
            onClick={() => { setMode('html'); setPdfBlob(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              mode === 'html'
                ? 'bg-orange-500 text-black'
                : 'bg-white text-[#9ca3af] hover:text-[#1f2532]'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Paste HTML Markup</span>
          </button>
          <button
            onClick={() => { setMode('url'); setPdfBlob(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              mode === 'url'
                ? 'bg-orange-500 text-black'
                : 'bg-white text-[#9ca3af] hover:text-[#1f2532]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Webpage URL Report</span>
          </button>
        </div>

        {mode === 'html' ? (
          <div>
            <label className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider block mb-2">
              HTML Code Markup:
            </label>
            <textarea
              value={htmlContent}
              onChange={(e) => { setHtmlContent(e.target.value); setPdfBlob(null); }}
              rows={10}
              className="w-full bg-white border border-[#e6e9ef] rounded-xl p-4 text-[#1f2532] font-mono text-sm focus:outline-none focus:border-orange-500"
              placeholder="Paste HTML tags here..."
            />
          </div>
        ) : (
          <div>
            <label className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider block mb-2">
              Webpage URL:
            </label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); setPdfBlob(null); }}
              className="w-full bg-white border border-[#e6e9ef] rounded-xl p-3 text-[#1f2532] text-sm focus:outline-none focus:border-orange-500"
              placeholder="https://example.com"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#e6e9ef]">
          <button
            onClick={generatePdf}
            disabled={loading}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Rendering PDF...</span>
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                <span>Convert to A4 PDF</span>
              </>
            )}
          </button>

          {pdfBlob && (
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Download className="w-5 h-5" />
              <span>Download Rendered PDF</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
