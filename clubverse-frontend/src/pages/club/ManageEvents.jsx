import { useEffect, useState } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import { useNavigate } from "react-router-dom";

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

        const res = await axios.get(
          "http://localhost:5000/api/events/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data.data || [];
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
  const getStatus = (date) => {
    const now = new Date();
    const eventDate = new Date(date);

    if (eventDate > now) return "UPCOMING";
    if (eventDate.toDateString() === now.toDateString()) return "TODAY";
    return "COMPLETED";
  };

  return (
    <div className="flex min-h-screen bg-[#f4ffff]">
      <ClubSidebar />

      <div className="flex-1 ml-72">
        <ClubNavbar />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-[#048c92] mb-6">
            Manage Events
          </h1>

          {/* ================= LOADING ================= */}
          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-500">No events found</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  onClick={() => navigate(`/club/event/${event._id}`)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition"
                >
                  {/* BANNER */}
                  <img
                    src={event.banner || "https://via.placeholder.com/300"}
                    className="h-40 w-full object-cover"
                    alt="event"
                  />

                  <div className="p-4">
                    {/* TITLE */}
                    <h2 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h2>

                    {/* DATE */}
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toDateString()}
                    </p>

                    {/* STATUS */}
                    <div className="mt-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          getStatus(event.date) === "UPCOMING"
                            ? "bg-green-100 text-green-700"
                            : getStatus(event.date) === "TODAY"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {getStatus(event.date)}
                      </span>
                    </div>

                    {/* COUNTDOWN */}
                    <div className="mt-3 text-sm text-[#048c92] font-semibold">
                      ⏳ {getTimeLeft(event.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}