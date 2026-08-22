import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function CopySummaryButton({ title, lines, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Format lines as a clean Markdown summary block
    const formattedLines = lines.map((line) => {
      if (typeof line === 'string') return line;
      return `- **${line.label}:** ${line.value}`;
    }).join('\n');

    const summaryText = `✨ **${title}**\n${formattedLines}\n\n_Calculated with Pahruli 2026 Daily Workspace_`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border cursor-pointer select-none no-print ${
        copied
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/10'
          : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
      } ${className}`}
      title="Copy formatted Markdown summary to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400 animate-scale-in" />
          <span>Copied Summary!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-[#FF5C00]" />
          <span>Copy Summary</span>
        </>
      )}
    </button>
  );
}
