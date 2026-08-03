import React, { useState, useMemo } from 'react';
import { Terminal, CheckCircle2, AlertCircle, Copy, Check, ShieldCheck, Play } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

const PRESETS = [
  { id: 'email', name: 'Email Address', pattern: '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-zA-Z0-9_-]+)', desc: 'Matches standard user@domain.com addresses.' },
  { id: 'url', name: 'HTTP / HTTPS URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', desc: 'Matches web URLs with or without SSL.' },
  { id: 'ipv4', name: 'IPv4 Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', desc: 'Matches standard 0.0.0.0 to 255.255.255.255 IP addresses.' },
  { id: 'hex', name: 'HEX Color Code', pattern: '#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b', desc: 'Matches 3 or 6 character hexadecimal colors.' }
];

const DEFAULT_TEXT = `Hello! Welcome to Twignberries v6.0 Developer Suite.
Contact our team at support@twignberries.com or legal@acme.org.
Visit our documentation at https://twignberries.com/docs or http://api.twignberries.io.
Primary brand color is #6161ff and secondary status is #00c875.`;

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState(PRESETS[0].pattern);
  const [flags, setFlags] = useState('g'); // g, i, m
  const [text, setText] = useState(DEFAULT_TEXT);
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);

  const { matches, isRegexValid } = useMemo(() => {
    setErrorMsg(null);
    if (!pattern) return { matches: [], isRegexValid: true };

    try {
      const re = new RegExp(pattern, flags);
      const results = [];
      let m;
      if (flags.includes('g')) {
        let count = 0;
        while ((m = re.exec(text)) !== null && count < 200) {
          results.push({
            index: m.index,
            match: m[0],
            groups: m.slice(1)
          });
          count++;
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        m = re.exec(text);
        if (m) {
          results.push({
            index: m.index,
            match: m[0],
            groups: m.slice(1)
          });
        }
      }
      return { matches: results, isRegexValid: true };
    } catch (err) {
      setErrorMsg(err.message);
      return { matches: [], isRegexValid: false };
    }
  }, [pattern, flags, text]);

  const toggleFlag = (f) => {
    if (flags.includes(f)) {
      setFlags(flags.replace(f, ''));
    } else {
      setFlags(flags + f);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Regex Pattern Input & Text Editor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div className="flex items-center justify-between mb-3">
            <div style={SL} className="mb-0">1. Regular Expression (PCRE / ES6)</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['g', 'i', 'm'].map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFlag(f)}
                  style={{
                    padding: '6px 10px', borderRadius: 8,
                    border: flags.includes(f) ? '2px solid #6161ff' : '1px solid #d0d4e4',
                    background: flags.includes(f) ? '#f3f5ff' : '#ffffff',
                    color: flags.includes(f) ? '#6161ff' : '#676879',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  Flag: {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: '#676879' }}>/</span>
            <input
              type="text"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="e.g. ([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]+)"
              style={{
                flex: 1, padding: '12px 16px', borderRadius: 12,
                border: errorMsg ? '2px solid #e2445c' : '1px solid #d0d4e4',
                background: '#ffffff', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: '#1f2532'
              }}
            />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#676879' }}>/{flags}</span>
          </div>

          <div style={{ fontSize: 13, fontWeight: 600, color: '#676879', marginBottom: 10 }}>
            ⚡ Common Pattern Presets:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {PRESETS.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPattern(p.pattern)}
                style={{
                  padding: '8px 6px', borderRadius: 10, border: '1px solid #d0d4e4',
                  background: '#f6f8fa', color: '#1f2532', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', textAlign: 'center'
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Test Subject String Card */}
        <div className="form-card">
          <div className="flex items-center justify-between mb-3">
            <div style={SL} className="mb-0">2. Test Subject Text</div>
            <button
              type="button"
              onClick={() => setText(DEFAULT_TEXT)}
              style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #d0d4e4', background: '#fff', fontSize: 11, fontWeight: 700, color: '#676879', cursor: 'pointer' }}
            >
              Reset Sample Text
            </button>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            rows={7}
            placeholder="Type or paste text to test regex matches..."
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: '1px solid #d0d4e4',
              background: '#f6f8fa', fontFamily: 'var(--font-mono)', fontSize: 13.5, color: '#1f2532',
              resize: 'vertical'
            }}
          />

          {/* Matched Highlights List */}
          <div style={{ marginTop: 20 }}>
            <div style={SL}>3. Extracted Matches & Capture Groups</div>

            {matches.length === 0 ? (
              <div style={{ padding: '20px', borderRadius: 12, background: '#f6f8fa', border: '1px dashed #d0d4e4', textAlign: 'center', color: '#676879', fontSize: 13, fontWeight: 600 }}>
                No regex matches found in test subject text.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 260, overflowY: 'auto' }}>
                {matches.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px 14px', borderRadius: 10, background: '#f3f5ff',
                      border: '1px solid rgba(97,97,255,0.25)', display: 'flex',
                      alignItems: 'center', justifyItems: 'start', gap: 12
                    }}
                  >
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: '#6161ff', color: '#fff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      #{idx + 1}
                    </span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1f2532', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.match}
                      </div>
                      <div style={{ fontSize: 11.5, color: '#676879', marginTop: 2 }}>
                        Index: {m.index} {m.groups.length > 0 && `• Groups: [${m.groups.join(', ')}]`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Match Count</div>
            <span className="badge badge-success" style={{ fontSize: 11 }}>100% Offline</span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 36, color: matches.length > 0 ? '#00c875' : '#676879' }}>
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {isRegexValid ? 'Valid ES6 RegExp Syntax' : 'Syntax Error'}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="btn-primary"
            style={{ width: '100%', background: '#6161ff', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied Regex Pattern!' : 'Copy Regex String (e.g. /pattern/g)'}
          </button>

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Local RegExp V8 engine. Zero cloud calls.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why test Regex Offline?</div>
          Regular expressions often parse sensitive PII, passwords, and user logs. Testing them locally ensures zero data leakage to external regex debugging servers.
        </div>
      </div>
    </div>
  );
}
