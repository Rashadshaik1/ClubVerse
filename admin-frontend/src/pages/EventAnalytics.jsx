import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

export default function EventAnalytics() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/admin/events", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setEvents(data.data || []);
      } catch (err) {
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  // ================= MONTH WISE DATA (SORTED FIXED) =================
  const monthOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const monthMap = {};

  events.forEach((e) => {
    if (!e?.createdAt) return;

    const month = new Date(e.createdAt).toLocaleString("default", {
      month: "short",
    });

    monthMap[month] = (monthMap[month] || 0) + 1;
  });

  const monthlyData = Object.keys(monthMap)
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
    .map((m) => ({
      month: m,
      count: monthMap[m],
    }));

  // ================= CLUB WISE =================
  const clubMap = {};

  events.forEach((e) => {
    const club = e?.clubId?.name || "Unknown";
    clubMap[club] = (clubMap[club] || 0) + 1;
  });

  const clubData = Object.keys(clubMap).map((c) => ({
    club: c,
    count: clubMap[c],
  }));

  // ================= TYPE WISE =================
  const typeMap = {};

  events.forEach((e) => {
    const type = e?.type || "Other";
    typeMap[type] = (typeMap[type] || 0) + 1;
  });

  const typeData = Object.keys(typeMap).map((t) => ({
    name: t,
    value: typeMap[t],
  }));

  const COLORS = ["#00C2FF", "#FF4D8D", "#A78BFA", "#34D399"];

  return (
    <div className="flex min-h-screen bg-[#0b1220] text-white">
      <Sidebar />

      <div className="ml-72 w-full p-10">

        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          Event Analytics Dashboard
        </h1>

        {/* ================= LINE CHART ================= */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-8">
          <h2 className="text-lg font-semibold mb-4">Monthly Events</h2>

          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#00C2FF"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </div>

        {/* ================= BAR + PIE ================= */}
        <div className="grid grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Club Activity</h2>

            {clubData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={clubData}>
                  <XAxis dataKey="club" stroke="#aaa" />
                  <YAxis stroke="#aaa" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#A78BFA" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No data available</p>
            )}
          </div>

          {/* PIE CHART */}
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">Event Types</h2>

            {typeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={110}
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No data available</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}