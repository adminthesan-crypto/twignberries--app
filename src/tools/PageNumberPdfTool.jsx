import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Hash, Upload, FileText, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function PageNumberPdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [format, setFormat] = useState('full'); // full (Page X of Y), slash (X / Y), simple (Page X)
  const [position, setPosition] = useState('bottom-right'); // bottom-right, bottom-center, top-right
  const [fontSize, setFontSize] = useState(10);
  const [colorHex, setColorHex] = useState('#676879'); // gray
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const hexToRgb = (hex) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    return rgb(r, g, b);
  };

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
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Remove password before adding page numbers.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid PDF.`);
      }
    }
  };

  const handleStampPageNumbers = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      const pages = pdfDoc.getPages();
      const count = pages.length;
      const textColor = hexToRgb(colorHex);

      pages.forEach((page, idx) => {
        const pageNum = idx + 1;
        let textStr = `Page ${pageNum} of ${count}`;
        if (format === 'slash') textStr = `${pageNum} / ${count}`;
        if (format === 'simple') textStr = `Page ${pageNum}`;

        const { width, height } = page.getSize();
        const approxWidth = textStr.length * (fontSize * 0.52);

        let x = width - approxWidth - 36;
        let y = 24; // bottom-right default

        if (position === 'bottom-center') {
          x = (width - approxWidth) / 2;
          y = 24;
        } else if (position === 'top-right') {
          x = width - approxWidth - 36;
          y = height - 28;
        }

        page.drawText(textStr, {
          x,
          y,
          size: fontSize,
          color: textColor
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error stamping page numbers: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Numbering Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF Document (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="num-upload"
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
                Offline page numbering • Zero server uploads
              </span>
              <input
                id="num-upload"
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

        {/* Numbering Format & Position Card */}
        <div className="form-card">
          <div style={SL}>2. Numbering Format & Position</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 20 }}>
            {[
              { id: 'full', label: 'Page X of Y', preview: 'Page 1 of 12' },
              { id: 'slash', label: 'X / Y', preview: '1 / 12' },
              { id: 'simple', label: 'Page X', preview: 'Page 1' }
            ].map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => { setFormat(f.id); setResultUrl(null); }}
                style={{
                  padding: '14px 12px', borderRadius: 12, border: format === f.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                  background: format === f.id ? '#f3f5ff' : '#ffffff', color: format === f.id ? '#6161ff' : '#1f2532',
                  fontWeight: 700, fontSize: 13.5, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
                }}
              >
                <span style={{ fontSize: 15 }}>{f.label}</span>
                <span style={{ fontSize: 11, color: '#676879', fontWeight: 500 }}>e.g. {f.preview}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Page Position
              </label>
              <select
                value={position}
                onChange={e => { setPosition(e.target.value); setResultUrl(null); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value="bottom-right">Bottom Right Corner</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="top-right">Top Right Corner</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Font Color
              </label>
              <select
                value={colorHex}
                onChange={e => { setColorHex(e.target.value); setResultUrl(null); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value="#676879">Subtle Gray (Default)</option>
                <option value="#1f2532">Dark Slate</option>
                <option value="#6161ff">Monday Violet</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              Font Size: {fontSize}pt
            </label>
            <input
              type="range"
              min="8"
              max="16"
              step="1"
              value={fontSize}
              onChange={e => { setFontSize(parseInt(e.target.value, 10)); setResultUrl(null); }}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Numbering Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 28, color: '#6161ff' }}>
              {format === 'full' ? 'Page X of Y' : format === 'slash' ? 'X / Y' : 'Page X'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {file ? `${file.name} • ${totalPages} Pages Stamped` : 'No PDF document staged'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to add page numbers.
            </div>
          ) : (
            <button
              onClick={handleStampPageNumbers}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Stamping page numbers...' : 'Stamp Page Numbers Now'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 Page numbers stamped across {totalPages} pages!
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href={resultUrl}
                download="Twignberries-Numbered.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}
              >
                <Download size={16} /> Download Numbered PDF
              </a>
              <NativeShareButton fileUrl={resultUrl} fileName="Twignberries-Numbered.pdf" />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Browser-memory numbering. Zero server uploads.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side Page Numbering?</div>
          Adding sequential numbers to contracts shouldn't require sending files to an external converter. Twignberries stamps coordinates in local RAM.
        </div>
      </div>
    </div>
  );
}
