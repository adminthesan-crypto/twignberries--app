import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileText, Upload, ArrowUp, ArrowDown, Trash2, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';
import { BackdropTrigger } from '../contexts/BackdropContext';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function MergePdfTool() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [outputFileName, setOutputFileName] = useState('Pahruli_Merged');

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setMergedPdfUrl(null);
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const newFiles = [];
    for (const file of selected) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setErrorMsg(`"${file.name}" is not a valid PDF file.`);
        continue;
      }
      try {
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: false });
        newFiles.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          pages: pdfDoc.getPageCount(),
          buffer
        });
      } catch (err) {
        if (err.message && err.message.includes('encrypted')) {
          setErrorMsg(`🔒 "${file.name}" is password-protected. Please unlock before merging.`);
        } else {
          setErrorMsg(`⚠️ Could not read "${file.name}". Ensure it is a valid, uncorrupted PDF.`);
        }
      }
    }
    setFiles(prev => [...prev, ...newFiles]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const copy = [...files];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setFiles(copy);
    setMergedPdfUrl(null);
  };

  const moveDown = (index) => {
    if (index === files.length - 1) return;
    const copy = [...files];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setFiles(copy);
    setMergedPdfUrl(null);
  };

  const removeFile = (index) => {
    const copy = files.filter((_, i) => i !== index);
    setFiles(copy);
    setMergedPdfUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const mergedPdf = await PDFDocument.create();
      let count = 0;
      for (const file of files) {
        const doc = await PDFDocument.load(file.buffer);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        count += doc.getPageCount();
      }
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedPdfUrl(url);
      setTotalPages(count);
    } catch (err) {
      setErrorMsg('Error merging PDFs: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const totalSizeMB = files.reduce((acc, f) => acc + parseFloat(f.size), 0).toFixed(2);
  const isIdleOrSuccess = files.length === 0 || !!mergedPdfUrl;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
      {isIdleOrSuccess && <BackdropTrigger />}
      {/* Left Column: Input Dropzone & File List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF Documents (100% Client-Side)</div>
          
          <label
            htmlFor="merge-upload"
            className="dropzone"
          >
            <div className="dropzone-icon"><Upload size={28} /></div>
            <span className="dropzone-title">Click to select or drop PDF files here</span>
            <span className="dropzone-sub">Zero cloud uploads • Files remain in browser memory</span>
            <input
              id="merge-upload"
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          {errorMsg && (
            <div style={{ marginTop: 24, padding: '24px 26px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 24 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* File Cards & Reordering */}
        {files.length > 0 && (
          <div className="form-card">
            <div className="flex items-center justify-between mb-4">
              <div style={SL}>2. Reorder Files ({files.length} staged)</div>
              <button
                onClick={() => { setFiles([]); setMergedPdfUrl(null); }}
                style={{ fontSize: 12, fontWeight: 600, color: '#e2445c', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {files.map((file, idx) => (
                <div
                  key={file.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 14px', borderRadius: 12, background: '#f7f9fc',
                    border: '1px solid #e6e9ef'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 24, minWidth: 0 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: '#eceeff', color: '#6161ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FileText size={18} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2532', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {idx + 1}. {file.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#676879' }}>
                        {file.pages} {file.pages === 1 ? 'page' : 'pages'} • {file.size}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexShrink: 0 }}>
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      style={{ padding: 6, borderRadius: 8, border: '1px solid #d0d4e4', background: '#fff', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.4 : 1 }}
                      title="Move up"
                    >
                      <ArrowUp size={14} color="#323338" />
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === files.length - 1}
                      style={{ padding: 6, borderRadius: 8, border: '1px solid #d0d4e4', background: '#fff', cursor: idx === files.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === files.length - 1 ? 0.4 : 1 }}
                      title="Move down"
                    >
                      <ArrowDown size={14} color="#323338" />
                    </button>
                    <button
                      onClick={() => removeFile(idx)}
                      style={{ padding: 6, borderRadius: 8, border: '1px solid #ffccd8', background: '#fff0f3', cursor: 'pointer', marginLeft: 4 }}
                      title="Remove file"
                    >
                      <Trash2 size={14} color="#e2445c" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Merged Output Overview</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 36, color: '#6161ff' }}>
              {files.length} {files.length === 1 ? 'PDF' : 'PDFs'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {files.reduce((a, b) => a + b.pages, 0)} Total Pages • {totalSizeMB} MB Total
            </div>
          </div>

          {files.length < 2 ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Please stage at least 2 PDF documents to combine.
            </div>
          ) : (
            <button
              onClick={handleMerge}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Merging PDFs inside browser...' : 'Merge PDFs Now'}
            </button>
          )}

          {mergedPdfUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 12 }}>
                🎉 Merged {files.length} files ({totalPages} pages) successfully!
              </div>
              <div style={{ marginBottom: 16, textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#676879', marginBottom: 6 }}>Rename Output File:</label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={outputFileName}
                    onChange={(e) => setOutputFileName(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', borderRadius: '8px 0 0 8px', border: '1px solid #d0d4e4', borderRight: 'none', fontSize: 13, outline: 'none' }}
                  />
                  <div style={{ padding: '8px 12px', background: '#f6f8fa', border: '1px solid #d0d4e4', borderRadius: '0 8px 8px 0', fontSize: 13, color: '#676879', fontWeight: 500 }}>
                    .pdf
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href={mergedPdfUrl}
                download={`${outputFileName || 'Pahruli_Merged'}.pdf`}
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}
              >
                <Download size={16} /> Download
              </a>
              <NativeShareButton fileUrl={mergedPdfUrl} fileName={`${outputFileName || 'Pahruli_Merged'}.pdf`} />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Encrypted browser-memory compilation. Zero cloud data retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Private Client-Side Merge?</div>
          Most online PDF tools upload your sensitive contracts and tax filings to external servers. Pahruli uses WebAssembly to execute 100% of PDF processing locally on your device.
        </div>
      </div>
    </div>
  );
}
