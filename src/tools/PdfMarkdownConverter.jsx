import React, { useState } from 'react';
import { FileText, Printer, Copy, Check, Eye, Code, Sparkles, ShieldCheck } from 'lucide-react';

export default function PdfMarkdownConverter() {
  const [markdown, setMarkdown] = useState(`# Project Scope & Proposal (2026)

## 1. Executive Summary
This document outlines the deliverables and pricing structure for custom frontend architecture and interactive programmatic utilities.

## 2. Deliverables & Schedule
- **Phase 1:** Core design system and glassmorphic UI components
- **Phase 2:** 8 interactive client-side calculators & fee solvers
- **Phase 3:** Manifest V3 Chrome Extension wrapper

## 3. Financial Summary
| Milestone | Timeline | Investment |
| :--- | :--- | :--- |
| Initial Architecture | Week 1 | $1,500 |
| Production Release | Week 2 | $2,000 |
| **Total Project** | **14 Days** | **$3,500** |

> *Note: All deliverables include 100% client-side privacy and zero recurring backend server fees.*

---
**Prepared by:** Twignberries Studio  
**Date:** August 2026`);

  const [activeTab, setActiveTab] = useState('split'); // split, edit, preview
  const [copied, setCopied] = useState(false);

  // Simple clean markdown-to-HTML formatter for headers, bold, italics, tables, and blockquotes
  const parseMarkdownToHtml = (md) => {
    let html = md
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-heading font-bold text-[#ff8c3a] mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-heading font-bold text-white pb-2 border-b border-white/10 mb-4">$1</h1>')
      .replace(/^\> \*(.*)\*/gim, '<blockquote class="border-l-4 border-[#ff6b00] pl-3 py-1.5 my-3 bg-white/5 italic text-sm text-[#9ca3af]">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic text-[#9ca3af]">$1</em>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-sm py-0.5">$1</li>')
      .replace(/^(?!<h|<ul|<li|<blockquote|<table|<tr|<td|<th)(.*$)/gim, '<p class="text-sm leading-relaxed my-1.5">$1</p>');

    // Format Markdown Tables
    if (html.includes('|')) {
      const lines = html.split('\n');
      let tableHtml = '<div class="overflow-x-auto my-4"><table class="w-full text-left border-collapse text-xs font-mono">';
      let inTable = false;

      const newLines = lines.map(line => {
        if (line.includes('|')) {
          const cells = line.split('|').map(c => c.trim()).filter(Boolean);
          if (line.includes('---')) return ''; // skip markdown separator row
          
          if (!inTable) {
            inTable = true;
            return tableHtml + '<thead><tr class="border-b border-white/20">' +
              cells.map(c => `<th class="py-2 px-2 text-[#9ca3af] font-bold">${c}</th>`).join('') +
              '</tr></thead><tbody>';
          } else {
            return '<tr class="border-b border-white/5">' +
              cells.map(c => `<td class="py-2 px-2 text-white">${c}</td>`).join('') +
              '</tr>';
          }
        } else if (inTable) {
          inTable = false;
          return '</tbody></table></div>' + line;
        }
        return line;
      });

      if (inTable) {
        newLines.push('</tbody></table></div>');
      }
      html = newLines.join('\n');
    }

    return html;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title Header (No Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-white">
              Markdown to PDF Converter & Clean Formatter
            </h1>
            <span className="badge badge-brand">ZERO SERVER UPLOAD</span>
          </div>
          <p className="text-sm text-[#9ca3af] mt-1">
            Type or paste markdown notes, proposals, or readmes and export a clean PDF instantly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="btn-secondary text-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Markdown' : 'Copy MD'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Markdown Editor (No Print) */}
        <div className="lg:col-span-6 glass-card space-y-3 no-print">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#9ca3af] flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#ff6b00]" /> Markdown Input
            </span>
            <span className="text-xs font-mono text-[#6b7280]">Supports headings, tables & lists</span>
          </div>

          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            rows={18}
            className="w-full bg-[#0d101a] border border-white/15 rounded-xl p-4 font-mono text-xs text-white leading-relaxed focus:outline-none focus:border-[#ff6b00] resize-none"
            placeholder="Type your markdown here..."
          />

          <div className="flex items-center justify-between text-xs text-[#6b7280]">
            <span>100% private client-side rendering</span>
            <span>{markdown.length} characters</span>
          </div>
        </div>

        {/* Right: Rendered Document Preview (This is what prints!) */}
        <div className="lg:col-span-6 glass-card bg-[#0d1018] border-white/15 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 no-print">
            <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> Live Document Preview
            </span>
            <span className="badge badge-success">READY FOR PDF EXPORT</span>
          </div>

          {/* Document Canvas */}
          <div 
            className="prose prose-invert max-w-none text-white space-y-2"
            dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
