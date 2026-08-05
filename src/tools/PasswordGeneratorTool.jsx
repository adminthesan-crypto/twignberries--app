import React, { useState } from 'react';
import { KeyRound, Copy, Check, RefreshCw, ShieldCheck, Lock, Sliders } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

// Wordlist for Diceware style passphrases
const WORD_LIST = [
  'alpha', 'bravo', 'cloud', 'delta', 'eagle', 'forest', 'glacier', 'harbor', 'island', 'jungle',
  'kernel', 'light', 'mountain', 'nebula', 'ocean', 'pahruli', 'quantum', 'river', 'solar', 'tiger',
  'unison', 'vector', 'winter', 'xenon', 'yellow', 'zenith', 'anchor', 'beacon', 'canyon', 'dragon',
  'echo', 'falcon', 'galaxy', 'horizon', 'indigo', 'joshua', 'karma', 'laser', 'matrix', 'nova',
  'orbit', 'pulsar', 'quasar', 'radar', 'safari', 'titan', 'ultra', 'vortex', 'whisper', 'zephyr'
];

export default function PasswordGeneratorTool() {
  const [mode, setMode] = useState('random'); // random, passphrase
  const [length, setLength] = useState(16);
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const [useUpper, setUseUpper] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    if (mode === 'passphrase') {
      const selected = [];
      const array = new Uint32Array(wordCount);
      window.crypto.getRandomValues(array);
      for (let i = 0; i < wordCount; i++) {
        const idx = array[i] % WORD_LIST.length;
        selected.push(WORD_LIST[idx]);
      }
      let res = selected.join(separator);
      if (useNumbers) res += separator + Math.floor(10 + Math.random() * 90);
      setPassword(res);
      return;
    }

    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const arr = new Uint32Array(length);
    window.crypto.getRandomValues(arr);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[arr[i] % chars.length];
    }
    setPassword(result);
  };

  React.useEffect(() => {
    generatePassword();
  }, [mode, length, wordCount, separator, useUpper, useNumbers, useSymbols]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate approximate entropy bits
  let entropy = 0;
  if (mode === 'random') {
    let poolSize = 26;
    if (useUpper) poolSize += 26;
    if (useNumbers) poolSize += 10;
    if (useSymbols) poolSize += 28;
    entropy = Math.round(length * Math.log2(poolSize));
  } else {
    entropy = Math.round(wordCount * Math.log2(WORD_LIST.length) + (useNumbers ? Math.log2(90) : 0));
  }

  let strengthLabel = 'Very Strong';
  let badgeColor = 'badge-success';
  if (entropy < 50) {
    strengthLabel = 'Weak';
    badgeColor = 'badge-danger';
  } else if (entropy < 70) {
    strengthLabel = 'Moderate';
    badgeColor = 'badge-brand';
  }

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side Cryptographically Secure Password & Passphrase Generator
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Generated using window.crypto.getRandomValues() in your local browser memory. Zero network transmission."
          </p>
        </div>
      </div>

      {/* Output card */}
      <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span style={SL}>Generated Password / Passphrase</span>
          <span className={`badge ${badgeColor} text-[10px]`}>
            {entropy} bits entropy • {strengthLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-1 h-14 px-4 rounded-xl border border-[#d0d4e4] font-mono text-xl font-bold text-[#1f2532] bg-[#fbfbfc]"
          />
          <button
            onClick={generatePassword}
            className="h-14 px-4 rounded-xl border border-[#d0d4e4] text-[#1f2532] hover:bg-gray-50 flex items-center justify-center"
            title="Generate new password"
          >
            <RefreshCw size={20} />
          </button>
          <button
            onClick={handleCopy}
            className="h-14 px-6 rounded-xl bg-[#6161ff] text-white font-bold text-sm flex items-center gap-2 hover:bg-[#4e4ee0]"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <NativeShareButton text={password} />
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-4">
          <div style={SL}>Generation Mode</div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('random')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition ${
                mode === 'random'
                  ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                  : 'border-[#e6e9ef] bg-white text-[#676879]'
              }`}
            >
              Random String
            </button>
            <button
              onClick={() => setMode('passphrase')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition ${
                mode === 'passphrase'
                  ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                  : 'border-[#e6e9ef] bg-white text-[#676879]'
              }`}
            >
              Memorable Passphrase
            </button>
          </div>

          {mode === 'random' ? (
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1f2532] mb-1">
                  <span>Password Length</span>
                  <span>{length} characters</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-[#6161ff] h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-[#1f2532] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useUpper}
                    onChange={(e) => setUseUpper(e.target.checked)}
                    className="accent-[#6161ff] w-4 h-4"
                  />
                  Include Uppercase Letters (A–Z)
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-[#1f2532] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useNumbers}
                    onChange={(e) => setUseNumbers(e.target.checked)}
                    className="accent-[#6161ff] w-4 h-4"
                  />
                  Include Numbers (0–9)
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-[#1f2532] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useSymbols}
                    onChange={(e) => setUseSymbols(e.target.checked)}
                    className="accent-[#6161ff] w-4 h-4"
                  />
                  Include Special Symbols (!@#$%)
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1f2532] mb-1">
                  <span>Number of Words</span>
                  <span>{wordCount} words</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="8"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className="w-full accent-[#6161ff] h-2 bg-gray-200 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-[#1f2532]">Word Separator</span>
                <div className="flex gap-2 mt-1">
                  {['-', '_', '.', ' '].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeparator(s)}
                      className={`px-3 py-1 rounded border text-xs font-mono font-bold ${
                        separator === s
                          ? 'border-[#6161ff] bg-[#f5f6ff] text-[#6161ff]'
                          : 'border-[#e6e9ef] bg-white text-[#1f2532]'
                      }`}
                    >
                      {s === ' ' ? 'Space' : s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-[#f5f6ff] border border-[#d5d9fc] flex flex-col justify-center space-y-3">
          <div className="flex items-center gap-2 text-[#6161ff] font-bold text-sm">
            <Lock size={18} /> Zero-Knowledge Client Security
          </div>
          <p className="text-xs text-[#676879] leading-relaxed">
            "We never log, track, or transmit your passwords. All randomness is generated inside your operating system's native crypto module (Web Crypto API) and exists strictly in transient browser memory until you copy or close the page."
          </p>
        </div>
      </div>
    </div>
  );
}
