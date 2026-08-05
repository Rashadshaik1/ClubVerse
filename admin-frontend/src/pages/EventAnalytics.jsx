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
        const res = await fetch("https://clubverse-nsgq.onrender.com/api/admin/events", {
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
    <div className="flex min-h-screen bg-[#0b1220] text-white overflow-x-hidden">
      <Sidebar />

      <div className="lg:ml-72 w-full p-4 sm:p-6 md:p-10 min-w-0">

        <h1 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6 sm:mb-8">
          Event Analytics Dashboard
        </h1>

        {/* ================= LINE CHART ================= */}
        <div className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl mb-6 sm:mb-8 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Monthly Events</h2>

          {monthlyData.length > 0 ? (
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#aaa" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#aaa" tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#00C2FF"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No data available</p>
          )}
        </div>

        {/* ================= BAR + PIE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* BAR CHART */}
          <div className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl min-w-0">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Club Activity</h2>

            {clubData.length > 0 ? (
              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={clubData}>
                    <XAxis dataKey="club" stroke="#aaa" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#aaa" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#A78BFA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No data available</p>
            )}
          </div>

          {/* PIE CHART */}
          <div className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-2xl min-w-0">
            <h2 className="text-base sm:text-lg font-semibold mb-4">Event Types</h2>

            {typeData.length > 0 ? (
              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={80}
                      className="sm:hidden"
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Pie
                      data={typeData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      className="hidden sm:block"
                    >
                      {typeData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No data available</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}