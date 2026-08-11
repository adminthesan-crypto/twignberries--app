import React, { useState } from 'react';
import { FileText, Copy, Check, Download, ShieldCheck, AlertCircle, ArrowLeftRight } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function CsvJsonTool() {
  const [direction, setDirection] = useState('csv-to-json'); // csv-to-json, json-to-csv, csv-to-sql
  const [inputVal, setInputVal] = useState(
    `id,name,email,role\n1,Alex Johnson,alex@company.com,admin\n2,Taylor Swift,taylor@music.com,creator\n3,Sam Altman,sam@ai.org,developer`
  );
  const [outputVal, setOutputVal] = useState('');
  const [tableName, setTableName] = useState('users');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const convertData = (val, dir, tbl) => {
    try {
      setErrorMsg(null);
      if (!val.trim()) {
        setOutputVal('');
        return;
      }

      if (dir === 'csv-to-json') {
        const lines = val.trim().split(/\r?\n/);
        const headers = lines[0].split(',').map((h) => h.trim());
        const result = [];

        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',').map((c) => c.trim());
          const obj = {};
          headers.forEach((h, idx) => {
            const valStr = row[idx] || '';
            obj[h] = !isNaN(Number(valStr)) && valStr !== '' ? Number(valStr) : valStr;
          });
          result.push(obj);
        }
        setOutputVal(JSON.stringify(result, null, 2));
      } else if (dir === 'json-to-csv') {
        const data = JSON.parse(val);
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Input JSON must be an array of objects.');
        }
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];

        data.forEach((row) => {
          const values = headers.map((h) => {
            const v = row[h] ?? '';
            return typeof v === 'string' && v.includes(',') ? `"${v}"` : v;
          });
          csvRows.push(values.join(','));
        });
        setOutputVal(csvRows.join('\n'));
      } else if (dir === 'csv-to-sql') {
        const lines = val.trim().split(/\r?\n/);
        const headers = lines[0].split(',').map((h) => h.trim());
        const createStmt = `CREATE TABLE ${tbl} (\n` +
          headers.map((h) => `  ${h} VARCHAR(255)`).join(',\n') +
          `\n);\n\n`;

        const inserts = [];
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i].split(',').map((c) => {
            const cell = c.trim();
            return !isNaN(Number(cell)) && cell !== '' ? cell : `'${cell.replace(/'/g, "''")}'`;
          });
          inserts.push(`INSERT INTO ${tbl} (${headers.join(', ')}) VALUES (${row.join(', ')});`);
        }
        setOutputVal(createStmt + inserts.join('\n'));
      }
    } catch (err) {
      setErrorMsg(`Conversion error: ${err.message}`);
    }
  };

  React.useEffect(() => {
    convertData(inputVal, direction, tableName);
  }, [inputVal, direction, tableName]);

  const handleCopy = () => {
    if (!outputVal) return;
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-4">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side CSV ↔ JSON ↔ SQL Table Converter
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Convert spreadsheets or database exports between CSV, clean JSON arrays, and PostgreSQL/MySQL INSERT statements without server data leaks."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      {/* Mode Tabs */}
      <div className="flex border-b border-[#e6e9ef] overflow-x-auto">
        <button
          onClick={() => {
            setDirection('csv-to-json');
            setInputVal(`id,name,email,role\n1,Alex Johnson,alex@company.com,admin\n2,Taylor Swift,taylor@music.com,creator`);
          }}
          className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition ${
            direction === 'csv-to-json'
              ? 'border-[#6161ff] text-[#6161ff]'
              : 'border-transparent text-[#676879] hover:text-[#1f2532]'
          }`}
        >
          CSV → JSON Array
        </button>
        <button
          onClick={() => {
            setDirection('json-to-csv');
            setInputVal(`[\n  { "id": 1, "name": "Alex Johnson", "email": "alex@company.com" },\n  { "id": 2, "name": "Taylor Swift", "email": "taylor@music.com" }\n]`);
          }}
          className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition ${
            direction === 'json-to-csv'
              ? 'border-[#6161ff] text-[#6161ff]'
              : 'border-transparent text-[#676879] hover:text-[#1f2532]'
          }`}
        >
          JSON → CSV Spreadsheets
        </button>
        <button
          onClick={() => {
            setDirection('csv-to-sql');
            setInputVal(`id,name,email,role\n1,Alex Johnson,alex@company.com,admin\n2,Taylor Swift,taylor@music.com,creator`);
          }}
          className={`px-5 py-3 font-bold text-xs sm:text-sm border-b-2 whitespace-nowrap transition ${
            direction === 'csv-to-sql'
              ? 'border-[#6161ff] text-[#6161ff]'
              : 'border-transparent text-[#676879] hover:text-[#1f2532]'
          }`}
        >
          CSV → SQL INSERT Table Script
        </button>
      </div>

      {direction === 'csv-to-sql' && (
        <div className="flex items-center gap-6">
          <span style={SL}>SQL Table Name:</span>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="h-10 px-3 rounded-lg border border-[#d0d4e4] text-sm font-bold text-[#1f2532]"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div style={SL}>Input {direction.startsWith('csv') ? 'CSV Data' : 'JSON Array'}</div>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            rows={14}
            className="w-full p-6 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span style={SL}>Converted Output</span>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                disabled={!outputVal}
                className="flex items-center gap-3.5 px-3 py-1 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              <NativeShareButton text={outputVal} />
            </div>
          </div>
          <textarea
            value={outputVal}
            readOnly
            rows={14}
            className="w-full p-6 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-[#fbfbfc] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
