import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global interceptor for all programmatic downloads
const originalClick = HTMLAnchorElement.prototype.click;
HTMLAnchorElement.prototype.click = function() {
  // If the anchor is meant for downloading, has an href, hasn't been explicitly bypassed, 
  // and the DownloadShareModal is mounted and ready to accept data
  if (this.download && this.href && !this.dataset.bypassed && window.showDownloadShareModal) {
    window.showDownloadShareModal({
      url: this.href,
      filename: this.download
    });
    return; // Halt the default click
  }
  return originalClick.apply(this, arguments);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
