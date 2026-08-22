import React, { useState } from 'react';
import AeoArticle from '../components/AeoArticle';
import { PlaySquare, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';
import NativeShareButton from '../components/NativeShareButton';

export default function YouTubeRpmCalculator() {
  const [views, setViews] = useState(150000); // monthly views
  const [rpm, setRpm] = useState(12); // $12 RPM
  const [niche, setNiche] = useState('tech'); // tech, finance, gaming, vlog
  const [copied, setCopied] = useState(false);

  const nicheRpmPresets = [
    { id: 'finance', label: 'Finance, Investing & Crypto', rpm: 18.50 },
    { id: 'tech', label: 'Software, Tech & Business', rpm: 12.00 },
    { id: 'education', label: 'Tutorials & How-to Guides', rpm: 7.50 },
    { id: 'lifestyle', label: 'Lifestyle, Vlogs & Entertainment', rpm: 4.20 },
    { id: 'gaming', label: 'Gaming & Comedy', rpm: 2.80 },
  ];

  const handleNicheSelect = (preset) => {
    setNiche(preset.id);
    setRpm(preset.rpm);
  };

  // Calculations
  const monthlyRevenue = (Number(views) / 1000) * Number(rpm);
  const dailyRevenue = monthlyRevenue / 30;
  const yearlyRevenue = monthlyRevenue * 12;

  // YouTube takes 45% of gross advertiser spend, creator gets 55%
  // So Gross CPM = RPM / 0.55
  const grossAdvertiserSpend = monthlyRevenue / 0.55;
  const youtubeCut = grossAdvertiserSpend - monthlyRevenue;

  const handleCopy = () => {
    const text = `YouTube AdSense Estimate: $${monthlyRevenue.toFixed(2)}/mo ($${yearlyRevenue.toFixed(2)}/yr) | ${Number(views).toLocaleString()} views @ $${Number(rpm).toFixed(2)} RPM`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionLabelStyle = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.07em',
    textTransform: 'uppercase',
    color: 'var(--text-4)',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid var(--border)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            YouTube AdSense Revenue &amp; RPM Estimator
          </h1>
          <span className="badge badge-brand">2026 NICHE RATES</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Estimate real creator earnings across niches with realistic RPM benchmarks.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        {/* Left Column (Inputs / Editor) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Form Card 1: Monthly Views */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <PlaySquare size={14} color="var(--brand)" />
              1. Monthly Video Traffic
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-[#9ca3af]">
                  Estimated Monthly Video Views
                </label>
                <span className="text-base font-mono font-bold text-[#ff8c3a]">
                  {Number(views).toLocaleString()} views / mo
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000000"
                step="5000"
                value={views}
                onChange={(e) => setViews(e.target.value)}
                className="w-full accent-[#ff6b00] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#6b7280] mt-1">
                <span>1K views</span>
                <span>1M views</span>
                <span>5M+ views</span>
              </div>
            </div>
          </div>

          {/* Form Card 2: Niche Presets & Custom RPM */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <TrendingUp size={14} color="var(--brand)" />
              2. Niche Benchmarks &amp; RPM Rate
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-2">
                  Select Content Niche (Average 2026 RPM)
                </label>
                <div className="flex flex-col gap-3">
                  {nicheRpmPresets.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleNicheSelect(preset)}
                      className={`flex items-center justify-between p-6 rounded-xl text-xs font-medium border transition-all ${
                        niche === preset.id
                          ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-[#1f2532] font-semibold shadow-sm'
                          : 'bg-white border-[#e6e9ef] text-[#9ca3af] hover:bg-gray-100 hover:text-[#1f2532]'
                      }`}
                    >
                      <span>{preset.label}</span>
                      <span className="font-mono font-bold text-[#ff8c3a]">${preset.rpm.toFixed(2)} RPM</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#9ca3af] mb-1.5">
                  Custom RPM Rate (Revenue Per 1,000 Views in USD)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={rpm}
                  onChange={(e) => setRpm(e.target.value)}
                  className="glass-input text-lg font-mono w-full"
                  placeholder="12.00"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Results / Live Preview - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 20 }}>
          {/* Primary Hero Banner */}
          <div className="form-card" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(18, 22, 36, 0.9))', borderColor: 'rgba(255, 107, 0, 0.3)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8c3a] block mb-1">
              ESTIMATED MONTHLY EARNINGS
            </span>
            <div className="text-4xl font-mono font-bold text-[#1f2532] mb-2">
              ${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center justify-between text-xs text-[#9ca3af] font-mono">
              <span>{Number(views).toLocaleString()} Views</span>
              <span>${Number(rpm).toFixed(2)} RPM</span>
            </div>
          </div>

          {/* Breakdown / Action Card */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <PieChart size={14} color="var(--brand)" />
              Revenue Breakdown
            </div>

            <div className="space-y-6 font-mono text-sm mb-5">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Daily Average Earnings:</span>
                <span className="text-[#1f2532] font-semibold">${dailyRevenue.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-[#9ca3af]">
                <span>Annual Run-Rate:</span>
                <span className="text-[#ff8c3a] font-semibold">${yearlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
              </div>

              <div className="h-px bg-gray-100 my-2" />

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Gross Advertiser Spend (100%):</span>
                <span className="text-[#1f2532] font-semibold">${grossAdvertiserSpend.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>YouTube Platform Share (45%):</span>
                <span className="text-red-400">-${youtubeCut.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-base font-bold text-emerald-400 pt-2 border-t border-[#e6e9ef]">
                <span>Creator Payout (55%):</span>
                <span>${monthlyRevenue.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-secondary flex-1 justify-center text-xs"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied Revenue Summary' : 'Copy Estimate Summary'}</span>
                </button>
                <NativeShareButton 
                  text={`YouTube AdSense Estimate: $${monthlyRevenue.toFixed(2)}/mo ($${yearlyRevenue.toFixed(2)}/yr) | ${Number(views).toLocaleString()} views @ $${Number(rpm).toFixed(2)} RPM`} 
                />
              </div>

              <CopySummaryButton
                title="YouTube AdSense RPM Revenue Projection"
                lines={[
                  { label: 'Niche Selected', value: nicheRpmPresets.find(p => p.id === niche)?.label || 'Custom Niche' },
                  { label: 'Estimated RPM', value: `$${Number(rpm).toFixed(2)} / 1,000 views` },
                  { label: 'Monthly Views', value: `${Number(views).toLocaleString()} views` },
                  { label: 'Monthly AdSense Earnings', value: `$${monthlyRevenue.toFixed(2)}` },
                  { label: 'Annual Projected Revenue', value: `$${yearlyRevenue.toFixed(2)}` },
                  { label: 'Daily Average Earning', value: `$${dailyRevenue.toFixed(2)}` }
                ]}
              />
            </div>
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            💡 Pro tip: CPM is what advertisers pay per 1,000 ad impressions. RPM is what actually hits your bank account after YouTube&apos;s 45% cut and unmonetized views are accounted for.
          </div>
        </div>
      </div>

      <AeoArticle>
        <h2>YouTube RPM vs CPM Explained</h2>
        <p>If you are trying to estimate how much a YouTuber makes, you must understand the difference between CPM (Cost Per Mille) and RPM (Revenue Per Mille). Confusing the two is the most common reason creators drastically overestimate their potential AdSense revenue.</p>
        
        <h3>What is CPM (Cost Per Mille)?</h3>
        <p>CPM represents what <strong>advertisers pay</strong> to show 1,000 ads on your channel. It is a metric used by YouTube to measure advertiser demand for your specific niche and demographic. For example, a finance channel might have a $25 CPM, meaning an advertiser pays $25 for 1,000 ad views. However, this is gross revenue—you do not keep this entire amount.</p>

        <h3>What is RPM (Revenue Per Mille)?</h3>
        <p>RPM is the actual <strong>take-home pay</strong> you earn per 1,000 total video views. RPM is always lower than CPM because it accounts for several massive deductions:</p>
        <ul>
          <li><strong>YouTube's Cut:</strong> YouTube takes 45% of the gross ad revenue, leaving you with 55%.</li>
          <li><strong>Unmonetized Views:</strong> Not every view gets an ad. Viewers using ad-blockers, YouTube Premium subscribers, and skipped ad placements mean total video views vastly outnumber monetized playbacks.</li>
        </ul>
        <p>The mathematical formula for RPM is simple: <strong>RPM = (Total Estimated Earnings / Total Views) × 1,000</strong>.</p>
        
        <h3>How to Increase Your YouTube RPM</h3>
        <p>To maximize your RPM without relying on volatile advertiser budgets, focus on the length and niche of your content. Videos longer than 8 minutes allow for mid-roll ads, which can double or triple your RPM. Additionally, creating content targeting high-purchasing-power demographics (like SaaS tutorials, real estate, and B2B finance) naturally commands higher CPMs at the auction level, lifting your RPM proportionally.</p>
      </AeoArticle>
    </div>
  );
}
