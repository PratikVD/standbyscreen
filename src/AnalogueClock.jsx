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
      <circle cx={C} cy={C} r={C-10} fill="none" stroke={clockColor} strokeWidth={S/32} />
      {/* Hour hand - polygon for classic shape */}
      {(() => {
        const length = S/4.5;
        const width = S/22;
        const angle = hour * Math.PI / 180;
        const tipX = C + length * Math.sin(angle);
        const tipY = C - length * Math.cos(angle);
        const baseLeftX = C + (width/2) * Math.cos(angle);
        const baseLeftY = C + (width/2) * Math.sin(angle);
        const baseRightX = C - (width/2) * Math.cos(angle);
        const baseRightY = C - (width/2) * Math.sin(angle);
        return (
          <polygon
            points={`
              ${baseLeftX},${baseLeftY}
              ${tipX},${tipY}
              ${baseRightX},${baseRightY}
            `}
            fill={clockColor}
            stroke={clockColor}
            strokeWidth={S/120}
          />
        );
      })()}
      {/* Minute hand - polygon for classic shape */}
      {(() => {
        const length = S/2.7;
        const width = S/32;
        const angle = minute * Math.PI / 180;
        const tipX = C + length * Math.sin(angle);
        const tipY = C - length * Math.cos(angle);
        const baseLeftX = C + (width/2) * Math.cos(angle);
        const baseLeftY = C + (width/2) * Math.sin(angle);
        const baseRightX = C - (width/2) * Math.cos(angle);
        const baseRightY = C - (width/2) * Math.sin(angle);
        return (
          <polygon
            points={`
              ${baseLeftX},${baseLeftY}
              ${tipX},${tipY}
              ${baseRightX},${baseRightY}
            `}
            fill={clockColor}
            stroke={clockColor}
            strokeWidth={S/180}
          />
        );
      })()}
      {/* Second hand - pointy, no circles, shorter */}
      {(() => {
        const length = S/2.7;
        const tailLength = S/10;
        const width = S/160;
        const angle = second * Math.PI / 180;
        // Pointy polygon
        const tipX = C + length * Math.sin(angle);
        const tipY = C - length * Math.cos(angle);
        const baseLeftX = C + (width/2) * Math.cos(angle);
        const baseLeftY = C + (width/2) * Math.sin(angle);
        const baseRightX = C - (width/2) * Math.cos(angle);
        const baseRightY = C - (width/2) * Math.sin(angle);
        const tailX = C - tailLength * Math.sin(angle);
        const tailY = C + tailLength * Math.cos(angle);
        return (
          <polygon
            points={`
              ${baseLeftX},${baseLeftY}
              ${tipX},${tipY}
              ${baseRightX},${baseRightY}
              ${tailX},${tailY}
            `}
            fill={accentColor}
            stroke={accentColor}
            strokeWidth={S/300}
          />
        );
      })()}
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
