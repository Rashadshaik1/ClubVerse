import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaTrashAlt, 
  FaCloudUploadAlt, 
  FaDownload, 
  FaTrophy, 
  FaComments,
  FaTimes
} from "react-icons/fa";

const EventDashboardSkeleton = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">

      {/* SIDEBAR */}
      <ClubSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <div className="flex-1 w-full min-w-0 pt-20 sm:pt-24 px-3 sm:px-5 lg:px-8 pb-8 sm:pb-12">

        {/* NAVBAR */}
        <ClubNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* HEADER SKELETON */}
        <div className="mb-5 sm:mb-8 bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-sm">

          <div className="h-3 w-40 sm:w-48 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

          <div className="h-6 sm:h-8 w-48 sm:w-72 max-w-full rounded-xl mt-3 bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-7xl">

          {/* LEFT COLUMN */}
          <div className="space-y-5 sm:space-y-6">

            {/* POSTER SKELETON */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm">

              <div className="h-4 w-28 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse mb-4" />

              <div className="w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

              <div className="h-3 w-40 mx-auto rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

              <div className="h-10 w-full rounded-xl mt-4 bg-gradient-to-r from-[#e2fafa] via-[#c9f2f3] to-[#e2fafa] animate-pulse" />

            </div>

            {/* REGISTRATION SKELETON */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm">

              <div className="flex justify-between items-center mb-5">

                <div className="h-4 w-28 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

                <div className="h-6 w-20 rounded-xl bg-gradient-to-r from-[#cceff0] via-[#aee8ea] to-[#cceff0] animate-pulse" />

              </div>

              {/* GRAPH */}
              <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-3 px-2 pt-6 border-b border-[#cceeee]">

                {[35, 55, 25, 70, 45, 80, 40, 60].map(
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

            </div>

            {/* STUDENTS SKELETON */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm">

              <div className="h-5 w-40 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse mb-5" />

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col gap-2 border-b border-gray-100 py-3"
                >
                  <div className="h-3 w-32 rounded-md bg-gradient-to-r from-[#dff8f8] via-[#c6eeee] to-[#dff8f8] animate-pulse" />

                  <div className="h-3 w-48 max-w-full rounded-md bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />
                </div>
              ))}

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">

            {/* LOCATION SKELETON */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm">

              <div className="h-5 w-36 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

              <div className="h-3 w-72 max-w-full rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

              <div className="flex flex-col sm:flex-row gap-3 mt-5">

                <div className="h-11 flex-1 rounded-2xl bg-gradient-to-r from-[#e2fafa] via-[#c9f2f3] to-[#e2fafa] animate-pulse" />

                <div className="h-11 w-full sm:w-36 rounded-2xl bg-gradient-to-r from-[#cceff0] via-[#aee8ea] to-[#cceff0] animate-pulse" />

              </div>

            </div>

            {/* RESCHEDULE SKELETON */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm">

              <div className="h-5 w-40 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

              <div className="h-3 w-80 max-w-full rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

                <div>
                  <div className="h-3 w-20 rounded-md bg-gradient-to-r from-[#dff8f8] via-[#c6eeee] to-[#dff8f8] animate-pulse mb-2" />
                  <div className="h-11 w-full rounded-2xl bg-gradient-to-r from-[#e2fafa] via-[#c9f2f3] to-[#e2fafa] animate-pulse" />
                </div>

                <div>
                  <div className="h-3 w-24 rounded-md bg-gradient-to-r from-[#dff8f8] via-[#c6eeee] to-[#dff8f8] animate-pulse mb-2" />
                  <div className="h-11 w-full rounded-2xl bg-gradient-to-r from-[#e2fafa] via-[#c9f2f3] to-[#e2fafa] animate-pulse" />
                </div>

              </div>

              <div className="h-20 w-full rounded-2xl mt-4 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

              <div className="h-11 w-full sm:w-44 ml-auto rounded-2xl mt-4 bg-gradient-to-r from-[#cceff0] via-[#aee8ea] to-[#cceff0] animate-pulse" />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default function EventDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const club = JSON.parse(localStorage.getItem("club") || "{}");
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
const [loading, setLoading] = useState(true);
const [sidebarOpen, setSidebarOpen] = useState(false);
const [isUpcoming, setIsUpcoming] = useState(true);

  const [registrations, setRegistrations] = useState([]);

  // Loading States
  const [isVenueUpdating, setIsVenueUpdating] = useState(false);
  const [isPostponeUpdating, setIsPostponeUpdating] = useState(false);

  // Data Hooks
  const [analyticsData, setAnalyticsData] = useState([]);
  const [liveFeedback, setLiveFeedback] = useState([]);
  
  // Gallery
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Inputs
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [postponeReason, setPostponeReason] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");
  const [showPosterModal, setShowPosterModal] = useState(false);

  const inputStyle = "w-full border border-[#cceeee] bg-white/50 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#048c92] transition-all duration-200";

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://clubverse-nsgq.onrender.com/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const eventData = res.data.event;
const regRes = await axios.get(
  `https://clubverse-nsgq.onrender.com/api/events/${id}/registrations`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

console.log("Registration Data:", regRes.data.data);

setRegistrations(regRes.data.data);


        setEvent(eventData);
        setVenue(eventData.venue || "");
        
        const formattedEventDate = eventData.date ? eventData.date.split("T")[0] : "";
        setEventDate(formattedEventDate);
        setMaxParticipants(eventData.maxParticipants || "");
        setPosterPreview(eventData.poster || "");

        const now = new Date();
        const todayStr = now.toLocaleDateString('en-CA'); 
        setIsUpcoming(!(formattedEventDate && formattedEventDate < todayStr));

        if (regRes.data.data.length > 0) {

    const datesMap = {};

    regRes.data.data.forEach(reg => {

        const dateStr = new Date(
            reg.createdAt
        ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });

        datesMap[dateStr] =
            (datesMap[dateStr] || 0) + 1;

    });

    setAnalyticsData(
        Object.keys(datesMap).map(key => ({
            name: key,
            count: datesMap[key]
        }))
    );

} else {

    setAnalyticsData([
        {
            name: "No Registrations",
            count: 0
        }
    ]);

}

        if (eventData.feedback && eventData.feedback.length > 0) {
          setLiveFeedback(eventData.feedback);
        } else {
          setLiveFeedback([]);
        }

      } catch (err) {
        console.error("DATA FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventData();
  }, [id, token]);

 const handleVenueChange = async () => {
  try {
    const confirmChange = window.confirm(
      "Are you sure you want to change the venue? This triggers automated alert emails to all registered participants instantly."
    );

    if (!confirmChange) return;

    setIsVenueUpdating(true);

    console.log("Changing venue:", venue);
    console.log("Event ID:", id);

    await axios.put(
      `https://clubverse-nsgq.onrender.com/api/events/change-venue/${id}`,
      {
        venue: venue
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Venue updated successfully! Broadcast emails have been sent.");

  } catch (err) {
    console.log("VENUE UPDATE ERROR:", err.response?.data || err.message);
    alert("Venue update failed.");
  } finally {
    setIsVenueUpdating(false);
  }
};

const handlePostponeEvent = async () => {

  if (!eventDate) {
    return alert("Please select new date");
  }

  if (!postponeReason) {
    return alert("Please provide a reason");
  }

  try {

    const confirmPostpone = window.confirm(
      "Confirm rescheduling? All registered users will be notified."
    );

    if(!confirmPostpone) return;


    setIsPostponeUpdating(true);


    console.log("POSTPONE EVENT ID:", id);
    console.log("NEW DATE:", eventDate);
    console.log("REASON:", postponeReason);


    const res = await axios.put(
      `https://clubverse-nsgq.onrender.com/api/events/${id}/postpone`,
      {
        date:eventDate,
        reason:postponeReason
      },
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );


    console.log("POSTPONE RESPONSE:",res.data);


    alert("Event rescheduled successfully");


    setPostponeReason("");


  } catch(err){

    console.log(
      "POSTPONE ERROR:",
      err.response?.data || err.message
    );

    alert("Postpone failed");

  } finally {

    setIsPostponeUpdating(false);

  }

};

 const handleCancelEvent = async()=>{

const reason = window.prompt(
"Enter cancellation reason:"
);

if(reason===null) return;


try{

const confirmCancel = window.confirm(
"Cancel this event permanently?"
);


if(!confirmCancel) return;


console.log("CANCEL EVENT ID:",id);
console.log("REASON:",reason);



const res = await axios.post(

`https://clubverse-nsgq.onrender.com/api/events/${id}/cancel`,

{
reason:reason
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


console.log("CANCEL RESPONSE:",res.data);


alert("Event cancelled successfully");


navigate("/manage-events");


}

catch(err){

console.log(
"CANCEL ERROR:",
err.response?.data || err.message
);


alert("Cancellation failed");

}

};
  const handleCompleteEvent = async () => {
  try {
    const confirmComplete = window.confirm(
      "Are you sure you want to mark this event as completed?"
    );

    if (!confirmComplete) return;

    await axios.put(
      `https://clubverse-nsgq.onrender.com/api/events/complete/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Event marked as completed.");

    window.location.reload();

  } catch (err) {
    console.log(err);
    alert("Failed to complete event.");
  }
};

  const handlePosterChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPoster(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const savePosterUpdate = async () => {
    if (!poster) return;
    try {
      const payload = new FormData();
      payload.append("poster", poster);
      await axios.put(`https://clubverse-nsgq.onrender.com/api/events/${id}/poster`, payload, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("Poster updated successfully!");
    } catch (err) {
      alert("Poster upload failed.");
    }
  };

  const saveCapacityThreshold = async () => {
    try {
      await axios.put(`https://clubverse-nsgq.onrender.com/api/events/${id}`, { maxParticipants }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Capacity updated successfully!");
    } catch (err) {
      alert("Failed to update capacity.");
    }
  };

const downloadAttendanceSheet = async () => {
  try {

    console.log("TOKEN BEFORE EXPORT:", token);

    const response = await axios.get(
      `https://clubverse-nsgq.onrender.com/api/events/${id}/export-attendance`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const blob = new Blob(
      [response.data],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${event?.title || "Event"}_Attendance.csv`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(
      "ATTENDANCE EXPORT ERROR:",
      error
    );

    alert("Failed to export attendance sheet.");
  }
};

  const handleGallerySelectionAndPreview = (e) => {
    if (e.target.files) {
      const incomingFiles = Array.from(e.target.files);
      setGalleryFiles(prevFiles => [...prevFiles, ...incomingFiles]);

      const incomingPreviews = incomingFiles.map(file => URL.createObjectURL(file));
      setGalleryPreviews(prevPreviews => [...prevPreviews, ...incomingPreviews]);
      e.target.value = "";
    }
  };

  const removeSelectedImageTrack = (targetIndex) => {
    if (galleryPreviews[targetIndex]) {
      URL.revokeObjectURL(galleryPreviews[targetIndex]);
    }
    setGalleryFiles(prevFiles => prevFiles.filter((_, idx) => idx !== targetIndex));
    setGalleryPreviews(prevPreviews => prevPreviews.filter((_, idx) => idx !== targetIndex));
  };

  // దీన్ని నీ పాత ఫంక్షన్ తో replace చేయి
  const publishGalleryImages = async () => {
    if (galleryFiles.length === 0) return alert("Please select images first.");
    try {
      const formData = new FormData();
      // ఇక్కడ "galleryImages" బదులు "images" అని వాడాలి, ఎందుకంటే బ్యాకెండ్ లో నువ్వు upload.array("images") అని ఇచ్చావు
      galleryFiles.forEach(file => {
        formData.append("images", file); 
      });

      await axios.post(`https://clubverse-nsgq.onrender.com/api/events/${id}/gallery`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Gallery images uploaded successfully!");
      setGalleryFiles([]);
      setGalleryPreviews([]);
    } catch (err) {
      console.error(err);
      alert("Gallery upload failed. Check terminal.");
    }
  };

 if (loading) {
  return (
    <EventDashboardSkeleton
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    />
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      {/* FIXED SIDEBAR */}
      <ClubSidebar
  isOpen={sidebarOpen}
  setIsOpen={setSidebarOpen}
/>

      {/* CONTENT CONTAINER - Fixed sidebar overlap issue dynamically */}
      <div className="flex-1 w-full min-w-0 pt-20 sm:pt-24 px-3 sm:px-5 lg:px-8 pb-8 sm:pb-12 transition-all duration-300">
        <ClubNavbar
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
/>

        {/* HEADER SECTION */}
        <div className="mb-5 sm:mb-7 lg:mb-8 bg-white/40 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/40 shadow-sm flex flex-col lg:flex-row justify-between lg:items-center gap-4">
          <div>
            <span className="inline-block max-w-full truncate px-3 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase bg-[#048c92]/10 text-[#048c92]">
  {club?.name || "Club"} • Event Management
</span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#048c92] tracking-tight mt-1 break-words">
              {event?.title || "Event Dashboard"}
            </h1>
          </div>
          
{isUpcoming && (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
    <button 
      onClick={handleCompleteEvent}
      className="w-full sm:w-auto bg-green-500/10 hover:bg-green-500 text-green-600 hover:text-white border border-green-500/20 px-5 py-2.5 rounded-2xl text-xs font-black shadow-sm transition-all transform hover:-translate-y-0.5"
    >
      Mark as Completed
    </button>

    <button 
      onClick={handleCancelEvent}
      className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white border border-red-500/20 px-5 py-2.5 rounded-2xl text-xs font-black shadow-sm transition-all transform hover:-translate-y-0.5"
    >
      Cancel Event
    </button>
  </div>
)}
        </div>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 w-full max-w-7xl">
          
          {/* LEFT COLUMN: POSTER & GRAPH */}
          <div className="space-y-5 sm:space-y-6 min-w-0">
            {/* EVENT POSTER CARD */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
              <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-4">Event Poster</h3>
<div
  onClick={() => setShowPosterModal(true)}
  className="w-full h-64 sm:h-80 rounded-2xl border border-[#cceeee] bg-white/50 overflow-hidden flex items-center justify-center p-2 shadow-inner cursor-pointer group"
  title="Click to view poster"
>
  <img
    src={
      posterPreview ||
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500"
    }
    className="w-full h-full object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
    alt="Poster"
  />
</div>

<p className="text-[10px] text-gray-400 text-center mt-2">
  Click the poster to view
</p>
              {isUpcoming && (
                <div className="mt-4 space-y-2">
                  <input type="file" id="dashboardPosterFile" className="hidden" accept="image/*" onChange={handlePosterChange} />
                  <label htmlFor="dashboardPosterFile" className="block text-center bg-white hover:bg-gray-50 text-gray-600 font-extrabold border border-gray-200 p-2.5 rounded-xl cursor-pointer text-xs transition shadow-sm">
                    Choose New Poster
                  </label>
                  {poster && (
                    <button onClick={savePosterUpdate} className="w-full bg-[#048c92] hover:bg-[#03767b] text-white font-black p-2.5 rounded-xl text-xs transition shadow-sm">
                      Upload Poster
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* REGISTRATION METRICS */}
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">Registrations</h3>
                <span className="bg-[#048c92] text-white font-black text-xs px-3 py-1 rounded-xl shadow-sm">
                  {registrations.length || 0} Total
                </span>
              </div>
              <div className="h-48 sm:h-52 w-full mt-2 min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#edfdfd" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ fill: '#f4ffff', radius: 12 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white/90 backdrop-blur-md p-3 border border-[#cceeee] shadow-xl rounded-xl">
                              <p className="text-xs font-black text-[#048c92]">{payload[0].payload.name}</p>
                              <p className="text-[11px] font-bold text-gray-600 mt-0.5">
                                Joined: <span className="font-black text-gray-900">{payload[0].value}</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }} 
                    />
                    <Bar dataKey="count" fill="#048c92" radius={[6, 6, 0, 0]} maxBarSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">

<h2 className="text-lg font-bold mb-5">
Registered Students
</h2>

{
registrations.length===0 ?

<p>No registrations yet.</p>

:

registrations.map(reg=>(

<div
  key={reg._id}
  className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b py-3 min-w-0"
>

<div>

<p className="font-semibold">
{reg.userId?.name}
</p>

<p className="text-xs text-gray-500 break-all">
{reg.userId?.email}
</p>

</div>

</div>

))

}

</div>
          </div>

          {/* RIGHT COLUMNS: CONTROLS & UTILITIES */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6 min-w-0">
            {isUpcoming ? (
              <div className="space-y-5 sm:space-y-6 min-w-0">
                
                {/* VENUE UPDATE */}
                <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FaMapMarkerAlt className="text-[#048c92] text-sm" />
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Update Location</h2>
                  </div>
                 <p className="text-xs text-amber-600 font-medium mb-4">Note: All registered students will get an email.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} className={inputStyle} disabled={isVenueUpdating} placeholder="Enter venue name..." />
                    <button 
                      onClick={handleVenueChange} 
                      disabled={isVenueUpdating}
                      className={`font-black text-xs px-5 py-3 rounded-2xl transition-all whitespace-nowrap shadow-sm ${
                        isVenueUpdating ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#048c92] hover:bg-[#03767b] text-white transform hover:-translate-y-0.5"
                      }`}
                    >
                      {isVenueUpdating ? "Sending Alerts..." : "Update & Notify"}
                    </button>
                  </div>
                </div>

                {/* RESCHEDULE CONSOLE */}
                <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-[#048c92] text-sm" />
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Reschedule Event</h2>
                  </div>
                  <p className="text-xs text-amber-600 font-medium mb-4">
  All registered students will be notified about the new date.
</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">New Date</label>
                        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputStyle} disabled={isPostponeUpdating} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Capacity Limit</label>
                        <div className="flex gap-2">
                          <input
  type="number"
  min="0"
  value={maxParticipants ?? 0}
  onChange={(e) => {
    const value = e.target.value;

    if (value === "") {
      setMaxParticipants(0);
      return;
    }

    setMaxParticipants(Math.max(0, Number(value)));
  }}
  className={inputStyle}
  placeholder="Max slots"
/>
                          <button onClick={saveCapacityThreshold} className="bg-gray-800 hover:bg-gray-900 text-white text-xs font-black px-4 rounded-2xl transition shadow-sm">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Reason for Rescheduling</label>
                      <textarea value={postponeReason} onChange={(e) => setPostponeReason(e.target.value)} className={inputStyle} rows={2} placeholder="Explain the change here..." disabled={isPostponeUpdating} />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={handlePostponeEvent} 
                        disabled={isPostponeUpdating}
                        className={`font-black text-xs px-6 py-3 rounded-2xl shadow-sm transition-all ${
                          isPostponeUpdating ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#43bfc3] hover:bg-[#39a6aa] text-white transform hover:-translate-y-0.5"
                        }`}
                      >
                        {isPostponeUpdating ? "Broadcasting Mails..." : "Commit Reschedule"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 sm:space-y-6 min-w-0">
                
                {/* ATTENDANCE SHEET */}
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Attendance Records</h2>
                    <p className="text-xs text-gray-400 mt-0.5">
  Download the student attendance list as a CSV file.
</p>
                  </div>
                  <button onClick={downloadAttendanceSheet} className="bg-[#048c92] hover:bg-[#03767b] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                    <FaDownload /> Download CSV
                  </button>
                </div>

                {/* GALLERY ACCUMULATOR */}
                <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
                  <h2 className="text-base font-black text-gray-800 tracking-tight mb-1">Event Gallery</h2>
                  <p className="text-xs text-gray-400 mb-4">
  Add photos from this event.
</p>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#cceeee] hover:border-[#048c92] rounded-2xl p-6 bg-white/40 hover:bg-white/80 transition relative group">
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={handleGallerySelectionAndPreview} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <FaCloudUploadAlt className="text-2xl text-[#048c92] mb-1 group-hover:scale-110 transition-transform" />
                      <p className="text-xs font-extrabold text-gray-600">
  Click here to add photos
</p>
                    </div>

                    {galleryPreviews.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Staged Images ({galleryPreviews.length})</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 bg-white/40 p-3 rounded-2xl border border-gray-100">
                          {galleryPreviews.map((url, index) => (
                            <div key={index} className="aspect-square w-full rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm relative group">
                              <img src={url} className="w-full h-full object-cover" alt="Preview" />
                              <button
                                type="button"
                                onClick={() => removeSelectedImageTrack(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition duration-200 z-20 text-xs"
                              >
                                <FaTimes />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button 
                          onClick={publishGalleryImages} 
                          className="w-full bg-[#048c92] hover:bg-[#03767b] text-white text-xs font-black p-3 rounded-2xl transition shadow-sm"
                        >
                          Publish Gallery Images
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* TECHNICAL LEADERBOARD */}
                {club?.type === "Technical" && (
                  <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
                    <div className="flex items-center gap-2 mb-4">
                      <FaTrophy className="text-amber-500 text-sm" />
                      <h2 className="text-base font-black text-gray-800 tracking-tight">Leaderboard Winners</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["first", "second", "third"].map((pos) => (
                        <div key={pos} className="border border-[#cceeee] p-4 rounded-2xl bg-white/40 text-center shadow-inner">
                          <span className="text-[10px] uppercase font-black text-[#048c92] block mb-2">{pos} Place</span>
                          <input type="text" placeholder="Winner Name" className="w-full border border-[#cceeee] rounded-xl p-2 focus:outline-none text-xs mb-2 bg-white/80" />
                          <input type="text" placeholder="Roll Number" className="w-full border border-[#cceeee] rounded-xl p-2 focus:outline-none text-xs bg-white/80" />
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full bg-[#048c92] hover:bg-[#03767b] text-white text-xs font-black py-3 rounded-2xl transition shadow-sm">
                      Publish Winners & Notify
                    </button>
                  </div>
                )}

                {/* USER FEEDBACK */}
                <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] shadow-sm min-w-0">
                  <div className="flex items-center gap-2 mb-4">
                    <FaComments className="text-[#048c92] text-sm" />
                    <h2 className="text-base font-black text-gray-800 tracking-tight">
  Student Feedback
</h2>
                  </div>
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {liveFeedback && liveFeedback.length > 0 ? (
                      liveFeedback.map((fb, idx) => (
                        <div key={idx} className="p-3 bg-white/50 rounded-2xl border border-gray-100 text-xs shadow-sm">
                          <p className="font-bold text-gray-700">"{fb.comment}"</p>
                          <span className="text-[10px] text-gray-400 block mt-1.5">— Rating: {fb.rating || 5}/5</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 italic">
  No feedback yet.
</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* POSTER PREVIEW MODAL */}
        {showPosterModal && (
          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPosterModal(false)}
          >
            <div
  className="relative max-w-5xl max-h-[90vh] w-full px-2 sm:px-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowPosterModal(false)}
                className="absolute top-2 right-2 sm:-top-4 sm:-right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-gray-700 text-xl font-bold shadow-lg hover:bg-gray-100 transition"
              >
                ×
              </button>

              <img
                src={
                  posterPreview ||
                  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1000"
                }
                alt="Full Event Poster"
                className="max-h-[90vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}