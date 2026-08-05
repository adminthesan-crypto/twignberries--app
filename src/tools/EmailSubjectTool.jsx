import React, { useState } from 'react';
import { Mail, ShieldCheck, AlertCircle, Smartphone, Monitor, CheckCircle } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function EmailSubjectTool() {
  const [subject, setSubject] = useState('How we scaled Pahruli to 60 offline tools (and what broke)');
  const [preheader, setPreheader] = useState('Zero server uploads, 100% local client privacy. Here is our 2026 developer roadmap.');
  const [sender, setSender] = useState('Shriman from Pahruli');

  const spamWords = ['free', 'guarantee', '100%', 'act now', 'urgent', 'winner', 'cash', 'risk-free', 'buy direct', 'no cost', 'congratulations'];

  const foundSpam = spamWords.filter((w) =>
    subject.toLowerCase().includes(w) || preheader.toLowerCase().includes(w)
  );

  const charLen = subject.length;
  let lenScore = 'Optimal (35–50 chars)';
  let badgeColor = 'badge-success';
  if (charLen > 60) {
    lenScore = 'Too Long (Will truncate on mobile)';
    badgeColor = 'badge-danger';
  } else if (charLen < 25) {
    lenScore = 'Short & Punchy';
    badgeColor = 'badge-brand';
  }

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Email Subject Line & Inbox Preview Checker
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Test email subject length, preheader preview cutoff, and spam filter trigger words across iOS Mail and Gmail without server calls."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span style={SL}>Email Subject Line</span>
              <span className={`badge ${badgeColor} text-[10px]`}>{charLen} chars • {lenScore}</span>
            </div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-12 px-3 rounded-xl border border-[#d0d4e4] font-bold text-sm text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span style={SL}>Preview / Preheader Text</span>
              <span className="text-xs text-[#868894]">{preheader.length} chars</span>
            </div>
            <textarea
              value={preheader}
              onChange={(e) => setPreheader(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl border border-[#d0d4e4] text-xs text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
            />
          </div>

          <div>
            <div style={SL}>Sender Name (From)</div>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-[#d0d4e4] text-xs font-bold text-[#1f2532]"
            />
          </div>

          {/* Spam check */}
          <div className="p-4 rounded-xl border border-[#e6e9ef] bg-white space-y-2">
            <div className="flex justify-between items-start">
              <span style={SL}>Spam Trigger Word Inspection</span>
              <NativeShareButton text={`Subject: ${subject}\nPreheader: ${preheader}\nSender: ${sender}`} />
            </div>
            {foundSpam.length === 0 ? (
              <div className="flex items-center gap-2 text-xs font-bold text-green-700">
                <CheckCircle size={16} /> No obvious spam trigger keywords detected.
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-red-700">
                <AlertCircle size={16} /> Caution — Detected spam trigger words: {foundSpam.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Live Inbox Previews */}
        <div className="space-y-6">
          {/* iOS Mail Mobile View */}
          <div className="p-5 rounded-2xl border border-[#e6e9ef] bg-white shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#676879]">
              <Smartphone size={16} className="text-[#6161ff]" /> iOS Mail Mobile Preview (iPhone 16 Pro)
            </div>
            <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] max-w-sm mx-auto shadow-inner space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#1f2532] truncate">{sender}</span>
                <span className="text-[11px] text-[#868894]">9:41 AM</span>
              </div>
              <div className="font-bold text-xs text-[#1f2532] line-clamp-1">
                {subject || 'No subject'}
              </div>
              <div className="text-xs text-[#676879] line-clamp-2 leading-relaxed">
                {preheader || 'No preview preheader text provided...'}
              </div>
            </div>
          </div>

          {/* Gmail Desktop View */}
          <div className="p-5 rounded-2xl border border-[#e6e9ef] bg-white shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#676879]">
              <Monitor size={16} className="text-[#6161ff]" /> Gmail Web Desktop Row Preview
            </div>
            <div className="p-3 rounded-lg bg-white border border-[#d0d4e4] flex items-center gap-3 text-xs overflow-hidden">
              <span className="font-bold text-[#1f2532] w-40 shrink-0 truncate">{sender}</span>
              <div className="flex-1 truncate">
                <span className="font-bold text-[#1f2532]">{subject}</span>
                <span className="text-[#868894] ml-2 font-normal">— {preheader}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
