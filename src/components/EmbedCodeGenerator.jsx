import React, { useState } from 'react';
import { Code, Check, Copy } from 'lucide-react';

export default function EmbedCodeGenerator({ toolId, toolName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const embedUrl = `https://free.pahruli.in/embed/${toolId}`;
  
  const embedCode = `<iframe 
  src="${embedUrl}" 
  width="100%" 
  height="600" 
  frameborder="0" 
  style="border-radius: 12px; border: 1px solid #e6e9ef; box-shadow: 0 4px 14px rgba(0,0,0,0.05);"
  title="${toolName} by Pahruli"
></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          padding: '8px 16px', borderRadius: 8, transition: 'all 0.15s ease',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--text-4)',
          border: '1px solid var(--border)',
        }}
      >
        <Code size={14} />
        Embed Tool
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1f2532]/60 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#e6e9ef] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1f2532]">Embed this tool</h3>
                <p className="text-sm text-[#676879]">Add this calculator to your own website or blog.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#676879]"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-[#f8f9fa] rounded-xl border border-[#e6e9ef] p-4 relative mb-4">
                <pre className="text-sm text-[#4d5156] whitespace-pre-wrap font-mono break-all">
                  {embedCode}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm border border-[#e6e9ef] hover:border-[#6161ff] text-[#4d5156] transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
              <p className="text-xs text-[#868894] text-center font-medium">
                Pahruli widgets are 100% free and load instantly. No API keys required.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
