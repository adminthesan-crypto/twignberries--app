import React, { useState } from 'react';
import { Sparkles, FileText, Download, CheckCircle2, List, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function MomCreatorTool() {
  const [transcript, setTranscript] = useState('');
  const [template, setTemplate] = useState('standard');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const templates = [
    { id: 'standard', name: 'Standard Format', desc: 'Overview, Discussion Points, and Action Items' },
    { id: 'action', name: 'Action Items Focused', desc: 'Aggressively filters for commitments and deadlines' },
    { id: 'executive', name: 'Executive Summary', desc: 'Top decisions and critical takeaways' }
  ];

  const generateMom = () => {
    if (!transcript.trim()) return;
    setLoading(true);
    
    // Simulate slight delay for heavy text processing feeling
    setTimeout(() => {
      const sentences = transcript.split(/[.!?\n]+/).map(s => s.trim()).filter(s => s.length > 10);
      
      const actionKeywords = ['will', 'need to', 'assign', 'deadline', 'tomorrow', 'next week', 'task', 'action'];
      const decisionKeywords = ['decided', 'agreed', 'approved', 'resolved', 'finalized'];
      const discussionKeywords = ['discuss', 'think', 'maybe', 'perhaps', 'consider', 'why'];

      const actionItems = sentences.filter(s => actionKeywords.some(k => s.toLowerCase().includes(k)));
      const decisions = sentences.filter(s => decisionKeywords.some(k => s.toLowerCase().includes(k)));
      const discussions = sentences.filter(s => discussionKeywords.some(k => s.toLowerCase().includes(k)));
      
      // Fallbacks if transcript is too short or doesn't match well
      const safeActions = actionItems.length > 0 ? actionItems.slice(0, 5) : ["Review transcript for manual action items."];
      const safeDecisions = decisions.length > 0 ? decisions.slice(0, 3) : ["No explicit decisions detected."];
      const safeDiscussions = discussions.length > 0 ? discussions.slice(0, 5) : sentences.slice(0, 5);
      const safeOverview = sentences.slice(0, 3).join('. ') + '.';

      let formattedText = '';

      if (template === 'standard') {
        formattedText = `MINUTES OF MEETING\n\n`;
        formattedText += `OVERVIEW:\n${safeOverview}\n\n`;
        formattedText += `KEY DISCUSSION POINTS:\n` + safeDiscussions.map(d => `- ${d}`).join('\n') + `\n\n`;
        formattedText += `ACTION ITEMS:\n` + safeActions.map(a => `- [ ] ${a}`).join('\n');
      } else if (template === 'action') {
        formattedText = `ACTION ITEMS & COMMITMENTS\n\n`;
        formattedText += safeActions.map(a => `- [ ] ${a}`).join('\n\n');
        if (actionItems.length === 0) formattedText += "No specific action items were detected by the offline NLP. Please review the transcript.";
      } else if (template === 'executive') {
        formattedText = `EXECUTIVE SUMMARY\n\n`;
        formattedText += `TOP DECISIONS:\n` + safeDecisions.map(d => `- ${d}`).join('\n') + `\n\n`;
        formattedText += `CRITICAL TAKEAWAYS:\n` + safeDiscussions.slice(0, 3).map(d => `- ${d}`).join('\n');
      }

      setResult(formattedText);
      setLoading(false);
    }, 800);
  };

  const handleDownloadTxt = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-minutes-${template}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Minutes of Meeting (MoM) Creator</h1>
            <p className="text-sm text-[#676879]">Instantly format raw meeting transcripts into structured Minutes, Action Items, or Executive Summaries.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Processed offline in your browser with zero data leaks.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Input Settings */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white border border-[#e6e9ef] rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-[#1f2532] flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" /> Output Template
            </h3>
            
            <div className="space-y-3">
              {templates.map(t => (
                <label 
                  key={t.id} 
                  className={`block p-3 rounded-xl border-2 cursor-pointer transition-all ${template === t.id ? 'border-blue-500 bg-blue-50' : 'border-[#e6e9ef] hover:border-[#d0d4e4] bg-white'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <input 
                      type="radio" 
                      name="template" 
                      value={t.id} 
                      checked={template === t.id} 
                      onChange={() => setTemplate(t.id)}
                      className="hidden" 
                    />
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${template === t.id ? 'border-blue-500' : 'border-gray-300'}`}>
                      {template === t.id && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                    </div>
                    <span className={`font-bold text-sm ${template === t.id ? 'text-blue-700' : 'text-[#1f2532]'}`}>{t.name}</span>
                  </div>
                  <p className="text-xs text-[#676879] pl-6">{t.desc}</p>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editor & Result */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-[#e6e9ef] rounded-2xl p-1 overflow-hidden focus-within:border-blue-500 transition-colors shadow-sm">
            <div className="bg-[#f8f9fa] border-b border-[#e6e9ef] p-3 flex items-center gap-2 text-xs font-bold text-[#676879]">
              <FileText className="w-4 h-4" /> Raw Transcript
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste your meeting transcript here (Zoom, Teams, Google Meet)..."
              className="w-full h-64 p-4 text-sm text-[#1f2532] bg-white resize-none focus:outline-none"
            />
          </div>

          <button
            onClick={generateMom}
            disabled={!transcript.trim() || loading}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Processing offline...' : 'Generate Minutes'}
          </button>

          {result && (
            <div className="bg-white border border-[#e6e9ef] rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-[#f8f9fa] border-b border-[#e6e9ef] p-4 flex items-center justify-between">
                <h3 className="font-bold text-[#1f2532] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Generated Minutes
                </h3>
              </div>
              <div className="p-6">
                <pre className="text-sm text-[#1f2532] whitespace-pre-wrap font-sans leading-relaxed">
                  {result}
                </pre>
              </div>
              <div className="bg-[#f8f9fa] border-t border-[#e6e9ef] p-4">
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadTxt}
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-900 text-white font-bold text-sm hover:bg-gray-800 transition-all flex justify-center items-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download .TXT
                  </button>
                  <NativeShareButton text={result} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
