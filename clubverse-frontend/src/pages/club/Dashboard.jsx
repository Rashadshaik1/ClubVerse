import { useEffect, useState } from "react";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import {
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaClock
} from "react-icons/fa";

export default function Dashboard() {
  const [club, setClub] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("club"));
    if (data) setClub(data);
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">

    <ClubSidebar />

    <div className="flex-1 ml-72">

      <ClubNavbar />

      <div className="p-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#048c92]">
            Welcome, {club?.name}
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your club, events and participants from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg hover:shadow-cyan-200 transition">
            <FaCalendarAlt className="text-[#43bfc3] text-2xl mb-4" />
            <h2 className="text-3xl font-bold text-[#048c92]">0</h2>
            <p className="text-gray-500 mt-2">Total Events</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg hover:shadow-cyan-200 transition">
            <FaUsers className="text-[#43bfc3] text-2xl mb-4" />
            <h2 className="text-3xl font-bold text-[#048c92]">0</h2>
            <p className="text-gray-500 mt-2">Registrations</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg hover:shadow-cyan-200 transition">
            <FaStar className="text-[#43bfc3] text-2xl mb-4" />
            <h2 className="text-3xl font-bold text-[#048c92]">0.0</h2>
            <p className="text-gray-500 mt-2">Average Rating</p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg hover:shadow-cyan-200 transition">
            <FaClock className="text-[#43bfc3] text-2xl mb-4" />
            <h2 className="text-3xl font-bold text-[#048c92]">0</h2>
            <p className="text-gray-500 mt-2">Upcoming Events</p>
          </div>

        </div>

        {/* Club Overview */}
        <div className="mt-8 bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-8 shadow-lg">

          <div className="flex items-center gap-6">

            <img
              src={club?.logo || "https://via.placeholder.com/90"}
              className="w-24 h-24 rounded-full border-4 border-[#43bfc3] object-cover"
              alt=""
            />

            <div>
              <h2 className="text-2xl font-bold text-[#048c92]">
                {club?.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {club?.description || "No description available"}
              </p>

              <span className="inline-block mt-4 px-4 py-1 rounded-full bg-[#43bfc3]/10 text-[#048c92] border border-[#43bfc3]/30">
                {club?.type}
              </span>
            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-8 shadow-lg">

          <h2 className="text-xl font-semibold text-[#048c92] mb-5">
            Recent Activity
          </h2>

          <div className="text-gray-500">
            No recent activities yet.
          </div>

        </div>

      </div>

    </div>

  </div>
);
}