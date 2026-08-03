import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Eye, Upload, FileText, Download, ShieldCheck, AlertCircle, Trash2, Edit3 } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function PdfMetadataTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [meta, setMeta] = useState({
    title: '', author: '', subject: '', keywords: '', creator: '', producer: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

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

      setMeta({
        title: pdfDoc.getTitle() || '',
        author: pdfDoc.getAuthor() || '',
        subject: pdfDoc.getSubject() || '',
        keywords: pdfDoc.getKeywords() || '',
        creator: pdfDoc.getCreator() || '',
        producer: pdfDoc.getProducer() || ''
      });

      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB',
        buffer
      });
      setTotalPages(count);
    } catch (err) {
      if (err.message && err.message.includes('encrypted')) {
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Remove password before inspecting metadata.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid PDF.`);
      }
    }
  };

  const handleSaveMetadata = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      pdfDoc.setTitle(meta.title);
      pdfDoc.setAuthor(meta.author);
      pdfDoc.setSubject(meta.subject);
      pdfDoc.setKeywords(meta.keywords ? meta.keywords.split(',').map(k => k.trim()) : []);
      pdfDoc.setCreator(meta.creator);
      pdfDoc.setProducer(meta.producer);

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error updating PDF metadata: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleStripAllMetadata = async () => {
    setMeta({
      title: '', author: '', subject: '', keywords: '', creator: '', producer: ''
    });
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setCreator('');
      pdfDoc.setProducer('');

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error scrubbing PDF metadata: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Metadata Editor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF Document (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="meta-upload"
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
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>Click to select a PDF document</span>
              <span style={{ fontSize: 13, color: '#676879', marginTop: 4 }}>
                Offline XMP metadata inspection & stripping • Zero cloud uploads
              </span>
              <input
                id="meta-upload"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: 14, background: '#f7f9fc', border: '1px solid #e6e9ef' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
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
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Metadata Fields Card */}
        <div className="form-card">
          <div className="flex items-center justify-between mb-3">
            <div style={SL} className="mb-0">2. Document Info & XMP Metadata</div>
            {file && (
              <button
                type="button"
                onClick={handleStripAllMetadata}
                style={{
                  padding: '6px 12px', borderRadius: 8, border: '1px solid #e2445c',
                  background: '#fff2f4', color: '#e2445c', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <Trash2 size={14} /> Strip Hidden Metadata
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Document Title
              </label>
              <input
                type="text"
                value={meta.title}
                onChange={e => { setMeta({ ...meta, title: e.target.value }); setResultUrl(null); }}
                placeholder="e.g. Q3 Financial Audit Report"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d0d4e4', background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Author Name / Creator
              </label>
              <input
                type="text"
                value={meta.author}
                onChange={e => { setMeta({ ...meta, author: e.target.value }); setResultUrl(null); }}
                placeholder="e.g. Acme Legal Department"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d0d4e4', background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Subject / Category
              </label>
              <input
                type="text"
                value={meta.subject}
                onChange={e => { setMeta({ ...meta, subject: e.target.value }); setResultUrl(null); }}
                placeholder="e.g. Confidential Agreement"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d0d4e4', background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={meta.keywords}
                onChange={e => { setMeta({ ...meta, keywords: e.target.value }); setResultUrl(null); }}
                placeholder="e.g. audit, finance, confidential"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d0d4e4', background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Software Creator Tag
              </label>
              <input
                type="text"
                value={meta.creator}
                onChange={e => { setMeta({ ...meta, creator: e.target.value }); setResultUrl(null); }}
                placeholder="e.g. Twignberries Client Engine"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d0d4e4', background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                PDF Producer Tag
              </label>
              <input
                type="text"
                value={meta.producer}
                onChange={e => { setMeta({ ...meta, producer: e.target.value }); setResultUrl(null); }}
                placeholder="e.g. Twignberries PDF Engine v6.0"
                style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #d0d4e4', background: '#ffffff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Metadata Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 26, color: '#6161ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {meta.title || 'Untitled Document'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {meta.author ? `By ${meta.author}` : 'Anonymized Creator'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to inspect or scrub XMP tags.
            </div>
          ) : (
            <button
              onClick={handleSaveMetadata}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Saving metadata...' : 'Save & Download Updated PDF'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 PDF metadata updated & scrubbed!
              </div>
              <a
                href={resultUrl}
                download="Twignberries-Metadata-Updated.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download Updated PDF
              </a>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Browser-memory metadata scrubbing. Zero cloud retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why Inspect PDF Metadata?</div>
          Many PDFs silently store usernames, computer paths, and software versions in XMP headers. Scrubbing them before sharing protects company privacy.
        </div>
      </div>
    </div>
  );
}
