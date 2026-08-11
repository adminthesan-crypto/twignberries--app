import React, { useState } from 'react';
import { Grid, Upload, Download, ShieldCheck, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function ImageSplitterTool() {
  const [image, setImage] = useState(null);
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [tiles, setTiles] = useState([]); // array of { idx, url, name }
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setTiles([]);
    const selected = e.target.files?.[0];
    if (!selected || !selected.type.startsWith('image/')) {
      setErrorMsg('Please upload a valid image file.');
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

  const performSplit = () => {
    if (!image) return;
    setLoading(true);
    setErrorMsg(null);
    const newTiles = [];
    let done = 0;
    const total = rows * cols;

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const tileW = Math.floor(img.width / cols);
        const tileH = Math.floor(img.height / rows);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const canvas = document.createElement('canvas');
            canvas.width = tileW;
            canvas.height = tileH;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, c * tileW, r * tileH, tileW, tileH, 0, 0, tileW, tileH);
            canvas.toBlob((blob) => {
              if (blob) {
                newTiles.push({
                  idx: r * cols + c + 1,
                  row: r + 1,
                  col: c + 1,
                  url: URL.createObjectURL(blob),
                });
              }
              done++;
              if (done === total) {
                newTiles.sort((a, b) => a.idx - b.idx);
                setTiles(newTiles);
                setLoading(false);
              }
            }, 'image/png');
          }
        }
      };
      img.src = image.url;
    } catch (err) {
      setErrorMsg('Error slicing image offline.');
      setLoading(false);
    }
  };

  const downloadTile = (tile) => {
    const a = document.createElement('a');
    a.href = tile.url;
    a.download = `tile-${tile.row}x${tile.col}-${image.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Image Splitter & Grid Slicer (Instagram Carousel & Grids)</h1>
            <p className="text-sm text-[#676879]">Slice photos into 3x3 Instagram grids, 3x1 carousels, or custom rows/cols offline.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-indigo-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Images are sliced offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-4 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!image ? (
        <label className="dropzone">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop photo to slice into a grid here</p>
          <p className="text-xs text-[#9ca3af]">Supports PNG, JPG, and WEBP photos</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-6">
              <Grid className="w-8 h-8 text-indigo-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{image.name}</p>
                <p className="text-xs text-[#9ca3af]">{image.width} × {image.height} px</p>
              </div>
            </div>
            <button
              onClick={() => { setImage(null); setTiles([]); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef]"
            >
              Replace Photo
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-6 bg-white p-6 rounded-xl border border-white/5">
            <span className="text-xs font-semibold text-[#9ca3af]">Grid Presets:</span>
            {[
              { label: '3×3 Instagram Profile', r: 3, c: 3 },
              { label: '3×1 Carousel Panorama', r: 1, c: 3 },
              { label: '2×2 Square Grid', r: 2, c: 2 },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => { setRows(preset.r); setCols(preset.c); setTiles([]); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  rows === preset.r && cols === preset.c ? 'bg-indigo-500 text-black' : 'bg-gray-100 text-[#1f2532]'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Columns ({cols})</label>
              <input type="range" min="1" max="6" value={cols} onChange={(e) => { setCols(Number(e.target.value)); setTiles([]); }} className="w-full accent-indigo-400" />
            </div>
            <div>
              <label className="text-[11px] text-[#9ca3af] block mb-1">Rows ({rows})</label>
              <input type="range" min="1" max="6" value={rows} onChange={(e) => { setRows(Number(e.target.value)); setTiles([]); }} className="w-full accent-indigo-400" />
            </div>
          </div>

          {tiles.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[#e6e9ef]">
              <span className="text-xs font-bold text-emerald-400 block">Sliced Grid Output ({tiles.length} Tiles):</span>
              <div
                className="grid gap-4 bg-white p-6 rounded-xl border border-[#e6e9ef]"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
              >
                {tiles.map((t) => (
                  <div key={t.idx} className="relative group overflow-hidden rounded border border-[#e6e9ef] bg-black">
                    <img src={t.url} alt={`Tile ${t.idx}`} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => downloadTile(t)}
                        className="text-white text-xs font-bold hover:underline"
                      >
                        Download #{t.idx}
                      </button>
                      <NativeShareButton 
                        fileUrl={t.url} 
                        fileName={`tile-${t.row}x${t.col}-${image.name}`} 
                        mimeType="image/png" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-[#e6e9ef]">
            <button
              onClick={performSplit}
              disabled={loading}
              className="py-3 px-6 rounded-xl bg-indigo-500 text-black font-bold hover:bg-indigo-400 transition-all flex items-center gap-3 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Slicing into {rows * cols} Tiles...</span>
                </>
              ) : (
                <>
                  <Layers className="w-5 h-5" />
                  <span>Slice Image into {rows}×{cols} Grid</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
