import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Sliders, Upload, FileText, Download, ShieldCheck, AlertCircle, Trash2, RefreshCcw, Copy } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function OrganizePdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [mode, setMode] = useState('delete'); // delete, reverse, duplicate
  const [pagesToDelete, setPagesToDelete] = useState('2');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [newCount, setNewCount] = useState(0);

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
      setNewCount(count);
    } catch (err) {
      if (err.message && err.message.includes('encrypted')) {
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Remove password before organizing.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid PDF.`);
      }
    }
  };

  const parsePageNumbers = (input, maxPages) => {
    const pages = new Set();
    const parts = input.split(',').map(s => s.trim()).filter(Boolean);

    for (let part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map(s => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= maxPages) pages.add(i);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= maxPages) {
          pages.add(num);
        }
      }
    }
    return Array.from(pages);
  };

  const handleOrganizePdf = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      const newPdf = await PDFDocument.create();
      const total = pdfDoc.getPageCount();

      if (mode === 'delete') {
        const toDelete = new Set(parsePageNumbers(pagesToDelete, total));
        if (toDelete.size >= total) {
          throw new Error('You cannot delete all pages in the PDF document.');
        }
        for (let i = 0; i < total; i++) {
          if (!toDelete.has(i + 1)) {
            const [copied] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(copied);
          }
        }
      } else if (mode === 'reverse') {
        for (let i = total - 1; i >= 0; i--) {
          const [copied] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copied);
        }
      } else if (mode === 'duplicate') {
        for (let i = 0; i < total; i++) {
          const [c1] = await newPdf.copyPages(pdfDoc, [i]);
          const [c2] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(c1);
          newPdf.addPage(c2);
        }
      }

      const count = newPdf.getPageCount();
      setNewCount(count);
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error organizing PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Organize Modes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF Document (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="org-upload"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '36px 20px', border: '2px dashed #d0d4e4', borderRadius: 16,
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
                Offline page deletion & organization • Zero cloud uploads
              </span>
              <input
                id="org-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 14, background: '#f7f9fc', border: '1px solid #e6e9ef' }}>
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
            <div style={{ marginTop: 24, padding: '24px 26px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 24 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Organize Mode Selection Card */}
        <div className="form-card">
          <div style={SL}>2. Select Organization Operation</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => { setMode('delete'); setResultUrl(null); }}
              style={{
                padding: '14px 12px', borderRadius: 12, border: mode === 'delete' ? '2px solid #6161ff' : '1px solid #d0d4e4',
                background: mode === 'delete' ? '#f3f5ff' : '#ffffff', color: mode === 'delete' ? '#6161ff' : '#1f2532',
                fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
              }}
            >
              <Trash2 size={20} color={mode === 'delete' ? '#e2445c' : '#676879'} />
              <span>Delete Specific Pages</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('reverse'); setResultUrl(null); }}
              style={{
                padding: '14px 12px', borderRadius: 12, border: mode === 'reverse' ? '2px solid #6161ff' : '1px solid #d0d4e4',
                background: mode === 'reverse' ? '#f3f5ff' : '#ffffff', color: mode === 'reverse' ? '#6161ff' : '#1f2532',
                fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
              }}
            >
              <RefreshCcw size={20} />
              <span>Reverse Page Order</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('duplicate'); setResultUrl(null); }}
              style={{
                padding: '14px 12px', borderRadius: 12, border: mode === 'duplicate' ? '2px solid #6161ff' : '1px solid #d0d4e4',
                background: mode === 'duplicate' ? '#f3f5ff' : '#ffffff', color: mode === 'duplicate' ? '#6161ff' : '#1f2532',
                fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
              }}
            >
              <Copy size={20} />
              <span>Duplicate Pages (2x)</span>
            </button>
          </div>

          {mode === 'delete' && (
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Page Numbers to Remove (e.g. 2, 4, 6-8)
              </label>
              <input
                type="text"
                value={pagesToDelete}
                onChange={e => { setPagesToDelete(e.target.value); setResultUrl(null); }}
                placeholder="e.g. 2, 5-7"
                style={{
                  width: '100%', padding: '24px 26px', borderRadius: 12,
                  border: '1px solid #d0d4e4', background: '#ffffff',
                  fontSize: 14, fontWeight: 700, color: '#1f2532'
                }}
              />
              <div style={{ fontSize: 12, color: '#676879', marginTop: 6 }}>
                Specify commas and hyphens to drop confidential or cover pages.
              </div>
            </div>
          )}

          {mode === 'reverse' && (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f7f9fc', border: '1px solid #e6e9ef', fontSize: 13, color: '#676879', fontWeight: 500 }}>
              🔄 Reverses the document so Page {totalPages || 'N'} becomes Page 1, and Page 1 becomes Page {totalPages || 'N'}.
            </div>
          )}

          {mode === 'duplicate' && (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f7f9fc', border: '1px solid #e6e9ef', fontSize: 13, color: '#676879', fontWeight: 500 }}>
              📋 Duplicates every individual page in the document consecutively (Page 1, Page 1, Page 2, Page 2...).
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Organization Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 32, color: '#6161ff' }}>
              {resultUrl ? newCount : totalPages} {resultUrl && newCount === 1 ? 'Page' : 'Pages'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {file ? `${file.name} • ${mode.toUpperCase()} Mode` : 'No PDF document staged'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to organize pages.
            </div>
          ) : (
            <button
              onClick={handleOrganizePdf}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Organizing PDF...' : 'Organize & Save PDF'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 PDF organized successfully ({newCount} pages)!
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href={resultUrl}
                download="Twignberries-Organized.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}
              >
                <Download size={16} /> Download Organized PDF
              </a>
              <NativeShareButton fileUrl={resultUrl} fileName="Twignberries-Organized.pdf" />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Browser-memory page manipulation. Zero server retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side Organization?</div>
          Removing sensitive pages from legal briefs or medical reports shouldn't require cloud servers. Twignberries slices and deletes pages inside local RAM.
        </div>
      </div>
    </div>
  );
}
