import React from 'react';

function getMonthDays(year, month) {
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= lastDate; d++) days.push(d);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export default function Calendar({ lightMode, large, calendarSize = 270 }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const days = getMonthDays(year, month);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fg = lightMode ? '#222' : '#fff';
  const todayBg = lightMode ? '#e74c3c' : '#fff';
  const todayFg = lightMode ? '#fff' : '#222';
  return (
    <div style={{
      minWidth: calendarSize,
      fontFamily: 'inherit',
      color: fg,
      background: 'none',
      padding: large ? '2.5rem 3rem' : '1.5rem 2rem',
      fontSize: large ? '2.1rem' : '1.1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ fontSize: large ? '2.2rem' : '1.2rem', fontWeight: 600, marginBottom: large ? 18 : 8, letterSpacing: 1 }}>
        {monthNames[month]} {year}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: large ? 12 : 4, width: '100%' }}>
        {weekDays.map((wd) => (
          <div key={wd} style={{ fontWeight: 500, opacity: 0.7, textAlign: 'center', fontSize: large ? '1.3rem' : '1rem' }}>{wd}</div>
        ))}
        {days.map((d, i) => (
          d ? (
            <div
              key={i}
              style={{
                padding: large ? '0.7em' : '0.5em',
                borderRadius: '50%',
                background: d === today ? todayBg : 'none',
                color: d === today ? todayFg : fg,
                fontWeight: d === today ? 700 : 400,
                textAlign: 'center',
                fontSize: large ? '1.5rem' : '1rem',
                boxShadow: d === today ? '0 0 8px 2px rgba(231,76,60,0.15)' : 'none',
                transition: 'background 0.2s',
              }}
            >{d}</div>
          ) : <div key={i}></div>
        ))}
      </div>
    </div>
  );
}
