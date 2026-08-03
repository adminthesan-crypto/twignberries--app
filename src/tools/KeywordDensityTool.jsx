import React, { useState } from 'react';
import { FileText, ShieldCheck, AlertCircle, BookOpen, BarChart2 } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function KeywordDensityTool() {
  const [text, setText] = useState(
    `Pahruli provides 60 offline utilities for founders and developers. Pahruli tools run in memory with zero cloud latency and zero server uploads. Try Pahruli today to simplify your daily creator workflow.`
  );
  const [minWordLen, setMinWordLen] = useState(3);

  // Stop words to exclude from keyword density
  const stopWords = new Set([
    'the', 'and', 'for', 'that', 'with', 'this', 'have', 'from', 'not', 'are', 'was', 'were', 'been', 'would', 'could',
    'should', 'will', 'can', 'your', 'you', 'our', 'their', 'they', 'them', 'his', 'her', 'she', 'him', 'who', 'which',
    'what', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
    'than', 'too', 'very', 'into', 'over', 'after', 'before', 'between', 'under', 'again', 'further', 'then', 'once'
  ]);

  const analyzeText = (str) => {
    const cleanStr = str.trim();
    if (!cleanStr) {
      return { wordsCount: 0, charCount: 0, sentCount: 0, readingTimeMin: 0, fkScore: 0, fkGrade: 'N/A', topWords: [], bigrams: [] };
    }

    const charCount = cleanStr.length;
    const wordsRaw = cleanStr.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    const wordsCount = wordsRaw.length;

    // Sentence count
    const sentences = cleanStr.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentCount = Math.max(1, sentences.length);

    // Syllable approximation
    let syllables = 0;
    wordsRaw.forEach((w) => {
      let word = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
      word = word.replace(/^y/, '');
      const syls = word.match(/[aeiouy]{1,2}/g);
      syllables += syls ? syls.length : 1;
    });

    // Flesch Reading Ease & Grade Level
    const fkScore = Math.max(0, Math.min(100, Math.round(206.835 - 1.015 * (wordsCount / sentCount) - 84.6 * (syllables / wordsCount))));
    let fkGrade = 'College / Advanced';
    if (fkScore >= 90) fkGrade = '5th Grade (Very Easy)';
    else if (fkScore >= 80) fkGrade = '6th Grade (Easy)';
    else if (fkScore >= 70) fkGrade = '7th Grade (Fairly Easy)';
    else if (fkScore >= 60) fkGrade = '8th-9th Grade (Standard English)';
    else if (fkScore >= 50) fkGrade = '10th-12th Grade (Fairly Difficult)';
    else if (fkScore >= 30) fkGrade = 'College Student (Difficult)';

    const readingTimeMin = (wordsCount / 200).toFixed(1);

    // Single word frequency
    const wordFreq = {};
    wordsRaw.forEach((w) => {
      if (w.length >= minWordLen && !stopWords.has(w)) {
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    });

    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / wordsCount) * 100).toFixed(1)
      }));

    // Bigram (2-word phrases)
    const bigramFreq = {};
    for (let i = 0; i < wordsRaw.length - 1; i++) {
      const w1 = wordsRaw[i];
      const w2 = wordsRaw[i + 1];
      if (!stopWords.has(w1) && !stopWords.has(w2) && w1.length >= 2 && w2.length >= 2) {
        const bg = `${w1} ${w2}`;
        bigramFreq[bg] = (bigramFreq[bg] || 0) + 1;
      }
    }
    const bigrams = Object.entries(bigramFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([phrase, count]) => ({
        phrase,
        count,
        percent: ((count / wordsCount) * 100).toFixed(1)
      }));

    return { wordsCount, charCount, sentCount, readingTimeMin, fkScore, fkGrade, topWords, bigrams };
  };

  const stats = analyzeText(text);

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side SEO Keyword Density & Readability Analyzer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Check keyword repetition, Flesch-Kincaid grade level, reading time, and 2-word phrase density without sending your drafts to online SEO crawlers."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span style={SL}>Content / Article Text</span>
            <span className="text-xs font-mono text-[#868894]">
              {stats.wordsCount} Words • {stats.charCount} Chars
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={16}
            placeholder="Paste your blog post or landing page copy here..."
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          />
        </div>

        <div className="space-y-6">
          {/* Readability Box */}
          <div className="p-5 rounded-2xl bg-[#f5f6ff] border border-[#d5d9fc] space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-[#6161ff]" size={20} />
              <span className="font-bold text-sm text-[#1f2532]">Readability & Structure</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#676879]">Flesch Reading Score</div>
                <div className="text-2xl font-bold text-[#6161ff] mt-0.5">{stats.fkScore}/100</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#676879]">Grade Level</div>
                <div className="text-xs font-bold text-[#1f2532] mt-1">{stats.fkGrade}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#676879]">Est. Reading Time</div>
                <div className="text-sm font-bold text-[#1f2532] mt-1">{stats.readingTimeMin} mins</div>
              </div>
            </div>
          </div>

          {/* Top Single Keywords */}
          <div className="p-5 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span style={SL}>Top 1-Word Keyword Density</span>
              <span className="text-[11px] text-[#868894]">Excluding stop words</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {stats.topWords.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono border-b border-[#f0f2f5] pb-1.5">
                  <span className="font-bold text-[#1f2532]">{item.word}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#676879]">{item.count}×</span>
                    <span className="badge badge-brand text-[10px]">{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 2-Word Phrases */}
          <div className="p-5 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-3">
            <span style={SL}>Top 2-Word Keyword Phrases</span>
            <div className="space-y-2">
              {stats.bigrams.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs font-mono border-b border-[#f0f2f5] pb-1.5">
                  <span className="font-bold text-[#1f2532]">{item.phrase}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#676879]">{item.count}×</span>
                    <span className="badge badge-success text-[10px]">{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
