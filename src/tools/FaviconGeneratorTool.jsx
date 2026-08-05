import React, { useState } from 'react';
import { Sparkles, Download, ShieldCheck, Code, Copy, Check } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function FaviconGeneratorTool() {
  const [initials, setInitials] = useState('PH');
  const [bgColor, setBgColor] = useState('#6161ff');
  const [textColor, setTextColor] = useState('#ffffff');
  const [radius, setRadius] = useState(24);
  const [siteName, setSiteName] = useState('Pahruli');
  const [copied, setCopied] = useState(false);

  const generateSvg = () => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect width="100" height="100" rx="${radius}" fill="${bgColor}" />
  <text x="50%" y="54%" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="${textColor}" dominant-baseline="middle" text-anchor="middle">
    ${initials}
  </text>
</svg>`;
  };

  const svgCode = generateSvg();
  const manifestJson = JSON.stringify(
    {
      name: siteName,
      short_name: siteName,
      icons: [
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
        { src: '/icon-512.png', type: 'image/png', sizes: '512x512' }
      ],
      theme_color: bgColor,
      background_color: '#ffffff',
      display: 'standalone'
    },
    null,
    2
  );

  const htmlHeadTags = `<!-- Modern Vector Favicon -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="${bgColor}" />`;

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlHeadTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'favicon.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadManifest = () => {
    const blob = new Blob([manifestJson], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'site.webmanifest';
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
            100% Client-Side SVG Favicon & Web Manifest Generator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Design crisp vector favicons with custom typography and brand colors, and export your site.webmanifest JSON and HTML link tags offline."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <div style={SL}>Favicon Text / Brand Initials (1–3 chars)</div>
            <input
              type="text"
              maxLength={3}
              value={initials}
              onChange={(e) => setInitials(e.target.value.toUpperCase())}
              className="w-full h-12 px-4 rounded-xl border border-[#d0d4e4] font-bold text-lg text-[#1f2532] uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div style={SL}>Background Color</div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-[#d0d4e4]"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                />
              </div>
            </div>

            <div>
              <div style={SL}>Text Color</div>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-[#d0d4e4]"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                />
              </div>
            </div>
          </div>

          <div>
            <div style={SL}>Corner Radius (0 = Square, 50 = Circle)</div>
            <input
              type="range"
              min="0"
              max="50"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full accent-[#6161ff] h-2 bg-gray-200 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div style={SL}>Web Manifest App Name</div>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532]"
            />
          </div>
        </div>

        {/* Live Vector Preview */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm flex flex-col items-center justify-between">
            <span style={SL}>Vector Favicon Live Preview</span>
            <div
              className="w-32 h-32 rounded-2xl border border-[#e6e9ef] shadow-md flex items-center justify-center my-4 overflow-hidden bg-white"
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={handleDownloadSvg}
                className="flex-1 h-11 rounded-xl bg-[#6161ff] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#4e4ee0]"
              >
                <Download size={14} /> Download favicon.svg
              </button>
              <NativeShareButton text={svgCode} />
              <button
                onClick={handleDownloadManifest}
                className="flex-1 h-11 rounded-xl border border-[#6161ff] text-[#6161ff] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#eceeff]"
              >
                <Download size={14} /> site.webmanifest
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#e6e9ef] bg-[#fbfbfc]">
            <div className="flex items-center justify-between mb-2">
              <span style={SL}>HTML &lt;head&gt; Tags</span>
              <button
                onClick={handleCopyHtml}
                className="text-xs font-bold text-[#6161ff] hover:underline flex items-center gap-1"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Tags'}
              </button>
            </div>
            <pre className="font-mono text-xs text-[#1f2532] whitespace-pre-wrap">{htmlHeadTags}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
