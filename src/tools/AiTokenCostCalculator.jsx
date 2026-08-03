import React, { useState } from 'react';
import { Cpu, TrendingUp, DollarSign, PieChart, Sparkles, AlertCircle, Zap, BarChart2, Layers } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

export default function AiTokenCostCalculator() {
  const [modelKey, setModelKey] = useState('gpt4o');
  const [inputTokens, setInputTokens] = useState(1500); // 1.5k avg input
  const [outputTokens, setOutputTokens] = useState(500); // 500 avg output
  const [dailyRequests, setDailyRequests] = useState(5000); // 5k daily requests

  // 2026 Model Pricing Specs (Price per 1 Million Tokens in USD)
  const models = {
    gpt4o: { name: 'OpenAI GPT-4o', provider: 'OpenAI', inPrice: 2.50, outPrice: 10.00, color: 'bg-emerald-500', badge: 'Flagship Multimodal' },
    gpt4o_mini: { name: 'OpenAI GPT-4o mini', provider: 'OpenAI', inPrice: 0.15, outPrice: 0.60, color: 'bg-emerald-400', badge: 'Ultra-Fast Budget' },
    claude_35_sonnet: { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', inPrice: 3.00, outPrice: 15.00, color: 'bg-amber-500', badge: 'Top Coding / Reasoning' },
    claude_35_haiku: { name: 'Claude 3.5 Haiku', provider: 'Anthropic', inPrice: 0.80, outPrice: 4.00, color: 'bg-amber-400', badge: 'Fast Agent Support' },
    gemini_15_pro: { name: 'Gemini 1.5 Pro (2M Context)', provider: 'Google', inPrice: 1.25, outPrice: 5.00, color: 'bg-blue-500', badge: 'Long-Context Power' },
    gemini_15_flash: { name: 'Gemini 1.5 Flash', provider: 'Google', inPrice: 0.075, outPrice: 0.30, color: 'bg-blue-400', badge: 'Cheapest Big Context' },
    deepseek_v3: { name: 'DeepSeek V3 / R1 API', provider: 'DeepSeek', inPrice: 0.14, outPrice: 0.28, color: 'bg-purple-500', badge: 'Open-Weight Economy' },
  };

  const selected = models[modelKey];

  // Math per request
  const inputCostPerReq = (inputTokens / 1_000_000) * selected.inPrice;
  const outputCostPerReq = (outputTokens / 1_000_000) * selected.outPrice;
  const costPerReq = inputCostPerReq + outputCostPerReq;
  const costPer1kReq = costPerReq * 1000;

  // Forecasts
  const dailyCost = costPerReq * dailyRequests;
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;

  // Comparison math across all models for selected volume
  const comparisonList = Object.entries(models).map(([key, m]) => {
    const daily = ((inputTokens / 1_000_000) * m.inPrice + (outputTokens / 1_000_000) * m.outPrice) * dailyRequests;
    return {
      key,
      ...m,
      daily,
      monthly: daily * 30,
    };
  });

  const maxMonthly = Math.max(...comparisonList.map(c => c.monthly), 1);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="badge badge-brand">
            <Sparkles className="w-3.5 h-3.5" /> AI & Developer 2026
          </span>
          <span className="text-xs text-gray-400 font-medium">GPT-4o vs Claude 3.5 vs Gemini 1.5 vs DeepSeek</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-white tracking-tight">
          AI API Token & Inference Cost Calculator
        </h1>
        <p className="text-sm text-gray-400">
          Calculate exact LLM API costs per 1K requests, daily spend, and monthly runway across top 2026 models.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Inputs */}
        <div className="lg:col-span-6 glass-card space-y-6">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#FF5C00]" /> 1. Select LLM Model (2026 API Rates)
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Foundation Model Tier
              </label>
              <select
                value={modelKey}
                onChange={(e) => setModelKey(e.target.value)}
                className="glass-input font-medium"
              >
                <option value="gpt4o">OpenAI GPT-4o ($2.50 / $10.00 per 1M)</option>
                <option value="gpt4o_mini">OpenAI GPT-4o mini ($0.15 / $0.60 per 1M)</option>
                <option value="claude_35_sonnet">Claude 3.5 Sonnet ($3.00 / $15.00 per 1M)</option>
                <option value="claude_35_haiku">Claude 3.5 Haiku ($0.80 / $4.00 per 1M)</option>
                <option value="gemini_15_pro">Gemini 1.5 Pro ($1.25 / $5.00 per 1M)</option>
                <option value="gemini_15_flash">Gemini 1.5 Flash ($0.075 / $0.30 per 1M)</option>
                <option value="deepseek_v3">DeepSeek V3 / R1 ($0.14 / $0.28 per 1M)</option>
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">{selected.name}</span>
                <span className="text-[11px] text-gray-400">{selected.badge}</span>
              </div>
              <div className="text-right font-mono text-xs">
                <div className="text-emerald-400">In: ${selected.inPrice}/M</div>
                <div className="text-orange-400">Out: ${selected.outPrice}/M</div>
              </div>
            </div>
          </div>

          <h2 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 pt-2">
            <Zap className="w-4 h-4 text-[#FF5C00]" /> 2. Token Volume & Request Scale
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Avg. Input Tokens per Request (Prompt + Context)
              </label>
              <input
                type="number"
                step="100"
                value={inputTokens}
                onChange={(e) => setInputTokens(parseFloat(e.target.value) || 0)}
                className="glass-input font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Avg. Output Tokens per Request (Completion)
              </label>
              <input
                type="number"
                step="50"
                value={outputTokens}
                onChange={(e) => setOutputTokens(parseFloat(e.target.value) || 0)}
                className="glass-input font-mono font-medium"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-gray-400">
                  Daily API Request Volume
                </label>
                <span className="text-xs font-mono font-bold text-[#FF5C00]">
                  {dailyRequests.toLocaleString()} requests/day
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={dailyRequests}
                onChange={(e) => setDailyRequests(parseFloat(e.target.value))}
                className="w-full accent-[#FF5C00] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>500 (Side Project)</span>
                <span>5k (Startup)</span>
                <span>50k (Production Scale)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results & Monthly Comparison Bar */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card bg-[#12141F]/90 border-[#FF5C00]/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Estimated Monthly API Cost
              </span>
              <div className="flex items-center gap-2">
                <CopySummaryButton 
                  title={`AI Token Cost: ${selected.name}`}
                  lines={[
                    { label: 'Model Tier', value: selected.name },
                    { label: 'Input Tokens / Req', value: `${inputTokens} tokens` },
                    { label: 'Output Tokens / Req', value: `${outputTokens} tokens` },
                    { label: 'Daily Volume', value: `${dailyRequests.toLocaleString()} req/day` },
                    { label: 'Cost per 1K Requests', value: `$${costPer1kReq.toFixed(4)}` },
                    { label: 'Daily Spend', value: `$${dailyCost.toFixed(2)}/day` },
                    { label: 'Monthly Spend', value: `$${monthlyCost.toFixed(2)}/mo` }
                  ]}
                />
                <span className="badge badge-brand">
                  {selected.provider}
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold font-heading text-white tracking-tight">
                ${monthlyCost.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                / month
              </span>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Cost per 1,000 Requests</span>
                <span className="text-lg font-bold font-mono text-white">
                  ${costPer1kReq.toFixed(4)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-xs text-gray-400 block font-medium">Daily Spend (30 days)</span>
                <span className="text-lg font-bold font-mono text-orange-400">
                  ${dailyCost.toFixed(2)} / day
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center text-xs">
              <span className="text-gray-400">Projected Annual API Runway:</span>
              <span className="font-mono font-bold text-white">${annualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* Model Price Comparison Graph */}
          <div className="glass-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-[#FF5C00]" /> Monthly Cost Comparison (All Models)
              </h3>
              <span className="text-[11px] text-gray-400">at {dailyRequests.toLocaleString()} req/day</span>
            </div>

            <div className="space-y-3">
              {comparisonList.map((item) => {
                const widthPercent = Math.max(5, Math.min(100, (item.monthly / maxMonthly) * 100));
                const isCurrent = item.key === modelKey;
                return (
                  <div key={item.key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={`font-medium ${isCurrent ? 'text-orange-400 font-bold' : 'text-gray-300'}`}>
                        {item.name} {isCurrent && '✓'}
                      </span>
                      <span className="font-mono text-white">
                        ${item.monthly.toFixed(2)}/mo
                      </span>
                    </div>
                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${widthPercent}%` }}
                        className={`h-full rounded-full transition-all duration-300 ${isCurrent ? 'bg-orange-500' : 'bg-white/20'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Note */}
          <div className="glass-card p-4 flex items-start gap-3 bg-white/[0.02] border-white/5">
            <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-white">Developer Cost Insight:</strong> Switching from <strong>GPT-4o</strong> to <strong>GPT-4o mini</strong> or <strong>Gemini 1.5 Flash</strong> reduces your monthly API spend by up to <strong>96%</strong> with minimal quality degradation on classification and summarization tasks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
