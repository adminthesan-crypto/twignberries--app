import React, { useState } from 'react';
import { Cpu, Zap, DollarSign, BarChart2, Layers, AlertCircle, TrendingUp, ShieldCheck } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
  color: 'var(--text-4)', display: 'flex', alignItems: 'center', gap: 7,
  marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)',
};

const ROW = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 };

export default function AiTokenCostCalculator() {
  const [modelKey, setModelKey] = useState('gpt4o');
  const [inputTokens, setInputTokens] = useState(1500);
  const [outputTokens, setOutputTokens] = useState(500);
  const [dailyRequests, setDailyRequests] = useState(5000);

  const models = {
    gpt4o: { name: 'OpenAI GPT-4o', provider: 'OpenAI', inPrice: 2.50, outPrice: 10.00, badge: 'Flagship Multimodal' },
    gpt4o_mini: { name: 'OpenAI GPT-4o mini', provider: 'OpenAI', inPrice: 0.15, outPrice: 0.60, badge: 'Ultra-Fast Budget' },
    claude_35_sonnet: { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', inPrice: 3.00, outPrice: 15.00, badge: 'Top Coding / Reasoning' },
    claude_35_haiku: { name: 'Claude 3.5 Haiku', provider: 'Anthropic', inPrice: 0.80, outPrice: 4.00, badge: 'Fast Agent Support' },
    gemini_15_pro: { name: 'Gemini 1.5 Pro (2M Context)', provider: 'Google', inPrice: 1.25, outPrice: 5.00, badge: 'Long-Context Power' },
    gemini_15_flash: { name: 'Gemini 1.5 Flash', provider: 'Google', inPrice: 0.075, outPrice: 0.30, badge: 'Cheapest Big Context' },
    deepseek_v3: { name: 'DeepSeek V3 / R1 API', provider: 'DeepSeek', inPrice: 0.14, outPrice: 0.28, badge: 'Open-Weight Economy' },
  };

  const selected = models[modelKey];

  const inputCostPerReq = (inputTokens / 1_000_000) * selected.inPrice;
  const outputCostPerReq = (outputTokens / 1_000_000) * selected.outPrice;
  const costPerReq = inputCostPerReq + outputCostPerReq;
  const costPer1kReq = costPerReq * 1000;

  const dailyCost = costPerReq * dailyRequests;
  const monthlyCost = dailyCost * 30;
  const annualCost = dailyCost * 365;

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Tool header */}
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            AI API Token &amp; Inference Cost Calculator
          </h1>
          <span className="badge badge-brand">2026 API RATES</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Compare GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek API costs before you scale production traffic.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* ── Left Column (Inputs) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Card 1: Select LLM Model */}
          <div className="form-card">
            <div style={SL}>
              <Cpu size={13} color="var(--brand)" /> 1. Select Foundation Model Tier
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Foundation model (2026 per-million token pricing)</label>
              <select
                value={modelKey}
                onChange={(e) => setModelKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-md)',
                  color: 'var(--text-1)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
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

            <div style={{
              padding: 14,
              borderRadius: 10,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)' }}>
                  {selected.name}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 2 }}>
                  {selected.provider} • {selected.badge}
                </div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                <div style={{ color: '#4ade80' }}>In: ${selected.inPrice.toFixed(3)}/M</div>
                <div style={{ color: 'var(--brand)' }}>Out: ${selected.outPrice.toFixed(3)}/M</div>
              </div>
            </div>
          </div>

          {/* Card 2: Token Volume & Request Scale */}
          <div className="form-card">
            <div style={SL}>
              <Zap size={13} color="var(--brand)" /> 2. Token Volume &amp; Request Scale
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label>Avg. input tokens / request</label>
                <input
                  type="number"
                  step="100"
                  value={inputTokens}
                  onChange={(e) => setInputTokens(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  Prompt + retrieved context + system instructions.
                </div>
              </div>

              <div>
                <label>Avg. output tokens / request</label>
                <input
                  type="number"
                  step="50"
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(parseFloat(e.target.value) || 0)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}
                />
                <div style={{ fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                  Model generation and structured completion tokens.
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{ margin: 0 }}>Daily API request volume</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--brand)' }}>
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
                style={{ width: '100%', accentColor: 'var(--brand)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-4)', marginTop: 4 }}>
                <span>500 (Side Project)</span>
                <span>5k (Startup)</span>
                <span>50k (Production Scale)</span>
              </div>
            </div>
          </div>

          {/* Card 3: Monthly Cost Comparison Across Models */}
          <div className="form-card">
            <div style={SL}>
              <BarChart2 size={13} color="var(--brand)" /> 3. Monthly Cost Comparison Across All Models
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginBottom: 14 }}>
              Monthly API expenditure forecast at <strong style={{ color: 'var(--text-2)' }}>{dailyRequests.toLocaleString()} req/day</strong> ({inputTokens} in / {outputTokens} out):
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {comparisonList.map((item) => {
                const widthPercent = Math.max(5, Math.min(100, (item.monthly / maxMonthly) * 100));
                const isCurrent = item.key === modelKey;
                return (
                  <div key={item.key} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                      <span style={{ fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--brand)' : 'var(--text-2)' }}>
                        {item.name} {isCurrent && '✓'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#4ade80' : 'var(--text-1)' }}>
                        ${item.monthly.toFixed(2)}/mo
                      </span>
                    </div>
                    <div style={{ height: 6, width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${widthPercent}%`,
                          height: '100%',
                          background: isCurrent ? 'var(--brand)' : 'rgba(255,255,255,0.25)',
                          borderRadius: 999,
                          transition: 'width 0.25s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ── Right Column (Results - Sticky) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }}>
          
          {/* Primary Hero Banner */}
          <div style={{
            padding: 24, borderRadius: 16, textAlign: 'center',
            background: 'linear-gradient(135deg,rgba(255,92,0,0.08),rgba(255,92,0,0.03))',
            border: '1px solid rgba(255,92,0,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)', marginBottom: 8 }}>
              Estimated monthly API spend
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-1)' }}>
              ${monthlyCost.toFixed(2)}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-4)' }}>
              Daily spend: <strong style={{ color: 'var(--brand)', fontFamily: 'var(--font-mono)' }}>${dailyCost.toFixed(2)}/day</strong> @ {dailyRequests.toLocaleString()} req/day
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
              marginTop: 18,
              paddingTop: 16,
              borderTop: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: 600 }}>Per 1K Requests</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#4ade80', marginTop: 3 }}>
                  ${costPer1kReq.toFixed(4)}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--text-4)', textTransform: 'uppercase', fontWeight: 600 }}>Annual Runway</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: 'var(--text-1)', marginTop: 3 }}>
                  ${annualCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className="form-card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-4)' }}>
                Cost breakdown
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <CopySummaryButton
                  title={`AI Token Cost — ${selected.name}`}
                  lines={[
                    { label: 'Foundation Model', value: selected.name },
                    { label: 'Input Tokens per Req', value: `${inputTokens} tokens` },
                    { label: 'Output Tokens per Req', value: `${outputTokens} tokens` },
                    { label: 'Daily Request Volume', value: `${dailyRequests.toLocaleString()} req/day` },
                    { label: 'Cost per 1,000 Requests', value: `$${costPer1kReq.toFixed(4)}` },
                    { label: 'Daily Spend', value: `$${dailyCost.toFixed(2)}/day` },
                    { label: 'Projected Monthly Spend', value: `$${monthlyCost.toFixed(2)}/mo` },
                    { label: 'Projected Annual Spend', value: `$${annualCost.toFixed(2)}/yr` },
                  ]}
                />
                <NativeShareButton text={`AI Token Cost — ${selected.name}\nDaily Spend: $${dailyCost.toFixed(2)}/day\nProjected Monthly Spend: $${monthlyCost.toFixed(2)}/mo`} />
              </div>
            </div>

            {[
              { label: 'Foundation model', value: selected.name, color: 'var(--text-1)', bold: true },
              { label: 'Input token rate (per 1M)', value: `$${selected.inPrice.toFixed(3)}`, color: 'var(--text-4)', mono: true },
              { label: 'Output token rate (per 1M)', value: `$${selected.outPrice.toFixed(3)}`, color: 'var(--text-4)', mono: true },
              { divider: true },
              { label: 'Cost per 1,000 API requests', value: `$${costPer1kReq.toFixed(4)}`, color: 'var(--text-2)', mono: true },
              { label: 'Daily spend (30-day avg)', value: `$${dailyCost.toFixed(2)}/day`, color: 'var(--text-2)', mono: true },
              { divider: true },
              { label: 'Projected monthly spend', value: `$${monthlyCost.toFixed(2)}`, color: 'var(--brand)', mono: true, bold: true },
              { label: 'Projected annual spend', value: `$${annualCost.toFixed(2)}`, color: '#4ade80', mono: true, bold: true },
            ].map((r, i) =>
              r.divider ? <div key={i} style={{ height: 1, background: 'var(--border)', margin: '10px 0' }} /> : (
                <div key={i} style={ROW}>
                  <span style={{ fontSize: 12, color: 'var(--text-4)' }}>{r.label}</span>
                  <span style={{ fontFamily: r.mono ? 'var(--font-mono)' : 'inherit', fontSize: 13, fontWeight: r.bold ? 700 : 500, color: r.color }}>
                    {r.value}
                  </span>
                </div>
              )
            )}
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            <strong style={{ color: 'var(--text-2)' }}>💡 Pro tip:</strong> Switching from <strong style={{ color: 'var(--text-1)' }}>GPT-4o</strong> to <strong style={{ color: 'var(--text-1)' }}>GPT-4o mini</strong> or <strong style={{ color: 'var(--text-1)' }}>Gemini 1.5 Flash</strong> reduces your monthly API spend by up to <strong style={{ color: '#4ade80' }}>96%</strong> with minimal quality degradation on classification, routing, and summarization tasks.
          </div>

        </div>
      </div>
    </div>
  );
}
