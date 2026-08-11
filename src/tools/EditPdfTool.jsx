import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Edit3, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, Plus, Trash2, Type, Square } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function EditPdfTool() {
  const [file, setFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [annotations, setAnnotations] = useState([
    { type: 'text', page: 1, x: 100, y: 750, text: 'CONFIDENTIAL DRAFT', color: 'red', size: 14 },
    { type: 'box', page: 1, x: 50, y: 680, width: 300, height: 40, color: 'blue' },
  ]);
  const [editedPdf, setEditedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setEditedPdf(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF document.');
      return;
    }
    setFile(selected);
    try {
      const arrayBuffer = await selected.arrayBuffer();
      const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch (err) {
      setErrorMsg('Could not inspect PDF page count.');
    }
  };

  const handleAddAnnotation = (type) => {
    if (type === 'text') {
      setAnnotations([
        ...annotations,
        { type: 'text', page: 1, x: 100, y: 600, text: 'New Annotation Note', color: 'black', size: 12 },
      ]);
    } else {
      setAnnotations([
        ...annotations,
        { type: 'box', page: 1, x: 100, y: 500, width: 200, height: 30, color: 'emerald' },
      ]);
    }
    setEditedPdf(null);
  };

  const handleRemoveAnnotation = (idx) => {
    setAnnotations(annotations.filter((_, i) => i !== idx));
    setEditedPdf(null);
  };

  const handleAnnotationChange = (idx, field, val) => {
    const next = [...annotations];
    next[idx][field] = field === 'text' || field === 'color' || field === 'type' ? val : Number(val);
    setAnnotations(next);
    setEditedPdf(null);
  };

  const handleSaveEdits = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      const colorMap = {
        red: rgb(0.85, 0.15, 0.15),
        blue: rgb(0.15, 0.4, 0.85),
        emerald: rgb(0.1, 0.65, 0.4),
        black: rgb(0.1, 0.1, 0.15),
      };

      annotations.forEach((ann) => {
        const pIdx = Math.max(0, Math.min(pages.length - 1, Number(ann.page) - 1));
        const page = pages[pIdx];
        const c = colorMap[ann.color] || colorMap.black;

        if (ann.type === 'text') {
          page.drawText(ann.text || '', {
            x: Number(ann.x),
            y: Number(ann.y),
            size: Number(ann.size) || 12,
            font,
            color: c,
          });
        } else if (ann.type === 'box') {
          page.drawRectangle({
            x: Number(ann.x),
            y: Number(ann.y),
            width: Number(ann.width) || 100,
            height: Number(ann.height) || 30,
            borderColor: c,
            borderWidth: 2,
          });
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setEditedPdf(blob);
    } catch (err) {
      setErrorMsg('Failed to apply annotations to this PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!editedPdf || !file) return;
    const url = URL.createObjectURL(editedPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edited-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Edit PDF (Add Text, Shapes & Annotations)</h1>
            <p className="text-sm text-[#676879]">Add custom text labels, callout boxes, stamps, and geometric highlights to any PDF page.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Annotations are rendered offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-6 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-emerald-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Add custom annotations and shapes directly to PDF pages offline</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-6">
              <FileText className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{pageCount} page(s) loaded</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setEditedPdf(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace PDF
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-[#1f2532]">Document Annotations:</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddAnnotation('text')}
                  className="py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs font-semibold flex items-center gap-3.5 transition-all"
                >
                  <Type className="w-4 h-4 text-emerald-400" />
                  <span>Add Text</span>
                </button>
                <button
                  onClick={() => handleAddAnnotation('box')}
                  className="py-1.5 px-3 rounded-lg bg-gray-100 hover:bg-white/20 text-[#1f2532] text-xs font-semibold flex items-center gap-3.5 transition-all"
                >
                  <Square className="w-4 h-4 text-blue-400" />
                  <span>Add Box</span>
                </button>
              </div>
            </div>

            <div className="space-y-6 max-h-72 overflow-y-auto pr-2">
              {annotations.map((ann, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white border border-[#e6e9ef] flex flex-wrap items-center gap-6 text-xs">
                  <span className="font-bold text-emerald-400 uppercase">{ann.type}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#9ca3af]">Page:</span>
                    <input
                      type="number"
                      value={ann.page}
                      onChange={(e) => handleAnnotationChange(idx, 'page', e.target.value)}
                      className="w-14 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                    />
                  </div>
                  {ann.type === 'text' ? (
                    <input
                      type="text"
                      value={ann.text}
                      onChange={(e) => handleAnnotationChange(idx, 'text', e.target.value)}
                      className="flex-1 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532] min-w-[120px]"
                    />
                  ) : (
                    <>
                      <input
                        type="number"
                        value={ann.width}
                        onChange={(e) => handleAnnotationChange(idx, 'width', e.target.value)}
                        className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                        placeholder="W"
                      />
                      <input
                        type="number"
                        value={ann.height}
                        onChange={(e) => handleAnnotationChange(idx, 'height', e.target.value)}
                        className="w-16 bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                        placeholder="H"
                      />
                    </>
                  )}
                  <select
                    value={ann.color}
                    onChange={(e) => handleAnnotationChange(idx, 'color', e.target.value)}
                    className="bg-black/60 border border-[#e6e9ef] rounded px-2 py-1 text-[#1f2532]"
                  >
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="emerald">Green</option>
                    <option value="black">Black</option>
                  </select>
                  <button
                    onClick={() => handleRemoveAnnotation(idx)}
                    className="text-red-400 hover:text-red-300 ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={handleSaveEdits}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Rendering Annotations...</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-5 h-5" />
                  <span>Save Edited PDF</span>
                </>
              )}
            </button>

            {editedPdf && (
              <>
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Edited PDF</span>
                </button>
                <NativeShareButton
                  fileUrl={URL.createObjectURL(editedPdf)}
                  fileName={`edited-${file.name}`}
                  mimeType="application/pdf"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
