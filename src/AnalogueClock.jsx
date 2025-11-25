import React, { useRef, useEffect, useState } from 'react';

function getTimeAngles(date) {
  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hr = date.getHours() % 12;
  return {
    second: sec * 6,
    minute: min * 6 + sec * 0.1,
    hour: hr * 30 + min * 0.5,
  };
}

export default function AnalogueClock({ lightMode, size = 260 }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const { hour, minute, second } = getTimeAngles(now);
  const clockColor = lightMode ? '#222' : '#fff';
  const tickColor = lightMode ? '#888' : '#fff';
  const accentColor = '#e74c3c';
  const S = size;
  const C = S / 2;
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ background: 'none' }}>
      <circle cx={C} cy={C} r={C-10} fill="none" stroke={clockColor} strokeWidth={S/55} />
      {/* Hour hand */}
      <line x1={C} y1={C} x2={C + (S/4.5) * Math.sin(Math.PI * hour / 180)} y2={C - (S/4.5) * Math.cos(Math.PI * hour / 180)} stroke={clockColor} strokeWidth={S/30} strokeLinecap="round" />
      {/* Minute hand */}
      <line x1={C} y1={C} x2={C + (S/3.1) * Math.sin(Math.PI * minute / 180)} y2={C - (S/3.1) * Math.cos(Math.PI * minute / 180)} stroke={clockColor} strokeWidth={S/50} strokeLinecap="round" />
      {/* Second hand */}
      <line x1={C} y1={C} x2={C + (S/2.4) * Math.sin(Math.PI * second / 180)} y2={C - (S/2.4) * Math.cos(Math.PI * second / 180)} stroke={accentColor} strokeWidth={S/110} strokeLinecap="round" />
      {/* Center dot */}
      <circle cx={C} cy={C} r={S/32} fill={accentColor} />
      {/* Ticks */}
      {[...Array(60)].map((_, i) => {
        const angle = i * 6;
        const len = i % 5 === 0 ? S/18 : S/32;
        return (
          <line
            key={i}
            x1={C + (C-20) * Math.sin(Math.PI * angle / 180)}
            y1={C - (C-20) * Math.cos(Math.PI * angle / 180)}
            x2={C + (C-20-len) * Math.sin(Math.PI * angle / 180)}
            y2={C - (C-20-len) * Math.cos(Math.PI * angle / 180)}
            stroke={tickColor}
            strokeWidth={i % 5 === 0 ? S/110 : S/180}
            opacity={i % 5 === 0 ? 0.7 : 0.4}
          />
        );
      })}
    </svg>
  );
}
