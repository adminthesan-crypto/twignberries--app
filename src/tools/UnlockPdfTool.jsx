import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Unlock, Upload, FileText, Download, ShieldCheck, AlertCircle, RefreshCw, CheckCircle2, Lock } from 'lucide-react';
import NativeShareButton from '../components/NativeShareButton';

export default function UnlockPdfTool() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [unlockedPdf, setUnlockedPdf] = useState(null);
  const [unlockedPdfUrl, setUnlockedPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileUpload = (e) => {
    setErrorMsg(null);
    setErrorMsg(null);
    setUnlockedPdf(null);
    setUnlockedPdfUrl(null);
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (selected.type !== 'application/pdf') {
      setErrorMsg('Please upload a valid PDF file.');
      return;
    }
    setFile(selected);
  };

  const handleUnlock = async () => {
    if (!file) return;
    setLoading(true);
    setErrorMsg(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Attempt to load PDF and strip security restrictions
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        password: password || undefined,
        ignoreEncryption: true,
      });

      // Save without encryption
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setUnlockedPdf(blob);
      setUnlockedPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      setErrorMsg('Could not unlock PDF. Please verify the password if the document is user-password protected.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!unlockedPdf || !file) return;
    const url = URL.createObjectURL(unlockedPdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = `unlocked-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-6 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-heading font-bold text-[#1f2532]">Unlock PDF (Remove Password & Permissions)</h1>
            <p className="text-sm text-[#676879]">Remove owner password restrictions, copy limits, and printing restrictions from your PDF files.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-red-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy — Decrypted offline in your browser.</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!file ? (
        <label className="dropzone">
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-[#1f2532] font-medium mb-1">Drop locked PDF file here or click to select</p>
          <p className="text-xs text-[#9ca3af]">Strips password protection and access restrictions offline</p>
        </label>
      ) : (
        <div className="bg-[#f6f8fa] border border-[#e6e9ef] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#e6e9ef]">
            <div className="flex items-center gap-6">
              <FileText className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-[#1f2532] font-medium">{file.name}</p>
                <p className="text-xs text-[#9ca3af]">Ready for security removal</p>
              </div>
            </div>
            <button
              onClick={() => { setFile(null); setUnlockedPdf(null); setPassword(''); }}
              className="px-3 py-1.5 text-xs text-[#9ca3af] hover:text-[#1f2532] bg-white rounded-lg border border-[#e6e9ef] hover:border-[#d0d4e4] transition-all"
            >
              Replace PDF
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider block mb-2">
                Document Password (optional if only owner-permission locked):
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#9ca3af] absolute left-3 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter PDF password if required..."
                  className="w-full bg-white border border-[#e6e9ef] rounded-xl py-2.5 pl-10 pr-4 text-[#1f2532] text-sm focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="w-full sm:w-auto py-3 px-6 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-500/20"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Unlocking PDF...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5" />
                  <span>Unlock PDF Now</span>
                </>
              )}
            </button>

            {unlockedPdf && (
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Unlocked PDF</span>
                </button>
                <NativeShareButton 
                  fileUrl={unlockedPdfUrl} 
                  fileName={`unlocked-${file.name}`} 
                  mimeType="application/pdf" 
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
