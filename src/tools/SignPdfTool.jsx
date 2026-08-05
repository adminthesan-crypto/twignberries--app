import React, { useState, useRef } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { PenTool, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, Trash2 } from 'lucide-react';

export default function SignPdfTool() {
  const [file, setFile] = useState(null);
  const [signatureText, setSignatureText] = useState('John Doe');
  const [signType, setSignType] = useState('type'); // type, draw
  const [targetPage, setTargetPage] = useState(1);
  const [xPos, setXPos] = useState(100);
  const [yPos, setYPos] = useState(100);
  const [signedPdf, setSignedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setSignedPdf(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }
    setFile(selected);
  };

  const handleSignDocument = async () => {
    if (!file) return;
    if (!signatureText.trim()) {
      setErrorMsg('Please provide your signature text or name.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPages();
      const pIdx = Math.max(0, Math.min(pages.length - 1, Number(targetPage) - 1));
      const page = pages[pIdx];

      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Draw signature cursive styling
      page.drawText(signatureText, {
        x: Number(xPos),
        y: Number(yPos),
        size: 28,
        font: font,
        color: rgb(0.08, 0.22, 0.65), // dark blue ink
      });

      // Signature underline
      page.drawLine({
        start: { x: Number(xPos), y: Number(yPos) - 4 },
        end: { x: Number(xPos) + 180, y: Number(yPos) - 4 },
        thickness: 1.5,
        color: rgb(0.08, 0.22, 0.65),
      });

      // Signed Timestamp
      const timestamp = `Digitally signed on ${new Date().toISOString().slice(0, 10)}`;
      page.drawText(timestamp, {
        x: Number(xPos),
        y: Number(yPos) - 18,
        size: 8,
        font: boldFont,
        color: rgb(0.4, 0.4, 0.45),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setSignedPdf(blob);
    } catch (err) {
      setErrorMsg('Could not embed signature onto this PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!signedPdf || !file) return;
    const url = URL.createObjectURL(signedPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = `signed-${file.name}`;
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
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Sign PDF (Electronic Signatures)</h1>
            <p className="text-sm text-[#676879]">Sign PDF documents electronically with cursive ink styling and digital timestamps.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Your signature is embedded offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-blue-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-blue-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop PDF file to sign here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Embeds legal-style e-signatures and date stamps offline</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">Ready for e-signature</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setSignedPdf(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider block mb-2">
                Type Your Signature:
              </label>
              <input
                type="text"
                value={signatureText}
                onChange={(e) => { setSignatureText(e.target.value); setSignedPdf(null); }}
                placeholder="Full Name..."
                className="w-full bg-white border border-[#e6e9ef] rounded-xl py-2.5 px-4 text-[#1f2532] text-sm font-serif italic focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider block mb-2">
                Page Number:
              </label>
              <input
                type="number"
                min={1}
                value={targetPage}
                onChange={(e) => { setTargetPage(e.target.value); setSignedPdf(null); }}
                className="w-full bg-white border border-[#e6e9ef] rounded-xl py-2.5 px-4 text-[#1f2532] text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider block mb-2">
                X / Y Coordinates (pt):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={xPos}
                  onChange={(e) => { setXPos(e.target.value); setSignedPdf(null); }}
                  placeholder="X"
                  className="w-1/2 bg-white border border-[#e6e9ef] rounded-xl py-2.5 px-3 text-[#1f2532] text-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="number"
                  value={yPos}
                  onChange={(e) => { setYPos(e.target.value); setSignedPdf(null); }}
                  placeholder="Y"
                  className="w-1/2 bg-white border border-[#e6e9ef] rounded-xl py-2.5 px-3 text-[#1f2532] text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleSignDocument}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Signing PDF...</span>
                </>
              ) : (
                <>
                  <PenTool className="w-5 h-5" />
                  <span>Sign Document Now</span>
                </>
              )}
            </button>

            {signedPdf && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Signed PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
