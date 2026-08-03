import React, { useState } from 'react';
import { Code, CheckCircle2, AlertCircle, Copy, Check, Download, ShieldCheck, Minimize2, Maximize2, FileCode } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

const SAMPLE_JSON = `{
  "name": "Twignberries v6.0",
  "version": 6.0,
  "offline_privacy": true,
  "tools": 30,
  "categories": ["PDF Suite", "E-Commerce", "AI & Dev", "Image & Media", "SEO & Web"],
  "developer": {
    "engine": "Client-Side RAM",
    "cloud_uploads": false
  }
}`;

export default function JsonFormatterTool() {
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [outputCode, setOutputCode] = useState('');
  const [mode, setMode] = useState('beautify'); // beautify, minify, typescript
  const [errorMsg, setErrorMsg] = useState(null);
  const [copied, setCopied] = useState(false);

  const generateTsInterface = (obj, interfaceName = 'Root') => {
    if (obj === null || obj === undefined) return 'any';
    if (typeof obj !== 'object') return typeof obj;

    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'any[]';
      const itemType = generateTsInterface(obj[0], `${interfaceName}Item`);
      return itemType.includes('{') ? `Array<${itemType}>` : `${itemType}[]`;
    }

    let ts = `export interface ${interfaceName} {\n`;
    for (const [key, val] of Object.entries(obj)) {
      const valType = typeof val;
      if (val === null) {
        ts += `  ${key}: null | any;\n`;
      } else if (Array.isArray(val)) {
        if (val.length === 0) {
          ts += `  ${key}: any[];\n`;
        } else {
          const itemTs = typeof val[0] === 'object' && val[0] !== null
            ? `${interfaceName}_${key}`
            : typeof val[0];
          if (typeof val[0] === 'object' && val[0] !== null) {
            ts += `  ${key}: ${itemTs}[];\n`;
          } else {
            ts += `  ${key}: ${valType}[] | any[];\n`;
          }
        }
      } else if (valType === 'object') {
        ts += `  ${key}: {\n`;
        for (const [subKey, subVal] of Object.entries(val)) {
          ts += `    ${subKey}: ${typeof subVal};\n`;
        }
        ts += `  };\n`;
      } else {
        ts += `  ${key}: ${valType};\n`;
      }
    }
    ts += `}`;
    return ts;
  };

  const handleProcess = (targetMode = mode) => {
    setErrorMsg(null);
    setMode(targetMode);
    if (!inputJson.trim()) {
      setOutputCode('');
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      if (targetMode === 'beautify') {
        setOutputCode(JSON.stringify(parsed, null, 2));
      } else if (targetMode === 'minify') {
        setOutputCode(JSON.stringify(parsed));
      } else if (targetMode === 'typescript') {
        const tsCode = generateTsInterface(parsed, 'TwignberriesPayload');
        setOutputCode(tsCode);
      }
    } catch (err) {
      setErrorMsg(`Invalid JSON Syntax: ${err.message}`);
      setOutputCode('');
    }
  };

  React.useEffect(() => {
    handleProcess(mode);
  }, [inputJson, mode]);

  const handleCopy = () => {
    if (!outputCode) return;
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
      {/* Left Column: Input JSON & Output Viewport */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="form-card">
          <div className="flex items-center justify-between mb-3">
            <div style={SL} className="mb-0">1. Raw JSON Input</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setInputJson(SAMPLE_JSON)}
                style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #d0d4e4', background: '#fff', fontSize: 11, fontWeight: 700, color: '#676879', cursor: 'pointer' }}
              >
                Sample JSON
              </button>
              <button
                type="button"
                onClick={() => setInputJson('')}
                style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #d0d4e4', background: '#fff', fontSize: 11, fontWeight: 700, color: '#e2445c', cursor: 'pointer' }}
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={inputJson}
            onChange={e => setInputJson(e.target.value)}
            rows={10}
            placeholder='Paste your JSON payload here (e.g. {"name": "Twignberries"})...'
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: errorMsg ? '2px solid #e2445c' : '1px solid #d0d4e4',
              background: '#f6f8fa', fontFamily: 'var(--font-mono)', fontSize: 13.5, color: '#1f2532',
              resize: 'vertical'
            }}
          />

          {errorMsg && (
            <div style={{ marginTop: 12, padding: '12px 16px', borderRadius: 12, background: '#fff2f4', border: '1px solid #e2445c', color: '#e2445c', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Action Mode Tabs & Output Code Card */}
        <div className="form-card">
          <div className="flex items-center justify-between mb-3">
            <div style={SL} className="mb-0">2. Output Operation & Code View</div>

            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: 'beautify', label: 'Beautify', icon: <Maximize2 size={13} /> },
                { id: 'minify', label: 'Minify', icon: <Minimize2 size={13} /> },
                { id: 'typescript', label: 'TypeScript Interface', icon: <FileCode size={13} /> }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleProcess(t.id)}
                  style={{
                    padding: '6px 12px', borderRadius: 8,
                    border: mode === t.id ? '2px solid #6161ff' : '1px solid #d0d4e4',
                    background: mode === t.id ? '#f3f5ff' : '#ffffff',
                    color: mode === t.id ? '#6161ff' : '#1f2532',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            readOnly
            value={outputCode}
            rows={12}
            placeholder="Formatted JSON or TypeScript interface code will appear here..."
            style={{
              width: '100%', padding: '14px', borderRadius: 12, border: '1px solid #e6e9ef',
              background: '#1f2532', color: '#00c875', fontFamily: 'var(--font-mono)', fontSize: 13,
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Right Column: Sticky Live Action & Results */}
      <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="glass-card" style={{ padding: 24, border: '2px solid #e6e9ef' }}>
          <div className="flex items-center justify-between mb-2">
            <div style={SL} className="mb-0">Syntax Status</div>
            <span className={`badge ${errorMsg ? 'badge-danger' : 'badge-success'}`} style={{ fontSize: 11 }}>
              {errorMsg ? 'INVALID SYNTAX' : 'VALID JSON'}
            </span>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="result-number" style={{ fontSize: 26, color: errorMsg ? '#e2445c' : '#00c875' }}>
              {errorMsg ? 'Error Found' : mode.toUpperCase()}
            </div>
            <div style={{ fontSize: 13, color: '#676879', fontWeight: 600 }}>
              {errorMsg ? 'Check syntax in left box' : 'Ready for export & copying'}
            </div>
          </div>

          <button
            onClick={handleCopy}
            disabled={!outputCode || !!errorMsg}
            className="btn-primary"
            style={{ width: '100%', marginBottom: 12, background: '#6161ff', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : `Copy ${mode === 'typescript' ? 'TypeScript' : 'JSON'} Code`}
          </button>

          {outputCode && !errorMsg && (
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(outputCode)}`}
              download={`twignberries-${mode}.${mode === 'typescript' ? 'ts' : 'json'}`}
              className="btn-primary"
              style={{ width: '100%', background: '#00c875', color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              <Download size={16} /> Download .{mode === 'typescript' ? 'ts' : 'json'} File
            </a>
          )}

          <div className="mt-4 pt-4 border-t border-[#f0f2f5] flex items-center gap-2 text-xs text-[#676879] font-medium">
            <ShieldCheck size={14} color="#00c875" />
            <span>Local V8 parser. Zero cloud transmission.</span>
          </div>
        </div>

        <div className="insight-block">
          <div style={{ fontWeight: 700, color: '#6161ff', marginBottom: 4 }}>💡 Why use an Offline JSON Tool?</div>
          Pasting customer API responses or secret JWT tokens into online JSON formatters can expose private credentials. Twignberries processes everything inside your local RAM.
        </div>
      </div>
    </div>
  );
}
