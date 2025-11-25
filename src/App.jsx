

import { useState } from 'react';
import AnalogueClock from './AnalogueClock';
import Calendar from './Calendar';
import './App.css';

function App() {
  const [lightMode, setLightMode] = useState(false);
  // Responsive sizing
  const isLarge = window.innerWidth > 1200;
  const contentWidth = isLarge ? '80vw' : '98vw';
  // Each half: 50vw, so 70% of half = 35vw
  const clockSize = isLarge ? Math.floor(window.innerWidth * 0.35) : Math.floor(window.innerWidth * 0.45);
  const calendarSize = isLarge ? Math.floor(window.innerWidth * 0.35) : Math.floor(window.innerWidth * 0.45);

  return (
    <div className={`standby-screen${lightMode ? '' : ' dark-mode'}`}> 
      <button
        className="mode-toggle"
        onClick={() => setLightMode((m) => !m)}
        style={{
          position: 'absolute',
          top: 32,
          right: 40,
          zIndex: 10,
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Toggle dark/light mode"
      >
        {lightMode ? (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="10" stroke="#222" strokeWidth="3" fill="#f5f5f5" />
            <path d="M16 6v-3M16 29v-3M6 16h-3M29 16h-3M8.22 8.22l-2.12-2.12M25.9 25.9l-2.12-2.12M8.22 23.78l-2.12 2.12M25.9 6.1l-2.12 2.12" stroke="#222" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="10" stroke="#f5f5f5" strokeWidth="3" fill="#222" />
            <path d="M22 16a6 6 0 0 1-6 6" stroke="#f5f5f5" strokeWidth="2" />
          </svg>
        )}
      </button>
      <div className="standby-content" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: contentWidth, height: '100%', margin: '0 auto', gap: isLarge ? '6vw' : '2vw'}}>
        <div className="standby-left" style={{flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <AnalogueClock lightMode={lightMode} size={clockSize} />
        </div>
        <div className="standby-right" style={{flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          <Calendar lightMode={lightMode} large={isLarge} calendarSize={calendarSize} />
        </div>
      </div>
    </div>
  );
}

export default App;
