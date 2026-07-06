import { CalendarDays, MapPin } from "lucide-react";
import EventCountdown from "./EventCountdown";

export default function UpcomingEventCard({ event }) {
  return (
    <div className="min-w-[360px] bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

      <img
        src={
          event.poster ||
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
        }
        alt={event.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">

        <div className="flex items-center justify-between">

          <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
            Upcoming
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

        <EventCountdown
          eventDate={event.date}
        />

      </div>

    </div>
  );
}