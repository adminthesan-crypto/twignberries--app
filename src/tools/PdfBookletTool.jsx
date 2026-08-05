import React, { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, LayoutGrid } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function PdfBookletTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [layout, setLayout] = useState('2up'); // 2up, 4up
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [imposedPdfUrl, setImposedPdfUrl] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setImposedPdfUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
      setErrorMsg(`"${selected.name}" is not a valid PDF file.`);
      return;
    }
    try {
      const buffer = await selected.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: false });
      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB',
        buffer
      });
      setTotalPages(pdf.getPageCount());
    } catch (err) {
      setErrorMsg(`🔒 Failed to load PDF: ${err.message}`);
    }
  };

  const handleGenerateImposition = async () => {
    if (!file) return;
    try {
      setLoading(true);
      setErrorMsg(null);
      const srcDoc = await PDFDocument.load(file.buffer);
      const outDoc = await PDFDocument.create();
      const srcPages = srcDoc.getPages();
      const total = srcPages.length;

      if (layout === '2up') {
        for (let i = 0; i < total; i += 2) {
          const newPage = outDoc.addPage([PageSizes.A4[1], PageSizes.A4[0]]); // Landscape A4
          const { width, height } = newPage.getSize();
          const margin = 20;

          const [emb1] = await outDoc.embedPdf(srcDoc, [i]);
          const scaled1 = emb1.scaleToFit(width / 2 - margin * 1.5, height - margin * 2);
          newPage.drawPage(emb1, {
            ...scaled1,
            x: margin,
            y: (height - scaled1.height) / 2
          });

          if (i + 1 < total) {
            const [emb2] = await outDoc.embedPdf(srcDoc, [i + 1]);
            const scaled2 = emb2.scaleToFit(width / 2 - margin * 1.5, height - margin * 2);
            newPage.drawPage(emb2, {
              ...scaled2,
              x: width / 2 + margin * 0.5,
              y: (height - scaled2.height) / 2
            });
          }
        }
      } else {
        // 4up Layout
        for (let i = 0; i < total; i += 4) {
          const newPage = outDoc.addPage(PageSizes.A4);
          const { width, height } = newPage.getSize();
          const margin = 20;
          const cellW = (width - margin * 3) / 2;
          const cellH = (height - margin * 3) / 2;

          const positions = [
            { x: margin, y: height - margin - cellH }, // Top-left
            { x: margin * 2 + cellW, y: height - margin - cellH }, // Top-right
            { x: margin, y: margin }, // Bottom-left
            { x: margin * 2 + cellW, y: margin } // Bottom-right
          ];

          for (let j = 0; j < 4; j++) {
            if (i + j < total) {
              const [emb] = await outDoc.embedPdf(srcDoc, [i + j]);
              const scaled = emb.scaleToFit(cellW, cellH);
              newPage.drawPage(emb, {
                ...scaled,
                x: positions[j].x + (cellW - scaled.width) / 2,
                y: positions[j].y + (cellH - scaled.height) / 2
              });
            }
          }
        }
      }

      const pdfBytes = await outDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setImposedPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg(`❌ Imposition failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imposedPdfUrl || !file) return;
    const a = document.createElement('a');
    a.href = imposedPdfUrl;
    a.download = `${file.name.replace(/\.pdf$/i, '')}_${layout}_imposed.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side PDF Booklet & N-Up Imposer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Printing handouts, brochures, or slide decks? Combine 2 or 4 pages per sheet offline to save ink and paper without uploading your files anywhere."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#c3c6d4] hover:border-[#6161ff] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-[#fbfbfc] hover:bg-[#f5f6ff] transition-all">
          <Upload className="text-[#6161ff] mb-3" size={36} />
          <span style={{ fontSize: 16, fontWeight: 700, color: '#1f2532' }}>
            Drop PDF file to generate 2-Up / 4-Up sheets
          </span>
          <span style={{ fontSize: 13, color: '#868894', marginTop: 4 }}>
            Zero cloud uploads • Offline pdf-lib imposition
          </span>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-10">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-3">
              <FileText className="text-[#6161ff]" size={24} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
                <div style={{ fontSize: 12, color: '#676879' }}>{file.size} • {totalPages} Pages</div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setImposedPdfUrl(null); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50 transition"
            >
              Change File
            </button>
          </div>

          <div>
            <div style={SL}>Imposition Layout</div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => { setLayout('2up'); setImposedPdfUrl(null); }}
                className={`p-4 rounded-xl border-2 text-left transition ${
                  layout === '2up'
                    ? 'border-[#6161ff] bg-[#f5f6ff] text-[#1f2532]'
                    : 'border-[#e6e9ef] bg-white text-[#676879] hover:bg-gray-50'
                }`}
              >
                <div className="font-bold text-sm">2-Up Side by Side</div>
                <div className="text-xs mt-1 opacity-80">2 PDF pages per landscape sheet</div>
              </button>
              <button
                onClick={() => { setLayout('4up'); setImposedPdfUrl(null); }}
                className={`p-4 rounded-xl border-2 text-left transition ${
                  layout === '4up'
                    ? 'border-[#6161ff] bg-[#f5f6ff] text-[#1f2532]'
                    : 'border-[#e6e9ef] bg-white text-[#676879] hover:bg-gray-50'
                }`}
              >
                <div className="font-bold text-sm">4-Up Grid Sheet</div>
                <div className="text-xs mt-1 opacity-80">4 PDF pages per portrait A4 sheet</div>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              ✓ Reduces {totalPages} pages down to {Math.ceil(totalPages / (layout === '2up' ? 2 : 4))} printed sheets
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleGenerateImposition}
                disabled={loading}
                className="px-5 py-2.5 rounded-lg border border-[#6161ff] text-[#6161ff] text-sm font-bold hover:bg-[#eceeff]"
              >
                {loading ? 'Imposing...' : `Generate ${layout.toUpperCase()} Sheet`}
              </button>
              {imposedPdfUrl && (
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-2"
                  style={{ padding: '11px 24px', fontSize: 14 }}
                >
                  <Download size={16} />
                  Download Imposed PDF
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
