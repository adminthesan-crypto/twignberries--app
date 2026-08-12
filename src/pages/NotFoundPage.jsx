import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main style={{ flex: 1, padding: '80px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ 
          fontFamily: "'Outfit', sans-serif",
          fontSize: '120px', 
          fontWeight: 800, 
          background: 'linear-gradient(135deg, #6161ff, #00b4d8)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          margin: 0,
          lineHeight: 1
        }}>
          404
        </h1>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1f2532', marginTop: '24px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Lost in the cloud?
        </h2>
        <p style={{ fontSize: '18px', color: '#676879', marginBottom: '40px', lineHeight: 1.6 }}>
          Looks like this tool got lost somewhere in a bloated corporate server. 
          Good thing Pahruli works 100% offline. Let's get you back to the arsenal.
        </p>
        <Link to="/" className="pb-cta pb-cta-primary" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          ← Return to the Offline Arsenal
        </Link>
      </div>
    </main>
  );
}
