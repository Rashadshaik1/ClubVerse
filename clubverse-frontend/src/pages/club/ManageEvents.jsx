import { useEffect, useState } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

import {
  FaCalendarAlt,
  FaHourglassHalf,
  FaRegFolderOpen,
} from "react-icons/fa";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ================= FETCH EVENTS =================
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/events/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.data || res.data.events || [];
        setEvents(data);
      } catch (err) {
        console.log("FETCH EVENTS ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ================= COUNTDOWN =================
  const getTimeLeft = (eventDate) => {
    const diff = new Date(eventDate) - new Date();
    if (diff <= 0) return "Completed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${mins}m`;
  };

  // ================= STATUS =================
  const getStatus = (event) => {
    if (event.status === "cancelled") return "CANCELLED";

    const now = new Date();
    const eventDate = new Date(event.date);

    if (eventDate > now) return "UPCOMING";
    if (eventDate.toDateString() === now.toDateString()) return "TODAY";
    return "COMPLETED";
  };

  if (loading) {
  return <Loader />;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      {/* FIXED SIDEBAR */}
      <ClubSidebar />

      {/* CONTENT CONTAINER */}
      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12 transition-all duration-300">
        <ClubNavbar />

        {/* SIMPLE CLEAN HEADER */}
        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm">
          <h1 className="text-2xl font-black text-[#048c92] tracking-tight">
            Manage Events
          </h1>
        </div>

        {/* ================= MAIN INTERFACE STATE ================= */}
       {events.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-md border border-dashed border-[#cceeee] rounded-3xl p-12 text-center max-w-xl mx-auto mt-12 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#048c92]/5 flex items-center justify-center mx-auto text-[#048c92]">
              <FaRegFolderOpen className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-700">
                No events found
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Your club hasn't launched any events yet.
              </p>
            </div>
            <button
              onClick={() => navigate("/club/create-event")}
              className="bg-[#048c92]/10 hover:bg-[#048c92]/20 text-[#048c92] text-xs font-black px-4 py-2 rounded-xl border border-[#048c92]/20 transition-all"
            >
              Launch First Event
            </button>
          </div>
        ) : (
          /* EVENTS CARD GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
            {events.map((event) => {
              const currentStatus = getStatus(event);

              return (
                <div
                  key={event._id}
                  onClick={() => {
                    if (event.status !== "cancelled") {
                      navigate(`/club/event/${event._id}`);
                    }
                  }}
                  className={`group bg-white/60 backdrop-blur-xl rounded-3xl border border-[#cceeee] overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between ${
                    event.status === "cancelled"
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {/* ARTWORK TOP LAYER */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100 border-b border-[#cceeee]/60">
                    <img
                      src={
                        event.banner ||
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60"
                      }
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="event-banner"
                    />
                    {event.status === "cancelled" && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-600 text-white px-6 py-2 rounded-xl text-lg font-black tracking-widest">
                          CANCELLED
                        </span>
                      </div>
                    )}
                    {/* TIMELINE STATUS STICKER */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase shadow-sm ${
                          currentStatus === "UPCOMING"
                            ? "bg-emerald-500 text-white"
                            : currentStatus === "TODAY"
                              ? "bg-amber-500 text-white animate-pulse"
                              : currentStatus === "CANCELLED"
                                ? "bg-red-600 text-white"
                                : "bg-gray-400 text-white"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </div>
                  </div>

                  {/* METADATA LOWER LAYER */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="text-base font-black text-gray-800 tracking-tight group-hover:text-[#048c92] transition-colors line-clamp-1">
                        {event.title}
                      </h2>

                      <p className="text-[11px] font-bold text-gray-400 mt-1 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-xs text-[#43bfc3]" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {/* COUNTDOWN TRACKER */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Time Remaining
                      </span>
                      <div
                        className={`text-xs font-black flex items-center gap-1 ${currentStatus === "COMPLETED" ? "text-gray-400" : "text-[#048c92]"}`}
                      >
                        <FaHourglassHalf
                          className={`text-[11px] ${currentStatus === "TODAY" ? "animate-spin" : ""}`}
                        />
                        {getTimeLeft(event.date)}
                      </div>
                    </div>
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
