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

const GallerySkeleton = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">

      {/* SIDEBAR */}
      <ClubSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div
        className={`flex-1 min-w-0 w-full pt-24 px-4 sm:px-6 lg:px-8 pb-12 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >

        <ClubNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* ================= HEADER SKELETON ================= */}
        <div className="mb-5 sm:mb-8 bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-sm">

          <div className="h-7 w-44 sm:w-52 rounded-xl bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

          <div className="h-3 w-64 sm:w-80 max-w-full rounded-lg mt-3 bg-gradient-to-r from-[#e2fafa] via-[#c9f2f3] to-[#e2fafa] animate-pulse" />

        </div>


        {/* ================= GALLERY CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">

          {[1, 2, 3, 4, 5, 6].map((card) => (

            <div
              key={card}
              className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#cceeee] overflow-hidden shadow-sm"
            >

              {/* IMAGE */}
              <div className="relative h-44 sm:h-48 bg-gradient-to-r from-[#d9f7f8] via-[#aee8ea] to-[#d9f7f8] animate-pulse">

                {/* Completed badge */}
                <div className="absolute top-4 right-4">
                  <div className="h-6 w-20 rounded-xl bg-gradient-to-r from-[#c5eeee] via-[#8ddfe2] to-[#c5eeee] animate-pulse" />
                </div>

              </div>


              {/* CARD CONTENT */}
              <div className="p-4 sm:p-5">

                {/* Title */}
                <div className="h-4 w-3/4 rounded-md bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

                {/* Date */}
                <div className="h-3 w-32 rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />


                {/* Bottom section */}
                <div className="mt-5 pt-4 border-t border-[#cceeee] flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    {/* Gallery icon */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#d9f7f8] via-[#aee8ea] to-[#d9f7f8] animate-pulse" />

                    <div className="space-y-2">

                      <div className="h-2.5 w-14 rounded-md bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

                      <div className="h-3 w-20 rounded-md bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

                    </div>

                  </div>


                  {/* Open button */}
                  <div className="h-4 w-12 rounded-md bg-gradient-to-r from-[#d9f7f8] via-[#aee8ea] to-[#d9f7f8] animate-pulse" />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default function Gallery() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

      const res = await axios.get("https://clubverse-nsgq.onrender.com/api/events/my", {
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
if (loading) {
  return (
    <GallerySkeleton
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
     <ClubSidebar
  isOpen={sidebarOpen}
  setIsOpen={setSidebarOpen}
/>

<div
  className={`flex-1 min-w-0 w-full pt-24 px-4 sm:px-6 lg:px-8 pb-12 transition-all duration-300 ${
    sidebarOpen ? "lg:ml-64" : "lg:ml-20"
  }`}
>
  <ClubNavbar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
  />

        <div className="mb-5 sm:mb-8 bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-sm">
          <h1 className="text-xl sm:text-2xl font-black text-[#048c92]">Event Gallery</h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            Browse completed events and manage gallery images.
          </p>
        </div>

      {events.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-md border border-dashed border-[#cceeee] rounded-3xl p-12 text-center max-w-xl mx-auto mt-12">
            <div className="w-14 h-14 rounded-2xl bg-[#048c92]/10 flex items-center justify-center mx-auto">
              <FaRegFolderOpen className="text-2xl text-[#048c92]" />
            </div>
            <h2 className="mt-5 text-lg font-black text-gray-700">No Completed Events</h2>
            <p className="text-sm text-gray-400 mt-2">Complete an event to publish its gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => navigate(`/club/gallery/${event._id}`)}
                className="group bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#cceeee] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col min-w-0"
              >
                <div className="relative h-44 sm:h-48 overflow-hidden border-b border-[#cceeee]/60">
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

                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
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
                        <p className="text-xs sm:text-sm font-black text-[#048c92]">
                          {event.gallery?.length || 0} Photos
                        </p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 sm:gap-2 text-[#048c92] font-black text-[11px] sm:text-xs group-hover:translate-x-1 transition">
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