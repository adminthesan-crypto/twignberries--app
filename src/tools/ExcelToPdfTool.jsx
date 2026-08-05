import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Table, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, FileSpreadsheet } from 'lucide-react';

export default function ExcelToPdfTool() {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState('table-report');
  const [pdfBlob, setPdfBlob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setPdfBlob(null);
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result || '';
      const rows = text
        .split('\n')
        .map((row) => row.split(',').map((cell) => cell.trim().replace(/^"|"$/g, '')))
        .filter((row) => row.length > 0 && row.some((c) => c !== ''));
      if (rows.length === 0) {
        setErrorMsg('Uploaded file is empty.');
        return;
      }
      setCsvData(rows);
    };
    reader.onerror = () => setErrorMsg('Could not read spreadsheet file.');
    reader.readAsText(file);
  };

  const generatePdfTable = async () => {
    if (csvData.length === 0) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const margin = 40;
      const pageWidth = 595.28; // A4 portrait
      const pageHeight = 841.89;
      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin - 20;

      // Title
      page.drawText(fileName.toUpperCase() + ' — SPREADSHEET REPORT', {
        x: margin,
        y,
        size: 14,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.15),
      });
      y -= 30;

      const numCols = Math.max(...csvData.map((r) => r.length));
      const colWidth = (pageWidth - margin * 2) / numCols;
      const rowHeight = 24;

      csvData.forEach((row, rowIndex) => {
        if (y < margin + rowHeight) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin - 20;
        }

        const isHeader = rowIndex === 0;
        // Row background shading for header or alternate rows
        if (isHeader) {
          page.drawRectangle({
            x: margin,
            y: y - 6,
            width: pageWidth - margin * 2,
            height: rowHeight,
            color: rgb(0.9, 0.93, 0.98),
          });
        } else if (rowIndex % 2 === 1) {
          page.drawRectangle({
            x: margin,
            y: y - 6,
            width: pageWidth - margin * 2,
            height: rowHeight,
            color: rgb(0.97, 0.97, 0.98),
          });
        }

        row.forEach((cell, colIndex) => {
          const textStr = String(cell || '').slice(0, 22); // Truncate cell text nicely
          page.drawText(textStr, {
            x: margin + colIndex * colWidth + 6,
            y,
            size: isHeader ? 10 : 9,
            font: isHeader ? boldFont : font,
            color: isHeader ? rgb(0.1, 0.2, 0.5) : rgb(0.2, 0.2, 0.25),
          });
        });

        y -= rowHeight;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
    } catch (err) {
      setErrorMsg('Failed to generate PDF Table report.');
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
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Excel / CSV to PDF</h1>
            <p className="text-sm text-[#676879]">Convert spreadsheet tables and CSV data into cleanly styled PDF table reports.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Spreadsheets are formatted offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {csvData.length === 0 ? (
        <label className="border-2 border-dashed border-[#d0d4e4] hover:border-emerald-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-[#f6f8fa] hover:bg-white">
          <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop CSV / Spreadsheet file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Generates beautifully aligned PDF tables with alternating shaded rows</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-3">
              <Table className="w-8 h-8 text-emerald-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{fileName}.csv</p>
                <p className="text-xs text-[#9ca3af]">{csvData.length} rows loaded</p>
              </div>
            </div>
            <button
              onClick={() => { setCsvData([]); setPdfBlob(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Upload Another CSV
            </button>
          </div>

          {/* Table Preview */}
          <div className="overflow-x-auto max-h-60 rounded-xl border border-[#e6e9ef]">
            <table className="w-full text-left text-xs text-[#9ca3af]">
              <thead className="bg-white text-[#1f2532]">
                <tr>
                  {csvData[0].map((header, idx) => (
                    <th key={idx} className="p-3 font-semibold border-b border-[#e6e9ef]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {csvData.slice(1, 6).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#f6f8fa]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={generatePdfTable}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Formatting PDF Table...</span>
                </>
              ) : (
                <>
                  <Table className="w-5 h-5" />
                  <span>Generate Styled PDF Table</span>
                </>
              )}
            </button>

            {pdfBlob && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF Report</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
