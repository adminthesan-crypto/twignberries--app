import React, { useMemo } from 'react';
import { useBackdropContext } from '../contexts/BackdropContext';

const TRANSLATIONS = [
  "Everything runs locally.", // English
  "Todo se ejecuta localmente.", // Spanish
  "Tout s'exécute localement.", // French
  "Alles läuft lokal.", // German
  "Tutto viene eseguito localmente.", // Italian
  "Tudo é executado localmente.", // Portuguese
  "Всё работает локально.", // Russian
  "सब कुछ स्थानीय रूप से चलता है।", // Hindi
  "すべてローカルで実行。", // Japanese
  "一切在本地运行。", // Chinese
  "모든 것이 로컬에서 실행됩니다.", // Korean
  "كل شيء يعمل محليًا.", // Arabic
  "Her şey yerel olarak çalışır." // Turkish
];

export default function GlobalBackdrop() {
  const { isBackdropVisible } = useBackdropContext();

  // Memoize positions so they don't jump around on re-renders
  const { leftItems, rightItems } = useMemo(() => {
    // Shuffle translations
    const shuffled = [...TRANSLATIONS].sort(() => 0.5 - Math.random());
    const half = Math.ceil(shuffled.length / 2);
    const leftText = shuffled.slice(0, half);
    const rightText = shuffled.slice(half);

    // Generate random vertical positions within a range
    const generateItems = (texts, alignRight) => {
      return texts.map((text, i) => {
        // distribute them roughly evenly from top to bottom
        const topPercent = (i / texts.length) * 100 + (Math.random() * 10 - 5);
        // randomize font size slightly between 24px and 42px
        const fontSize = 28 + Math.random() * 24;
        // randomize opacity slightly
        const baseOpacity = 0.05 + Math.random() * 0.05; // 5% to 10%
        
        return {
          id: `${alignRight ? 'r' : 'l'}-${i}`,
          text,
          top: `${Math.max(10, Math.min(90, topPercent))}%`,
          fontSize: `${fontSize}px`,
          baseOpacity,
          [alignRight ? 'right' : 'left']: `${Math.random() * 8 + 2}%`, // 2% to 10% from edge
        };
      });
    };

    return {
      leftItems: generateItems(leftText, false),
      rightItems: generateItems(rightText, true),
    };
  }, []);

  return (
    <div 
      className="backdrop-container no-print" 
      aria-hidden="true" 
      style={{ 
        width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, 
        zIndex: 0, pointerEvents: 'none', overflow: 'hidden',
        opacity: isBackdropVisible ? 1 : 0,
        visibility: isBackdropVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Left Margin Text */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '300px' }}>
        {leftItems.map(item => (
          <div
            key={item.id}
            className="backdrop-text"
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              fontSize: item.fontSize,
              opacity: item.baseOpacity,
              whiteSpace: 'nowrap',
              transform: 'rotate(-2deg)'
            }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Right Margin Text */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: '300px' }}>
        {rightItems.map(item => (
          <div
            key={item.id}
            className="backdrop-text"
            style={{
              position: 'absolute',
              top: item.top,
              right: item.right,
              fontSize: item.fontSize,
              opacity: item.baseOpacity,
              whiteSpace: 'nowrap',
              textAlign: 'right',
              transform: 'rotate(2deg)'
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
      
      {/* Top/Bottom Fade Mask */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, #ffffff 0%, transparent 15%, transparent 85%, #ffffff 100%)',
        pointerEvents: 'none'
      }}></div>
    </div>
  );
}
