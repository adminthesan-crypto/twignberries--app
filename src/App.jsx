import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CommandKModal from './components/CommandKModal';

// Tools (Original 5)
import EtsyFeeCalculator from './tools/EtsyFeeCalculator';
import InvoiceGenerator from './tools/InvoiceGenerator';
import StripeFeeCalculator from './tools/StripeFeeCalculator';
import GstCalculator from './tools/GstCalculator';
import UtmBuilder from './tools/UtmBuilder';

// New Tools (3 Expansion Utilities)
import PayPalFeeCalculator from './tools/PayPalFeeCalculator';
import YouTubeRpmCalculator from './tools/YouTubeRpmCalculator';
import PdfMarkdownConverter from './tools/PdfMarkdownConverter';

// New Tools (6 Full Suite Expansion Utilities — v2.0.0)
import AmazonFbaCalculator from './tools/AmazonFbaCalculator';
import TikTokShopCalculator from './tools/TikTokShopCalculator';
import RoasCalculator from './tools/RoasCalculator';
import ShopifyFeeCalculator from './tools/ShopifyFeeCalculator';
import CreatorPlatformFeeCalculator from './tools/CreatorPlatformFeeCalculator';
import SaasChurnLtvCalculator from './tools/SaasChurnLtvCalculator';
import AiTokenCostCalculator from './tools/AiTokenCostCalculator';

