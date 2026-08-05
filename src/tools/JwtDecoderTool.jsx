import React, { useState } from 'react';
import { Key, ShieldCheck, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const SL = {
  fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#676879', marginBottom: 12
};

export default function JwtDecoderTool() {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFseGEgSm9obnNvbiIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTQ1NjAwMDAsImV4cCI6MjA1MDAwMDAwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  );
  const [header, setHeader] = useState({});
  const [payload, setPayload] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [status, setStatus] = useState('valid'); // valid, expired, invalid

  const decodeJwt = (jwtStr) => {
    try {
      setErrorMsg(null);
      if (!jwtStr.trim()) {
        setHeader({});
        setPayload({});
        setStatus('invalid');
        return;
      }

      const parts = jwtStr.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format (must have 3 parts separated by dots).');
      }

      const decodeBase64Url = (str) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        return JSON.parse(jsonPayload);
      };

      const h = decodeBase64Url(parts[0]);
      const p = decodeBase64Url(parts[1]);

      setHeader(h);
      setPayload(p);

      if (p.exp) {
        const nowSec = Math.floor(Date.now() / 1000);
        if (p.exp < nowSec) {
          setStatus('expired');
        } else {
          setStatus('valid');
        }
      } else {
        setStatus('valid');
      }
    } catch (err) {
      setErrorMsg(`Decode failed: ${err.message}`);
      setStatus('invalid');
    }
  };

  React.useEffect(() => {
    decodeJwt(token);
  }, [token]);

  const formatTimestamp = (ts) => {
    if (!ts || isNaN(Number(ts))) return 'N/A';
    return new Date(Number(ts) * 1000).toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-2xl bg-[#eceeff] border border-[#d5d9fc] flex items-start gap-3">
        <ShieldCheck className="text-[#6161ff] shrink-0 mt-0.5" size={20} />
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1f2532' }}>
            100% Client-Side JWT Token Decoder & Expiration Inspector
          </h4>
          <p style={{ fontSize: 13, color: '#676879', marginTop: 2 }}>
            "Never paste sensitive production authentication tokens into external JWT websites. We decode header and claims right inside your browser."
          </p>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} />
          {errorMsg}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <span style={SL}>Encoded JWT Token</span>
          {status === 'valid' && (
            <span className="badge badge-success flex items-center gap-1">
              <CheckCircle size={12} /> Token Active & Valid
            </span>
          )}
          {status === 'expired' && (
            <span className="badge badge-danger flex items-center gap-1">
              <Clock size={12} /> Token Expired
            </span>
          )}
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          rows={4}
          placeholder="Paste eyJ..."
          className="w-full p-4 rounded-xl border border-[#d0d4e4] font-mono text-xs text-[#1f2532] bg-white focus:outline-none focus:border-[#6161ff]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div style={SL}>Decoded Header (ALGORITHM & TYPE)</div>
          <pre className="p-4 rounded-xl border border-[#e6e9ef] bg-[#fbfbfc] font-mono text-xs text-[#1f2532] overflow-x-auto min-h-[160px]">
            {JSON.stringify(header, null, 2)}
          </pre>
        </div>

        <div>
          <div style={SL}>Decoded Payload (CLAIMS & USER DATA)</div>
          <pre className="p-4 rounded-xl border border-[#e6e9ef] bg-[#fbfbfc] font-mono text-xs text-[#1f2532] overflow-x-auto min-h-[160px]">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      </div>

      {payload.exp && (
        <div className="p-4 rounded-xl bg-[#f5f6f8] border border-[#e6e9ef] flex items-center justify-between flex-wrap gap-4">
          <div className="text-xs font-bold text-[#676879]">
            Issued At (iat): <span className="font-mono text-[#1f2532]">{formatTimestamp(payload.iat)}</span>
          </div>
          <div className="text-xs font-bold text-[#676879]">
            Expires At (exp): <span className="font-mono text-[#1f2532]">{formatTimestamp(payload.exp)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
