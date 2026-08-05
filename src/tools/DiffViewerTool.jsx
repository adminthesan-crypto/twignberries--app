import React, { useState } from 'react';
import { GitCompare, Copy, Check, ShieldCheck, ArrowRightLeft } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function DiffViewerTool() {
  const [origText, setOrigText] = useState(
    `const calculateTax = (amount) => {\n  const taxRate = 0.05;\n  return amount * taxRate;\n};`
  );
  const [modText, setModText] = useState(
    `const calculateTax = (amount, inclusive = false) => {\n  const taxRate = 0.18;\n  if (inclusive) {\n    return amount - (amount / (1 + taxRate));\n  }\n  return amount * taxRate;\n};`
  );

  const computeDiff = (t1, t2) => {
    const lines1 = t1.split(/\r?\n/);
    const lines2 = t2.split(/\r?\n/);
    const maxLen = Math.max(lines1.length, lines2.length);
    const diffRows = [];

    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i];
      const l2 = lines2[i];
      let status = 'same'; // same, added, deleted, modified

      if (l1 === undefined && l2 !== undefined) {
        status = 'added';
      } else if (l1 !== undefined && l2 === undefined) {
        status = 'deleted';
      } else if (l1 !== l2) {
        status = 'modified';
      }

      diffRows.push({
        lineNum: i + 1,
        left: l1 ?? '',
        right: l2 ?? '',
        status
      });
    }
    return diffRows;
  };

  const rows = computeDiff(origText, modText);

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Code & Text Diff Comparator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Compare API payloads, markdown drafts, or code snippets side by side without pasting proprietary code into online diff websites."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div style={SL}>Original Text / Code</div>
          <textarea
            value={origText}
            onChange={(e) => setOrigText(e.target.value)}
            rows={8}
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          />
        </div>
        <div>
          <div style={SL}>Modified / New Version</div>
          <textarea
            value={modText}
            onChange={(e) => setModText(e.target.value)}
            rows={8}
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          />
        </div>
      </div>

      {/* Diff Table */}
      <div className="rounded-2xl border border-[#e6e9ef] overflow-hidden shadow-sm bg-white">
        <div className="p-4 bg-[#f5f6f8] border-b border-[#e6e9ef] flex items-center justify-between">
          <span style={SL}>Side-by-Side Diff Analysis</span>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1 text-green-700">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Added
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Changed
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Removed
            </span>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[480px]">
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr className="bg-[#f0f2f5] text-[#676879] text-left border-b border-[#e6e9ef]">
                <th className="py-2 px-3 w-12 text-center">#</th>
                <th className="py-2 px-4 w-1/2">Original Version</th>
                <th className="py-2 px-3 w-12 text-center">#</th>
                <th className="py-2 px-4 w-1/2">Modified Version</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                let leftBg = 'bg-white';
                let rightBg = 'bg-white';
                let leftText = 'text-[#1f2532]';
                let rightText = 'text-[#1f2532]';

                if (row.status === 'deleted') {
                  leftBg = 'bg-red-50';
                  leftText = 'text-red-700 font-semibold line-through opacity-80';
                } else if (row.status === 'added') {
                  rightBg = 'bg-green-50';
                  rightText = 'text-green-700 font-semibold';
                } else if (row.status === 'modified') {
                  leftBg = 'bg-amber-50';
                  rightBg = 'bg-amber-50';
                  leftText = 'text-amber-800 font-semibold';
                  rightText = 'text-amber-800 font-semibold';
                }

                return (
                  <tr key={row.lineNum} className="border-b border-[#f0f2f5] hover:bg-gray-50/50">
                    <td className="py-1.5 px-3 text-center text-[#868894] bg-[#fbfbfc] select-none">
                      {row.lineNum}
                    </td>
                    <td className={`py-1.5 px-4 whitespace-pre-wrap ${leftBg} ${leftText}`}>
                      {row.left}
                    </td>
                    <td className="py-1.5 px-3 text-center text-[#868894] bg-[#fbfbfc] select-none">
                      {row.lineNum}
                    </td>
                    <td className={`py-1.5 px-4 whitespace-pre-wrap ${rightBg} ${rightText}`}>
                      {row.right}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
