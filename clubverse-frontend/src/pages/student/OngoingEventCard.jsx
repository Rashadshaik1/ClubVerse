
import {
  CalendarDays,
  MapPin,
  Clock3,
  Users,
  Radio,
} from "lucide-react";

export default function OngoingEventCard({ event }) {
  const clubType = event?.clubId?.type || "social";

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
        w-[calc(100vw-40px)]
        max-w-[320px]
        sm:w-[320px]
        md:w-[350px]
        lg:w-[370px]
        xl:w-[390px]
        shrink-0
        snap-start
        rounded-3xl
        overflow-hidden
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

      {/* ================= BANNER ================= */}

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
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
        />

        {/* Banner Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/65
            via-black/15
            to-transparent
          "
        />

        {/* LIVE */}

        <div
          className="
            absolute
            top-3
            left-3
            sm:top-4
            sm:left-4
            flex
            items-center
            gap-1.5
            sm:gap-2
            bg-red-500
            text-white
            px-3
            sm:px-4
            py-1.5
            sm:py-2
            rounded-full
            shadow-lg
            text-xs
            sm:text-sm
            font-semibold
          "
        >
          <Radio
            size={14}
            className="sm:w-4 sm:h-4"
          />

          LIVE
        </div>

        {/* Club Type */}

        <div
          className={`
            absolute
            top-3
            right-3
            sm:top-4
            sm:right-4
            px-3
            sm:px-4
            py-1.5
            sm:py-2
            rounded-full
            text-[10px]
            sm:text-xs
            font-semibold
            border
            capitalize
            ${badgeColor[clubType]}
          `}
        >
          {clubType} Club
        </div>

        {/* Banner Title */}

        <div
          className="
            absolute
            bottom-3
            left-4
            right-4
            sm:bottom-4
            sm:left-5
            sm:right-5
          "
        >
          <h2
            className="
              text-lg
              sm:text-xl
              md:text-2xl
              font-bold
              text-white
              line-clamp-1
              drop-shadow-lg
            "
          >
            {event.title}
          </h2>
        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div
        className="
          p-4
          sm:p-5
          md:p-6
        "
      >

        {/* Club */}

        <p
          className="
            text-sm
            sm:text-base
            text-[#6D4BC3]
            font-medium
            truncate
          "
        >
          From{" "}
          <span className="font-bold">
            {event.clubId?.name || "Unknown Club"}
          </span>
        </p>


        {/* Description */}

        <p
          className="
            mt-3
            sm:mt-4
            text-sm
            sm:text-base
            text-gray-600
            line-clamp-2
            leading-6
            sm:leading-7
          "
        >
          {event.description}
        </p>


        {/* ================= INFO ================= */}

        <div
          className="
            mt-5
            sm:mt-6
            space-y-3
            sm:space-y-4
          "
        >

          {/* DATE */}

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              sm:text-base
              text-gray-600
            "
          >
            <CalendarDays
              size={17}
              className="text-[#6D4BC3] shrink-0"
            />

            <span className="truncate">
              {new Date(
                event.date
              ).toLocaleDateString()}
            </span>
          </div>


          {/* TIME */}

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              sm:text-base
              text-gray-600
            "
          >
            <Clock3
              size={17}
              className="text-[#6D4BC3] shrink-0"
            />

            <span className="truncate">
              {event.time ||
                "Time Not Available"}
            </span>
          </div>


          {/* VENUE */}

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              sm:text-base
              text-gray-600
            "
          >
            <MapPin
              size={17}
              className="text-[#6D4BC3] shrink-0"
            />

            <span className="truncate">
              {event.venue || "Venue TBA"}
            </span>
          </div>


          {/* PARTICIPANTS */}

          <div
            className="
              flex
              items-center
              gap-3
              text-sm
              sm:text-base
              text-gray-600
            "
          >
            <Users
              size={17}
              className="text-[#6D4BC3] shrink-0"
            />

            <span className="truncate">
              {event.maxParticipants ||
                "Unlimited"}{" "}
              Participants
            </span>
          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        <div
          className="
            mt-6
            sm:mt-7
            flex
            gap-3
            sm:gap-4
          "
        >

          <button
            className="
              flex-1
              min-w-0
              py-2.5
              sm:py-3
              rounded-xl
              text-sm
              sm:text-base
              text-white
              font-semibold
              bg-gradient-to-r
              from-[#6D4BC3]
              to-[#8D76D8]
              hover:scale-[1.03]
              transition
            "
          >
            Join Event
          </button>


          <button
            className="
              flex-1
              min-w-0
              py-2.5
              sm:py-3
              rounded-xl
              text-sm
              sm:text-base
              border
              border-[#8D76D8]
              text-[#6D4BC3]
              font-semibold
              hover:bg-[#F4F0FF]
              transition
            "
          >
            Details
          </button>

        </div>

      </div>

    </div>
  );
}

