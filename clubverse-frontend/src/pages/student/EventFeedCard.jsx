import { CalendarDays, MapPin, Users } from "lucide-react";

export default function EventFeedCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={
          event.poster ||
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
        }
        alt={event.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

            {event.category}

          </span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              event.status === "ongoing"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {event.status}
          </span>

        </div>

        <h2 className="mt-5 text-2xl font-bold">

          {event.title}

        </h2>

        <p className="mt-4 text-gray-600 leading-7">

          {event.description}

        </p>

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-3 text-gray-500">

            <CalendarDays size={18} />

            <span>

              {new Date(event.date).toDateString()}

            </span>

          </div>

          <div className="flex items-center gap-3 text-gray-500">

            <MapPin size={18} />

            <span>

              {event.venue}

            </span>

          </div>

          <div className="flex items-center gap-3 text-gray-500">

            <Users size={18} />

            <span>

              Max Participants : {event.maxParticipants || "Unlimited"}

            </span>

          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">

            Register

          </button>

          <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition">

            View Details

          </button>

        </div>

      </div>

    </div>
  );
}