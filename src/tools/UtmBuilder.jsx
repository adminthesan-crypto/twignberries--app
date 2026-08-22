import React, { useState } from 'react';
import AeoArticle from '../components/AeoArticle';
import { Link2, Copy, Check, ExternalLink, Sparkles, AlertCircle, Share2, Target, Zap } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};

const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

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

  const presets = [
    { label: 'LinkedIn Launch Post', s: 'linkedin', m: 'social', c: 'product_launch' },
    { label: 'Reddit Community CTA', s: 'reddit', m: 'community', c: 'saas_feedback' },
    { label: 'Email Newsletter Button', s: 'newsletter', m: 'email', c: 'weekly_digest' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            UTM Campaign Tracking Link Builder
          </h1>
          <span className="badge badge-brand">GA4 COMPATIBLE</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Build standardized campaign URLs for analytics with zero typos, consistent attribution, and clean reporting.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* ── Left Column (Inputs) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Card 1: Destination URL & Campaign Name */}
          <div className="form-card">
            <div style={SL}>
              <Link2 size={13} color="var(--brand)" /> 1. Destination URL &amp; Campaign Name
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Website destination URL *</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourwebsite.com/pricing"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}
              />
              <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                The landing page where users should arrive when they click your campaign link.
              </div>
            </div>

            <div style={{ marginBottom: 0 }}>
              <label>Campaign name * (utm_campaign)</label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="summer_sale, launch_2026, bfcm"
                style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600 }}
              />
              <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                Identifies a specific product promotion or strategic initiative.
              </div>
            </div>
          </div>

          {/* Card 2: Source & Medium */}
          <div className="form-card">
            <div style={SL}>
              <Target size={13} color="var(--brand)" /> 2. Traffic Source &amp; Medium
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[16px]">
              <div>
                <label>Campaign source * (utm_source)</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="linkedin, google, newsletter"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  The referrer or platform sending traffic.
                </div>
              </div>

              <div>
                <label>Campaign medium * (utm_medium)</label>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  placeholder="social, cpc, email, banner"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  The marketing channel or medium type.
                </div>
              </div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                Quick channel presets
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSource(preset.s);
                      setMedium(preset.m);
                      setCampaign(preset.c);
                    }}
                    style={{
                      padding: '7px 12px',
                      borderRadius: 8,
                      border: '1px solid var(--border-md)',
                      background: 'rgba(255,255,255,0.03)',
                      color: 'var(--text-2)',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Optional Attribution Tags */}
          <div className="form-card">
            <div style={SL}>
              <Zap size={13} color="var(--brand)" /> 3. Advanced Attribution (Optional)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[0px]">
              <div>
                <label>Campaign term (utm_term)</label>
                <input
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  placeholder="b2b_founders, saas_leads"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  Paid keywords or audience segments.
                </div>
              </div>

              <div>
                <label>Campaign content (utm_content)</label>
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="header_cta, sidebar_banner"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 14 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  Differentiate identical links in the same ad/email.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right Column (Results - Sticky) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          
          {/* Primary Hero Banner */}
          <div style={{
            padding: 26, borderRadius: 16, textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(255,92,0,0.08),rgba(255,92,0,0.03))',
            border: '1px solid rgba(255,92,0,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 12 }}>
              Generated UTM URL
            </div>
            
            <div style={{
              padding: 14,
              borderRadius: 10,
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-1)',
              wordBreak: 'break-all',
              textAlign: 'left',
              lineHeight: 1.6,
              marginBottom: 16,
              maxHeight: 120,
              overflowY: 'auto',
            }}>
              {fullUtmUrl}
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={handleCopy}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', height: 44 }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? 'Copied Campaign URL!' : 'Copy Tracking Link'}</span>
              </button>
              <NativeShareButton text={fullUtmUrl} />
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Tag breakdown
              </span>
              <CopySummaryButton
                title="UTM Campaign Tracking Spec"
                lines={[
                  { label: 'Destination URL', value: cleanUrl || '—' },
                  { label: 'utm_source', value: source || '—' },
                  { label: 'utm_medium', value: medium || '—' },
                  { label: 'utm_campaign', value: campaign || '—' },
                  { label: 'utm_term', value: term || 'none' },
                  { label: 'utm_content', value: content || 'none' },
                  { label: 'Generated URL', value: fullUtmUrl },
                ]}
              />
            </div>

            {[
              { label: 'Destination', value: cleanUrl || '—', color: 'var(--text-2)', mono: true },
              { divider: true },
              { label: 'utm_source', value: source || '—', color: 'var(--text-1)', mono: true },
              { label: 'utm_medium', value: medium || '—', color: 'var(--text-1)', mono: true },
              { label: 'utm_campaign', value: campaign || '—', color: 'var(--brand)', mono: true, bold: true },
              { divider: true },
              { label: 'utm_term', value: term || '—', color: 'var(--text-4)', mono: true },
              { label: 'utm_content', value: content || '—', color: 'var(--text-4)', mono: true },
            ].map((r, i) =>
              r.divider ? <div key={i} style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} /> : (
                <div key={i} style={ROW}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{r.label}</span>
                  <span style={{
                    fontFamily: r.mono ? 'var(--font-mono)' : 'inherit',
                    fontSize: 13,
                    fontWeight: r.bold ? 700 : 500,
                    color: r.color,
                    maxWidth: 210,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {r.value}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> Always use lowercase characters and underscores (no spaces) for UTM values. Google Analytics 4 treats <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand)' }}>LinkedIn</code> and <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand)' }}>linkedin</code> as separate traffic sources.
          </div>

        </div>
      </div>

      <AeoArticle>
        <h2>What are UTM Parameters?</h2>
        <p>UTM (Urchin Tracking Module) parameters are short text codes added to the end of a URL. They act as invisible tags that pass critical data back to Google Analytics 4 (GA4) or other analytics platforms, telling you exactly where your website traffic came from and what campaign drove it.</p>
        
        <h3>The 5 Core UTM Tags</h3>
        <p>A properly structured UTM link removes the guesswork from marketing attribution. The standard parameters are:</p>
        <ul>
          <li><strong>utm_source (Required):</strong> Identifies the specific platform or referrer sending traffic (e.g., <code>google</code>, <code>newsletter</code>, <code>linkedin</code>).</li>
          <li><strong>utm_medium (Required):</strong> Describes the type of traffic or the marketing medium (e.g., <code>cpc</code> for paid search, <code>email</code>, <code>social</code>).</li>
          <li><strong>utm_campaign (Required):</strong> Identifies the specific promotion, sale, or marketing initiative (e.g., <code>black_friday_2026</code>).</li>
          <li><strong>utm_term (Optional):</strong> Used in paid search to track the exact keyword the user searched for.</li>
          <li><strong>utm_content (Optional):</strong> Differentiates similar links within the same ad or email (e.g., <code>hero_button</code> vs <code>footer_link</code>).</li>
        </ul>

        <h3>Best Practices for UTM Tagging in GA4</h3>
        <p>Google Analytics 4 is notoriously strict about casing and spacing. To maintain a clean dashboard, adhere to these rules:</p>
        <ul>
          <li><strong>Always use lowercase:</strong> <code>utm_source=Facebook</code> and <code>utm_source=facebook</code> will be split into two entirely separate rows in GA4. Force lowercase for everything.</li>
          <li><strong>Use underscores instead of spaces:</strong> Spaces break URLs. Use underscores (<code>summer_sale</code>) or hyphens (<code>summer-sale</code>) for readability.</li>
          <li><strong>Never use UTMs for internal links:</strong> Adding UTM tags to links <em>within</em> your own website will overwrite the original session referrer and destroy your attribution data. Only use UTMs for inbound external traffic.</li>
        </ul>
      </AeoArticle>
    </div>
  );
}
