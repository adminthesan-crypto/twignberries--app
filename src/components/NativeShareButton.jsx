import React, { useState, useEffect } from 'react';
import { Share2, RefreshCw } from 'lucide-react';

export default function NativeShareButton({ 
  fileUrl, 
  fileName, 
  mimeType, 
  text, 
  buttonText = "Share",
  className = "w-full sm:w-auto py-3 px-6 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
}) {
  const [sharing, setSharing] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    // Check if navigator.share exists and can potentially share files or text
    if (typeof navigator !== 'undefined' && navigator.canShare) {
      setSupported(true);
    }
  }, []);

  if (!supported) return null; // Don't render if not supported

  const handleShare = async () => {
    try {
      setSharing(true);
      
      let shareData = {
        title: fileName || 'Shared from Pahruli',
      };

      if (text) {
        shareData.text = text;
      }

      if (fileUrl) {
        // Fetch the file from the blob/data URL
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], fileName || 'download', { type: mimeType || blob.type });

        shareData.files = [file];
      }

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        alert("Your device doesn't support native file sharing for this file type.");
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error sharing:", err);
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className={className}
      title="Share directly to WhatsApp, Email, etc."
    >
      {sharing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Share2 className="w-5 h-5" />}
      <span>{sharing ? "Sharing..." : buttonText}</span>
    </button>
  );
}
