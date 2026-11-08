import { useEffect, useState } from 'react';

export default function LeetCodeStreak() {
  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/leetcode?username=arindamsamadder18')
      .then(res => {
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Local Vite doesn't support serverless functions. Deploy to Vercel to see this.");
        }
        return res.json();
      })
      .then(data => {
        if (data.data && data.data.matchedUser) {
          const calendar = JSON.parse(data.data.matchedUser.userCalendar.submissionCalendar);
          setStreakData(calendar);
        } else {
          setError('Could not fetch data. Check username.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ color: 'var(--slate)' }}>Loading LeetCode stats...</p>;
  if (error) return <p style={{ color: 'var(--slate)', fontFamily: 'monospace' }}>[ {error} ]</p>;

  // --- Date Math for the Grid ---
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  // Start the grid on a Sunday to align properly
  const startDate = new Date(sixMonthsAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const days = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= today) {
    const timestamp = Math.floor(currentDate.getTime() / 1000).toString();
    let count = 0;
    
    // Check if there are submissions on this day
    for (const [key, value] of Object.entries(streakData)) {
      if (Math.abs(parseInt(key) - parseInt(timestamp)) < 86400) {
        count = value;
        break;
      }
    }
    
    days.push({ 
      date: new Date(currentDate), 
      count,
      month: currentDate.toLocaleString('default', { month: 'short' }),
      dayOfWeek: currentDate.getDay()
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Group into weeks (columns)
  const weeks = [];
  let currentWeek = [];
  days.forEach((day, index) => {
    if (index !== 0 && day.dayOfWeek === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);

  // Extract unique months for top labels
  const months = [];
  let lastMonth = '';
  weeks.forEach(week => {
    const firstDayOfWeek = week[0];
    if (firstDayOfWeek.month !== lastMonth) {
      months.push({ label: firstDayOfWeek.month, index: weeks.indexOf(week) });
      lastMonth = firstDayOfWeek.month;
    }
  });

  return (
    <div style={{ marginTop: '30px', overflowX: 'auto', paddingBottom: '20px' }}>
      
      {/* Month Labels */}
      <div style={{ display: 'flex', marginLeft: '30px', marginBottom: '8px', position: 'relative', height: '20px' }}>
        {months.map((m, i) => (
          <span 
            key={i} 
            style={{ 
              position: 'absolute', 
              left: `${m.index * 16}px`, // 14px box + 2px gap
              fontSize: '0.75rem', 
              color: 'var(--slate)',
              fontFamily: 'monospace'
            }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        {/* Day Labels (Left) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginRight: '8px', paddingTop: '2px' }}>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace' }}></span>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace', lineHeight: '14px' }}>Mon</span>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace' }}></span>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace', lineHeight: '14px' }}>Wed</span>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace' }}></span>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace', lineHeight: '14px' }}>Fri</span>
          <span style={{ height: '14px', fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'monospace' }}></span>
        </div>

        {/* The Grid */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {weeks.map((week, wIndex) => (
            <div key={wIndex} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {Array.from({ length: 7 }).map((_, dIndex) => {
                const day = week[dIndex];
                if (!day) return <div key={dIndex} style={{ width: '14px', height: '14px' }} />; // Empty filler

                // Color logic: 0 = empty, 1-2 = light, 3-5 = medium, 6+ = dark
                let bgColor = 'rgba(255, 255, 255, 0.05)'; // Default dark for empty
                if (day.count > 0 && day.count <= 2) bgColor = 'rgba(100, 255, 218, 0.3)';
                else if (day.count > 2 && day.count <= 5) bgColor = 'rgba(100, 255, 218, 0.6)';
                else if (day.count > 5) bgColor = 'var(--accent)';

                return (
                  <div
                    key={dIndex}
                    title={`${day.date.toDateString()}: ${day.count} submissions`}
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '3px',
                      backgroundColor: bgColor,
                      border: '1px solid rgba(255,255,255,0.02)',
                      transition: 'transform 0.1s, background-color 0.2s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend / Footer */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '5px', marginTop: '15px', fontSize: '0.75rem', color: 'var(--slate)', fontFamily: 'monospace' }}>
        <span>Less</span>
        <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: 'rgba(100, 255, 218, 0.3)' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: 'rgba(100, 255, 218, 0.6)' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: 'var(--accent)' }} />
        <span>More</span>
      </div>
    </div>
  );
}
