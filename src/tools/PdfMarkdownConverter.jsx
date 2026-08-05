import React, { useState } from 'react';
import { FileText, Printer, Copy, Check, Eye, Code, Sparkles, ShieldCheck } from 'lucide-react';
import CopySummaryButton from '../components/CopySummaryButton';

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
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-[#1f2532] mt-4 mb-5">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-heading font-bold text-[#ff8c3a] mt-5 mb-5">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-heading font-bold text-[#1f2532] pb-2 border-b border-[#e6e9ef] mb-4">$1</h1>')
      .replace(/^\> \*(.*)\*/gim, '<blockquote class="border-l-4 border-[#ff6b00] pl-3 py-1.5 my-3 bg-white italic text-sm text-[#9ca3af]">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-[#1f2532]">$1</strong>')
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
            return tableHtml + '<thead><tr class="border-b border-[#d0d4e4]">' +
              cells.map(c => `<th class="py-2 px-2 text-[#9ca3af] font-bold">${c}</th>`).join('') +
              '</tr></thead><tbody>';
          } else {
            return '<tr class="border-b border-white/5">' +
              cells.map(c => `<td class="py-2 px-2 text-[#1f2532]">${c}</td>`).join('') +
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

  const wordCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const lineCount = markdown.split('\n').length;
  const charCount = markdown.length;

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
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: 20 }} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.025em' }}>
            Markdown to PDF Document Generator
          </h1>
          <span className="badge badge-success">INSTANT PDF</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>
          Turn raw markdown notes and proposals into clean PDFs. Type or paste your markdown on the left and export instantly.
        </p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, alignItems: 'start' }}>
        {/* Left Column (Inputs / Editor & Document Preview) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Form Card 1: Markdown Editor (No Print) */}
          <div className="form-card no-print">
            <div style={sectionLabelStyle}>
              <Code size={14} color="var(--brand)" />
              1. Markdown Text Editor
            </div>

            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={14}
              className="w-full glass-input font-mono text-xs text-[#1f2532] leading-relaxed resize-none"
              placeholder="Type your markdown here..."
            />

            <div className="flex items-center justify-between text-xs text-[#6b7280] mt-3">
              <span>Supports headers (#), tables (|), bold (**), italics (*), and lists (-)</span>
              <span>{charCount} characters</span>
            </div>
          </div>

          {/* Form Card 2: Rendered Document Preview (This is what prints!) */}
          <div className="form-card bg-[#0d1018] border-white/15">
            <div style={sectionLabelStyle} className="no-print">
              <Eye size={14} color="var(--brand)" />
              2. Live Document Preview (PDF Ready)
            </div>

            {/* Document Canvas */}
            <div
              className="prose prose-invert max-w-none text-[#1f2532] space-y-2 py-2"
              dangerouslySetInnerHTML={{ __html: parseMarkdownToHtml(markdown) }}
            />
          </div>
        </div>

        {/* Right Column (Results / Live Preview - Sticky) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 20 }} className="no-print">
          {/* Primary Hero Banner / Preview */}
          <div className="form-card" style={{ background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.12), rgba(18, 22, 36, 0.9))', borderColor: 'rgba(255, 107, 0, 0.3)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff8c3a] block mb-3">
              DOCUMENT STATUS
            </span>
            <div className="text-3xl font-mono font-bold text-[#1f2532] mb-5">
              Ready to Export
            </div>
            <div className="flex items-center justify-between text-xs text-[#9ca3af] font-mono">
              <span>{wordCount} Words</span>
              <span>{lineCount} Lines</span>
            </div>
          </div>

          {/* Breakdown / Action Card */}
          <div className="form-card">
            <div style={sectionLabelStyle}>
              <FileText size={14} color="var(--brand)" />
              Document Actions &amp; Stats
            </div>

            <div className="space-y-3 font-mono text-sm mb-5">
              <div className="flex justify-between text-[#9ca3af]">
                <span>Character Count:</span>
                <span className="text-[#1f2532] font-semibold">{charCount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Word Count:</span>
                <span className="text-[#1f2532] font-semibold">{wordCount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Rendering Engine:</span>
                <span className="text-emerald-400 font-semibold">100% Client-Side</span>
              </div>

              <div className="h-px bg-gray-100 my-2" />

              <div className="flex justify-between text-xs text-[#9ca3af]">
                <span>Privacy Status:</span>
                <span className="text-emerald-400 font-bold">Zero Server Logs</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handlePrint}
                className="btn-primary w-full justify-center text-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary w-full justify-center text-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Markdown' : 'Copy Raw Markdown'}</span>
              </button>

              <CopySummaryButton
                title="Markdown Document Statistics"
                lines={[
                  { label: 'Character Count', value: `${charCount}` },
                  { label: 'Word Count', value: `${wordCount}` },
                  { label: 'Line Count', value: `${lineCount}` },
                  { label: 'Rendering Privacy', value: '100% Client-Side Local Execution' },
                  { label: 'Export Format', value: 'Printable HTML / PDF Canvas' }
                ]}
              />
            </div>
          </div>

          {/* Insight Block */}
          <div className="insight-block">
            💡 Pro tip: Use standard Markdown tables, blockquotes, and bulleted lists to create beautifully structured executive proposals ready for instant PDF export.
          </div>
        </div>
      </div>
    </div>
  );
}
