import React, { useState } from 'react';
import { Megaphone, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function AdCopyCounterTool() {
  const [headline, setHeadline] = useState('60 Offline Tools for Creators');
  const [desc, setDesc] = useState('Free client-side PDF, image, SQL & e-commerce utilities. Zero signups or servers.');
  const [fbText, setFbText] = useState('Stop leaking proprietary data to cloud tools. Pahruli runs 100% inside your local browser memory.');

  const limits = [
    { label: 'Google Search Headline', text: headline, max: 30, field: 'headline' },
    { label: 'Google Search Description', text: desc, max: 90, field: 'desc' },
    { label: 'Facebook / IG Primary Text', text: fbText, max: 125, field: 'fb' }
  ];

  const updateField = (field, val) => {
    if (field === 'headline') setHeadline(val);
    else if (field === 'desc') setDesc(val);
    else if (field === 'fb') setFbText(val);
  };

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Ad Copy Character Limit & Visual Meter
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Draft Google Search headlines, Meta ad descriptions, and social ad copy against exact platform character limits offline."
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {limits.map((item, idx) => {
          const len = item.text.length;
          const pct = Math.min(100, (len / item.max) * 100);
          const over = len > item.max;

          return (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span style={SL}>{item.label}</span>
                <span
                  className={`text-xs font-bold font-mono ${
                    over ? 'text-red-600' : 'text-[#676879]'
                  }`}
                >
                  {len} / {item.max} chars {over && `(${len - item.max} over)`}
                </span>
              </div>

              <input
                type="text"
                value={item.text}
                onChange={(e) => updateField(item.field, e.target.value)}
                className={`w-full h-12 px-4 rounded-xl border text-sm font-bold text-[#1f2532] focus:outline-none ${
                  over ? 'border-red-500 bg-red-50/30' : 'border-[#d0d4e4]'
                }`}
              />

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    over ? 'bg-red-500' : pct > 85 ? 'bg-amber-500' : 'bg-[#6161ff]'
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {over ? (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600">
                  <AlertCircle size={14} /> Exceeds {item.max} char limit! This copy will be truncated by the advertising platform.
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-green-700">
                  <CheckCircle size={14} /> Within platform limits. Safe for deployment.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
