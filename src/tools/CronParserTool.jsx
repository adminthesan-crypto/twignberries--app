import React, { useState } from 'react';
import { Clock, ShieldCheck, AlertCircle, HelpCircle, Calendar } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function CronParserTool() {
  const [cronExpr, setCronExpr] = useState('0 0 * * 0'); // every Sunday at midnight
  const [explanation, setExplanation] = useState('');
  const [fields, setFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const explainCron = (expr) => {
    try {
      setErrorMsg(null);
      const parts = expr.trim().split(/\s+/);
      if (parts.length < 5 || parts.length > 6) {
        throw new Error('Cron expression must have 5 or 6 space-separated fields.');
      }

      const [minute, hour, dom, month, dow] = parts;

      const explainPart = (val, name) => {
        if (val === '*') return `Every ${name}`;
        if (val.startsWith('*/')) return `Every ${val.substring(2)} ${name}s`;
        return `At ${name} ${val}`;
      };

      const breakdown = [
        { name: 'Minute', val: minute, meaning: minute === '*' ? 'Every minute' : `Minute ${minute}` },
        { name: 'Hour', val: hour, meaning: hour === '*' ? 'Every hour' : `Hour ${hour} (24h)` },
        { name: 'Day of Month', val: dom, meaning: dom === '*' ? 'Every day' : `Day ${dom} of month` },
        { name: 'Month', val: month, meaning: month === '*' ? 'Every month' : `Month ${month}` },
        { name: 'Day of Week', val: dow, meaning: dow === '*' ? 'Every day of week' : `Day of week ${dow} (0=Sun)` }
      ];
      setFields(breakdown);

      // Simple heuristic readable summary
      if (expr === '0 0 * * *') {
        setExplanation('At 00:00 (Midnight) every single day');
      } else if (expr === '0 0 * * 0') {
        setExplanation('At 00:00 (Midnight) every Sunday');
      } else if (expr === '*/15 * * * *') {
        setExplanation('Every 15 minutes, 24 hours a day');
      } else if (expr === '0 9 * * 1-5') {
        setExplanation('At 09:00 AM, Monday through Friday (Workdays)');
      } else {
        setExplanation(
          `Schedule runs when Minute is "${minute}", Hour is "${hour}", on Day of Month "${dom}", Month "${month}", and Day of Week "${dow}".`
        );
      }
    } catch (err) {
      setErrorMsg(`Parser error: ${err.message}`);
      setFields([]);
      setExplanation('');
    }
  };

  React.useEffect(() => {
    explainCron(cronExpr);
  }, [cronExpr]);

  const presets = [
    { label: 'Every Midnight', expr: '0 0 * * *' },
    { label: 'Every Sunday Midnight', expr: '0 0 * * 0' },
    { label: 'Every 15 Minutes', expr: '*/15 * * * *' },
    { label: 'Weekdays at 9 AM', expr: '0 9 * * 1-5' },
    { label: 'First day of month', expr: '0 0 1 * *' }
  ];

  return (
    <div className="space-y-10">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Offline Cron Expression Schedule Explainer
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Decode cryptic crontab schedules into human-readable English descriptions with field-by-field breakdown."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      <div className="p-6 rounded-2xl bg-white border border-[#e6e9ef] shadow-sm space-y-8">
        <div>
          <div style={SL}>Cron Schedule Expression</div>
          <input
            type="text"
            value={cronExpr}
            onChange={(e) => setCronExpr(e.target.value)}
            placeholder="e.g. 0 0 * * 0"
            className="w-full h-14 px-4 rounded-xl border border-[#d0d4e4] font-mono text-lg font-bold text-[#1f2532] focus:outline-none focus:border-[#6161ff]"
          />
        </div>

        <div>
          <div style={SL}>Common Preset Schedules</div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => setCronExpr(p.expr)}
                className="px-3 py-1.5 rounded-lg border border-[#e6e9ef] hover:border-[#6161ff] text-xs font-bold text-[#1f2532] bg-[#fbfbfc]"
              >
                {p.label} <span className="font-mono text-[#6161ff]">({p.expr})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {explanation && (
        <div className="p-6 rounded-2xl bg-[#f5f6ff] border border-[#d5d9fc] flex items-center gap-4">
          <Calendar className="text-[#6161ff]" size={32} />
          <div>
            <div className="text-xs font-bold uppercase text-[#6161ff]">Human Readable Translation</div>
            <div className="text-lg font-bold text-[#1f2532] mt-1">{explanation}</div>
          </div>
        </div>
      )}

      {fields.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {fields.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#e6e9ef] shadow-sm text-center flex flex-col gap-1"
            >
              <span className="text-[10px] font-bold uppercase text-[#868894]">{f.name}</span>
              <span className="font-mono text-lg font-bold text-[#6161ff]">{f.val}</span>
              <span className="text-xs font-semibold text-[#1f2532] mt-1">{f.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
