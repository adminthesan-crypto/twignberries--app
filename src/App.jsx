import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CommandKModal from './components/CommandKModal';
import { ArrowLeft, Star, ShieldCheck, ExternalLink } from 'lucide-react';

import EtsyFeeCalculator from './tools/EtsyFeeCalculator';
import InvoiceGenerator from './tools/InvoiceGenerator';
import StripeFeeCalculator from './tools/StripeFeeCalculator';
import GstCalculator from './tools/GstCalculator';
import UtmBuilder from './tools/UtmBuilder';
import PayPalFeeCalculator from './tools/PayPalFeeCalculator';
import YouTubeRpmCalculator from './tools/YouTubeRpmCalculator';
import PdfMarkdownConverter from './tools/PdfMarkdownConverter';
import AmazonFbaCalculator from './tools/AmazonFbaCalculator';
import TikTokShopCalculator from './tools/TikTokShopCalculator';
import RoasCalculator from './tools/RoasCalculator';
import ShopifyFeeCalculator from './tools/ShopifyFeeCalculator';
import CreatorPlatformFeeCalculator from './tools/CreatorPlatformFeeCalculator';
import SaasChurnLtvCalculator from './tools/SaasChurnLtvCalculator';
import AiTokenCostCalculator from './tools/AiTokenCostCalculator';

