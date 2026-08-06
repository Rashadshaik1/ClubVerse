import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import { CalendarDays, MapPin } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function ClubEventsSkeleton() {
  return (
    <>
      <StudentNavbar />

      <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF] py-5 sm:py-7 lg:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Heading */}

          <Skeleton
            width={220}
            height={38}
            borderRadius={10}
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          <Skeleton
            width={320}
            height={18}
            className="mt-3"
            baseColor="#ECE8F8"
            highlightColor="#F8F7FC"
          />

          {/* Filter Buttons */}

          <div className="flex justify-center mt-8 mb-8">

            <div className="flex gap-3">

              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  width={120}
                  height={44}
                  borderRadius={999}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />
              ))}

            </div>

          </div>

          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

            {[1,2,3,4,5,6].map((item)=>(

              <div
                key={item}
                className="rounded-3xl bg-white shadow-lg p-4 border border-gray-100"
              >

                <Skeleton
                  height={200}
                  borderRadius={20}
                  baseColor="#ECE8F8"
                  highlightColor="#F8F7FC"
                />

                <div className="mt-4">

                  <Skeleton
                    height={24}
                    width="75%"
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

                <div className="mt-4 space-y-3">

                  <Skeleton
                    height={16}
                    width="60%"
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                  <Skeleton
                    height={16}
                    width="50%"
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

                <div className="mt-6">

                  <Skeleton
                    height={44}
                    borderRadius={12}
                    baseColor="#ECE8F8"
                    highlightColor="#F8F7FC"
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </>
  );
}

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
  return <ClubEventsSkeleton />;
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
    flex-wrap
    justify-center
    gap-2
    sm:gap-3
    bg-white
    p-2
    rounded-2xl
    sm:rounded-full
    shadow-md
    border
    border-[#E5DFFF]
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
                  transition-all duration-300
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
                  transition-all duration-300
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
                  transition-all duration-300
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
                    shadow-lg
hover:shadow-2xl
hover:-translate-y-1
                    overflow-hidden
                    transition-all duration-300
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
                        hover:scale-110
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
                          transition-all duration-300
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