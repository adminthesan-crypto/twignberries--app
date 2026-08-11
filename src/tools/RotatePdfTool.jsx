import React, { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { RotateCw, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function RotatePdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [targetScope, setTargetScope] = useState('all'); // all, odd, even
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
      setFile({
        name: selected.name,
        size: (selected.size / (1024 * 1024)).toFixed(2) + ' MB',
        buffer
      });
      setTotalPages(count);
    } catch (err) {
      if (err.message && err.message.includes('encrypted')) {
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Remove password before rotating.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid PDF.`);
      }
    }
  };

  const handleRotatePdf = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page, idx) => {
        const pageNumber = idx + 1;
        let shouldRotate = false;
        if (targetScope === 'all') shouldRotate = true;
        else if (targetScope === 'odd' && pageNumber % 2 !== 0) shouldRotate = true;
        else if (targetScope === 'even' && pageNumber % 2 === 0) shouldRotate = true;

        if (shouldRotate) {
          const currentRotation = page.getRotation().angle || 0;
          let newRotation = (currentRotation + rotationAngle) % 360;
          if (newRotation < 0) newRotation += 360;
          page.setRotation(degrees(newRotation));
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error rotating PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Rotation Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF Document (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="rot-upload"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '36px 24px', border: '2px dashed #d0d4e4', borderRadius: 16,
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
                Offline page rotation • Zero cloud retention
              </span>
              <input
                id="rot-upload"
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

        {/* Rotation Controls Card */}
        <div className="form-card">
          <div style={SL}>2. Rotation Angle & Target Pages</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 20 }}>
            <button
              type="button"
              onClick={() => { setRotationAngle(90); setResultUrl(null); }}
              style={{
                padding: '14px 12px', borderRadius: 12, border: rotationAngle === 90 ? '2px solid #6161ff' : '1px solid #d0d4e4',
                background: rotationAngle === 90 ? '#f3f5ff' : '#ffffff', color: rotationAngle === 90 ? '#6161ff' : '#1f2532',
                fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
              }}
            >
              <RotateCw size={20} />
              <span>90° Clockwise</span>
            </button>

            <button
              type="button"
              onClick={() => { setRotationAngle(270); setResultUrl(null); }}
              style={{
                padding: '14px 12px', borderRadius: 12, border: rotationAngle === 270 ? '2px solid #6161ff' : '1px solid #d0d4e4',
                background: rotationAngle === 270 ? '#f3f5ff' : '#ffffff', color: rotationAngle === 270 ? '#6161ff' : '#1f2532',
                fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
              }}
            >
              <RefreshCw size={20} />
              <span>90° Counter-CW</span>
            </button>

            <button
              type="button"
              onClick={() => { setRotationAngle(180); setResultUrl(null); }}
              style={{
                padding: '14px 12px', borderRadius: 12, border: rotationAngle === 180 ? '2px solid #6161ff' : '1px solid #d0d4e4',
                background: rotationAngle === 180 ? '#f3f5ff' : '#ffffff', color: rotationAngle === 180 ? '#6161ff' : '#1f2532',
                fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
              }}
            >
              <RotateCw size={20} style={{ transform: 'rotate(90deg)' }} />
              <span>180° Flip</span>
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 8 }}>
              Apply Rotation To
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { id: 'all', label: 'All Pages' },
                { id: 'odd', label: 'Odd Pages (1, 3, 5...)' },
                { id: 'even', label: 'Even Pages (2, 4, 6...)' }
              ].map(scope => (
                <button
                  key={scope.id}
                  type="button"
                  onClick={() => { setTargetScope(scope.id); setResultUrl(null); }}
                  style={{
                    flex: 1, padding: '10px 12px', borderRadius: 10,
                    border: targetScope === scope.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                    background: targetScope === scope.id ? '#f3f5ff' : '#ffffff',
                    color: targetScope === scope.id ? '#6161ff' : '#1f2532',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer'
                  }}
                >
                  {scope.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 26, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Rotation Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 32, color: '#6161ff' }}>
              {rotationAngle === 270 ? '-90°' : `${rotationAngle}°`}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {file ? `${file.name} • ${totalPages} Pages` : 'No PDF document staged'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '24px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to apply page rotation.
            </div>
          ) : (
            <button
              onClick={handleRotatePdf}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Rotating pages...' : 'Rotate PDF Now'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '24px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 PDF rotated successfully!
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href={resultUrl}
                download="Twignberries-Rotated.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download Rotated PDF
              </a>
              <NativeShareButton fileUrl={resultUrl} fileName="Twignberries-Rotated.pdf" />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Browser-memory page rotation. Zero cloud retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side Rotation?</div>
          Rotated financial PDFs and scanned invoices shouldn't touch third-party servers. Twignberries modifies your PDF orientation in local RAM instantly.
        </div>
      </div>
    </div>
  );
}
