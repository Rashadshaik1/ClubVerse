import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import StudentNavbar from "./StudentNavbar";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Building2,
} from "lucide-react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// =====================================================
// REGISTRATION SKELETON
// =====================================================

function RegistrationSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* ================= PAGE TITLE ================= */}

        <div className="mb-8">

          <Skeleton
            height={40}
            width={260}
            borderRadius={10}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

        </div>

        {/* ================= SKELETON CARDS ================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5
        ">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (

            <div
              key={item}
              className="
                bg-white
                rounded-3xl
                overflow-hidden
                shadow-lg
                border
                border-gray-100
              "
            >

              {/* Event Image */}

              <Skeleton
                height={176}
                borderRadius={0}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="p-5">

                {/* Status */}

                <Skeleton
                  width={90}
                  height={24}
                  borderRadius={20}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                {/* Event Title */}

                <div className="mt-4">

                  <Skeleton
                    height={22}
                    count={2}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

                {/* Event Details */}

                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-3">

                    <Skeleton
                      circle
                      width={18}
                      height={18}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                    <Skeleton
                      width="65%"
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                  <div className="flex items-center gap-3">

                    <Skeleton
                      circle
                      width={18}
                      height={18}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                    <Skeleton
                      width="55%"
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                  <div className="flex items-center gap-3">

                    <Skeleton
                      circle
                      width={18}
                      height={18}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                    <Skeleton
                      width="50%"
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                  <div className="flex items-center gap-3">

                    <Skeleton
                      circle
                      width={18}
                      height={18}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                    <Skeleton
                      width="60%"
                      height={16}
                      borderRadius={8}
                      baseColor="#ECE8F8"
                      highlightColor="#F8F7FC"
                    />

                  </div>

                </div>

                {/* Button */}

                <div className="mt-8">

                  <Skeleton
                    height={48}
                    borderRadius={16}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}


// =====================================================
// MAIN PAGE
// =====================================================

export default function MyRegistrations() {

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://clubverse-nsgq.onrender.com/api/registration",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(res.data.data || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  // ================= LOADING =================

  if (loading) {
    return <RegistrationSkeleton />;
  }


  // ================= MAIN UI =================

  return (

    <div className="
      min-h-screen
      bg-gradient-to-br
      from-[#F6F4FF]
      via-[#EEF2FF]
      to-[#E8F3FF]
    ">

      <StudentNavbar />

      <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        py-8
        sm:py-10
        pb-20
      ">

        {/* ================= HEADER ================= */}

        <h1 className="
          text-3xl
          sm:text-4xl
          font-bold
          text-[#4B2E91]
          mb-8
        ">
          My Registrations
        </h1>


        {/* ================= EMPTY STATE ================= */}

        {registrations.length === 0 ? (

          <div className="
            bg-white
            rounded-3xl
            shadow-lg
            p-8
            sm:p-12
            text-center
          ">

            <h2 className="
              text-xl
              sm:text-2xl
              font-bold
              text-[#4B2E91]
            ">
              No Registrations Yet
            </h2>

            <p className="
              mt-4
              text-gray-500
              text-sm
              sm:text-base
            ">
              Register for an event to see it here.
            </p>

          </div>

        ) : (

          /* ================= REGISTRATION GRID ================= */

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-5
          ">

            {registrations.map((reg) => {

              const event = reg.eventId;


              // ================= EVENT UNAVAILABLE =================

              if (!event) {

                return (

                  <div
                    key={reg._id}
                    className="
                      bg-white
                      rounded-3xl
                      shadow-lg
                      p-6
                      border
                      border-red-100
                    "
                  >

                    <h2 className="
                      text-lg
                      font-bold
                      text-red-600
                    ">
                      Event Unavailable
                    </h2>

                    <p className="
                      text-gray-500
                      mt-2
                      text-sm
                    ">
                      This event no longer exists or could not be loaded.
                    </p>

                  </div>

                );

              }


              // ================= EVENT CARD =================

              return (

                <div
                  key={reg._id}
                  className="
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    shadow-lg
                    hover:shadow-2xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    border
                    border-gray-100
                  "
                >

                  {/* ================= IMAGE ================= */}

                  <img
                    src={
                      event.banner ||
                      event.poster ||
                      "https://via.placeholder.com/600x300?text=No+Image"
                    }
                    alt={event.title || "Event"}
                    className="
                      w-full
                      h-44
                      object-cover
                    "
                  />


                  <div className="p-5">

                    {/* ================= STATUS ================= */}

                    <span
                      className={`
                        inline-block
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        mb-4

                        ${
                          event.status === "upcoming"
                            ? "bg-green-100 text-green-700"
                            : event.status === "completed"
                            ? "bg-blue-100 text-blue-700"
                            : event.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      `}
                    >
                      {(event.status || "Unknown").toUpperCase()}
                    </span>


                    {/* ================= TITLE ================= */}

                    <h2 className="
                      text-xl
                      font-bold
                      text-[#4B2E91]
                      line-clamp-2
                    ">
                      {event.title || "Untitled Event"}
                    </h2>


                    {/* ================= DETAILS ================= */}

                    <div className="mt-5 space-y-3">

                      {/* Club */}

                      <div className="
                        flex
                        items-center
                        gap-3
                        text-gray-600
                        text-sm
                      ">

                        <Building2
                          size={18}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {event.clubId?.name || "Unknown Club"}
                        </span>

                      </div>


                      {/* Date */}

                      <div className="
                        flex
                        items-center
                        gap-3
                        text-gray-600
                        text-sm
                      ">

                        <CalendarDays
                          size={18}
                          className="shrink-0"
                        />

                        <span>
                          {event.date
                            ? new Date(event.date).toLocaleDateString()
                            : "Date Not Available"}
                        </span>

                      </div>


                      {/* Time */}

                      <div className="
                        flex
                        items-center
                        gap-3
                        text-gray-600
                        text-sm
                      ">

                        <Clock3
                          size={18}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {event.time || "Time Not Available"}
                        </span>

                      </div>


                      {/* Venue */}

                      <div className="
                        flex
                        items-center
                        gap-3
                        text-gray-600
                        text-sm
                      ">

                        <MapPin
                          size={18}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {event.venue || "Venue Not Available"}
                        </span>

                      </div>

                    </div>


                    {/* ================= BUTTON ================= */}

                    <Link
                      to={`/student/event/${event._id}`}
                      className="block"
                    >

                      <button
                        className="
                          w-full
                          mt-8
                          py-3
                          rounded-2xl
                          bg-[#6D4BC3]
                          text-white
                          font-semibold
                          hover:bg-[#5A3AB2]
                          transition
                        "
                      >
                        View Details
                      </button>

                    </Link>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}