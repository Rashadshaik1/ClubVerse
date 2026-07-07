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

export default function EventDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const club = JSON.parse(localStorage.getItem("club") || "{}");
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpcoming, setIsUpcoming] = useState(true);

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
  const [maxParticipants, setMaxParticipants] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");

  const inputStyle = "w-full border border-[#cceeee] bg-white/50 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#048c92] transition-all duration-200";

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const eventData = res.data.event;
        setEvent(eventData);
        setVenue(eventData.venue || "");
        
        const formattedEventDate = eventData.date ? eventData.date.split("T")[0] : "";
        setEventDate(formattedEventDate);
        setMaxParticipants(eventData.maxParticipants || "");
        setPosterPreview(eventData.poster || "");

        const now = new Date();
        const todayStr = now.toLocaleDateString('en-CA'); 
        setIsUpcoming(!(formattedEventDate && formattedEventDate < todayStr));

        if (eventData.registrations && eventData.registrations.length > 0) {
          const datesMap = {};
          eventData.registrations.forEach(reg => {
            const dateStr = reg.createdAt ? new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Setup';
            datesMap[dateStr] = (datesMap[dateStr] || 0) + 1;
          });

          const formattedChartArray = Object.keys(datesMap).map(key => ({
            name: key,
            count: datesMap[key]
          }));
          setAnalyticsData(formattedChartArray);
        } else {
          setAnalyticsData([{ name: "No Registrations", count: 0 }]);
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
      const confirmChange = window.confirm("Are you sure you want to change the venue? This triggers automated alert emails to all registered participants instantly.");
      if (!confirmChange) return;

      setIsVenueUpdating(true);
      await axios.put(`http://localhost:5000/api/events/${id}/change-venue`, { venue }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Venue updated successfully! Broadcast emails have been sent.");
    } catch (err) {
      alert("Venue update failed.");
    } finally {
      setIsVenueUpdating(false);
    }
  };

  const handlePostponeEvent = async () => {
    if (!postponeReason) return alert("Please provide a reason for postponing the event.");
    try {
      const confirmPostpone = window.confirm("Confirm event rescheduling? All users will receive direct notification updates.");
      if (!confirmPostpone) return;

      setIsPostponeUpdating(true);
      await axios.put(`http://localhost:5000/api/events/${id}/postpone`, { date: eventDate, reason: postponeReason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Event rescheduled cleanly! Emails sent out successfully.");
      setPostponeReason("");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsPostponeUpdating(false);
    }
  };

  const handleCancelEvent = async () => {
    const reason = window.prompt("Enter the reason for cancellation:");
    if (reason === null) return;

    try {
      const doubleCheck = window.confirm("CRITICAL WARNING: Cancel event entirely? This cannot be undone.");
      if (!doubleCheck) return;

      await axios.post(`http://localhost:5000/api/events/${id}/cancel`, { reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Event cancelled successfully.");
      navigate("/club/manage-events");
    } catch (err) {
      alert("Cancellation failed.");
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
      await axios.put(`http://localhost:5000/api/events/${id}/poster`, payload, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("Poster updated successfully!");
    } catch (err) {
      alert("Poster upload failed.");
    }
  };

  const saveCapacityThreshold = async () => {
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, { maxParticipants }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Capacity updated successfully!");
    } catch (err) {
      alert("Failed to update capacity.");
    }
  };

  const downloadAttendanceSheet = () => {
    window.open(`http://localhost:5000/api/events/${id}/export-attendance?token=${token}`, "_blank");
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

      await axios.post(`http://localhost:5000/api/events/${id}/gallery`, formData, {
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
      <div className="flex min-h-screen bg-[#edfdfd] items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#048c92] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#048c92] font-black text-sm tracking-wide">Loading Dashboard Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      {/* FIXED SIDEBAR */}
      <ClubSidebar />

      {/* CONTENT CONTAINER - Fixed sidebar overlap issue dynamically */}
      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12 transition-all duration-300">
        <ClubNavbar />

        {/* HEADER SECTION */}
        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="px-3 py-1 rounded-xl text-[10px] font-black tracking-wider uppercase bg-[#048c92]/10 text-[#048c92]">
              {club?.name || "Club"} • Dashboard
            </span>
            <h1 className="text-2xl font-black text-[#048c92] tracking-tight mt-1">
              {event?.title || "Event Dashboard"}
            </h1>
          </div>
          
          {isUpcoming && (
            <button 
              onClick={handleCancelEvent}
              className="bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white border border-red-500/20 px-5 py-2.5 rounded-2xl text-xs font-black shadow-sm transition-all transform hover:-translate-y-0.5"
            >
              Cancel Event
            </button>
          )}
        </div>

        {/* MAIN DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl">
          
          {/* LEFT COLUMN: POSTER & GRAPH */}
          <div className="space-y-6">
            {/* EVENT POSTER CARD */}
            <div className="bg-white/60 backdrop-blur-xl p-5 rounded-3xl border border-[#cceeee] shadow-sm">
              <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider mb-4">Event Poster</h3>
              <div className="w-full h-80 rounded-2xl border border-[#cceeee] bg-white/50 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                <img src={posterPreview || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500"} className="w-full h-full object-cover rounded-xl" alt="Poster" />
              </div>
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
            <div className="bg-white/60 backdrop-blur-xl p-5 rounded-3xl border border-[#cceeee] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">Registrations</h3>
                <span className="bg-[#048c92] text-white font-black text-xs px-3 py-1 rounded-xl shadow-sm">
                  {event?.registrations?.length || 0} Total
                </span>
              </div>
              <div className="h-48 w-full mt-2">
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
          </div>

          {/* RIGHT COLUMNS: CONTROLS & UTILITIES */}
          <div className="lg:col-span-2 space-y-6">
            {isUpcoming ? (
              <div className="space-y-6">
                
                {/* VENUE UPDATE */}
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FaMapMarkerAlt className="text-[#048c92] text-sm" />
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Update Location</h2>
                  </div>
                  <p className="text-xs text-amber-600 font-medium mb-4">Note: This sends instant email alerts to all attendees.</p>
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
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="text-[#048c92] text-sm" />
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Reschedule Event</h2>
                  </div>
                  <p className="text-xs text-amber-600 font-medium mb-4">Note: Changes trigger automated rescheduling notification emails.</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">New Date</label>
                        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputStyle} disabled={isPostponeUpdating} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Capacity Limit</label>
                        <div className="flex gap-2">
                          <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} className={inputStyle} placeholder="Max slots" />
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
              <div className="space-y-6">
                
                {/* ATTENDANCE SHEET */}
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Attendance Records</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Download full roster dataset directly in CSV matrix.</p>
                  </div>
                  <button onClick={downloadAttendanceSheet} className="bg-[#048c92] hover:bg-[#03767b] text-white text-xs font-black px-5 py-3 rounded-2xl shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                    <FaDownload /> Export Sheet (CSV)
                  </button>
                </div>

                {/* GALLERY ACCUMULATOR */}
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm">
                  <h2 className="text-base font-black text-gray-800 tracking-tight mb-1">Event Gallery</h2>
                  <p className="text-xs text-gray-400 mb-4">Upload multiple images to save event memories.</p>
                  
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
                      <p className="text-xs font-extrabold text-gray-600">Click or Drag & Drop Images Here</p>
                    </div>

                    {galleryPreviews.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Staged Images ({galleryPreviews.length})</p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 bg-white/40 p-3 rounded-2xl border border-gray-100">
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
                  <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm">
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
                <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <FaComments className="text-[#048c92] text-sm" />
                    <h2 className="text-base font-black text-gray-800 tracking-tight">Attendee Feedback</h2>
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
                      <p className="text-xs text-gray-400 italic">No feedback submissions received yet.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}