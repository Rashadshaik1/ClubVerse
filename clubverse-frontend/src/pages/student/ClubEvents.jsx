import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import { CalendarDays, MapPin } from "lucide-react";

const ClubEvents = () => {
  const { id } = useParams();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (id) {
      fetchEvents();
    }
  }, [id]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://clubverse-nsgq.onrender.com/api/events/club/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      setEvents(res.data.data || []);
    } catch (err) {
      console.log(err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((event) => event.status === filter);

  const upcomingCount = events.filter(
    (event) => event.status === "upcoming"
  ).length;

  const completedCount = events.filter(
    (event) => event.status === "completed"
  ).length;

  if (loading) {
    return (
      <>
        <StudentNavbar />

        <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF] flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#E5DFFF] border-t-[#6D4BC3] rounded-full animate-spin mx-auto mb-4"></div>

            <p className="text-gray-600 text-sm sm:text-base">
              Loading Events...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF] py-5 sm:py-7 lg:py-10">
        <div
          className="
            w-full
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* ================= HEADER ================= */}

          <div className="mb-6 sm:mb-8">
            <h1
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-[#4B2E91]
              "
            >
              Club Events
            </h1>

            <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">
              Explore all events organized by this club.
            </p>
          </div>

          {/* ================= FILTERS ================= */}

          <div className="flex justify-center mb-6 sm:mb-8">
            <div
              className="
                w-full
                sm:w-auto
                flex
                gap-2
                sm:gap-3
                bg-white
                p-2
                rounded-2xl
                sm:rounded-full
                shadow-md
                border
                border-[#E5DFFF]
                overflow-x-auto
                scrollbar-hide
              "
            >
              {/* ALL */}

              <button
                onClick={() => setFilter("all")}
                className={`
                  shrink-0
                  px-4
                  sm:px-6
                  py-2
                  sm:py-2.5
                  rounded-full
                  text-sm
                  sm:text-base
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    filter === "all"
                      ? "bg-[#6D4BC3] text-white shadow-sm"
                      : "bg-white text-[#6D4BC3] hover:bg-[#F6F2FF]"
                  }
                `}
              >
                All ({events.length})
              </button>

              {/* UPCOMING */}

              <button
                onClick={() => setFilter("upcoming")}
                className={`
                  shrink-0
                  px-4
                  sm:px-6
                  py-2
                  sm:py-2.5
                  rounded-full
                  text-sm
                  sm:text-base
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    filter === "upcoming"
                      ? "bg-[#6D4BC3] text-white shadow-sm"
                      : "bg-white text-[#6D4BC3] hover:bg-[#F6F2FF]"
                  }
                `}
              >
                Upcoming ({upcomingCount})
              </button>

              {/* COMPLETED */}

              <button
                onClick={() => setFilter("completed")}
                className={`
                  shrink-0
                  px-4
                  sm:px-6
                  py-2
                  sm:py-2.5
                  rounded-full
                  text-sm
                  sm:text-base
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    filter === "completed"
                      ? "bg-[#6D4BC3] text-white shadow-sm"
                      : "bg-white text-[#6D4BC3] hover:bg-[#F6F2FF]"
                  }
                `}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          {/* ================= EVENTS GRID ================= */}

          {filteredEvents.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-4
                sm:gap-5
                lg:gap-6
              "
            >
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="
                    bg-white
                    rounded-2xl
                    sm:rounded-3xl
                    shadow-md
                    hover:shadow-xl
                    overflow-hidden
                    transition-all
                    duration-300
                    min-w-0
                    flex
                    flex-col
                  "
                >
                  {/* EVENT IMAGE */}

                  <div className="w-full h-44 sm:h-48 lg:h-52 overflow-hidden">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="
                        w-full
                        h-full
                        object-cover
                        hover:scale-105
                        transition-transform
                        duration-300
                      "
                    />
                  </div>

                  {/* EVENT CONTENT */}

                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* TITLE */}

                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        font-bold
                        text-[#4B2E91]
                        line-clamp-2
                        leading-6
                        sm:leading-7
                        min-h-[48px]
                      "
                    >
                      {event.title}
                    </h2>

                    {/* EVENT DETAILS */}

                    <div className="mt-3 text-gray-600 space-y-2.5">
                      {/* DATE */}

                      <p
                        className="
                          flex
                          items-start
                          gap-2
                          text-sm
                          sm:text-base
                          min-w-0
                        "
                      >
                        <CalendarDays
                          size={18}
                          className="shrink-0 mt-0.5 text-[#6D4BC3]"
                        />

                        <span className="truncate">
                          {event.date
                            ? new Date(event.date).toLocaleDateString()
                            : "Date not available"}
                        </span>
                      </p>

                      {/* VENUE */}

                      <p
                        className="
                          flex
                          items-start
                          gap-2
                          text-sm
                          sm:text-base
                          min-w-0
                        "
                      >
                        <MapPin
                          size={18}
                          className="shrink-0 mt-0.5 text-[#6D4BC3]"
                        />

                        <span className="truncate">
                          {event.venue || "Venue not available"}
                        </span>
                      </p>
                    </div>

                    {/* BUTTON */}

                    <div className="mt-5">
                      <Link
                        to={`/student/event/${event._id}`}
                        className="
                          w-full
                          sm:w-auto
                          inline-flex
                          items-center
                          justify-center
                          bg-[#6D4BC3]
                          hover:bg-[#5B3FB0]
                          text-white
                          font-medium
                          px-5
                          py-2.5
                          rounded-xl
                          text-sm
                          sm:text-base
                          transition-all
                        "
                      >
                        View Event
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ================= EMPTY STATE ================= */

            <div
              className="
                bg-white
                rounded-2xl
                sm:rounded-3xl
                shadow-md
                p-8
                sm:p-12
                text-center
              "
            >
              <CalendarDays
                size={42}
                className="mx-auto text-[#B9A9E8] mb-4"
              />

              <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                No Events Available
              </h2>

              <p className="text-gray-500 text-sm sm:text-base mt-2">
                There are no{" "}
                {filter === "all" ? "" : filter} events to display.
              </p>

              {filter !== "all" && events.length > 0 && (
                <button
                  onClick={() => setFilter("all")}
                  className="
                    mt-5
                    px-5
                    py-2.5
                    bg-[#6D4BC3]
                    text-white
                    rounded-xl
                    text-sm
                    sm:text-base
                    font-medium
                    hover:bg-[#5B3FB0]
                    transition
                  "
                >
                  View All Events
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClubEvents;