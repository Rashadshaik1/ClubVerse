
import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Building2,
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
        w-full
        overflow-hidden
        rounded-2xl
        sm:rounded-3xl
        bg-white/70
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

      {/* =====================================================
          BANNER
      ===================================================== */}

      <div
        className="
          relative
          h-40
          sm:h-44
          md:h-48
          lg:h-52
          overflow-hidden
        "
      >

        <img
          src={
            event.banner ||
            event.poster ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
          }
          alt={event.title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        {/* Dark Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-black/10
            to-transparent
          "
        />


        {/* =================================================
            STATUS BADGE
        ================================================= */}

        <div
          className="
            absolute
            top-3
            left-3
            sm:top-4
            sm:left-4
          "
        >

          <span
            className="
              inline-flex
              items-center
              px-3
              sm:px-4
              py-1
              sm:py-1.5
              rounded-full
              text-[10px]
              sm:text-xs
              font-semibold
              shadow
              bg-green-500
              text-white
              whitespace-nowrap
            "
          >
            ⏳ UPCOMING
          </span>

        </div>


        {/* =================================================
            CLUB TYPE BADGE
        ================================================= */}

        <div
          className="
            absolute
            top-3
            right-3
            sm:top-4
            sm:right-4
            max-w-[45%]
          "
        >

          <span
            className={`
              inline-flex
              items-center
              justify-center
              px-3
              sm:px-4
              py-1
              sm:py-1.5
              rounded-full
              text-[10px]
              sm:text-xs
              font-semibold
              shadow
              whitespace-nowrap
              truncate
              ${
                clubTypeColor[
                  event.clubId?.type?.toLowerCase()
                ] ||
                "bg-[#EDE9FE] text-[#6D4BC3]"
              }
            `}
          >
            {event.clubId?.type?.toUpperCase() || "CLUB"}
          </span>

        </div>

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          p-4
          sm:p-5
          md:p-6
        "
      >

        {/* =================================================
            TITLE
        ================================================= */}

        <h2
          className="
            text-base
            sm:text-lg
            md:text-xl
            font-bold
            text-[#4B2E91]
            line-clamp-2
            min-h-[48px]
            sm:min-h-[56px]
            leading-6
            sm:leading-7
          "
        >
          {event.title}
        </h2>


        {/* =================================================
            CLUB
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            mt-2
            text-[#6D4BC3]
            min-w-0
          "
        >

          <Building2
            size={17}
            className="shrink-0"
          />

          <span
            className="
              font-medium
              text-sm
              sm:text-base
              truncate
            "
          >
            {event.clubId?.name || "Club"}
          </span>

        </div>


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <p
          className="
            mt-3
            text-xs
            sm:text-sm
            text-gray-600
            leading-5
            sm:leading-6
            line-clamp-2
            min-h-[40px]
            sm:min-h-[48px]
          "
        >
          {event.description}
        </p>


        {/* =================================================
            DATE + TIME
        ================================================= */}

        <div
          className="
            mt-4
            grid
            grid-cols-1
            min-[360px]:grid-cols-2
            gap-2
            sm:gap-3
            text-sm
          "
        >

          {/* DATE */}

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              min-w-0
            "
          >

            <CalendarDays
              size={18}
              className="
                text-[#6D4BC3]
                shrink-0
              "
            />

            <span
              className="
                text-gray-600
                truncate
                text-xs
                sm:text-sm
              "
            >
              {new Date(event.date).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>

          </div>


          {/* TIME */}

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              min-w-0
            "
          >

            <Clock3
              size={18}
              className="
                text-[#6D4BC3]
                shrink-0
              "
            />

            <span
              className="
                text-gray-600
                truncate
                text-xs
                sm:text-sm
              "
            >
              {event.time || "TBA"}
            </span>

          </div>

        </div>


        {/* =================================================
            VENUE
        ================================================= */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            sm:gap-3
            text-xs
            sm:text-sm
            text-gray-600
            bg-gray-50
            rounded-xl
            p-2
            sm:p-2.5
            min-w-0
          "
        >

          <MapPin
            size={18}
            className="
              text-[#6D4BC3]
              shrink-0
            "
          />

          <span
            className="
              truncate
              min-w-0
            "
          >
            {event.venue || "Venue TBA"}
          </span>

        </div>


        {/* =================================================
            COUNTDOWN
        ================================================= */}

        <div
          className="
            mt-4
            sm:mt-5
            p-2.5
            sm:p-3
            rounded-xl
            bg-[#F8F5FF]
            overflow-hidden
          "
        >
          <EventCountdown
            eventDate={event.date}
          />
        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          className="
            mt-4
            sm:mt-5
            flex
            gap-2
            sm:gap-3
          "
        >

          {/* MAIN BUTTON */}

          <button
            onClick={() =>
              navigate(
                `/student/event/${event._id}`
              )
            }
            className="
              flex-[2]
              min-w-0
              py-2.5
              sm:py-3
              px-2
              sm:px-3
              rounded-xl
              font-semibold
              text-xs
              sm:text-sm
              md:text-base
              text-white
              bg-gradient-to-r
              from-[#6D4BC3]
              to-[#8D76D8]
              shadow-md
              hover:scale-[1.02]
              transition-all
              duration-300
              whitespace-nowrap
            "
          >
            Register Now
          </button>


          {/* DETAILS BUTTON */}

          <button
            onClick={() =>
              navigate(
                `/student/event/${event._id}`
              )
            }
            className="
              flex-1
              min-w-0
              py-2.5
              sm:py-3
              px-2
              sm:px-3
              rounded-xl
              border
              border-[#6D4BC3]
              text-[#6D4BC3]
              text-xs
              sm:text-sm
              md:text-base
              font-medium
              hover:bg-[#F4F1FF]
              transition-all
              duration-300
              whitespace-nowrap
            "
          >
            Details
          </button>

        </div>

      </div>

    </div>
  );
}

