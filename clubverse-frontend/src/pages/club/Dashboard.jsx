import { useEffect, useState } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import Loader from "../../components/Loader";
import {
  FaCalendarAlt,
  FaUsers,
  FaStar,
  FaClock,
  FaChartLine,
  FaArrowUp,
  FaCheckCircle,
  FaArrowDown
} from "react-icons/fa";

export default function Dashboard() {
  const [club, setClub] = useState(null);

  
  // LIVE ANALYTICS DATA STATES
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    averageRating: 0, 
    upcomingEvents: 0,
    completedEvents: 0,
    cancelledEvents: 0
  });
  const [eventGrowth, setEventGrowth] = useState(0);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api";
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const storedClub = JSON.parse(localStorage.getItem("club"));
    if (storedClub) {
      setClub(storedClub);
      fetchAllDashboardData(storedClub._id);
    }
  }, []);

  const fetchAllDashboardData = async (clubId) => {
    try {
      setLoading(true);
      let allEvents = [];
      
     try {
  const eventsRes = await axios.get(`${API_BASE}/events/my`, axiosConfig);

  console.log("My Events Response:", eventsRes.data);

  // Handle different possible response formats
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

      // LIVE ENGINE FILTERING
      const today = new Date();
      today.setHours(0, 0, 0, 0);

     const upcoming = allEvents.filter(event => {
  const eventDate = new Date(event.date || event.startDate);
  return eventDate >= today && event.status !== "cancelled";
});

     const completed = allEvents.filter(event => {
  const eventDate = new Date(event.date || event.startDate);
  return eventDate < today || event.status === "cancelled";
});

const cancelled = allEvents.filter(
  event => event.status === "cancelled"
);
     // EVENT GROWTH CALCULATION
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const currentMonthEvents = allEvents.filter(event => {
  const d = new Date(event.date || event.startDate);

  return (
    d.getMonth() === currentMonth &&
    d.getFullYear() === currentYear
  );
});


const previousMonthEvents = allEvents.filter(event => {
  const d = new Date(event.date || event.startDate);

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 
    ? currentYear - 1 
    : currentYear;

  return (
    d.getMonth() === previousMonth &&
    d.getFullYear() === previousYear
  );
});


let growth = 0;

if(previousMonthEvents.length > 0){
  growth =
  ((currentMonthEvents.length - previousMonthEvents.length)
  / previousMonthEvents.length) * 100;
}

setEventGrowth(Math.round(growth));
      const totalRegs = allEvents.reduce((sum, event) => sum + (event.registrations?.length || event.regCount || 0), 0);

      // ANALYTICS ENGINE GENERATOR
const months = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec"
];

const monthlyCounts = months.map(m => ({
  month: m,
  count: 0
}));
      
      allEvents.forEach(event => {
        const d = new Date(event.date || event.startDate);
        if (d.getFullYear() === currentYear) {
          const monthIndex = d.getMonth();
          monthlyCounts[monthIndex].count += 1;
        }
      });
      
      let totalRating = 0;
let totalFeedbacks = 0;

allEvents.forEach(event => {
  if (event.feedback && event.feedback.length > 0) {
    event.feedback.forEach(fb => {
      totalRating += fb.rating;
      totalFeedbacks++;
    });
  }
});

const averageRating =
  totalFeedbacks > 0
    ? totalRating / totalFeedbacks
    : 0;
      setStats({
        totalEvents: allEvents.length,
        totalRegistrations: totalRegs || 0,
        averageRating: averageRating, 
        upcomingEvents: upcoming.length,
        completedEvents: completed.length,
        cancelledEvents: cancelled.length
      });


      setMonthlyAnalytics(monthlyCounts);

      

    } catch (err) {
      console.error("Analytics Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if(loading){
  return <Loader />;
}

  const maxEventsCount = Math.max(...monthlyAnalytics.map(m => m.count), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      <ClubSidebar />

      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12 transition-all duration-300">
        <ClubNavbar />

        {/* HERO INSIGHT BANNER */}
        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#048c92] tracking-tight">
              {club?.name || "Workspace"} Analytics
            </h1>
            <p className="text-gray-500 font-medium text-xs mt-1">
              Live operational monitoring and event conversions overview.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#048c92]/5 border border-[#43bfc3]/20 px-4 py-2 rounded-2xl text-[#048c92] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Live System Tracking Active
          </div>
        </div>

        {/* METRICS COUNTERS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          
          {/* Total Events */}
          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Events</span>
              <FaCalendarAlt className="text-lg text-[#43bfc3]" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#048c92] tracking-tight">{stats.totalEvents}</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-lg">
               {eventGrowth >= 0 ? (
  <FaArrowUp className="text-[9px] mr-0.5" />
) : (
  <FaArrowDown className="text-[9px] mr-0.5" />
)}
{eventGrowth >= 0 ? "+" : ""}
{eventGrowth}%
              </span>
            </div>
            <p className="text-gray-400 text-[11px] font-medium mt-1">Total events published natively</p>
          </div>

          {/* Total Registrations */}
          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Registrations</span>
              <FaUsers className="text-lg text-[#43bfc3]" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#048c92] tracking-tight">{stats.totalRegistrations}</span>
              <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded-lg">User Base</span>
            </div>
            <p className="text-gray-400 text-[11px] font-medium mt-1">Live active conversions registered</p>
          </div>

          {/* Average Rating */}
          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Average Rating</span>
              <FaStar className="text-lg text-[#43bfc3]" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#048c92] tracking-tight">{stats.averageRating.toFixed(1)}</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-lg">
  ★ {
    stats.averageRating >= 4
      ? "Excellent"
      : stats.averageRating >= 3
      ? "Good"
      : stats.averageRating > 0
      ? "Needs Improvement"
      : "No Ratings"
  }
</span>
            </div>
            <p className="text-gray-400 text-[11px] font-medium mt-1">User experience rating index</p>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Upcoming Events</span>
              <FaClock className="text-lg text-[#43bfc3]" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#048c92] tracking-tight">{stats.upcomingEvents}</span>
              {stats.upcomingEvents > 0 && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg animate-pulse">In-Flight</span>
              )}
            </div>
            <p className="text-gray-400 text-[11px] font-medium mt-1">Upcoming events pipelines open</p>
          </div>

          {/* Cancelled Events */}
<div className="bg-white/60 backdrop-blur-xl border border-red-200 rounded-3xl p-6 shadow-sm">
  <div className="flex justify-between items-center text-gray-400">
    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
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

  <p className="text-gray-400 text-[11px] font-medium mt-1">
    Events cancelled by the club
  </p>
</div>
        </div>

        

        {/* DYNAMIC ANALYTICS AREA GRAPH & PROGRESS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* ADVANCED PERFORMANCE WAVE GRAPH */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <FaChartLine className="text-[#048c92]" />
                <h3 className="text-base font-extrabold text-[#048c92] tracking-tight">Events Analytics Timeline</h3>
              </div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white px-3 py-1 rounded-xl border border-[#e2f8f8]">Dynamic Wave Profile</span>
            </div>

            {/* Premium Analytics Smooth Peaks Interface */}
            <div className="h-56 w-full flex items-end justify-between px-2 pt-6 relative border-b border-[#cceeee]">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-2 pt-6 opacity-30">
                <div className="border-b border-[#43bfc3]/30 w-full text-[9px] font-bold text-gray-400 text-left">Max Conversion Peak</div>
                <div className="border-b border-[#43bfc3]/20 w-full"></div>
                <div className="border-b border-[#43bfc3]/10 w-full"></div>
              </div>

              {monthlyAnalytics.map((data, index) => {
                const calculatedPercentage = (data.count / maxEventsCount) * 100;
                const dynamicHeight = data.count > 0 ? `${calculatedPercentage}%` : "8px";

                return (
                  <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group z-10">
                    <div className="opacity-0 group-hover:opacity-100 bg-[#048c92] text-white text-[10px] font-black px-2 py-0.5 rounded-lg absolute mb-2 -translate-y-12 transition-all duration-300 shadow-md">
                      {data.count} Events
                    </div>

                    <div 
                      style={{ height: dynamicHeight }}
                      className="w-4 sm:w-6 bg-gradient-to-t from-[#048c92]/10 via-[#43bfc3]/40 to-[#048c92] rounded-t-full border-t-2 border-[#048c92] group-hover:brightness-110 group-hover:w-7 transition-all duration-500 relative shadow-sm"
                    >
                      {data.count > 0 && <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-md border border-[#048c92]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Labels */}
            <div className="flex justify-between px-2 mt-4">
              {monthlyAnalytics.map((data, idx) => (
                <span key={idx} className="flex-1 text-center text-[11px] font-bold text-gray-400 tracking-tight">
                  {data.month}
                </span>
              ))}
            </div>
          </div>

          {/* EVENTS EFFICIENCY RATIO WIDGET */}
          <div className="bg-white/60 backdrop-blur-xl border border-[#cceeee] rounded-3xl p-6 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">Lifecycle Efficiency</h3>
              <p className="text-gray-400 text-[11px] font-medium">Distribution split of your historical club event lifecycles.</p>
            </div>

            <div className="space-y-4 my-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#048c92]" />Upcoming Operations</span>
                  <span>{stats.totalEvents > 0 ? Math.round((stats.upcomingEvents / stats.totalEvents) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${stats.totalEvents > 0 ? (stats.upcomingEvents / stats.totalEvents) * 100 : 0}%` }}
                    className="bg-[#048c92] h-full rounded-full transition-all duration-1000"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#43bfc3]" />Completed History</span>
                  <span>{stats.totalEvents > 0 ? Math.round((stats.completedEvents / stats.totalEvents) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${stats.totalEvents > 0 ? (stats.completedEvents / stats.totalEvents) * 100 : 0}%` }}
                    className="bg-[#43bfc3] h-full rounded-full transition-all duration-1000"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#43bfc3]/5 border border-[#43bfc3]/20 rounded-2xl p-3 text-center">
              <span className="text-[11px] font-black text-[#048c92] block uppercase tracking-wide">Performance Summary</span>
              <span className="text-[11px] text-gray-500 font-medium mt-0.5 block">
                {stats.upcomingEvents} active campaigns scheduled this term.
              </span>
            </div>
          </div>

        </div>

    
        

      </div>
    </div>
  );
}