import React, { useState } from 'react';
import { Globe, Copy, Check, ShieldCheck, Download, Code, List } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function SitemapGeneratorTool() {
  const [urlsText, setUrlsText] = useState(
    `https://pahruli.com/\nhttps://pahruli.com/pdf-suite\nhttps://pahruli.com/ecommerce-calculator\nhttps://pahruli.com/about`
  );
  const [freq, setFreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const [includeLastmod, setIncludeLastmod] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateSitemap = () => {
    const lines = urlsText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l.startsWith('http://') || l.startsWith('https://'));

    const today = new Date().toISOString().split('T')[0];

    const xmlItems = lines.map((url) => {
      let entry = `  <url>\n    <loc>${url}</loc>\n`;
      if (includeLastmod) entry += `    <lastmod>${today}</lastmod>\n`;
      entry += `    <changefreq>${freq}</changefreq>\n`;
      entry += `    <priority>${priority}</priority>\n  </url>`;
      return entry;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlItems}\n</urlset>`;
  };

  const xmlOutput = generateSitemap();

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlOutput], { type: 'application/xml;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const urlCount = urlsText
    .split(/\r?\n/)
    .filter((l) => l.trim().startsWith('http')).length;

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side XML Sitemap Generator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Paste a list of your website URLs to build a clean Google-ready sitemap.xml file offline with custom change frequencies and priority scores."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span style={SL}>Page URLs ({urlCount} valid links)</span>
              <span className="text-xs text-[#868894]">One URL per line</span>
            </div>
            <textarea
              value={urlsText}
              onChange={(e) => setUrlsText(e.target.value)}
              rows={12}
              placeholder="https://pahruli.com/..."
              className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <div style={SL}>Change Frequency</div>
              <select
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] bg-white"
              >
                <option value="daily">daily</option>
                <option value="weekly">weekly</option>
                <option value="monthly">monthly</option>
                <option value="yearly">yearly</option>
              </select>
            </div>

            <div>
              <div style={SL}>Priority (0.1–1.0)</div>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] bg-white"
              >
                <option value="1.0">1.0 (Highest)</option>
                <option value="0.8">0.8 (Standard)</option>
                <option value="0.5">0.5 (Medium)</option>
                <option value="0.3">0.3 (Low)</option>
              </select>
            </div>

            <div>
              <div style={SL}>Last Modified</div>
              <label className="flex items-center gap-2 h-11 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] cursor-pointer bg-white">
                <input
                  type="checkbox"
                  checked={includeLastmod}
                  onChange={(e) => setIncludeLastmod(e.target.checked)}
                  className="accent-[#6161ff] w-4 h-4"
                />
                Include Today
              </label>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span style={SL}>Generated sitemap.xml</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy XML'}
              </button>
              <button
                onClick={handleDownloadXml}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#6161ff] text-[#6161ff] text-xs font-bold hover:bg-[#eceeff]"
              >
                <Download size={14} />
                Download .XML
              </button>
              <NativeShareButton text={xmlOutput} />
            </div>
          </div>
          <textarea
            value={xmlOutput}
            readOnly
            rows={16}
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-[#fbfbfc] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
