import {
  CalendarDays,
  MapPin,
  Clock3,
  Users,
  Radio
} from "lucide-react";

export default function OngoingEventCard({ event }) {
  const clubType =
    event?.clubId?.type || "social";

  const badgeColor = {
    technical:
      "bg-blue-100 text-blue-700 border-blue-300",
    cultural:
      "bg-pink-100 text-pink-700 border-pink-300",
    social:
      "bg-green-100 text-green-700 border-green-300",
  };

  return (
    <div
      className="
      min-w-[390px]
      rounded-3xl
      overflow-hidden
      bg-white/70
      backdrop-blur-xl
      border border-[#DDD4F2]
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all duration-300"
    >
      {/* Poster */}
      <div className="relative">

        <img
          src={
            event.poster ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
          }
          alt={event.title}
          className="h-56 w-full object-cover"
        />

        {/* LIVE */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
          <Radio size={16} />
          LIVE
        </div>

        {/* Club Type */}
        <div
          className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-semibold border capitalize ${badgeColor[clubType]}`}
        >
          {clubType} Club
        </div>

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#4B2E91]">
          {event.title}
        </h2>

        {/* Club */}
        <p className="mt-1 text-[#6D4BC3] font-medium">
          From{" "}
          <span className="font-bold">
            {event.clubId?.name || "Unknown Club"}
          </span>
        </p>

        {/* Description */}
        <p className="mt-4 text-gray-600 line-clamp-2 leading-7">
          {event.description}
        </p>

        {/* Info */}
        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3 text-gray-600">
            <CalendarDays
              size={18}
              className="text-[#6D4BC3]"
            />
            <span>
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Clock3
              size={18}
              className="text-[#6D4BC3]"
            />
            <span>
              {event.time || "Time Not Available"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <MapPin
              size={18}
              className="text-[#6D4BC3]"
            />
            <span>
              {event.venue || "Venue TBA"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Users
              size={18}
              className="text-[#6D4BC3]"
            />
            <span>
              {event.maxParticipants || "Unlimited"} Participants
            </span>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-7 flex gap-4">

          <button
            className="
            flex-1
            py-3
            rounded-xl
            text-white
            font-semibold
            bg-gradient-to-r
            from-[#6D4BC3]
            to-[#8D76D8]
            hover:scale-105
            transition"
          >
            Join Event
          </button>

          <button
            className="
            flex-1
            py-3
            rounded-xl
            border
            border-[#8D76D8]
            text-[#6D4BC3]
            font-semibold
            hover:bg-[#F4F0FF]
            transition"
          >
            Details
          </button>

        </div>

      </div>
    </div>
  );
}