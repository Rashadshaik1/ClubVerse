import {
 CalendarDays,
 Clock3,
 MapPin,
 Users,
 Building2
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

{/* Poster */}

<div className="relative">

  <img
    src={
      event.banner ||
      event.poster ||
     "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
    }
    alt={event.title}
    className="w-full h-40 object-cover"
  />


  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />


  {/* Status Badge */}
  <div className="absolute top-4 left-4">

    <span
      className="
      px-4
      py-1
      rounded-full
      text-xs
      font-semibold
      shadow
      bg-green-500
      text-white
      "
    >
      ⏳ UPCOMING
    </span>

  </div>



  {/* Club Type Badge */}
  <div className="absolute top-4 right-4">

    <span
      className={`
      px-4
      py-1
      rounded-full
      text-xs
      font-semibold
      shadow

      ${
        clubTypeColor[event.clubId?.type?.toLowerCase()] ||
        "bg-[#EDE9FE] text-[#6D4BC3]"
      }

      `}
    >

      {event.clubId?.type?.toUpperCase() || "CLUB"}

    </span>

  </div>


</div>

      <div className="p-5">

       <h2 className="text-lg font-bold text-[#4B2E91] line-clamp-2 min-h-[56px]">
          {event.title}
        </h2>

        <div className="flex items-center gap-2 mt-2 text-[#6D4BC3]">

          <Building2 size={17} />

         <span className="font-medium">
  {event.clubId?.name || "Club"}
</span>

        </div>

        <p className="mt-3 text-sm text-gray-600 leading-6 line-clamp-2 min-h-[48px]">
          {event.description}
        </p>

     <div className="mt-4 grid grid-cols-2 gap-3 text-sm">


  {/* Date */}

  <div className="flex items-center gap-3">

    <CalendarDays
      size={18}
      className="text-[#6D4BC3]"
    />

    <span className="text-gray-600">

      {new Date(event.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}

    </span>

  </div>



  {/* Time */}

  <div className="flex items-center gap-3">

    <Clock3
      size={18}
      className="text-[#6D4BC3]"
    />

    <span className="text-gray-600">

      {event.time || "TBA"}

    </span>

  </div>


</div>
      <div className="mt-3 flex items-center gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl p-2">
          <MapPin
            size={18}
            className="text-[#6D4BC3]"
          />

         <span className="line-clamp-1">
  {event.venue}
</span>

        </div>

   <div className="mt-5 p-3 rounded-xl bg-[#F8F5FF]">
  <EventCountdown eventDate={event.date} />
</div>

<div className="mt-5 flex gap-2">


  {/* Main Button */}

  <button
    onClick={() => navigate(`/student/event/${event._id}`)}
    className="
    flex-[2]
    py-2.5
    rounded-xl
    font-semibold
    text-white
    bg-gradient-to-r
    from-[#6D4BC3]
    to-[#8D76D8]
    shadow-md
    hover:scale-[1.02]
    transition-all
    duration-300
    "
  >

    Register Now

  </button>



  {/* Details Button */}

  <button
    onClick={() => navigate(`/student/event/${event._id}`)}
    className="
    flex-1
    py-2.5
    rounded-xl
    border
    border-[#6D4BC3]
    text-[#6D4BC3]
    font-medium
    hover:bg-[#F4F1FF]
    transition-all
    duration-300
    "
  >

    Details

  </button>


</div>

      </div>

    </div>
  );
}