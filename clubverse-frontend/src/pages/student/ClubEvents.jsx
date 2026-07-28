import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import { CalendarDays, MapPin } from "lucide-react";


const ClubEvents = () => {

  const { id } = useParams();

  const [events,setEvents] = useState([]);
  const [loading,setLoading] = useState(true);
  const [filter, setFilter] = useState("all");


  useEffect(()=>{
    fetchEvents();
  },[]);



  const fetchEvents = async()=>{

    try{

    const token = localStorage.getItem("token");

const res = await axios.get(
  `http://localhost:5000/api/events/club/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


      console.log(res.data);


      setEvents(res.data.data);


    }
    catch(err){

      console.log(err);

    }
    finally{

      setLoading(false);

    }

  };
const filteredEvents =
  filter === "all"
    ? events
    : events.filter(
        (event) => event.status === filter
      );

  if(loading)
  {
    return(
      <div className="min-h-screen flex items-center justify-center">
        Loading Events...
      </div>
    )
  }


return (

<>

<StudentNavbar />


<div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF] py-10">


<div className="max-w-7xl mx-auto px-6">


<h1 className="text-4xl font-bold text-[#4B2E91] mb-8">
Club Events
</h1>
<div className="flex justify-center mb-8">
  <div className="flex gap-3 bg-white p-2 rounded-full shadow-md border border-[#E5DFFF]">

  <button
    onClick={() => setFilter("all")}
    className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
      filter === "all"
        ? "bg-[#6D4BC3] text-white"
        : "bg-white text-[#6D4BC3]"
    }`}
  >
    All ({events.length})
  </button>

  <button
    onClick={() => setFilter("upcoming")}
    className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
      filter === "upcoming"
        ? "bg-[#6D4BC3] text-white"
        : "bg-white text-[#6D4BC3]"
    }`}
  >
    Upcoming (
    {events.filter(e => e.status === "upcoming").length}
    )
  </button>

  <button
    onClick={() => setFilter("completed")}
    className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
      filter === "completed"
        ? "bg-[#6D4BC3] text-white"
        : "bg-white text-[#6D4BC3]"
    }`}
  >
    Completed (
    {events.filter(e => e.status === "completed").length}
    )
</button>

  </div>
</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


{
filteredEvents.length > 0 ? (

filteredEvents.map((event) => (


<div
  key={event._id}
  className="bg-white rounded-3xl shadow-lg overflow-hidden"
>


<img
src={event.banner}
alt={event.title}
className="w-full h-52 object-cover"
/>



<div className="p-5">


<h2 className="text-xl font-bold text-[#4B2E91] h-14 overflow-hidden leading-7">
  {event.title}
</h2>


<div className="mt-3 text-gray-600 space-y-2">


<p className="flex gap-2 items-center">
<CalendarDays size={18}/>
{new Date(event.date).toLocaleDateString()}
</p>


<p className="flex gap-2 items-center">
<MapPin size={18}/>
{event.venue}
</p>


</div>


<Link
  to={`/student/event/${event._id}`}
  className="mt-5 inline-flex items-center justify-center bg-[#6D4BC3] hover:bg-[#5B3FB0] text-white font-medium px-5 py-2.5 rounded-xl transition-all"
>
  View Event
</Link>


</div>


</div>


))


)

:(

<p>No Events Available</p>

)


}


</div>


</div>


</div>


</>

)

}


export default ClubEvents;