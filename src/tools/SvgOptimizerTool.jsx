import React, { useState } from 'react';
import { Code, Upload, Download, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function SvgOptimizerTool() {
  const [file, setFile] = useState(null);
  const [origCode, setOrigCode] = useState('');
  const [optimizedCode, setOptimizedCode] = useState('');
  const [stripComments, setStripComments] = useState(true);
  const [stripMetadata, setStripMetadata] = useState(true);
  const [formatWhitespace, setFormatWhitespace] = useState(true);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith('.svg') && selected.type !== 'image/svg+xml') {
      setErrorMsg(`"${selected.name}" is not a valid SVG file.`);
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setOrigCode(text);
      optimizeSvg(text, stripComments, stripMetadata, formatWhitespace);
    };
    reader.readAsText(selected);
  };

  const optimizeSvg = (svgText, comments, meta, whitespace) => {
    try {
      let result = svgText;
      if (comments) {
        result = result.replace(/<!--[\s\S]*?-->/g, '');
      }
      if (meta) {
        result = result.replace(/<\?xml[^>]*\?>/gi, '');
        result = result.replace(/<!DOCTYPE[^>]*>/gi, '');
        result = result.replace(/<metadata>[\s\S]*?<\/metadata>/gi, '');
        result = result.replace(/data-name="[^"]*"/gi, '');
        result = result.replace(/id="Layer_\d+"/gi, '');
      }
      if (whitespace) {
        result = result
          .replace(/>\s+</g, '><')
          .replace(/\s{2,}/g, ' ')
          .trim();
      }
      setOptimizedCode(result);
    } catch (err) {
      setErrorMsg(`SVG optimization error: ${err.message}`);
    }
  };

  const handleToggle = (type) => {
    const nextComments = type === 'comments' ? !stripComments : stripComments;
    const nextMeta = type === 'metadata' ? !stripMetadata : stripMetadata;
    const nextWs = type === 'whitespace' ? !formatWhitespace : formatWhitespace;

    if (type === 'comments') setStripComments(nextComments);
    if (type === 'metadata') setStripMetadata(nextMeta);
    if (type === 'whitespace') setFormatWhitespace(nextWs);

    if (origCode) {
      optimizeSvg(origCode, nextComments, nextMeta, nextWs);
    }
  };

  const handleCopy = () => {
    if (!optimizedCode) return;
    navigator.clipboard.writeText(optimizedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!optimizedCode || !file) return;
    const blob = new Blob([optimizedCode], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${file.name.replace(/\.svg$/i, '')}_optimized.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const savedBytes = origCode.length - optimizedCode.length;
  const savedPercent = origCode.length > 0 ? Math.round((savedBytes / origCode.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-6">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side SVG Cleaner & Optimizer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Strip Figma/Adobe Illustrator bloat, comments, and whitespace from SVG icons offline to make your web bundles load instantly."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {!file ? (
        <label className="dropzone">
          <div className="dropzone-icon"><Upload size={28} /></div>
          <span className="dropzone-title">
            Drop SVG file to optimize & strip metadata
          </span>
          <span className="dropzone-sub">
            SVG Icons & Vector Assets • Zero cloud uploads
          </span>
          <input
            type="file"
            accept=".svg,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      ) : (
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-6 pb-4 border-b border-[#f0f2f5]">
            <div className="flex items-center gap-6">
              <Code className="text-[#6161ff]" size={24} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
                <div style={{ fontSize: 12, color: '#676879' }}>
                  Original: {origCode.length.toLocaleString()} B → Optimized: {optimizedCode.length.toLocaleString()} B ({savedPercent}% saved)
                </div>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setOrigCode(''); setOptimizedCode(''); }}
              className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50"
            >
              Change SVG
            </button>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 text-sm font-semibold text-[#1f2532] cursor-pointer">
              <input
                type="checkbox"
                checked={stripComments}
                onChange={() => handleToggle('comments')}
                className="accent-[#6161ff] w-4 h-4"
              />
              Strip Comments (&lt;!-- --&gt;)
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-[#1f2532] cursor-pointer">
              <input
                type="checkbox"
                checked={stripMetadata}
                onChange={() => handleToggle('metadata')}
                className="accent-[#6161ff] w-4 h-4"
              />
              Strip Editor Metadata & XML Headers
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-[#1f2532] cursor-pointer">
              <input
                type="checkbox"
                checked={formatWhitespace}
                onChange={() => handleToggle('whitespace')}
                className="accent-[#6161ff] w-4 h-4"
              />
              Collapse Extra Whitespace
            </label>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 12, fontWeight: 700, color: '#676879', textTransform: 'uppercase' }}>
                Optimized SVG Output
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-3.5 px-3 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] hover:bg-gray-50"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-3.5 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
                >
                  <Download size={14} />
                  Download .SVG
                </button>
                <NativeShareButton text={optimizedCode} />
              </div>
            </div>
            <textarea
              value={optimizedCode}
              readOnly
              rows={10}
              className="w-full p-6 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-[#fbfbfc] focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
