import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData,setChartData]=useState([]);
  const [pieData,setPieData]=useState([]);
  const [memberCount,setMemberCount]=useState(0);

  useEffect(() => {

  const fetchData = async () => {

    try {

      const headers = {
        Authorization:
        `Bearer ${localStorage.getItem("token")}`,
      };


      // 1. Get clubs
      const clubRes = await fetch(
        "http://127.0.0.1:5000/api/admin/clubs",
        {
          headers
        }
      );


      const clubData = await clubRes.json();


      const foundClub =
      (clubData.data || [])
      .find((c)=>c._id === id);


      setClub(foundClub);
      const memberRes = await fetch(
 `http://127.0.0.1:5000/api/boards/club/${id}/member-count`,
 {
  headers
 }
);


const memberData = await memberRes.json();


setMemberCount(memberData.count || 0);



      // 2. Get all events

      const eventRes = await fetch(
        "http://127.0.0.1:5000/api/admin/events",
        {
          headers
        }
      );


      const eventData = await eventRes.json();



      // filter only this club events

      const clubEvents =
      (eventData.data || [])
      .filter(
        (e)=>
        e.clubId?._id === id
      );


      setEvents(clubEvents);

   const statusMap = {
  Completed:0,
  Upcoming:0,
  Cancelled:0
};


clubEvents.forEach((event)=>{

  if(event.status === "completed"){
    statusMap.Completed++;
  }

  else if(event.status === "cancelled"){
    statusMap.Cancelled++;
  }

  else if(event.status === "upcoming"){
    statusMap.Upcoming++;
  }

});


setPieData(

Object.keys(statusMap).map((status)=>({

name:status,
value:statusMap[status]

}))

);
      const monthMap={};


clubEvents.forEach((event)=>{


const month =
new Date(event.createdAt)
.toLocaleString(
"default",
{
month:"short"
}
);


monthMap[month] =
(monthMap[month] || 0)+1;


});


setChartData(

Object.keys(monthMap)
.map((month)=>({

month,
count:monthMap[month]

}))

);
        


      setLoading(false);


    }
    catch(err){

      console.log(err);
      setLoading(false);

    }

  };


  fetchData();


},[id]);
  const handleDelete = async () => {
    if (!window.confirm("Delete this club?")) return;

    await fetch(`http://127.0.0.1:5000/api/admin/club/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    navigate("/clubs");
  };

  const handleBlock = async () => {
    const res = await fetch(
      `http://127.0.0.1:5000/api/admin/block-club/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    await res.json();

    setClub((prev) => ({
      ...prev,
      isBlocked: !prev.isBlocked,
    }));
  };

  if (loading) return <Loader />;

  if (!club)
    return (
      <div className="text-white ml-72 p-10">
        Club not found
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#070b14] text-white overflow-hidden">
      <Sidebar />

      <div className="ml-72 w-full p-10 space-y-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl shadow-lg"
        >
          <div className="flex items-center gap-6">

            <motion.img
              whileHover={{ scale: 1.1 }}
              src={club.logo || "https://via.placeholder.com/100"}
              className="w-24 h-24 rounded-full border border-cyan-400 shadow-lg"
            />

            <div>
              <h1 className="text-3xl font-bold tracking-wide">
                {club.name}
              </h1>
              <p className="text-gray-400">{club.email}</p>

              <span
                className={`mt-2 inline-block px-3 py-1 text-xs rounded-full backdrop-blur-md
                ${club.isBlocked
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
                }`}
              >
                {club.isBlocked ? "Blocked" : "Active"}
              </span>
            </div>
          </div>

          <p className="mt-6 text-gray-300 leading-relaxed">
            {club.description || "No description available"}
          </p>
        </motion.div>

    {/* ================= STATS ================= */}

<div className="grid grid-cols-3 gap-6">

{
[
{
 label:"Total Events",
 value:events.length
},

{
 label:"Members",
 value:memberCount
},

{
 label:"Status",
 value:club.isBlocked ? "Inactive" : "Live"
}

].map((item,i)=>(

<motion.div
key={i}
whileHover={{scale:1.05}}
className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
>

<p className="text-gray-400 text-sm">
{item.label}
</p>

<h2 className="text-2xl font-bold mt-1">
{item.value}
</h2>

</motion.div>

))

}

</div>

        {/* ================= ANALYTICS MOCK ================= */}
        <div className="grid grid-cols-2 gap-6">

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h2 className="mb-4 font-semibold">Event Trend</h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="month" stroke="#888" />
               <YAxis 
 stroke="#888"
 allowDecimals={false}
/>
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#00C2FF" />
              </LineChart>
            </ResponsiveContainer>

            <p className="text-gray-500 text-sm mt-2">
              (Connect real event data here)
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <h2 className="mb-4 font-semibold">Activity Split</h2>

            <ResponsiveContainer width="100%" height={250}>

  <PieChart>

<Pie
data={pieData}
dataKey="value"
nameKey="name"
outerRadius={90}
label
/>

<Tooltip />

<Legend />

</PieChart>

</ResponsiveContainer>
          </motion.div>

        </div>

        {/* ================= ACTIONS ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleDelete}
            className="px-6 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-400/30"
          >
            Delete Club
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleBlock}
            className="px-6 py-2 rounded-xl bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
          >
            {club.isBlocked ? "Unblock" : "Block"}
          </motion.button>

        </motion.div>

      </div>
    </div>
  );
}