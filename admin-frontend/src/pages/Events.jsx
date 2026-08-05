import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://clubverse-nsgq.onrender.com/api/admin/events",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  // ================= LOADER =================
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Sidebar />

      <div className="lg:ml-72 p-4 sm:p-6 md:p-10 w-full min-w-0">
        {/* HEADER */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00C2FF]">
            Events Management
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Monitor and analyze all club events in real-time
          </p>
        </div>

        {/* EMPTY STATE */}
        {!events.length && (
          <div className="flex justify-center mt-12 sm:mt-20">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl max-w-sm sm:max-w-md w-full">
              <h2 className="text-base sm:text-lg font-semibold text-gray-300">
                No Events Found
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                Events will appear here once clubs create them
              </p>
            </div>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="
                group relative p-5 sm:p-6 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-xl
                hover:scale-[1.02] sm:hover:scale-[1.03]
                hover:shadow-glow
                transition-all duration-300
                flex flex-col justify-between
              "
            >
              {/* glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-white/5 blur-xl pointer-events-none"></div>

              <div>
                {/* TITLE */}
                <h2 className="text-base sm:text-lg font-semibold group-hover:text-[#00C2FF] transition truncate">
                  {event.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed break-words">
                  {event.description?.slice(0, 90) || "No description"}...
                </p>
              </div>

              <div>
                {/* CLUB */}
                <p className="text-xs text-[#00C2FF] mt-3 truncate">
                  Club: {event.clubId?.name || "Unknown"}
                </p>

                {/* DATE */}
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(event.date || Date.now()).toLocaleDateString()}
                </p>

                {/* STATUS */}
                <div className="mt-4 flex items-center">
                  <span
                    className={`
                      px-3 py-1 text-xs rounded-full border inline-block
                      ${
                        event.status === "completed"
                          ? "bg-green-500/10 text-green-400 border-green-400/30"
                          : event.status === "cancelled"
                          ? "bg-red-500/10 text-red-400 border-red-400/30"
                          : event.status === "upcoming"
                          ? "bg-blue-500/10 text-blue-400 border-blue-400/30"
                          : "bg-gray-500/10 text-gray-400 border-gray-400/30"
                      }
                    `}
                  >
                    {event.status === "completed"
                      ? "Completed"
                      : event.status === "cancelled"
                      ? "Cancelled"
                      : event.status === "upcoming"
                      ? "Upcoming"
                      : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}