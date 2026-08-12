import React, { useState, useEffect } from 'react';
import { Download, Share2, X, FileText, Smartphone, Laptop } from 'lucide-react';

export default function DownloadShareModal() {
  const [fileData, setFileData] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.canShare) {
      setCanShare(true);
    }
    
    // Expose global function to intercept downloads
    window.showDownloadShareModal = (data) => {
      setFileData(data);
    };
  }, []);

  if (!fileData) return null;

  const handleDownload = () => {
    const finalFilename = fileData.filename.replace(/(\.[^.]+)$/, '_via_pahruli$1');
    const a = document.createElement('a');
    a.href = fileData.url;
    a.download = finalFilename;
    // We add a custom attribute to bypass our own interceptor in main.jsx
    a.dataset.bypassed = "true";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setFileData(null);
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      
      const response = await fetch(fileData.url);
      const blob = await response.blob();
      const finalFilename = fileData.filename.replace(/(\.[^.]+)$/, '_via_pahruli$1');
      const file = new File([blob], finalFilename, { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: finalFilename,
          text: `Here is ${finalFilename}, processed offline using Pahruli. Try it for free: https://free.pahruli.in`,
          files: [file]
        });
        // Close modal on successful share sheet opening
        setFileData(null);
      } else {
        alert("Native sharing for this file type isn't supported on your current device/browser.");
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Sharing failed:", error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1f2532]/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e6e9ef] bg-[#f8fafc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#1f2532] text-base">File Ready</h3>
              <p className="text-xs text-[#676879] truncate max-w-[200px]">{fileData.filename}</p>
            </div>
          </div>
          <button 
            onClick={() => setFileData(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 text-[#676879]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-[#1f2532] font-medium mb-2 text-center">
            How would you like to export this file?
          </p>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-[#e6e9ef] hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#1f2532]">Save to Device</div>
                  <div className="text-xs text-[#676879]">Download directly to your storage</div>
                </div>
              </div>
              <Laptop className="w-4 h-4 text-[#a0a3af]" />
            </button>

            {canShare && (
              <button
                onClick={handleShare}
                disabled={isSharing}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-[#e6e9ef] hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                    {isSharing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-[#1f2532]">{isSharing ? 'Opening...' : 'Share directly'}</div>
                    <div className="text-xs text-[#676879]">Send via WhatsApp, Mail, AirDrop</div>
                  </div>
                </div>
                <Smartphone className="w-4 h-4 text-[#a0a3af]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
