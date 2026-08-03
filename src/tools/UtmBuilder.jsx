import React, { useState } from 'react';
import { Link2, Copy, Check, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

export default function UtmBuilder() {
  const [url, setUrl] = useState('https://twignberries.com');
  const [source, setSource] = useState('linkedin');
  const [medium, setMedium] = useState('social');
  const [campaign, setCampaign] = useState('launch_2026');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('button_cta');
  const [copied, setCopied] = useState(false);

  const cleanUrl = url.trim().replace(/\/$/, '');
  const params = new URLSearchParams();
  if (source) params.append('utm_source', source.trim());
  if (medium) params.append('utm_medium', medium.trim());
  if (campaign) params.append('utm_campaign', campaign.trim());
  if (term) params.append('utm_term', term.trim());
  if (content) params.append('utm_content', content.trim());

  const queryString = params.toString();
  const fullUtmUrl = queryString ? `${cleanUrl}?${queryString}` : cleanUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUtmUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            UTM Campaign URL Builder &amp; Tag Generator
          </h1>
          <span className="badge badge-success">ONE-CLICK COPY</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Build clean, standardized campaign tracking links for Google Analytics 4, LinkedIn, and email.
        </p>
      </div>

        <button
          onClick={handleCopy}
          className="btn-primary"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Campaign Link!' : 'Copy UTM URL'}</span>
        </button>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="lg:col-span-6 glass-card space-y-4">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 mb-2">
            <Link2 className="w-4 h-4 text-[#ff6b00]" /> 1. Configure Campaign Tags
          </h2>

          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Website Destination URL *
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="glass-input font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Campaign Source * (utm_source)
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="google, linkedin, newsletter"
                className="glass-input font-mono text-sm"
              />
              <span className="text-[10px] text-[#6b7280] block mt-1">e.g. referrer or platform</span>
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Campaign Medium * (utm_medium)
              </label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="cpc, email, social, banner"
                className="glass-input font-mono text-sm"
              />
              <span className="text-[10px] text-[#6b7280] block mt-1">e.g. marketing channel</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Campaign Name * (utm_campaign)
            </label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="summer_sale, launch_2026, bfcm"
              className="glass-input font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                Campaign Term (Optional)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="saas_founders, b2b_leads"
                className="glass-input font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#9ca3af] mb-1">
                Campaign Content (Optional)
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="sidebar_cta, logo_link"
                className="glass-input font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <div className="p-5 rounded-xl bg-[#0e111a] border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#9ca3af]">GENERATED LINK PREVIEW</span>
              <span className="badge badge-success">READY FOR GA4</span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white break-all leading-relaxed">
              {fullUtmUrl}
            </div>

            <div className="space-y-2 text-xs font-mono pt-2">
              <div className="flex justify-between text-[#9ca3af]">
                <span>utm_source:</span>
                <span className="text-white font-semibold">{source || '—'}</span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>utm_medium:</span>
                <span className="text-white font-semibold">{medium || '—'}</span>
              </div>
              <div className="flex justify-between text-[#9ca3af]">
                <span>utm_campaign:</span>
                <span className="text-[#ff6b00] font-semibold">{campaign || '—'}</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#6b7280] uppercase tracking-wider block">
              Quick 2026 Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'LinkedIn Launch Post', s: 'linkedin', m: 'social', c: 'product_launch' },
                { label: 'Reddit Community CTA', s: 'reddit', m: 'community', c: 'saas_feedback' },
                { label: 'Email Newsletter Button', s: 'newsletter', m: 'email', c: 'weekly_digest' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSource(preset.s);
                    setMedium(preset.m);
                    setCampaign(preset.c);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
