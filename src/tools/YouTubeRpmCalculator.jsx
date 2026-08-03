import React, { useState } from 'react';
import { PlaySquare, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function YouTubeRpmCalculator() {
  const [views, setViews] = useState(150000); // monthly views
  const [rpm, setRpm] = useState(12); // $12 RPM
  const [niche, setNiche] = useState('tech'); // tech, finance, gaming, vlog

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            YouTube AdSense RPM &amp; Revenue Estimator
          </h1>
          <span className="badge badge-brand">2026 NICHE RATES</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Estimate daily, monthly, and annual YouTube AdSense earnings across 2026 creator niches.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Inputs */}
        <div className="lg:col-span-6 glass-card space-y-5">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <PlaySquare className="w-4 h-4 text-red-500" /> 1. Monthly Views & Channel Niche
          </h2>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-[#9ca3af]">
                Estimated Monthly Video Views
              </label>
              <span className="text-sm font-mono font-bold text-[#ff8c3a]">
                {Number(views).toLocaleString()} views/mo
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
              <span>1K</span>
              <span>1M</span>
              <span>5M+</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#9ca3af] mb-2">
              Select Your Content Category (Benchmarks)
            </label>
            <div className="flex flex-col gap-1.5">
              {nicheRpmPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleNicheSelect(preset)}
                  className={`flex items-center justify-between p-3 rounded-xl text-xs font-medium border transition-all ${
                    niche === preset.id
                      ? 'bg-[#ff6b00]/20 border-[#ff6b00] text-white font-semibold'
                      : 'bg-white/5 border-white/10 text-[#9ca3af] hover:bg-white/10'
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
              Custom RPM (Revenue Per 1,000 Views in USD)
            </label>
            <input
              type="number"
              step="0.5"
              value={rpm}
              onChange={(e) => setRpm(e.target.value)}
              className="glass-input text-lg font-mono"
            />
          </div>
        </div>

        {/* Right: Revenue Forecast Cards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-gradient-to-br from-[#131724] to-[#0e111a] border-white/15 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">
                Estimated AdSense Revenue Projection
              </h3>
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

            {/* Big Monthly Revenue Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 border border-emerald-500/40">
              <span className="text-xs font-medium text-emerald-400 block uppercase">
                ESTIMATED MONTHLY EARNINGS
              </span>
              <div className="text-4xl font-bold font-mono text-white mt-1">
                ${monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-[#9ca3af] block mt-1">
                Based on {Number(views).toLocaleString()} views @ ${Number(rpm).toFixed(2)} RPM
              </span>
            </div>

            {/* Daily and Yearly cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono">
                <span className="text-[10px] text-[#6b7280] block uppercase font-sans font-semibold">
                  Daily Earnings
                </span>
                <div className="text-xl font-bold text-white mt-1">
                  ${dailyRevenue.toFixed(2)}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono">
                <span className="text-[10px] text-[#6b7280] block uppercase font-sans font-semibold">
                  Annual Run-Rate
                </span>
                <div className="text-xl font-bold text-[#ff8c3a] mt-1">
                  ${yearlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            {/* AdSense Platform Split */}
            <div className="p-4 rounded-xl bg-[#0b0d14] border border-white/10 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Gross Advertiser Spend (100%):</span>
                <span className="text-white font-semibold">${grossAdvertiserSpend.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>YouTube Platform Share (45%):</span>
                <span className="text-red-400">-${youtubeCut.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex justify-between text-xs font-bold text-emerald-400">
                <span>Your Creator Payout (55%):</span>
                <span>${monthlyRevenue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[#9ca3af] flex items-start gap-2.5">
            <TrendingUp className="w-4 h-4 text-[#ff6b00] shrink-0 mt-0.5" />
            <span>
              <strong>CPM vs. RPM:</strong> CPM is what advertisers pay per 1,000 ad impressions. <strong>RPM</strong> is what hits your bank account after YouTube's 45% cut and unmonetized views are accounted for.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
