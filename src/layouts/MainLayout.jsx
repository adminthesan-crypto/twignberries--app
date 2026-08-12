import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CompetitorComparisonModal from '../components/CompetitorComparisonModal';
import DonationModal from '../components/DonationModal';
import DownloadShareModal from '../components/DownloadShareModal';
import TOOLS from '../data/toolsData';

export default function MainLayout() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectCategory = (cat, opts = {}) => {
    setSelectedCategory(cat);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
    }

    setTimeout(() => {
      if (opts.scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById('tools-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectTool = (id) => {
    // Add to recents
    try {
      const recentIds = JSON.parse(localStorage.getItem('tw_recent') || '[]');
      const updated = [id, ...recentIds.filter(i => i !== id)].slice(0, 6);
      localStorage.setItem('tw_recent', JSON.stringify(updated));
    } catch (e) {}

    navigate(`/tool/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Navbar */}
      <Navbar
        tools={TOOLS}
        onSelectTool={handleSelectTool}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        toolsCount={TOOLS.length}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        onOpenDonation={() => setIsDonationModalOpen(true)}
      />

      {/* Body / Main content provided by pages (HomePage or ToolPage) */}
      <div style={{ flex: 1, display: 'flex' }}>
        <Outlet context={{ 
          selectedCategory, 
          handleSelectCategory, 
          handleSelectTool,
          onOpenComparison: () => setIsComparisonModalOpen(true),
          onOpenDonation: () => setIsDonationModalOpen(true)
        }} />
      </div>

      {/* PhantomBuster-Style Multi-Column Footer */}
      <div className="pb-footer no-print" style={{ marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 40, padding: '40px' }}>
        <div style={{ maxWidth: 1040, margin: '0 auto', width: '100%' }}>
          <div className="pb-footer-grid">
            {/* Brand column */}
            <div className="pb-footer-brand">
              <h3>pahruli</h3>
              <p>{TOOLS.length} offline tools for builders and creators. Built by a founder who got tired of tracking pixels and subscription fees.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button onClick={() => setIsDonationModalOpen(true)} className="pb-cta pb-cta-primary" style={{ fontSize: 12, padding: '8px 18px', textDecoration: 'none' }}>
                  ⚡ Support Pahruli
                </button>
              </div>
            </div>

            {/* Tools column */}
            <div className="pb-footer-col">
              <h4>Tools</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('E-Commerce', { scrollToTop: true }); }}>E-Commerce</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('PDF Suite', { scrollToTop: true }); }}>PDF Suite</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('Image & Media', { scrollToTop: true }); }}>Image Tools</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('AI & Dev', { scrollToTop: true }); }}>Developer</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectCategory('Marketing', { scrollToTop: true }); }}>Marketing</a>
            </div>

            {/* Popular column */}
            <div className="pb-footer-col">
              <h4>Popular</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('etsy-fee'); }}>Etsy Calculator</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('merge-pdf'); }}>Merge PDF</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('invoice-generator'); }}>Invoice Generator</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('stripe-fee'); }}>Stripe Calculator</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleSelectTool('image-crop-resize'); }}>Image Cropper</a>
            </div>

            {/* Resources column */}
            <div className="pb-footer-col">
              <h4>Resources</h4>
              <button onClick={() => setIsDonationModalOpen(true)} style={{ fontWeight: 700, color: '#6161ff', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer' }}>Donate</button>
              <a href="#">Privacy</a>
              <a href="#">Changelog</a>
            </div>

            {/* About column */}
            <div className="pb-footer-col">
              <h4>About</h4>
              <a href="#">100% Client-Side</a>
              <a href="#">No Data Collection</a>
              <a href="#">Open Source</a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pb-footer-bottom">
            <span>© 2026 Pahruli. Free forever.</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#6161ff' }}>v8.0.0 · {TOOLS.length} Tools</span>
          </div>
        </div>
      </div>

      <CompetitorComparisonModal 
        isOpen={isComparisonModalOpen} 
        onClose={() => setIsComparisonModalOpen(false)} 
      />
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
      <DownloadShareModal />
    </div>
  );
}
