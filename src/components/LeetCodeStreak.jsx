import { useEffect, useState } from 'react';

export default function LeetCodeStreak() {
  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/leetcode?username=YOUR_LEETCODE_USERNAME')
      .then(res => {
        // FIX: Check if we got HTML instead of JSON (common in local Vite dev)
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
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading LeetCode stats...</p>;
  if (error) return <p style={{ color: 'var(--slate)', fontFamily: 'monospace' }}>[ {error} ]</p>;

  // Get the last 6 months of dates
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  const days = [];
  for (let d = new Date(sixMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const timestamp = Math.floor(d.getTime() / 1000).toString();
    let count = 0;
    for (const [key, value] of Object.entries(streakData)) {
      if (Math.abs(parseInt(key) - parseInt(timestamp)) < 86400) {
        count = value;
        break;
      }
    }
    days.push({ date: new Date(d), count });
  }

  // Split into weeks for a grid layout
  const weeks = [];
  let currentWeek = [];
  days.forEach((day, index) => {
    if (day.date.getDay() === 0 && index !== 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  weeks.push(currentWeek);

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '10px' }}>
        {weeks.map((week, wIndex) => (
          <div key={wIndex} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {week.map((day, dIndex) => (
              <div 
                key={dIndex} 
                title={`${day.date.toDateString()}: ${day.count} submissions`}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor: day.count === 0 ? 'rgba(0,0,0,0.05)' : day.count < 3 ? '#9be9a8' : day.count < 6 ? '#40c463' : '#216e39'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}