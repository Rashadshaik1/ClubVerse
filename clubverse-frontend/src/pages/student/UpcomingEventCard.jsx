import {
  CalendarDays,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import EventCountdown from "./EventCountdown";

export default function UpcomingEventCard({ event }) {

  const navigate = useNavigate();

  const clubTypeColor = {
    technical: "bg-[#EDE9FE] text-[#6D4BC3]",
    social: "bg-pink-100 text-pink-600",
    cultural: "bg-orange-100 text-orange-600",
  };

  return (
    <div
      className="
      min-w-[370px]
      rounded-3xl
      overflow-hidden
      bg-white/75
      backdrop-blur-xl
      border
      border-[#DDD4F2]
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >

      {/* Poster */}

      <div className="relative">

        <img
          src={
            event.poster ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
          }
          alt={event.title}
          className="w-full h-52 object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <span
          className="
          absolute
          top-4
          left-4
          px-3
          py-1
          rounded-full
          text-xs
          font-semibold
          bg-green-500
          text-white
          shadow-lg"
        >
          ⏳ Upcoming
        </span>

        <span
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
          ${
            clubTypeColor[event.clubType?.toLowerCase()] ||
            "bg-[#EDE9FE] text-[#6D4BC3]"
          }`}
        >
          {event.clubType || "Club"}
        </span>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold text-[#4B2E91] line-clamp-1">
          {event.title}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-[#6D4BC3]">

          <Building2 size={17} />

          <span className="font-medium">
            From {event.clubName || event.club?.name || "ClubVerse Club"}
          </span>

        </div>

        <p className="mt-4 text-gray-600 leading-7 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-5 flex items-center gap-3 text-gray-600">

          <CalendarDays
            size={18}
            className="text-[#6D4BC3]"
          />

          <span>
            {new Date(event.date).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

        </div>

        <div className="mt-3 flex items-center gap-3 text-gray-600">

          <MapPin
            size={18}
            className="text-[#6D4BC3]"
          />

          <span>{event.venue}</span>

        </div>

        <div className="mt-6">
          <EventCountdown eventDate={event.date} />
        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={() => navigate(`/student/event/${event._id}`)}
            className="
            flex-1
            rounded-xl
            py-3
            bg-gradient-to-r
            from-[#6D4BC3]
            to-[#8D76D8]
            text-white
            font-semibold
            shadow-lg
            hover:scale-[1.02]
            transition"
          >
            View Details
          </button>

          <button
            onClick={() => navigate(`/student/event/${event._id}`)}
            className="
            px-5
            rounded-xl
            border
            border-[#DDD4F2]
            bg-white
            text-[#6D4BC3]
            hover:bg-[#F6F2FF]
            transition"
          >
            <ArrowRight size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}