/* ─── Tool Definitions ───────────────────────────────────── */
const TOOLS = [
  {
    id: 'etsy-fee',
    name: 'Etsy Fee & Profit Calculator',
    category: 'E-Commerce',
    description: 'True net profit after the 6.5% transaction cut, listing fees, and offsite ads.',
    keywords: ['etsy margin', 'etsy seller', 'handmade fee', 'profit margin'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    component: EtsyFeeCalculator,
  },
  {
    id: 'paypal-fee',
    name: 'PayPal Fee & Net Payout',
    category: 'E-Commerce',
    description: 'Standard 2.99% + 49¢, micropayment rates, and break-even invoice totals.',
    keywords: ['paypal fee', 'paypal calculator', 'paypal merchant'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="3"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    component: PayPalFeeCalculator,
  },
  {
    id: 'stripe-fee',
    name: 'Stripe Fee & Break-even Solver',
    category: 'E-Commerce',
    description: 'Calculate 2.9% + 30¢ domestic or international rates, reverse-price any charge.',
    keywords: ['stripe payout', 'stripe pricing', 'break even calculator'],
    color: '#6366f1', bg: 'rgba(99,102,241,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    component: StripeFeeCalculator,
  },
  {
    id: 'gst-calculator',
    name: 'GST Tax Inclusive & Exclusive',
    category: 'E-Commerce',
    description: 'Instant CGST / SGST split breakdown with inclusive and exclusive modes.',
    keywords: ['gst exclusive', 'gst inclusive', 'cgst sgst india'],
    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 14 6-6"/><circle cx="9.5" cy="9.5" r="1.5"/><circle cx="14.5" cy="14.5" r="1.5"/>
        <rect x="3" y="3" width="18" height="18" rx="3"/>
      </svg>
    ),
    component: GstCalculator,
  },
  {
    id: 'amazon-fba',
    name: 'Amazon FBA Profit Calculator',
    category: 'E-Commerce',
    description: 'FBA fulfillment tiers, category referral cuts (8%–17%), and exact net profit.',
    keywords: ['amazon fba', 'amazon referral fee', 'fba calculator'],
    color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    component: AmazonFbaCalculator,
  },
  {
    id: 'tiktok-shop',
    name: 'TikTok Shop Commission Solver',
    category: 'E-Commerce',
    description: 'Calculate 6% TikTok commission, affiliate creator cuts, and seller net margin.',
    keywords: ['tiktok shop fee', 'tiktok affiliate calculator'],
    color: '#ec4899', bg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
      </svg>
    ),
    component: TikTokShopCalculator,
  },
  {
    id: 'shopify-fee',
    name: 'Shopify Plan Fee Estimator',
    category: 'E-Commerce',
    description: 'Compare Basic, Standard, and Advanced monthly CC rates and gateway penalties.',
    keywords: ['shopify transaction fee', 'shopify basic plan'],
    color: '#10b981', bg: 'rgba(16,185,129,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    component: ShopifyFeeCalculator,
  },
  {
    id: 'invoice-generator',
    name: 'Freelance Invoice Generator PDF',
    category: 'Freelance',
    description: 'Create professional invoices in 30 seconds with instant PDF print/export.',
    keywords: ['free invoice maker', 'freelance receipt', 'pdf invoice without signup'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    component: InvoiceGenerator,
  },
  {
    id: 'pdf-markdown',
    name: 'Markdown to PDF Converter',
    category: 'Freelance',
    description: 'Type or paste markdown notes, proposals, or readmes and export a clean PDF.',
    keywords: ['markdown to pdf', 'markdown exporter', 'notion pdf converter'],
    color: '#6366f1', bg: 'rgba(99,102,241,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
    component: PdfMarkdownConverter,
  },
  {
    id: 'creator-platform',
    name: 'Patreon & Creator Platform Fees',
    category: 'Freelance',
    description: 'Compare Patreon Pro (8%), BuyMeACoffee (5%), and Ko-fi (0%) take-home pay.',
    keywords: ['patreon fee calculator', 'buymeacoffee fee', 'ko-fi fee'],
    color: '#f97316', bg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    component: CreatorPlatformFeeCalculator,
  },
  {
    id: 'saas-churn-ltv',
    name: 'SaaS MRR Churn & LTV:CAC',
    category: 'Freelance',
    description: 'Calculate LTV, LTV:CAC ratio health, and CAC payback period based on churn.',
    keywords: ['saas ltv cac', 'mrr churn calculator', 'saas payback period'],
    color: '#14b8a6', bg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    component: SaasChurnLtvCalculator,
  },
  {
    id: 'youtube-rpm',
    name: 'YouTube AdSense RPM Estimator',
    category: 'Marketing',
    description: 'Estimate daily, monthly, and annual YouTube AdSense earnings across 2026 niches.',
    keywords: ['youtube rpm', 'adsense calculator', 'youtube income', 'creator cpm'],
    color: '#ef4444', bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
    component: YouTubeRpmCalculator,
  },
  {
    id: 'utm-builder',
    name: 'UTM Campaign URL Builder',
    category: 'Marketing',
    description: 'Build valid GA4 campaign tracking URLs with one-click copy and quick presets.',
    keywords: ['utm source', 'utm medium', 'google analytics campaign link'],
    color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    ),
    component: UtmBuilder,
  },
  {
    id: 'roas-calculator',
    name: 'ROAS & Ad Spend Break-Even',
    category: 'Marketing',
    description: 'Calculate exact Break-Even ROAS, Target CPA, and paid ad profitability.',
    keywords: ['roas calculator', 'break even roas', 'meta ad roas', 'cpa calculator'],
    color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    component: RoasCalculator,
  },
  {
    id: 'ai-token-cost',
    name: 'AI API Token Cost Calculator',
    category: 'AI & Dev',
    description: 'Compare GPT-4o, Claude 3.5, Gemini 1.5 Pro, and DeepSeek API token costs.',
    keywords: ['ai cost calculator', 'gpt4o token pricing', 'claude 3.5 pricing', 'llm api cost'],
    color: '#06b6d4', bg: 'rgba(6,182,212,0.12)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    component: AiTokenCostCalculator,
  },
];

