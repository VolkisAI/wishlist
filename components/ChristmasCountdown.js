'use client';
import { useState, useEffect } from 'react';

export default function ChristmasCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const christmas = new Date(currentYear, 11, 25); // Month is 0-based, so 11 = December
      
      // If Christmas has passed this year, calculate for next year
      if (now > christmas) {
        christmas.setFullYear(currentYear + 1);
      }
      
      const difference = christmas - now;
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 text-center my-8">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 min-w-[100px] border border-white/10">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-gray-400 capitalize">{unit}</div>
        </div>
      ))}
    </div>
  );
} 