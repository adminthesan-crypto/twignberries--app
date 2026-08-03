import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Image as ImageIcon, Upload, ArrowUp, ArrowDown, Trash2, Download, ShieldCheck, AlertCircle } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ImageToPdfTool() {
  const [images, setImages] = useState([]);
  const [orientation, setOrientation] = useState('portrait'); // 'portrait' | 'landscape'
  const [margin, setMargin] = useState(20); // in pt
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);

  const convertFileToPngBytes = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (!blob) return reject(new Error('Canvas conversion failed'));
            blob.arrayBuffer().then(resolve).catch(reject);
          }, 'image/png');
        };
        img.onerror = () => reject(new Error(`Could not load image "${file.name}"`));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed reading image file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (e) => {
    setErrorMsg(null);
    setResultUrl(null);
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    const newImgs = [];
    for (const file of selected) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg(`"${file.name}" is not an image file.`);
        continue;
      }
      try {
        let buffer;
        let format = 'png';
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          buffer = await file.arrayBuffer();
          format = 'jpg';
        } else if (file.type === 'image/png') {
          buffer = await file.arrayBuffer();
          format = 'png';
        } else {
          // Automatic canvas conversion for WEBP, AVIF, SVG, etc.
          buffer = await convertFileToPngBytes(file);
          format = 'png';
        }

        const previewUrl = URL.createObjectURL(file);
        newImgs.push({
          id: Math.random().toString(36).substring(7),
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          buffer,
          format,
          previewUrl
        });
      } catch (err) {
        setErrorMsg(`⚠️ Could not process image "${file.name}". Ensure it is not corrupted.`);
      }
    }
    setImages(prev => [...prev, ...newImgs]);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const copy = [...images];
    const temp = copy[index - 1];
    copy[index - 1] = copy[index];
    copy[index] = temp;
    setImages(copy);
    setResultUrl(null);
  };

  const moveDown = (index) => {
    if (index === images.length - 1) return;
    const copy = [...images];
    const temp = copy[index + 1];
    copy[index + 1] = copy[index];
    copy[index] = temp;
    setImages(copy);
    setResultUrl(null);
  };

  const removeImg = (index) => {
    const copy = images.filter((_, i) => i !== index);
    setImages(copy);
    setResultUrl(null);
  };

  const handleConvertToPdf = async () => {
    if (!images.length) return;
    setLoading(true);
    setErrorMsg(null);
    setResultUrl(null);
    try {
      const pdfDoc = await PDFDocument.create();
      // Standard A4 dimensions in points: 595.28 x 841.89
      const pageWidth = orientation === 'portrait' ? 595.28 : 841.89;
      const pageHeight = orientation === 'portrait' ? 841.89 : 595.28;

      for (const img of images) {
        let pdfImage;
        if (img.format === 'jpg') {
          pdfImage = await pdfDoc.embedJpg(img.buffer);
        } else {
          pdfImage = await pdfDoc.embedPng(img.buffer);
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const availWidth = pageWidth - margin * 2;
        const availHeight = pageHeight - margin * 2;

        const imgWidth = pdfImage.width;
        const imgHeight = pdfImage.height;
        const scale = Math.min(availWidth / imgWidth, availHeight / imgHeight);

        const drawWidth = imgWidth * scale;
        const drawHeight = imgHeight * scale;
        const x = (pageWidth - drawWidth) / 2;
        const y = (pageHeight - drawHeight) / 2;

        page.drawImage(pdfImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setErrorMsg('Error converting images to PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input Dropzone & Image List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Upload Images (JPG, PNG, WEBP, AVIF)</div>
          
          <label
            htmlFor="img-upload"
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
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>Click to select or drop image files here</span>
            <span style={{ fontSize: 13, color: '#676879', marginTop: 4 }}>
              Automatic WEBP/AVIF canvas fallback • Zero server uploads
            </span>
            <input
              id="img-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          {errorMsg && (
            <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Page Layout Settings */}
        <div className="form-card">
          <div style={SL}>2. PDF Page Settings</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Page Orientation
              </label>
              <select
                value={orientation}
                onChange={e => { setOrientation(e.target.value); setResultUrl(null); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value="portrait">Portrait (A4)</option>
                <option value="landscape">Landscape (A4)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
                Page Margin
              </label>
              <select
                value={margin}
                onChange={e => { setMargin(parseInt(e.target.value, 10)); setResultUrl(null); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 600, color: '#1f2532' }}
              >
                <option value={0}>No Margin (0 pt)</option>
                <option value={20}>Small Margin (20 pt)</option>
                <option value={40}>Large Margin (40 pt)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image Reorder Cards */}
        {images.length > 0 && (
          <div className="form-card">
            <div className="flex items-center justify-between mb-4">
              <div style={SL}>3. Staged Images ({images.length} pages)</div>
              <button
                onClick={() => { setImages([]); setResultUrl(null); }}
                style={{ fontSize: 12, fontWeight: 600, color: '#e2445c', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear all
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 12, background: '#f7f9fc',
                    border: '1px solid #e6e9ef'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      style={{ width: 38, height: 38, borderRadius: 8, objectFit: 'cover', border: '1px solid #d0d4e4', flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2532', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {idx + 1}. {img.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#676879' }}>
                        {img.size} • Page {idx + 1}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
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
                      disabled={idx === images.length - 1}
                      style={{ padding: 6, borderRadius: 8, border: '1px solid #d0d4e4', background: '#fff', cursor: idx === images.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === images.length - 1 ? 0.4 : 1 }}
                      title="Move down"
                    >
                      <ArrowDown size={14} color="#323338" />
                    </button>
                    <button
                      onClick={() => removeImg(idx)}
                      style={{ padding: 6, borderRadius: 8, border: '1px solid #ffccd8', background: '#fff0f3', cursor: 'pointer', marginLeft: 4 }}
                      title="Remove image"
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
            <div style={SL} className="mb-0">PDF Compilation Overview</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 36, color: '#6161ff' }}>
              {images.length} {images.length === 1 ? 'Page' : 'Pages'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {orientation === 'portrait' ? 'Portrait A4 Document' : 'Landscape A4 Document'} • {margin}pt Margin
            </div>
          </div>

          {!images.length ? (
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', color: '#676879', fontSize: 13, fontWeight: 500, textAlign: 'center', marginBottom: 16 }}>
              Upload one or more images to generate your PDF.
            </div>
          ) : (
            <button
              onClick={handleConvertToPdf}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginBottom: 16, background: 'linear-gradient(90deg, #6161ff, #7f56d9)' }}
            >
              {loading ? 'Compiling PDF document...' : 'Convert to PDF Now'}
            </button>
          )}

          {resultUrl && (
            <div style={{ padding: '16px', borderRadius: 14, background: '#f3f5ff', border: '1px solid rgba(97,97,255,0.3)', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', marginBottom: 8 }}>
                🎉 Generated {images.length}-page PDF successfully!
              </div>
              <a
                href={resultUrl}
                download="Twignberries-Converted-Images.pdf"
                className="btn-primary"
                style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Download size={16} /> Download Converted PDF
              </a>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Encrypted browser-memory image layout. Zero cloud retention.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use Client-Side Image to PDF?</div>
          Most tools reject WEBP or AVIF formats or require cloud uploads. Twignberries automatically renders your images on a private HTML5 canvas and embeds them into a clean A4 PDF.
        </div>
      </div>
    </div>
  );
}
