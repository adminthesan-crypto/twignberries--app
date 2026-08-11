import React, { useState } from 'react';
import { Code, Upload, Download, ShieldCheck, AlertCircle, Copy, Check, Trash2 } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function ImageToBase64BulkTool() {
  const [items, setItems] = useState([]);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => f.type.startsWith('image/'));
    if (valid.length === 0) {
      setErrorMsg('Please upload valid image files.');
      return;
    }

    valid.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUri = ev.target.result;
        setItems((prev) => [
          ...prev,
          {
            name: f.name,
            size: `${(f.size / 1024).toFixed(1)} KB`,
            dataUri,
            cssUrl: `url("${dataUri}")`,
            htmlImg: `<img src="${dataUri}" alt="${f.name}" />`,
          },
        ]);
      };
      reader.readAsDataURL(f);
    });
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const copyText = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Bulk Image to CSS Data URI / Base64 Encoder</h1>
            <p className="text-sm text-[#676879]">Encode multiple icons and images into CSS url() strings and HTML img tags offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Images are converted to Base64 offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-4 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
        <label className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-cyan-500 text-black font-bold cursor-pointer hover:bg-cyan-400 transition-all text-sm shadow-md">
          <Upload className="w-5 h-5" />
          <span>Upload Icons & Images to Encode (Bulk)</span>
          <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
        </label>

        {items.length > 0 ? (
          <div className="space-y-6">
            {items.map((it, idx) => (
              <div key={idx} className="bg-white border border-[#e6e9ef] rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <img src={it.dataUri} alt={it.name} className="w-10 h-10 object-contain rounded bg-white p-1" />
                    <div>
                      <p className="text-[#1f2532] text-sm font-medium">{it.name}</p>
                      <p className="text-xs text-[#9ca3af]">{it.size} • Data URI ({it.dataUri.length} characters)</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-300 p-1.5">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Copy Data URI', val: it.dataUri, id: `uri-${idx}` },
                    { label: 'Copy CSS url(...)', val: it.cssUrl, id: `css-${idx}` },
                    { label: 'Copy HTML <img> Tag', val: it.htmlImg, id: `html-${idx}` },
                  ].map((btn) => (
                    <div key={btn.id} className="flex gap-3 w-full">
                      <button
                        onClick={() => copyText(btn.val, btn.id)}
                        className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-gray-100 border border-[#e6e9ef] text-[#1f2532] text-xs font-semibold flex items-center justify-center gap-3.5 transition-all"
                      >
                        {copiedIdx === btn.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                        <span>{btn.label}</span>
                      </button>
                      <NativeShareButton text={btn.val} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#9ca3af] border-2 border-dashed border-[#e6e9ef] rounded-xl">
            <p>No images uploaded yet. Select icons or images to generate CSS/HTML Base64 code.</p>
          </div>
        )}
      </div>
    </div>
  );
}
