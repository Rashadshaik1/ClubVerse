import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import {
  FaCalendarAlt,
  FaImages,
  FaRegFolderOpen,
  FaArrowRight
} from "react-icons/fa";

export default function Gallery() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedEvents();
  }, []);

  const fetchCompletedEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // Token లేకపోతే లాగిన్ కి పంపేయాలి
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/events/my", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const allEvents = res.data.data || [];
      
   const completedEvents = allEvents.filter(
  event => new Date(event.date) < new Date()
);
      setEvents(completedEvents);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("ERROR FETCHING EVENTS:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      <ClubSidebar />

      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12">
        <ClubNavbar />

        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm">
          <h1 className="text-2xl font-black text-[#048c92]">Event Gallery</h1>
          <p className="text-xs text-gray-500 mt-1">
            Browse completed events and manage gallery images.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center pt-24">
            <div className="w-8 h-8 border-4 border-[#048c92] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-[#048c92] mt-3">Loading Gallery...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-md border border-dashed border-[#cceeee] rounded-3xl p-12 text-center max-w-xl mx-auto mt-12">
            <div className="w-14 h-14 rounded-2xl bg-[#048c92]/10 flex items-center justify-center mx-auto">
              <FaRegFolderOpen className="text-2xl text-[#048c92]" />
            </div>
            <h2 className="mt-5 text-lg font-black text-gray-700">No Completed Events</h2>
            <p className="text-sm text-gray-400 mt-2">Complete an event to publish its gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => navigate(`/club/gallery/${event._id}`)}
                className="group bg-white/60 backdrop-blur-xl rounded-3xl border border-[#cceeee] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden border-b border-[#cceeee]/60">
                  <img
                    src={event.banner || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200"}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-xl bg-[#048c92] text-white text-[10px] font-black tracking-wider shadow">
                      COMPLETED
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-base font-black text-gray-800 line-clamp-1 group-hover:text-[#048c92] transition">
                      {event.title}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-[11px] font-bold text-gray-400">
                      <FaCalendarAlt className="text-[#43bfc3]" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-[#048c92]/10 flex items-center justify-center">
                        <FaImages className="text-[#048c92]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                          Gallery
                        </p>
                        <p className="text-sm font-black text-[#048c92]">
                          {event.gallery?.length || 0} Photos
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-[#048c92] font-black text-xs group-hover:translate-x-1 transition">
                      Open
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}