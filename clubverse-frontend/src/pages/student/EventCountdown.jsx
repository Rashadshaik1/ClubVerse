import { useEffect, useState } from "react";

export default function EventCountdown({ eventDate }) {
  const calculateTime = () => {
    const difference = new Date(eventDate) - new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 mt-5">

      <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
        <p className="text-xl font-bold">{timeLeft.days}</p>
        <span className="text-xs">Days</span>
      </div>

      <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
        <p className="text-xl font-bold">{timeLeft.hours}</p>
        <span className="text-xs">Hours</span>
      </div>

      <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
        <p className="text-xl font-bold">{timeLeft.minutes}</p>
        <span className="text-xs">Minutes</span>
      </div>

      <div className="bg-blue-100 rounded-lg px-3 py-2 text-center">
        <p className="text-xl font-bold">{timeLeft.seconds}</p>
        <span className="text-xs">Seconds</span>
      </div>

    </div>
  );
}