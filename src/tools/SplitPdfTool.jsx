import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Scissors, Upload, FileText, Download, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function SplitPdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [mode, setMode] = useState('range'); // 'range' | 'all'
  const [rangeInput, setRangeInput] = useState('1-2');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [extractedCount, setExtractedCount] = useState(0);

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setResultUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
      setErrorMsg(`"${selected.name}" is not a valid PDF file.`);
      return;
    }
    try {
      const buffer = await selected.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: false });
      const count = pdfDoc.getPageCount();
      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB',
        buffer
      });
      setTotalPages(count);
      setRangeInput(count > 1 ? `1-${Math.min(2, count)}` : '1');
    } catch (err) {
      if (err.message && err.message.includes('encrypted')) {
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Please remove the password before splitting.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid, uncorrupted PDF.`);
      }
    }
  };

  const parseRange = (input, maxPages) => {
    const pages = new Set();
    const parts = input.split(',').map(s => s.trim()).filter(Boolean);
    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
          throw new Error(`Invalid range "${part}". Valid pages are 1 to ${maxPages}.`);
        }
        for (let p = start; p <= end; p++) {
          pages.add(p - 1); // 0-indexed for pdf-lib
        }
      } else {
        const p = parseInt(part, 10);
        if (isNaN(p) || p < 1 || p > maxPages) {
          throw new Error(`Page number "${part}" is out of bounds (1-${maxPages}).`);
        }
        pages.add(p - 1);
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const sourceDoc = await PDFDocument.load(file.buffer);
      let pageIndices = [];

      if (mode === 'range') {
        pageIndices = parseRange(rangeInput, totalPages);
        if (pageIndices.length === 0) {
          throw new Error('Please enter at least one valid page number to extract.');
        }
      } else {
        // 'all' mode: extract all pages
        pageIndices = sourceDoc.getPageIndices();
      }

      const newPdf = await PDFDocument.create();
      const copied = await newPdf.copyPages(sourceDoc, pageIndices);
      copied.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setExtractedCount(pageIndices.length);
    } catch (err) {
      setErrorMsg(err.message || 'Error splitting PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Range Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF to Split or Extract (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="split-upload"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '36px 26px', border: '2px dashed #d0d4e4', borderRadius: 16,
                background: '#f6f8fa', cursor: 'pointer', transition: 'all 0.15s ease',
                textAlign: 'center'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#6161ff'; e.currentTarget.style.background = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#d0d4e4'; e.currentTarget.style.background = '#f6f8fa'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: '#eceeff', color: '#6161ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Upload size={22} />
              </div>
              <span className="dropzone-title">Click to select a PDF document</span>
              <span style={{ fontSize: 13, color: '#676879', marginTop: 4 }}>
                Instant offline page extraction • Zero server uploads
              </span>
              <input
                id="split-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderRadius: 14, background: '#f7f9fc', border: '1px solid #e6e9ef' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, minWidth: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#eceeff', color: '#6161ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={20} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
                    {totalPages} Total Pages • {file.size}
                  </div>
                </div>
              </div>
              <button
                onClick={() => { setFile(null); setTotalPages(0); setResultUrl(null); setErrorMsg(null); }}
                style={{ padding: '8px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#ffffff', color: '#1f2532', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                Change file
              </button>
            </div>
          )}

          {errorMsg && (
            <div style={{ marginTop: 16, padding: '24px 26px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {file && (
          <div className="form-card">
            <div style={SL}>2. Select Pages to Extract</div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => { setMode('range'); setResultUrl(null); }}
                style={{
                  padding: '14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                  border: mode === 'range' ? '2px solid #6161ff' : '1px solid #d0d4e4',
                  background: mode === 'range' ? '#eceeff' : '#ffffff',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: mode === 'range' ? '#6161ff' : '#1f2532', marginBottom: 4 }}>
                  Custom Range
                </div>
                <div style={{ fontSize: 12, color: '#676879' }}>
                  Extract specific page numbers (e.g. 1-3, 5, 8-10)
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setMode('all'); setResultUrl(null); }}
                style={{
                  padding: '14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                  border: mode === 'all' ? '2px solid #6161ff' : '1px solid #d0d4e4',
                  background: mode === 'all' ? '#eceeff' : '#ffffff',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: mode === 'all' ? '#6161ff' : '#1f2532', marginBottom: 4 }}>
                  All Pages
                </div>
                <div style={{ fontSize: 12, color: '#676879' }}>
                  Extract all {totalPages} pages into a single cleaned PDF
                </div>
              </button>
            </div>

            {mode === 'range' && (
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                  Pages to Extract (from 1 to {totalPages})
                </label>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={e => { setRangeInput(e.target.value); setResultUrl(null); }}
                  placeholder="e.g. 1-3, 5, 8-10"
                  style={{
                    width: '100%', padding: '24px 26px', borderRadius: 12,
                    border: '1px solid #d0d4e4', background: '#ffffff',
                    fontSize: 14, fontWeight: 600, color: '#1f2532'
                  }}
                />
                <div style={{ fontSize: 12, color: '#676879', marginTop: 6 }}>
                  Tip: Separate individual pages with commas or ranges with a hyphen.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 26, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Extraction Overview</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 36, color: '#6161ff' }}>
              {file ? (mode === 'all' ? totalPages : (rangeInput ? 'Selected' : '0')) : '0'} Pages
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {file ? `${file.name} (${totalPages} pages total)` : 'No file staged'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '24px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to begin extracting pages.
            </div>
          ) : (
            <button
              onClick={handleSplit}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Extracting pages inside browser...' : 'Extract Pages Now'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 Extracted {extractedCount} {extractedCount === 1 ? 'page' : 'pages'} successfully!
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href={resultUrl}
                download="Twignberries-Extracted-Pages.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download Extracted PDF
              </a>
              <NativeShareButton fileUrl={resultUrl} fileName="Twignberries-Extracted-Pages.pdf" mimeType="application/pdf" />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Encrypted browser-memory page slicing. Zero cloud retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side PDF Splitting?</div>
          Extracting confidential pages from legal contracts or financial statements online is risky if tools upload to third-party servers. Twignberries slices pages in your device RAM.
        </div>
      </div>
    </div>
  );
}
