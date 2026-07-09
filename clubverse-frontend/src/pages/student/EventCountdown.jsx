import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

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
  }, [eventDate]);

  const format = (num) => String(num).padStart(2, "0");

  const timerData = [
    {
      label: "Days",
      value: format(timeLeft.days),
    },
    {
      label: "Hours",
      value: format(timeLeft.hours),
    },
    {
      label: "Minutes",
      value: format(timeLeft.minutes),
    },
    {
      label: "Seconds",
      value: format(timeLeft.seconds),
    },
  ];

  return (
    <div className="mt-6">

      {/* Heading */}

      <div className="flex items-center gap-2 mb-4">

        <Clock3
          size={20}
          className="text-[#6D4BC3]"
        />

        <h3 className="text-sm font-semibold text-[#4B2E91]">
          Event Starts In
        </h3>

      </div>

      {/* Timer */}

      <div className="grid grid-cols-4 gap-3">

        {timerData.map((item) => (

          <div
            key={item.label}
            className="
            rounded-2xl
            bg-white/70
            backdrop-blur-xl
            border
            border-[#DDD4F2]
            shadow-md
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
            py-4
            text-center
            "
          >

            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] bg-clip-text text-transparent">

              {item.value}

            </h2>

            <p className="text-xs text-gray-500 mt-1 tracking-wide uppercase">

              {item.label}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}