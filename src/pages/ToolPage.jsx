import React, { useState } from 'react';
import { useParams, Navigate, useOutletContext, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Star } from 'lucide-react';
import TOOLS from '../data/toolsData';
import Sidebar from '../components/Sidebar';
import ViralShareBar from '../components/ViralShareBar';
import AdUnit from '../components/AdUnit';
import EmbedCodeGenerator from '../components/EmbedCodeGenerator';

export default function ToolPage() {
  const { id, useCase } = useParams();
  const { handleSelectTool } = useOutletContext();
  
  const [starredIds, setStarredIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tw_starred') || '[]'); }
    catch { return []; }
  });

  const [recentIds, setRecentIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('tw_recent') || '[]'); }
    catch { return []; }
  });

  const tool = TOOLS.find(t => t.id === id);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const ActiveComponent = tool.component;
  const isStarred = starredIds.includes(tool.id);

  const formattedUseCase = useCase 
    ? useCase.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') 
    : '';
    
  // pSEO Optimized Metadata
  const displayTitle = useCase 
    ? `${tool.name} for ${formattedUseCase} - Free Online Tool` 
    : tool.seo.title;
    
  const displayDesc = useCase 
    ? `Free online ${tool.name.toLowerCase()} specifically designed for ${formattedUseCase.toLowerCase()}. No signup required, works 100% offline in your browser.`
    : tool.seo.description;

  const handleToggleStar = () => {
    setStarredIds(prev => {
      const isStarred = prev.includes(tool.id);
      const updated = isStarred ? prev.filter(i => i !== tool.id) : [...prev, tool.id];
      try { localStorage.setItem('tw_starred', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  return (
    <>
      <Helmet>
        <title>{displayTitle}</title>
        <meta name="description" content={displayDesc} />
        <meta property="og:title" content={`${displayTitle} | Pahruli`} />
        <meta property="og:description" content={displayDesc} />
        <link rel="canonical" href={`https://usepahruli.com/tool/${tool.id}${useCase ? `/${useCase}` : ''}`} />
      </Helmet>

      {/* Sidebar for quick switching */}
      <Sidebar
        tools={TOOLS}
        activeToolId={tool.id}
        onSelectTool={handleSelectTool}
        starredIds={starredIds}
        recentIds={recentIds}
      />

      <main className="flex-1 p-5 md:py-8 md:px-10">
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>
          
          {/* Breadcrumb + actions bar */}
          <div className="no-print" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 48, flexWrap: 'wrap', gap: 12,
          }}>
            <Link
              to="/"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 14, fontWeight: 600, color: 'var(--text-4)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                transition: 'color 0.13s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-4)'}
            >
              <ArrowLeft size={16} />
              All Tools
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Category badge */}
              <span style={{
                fontSize: 12, fontWeight: 700, padding: '4px 12px',
                borderRadius: 99, background: 'rgba(255,255,255,0.06)',
                color: 'var(--text-4)', border: '1px solid var(--border)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                {tool.category}
              </span>

              {/* Embed Button */}
              <EmbedCodeGenerator toolId={tool.id} toolName={tool.name} />

              {/* Star button */}
              <button
                onClick={handleToggleStar}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  padding: '8px 16px', borderRadius: 8, transition: 'all 0.15s ease',
                  background: isStarred ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)',
                  color: isStarred ? '#f59e0b' : 'var(--text-4)',
                  border: isStarred ? '1.5px solid rgba(245,158,11,0.3)' : '1.5px solid var(--border)',
                }}
              >
                <Star size={14} fill={isStarred ? '#f59e0b' : 'none'} />
                {isStarred ? 'Starred' : 'Star this tool'}
              </button>
            </div>
          </div>

          {/* Tool content */}
          <div className="animate-fade-in pahruli-tool-container" style={{ minHeight: '50vh', marginBottom: 64 }}>
            {/* Inject CSS to hide the default hardcoded H1 inside the tool components */}
            <style>{`.pahruli-tool-container h1:first-of-type { display: none !important; }`}</style>
            
            {/* Dynamic SEO H1 Header */}
            <div className="mb-8 pb-4 border-b border-[#e6e9ef]">
              <h1 className="text-3xl font-heading font-bold text-[#1f2532] mb-2 tracking-tight">
                {useCase 
                  ? (useCase.includes('error') || useCase.includes('exceeds') || useCase.includes('limit') || useCase.includes('too-large') || useCase.includes('larger-than')
                    ? (useCase.startsWith('fix') ? formattedUseCase.replace(/-/g, ' ') : `Fix: ${formattedUseCase.replace(/-/g, ' ')}`)
                    : `${tool.name} for ${formattedUseCase.replace(/-/g, ' ')}`)
                  : tool.seo.title}
              </h1>
              <p className="text-[#64748b] text-sm font-medium">
                {useCase 
                  ? `Use this free ${tool.name.toLowerCase()} to securely solve your issue 100% offline.` 
                  : tool.description}
              </p>
            </div>

            <ActiveComponent />
          </div>

          {/* pSEO Internal Linking: Related Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="mb-12 no-print">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Specific Use Cases</h3>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map(uc => {
                  const ucSlug = typeof uc === 'string' ? uc : uc.slug;
                  const ucName = typeof uc === 'string' ? uc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : uc.name;
                  return (
                    <Link
                      key={ucSlug}
                      to={`/tool/${tool.id}/${ucSlug}`}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        useCase === ucSlug 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {ucName}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Post-Tool Widgets */}
          <div className="flex flex-col gap-10 border-t border-[#e6e9ef]" style={{ paddingTop: 64 }}>
            {/* Viral Share Bar (WhatsApp & Twitter/X 1-Click Viral Loop) */}
            <ViralShareBar toolName={tool.name} />

            {/* Tasteful Native Ad / Sponsor Banner below Tool */}
            <AdUnit variant="banner" placement="tool-footer" />
          </div>

          {/* Spacer to guarantee separation from footer */}
          <div style={{ height: 120 }} />
        </div>
      </main>
    </>
  );
}
