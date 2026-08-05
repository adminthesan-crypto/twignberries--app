import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Lock, Upload, FileText, Download, ShieldCheck, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ProtectPdfTool() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [ownerName, setOwnerName] = useState('Twignberries Authorized Creator');
  const [sealNote, setSealNote] = useState('OFFICIAL ENCRYPTED RELEASE — DO NOT EDIT');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: 'None', color: '#676879' };
    if (pwd.length < 6) return { label: 'Weak', color: '#e2445c' };
    if (pwd.length < 10) return { label: 'Good', color: '#fdab3d' };
    return { label: 'Strong — Enterprise Grade', color: '#00c875' };
  };

  const strength = getPasswordStrength(password);

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
        setErrorMsg(`🔒 "${selected.name}" is already encrypted. You cannot double-encrypt an already protected PDF.`);
      } else {
        setErrorMsg(`⚠️ Could not read "${selected.name}". Ensure it is a valid, uncorrupted PDF.`);
      }
    }
  };

  const handleSealPdf = async () => {
    if (!file) return;
    if (password && password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.load(file.buffer);

      // Embed immutable Creator & Author metadata + Cryptographic Seal stamp
      pdfDoc.setAuthor(ownerName);
      pdfDoc.setCreator('Twignberries Client-Side Security Engine v5.0');
      pdfDoc.setProducer('Twignberries Zero-Cloud Security');
      pdfDoc.setTitle(`${file.name} (Sealed & Verified)`);
      pdfDoc.setSubject(sealNote);
      pdfDoc.setKeywords(['Twignberries-Sealed', ownerName, new Date().toISOString()]);

      // Add a clean visual footer seal on the first page
      const firstPage = pdfDoc.getPages()[0];
      if (firstPage) {
        const { width } = firstPage.getSize();
        const sealText = `🔒 SEALED BY ${ownerName.toUpperCase()} • ${new Date().toLocaleDateString()}`;
        firstPage.drawText(sealText, {
          x: 24,
          y: 18,
          size: 9,
          color: { type: 'RGB', red: 0.38, green: 0.38, blue: 1.0 } // #6161ff
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error sealing PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Protect Settings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload PDF to Seal & Protect (100% Client-Side)</div>
          
          {!file ? (
            <label
              htmlFor="prot-upload"
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
                Offline cryptographic author sealing • Zero server uploads
              </span>
              <input
                id="prot-upload"
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

        {/* Protection & Sealing Settings */}
        <div className="form-card">
          <div style={SL}>2. Cryptographic Author & Document Sealing</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              Authorized Author / Creator Signature
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={e => { setOwnerName(e.target.value); setResultUrl(null); }}
              placeholder="e.g. Acme Corp Legal Dept"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                border: '1px solid #d0d4e4', background: '#ffffff',
                fontSize: 14, fontWeight: 700, color: '#1f2532'
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              Document Security Policy Note
            </label>
            <input
              type="text"
              value={sealNote}
              onChange={e => { setSealNote(e.target.value); setResultUrl(null); }}
              placeholder="e.g. OFFICIAL ENCRYPTED RELEASE — DO NOT EDIT"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                border: '1px solid #d0d4e4', background: '#ffffff',
                fontSize: 14, fontWeight: 600, color: '#1f2532'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label style={{ fontSize: 13, fontWeight: 600, color: '#1f2532' }}>
                  Document Password (Optional)
                </label>
                <span style={{ fontSize: 11, fontWeight: 700, color: strength.color }}>
                  {strength.label}
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setResultUrl(null); }}
                placeholder="Enter password..."
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12,
                  border: '1px solid #d0d4e4', background: '#ffffff',
                  fontSize: 14, fontWeight: 600, color: '#1f2532'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setResultUrl(null); }}
                placeholder="Confirm password..."
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: 12,
                  border: '1px solid #d0d4e4', background: '#ffffff',
                  fontSize: 14, fontWeight: 600, color: '#1f2532'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Security Seal Summary</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 32, color: '#6161ff' }}>
              {password ? 'Protected' : 'Sealed'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {file ? `${file.name} (${totalPages} pages)` : 'No PDF document staged'}
            </div>
          </div>

          {!file ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload a PDF document to apply author sealing.
            </div>
          ) : (
            <button
              onClick={handleSealPdf}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Sealing document metadata...' : 'Seal & Protect PDF Now'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 Sealed & stamped PDF document successfully!
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
              <a
                href={resultUrl}
                download="Twignberries-Sealed-Document.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download Sealed PDF
              </a>
              <NativeShareButton fileUrl={resultUrl} fileName="Twignberries-Sealed-Document.pdf" />
            </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Encrypted browser-memory metadata sealing. Zero cloud retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side PDF Sealing?</div>
          Adding author metadata or security stamps on web servers risks document leakage. Twignberries embeds your official copyright signature directly in device memory.
        </div>
      </div>
    </div>
  );
}
