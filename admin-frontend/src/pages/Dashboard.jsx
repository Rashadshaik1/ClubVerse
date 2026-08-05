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
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
          }),

          fetch("https://clubverse-nsgq.onrender.com/api/admin/events", {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}` 
            },
          }),

          fetch("https://clubverse-nsgq.onrender.com/api/admin/clubs", {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}` 
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

  // ================= RECENT ACTIVITY (RESTORED FEATURE) =================
  const recentActivity = [
    ...events.slice(0, 3).map((e) => ({
      text: `Event created: ${e.title} (${e.clubId?.name})`,
      date: e.createdAt,
      type: "event",
    })),

    ...users.slice(0, 3).map((u) => ({
      text: `New user registered: ${u.name}`,
      date: u.createdAt,
      type: "user",
    })),

    ...clubs.slice(0, 3).map((c) => ({
      text: `New club created: ${c.name}`,
      date: c.createdAt,
      type: "club",
    })),
  ];

  const sortedActivity = recentActivity
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);

    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) {
      return "Just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    const months = Math.floor(days / 30);

    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Sidebar />

      <div className="w-full lg:ml-72 p-4 sm:p-6 md:p-8 lg:p-10 min-w-0">

        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00C2FF]">
            ClubVerse Dashboard
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Unified SaaS analytics & system monitoring
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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

        {/* RECENT ACTIVITY (RESTORED) */}
        <div className="mt-8 sm:mt-10 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 min-w-0">
          <h2 className="text-[#00C2FF] font-semibold mb-4 text-base sm:text-lg">
            Recent Activity
          </h2>

          <div className="space-y-2">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm">No activity found</p>
            ) : (
              sortedActivity.map((a, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-black/20 border border-white/10 text-xs sm:text-sm text-gray-300 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                >
                  <span className="break-words min-w-0">
                    {a.text}
                  </span>

                  <span className="text-xs text-gray-500 self-start sm:self-auto whitespace-nowrap">
                    {getTimeAgo(a.date)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ================= CARD =================
function Card({ title, value }) {
  return (
    <div className="p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 min-w-0">
      <p className="text-gray-400 text-xs sm:text-sm">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-[#00C2FF]">
        {value}
      </h2>
    </div>
  );
}