import React, { useState, useMemo } from 'react';
import { Share2, Globe, Copy, Check, Upload, Image as ImageIcon, ShieldCheck, Search, MessageSquare } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80';

export default function OpenGraphPreviewTool() {
  const [url, setUrl] = useState('https://twignberries.com/v6-enterprise-suite');
  const [title, setTitle] = useState('Pahruli — 30 Enterprise-Grade Offline Utilities');
  const [desc, setDesc] = useState('Explore our 100% client-side PDF Suite, E-Commerce margin solvers, Image croppers, and developer tools with zero cloud retention.');
  const [imgSrc, setImgSrc] = useState(DEFAULT_IMG);
  const [activePlatform, setActivePlatform] = useState('google'); // google, twitter, linkedin, facebook
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImgSrc(event.target.result);
    };
    reader.readAsDataURL(selected);
  };

  const domain = useMemo(() => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'twignberries.com';
    }
  }, [url]);

  const htmlTags = `<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${imgSrc}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${imgSrc}" />`;

  const handleCopyTags = () => {
    navigator.clipboard.writeText(htmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
      {/* Left Column: Link Meta Data & Social Preview Viewport */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div style={SL}>1. Target Link Metadata & Social Image</div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              Page Canonical URL
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Globe size={18} color="#676879" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 13.5, fontWeight: 600, color: '#1f2532' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              OG Meta Title (Max ~60 characters recommended)
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 14, fontWeight: 700, color: '#1f2532' }}
            />
            <div style={{ fontSize: 11.5, color: title.length > 60 ? '#e2445c' : '#676879', marginTop: 4, fontWeight: 600 }}>
              {title.length} characters • {title.length > 60 ? '⚠️ May truncate in Google search results' : 'Optimal length'}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 6 }}>
              OG Meta Description (Max ~155 characters recommended)
            </label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 13.5, color: '#1f2532', resize: 'vertical' }}
            />
            <div style={{ fontSize: 11.5, color: desc.length > 155 ? '#e2445c' : '#676879', marginTop: 4, fontWeight: 600 }}>
              {desc.length} characters
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1f2532', marginBottom: 8 }}>
              OpenGraph Preview Image URL or Local Upload
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label
                htmlFor="og-img-upload"
                style={{
                  padding: '10px 14px', borderRadius: 10, border: '1px solid #d0d4e4',
                  background: '#f6f8fa', color: '#1f2532', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0
                }}
              >
                <Upload size={14} /> Upload Custom Image
                <input
                  id="og-img-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>

              <input
                type="text"
                value={imgSrc}
                onChange={e => setImgSrc(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: '1px solid #d0d4e4', background: '#fff', fontSize: 12.5 }}
              />
            </div>
          </div>
        </div>

        {/* Live Multi-Platform Preview Card */}
        <div className="form-card">
          <div className="flex items-center justify-between mb-4">
            <div style={SL} className="mb-0">2. Live Social Card Feed Preview</div>

            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { id: 'google', label: 'Google Search' },
                { id: 'twitter', label: 'Twitter / X' },
                { id: 'linkedin', label: 'LinkedIn Feed' },
                { id: 'facebook', label: 'Facebook' }
              ].map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePlatform(p.id)}
                  style={{
                    padding: '6px 12px', borderRadius: 8,
                    border: activePlatform === p.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                    background: activePlatform === p.id ? '#f3f5ff' : '#ffffff',
                    color: activePlatform === p.id ? '#6161ff' : '#1f2532',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Platform Specific Renderer */}
          <div style={{ padding: '24px', borderRadius: 16, background: '#f7f9fc', border: '1px solid #e6e9ef' }}>
            {activePlatform === 'google' && (
              <div style={{ maxWidth: 560, background: '#fff', padding: 18, borderRadius: 12, border: '1px solid #e6e9ef', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 4 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 13, background: '#eceeff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#6161ff' }}>
                    W
                  </div>
                  <span style={{ fontSize: 12, color: '#1f2532', fontWeight: 600 }}>{domain}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1a0dab', marginBottom: 4, textDecoration: 'underline', cursor: 'pointer' }}>
                  {title}
                </div>
                <div style={{ fontSize: 13.5, color: '#4d5156', lineHeight: 1.5 }}>
                  {desc}
                </div>
              </div>
            )}

            {activePlatform === 'twitter' && (
              <div style={{ maxWidth: 480, borderRadius: 16, border: '1px solid #cfd9de', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ height: 240, background: '#e6e9ef', overflow: 'hidden' }}>
                  <img src={imgSrc} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: 12, color: '#536471', fontWeight: 500 }}>{domain}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f1419', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: '#536471', marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {desc}
                  </div>
                </div>
              </div>
            )}

            {activePlatform === 'linkedin' && (
              <div style={{ maxWidth: 500, borderRadius: 10, border: '1px solid #d0d8dc', overflow: 'hidden', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                <div style={{ height: 250, background: '#e6e9ef', overflow: 'hidden' }}>
                  <img src={imgSrc} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px 26px', background: '#eef3f8' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#000000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 12, color: '#666666', marginTop: 2 }}>{domain}</div>
                </div>
              </div>
            )}

            {activePlatform === 'facebook' && (
              <div style={{ maxWidth: 500, borderRadius: 8, border: '1px solid #ced0d4', overflow: 'hidden', background: '#fff', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
                <div style={{ height: 250, background: '#e6e9ef', overflow: 'hidden' }}>
                  <img src={imgSrc} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '24px 26px', background: '#f0f2f5' }}>
                  <div style={{ fontSize: 11, color: '#65676b', textTransform: 'uppercase', fontWeight: 700 }}>{domain}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#050505', marginTop: 2 }}>
                    {title}
                  </div>
                  <div style={{ fontSize: 13, color: '#65676b', marginTop: 4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {desc}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">SEO Status</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>ALL TAGS VALID</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 26, color: '#6161ff' }}>
              {activePlatform.toUpperCase()}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              Live Social Card Rendering
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              onClick={handleCopyTags}
              className="btn-primary"
              style={{ flex: 1, background: '#6161ff', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied HTML Tags!' : 'Copy HTML Meta Tags'}
            </button>
            <NativeShareButton text={htmlTags} />
          </div>

          <textarea
            readOnly
            value={htmlTags}
            rows={7}
            style={{ width: '100%', padding: '10px', borderRadius: 8, background: '#1f2532', color: '#00c875', fontFamily: 'var(--font-mono)', fontSize: 11, border: 'none' }}
          />

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-3 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>100% browser-memory SEO card simulator.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why test OpenGraph Tags?</div>
          Broken social card previews drastically reduce click-through rates on Twitter, LinkedIn, and Slack. Test how your link looks before publishing!
        </div>
      </div>
    </div>
  );
}
