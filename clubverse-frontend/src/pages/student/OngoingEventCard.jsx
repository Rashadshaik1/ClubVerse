import { MapPin, CalendarDays } from "lucide-react";

export default function OngoingEventCard({ event }) {
  return (
    <div className="min-w-[340px] bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

      <img
        src={
          event.poster ||
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
        }
        alt={event.title}
        className="h-44 w-full object-cover"
      />

      <div className="p-5">

        <div className="flex items-center justify-between">

          <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
            🔴 LIVE
          </span>

          <span className="text-sm text-gray-500">
            {event.category}
          </span>

        </div>

        <h2 className="mt-4 text-xl font-bold">
          {event.title}
        </h2>

        <p className="mt-2 text-gray-600 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-5 space-y-2">

          <div className="flex items-center gap-2 text-gray-500">

            <CalendarDays size={18} />

            <span>
              {new Date(event.date).toDateString()}
            </span>

          </div>

          <div className="flex items-center gap-2 text-gray-500">

            <MapPin size={18} />

            <span>{event.venue}</span>

          </div>

        </div>

      </div>

    </div>
  );
}