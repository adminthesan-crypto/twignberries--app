import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Table, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, FileSpreadsheet } from 'lucide-react';

if (pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export default function PdfToExcelTool() {
  const [file, setFile] = useState(null);
  const [csvContent, setCsvContent] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setCsvContent(null);
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
      
      let allRows = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        
        // Group items roughly by y coordinate to form rows
        const rowMap = {};
        content.items.forEach((item) => {
          if (!item.str.trim()) return;
          const yKey = Math.round(item.transform[5] / 8) * 8; // Group within 8pt y-bands
          if (!rowMap[yKey]) rowMap[yKey] = [];
          rowMap[yKey].push({ x: item.transform[4], str: item.str });
        });

        // Sort y descending (top to bottom of page)
        const sortedYs = Object.keys(rowMap).sort((a, b) => Number(b) - Number(a));
        sortedYs.forEach((y) => {
          // Sort items by x (left to right)
          const cells = rowMap[y]
            .sort((a, b) => a.x - b.x)
            .map((item) => `"${item.str.replace(/"/g, '""')}"`);
          if (cells.length > 0) {
            allRows.push(cells.join(','));
          }
        });
      }

      if (allRows.length === 0) {
        setErrorMsg('No selectable text or table data found in this PDF.');
      } else {
        setCsvContent(allRows.join('\n'));
        setRowCount(allRows.length);
      }
    } catch (err) {
      setErrorMsg('Could not extract tabular data from this PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCsv = () => {
    if (!csvContent || !file) return;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, '')}-extracted.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">PDF to Excel / CSV</h1>
            <p className="text-sm text-[#676879]">Pull table rows and structured data from PDFs straight into Excel or CSV spreadsheets.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Data is extracted offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-emerald-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Extracts table rows and columns to .CSV format for Excel or Google Sheets</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">{rowCount} rows detected and formatted</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setCsvContent(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace PDF
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-[#9ca3af] flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
              <span>Scanning PDF pages and grouping tabular coordinates...</span>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-[#1f2532] font-bold">Spreadsheet Ready for Download!</h3>
                    <p className="text-xs text-[#9ca3af]">Extracted {rowCount} table row(s) into spreadsheet CSV format.</p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadCsv}
                  className="py-2.5 px-6 rounded-xl bg-emerald-400 text-black font-bold hover:bg-emerald-300 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CSV Spreadsheet</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
