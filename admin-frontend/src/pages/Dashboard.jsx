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
        const [uRes, eRes] = await Promise.all([
          fetch("http://127.0.0.1:5000/api/admin/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          fetch("http://127.0.0.1:5000/api/admin/events", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);

        const uData = await uRes.json();
        const eData = await eRes.json();

        const allUsers = uData.data || [];
        const allEvents = eData.data || [];
        const allClubs = allUsers.filter((u) => u.role === "club");

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
    ...events.slice(-2).map((e) => ({
      text: `Event created: ${e.title} (${e.clubId?.name})`,
      type: "event",
    })),
    ...users.slice(-2).map((u) => ({
      text: `New user registered: ${u.name}`,
      type: "user",
    })),
    ...clubs.slice(-2).map((c) => ({
      text: `New club active: ${c.name}`,
      type: "club",
    })),
  ];

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white">
      <Sidebar />

      <div className="ml-72 w-full p-10">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#00C2FF]">
            ClubVerse Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Unified SaaS analytics & system monitoring
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-6">
          <Card title="Users" value={users.length} />
          <Card title="Events" value={events.length} />
          <Card title="Clubs" value={clubs.length} />
        </div>

        {/* CHART + INSIGHT */}
        <div className="grid grid-cols-3 gap-6 mt-10">

          {/* CHART */}
          <div className="col-span-2 p-6 rounded-2xl border border-white/10 bg-white/5">
            <h2 className="text-[#00C2FF] font-semibold mb-4">
              Event Growth Analytics
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
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

          {/* INSIGHT */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h2 className="text-[#00C2FF] font-semibold mb-4">
              AI Insight
            </h2>

            <p className="text-sm text-gray-300">
              🧠 Most Active Club:
            </p>

            <p className="text-lg font-bold mt-2 text-green-400">
              {topClub ? topClub[0] : "No data"}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Based on event creation activity
            </p>
          </div>
        </div>

        {/* RECENT ACTIVITY (RESTORED) */}
        <div className="mt-10 p-6 rounded-2xl border border-white/10 bg-white/5">
          <h2 className="text-[#00C2FF] font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-2">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm">No activity found</p>
            ) : (
              recentActivity.map((a, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-black/20 border border-white/10 text-sm text-gray-300"
                >
                  {a.text}
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
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-[#00C2FF]">
        {value}
      </h2>
    </div>
  );
}