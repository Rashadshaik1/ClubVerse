
import { useEffect, useState } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";


import {
  FaCalendarAlt,
  FaStar,
  FaClock,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

// ================= DASHBOARD SKELETON =================

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">

      <ClubSidebar />

      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12">

        <ClubNavbar />

        {/* ================= HEADER SKELETON ================= */}

        <div className="mb-5 sm:mb-8 bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-sm">

          <div className="h-7 w-64 rounded-xl bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

          <div className="h-3 w-80 max-w-full rounded-lg mt-3 bg-gradient-to-r from-[#e2fafa] via-[#c9f2f3] to-[#e2fafa] animate-pulse" />

        </div>


        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

          {[1, 2, 3, 4].map((card) => (
            <div
              key={card}
              className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm min-w-0"
            >

              {/* Top row */}

              <div className="flex justify-between items-center">

                <div className="h-3 w-28 rounded-md bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#d9f7f8] via-[#aee8ea] to-[#d9f7f8] animate-pulse" />

              </div>


              {/* Number */}

              <div className="mt-5 flex items-center gap-2">

                <div className="h-10 w-20 rounded-xl bg-gradient-to-r from-[#cceff0] via-[#aee8ea] to-[#cceff0] animate-pulse" />

                <div className="h-5 w-16 rounded-lg bg-gradient-to-r from-[#e0f8f8] via-[#c9f0f1] to-[#e0f8f8] animate-pulse" />

              </div>


              {/* Description */}

              <div className="h-3 w-44 rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

            </div>
          ))}

        </div>


        {/* ================= ANALYTICS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-5 sm:mt-8">


          {/* ================= GRAPH SKELETON ================= */}

          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#aee8ea] to-[#d9f7f8] animate-pulse" />

                <div className="h-4 w-36 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

              </div>

              <div className="h-7 w-20 rounded-xl bg-gradient-to-r from-[#e2fafa] via-[#c4eeee] to-[#e2fafa] animate-pulse" />

            </div>


            {/* Graph */}

            <div className="h-56 w-full flex items-end justify-between gap-3 px-3 pt-6 border-b border-[#cceeee]">

              {[35, 55, 25, 70, 45, 80, 40, 60, 30, 75, 50, 65].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex-1 flex items-end justify-center h-full"
                  >

                    <div
                      style={{ height: `${height}%` }}
                      className="w-4 sm:w-6 rounded-t-full bg-gradient-to-t from-[#d9f7f8] via-[#8ddfe2] to-[#bceff0] animate-pulse"
                    />

                  </div>
                )
              )}

            </div>


            {/* Month labels */}

            <div className="flex justify-between px-2 mt-4">

              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month) => (
                <div
                  key={month}
                  className="h-3 w-6 rounded-md bg-gradient-to-r from-[#e0f8f8] via-[#c5eeee] to-[#e0f8f8] animate-pulse"
                />
              ))}

            </div>

          </div>


          {/* ================= STATUS SKELETON ================= */}

          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg">

            <div className="h-4 w-28 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

            <div className="h-3 w-56 max-w-full rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cceff0] to-[#e5fafa] animate-pulse" />

            <div className="space-y-7 mt-10">

              {[1, 2].map((item) => (
                <div key={item}>

                  <div className="flex justify-between mb-2">

                    <div className="h-3 w-32 rounded-md bg-gradient-to-r from-[#dff8f8] via-[#c6eeee] to-[#dff8f8] animate-pulse" />

                    <div className="h-3 w-8 rounded-md bg-gradient-to-r from-[#dff8f8] via-[#c6eeee] to-[#dff8f8] animate-pulse" />

                  </div>

                  <div className="w-full h-2 rounded-full bg-[#e5f7f7] overflow-hidden">

                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#bceff0] via-[#67cdd1] to-[#bceff0] animate-pulse" />

                  </div>

                </div>
              ))}

            </div>


            {/* Quick summary */}

            <div className="mt-10 bg-[#43bfc3]/5 border border-[#43bfc3]/20 rounded-2xl p-4">

              <div className="h-3 w-28 mx-auto rounded-md bg-gradient-to-r from-[#d9f7f8] via-[#9ee2e5] to-[#d9f7f8] animate-pulse" />

              <div className="h-3 w-48 max-w-full mx-auto mt-3 rounded-md bg-gradient-to-r from-[#e5fafa] via-[#c5eeee] to-[#e5fafa] animate-pulse" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default function Dashboard() {
  const [club, setClub] = useState(null);

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    averageRating: 0,
    upcomingEvents: 0,
    completedEvents: 0,
    cancelledEvents: 0,
  });

  const [eventGrowth, setEventGrowth] = useState(0);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://clubverse-nsgq.onrender.com/api";

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const storedClub = JSON.parse(localStorage.getItem("club"));

    if (storedClub) {
      setClub(storedClub);
      fetchAllDashboardData(storedClub._id);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAllDashboardData = async (clubId) => {
    try {
      setLoading(true);

      let allEvents = [];

      // ================= GET EVENTS =================

      try {
        const eventsRes = await axios.get(
          `${API_BASE}/events/my`,
          axiosConfig
        );

        console.log("My Events Response:", eventsRes.data);

        if (Array.isArray(eventsRes.data)) {
          allEvents = eventsRes.data;
        } else if (Array.isArray(eventsRes.data.data)) {
          allEvents = eventsRes.data.data;
        } else if (Array.isArray(eventsRes.data.events)) {
          allEvents = eventsRes.data.events;
        } else {
          allEvents = [];
        }
      } catch (eventErr) {
        console.error("Error fetching events:", eventErr);
        allEvents = [];
      }

      // ================= EVENT STATUS =================

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcoming = allEvents.filter((event) => {
        const eventDate = new Date(event.date || event.startDate);

        return (
          eventDate >= today &&
          event.status !== "cancelled"
        );
      });

      const completed = allEvents.filter((event) => {
        const eventDate = new Date(event.date || event.startDate);

        return (
          eventDate < today &&
          event.status !== "cancelled"
        );
      });

      const cancelled = allEvents.filter(
        (event) => event.status === "cancelled"
      );

      // ================= EVENT GROWTH =================

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const currentMonthEvents = allEvents.filter((event) => {
        const d = new Date(event.date || event.startDate);

        return (
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      });

      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

      const previousYear =
        currentMonth === 0
          ? currentYear - 1
          : currentYear;

      const previousMonthEvents = allEvents.filter((event) => {
        const d = new Date(event.date || event.startDate);

        return (
          d.getMonth() === previousMonth &&
          d.getFullYear() === previousYear
        );
      });

      let growth = 0;

      if (previousMonthEvents.length > 0) {
        growth =
          ((currentMonthEvents.length -
            previousMonthEvents.length) /
            previousMonthEvents.length) *
          100;
      }

      setEventGrowth(Math.round(growth));

      // ================= TOTAL REGISTRATIONS =================
      // Kept in calculation because it may be useful elsewhere.
      // The card itself has been removed from the UI.

      const totalRegs = allEvents.reduce(
        (sum, event) =>
          sum +
          (event.registrations?.length ||
            event.regCount ||
            0),
        0
      );

      // ================= MONTHLY EVENTS =================

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyCounts = months.map((month) => ({
        month,
        count: 0,
      }));

      allEvents.forEach((event) => {
        const d = new Date(event.date || event.startDate);

        if (d.getFullYear() === currentYear) {
          const monthIndex = d.getMonth();

          monthlyCounts[monthIndex].count += 1;
        }
      });

      // ================= AVERAGE RATING =================

      let totalRating = 0;
      let totalFeedbacks = 0;

      allEvents.forEach((event) => {
        if (
          event.feedback &&
          event.feedback.length > 0
        ) {
          event.feedback.forEach((fb) => {
            totalRating += fb.rating;
            totalFeedbacks++;
          });
        }
      });

      const averageRating =
        totalFeedbacks > 0
          ? totalRating / totalFeedbacks
          : 0;

      // ================= SET STATS =================

      setStats({
        totalEvents: allEvents.length,
        totalRegistrations: totalRegs || 0,
        averageRating,
        upcomingEvents: upcoming.length,
        completedEvents: completed.length,
        cancelledEvents: cancelled.length,
      });

      setMonthlyAnalytics(monthlyCounts);
    } catch (err) {
      console.error(
        "Dashboard Error:",
        err
      );
    } finally {
      setLoading(false);
    }
  };

 if (loading) {
  return <DashboardSkeleton />;
}

  const maxEventsCount = Math.max(
    ...monthlyAnalytics.map(
      (month) => month.count
    ),
    1
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">

      <ClubSidebar />

      <div className="flex-1 w-full pt-20 sm:pt-24 px-3 sm:px-6 lg:px-8 pb-8 sm:pb-12 transition-all duration-300 min-w-0">

        <ClubNavbar />

        {/* ================= HEADER ================= */}

        <div className="mb-5 sm:mb-8 bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-sm">

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#048c92] tracking-tight">
              {club?.name || "Club"} Dashboard
            </h1>

            <p className="text-gray-500 font-medium text-[11px] sm:text-xs mt-1">
              View your club events and performance at a glance.
            </p>
          </div>

        </div>

        {/* ================= SUMMARY CARDS ================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

          {/* ================= TOTAL EVENTS ================= */}

          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm min-w-0">

            <div className="flex justify-between items-center text-gray-400">

              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate">
                Total Events
              </span>

              <FaCalendarAlt className="text-sm sm:text-lg text-[#43bfc3] shrink-0" />

            </div>

            <div className="mt-4 flex items-baseline gap-2">

              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#048c92] tracking-tight">
                {stats.totalEvents}
              </span>

              <span className="text-[9px] sm:text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-1 sm:px-1.5 py-0.5 rounded-lg whitespace-nowrap">

                {eventGrowth >= 0 ? (
                  <FaArrowUp className="text-[9px] mr-0.5" />
                ) : (
                  <FaArrowDown className="text-[9px] mr-0.5" />
                )}

                {eventGrowth >= 0 ? "+" : ""}
                {eventGrowth}%

              </span>

            </div>

            <p className="text-gray-400 text-[9px] sm:text-[11px] font-medium mt-1 leading-relaxed">
              Total events created by your club
            </p>

          </div>

          {/* ================= AVERAGE RATING ================= */}

          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm min-w-0">

            <div className="flex justify-between items-center text-gray-400">

              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate">
                Average Rating
              </span>

              <FaStar className="text-sm sm:text-lg text-[#43bfc3] shrink-0" />

            </div>

            <div className="mt-4 flex items-baseline gap-2">

              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#048c92] tracking-tight">
                {stats.averageRating.toFixed(1)}
              </span>

              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-lg">

                ★{" "}
                {stats.averageRating >= 4
                  ? "Excellent"
                  : stats.averageRating >= 3
                  ? "Good"
                  : stats.averageRating > 0
                  ? "Needs Improvement"
                  : "No Ratings"}

              </span>

            </div>

            <p className="text-gray-400 text-[9px] sm:text-[11px] font-medium mt-1 leading-relaxed">
              Average rating from students
            </p>

          </div>

          {/* ================= UPCOMING EVENTS ================= */}

          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm min-w-0">

            <div className="flex justify-between items-center text-gray-400">

              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate">
                Upcoming Events
              </span>

              <FaClock className="text-sm sm:text-lg text-[#43bfc3] shrink-0" />

            </div>

            <div className="mt-4 flex items-baseline gap-2">

              <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#048c92] tracking-tight">
                {stats.upcomingEvents}
              </span>

              {stats.upcomingEvents > 0 && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  Upcoming
                </span>
              )}

            </div>

            <p className="text-gray-400 text-[9px] sm:text-[11px] font-medium mt-1 leading-relaxed">
              Events scheduled for the future
            </p>

          </div>

          {/* ================= CANCELLED EVENTS ================= */}

          <div className="bg-white/60 backdrop-blur-xl border border-red-200 rounded-3xl p-6 shadow-sm">

            <div className="flex justify-between items-center text-gray-400">

              <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 truncate">
                Cancelled Events
              </span>

              <FaCalendarAlt className="text-lg text-red-500" />

            </div>

            <div className="mt-4 flex items-baseline gap-2">

              <span className="text-4xl font-black text-red-500 tracking-tight">
                {stats.cancelledEvents}
              </span>

              {stats.cancelledEvents > 0 && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">
                  Cancelled
                </span>
              )}

            </div>

            <p className="text-gray-400 text-[9px] sm:text-[11px] font-medium mt-1 leading-relaxed">
              Events cancelled by the club
            </p>

          </div>

        </div>

        {/* ================= ANALYTICS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-5 sm:mt-8">

          {/* ================= EVENTS OVERVIEW ================= */}

          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg flex flex-col justify-between min-w-0">

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-2.5">

                <FaChartLine className="text-[#048c92]" />

                <h3 className="text-base font-extrabold text-[#048c92] tracking-tight">
                  Events Overview
                </h3>

              </div>

              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white px-3 py-1 rounded-xl border border-[#e2f8f8]">
                This Year
              </span>

            </div>

            {/* ================= GRAPH ================= */}

            <div className="h-48 sm:h-56 w-full flex items-end justify-between px-1 sm:px-2 pt-5 sm:pt-6 relative border-b border-[#cceeee] overflow-hidden">

              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2 pt-6 opacity-30">

                <div className="border-b border-[#43bfc3]/30 w-full"></div>

                <div className="border-b border-[#43bfc3]/20 w-full"></div>

                <div className="border-b border-[#43bfc3]/10 w-full"></div>

              </div>

              {monthlyAnalytics.map((data, index) => {

                const calculatedPercentage =
                  (data.count /
                    maxEventsCount) *
                  100;

                const dynamicHeight =
                  data.count > 0
                    ? `${calculatedPercentage}%`
                    : "8px";

                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center h-full justify-end group z-10"
                  >

                    <div className="hidden sm:block opacity-0 group-hover:opacity-100 bg-[#048c92] text-white text-[10px] font-black px-2 py-0.5 rounded-lg absolute mb-2 -translate-y-12 transition-all duration-300 shadow-md">

                      {data.count} Events

                    </div>

                    <div
                      style={{
                        height: dynamicHeight,
                      }}
                      className="w-2.5 sm:w-4 lg:w-6 bg-gradient-to-t from-[#048c92]/10 via-[#43bfc3]/40 to-[#048c92] rounded-t-full border-t-2 border-[#048c92] group-hover:brightness-110 group-hover:w-7 transition-all duration-500 relative shadow-sm"
                    >

                      {data.count > 0 && (
                        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-md border border-[#048c92]" />
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

            {/* ================= MONTH LABELS ================= */}

            <div className="flex justify-between px-2 mt-4">

              {monthlyAnalytics.map(
                (data, idx) => (
                  <span
                    key={idx}
                    className="flex-1 text-center text-[9px] sm:text-[11px] font-bold text-gray-400 tracking-tight"
                  >
                    {data.month}
                  </span>
                )
              )}

            </div>

          </div>

          {/* ================= EVENT STATUS ================= */}

          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg flex flex-col justify-between min-w-0">

            <div>

              <h3 className="text-xs sm:text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">
                Event Status
              </h3>

              <p className="text-gray-400 text-[11px] font-medium">
                See how many of your events are upcoming or completed.
              </p>

            </div>

            <div className="space-y-5 sm:space-y-4 my-5 sm:my-4">

              {/* UPCOMING */}

              <div>

                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">

                  <span className="flex items-center gap-1.5">

                    <span className="w-2 h-2 rounded-full bg-[#048c92]" />

                    Upcoming Events

                  </span>

                  <span>
                    {stats.totalEvents > 0
                      ? Math.round(
                          (stats.upcomingEvents /
                            stats.totalEvents) *
                            100
                        )
                      : 0}
                    %
                  </span>

                </div>

                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${
                        stats.totalEvents > 0
                          ? (stats.upcomingEvents /
                              stats.totalEvents) *
                            100
                          : 0
                      }%`,
                    }}
                    className="bg-[#048c92] h-full rounded-full transition-all duration-1000"
                  />

                </div>

              </div>

              {/* COMPLETED */}

              <div>

                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">

                  <span className="flex items-center gap-1.5">

                    <span className="w-2 h-2 rounded-full bg-[#43bfc3]" />

                    Completed Events

                  </span>

                  <span>
                    {stats.totalEvents > 0
                      ? Math.round(
                          (stats.completedEvents /
                            stats.totalEvents) *
                            100
                        )
                      : 0}
                    %
                  </span>

                </div>

                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">

                  <div
                    style={{
                      width: `${
                        stats.totalEvents > 0
                          ? (stats.completedEvents /
                              stats.totalEvents) *
                            100
                          : 0
                      }%`,
                    }}
                    className="bg-[#43bfc3] h-full rounded-full transition-all duration-1000"
                  />

                </div>

              </div>

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="bg-[#43bfc3]/5 border border-[#43bfc3]/20 rounded-2xl p-3 text-center">

              <span className="text-[11px] font-black text-[#048c92] block uppercase tracking-wide">
                Quick Summary
              </span>

              <span className="text-[11px] text-gray-500 font-medium mt-0.5 block">
                You have {stats.upcomingEvents} upcoming events.
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
