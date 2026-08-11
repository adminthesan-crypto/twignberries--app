import React, { useState } from 'react';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { Stamp, Upload, FileText, Download, ShieldCheck, AlertCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function WatermarkPdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [text, setText] = useState('CONFIDENTIAL - DO NOT COPY');
  const [opacity, setOpacity] = useState(0.25);
  const [fontSize, setFontSize] = useState(44);
  const [colorHex, setColorHex] = useState('#e2445c'); // red default
  const [angle, setAngle] = useState(45);
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
        setErrorMsg(`🔒 "${selected.name}" is password-protected. Please remove the password before adding a watermark.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid, uncorrupted PDF.`);
      }
    }
  };

  const handleApplyWatermark = async () => {
    if (!file || !text.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);
      const pages = pdfDoc.getPages();
      const textColor = hexToRgb(colorHex);

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        // Calculate rough text centering
        const approxTextWidth = (text.length * fontSize) * 0.45;
        const x = Math.max(20, (width - approxTextWidth) / 2);
        const y = height / 2;

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          color: textColor,
          opacity: parseFloat(opacity),
          rotate: degrees(angle)
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error stamping watermark: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Watermark Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF Document (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="wm-upload"
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
                Offline PDF stamping • Zero cloud uploads
              </span>
              <input
                id="wm-upload"
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

        {/* Watermark Settings */}
        <div className="form-card">
          <div style={SL}>2. Custom Watermark Configuration</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              Watermark Text / Stamp
            </label>
            <input
              type="text"
              value={text}
              onChange={e => { setText(e.target.value); setResultUrl(null); }}
              placeholder="e.g. CONFIDENTIAL - DO NOT COPY"
              style={{
                width: '100%', padding: '24px 26px', borderRadius: 12,
                border: '1px solid #d0d4e4', background: '#ffffff',
                fontSize: 14, fontWeight: 700, color: '#1f2532'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0.05"
                max="0.8"
                step="0.05"
                value={opacity}
                onChange={e => { setOpacity(parseFloat(e.target.value)); setResultUrl(null); }}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Font Size: {fontSize}pt
              </label>
              <input
                type="range"
                min="24"
                max="72"
                step="2"
                value={fontSize}
                onChange={e => { setFontSize(parseInt(e.target.value, 10)); setResultUrl(null); }}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Stamp Angle
              </label>
              <select
                value={angle}
                onChange={e => { setAngle(parseInt(e.target.value, 10)); setResultUrl(null); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value={45}>45° Diagonal</option>
                <option value={0}>0° Horizontal</option>
                <option value={315}>-45° Reverse Diagonal</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Watermark Color
              </label>
              <select
                value={colorHex}
                onChange={e => { setColorHex(e.target.value); setResultUrl(null); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value="#e2445c">Alert Red</option>
                <option value="#6161ff">Monday Violet</option>
                <option value="#676879">Subtle Gray</option>
                <option value="#00c875">Emerald Green</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Watermark Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 32, color: '#6161ff', wordBreak: 'break-word' }}>
              "{text || 'WATERMARK'}"
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {file ? `${file.name} • ${totalPages} Pages Stamped` : 'No PDF document staged'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to apply your watermark.
            </div>
          ) : (
            <button
              onClick={handleApplyWatermark}
              disabled={loading || !text.trim()}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Stamping PDF pages...' : 'Apply Watermark Now'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '24px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 Stamped {totalPages} {totalPages === 1 ? 'page' : 'pages'} successfully!
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <a
                href={resultUrl}
                download="Twignberries-Watermarked-Document.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download Watermarked PDF
              </a>
              <NativeShareButton fileUrl={resultUrl} fileName="Twignberries-Watermarked-Document.pdf" />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Encrypted browser-memory page stamping. Zero cloud retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side Watermarking?</div>
          Stamping confidential company drafts or financial audits online exposes your documents to third-party servers. Twignberries applies vector watermarks in your device RAM.
        </div>
      </div>
    </div>
  );
}
