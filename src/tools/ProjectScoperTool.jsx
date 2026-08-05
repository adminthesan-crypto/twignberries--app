import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, ShieldCheck, DollarSign, Clock, Download } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function ProjectScoperTool() {
  const [phases, setPhases] = useState([
    { name: 'Discovery & Requirements Specification', hours: 10, rate: 120 },
    { name: 'UI/UX Wireframes & Visual Prototyping', hours: 24, rate: 120 },
    { name: 'Full-Stack React & Node Implementation', hours: 60, rate: 150 },
    { name: 'QA Testing, Accessibility & Production Deploy', hours: 16, rate: 120 }
  ]);
  const [contingencyPct, setContingencyPct] = useState(15);

  const addPhase = () => {
    setPhases([...phases, { name: `Project Phase #${phases.length + 1}`, hours: 20, rate: 120 }]);
  };

  const removePhase = (idx) => {
    if (phases.length <= 1) return;
    setPhases(phases.filter((_, i) => i !== idx));
  };

  const updatePhase = (idx, field, val) => {
    const next = [...phases];
    next[idx][field] = field === 'name' ? val : Math.max(0, Number(val) || 0);
    setPhases(next);
  };

  const totalBaseHours = phases.reduce((acc, p) => acc + Number(p.hours || 0), 0);
  const totalBaseCost = phases.reduce((acc, p) => acc + Number(p.hours || 0) * Number(p.rate || 0), 0);
  const contingencyCost = totalBaseCost * (Number(contingencyPct) / 100);
  const finalQuote = totalBaseCost + contingencyCost;
  const avgRate = totalBaseHours > 0 ? (totalBaseCost / totalBaseHours).toFixed(2) : 0;

  const generateProposalTxt = () => {
    const lines = [
      `==============================================`,
      `FREELANCE PROJECT SCOPE & QUOTE ESTIMATE`,
      `==============================================\n`,
      `PHASE BREAKDOWN:`,
      ...phases.map(
        (p, i) =>
          `  ${i + 1}. ${p.name}\n     - Estimated Time: ${p.hours} hrs @ $${p.rate}/hr = $${(
            p.hours * p.rate
          ).toFixed(2)}`
      ),
      `\n----------------------------------------------`,
      `Base Billable Hours : ${totalBaseHours} hrs`,
      `Base Project Labor  : $${totalBaseCost.toFixed(2)}`,
      `Risk Contingency (${contingencyPct}%) : +$${contingencyCost.toFixed(2)}`,
      `==============================================`,
      `TOTAL RECOMMENDED QUOTE : $${finalQuote.toFixed(2)} USD`,
      `==============================================`
    ];
    return lines.join('\n');
  };

  const handleDownloadQuote = () => {
    const blob = new Blob([generateProposalTxt()], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'project_quote.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Freelance Project Scoper & Quote Estimator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Estimate project deliverables, calculate hourly phase totals, buffer risk contingency, and download client-ready project quotes offline."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <span style={SL}>Project Deliverables & Phases</span>
            <button
              onClick={addPhase}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
            >
              <Plus size={14} /> Add Phase
            </button>
          </div>

          <div className="space-y-3">
            {phases.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#e6e9ef] shadow-sm flex items-center gap-4 flex-wrap"
              >
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updatePhase(idx, 'name', e.target.value)}
                  className="flex-1 min-w-[200px] h-10 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532]"
                />
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#868894]" />
                  <input
                    type="number"
                    value={p.hours}
                    onChange={(e) => updatePhase(idx, 'hours', e.target.value)}
                    className="w-16 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                  />
                  <span className="text-[11px] font-bold text-[#676879]">hrs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign size={14} className="text-[#868894]" />
                  <input
                    type="number"
                    value={p.rate}
                    onChange={(e) => updatePhase(idx, 'rate', e.target.value)}
                    className="w-16 h-10 px-2 rounded-lg border border-[#d0d4e4] font-mono text-xs font-bold text-[#1f2532]"
                  />
                  <span className="text-[11px] font-bold text-[#676879]">/hr</span>
                </div>
                {phases.length > 1 && (
                  <button
                    onClick={() => removePhase(idx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex items-center justify-between">
            <span className="text-xs font-bold text-[#676879]">Base Billable Total:</span>
            <span className="font-mono text-base font-bold text-[#1f2532]">
              {totalBaseHours} hrs • ${totalBaseCost.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Pricing & Contingency */}
        <div className="space-y-10">
          <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-5">
            <div>
              <div style={SL}>Risk & Scope Contingency Buffer (%)</div>
              <input
                type="number"
                value={contingencyPct}
                onChange={(e) => setContingencyPct(Math.max(0, Math.min(100, e.target.value)))}
                className="w-full h-12 px-4 rounded-xl border border-[#d0d4e4] font-mono text-xl font-bold text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
              />
              <span className="text-xs text-[#868894] mt-1 block">
                Standard safety margin: 15%–20%
              </span>
            </div>

            <div className="pt-4 border-t border-[#f0f2f5] space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Base Labor Cost</span>
                <span className="font-mono font-bold text-[#1f2532]">${totalBaseCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Contingency ({contingencyPct}%)</span>
                <span className="font-mono font-bold text-amber-600">+${contingencyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#676879]">Effective Avg Rate</span>
                <span className="font-mono font-bold text-[#1f2532]">${avgRate}/hr</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f5f6ff] border border-[#d5d9fc] text-center">
              <div className="text-[10px] uppercase font-bold text-[#6161ff]">Total Recommended Quote</div>
              <div className="text-3xl font-mono font-bold text-[#1f2532] mt-1">
                ${finalQuote.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleDownloadQuote}
              className="w-full h-12 rounded-xl bg-[#6161ff] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#4e4ee0]"
            >
              <Download size={16} /> Download Proposal .TXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
