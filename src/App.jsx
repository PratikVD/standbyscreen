

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
      <div
        style={{
          position: 'absolute',
          top: 32,
          right: 40,
          zIndex: 10,
        }}
      >
        <label style={{ cursor: 'pointer', display: 'inline-block' }}>
          <input
            type="checkbox"
            checked={lightMode}
            onChange={() => setLightMode((m) => !m)}
            style={{ display: 'none' }}
          />
          <span
            style={{
              display: 'inline-block',
              width: 54,
              height: 32,
              borderRadius: 20,
              background: lightMode ? '#e0e0e0' : '#222',
              position: 'relative',
              transition: 'background 0.3s',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 3,
                left: lightMode ? 28 : 3,
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: lightMode ? '#fff' : '#444',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
                transition: 'left 0.3s, background 0.3s',
                border: lightMode ? '1px solid #ccc' : '1px solid #333',
              }}
            />
          </span>
        </label>
      </div>
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
