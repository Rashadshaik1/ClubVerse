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

      <div className="
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
        lg:py-10
        pb-16
        sm:pb-20
      ">

        {/* ================= PAGE TITLE ================= */}

        <div className="mb-6 sm:mb-8">

          <Skeleton
            height={36}
            width="min(260px, 70vw)"
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
          gap-4
          sm:gap-5
          lg:gap-6
        ">

          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (

            <div
              key={item}
              className="
                bg-white
                rounded-2xl
                sm:rounded-3xl
                overflow-hidden
                shadow-lg
                border
                border-gray-100
                min-w-0
              "
            >

              {/* Event Image */}

              <Skeleton
                height={176}
                width="100%"
                borderRadius={0}
                baseColor="#ECE8F8"
                highlightColor="#F8F7FC"
              />

              <div className="p-4 sm:p-5">

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
                    height={21}
                    count={2}
                    borderRadius={8}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

                {/* Event Details */}

                <div className="mt-5 space-y-3">

                  {[1, 2, 3, 4].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <Skeleton
                        circle
                        width={18}
                        height={18}
                        baseColor="#ECE8F8"
                        highlightColor="#F8F7FC"
                      />

                      <Skeleton
                        width={`${50 + item * 5}%`}
                        height={16}
                        borderRadius={8}
                        baseColor="#ECE8F8"
                        highlightColor="#F8F7FC"
                      />

                    </div>

                  ))}

                </div>

                {/* Button */}

                <div className="mt-7 sm:mt-8">

                  <Skeleton
                    height={46}
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
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
        lg:py-10
        pb-16
        sm:pb-20
      ">


        {/* ================= HEADER ================= */}

        <div className="mb-6 sm:mb-8">

          <h1 className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
            text-[#4B2E91]
            leading-tight
          ">
            My Registrations
          </h1>

        </div>


        {/* ================= EMPTY STATE ================= */}

        {registrations.length === 0 ? (

          <div className="
            bg-white
            rounded-2xl
            sm:rounded-3xl
            shadow-lg
            p-6
            sm:p-10
            lg:p-12
            text-center
          ">

            <h2 className="
              text-lg
              sm:text-xl
              md:text-2xl
              font-bold
              text-[#4B2E91]
            ">
              No Registrations Yet
            </h2>

            <p className="
              mt-3
              sm:mt-4
              text-gray-500
              text-sm
              sm:text-base
              leading-6
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
            gap-4
            sm:gap-5
            lg:gap-6
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
                      rounded-2xl
                      sm:rounded-3xl
                      shadow-lg
                      p-5
                      sm:p-6
                      border
                      border-red-100
                      min-w-0
                    "
                  >

                    <h2 className="
                      text-base
                      sm:text-lg
                      font-bold
                      text-red-600
                    ">
                      Event Unavailable
                    </h2>

                    <p className="
                      text-gray-500
                      mt-2
                      text-sm
                      leading-5
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
                    rounded-2xl
                    sm:rounded-3xl
                    overflow-hidden
                    shadow-lg
                    hover:shadow-2xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    border
                    border-gray-100
                    min-w-0
                    flex
                    flex-col
                  "
                >

                  {/* ================= IMAGE ================= */}

                  <div className="
                    w-full
                    h-40
                    sm:h-44
                    md:h-48
                    lg:h-44
                    overflow-hidden
                    bg-gray-100
                    shrink-0
                  ">

                    <img
                      src={
                        event.banner ||
                        event.poster ||
                        "https://via.placeholder.com/600x300?text=No+Image"
                      }
                      alt={event.title || "Event"}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-300
                        hover:scale-105
                      "
                    />

                  </div>


                  <div className="
                    p-4
                    sm:p-5
                    flex
                    flex-col
                    flex-1
                    min-w-0
                  ">


                    {/* ================= STATUS ================= */}

                    <div className="mb-3 sm:mb-4">

                      <span
                        className={`
                          inline-block
                          max-w-full
                          px-3
                          py-1
                          rounded-full
                          text-[10px]
                          sm:text-xs
                          font-semibold
                          truncate

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

                    </div>


                    {/* ================= TITLE ================= */}

                    <h2 className="
                      text-lg
                      sm:text-xl
                      font-bold
                      text-[#4B2E91]
                      line-clamp-2
                      leading-6
                      sm:leading-7
                      min-h-[48px]
                      sm:min-h-[56px]
                      break-words
                    ">
                      {event.title || "Untitled Event"}
                    </h2>


                    {/* ================= DETAILS ================= */}

                    <div className="
                      mt-4
                      sm:mt-5
                      space-y-3
                    ">


                      {/* Club */}

                      <div className="
                        flex
                        items-start
                        gap-3
                        text-gray-600
                        text-xs
                        sm:text-sm
                        min-w-0
                      ">

                        <Building2
                          size={17}
                          className="shrink-0 mt-0.5"
                        />

                        <span className="
                          min-w-0
                          break-words
                          line-clamp-2
                        ">
                          {event.clubId?.name || "Unknown Club"}
                        </span>

                      </div>


                      {/* Date */}

                      <div className="
                        flex
                        items-center
                        gap-3
                        text-gray-600
                        text-xs
                        sm:text-sm
                        min-w-0
                      ">

                        <CalendarDays
                          size={17}
                          className="shrink-0"
                        />

                        <span className="truncate">
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
                        text-xs
                        sm:text-sm
                        min-w-0
                      ">

                        <Clock3
                          size={17}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {event.time || "Time Not Available"}
                        </span>

                      </div>


                      {/* Venue */}

                      <div className="
                        flex
                        items-start
                        gap-3
                        text-gray-600
                        text-xs
                        sm:text-sm
                        min-w-0
                      ">

                        <MapPin
                          size={17}
                          className="shrink-0 mt-0.5"
                        />

                        <span className="
                          min-w-0
                          break-words
                          line-clamp-2
                        ">
                          {event.venue || "Venue Not Available"}
                        </span>

                      </div>


                    </div>


                    {/* ================= BUTTON ================= */}

                    <Link
                      to={`/student/event/${event._id}`}
                      className="
                        block
                        mt-auto
                        pt-6
                        sm:pt-7
                      "
                    >

                      <button
                        className="
                          w-full
                          min-h-[44px]
                          sm:min-h-[48px]
                          py-2.5
                          sm:py-3
                          px-4
                          rounded-xl
                          sm:rounded-2xl
                          bg-[#6D4BC3]
                          text-white
                          text-sm
                          sm:text-base
                          font-semibold
                          hover:bg-[#5A3AB2]
                          active:scale-[0.98]
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