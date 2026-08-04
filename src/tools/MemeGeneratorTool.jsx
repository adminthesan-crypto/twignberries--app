import React, { useState } from 'react';
import { Smile, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Type, Sparkles } from 'lucide-react';

export default function MemeGeneratorTool() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState('DON\'T DO THIS');
  const [bottomText, setBottomText] = useState('DO PAHRULI & BERRIES');
  const [fontSize, setFontSize] = useState(48);
  const [memeUrl, setMemeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setMemeUrl(null);
    const selected = e.target.files?.[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImage({
        file: selected,
        url: URL.createObjectURL(selected),
        width: img.width,
        height: img.height,
        name: selected.name,
      });
    };
    img.src = URL.createObjectURL(selected);
  };

  const generateMeme = () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Classic Impact font meme styling
        ctx.font = `900 ${fontSize}px Impact, sans-serif`;
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = Math.max(3, Math.floor(fontSize / 10));
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        if (topText) {
          const upperTop = topText.toUpperCase();
          ctx.strokeText(upperTop, canvas.width / 2, 20);
          ctx.fillText(upperTop, canvas.width / 2, 20);
        }

        if (bottomText) {
          ctx.textBaseline = 'bottom';
          const upperBottom = bottomText.toUpperCase();
          ctx.strokeText(upperBottom, canvas.width / 2, canvas.height - 20);
          ctx.fillText(upperBottom, canvas.width / 2, canvas.height - 20);
        }

        canvas.toBlob((blob) => {
          if (blob) {
            setMemeUrl(URL.createObjectURL(blob));
          } else {
            setErrorMsg('Could not generate meme.');
          }
          setLoading(false);
        }, 'image/png');
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error generating meme offline.');
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!memeUrl || !image) return;
    const a = document.createElement('a');
    a.href = memeUrl;
    a.download = `meme-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-orange-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
            <Smile className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">Meme Generator (Top & Bottom Impact Captions)</h1>
            <p className="text-sm text-[#9ca3af]">Create custom viral memes with classic bold Impact text and crisp black stroke outlines offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Memes are created offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="border-2 border-dashed border-white/20 hover:border-orange-500/50 rounded-2xl p-12 text-center cursor-pointer block transition-all bg-white/[0.02] hover:bg-white/[0.04]">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <p className="text-white font-medium mb-1">Drop image or photo to meme here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP images</p>
        </label>
      ) : (
        <div className="bg-[#1e1e24] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Smile className="w-8 h-8 text-orange-400" />
              <div>
                <p className="text-white font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setMemeUrl(null); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-white bg-white/5 rounded-lg border border-white/10"
            >
              Replace Photo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/30 p-4 rounded-xl border border-white/5">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Top Caption</label>
              <input
                type="text"
                value={topText}
                onChange={(e) => { setTopText(e.target.value); setMemeUrl(null); }}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm font-bold uppercase"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Bottom Caption</label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => { setBottomText(e.target.value); setMemeUrl(null); }}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm font-bold uppercase"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Text Size ({fontSize}px)</label>
              <input
                type="range"
                min="20"
                max="100"
                value={fontSize}
                onChange={(e) => { setFontSize(Number(e.target.value)); setMemeUrl(null); }}
                className="w-full accent-orange-400 mt-2"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden max-h-72 flex items-center justify-center p-2">
              <img src={memeUrl || image.url} alt="Meme preview" className="max-h-64 object-contain rounded" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={generateMeme}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Generating Meme...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Meme Offline</span>
                </>
              )}
            </button>

            {memeUrl && (
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-5 h-5" />
                <span>Download Custom Meme</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
