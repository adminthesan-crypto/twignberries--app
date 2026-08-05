import React, { useState } from 'react';
import { Terminal, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('gi');
  const [testText, setTestText] = useState(
    `Contact our team at support@pahruli.com or sales@enterprise.co.uk for billing assistance. Admin: root@localhost.`
  );
  const [errorMsg, setErrorMsg] = useState(null);
  const [matches, setMatches] = useState([]);

  React.useEffect(() => {
    try {
      setErrorMsg(null);
      if (!pattern) {
        setMatches([]);
        return;
      }
      const regex = new RegExp(pattern, flags);
      const found = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(testText)) !== null) {
          found.push({
            str: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (match.index === regex.lastIndex) regex.lastIndex++; // prevent infinite loop
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          found.push({
            str: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }
      setMatches(found);
    } catch (err) {
      setErrorMsg(`Invalid Regex: ${err.message}`);
      setMatches([]);
    }
  }, [pattern, flags, testText]);

  const toggleFlag = (flag) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Regular Expression Tester
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Test emails, URLs, and scraping patterns against sensitive text samples safely in your local browser."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {/* Pattern Input & Flags */}
      <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-8">
        <div>
          <div style={SL}>Regular Expression Pattern</div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-[#868894]">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. \\d{3}-\\d{3}-\\d{4}"
              className="w-full h-12 px-4 rounded-xl border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
            />
            <span className="font-mono text-lg font-bold text-[#868894]">/</span>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-20 h-12 px-3 rounded-xl border border-[#d0d4e4] font-mono text-sm font-bold text-[#1f2532] text-center"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-[#676879]">
          <span>Quick Flags:</span>
          <button
            onClick={() => toggleFlag('g')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              flags.includes('g')
                ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                : 'border-[#d0d4e4] bg-white text-[#676879]'
            }`}
          >
            /g (Global All Matches)
          </button>
          <button
            onClick={() => toggleFlag('i')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              flags.includes('i')
                ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                : 'border-[#d0d4e4] bg-white text-[#676879]'
            }`}
          >
            /i (Case Insensitive)
          </button>
          <button
            onClick={() => toggleFlag('m')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              flags.includes('m')
                ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                : 'border-[#d0d4e4] bg-white text-[#676879]'
            }`}
          >
            /m (Multiline)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div style={SL}>Test String / Sample Text</div>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            rows={10}
            placeholder="Enter text to test pattern against..."
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          />
        </div>

        <div>
          <div style={SL}>Match Results ({matches.length} found)</div>
          <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] min-h-[220px] max-h-[300px] overflow-y-auto space-y-2">
            {matches.length === 0 ? (
              <span className="text-xs text-[#868894] font-mono">No regex matches found in test string.</span>
            ) : (
              matches.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white border border-[#e6e9ef] shadow-sm flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="badge badge-brand text-[10px]">Match #{idx + 1}</span>
                    <span className="font-mono text-xs text-[#868894]">Index: {m.index}</span>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#1f2532] break-all">
                    "{m.str}"
                  </div>
                  {m.groups.length > 0 && (
                    <div className="mt-1 pt-1 border-t border-[#f0f2f5] text-[11px] text-[#676879]">
                      <span className="font-bold">Capture Groups: </span>
                      {m.groups.map((g, gi) => (
                        <span key={gi} className="px-1.5 py-0.5 rounded bg-gray-100 font-mono mr-1">
                          ${gi + 1}: {g || 'undefined'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
