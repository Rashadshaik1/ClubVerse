import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/admin/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

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
    <div className="flex min-h-screen bg-[#05080f] text-white">

      <Sidebar />

      <div className="ml-72 p-10 w-full">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#00C2FF]">
            Events Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Monitor and analyze all club events in real-time
          </p>
        </div>

        {/* EMPTY STATE */}
        {!events.length && (
          <div className="flex justify-center mt-20">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-gray-300">
                No Events Found
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Events will appear here once clubs create them
              </p>
            </div>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {events.map((event) => (
            <div
              key={event._id}
              className="
                group relative p-6 rounded-2xl
                bg-white/5 border border-white/10
                backdrop-blur-xl
                hover:scale-[1.03]
                hover:shadow-glow
                transition-all duration-300
              "
            >

              {/* glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-white/5 blur-xl"></div>

              {/* TITLE */}
              <h2 className="text-lg font-semibold group-hover:text-[#00C2FF] transition">
                {event.title}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                {event.description?.slice(0, 90) || "No description"}...
              </p>

              {/* CLUB */}
              <p className="text-xs text-[#00C2FF] mt-3">
                Club: {event.clubId?.name || "Unknown"}
              </p>

              {/* DATE */}
              <p className="text-xs text-gray-500 mt-1">
                {new Date(event.date || Date.now()).toLocaleDateString()}
              </p>

              {/* STATUS */}
              <div className="mt-4">
                <span className="
                  px-3 py-1 text-xs rounded-full
                  bg-green-500/10 text-green-400
                  border border-green-400/30
                ">
                  Active
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}