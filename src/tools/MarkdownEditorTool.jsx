import React, { useState } from 'react';
import { FileText, Copy, Check, Download, ShieldCheck, Eye, Edit3 } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState(
    `# Pahruli — 100 Offline Tools\n\nWelcome to **Pahruli**. We build client-side, zero-signup tools for founders and creators.\n\n## Why use offline tools?\n1. **100% Privacy:** No server uploads.\n2. **Zero Latency:** Runs directly in memory.\n3. **Free Forever:** No accounts needed.\n\n> "Built by someone who got tired of doing this by hand."\n\n\`\`\`javascript\nconst pahruli = { tools: 100, offline: true };\n\`\`\``
  );
  const [viewMode, setViewMode] = useState('split'); // split, edit, preview
  const [copied, setCopied] = useState(false);

  // Simple HTML renderer from markdown for preview
  const renderHtml = (md) => {
    let html = md
      .replace(/^### (.*$)/gim, '<h3 style="font-size:16px; font-weight:700; margin-top:16px; margin-bottom:8px;">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 style="font-size:18px; font-weight:700; margin-top:20px; margin-bottom:10px;">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 style="font-size:22px; font-weight:700; margin-top:12px; margin-bottom:12px;">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/^\> (.*$)/gim, '<blockquote style="border-left:3px solid #6161ff; padding-left:12px; font-style:italic; color:#676879; margin:12px 0;">$1</blockquote>')
      .replace(/\n/gim, '<br />');
    return html;
  };

  const handleCopyHtml = () => {
    const rawHtml = renderHtml(markdown);
    navigator.clipboard.writeText(rawHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'pahruli_notes.md';
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
            100% Client-Side Markdown Live Editor & HTML Renderer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Draft GitHub READMEs, documentation, or release notes with instant visual preview and one-click HTML or .MD export."
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-[#e6e9ef] pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              viewMode === 'split'
                ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                : 'border-[#e6e9ef] bg-white text-[#676879]'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              viewMode === 'edit'
                ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                : 'border-[#e6e9ef] bg-white text-[#676879]'
            }`}
          >
            Editor Only
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
              viewMode === 'preview'
                ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                : 'border-[#e6e9ef] bg-white text-[#676879]'
            }`}
          >
            Preview Only
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532] hover:bg-gray-50"
          >
            {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            {copied ? 'Copied HTML!' : 'Copy HTML'}
          </button>
          <button
            onClick={handleDownloadMd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
          >
            <Download size={14} />
            Download .MD
          </button>
        </div>
      </div>

      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {(viewMode === 'split' || viewMode === 'edit') && (
          <div>
            <div style={SL}>Markdown Input</div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={14}
              className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
            />
          </div>
        )}

        {(viewMode === 'split' || viewMode === 'preview') && (
          <div>
            <div style={SL}>Live Preview</div>
            <div
              className="w-full p-5 rounded-xl border border-[#e6e9ef] bg-[#fbfbfc] min-h-[280px] prose prose-sm max-w-none text-[#1f2532]"
              dangerouslySetInnerHTML={{ __html: renderHtml(markdown) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