/* ─── Tool Card (Home Grid) ──────────────────────────────── */
function ToolCard({ tool, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="tool-card animate-fade-in"
      style={{ '--card-accent': tool.color }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="tool-card-icon" style={{ background: tool.bg, color: tool.color }}>
        {tool.icon}
      </div>
      <div>
        <div className="tool-card-name">{tool.name}</div>
        <div className="tool-card-desc" style={{ marginTop: 4 }}>{tool.description}</div>
      </div>
      <div className="tool-card-arrow">
        Open tool →
      </div>
    </div>
  );
}

/* ─── Home Grid ──────────────────────────────────────────── */
function HomeGrid({ tools, onSelectTool, selectedCategory }) {
  const filtered = selectedCategory === 'All' ? tools : tools.filter(t => t.category === selectedCategory);
  const categoryLabel = selectedCategory === 'All' ? 'All Tools' : selectedCategory;

  return (
    <div>
      {/* Greeting header (ilovepdf style) */}
      <div style={{ marginBottom: 32, textAlign: 'center', paddingTop: 16 }}>
        <h1 style={{
          fontSize: 28, fontWeight: 800, color: 'var(--text-1)',
          letterSpacing: '-0.03em', marginBottom: 8,
        }}>
          Free calculators for creators & sellers
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-4)', fontWeight: 400 }}>
          {filtered.length} zero-signup tools — 100% client-side, nothing leaves your browser
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
      }}>
        {filtered.map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => onSelectTool(tool.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Main App ───────────────────────────────────────────── */
export default function App() {
  const [activeToolId, setActiveToolId] = useState(null); // null = home grid
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [starredIds, setStarredIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tw_starred') || '[]'); }
    catch { return []; }
  });

  const [recentIds, setRecentIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tw_recent') || '[]'); }
    catch { return []; }
  });

  const handleSelectTool = (id) => {
    setActiveToolId(id);
    setRecentIds(prev => {
      const updated = [id, ...prev.filter(i => i !== id)].slice(0, 6);
      try { localStorage.setItem('tw_recent', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setActiveToolId(null); // go back to grid
  };

  const handleToggleStar = (id) => {
    setStarredIds(prev => {
      const isStarred = prev.includes(id);
      const updated = isStarred ? prev.filter(i => i !== id) : [...prev, id];
      try { localStorage.setItem('tw_starred', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  // Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(p => !p);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeTool = TOOLS.find(t => t.id === activeToolId);
  const ActiveComponent = activeTool?.component;
  const isStarred = activeTool ? starredIds.includes(activeTool.id) : false;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* Body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        {/* Sidebar — only show when a tool is active */}
        {activeToolId && (
          <Sidebar
            tools={TOOLS}
            activeToolId={activeToolId}
            onSelectTool={handleSelectTool}
            starredIds={starredIds}
            recentIds={recentIds}
          />
        )}

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>

            {activeToolId && activeTool ? (
              <>
                {/* Breadcrumb + actions bar */}
                <div className="no-print" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginBottom: 24, flexWrap: 'wrap', gap: 12,
                }}>
                  <button
                    onClick={() => setActiveToolId(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      fontSize: 13, fontWeight: 500, color: 'var(--text-4)',
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'color 0.13s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-4)'}
                  >
                    <ArrowLeft size={14} />
                    All Tools
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {/* Category badge */}
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 9px',
                      borderRadius: 99, background: 'rgba(255,255,255,0.06)',
                      color: 'var(--text-4)', border: '1px solid var(--border)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      {activeTool.category}
                    </span>

                    {/* Star button */}
                    <button
                      onClick={() => handleToggleStar(activeTool.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        padding: '6px 14px', borderRadius: 8, transition: 'all 0.15s ease',
                        background: isStarred ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                        color: isStarred ? '#f59e0b' : 'var(--text-4)',
                        border: isStarred ? '1.5px solid rgba(245,158,11,0.3)' : '1.5px solid var(--border)',
                      }}
                    >
                      <Star size={13} fill={isStarred ? '#f59e0b' : 'none'} />
                      {isStarred ? 'Starred' : 'Star this tool'}
                    </button>
                  </div>
                </div>

                {/* Tool content */}
                <div className="animate-fade-in">
                  <ActiveComponent />
                </div>
              </>
            ) : (
              /* Home Grid */
              <HomeGrid
                tools={TOOLS}
                onSelectTool={handleSelectTool}
                selectedCategory={selectedCategory}
              />
            )}

            {/* Footer */}
            <footer
              className="no-print"
              style={{
                marginTop: 56, paddingTop: 24,
                borderTop: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: 12,
                fontSize: 12, color: 'var(--text-4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ShieldCheck size={13} color="var(--brand)" />
                Zero signups — 100% client-side privacy
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-light)' }}>
                v2.3.0 · 15 Tools
              </span>
            </footer>
          </div>
        </main>
      </div>

      {/* Cmd+K Search */}
      <CommandKModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={TOOLS}
        onSelectTool={handleSelectTool}
        starredIds={starredIds}
      />
    </div>
  );
}
