import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TOOLS from '../data/toolsData';
import { Code, Copy, Check, ExternalLink, Zap } from 'lucide-react';

const EMBED_BASE_URL = 'https://usepahruli.com/embed/';

// Top tools that bloggers would want to embed — ordered by search volume potential
const FEATURED_TOOL_IDS = [
  'merge-pdf',
  'compress-pdf',
  'split-pdf',
  'pdf-to-image',
  'image-to-pdf',
  'image-compressor',
  'json-formatter',
  'invoice-generator',
  'qr-generator',
  'password-generator',
  'csv-json',
  'image-resizer',
  'crop-image',
  'watermark-pdf',
  'word-to-pdf',
  'pdf-to-word',
  'image-collage-maker',
  'compress-pdf',
];

function getEmbedCode(toolId) {
  return `<iframe src="${EMBED_BASE_URL}${toolId}" width="100%" height="600" frameborder="0" style="border-radius:12px; border:1px solid #e5e7eb;" loading="lazy" title="Pahruli - Free Offline Tool"></iframe>`;
}

function ToolCard({ tool }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getEmbedCode(tool.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = getEmbedCode(tool.id);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      {/* Tool Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: tool.bg || '#f5f6f8', color: tool.color || '#676879' }}
        >
          {typeof tool.icon === 'function'
            ? <tool.icon size={18} />
            : React.cloneElement(tool.icon, { width: 18, height: 18 })}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900 leading-tight">{tool.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">100% offline • Free forever</p>
        </div>
      </div>

      {/* Embed Code Preview */}
      <div className="bg-gray-50 rounded-lg p-3 font-mono text-[11px] text-gray-600 leading-relaxed overflow-x-auto border border-gray-100">
        <code className="break-all">{`<iframe src="${EMBED_BASE_URL}${tool.id}" ...>`}</code>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            copied
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? 'Copied!' : 'Copy Embed Code'}
        </button>
        <a
          href={`/embed/${tool.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
          title="Preview embed"
        >
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}

export default function EmbedPage() {
  // Resolve tool IDs to actual tool objects, filtering out any that don't exist
  const featuredTools = FEATURED_TOOL_IDS
    .map(id => TOOLS.find(t => t.id === id))
    .filter(Boolean)
    // Remove duplicates
    .filter((tool, index, self) => self.findIndex(t => t.id === tool.id) === index);

  return (
    <>
      <Helmet>
        <title>Embed Free PDF & Dev Tools on Your Website | Pahruli</title>
        <meta name="description" content="Add free, offline PDF tools directly into your blog posts with one line of HTML. No API keys. No server costs. Your readers get instant utility." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-purple-100">
            <Code size={14} />
            One line of HTML. That's it.
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Embed Pahruli Tools<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">On Your Website</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Add free, offline PDF & Dev tools directly into your blog posts.
            Your readers get instant utility. You get a permanent backlink. <strong>Win-win.</strong>
          </p>
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-20 border border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 text-xl font-black">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Pick a Tool</h3>
              <p className="text-sm text-gray-500">Choose from 100+ offline tools above. Each one works independently.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center mx-auto mb-4 text-xl font-black">2</div>
              <h3 className="font-bold text-gray-900 mb-2">Copy the Code</h3>
              <p className="text-sm text-gray-500">One click copies a single iframe tag. No API keys. No JavaScript bundles. No server costs.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-xl font-black">3</div>
              <h3 className="font-bold text-gray-900 mb-2">Paste & Publish</h3>
              <p className="text-sm text-gray-500">Works in WordPress, Ghost, Notion, Webflow, or any HTML page. Your readers can use the tool instantly.</p>
            </div>
          </div>
        </div>

        {/* Why Embed */}
        <div className="text-center mb-20">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Why Bloggers Embed Pahruli</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <Zap size={24} className="text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 text-sm mb-1">Zero Load on Your Server</h3>
              <p className="text-xs text-gray-500">Tools process files inside the reader's browser. Your server does nothing.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <Zap size={24} className="text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 text-sm mb-1">Increases Time on Page</h3>
              <p className="text-xs text-gray-500">Readers stay on your blog longer when they can actually use the tool you're writing about.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <Zap size={24} className="text-yellow-500 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 text-sm mb-1">Free Forever</h3>
              <p className="text-xs text-gray-500">No API limits. No rate throttling. No "upgrade to Pro" popups for your readers.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 md:p-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Want All 100+ Tools?</h2>
          <p className="text-gray-400 mb-6">Visit the full Pahruli suite. Free. Offline. No signup.</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all duration-200"
          >
            Explore All Tools
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </>
  );
}