import { Sparkles, Star, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const tools = [
    {
      id: 'etsy-fee',
      name: 'Etsy Fee & Profit Calculator (2026)',
      category: 'E-Commerce',
      description: 'Calculate Etsy 6.5% transaction cut, listing fees, offsite ads, and true net margins.',
      keywords: ['etsy margin', 'etsy seller', 'handmade fee', 'profit margin'],
      component: EtsyFeeCalculator
    },
    {
      id: 'paypal-fee',
      name: 'PayPal Fee & Net Payout Calculator (2026)',
      category: 'E-Commerce',
      description: 'Calculate standard 2.99% + 49¢, micropayment rates, and break-even invoice totals.',
      keywords: ['paypal fee', 'paypal calculator', 'paypal merchant', 'invoice fee'],
      component: PayPalFeeCalculator
    },
    {
      id: 'stripe-fee',
      name: 'Stripe Fee & Break-even Solver',
      category: 'E-Commerce',
      description: 'Calculate 2.9% + 30¢ domestic/international Stripe fees and reverse target price.',
      keywords: ['stripe payout', 'stripe pricing', 'break even calculator', 'saas fee'],
      component: StripeFeeCalculator
    },
    {
      id: 'gst-calculator',
      name: 'GST Tax Inclusive & Exclusive Calculator',
      category: 'E-Commerce',
      description: 'Instant CGST / SGST split breakdown with inclusive and exclusive modes.',
      keywords: ['gst exclusive', 'gst inclusive', 'cgst sgst india', 'tax calculator'],
      component: GstCalculator
    },
    {
      id: 'invoice-generator',
      name: 'Freelance Invoice Generator & PDF',
      category: 'Freelance',
      description: 'Create professional invoices in 30 seconds with instant PDF print/export.',
      keywords: ['free invoice maker', 'freelance receipt', 'pdf invoice without signup'],
      component: InvoiceGenerator
    },
    {
      id: 'pdf-markdown',
      name: 'Markdown to PDF Converter & Formatter',
      category: 'Freelance',
      description: 'Type or paste markdown notes, proposals, or readmes and export a clean PDF instantly.',
      keywords: ['markdown to pdf', 'markdown exporter', 'notion pdf converter', 'md formatter'],
      component: PdfMarkdownConverter
    },
    {
      id: 'youtube-rpm',
      name: 'YouTube AdSense RPM & Revenue Estimator',
      category: 'Marketing',
      description: 'Estimate daily, monthly, and annual YouTube AdSense earnings across 2026 niches.',
      keywords: ['youtube rpm', 'adsense calculator', 'youtube income', 'creator cpm'],
      component: YouTubeRpmCalculator
    },
    {
      id: 'utm-builder',
      name: 'UTM Campaign URL Builder & Tag Generator',
      category: 'Marketing',
      description: 'Build valid campaign tracking URLs for GA4 with one-click copy and presets.',
      keywords: ['utm source', 'utm medium', 'google analytics campaign link', 'url builder'],
      component: UtmBuilder
    },
    {
      id: 'amazon-fba',
      name: 'Amazon FBA Referral & Profit Calculator',
      category: 'E-Commerce',
      description: 'Calculate FBA fulfillment tiers, category referral cuts (8%-17%), and exact net profit.',
      keywords: ['amazon fba', 'amazon referral fee', 'fba calculator', 'amazon seller profit'],
      component: AmazonFbaCalculator
    },
    {
      id: 'tiktok-shop',
      name: 'TikTok Shop Seller & Creator Commission Solver',
      category: 'E-Commerce',
      description: 'Calculate 6% TikTok Shop commission, affiliate creator cuts, and seller net margin.',
      keywords: ['tiktok shop fee', 'tiktok affiliate calculator', 'tiktok seller margin'],
      component: TikTokShopCalculator
    },
    {
      id: 'shopify-fee',
      name: 'Shopify Plan & Transaction Fee Estimator',
      category: 'E-Commerce',
      description: 'Compare Shopify Basic, Standard, and Advanced monthly CC rates and external gateway penalties.',
      keywords: ['shopify transaction fee', 'shopify basic plan', 'shopify pricing calculator'],
      component: ShopifyFeeCalculator
    },
    {
      id: 'roas-calculator',
      name: 'ROAS & Ad Spend Break-Even Calculator',
      category: 'Marketing',
      description: 'Calculate exact Break-Even ROAS, Target CPA, and paid ad profitability from unit margins.',
      keywords: ['roas calculator', 'break even roas', 'meta ad roas', 'cpa calculator'],
      component: RoasCalculator
    },
    {
      id: 'creator-platform',
      name: 'Patreon & Creator Platform Fee Solver',
      category: 'Freelance',
      description: 'Compare Patreon Pro (8%), BuyMeACoffee (5%), and Ko-fi (0%) platform cuts and take-home pay.',
      keywords: ['patreon fee calculator', 'buymeacoffee fee', 'ko-fi fee', 'creator earnings'],
      component: CreatorPlatformFeeCalculator
    },
    {
      id: 'saas-churn-ltv',
      name: 'SaaS MRR Churn & Lifetime Value (LTV:CAC)',
      category: 'Freelance',
      description: 'Calculate customer LTV, LTV:CAC ratio health, and CAC payback period months based on churn.',
      keywords: ['saas ltv cac', 'mrr churn calculator', 'saas payback period', 'ltv calculator'],
      component: SaasChurnLtvCalculator
    },
    {
      id: 'ai-token-cost',
      name: 'AI API Token & Inference Cost Calculator (2026)',
      category: 'AI & Dev',
      description: 'Compare GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek API token rates & monthly spend.',
      keywords: ['ai cost calculator', 'gpt4o token pricing', 'claude 3.5 pricing', 'llm api cost', 'token calculator'],
      component: AiTokenCostCalculator
    }
  ];

  const [activeToolId, setActiveToolId] = useState('etsy-fee');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // localStorage for Starred & Recent
  const [starredIds, setStarredIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tw_starred') || '[]');
    } catch {
      return [];
    }
  });

  const [recentIds, setRecentIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tw_recent') || '["etsy-fee", "paypal-fee", "invoice-generator"]');
    } catch {
      return ['etsy-fee', 'paypal-fee', 'invoice-generator'];
    }
  });

  const handleSelectTool = (id) => {
    setActiveToolId(id);
    setRecentIds((prev) => {
      const updated = [id, ...prev.filter(i => i !== id)].slice(0, 8);
      try {
        localStorage.setItem('tw_recent', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleToggleStar = (id) => {
    setStarredIds((prev) => {
      const isStarred = prev.includes(id);
      const updated = isStarred ? prev.filter(i => i !== id) : [...prev, id];
      try {
        localStorage.setItem('tw_starred', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeTool = tools.find(t => t.id === activeToolId) || tools[0];
  const ActiveComponent = activeTool.component;
  const isStarred = starredIds.includes(activeTool.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#08090d] text-[#f3f4f6]">
      {/* Top Navbar */}
      <Navbar 
        onOpenSearch={() => setIsSearchOpen(true)}
        starredCount={starredIds.length}
        currentCategory={selectedCategory}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar 
          tools={tools}
          activeToolId={activeToolId}
          onSelectTool={handleSelectTool}
          starredIds={starredIds}
          onToggleStar={handleToggleStar}
          recentIds={recentIds}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat !== 'All') {
              const firstInCat = tools.find(t => t.category === cat);
              if (firstInCat) handleSelectTool(firstInCat.id);
            }
          }}
        />

        {/* Center Content Area */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Top Bar for Tool Actions */}
            <div className="flex items-center justify-between no-print">
              <div className="flex items-center gap-2 text-xs text-[#9ca3af]">
                <span>Workspace</span>
                <span>/</span>
                <span className="text-white font-medium">{activeTool.category}</span>
                <span>/</span>
                <span className="text-[#ff8c3a] font-mono">{activeTool.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStar(activeTool.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isStarred
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-white/5 text-[#9ca3af] border-white/10 hover:text-white'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400' : ''}`} />
                  <span>{isStarred ? 'Starred' : 'Star this utility'}</span>
                </button>
              </div>
            </div>

            {/* Render Active Tool */}
            <div className="animate-fade-in">
              <ActiveComponent />
            </div>

            {/* Bottom Brand Guarantee Footer (No Print) */}
            <footer className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b7280] no-print gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#ff6b00]" />
                <span>Twignberries — Zero signups, 100% client-side privacy.</span>
              </div>
              <div className="flex items-center gap-6">
                <span>Built for 2026 E-Commerce & Creators</span>
                <span className="font-mono text-[#ff8c3a]">v2.1.0 (15 Utilities)</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Cmd + K Universal Search Modal */}
      <CommandKModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tools={tools}
        onSelectTool={handleSelectTool}
        starredIds={starredIds}
      />
    </div>
  );
}
