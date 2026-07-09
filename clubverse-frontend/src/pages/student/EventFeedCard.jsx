import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Building2
} from "lucide-react";

import EventCountdown from "./EventCountdown";

export default function EventFeedCard({ event }) {

  return (

    <div
      className="
      overflow-hidden
      rounded-3xl
      bg-white/70
      backdrop-blur-xl
      border border-[#DDD4F2]
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >

      {/* ================= POSTER ================= */}

      <div className="relative">

        <img
          src={
            event.poster ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
          }
          alt={event.title}
          className="w-full h-60 object-cover"
        />

        {/* Club Type */}

        <div className="absolute top-4 left-4">

          <span className="px-4 py-1 rounded-full bg-[#6D4BC3] text-white text-xs font-semibold shadow">

            {event.clubId?.type || "Club"}

          </span>

        </div>

        {/* Status */}

        <div className="absolute top-4 right-4">

          <span
            className={`px-4 py-1 rounded-full text-xs font-semibold shadow

            ${
              event.status === "ongoing"

                ? "bg-red-500 text-white"

                : "bg-green-500 text-white"

            }`}
          >

            {event.status?.toUpperCase()}

          </span>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="p-6">

        {/* Title */}

        <h2 className="text-2xl font-bold text-[#4B2E91]">

          {event.title}

        </h2>

        {/* Club */}

        <div className="flex items-center gap-2 mt-2 text-[#6D4BC3]">

          <Building2 size={18} />

          <span className="font-medium">

            {event.clubId?.name || "ClubVerse Club"}

          </span>

        </div>

        {/* Description */}

        <p className="mt-4 text-gray-600 leading-7 line-clamp-3">

          {event.description}

        </p>

        {/* DETAILS */}

        <div className="mt-6 grid grid-cols-2 gap-4">

          <div className="flex items-center gap-3">

            <CalendarDays
              size={18}
              className="text-[#6D4BC3]"
            />

            <span className="text-gray-600">

              {new Date(event.date).toLocaleDateString()}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <Clock3
              size={18}
              className="text-[#6D4BC3]"
            />

            <span className="text-gray-600">

              {event.time || "TBA"}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <MapPin
              size={18}
              className="text-[#6D4BC3]"
            />

            <span className="text-gray-600">

              {event.venue}

            </span>

          </div>

          <div className="flex items-center gap-3">

            <Users
              size={18}
              className="text-[#6D4BC3]"
            />

            <span className="text-gray-600">

              {event.maxParticipants || "Unlimited"} Seats

            </span>

          </div>

        </div>

        {/* Countdown */}

        {event.status === "upcoming" && (

          <EventCountdown
            eventDate={event.date}
          />

        )}

        {/* Buttons */}

        <div className="mt-8 flex gap-4">

          <button
            className="
            flex-1
            py-3
            rounded-xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-[#6D4BC3]
            to-[#8D76D8]
            hover:scale-105
            transition"
          >

            Register Now

          </button>

          <button
            className="
            flex-1
            py-3
            rounded-xl
            border
            border-[#6D4BC3]
            text-[#6D4BC3]
            hover:bg-[#F4F1FF]
            transition"
          >

            View Details

          </button>

        </div>

      </div>

    </div>

  );

}