import React, { useState } from 'react';
import { Database, Copy, Check, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function SqlFormatterTool() {
  const [inputSql, setInputSql] = useState(
    "select id, name, email, created_at from users where status = 'active' and role in ('admin', 'editor') order by created_at desc limit 50;"
  );
  const [formattedSql, setFormattedSql] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const formatSql = (sql) => {
    try {
      setErrorMsg(null);
      if (!sql.trim()) {
        setFormattedSql('');
        return;
      }

      let res = sql
        .replace(/\s+/g, ' ')
        .replace(/(\b)(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|AS|VALUES|INSERT INTO|UPDATE|SET|DELETE FROM)(\b)/gi, '\n$2')
        .replace(/\b(SELECT|FROM|WHERE|AND|OR|ORDER BY|GROUP BY|HAVING|LIMIT|JOIN|LEFT JOIN|RIGHT JOIN|INNER JOIN|ON|AS|VALUES|INSERT INTO|UPDATE|SET|DELETE FROM)\b/gi, (match) => match.toUpperCase())
        .replace(/,\s*/g, ',\n  ')
        .replace(/\n\s*\n/g, '\n')
        .trim();

      if (res.startsWith('\n')) res = res.substring(1);

      setFormattedSql(res);
    } catch (err) {
      setErrorMsg(`Formatter error: ${err.message}`);
    }
  };

  React.useEffect(() => {
    formatSql(inputSql);
  }, [inputSql]);

  const handleCopy = () => {
    if (!formattedSql) return;
    navigator.clipboard.writeText(formattedSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMinify = () => {
    const minified = inputSql.replace(/\s+/g, ' ').trim();
    setInputSql(minified);
  };

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side SQL Query Formatter & Syntax Cleaner
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Paste messy database queries from logs or ORMs. We uppercase keywords, fix indentation, and format line breaks without sending SQL queries to external servers."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-5">
            <span style={SL}>Raw / Messy SQL Input</span>
            <button
              onClick={handleMinify}
              className="text-xs font-bold text-[#6161ff] hover:underline"
            >
              Minify Query
            </button>
          </div>
          <textarea
            value={inputSql}
            onChange={(e) => setInputSql(e.target.value)}
            rows={14}
            placeholder="Paste your raw SQL query here..."
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-5">
            <span style={SL}>Formatted & Standardized SQL</span>
            <button
              onClick={handleCopy}
              disabled={!formattedSql}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#6161ff] text-white text-xs font-bold hover:bg-[#4e4ee0]"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy SQL'}
            </button>
          </div>
          <textarea
            value={formattedSql}
            readOnly
            rows={14}
            placeholder="Formatted query will appear here..."
            className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-[#fbfbfc] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
