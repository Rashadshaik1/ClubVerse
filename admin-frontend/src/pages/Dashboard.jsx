import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [uRes, eRes, cRes] = await Promise.all([
          fetch("https://clubverse-nsgq.onrender.com/api/admin/users", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),

          fetch("https://clubverse-nsgq.onrender.com/api/admin/events", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),

          fetch("https://clubverse-nsgq.onrender.com/api/admin/clubs", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const uData = await uRes.json();
        const eData = await eRes.json();
        const cData = await cRes.json();

        const allUsers = uData.data || [];
        const allEvents = eData.data || [];
        const allClubs = cData.data || [];

        setUsers(allUsers);
        setEvents(allEvents);
        setClubs(allClubs);

        // MONTHLY CHART
        const map = {};
        allEvents.forEach((e) => {
          const month = new Date(e.createdAt).toLocaleString("default", {
            month: "short",
          });
          map[month] = (map[month] || 0) + 1;
        });

        setChartData(
          Object.keys(map).map((m) => ({
            month: m,
            events: map[m],
          }))
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ================= TOP CLUB =================
  const clubMap = {};
  events.forEach((e) => {
    const name = e.clubId?.name;
    if (name) clubMap[name] = (clubMap[name] || 0) + 1;
  });

  const topClub = Object.entries(clubMap).sort((a, b) => b[1] - a[1])[0];

  // ================= RECENT DATA BREAKDOWN =================
  const recentEvents = [...events]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const recentClubs = [...clubs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const getTimeAgo = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const past = new Date(date);

    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  };

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Sidebar />

      <div className="w-full lg:ml-72 pt-20 sm:pt-20 lg:pt-10 p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">
        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00C2FF]">
            ClubVerse Dashboard
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Unified SaaS analytics & system monitoring
          </p>
        </div>

        {/* SIDE-BY-SIDE STATS CARDS */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <Card title="Users" value={users.length} />
          <Card title="Events" value={events.length} />
          <Card title="Clubs" value={clubs.length} />
        </div>

        {/* CHART + INSIGHT */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8 sm:mt-10">
          {/* CHART */}
          <div className="xl:col-span-2 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 min-w-0">
            <h2 className="text-[#00C2FF] font-semibold mb-4 text-base sm:text-lg">
              Event Growth Analytics
            </h2>

            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="month" stroke="#aaa" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#aaa" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="events"
                    stroke="#00C2FF"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* INSIGHT */}
          <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 min-w-0">
            <h2 className="text-[#00C2FF] font-semibold mb-4 text-base sm:text-lg">
              AI Insight
            </h2>

            <p className="text-xs sm:text-sm text-gray-300">
              🧠 Most Active Club:
            </p>

            <p className="text-base sm:text-lg font-bold mt-2 text-green-400 truncate">
              {topClub ? topClub[0] : "No data"}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Based on event creation activity
            </p>
          </div>
        </div>

        {/* RECENT ACTIVITY - SIDE BY SIDE BOXES */}
        <div className="mt-8 sm:mt-10">
          <h2 className="text-[#00C2FF] font-semibold mb-4 text-lg">
            Recent System Activity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. CLUBS BOX */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-pink-400 flex items-center gap-2 text-sm sm:text-base">
                    <span>🏢</span> Recent Clubs
                  </h3>
                  <span className="text-xs text-gray-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                    {clubs.length} total
                  </span>
                </div>

                <div className="space-y-3">
                  {recentClubs.length === 0 ? (
                    <p className="text-xs text-gray-500">No clubs found</p>
                  ) : (
                    recentClubs.map((c) => (
                      <div
                        key={c._id}
                        className="p-3 rounded-xl bg-black/20 border border-white/5"
                      >
                        <p className="text-xs sm:text-sm font-medium truncate text-gray-200">
                          {c.name}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-pink-400/80 capitalize">
                            {c.type || "Club"}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {getTimeAgo(c.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 2. EVENTS BOX */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#00C2FF] flex items-center gap-2 text-sm sm:text-base">
                    <span>📅</span> Recent Events
                  </h3>
                  <span className="text-xs text-gray-400 bg-[#00C2FF]/10 border border-[#00C2FF]/20 px-2 py-0.5 rounded-full">
                    {events.length} total
                  </span>
                </div>

                <div className="space-y-3">
                  {recentEvents.length === 0 ? (
                    <p className="text-xs text-gray-500">No events found</p>
                  ) : (
                    recentEvents.map((e) => (
                      <div
                        key={e._id}
                        className="p-3 rounded-xl bg-black/20 border border-white/5"
                      >
                        <p className="text-xs sm:text-sm font-medium truncate text-gray-200">
                          {e.title}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-[#00C2FF]/80 truncate max-w-[100px]">
                            {e.clubId?.name || "Unknown"}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {getTimeAgo(e.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 3. USERS BOX */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-purple-400 flex items-center gap-2 text-sm sm:text-base">
                    <span>👥</span> New Users
                  </h3>
                  <span className="text-xs text-gray-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    {users.length} total
                  </span>
                </div>

                <div className="space-y-3">
                  {recentUsers.length === 0 ? (
                    <p className="text-xs text-gray-500">No users found</p>
                  ) : (
                    recentUsers.map((u) => (
                      <div
                        key={u._id}
                        className="p-3 rounded-xl bg-black/20 border border-white/5"
                      >
                        <p className="text-xs sm:text-sm font-medium truncate text-gray-200">
                          {u.name}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[11px] text-purple-400/80 truncate max-w-[120px]">
                            {u.email}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {getTimeAgo(u.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= CARD =================
function Card({ title, value }) {
  return (
    <div className="p-3 sm:p-6 rounded-2xl border border-white/10 bg-white/5 min-w-0">
      <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
      <h2 className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2 text-[#00C2FF]">
        {value}
      </h2>
    </div>
  );
}