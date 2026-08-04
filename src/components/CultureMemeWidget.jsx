import React, { useState } from 'react';
import { Sparkles, RefreshCw, Copy, Check, Heart, MessageSquare, Share2 } from 'lucide-react';

const MEMES = [
  {
    id: '1',
    category: 'PDF & Cloud Privacy',
    tag: 'r/webdev • Top Roast',
    headline: 'Don\'t upload confidential contracts to cloud converters. Do Pahruli.',
    content: '"Me uploading an NDA contract to a free cloud PDF converter and receiving a targeted sales email 5 minutes later 🤡"\n\n👉 All 100 Pahruli utilities execute 100% inside your browser RAM. Zero server uploads.',
    upvotes: '1.4k',
    comments: '248'
  },
  {
    id: '2',
    category: 'E-Commerce & Fees',
    tag: 'r/Entrepreneur • Reality Check',
    headline: 'Where did the margin go?!',
    content: '"Etsy 6.5% transaction cut + Offsite Ads 15% + PayPal 2.99% + Shipping = My net profit evaporating into thin air 💸"\n\n👉 Stop guessing break-even points. Use our offline Stripe, Etsy, & Amazon FBA margin solvers.',
    upvotes: '2.8k',
    comments: '412'
  },
  {
    id: '3',
    category: 'Frontend & SVG',
    tag: 'r/ProgrammerHumor • Classic',
    headline: 'Client: "Can you send that logo as a high-res vector?"',
    content: '*Me renaming logo.png to logo.svg* 📉 💀\n\n👉 When you actually need clean vector rasterization, use Pahruli SVG to 8x Retina PNG/JPG converter offline.',
    upvotes: '3.9k',
    comments: '589'
  },
  {
    id: '4',
    category: 'Regular Expressions',
    tag: 'r/javascript • Shower Thought',
    headline: 'Why is it called "Regular Expression"...',
    content: '...when there is literally nothing regular about `^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\\.([a-zA-Z]{2,5})$`?! 🧠\n\n👉 Debug your PCRE capture groups locally with our Regex Tester & Plain-English Explainer.',
    upvotes: '1.9k',
    comments: '173'
  },
  {
    id: '5',
    category: 'SaaS & Marketing',
    tag: 'r/SaaS • Launch Day',
    headline: 'The launch tweet tragedy',
    content: '"When you test your OpenGraph social card AFTER tweeting the ProductHunt launch link and the hero image is broken 😭"\n\n👉 Simulate Google Search, Twitter/X, and LinkedIn link previews before publishing.',
    upvotes: '920',
    comments: '88'
  },
  {
    id: '6',
    category: 'Indie Hackers & Pricing',
    tag: 'r/indiehackers • Philosophy',
    headline: 'SaaS subscription bloat is real',
    content: '"Me explaining to my team why we don\'t need a $49/month subscription just to merge two PDF files or format JSON 🛑"\n\n👉 100 Enterprise-Grade Utilities. Free forever. Zero signups.',
    upvotes: '4.1k',
    comments: '604'
  }
];

export default function CultureMemeWidget() {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = MEMES[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MEMES.length);
  };

  const handleCopy = () => {
    const shareText = `${current.headline}\n\n${current.content}\n\n— Try free offline at https://twignberries.com`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="w-full rounded-2xl bg-white border border-[#e6e9ef] overflow-hidden"
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
        borderLeft: '4px solid #6161ff'
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#f7f9fc] border-b border-[#e6e9ef]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#6161ff] animate-pulse" />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: '#1f2532', letterSpacing: '-0.02em' }}>
            Dev & Founder Culture Snack • Daily Meme
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            style={{
              fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 99,
              background: '#eceeff', color: '#6161ff'
            }}
          >
            {current.tag}
          </span>
        </div>
      </div>

      {/* Meme Body */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: '#868894', letterSpacing: '0.06em' }}>
            {current.category}
          </span>
          <div className="flex items-center gap-3 text-xs text-[#676879] font-semibold">
            <span className="flex items-center gap-1">
              <Heart size={13} color="#e2445c" fill="#e2445c" /> {current.upvotes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={13} /> {current.comments}
            </span>
          </div>
        </div>

        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#1f2532', marginBottom: 8, lineHeight: 1.3 }}>
          {current.headline}
        </h4>

        <p
          style={{
            fontSize: 13.5, color: '#4d5156', lineHeight: 1.6,
            padding: '12px 14px', borderRadius: 12,
            background: '#f6f8fa', border: '1px solid #e6e9ef',
            fontFamily: 'var(--font)', whiteSpace: 'pre-line',
            marginBottom: 16
          }}
        >
          {current.content}
        </p>

        {/* Interactive Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="btn-secondary"
            style={{
              flex: 1, padding: '9px 14px', fontSize: 12.5,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              border: copied ? '1px solid #00c875' : '1px solid #d0d4e4',
              color: copied ? '#00c875' : '#1f2532'
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied Roast!' : 'Copy to Post on Reddit / X'}</span>
          </button>

          <button
            onClick={handleNext}
            className="btn-secondary"
            style={{
              padding: '9px 14px', fontSize: 12.5,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#f3f5ff', color: '#6161ff', border: '1px solid #d0d4e4'
            }}
            title="Next Roast / Meme"
          >
            <RefreshCw size={14} />
            <span>Next Meme</span>
          </button>
        </div>
      </div>

      {/* Footer strip: Support / Buy Me a Coffee prompt */}
      <div className="px-5 py-2.5 bg-[#fffdf5] border-t border-[#ffeeba] flex items-center justify-between text-xs">
        <span style={{ color: '#856404', fontWeight: 600 }}>
          💡 Like our 100 free offline utilities?
        </span>
        <a
          href="https://buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#856404', fontWeight: 700, textDecoration: 'underline',
            display: 'inline-flex', alignItems: 'center', gap: 4
          }}
        >
          <span>☕ Buy the creator a coffee →</span>
        </a>
      </div>
    </div>
  );
}
