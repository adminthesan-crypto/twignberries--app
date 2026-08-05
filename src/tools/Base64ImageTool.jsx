import React, { useState } from 'react';
import { Image, Upload, Download, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function Base64ImageTool() {
  const [mode, setMode] = useState('encode'); // encode, decode
  const [file, setFile] = useState(null);
  const [base64Str, setBase64Str] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setBase64Str('');
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith('image/')) {
      setErrorMsg(`"${selected.name}" is not an image file.`);
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setBase64Str(ev.target.result);
    };
    reader.onerror = () => setErrorMsg('Failed to encode image to Base64.');
    reader.readAsDataURL(selected);
  };

  const handleDecodeInput = (val) => {
    setErrorMsg(null);
    setBase64Str(val);
    if (val && !val.startsWith('data:image/')) {
      setErrorMsg('⚠️ Base64 string should start with "data:image/png;base64," or similar prefix.');
    }
  };

  const handleCopy = () => {
    if (!base64Str) return;
    navigator.clipboard.writeText(base64Str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDecoded = () => {
    if (!base64Str || !base64Str.startsWith('data:image/')) return;
    const a = document.createElement('a');
    a.href = base64Str;
    a.download = 'decoded_image.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Base64 Image Encoder & Decoder
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Convert icons to inline CSS Base64 strings or paste data URIs to inspect and download images offline."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex border-b border-[#e6e9ef]">
        <button
          onClick={() => { setMode('encode'); setFile(null); setBase64Str(''); setErrorMsg(null); }}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition ${
            mode === 'encode'
              ? 'border-[#6161ff] text-[#6161ff]'
              : 'border-transparent text-[#676879] hover:text-[#1f2532]'
          }`}
        >
          Encode Image to Base64
        </button>
        <button
          onClick={() => { setMode('decode'); setFile(null); setBase64Str(''); setErrorMsg(null); }}
          className={`px-6 py-3 font-bold text-sm border-b-2 transition ${
            mode === 'decode'
              ? 'border-[#6161ff] text-[#6161ff]'
              : 'border-transparent text-[#676879] hover:text-[#1f2532]'
          }`}
        >
          Decode Base64 to Image
        </button>
      </div>

      {mode === 'encode' ? (
        !file ? (
          <label className="border-2 border-dashed border-[#c3c6d4] hover:border-[#6161ff] rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer bg-[#fbfbfc] hover:bg-[#f5f6ff] transition-all">
            <Upload className="text-[#6161ff] mb-3" size={36} />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#1f2532' }}>
              Drop Image to generate Base64 data URI
            </span>
            <span style={{ fontSize: 13, color: '#868894', marginTop: 4 }}>
              PNG, JPG, WEBP, SVG • Zero server uploads
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#f0f2f5]">
              <div className="flex items-center gap-3">
                <Image className="text-[#6161ff]" size={24} />
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1f2532' }}>{file.name}</div>
              </div>
              <button
                onClick={() => { setFile(null); setBase64Str(''); }}
                className="px-3.5 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#676879] hover:bg-gray-50"
              >
                Change Image
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 12, fontWeight: 700, color: '#676879', textTransform: 'uppercase' }}>
                  Base64 Data URI ({base64Str.length.toLocaleString()} characters)
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] hover:bg-gray-50"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Base64'}
                </button>
              </div>
              <textarea
                value={base64Str}
                readOnly
                rows={8}
                className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-[#fbfbfc] focus:outline-none"
              />
            </div>
          </div>
        )
      ) : (
        <div className="space-y-6">
          <div>
            <div style={SL}>Paste Base64 Data URI</div>
            <textarea
              value={base64Str}
              onChange={(e) => handleDecodeInput(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
              rows={6}
              className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
            />
          </div>

          {base64Str && base64Str.startsWith('data:image/') && (
            <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm flex flex-col items-center gap-4">
              <span style={SL}>Decoded Image Preview</span>
              <img
                src={base64Str}
                alt="Decoded Base64"
                className="max-h-[320px] rounded-lg shadow-md border border-[#e6e9ef]"
              />
              <button
                onClick={handleDownloadDecoded}
                className="btn-primary flex items-center gap-2"
                style={{ padding: '11px 24px', fontSize: 14 }}
              >
                <Download size={16} />
                Download Decoded Image (.PNG)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
