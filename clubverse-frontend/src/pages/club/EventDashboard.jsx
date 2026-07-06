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

export default function EventDashboard() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const club = JSON.parse(localStorage.getItem("club") || "{}");
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpcoming, setIsUpcoming] = useState(true);

  // 📧 MAIL UTILITIES PROCESSING LOADING BALANCERS
  const [isVenueUpdating, setIsVenueUpdating] = useState(false);
  const [isPostponeUpdating, setIsPostponeUpdating] = useState(false);

  // Database Tracking Hooks
  const [analyticsData, setAnalyticsData] = useState([]);
  const [liveFeedback, setLiveFeedback] = useState([]);
  
  // Gallery Previews Accumulators
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Input States
  const [venue, setVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [postponeReason, setPostponeReason] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");

  const inputStyle = "w-full border border-[#cceeee] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#43bfc3]";

  useEffect(() => {
    const fetchEventDataPipeline = async () => {
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
        if (formattedEventDate && formattedEventDate < todayStr) {
          setIsUpcoming(false);
        } else {
          setIsUpcoming(true);
        }

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
        console.error("DATA FETCH INTEGRATION FAILURE LOGS:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEventDataPipeline();
  }, [id, token]);

  // 🏢 VENUE MANAGEMENT PIPELINE (WITH LIVE EMAIL TRIGGER LOGIC NOTIFICATIONS)
  const handleVenueChange = async () => {
    try {
      const confirmChange = window.confirm("Are you sure you want to change the venue? This triggers automated alert emails to all registered participants instantly.");
      if (!confirmChange) return;

      setIsVenueUpdating(true);
      await axios.put(`http://localhost:5000/api/events/${id}/change-venue`, { venue }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Venue updated successfully! Broadcast emails have been sent to all registered students.");
    } catch (err) {
      alert("Venue modification loop failed. Check server email logs.");
    } finally {
      setIsVenueUpdating(false);
    }
  };

  // ⏰ POSTPONE TRACK MANAGEMENT PIPELINE (WITH LIVE EMAIL TRIGGER LOGIC NOTIFICATIONS)
  const handlePostponeEvent = async () => {
    if (!postponeReason) return alert("Provide a valid operational justification description reason for postpone.");
    try {
      const confirmPostpone = window.confirm("Confirm event rescheduling? All users will receive direct notification updates regarding new dates dynamically.");
      if (!confirmPostpone) return;

      setIsPostponeUpdating(true);
      await axios.put(`http://localhost:5000/api/events/${id}/postpone`, { date: eventDate, reason: postponeReason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Event timeline rescheduled cleanly! Notification broadcast emails sent out successfully.");
      setPostponeReason("");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsPostponeUpdating(false);
    }
  };

  const handleCancelEvent = async () => {
    const reason = window.prompt("Enter the official event termination cancellation reasons context logs statement:");
    if (reason === null) return;

    try {
      const doubleCheck = window.confirm("CRITICAL WARNING: Cancel event entirely? Registered users will receive cancellation notices.");
      if (!doubleCheck) return;

      await axios.post(`http://localhost:5000/api/events/${id}/cancel`, { reason }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Cancellation sequence complete. Broadcasted warnings to users repository nodes.");
      navigate("/club/manage-events");
    } catch (err) {
      alert("Cancellation sequence interrupted.");
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
      alert("Live poster blueprint redefined.");
    } catch (err) {
      alert("File storage push error logic stream.");
    }
  };

  const saveCapacityThreshold = async () => {
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, { maxParticipants }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Threshold configurations synchronized.");
    } catch (err) {
      alert("Failed updating max parameters limitation logs.");
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

  const publishGalleryImages = async () => {
    if (galleryFiles.length === 0) return alert("Please select or stage your target media file frames.");
    try {
      const formData = new FormData();
      galleryFiles.forEach(file => {
        formData.append("galleryImages", file);
      });

      await axios.post(`http://localhost:5000/api/events/${id}/gallery`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert("All gallery images uploaded and successfully synchronized!");
      setGalleryFiles([]);
      setGalleryPreviews([]);
    } catch (err) {
      alert("Media cluster streaming push execution terminated due to server fault logic.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#f4ffff] items-center justify-center">
        <p className="text-[#048c92] font-semibold text-xl">Reconnecting Component Telemetry Systems...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f4ffff]">
      <ClubSidebar />

      <div className="flex-1 ml-72">
        <ClubNavbar />

        <div className="p-8">
          <div className="flex justify-between items-center border-b border-[#cceeee] pb-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-wider bg-[#43bfc3]/10 text-[#048c92] px-3 py-1 rounded-full font-bold">
                {club?.type || "Club"} Node Dashboard Core Engine Interface
              </span>
              <h1 className="text-3xl font-bold text-[#048c92] mt-1">{event?.title || "Event"} Terminal</h1>
            </div>
            
            {isUpcoming && (
              <button 
                onClick={handleCancelEvent}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition"
              >
                🚨 Cancel Event Link
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl shadow border border-[#cceeee]">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Live Identity Poster Blueprint</h3>
                <div className="w-full h-[380px] rounded-xl border border-[#cceeee] bg-gray-50 overflow-hidden flex items-center justify-center">
                  <img src={posterPreview || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500"} className="w-full h-full object-contain" alt="Poster Display Visual Assets" />
                </div>
                {isUpcoming && (
                  <div className="mt-4 space-y-2">
                    <input type="file" id="dashboardPosterFile" className="hidden" accept="image/*" onChange={handlePosterChange} />
                    <label htmlFor="dashboardPosterFile" className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold p-2 rounded-xl cursor-pointer text-xs transition">
                      Modify Base Layer Poster File
                    </label>
                    {poster && (
                      <button onClick={savePosterUpdate} className="w-full bg-[#048c92] text-white font-bold p-2 rounded-xl text-xs transition">
                        💾 Publish Identity Change
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-2xl shadow border border-[#cceeee]">
                <h3 className="text-lg font-bold text-gray-800">Dynamic Registration Tracking Metrics</h3>
                <p className="text-xs text-gray-500 mb-4">Total Actual Enrolled Profiles Array: <span className="font-bold text-[#048c92] text-sm">{event?.registrations?.length || 0}</span></p>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0fdfd" />
                      <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{ fill: '#f4ffff', radius: 8 }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border border-[#cceeee] shadow-xl rounded-xl">
                                <p className="text-sm font-extrabold text-[#048c92]">{payload[0].payload.name}</p>
                                <p className="text-xs font-semibold text-gray-700 mt-1">
                                  Registrations: <span className="font-black text-gray-900">{payload[0].value}</span>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }} 
                      />
                      <Bar dataKey="count" fill="#048c92" radius={[8, 8, 0, 0]} maxBarSize={32} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {isUpcoming ? (
                <div className="space-y-6">
                  
                  {/* 🏢 VENUE SYSTEM WITH LOADING STATE COMPONENT FEEDBACK TRACK */}
                  <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
                    <h2 className="text-xl font-bold text-[#048c92] mb-1">Emergency Location Vector Sync</h2>
                    <p className="text-xs text-red-500 font-medium mb-3">⚠️ Changing venue sends automated notifications to users dynamically.</p>
                    <div className="flex gap-4">
                      <input type="text" value={venue} onChange={(e) => setVenue(e.target.value)} className={inputStyle} disabled={isVenueUpdating} />
                      <button 
                        onClick={handleVenueChange} 
                        disabled={isVenueUpdating}
                        className={`font-bold px-6 py-3 rounded-xl transition whitespace-nowrap shadow ${
                          isVenueUpdating ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#048c92] hover:bg-[#03767b] text-white"
                        }`}
                      >
                        {isVenueUpdating ? "Sending Alert Emails..." : "Update Location & Notify"}
                      </button>
                    </div>
                  </div>

                  {/* ⏰ TIME LINE RESCHEDULE CONSOLE WITH DETAILED HANDLING ACTIONS */}
                  <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
                    <h2 className="text-xl font-bold text-[#048c92] mb-1">Operational Timeline Re-Schedules Console</h2>
                    <p className="text-xs text-red-500 font-medium mb-3">⚠️ Modifying date parameters dispatches email status notifications automatically.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">New Calendar Date Coordinates</label>
                        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputStyle} disabled={isPostponeUpdating} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Reason Log Statements</label>
                        <textarea value={postponeReason} onChange={(e) => setPostponeReason(e.target.value)} className={inputStyle} rows={2} placeholder="Define change justification contexts..." disabled={isPostponeUpdating} />
                      </div>
                      <div className="flex justify-end">
                        <button 
                          onClick={handlePostponeEvent} 
                          disabled={isPostponeUpdating}
                          className={`font-bold px-6 py-3 rounded-xl shadow transition ${
                            isPostponeUpdating ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#43bfc3] hover:bg-[#39a6aa] text-white"
                          }`}
                        >
                          {isPostponeUpdating ? "Broadcasting Reschedule Mails..." : "Commit Reschedule Updates"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Configure User Enrollment Hard Limits</h2>
                    <div className="flex gap-4">
                      <input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} className={inputStyle} placeholder="Max Cap Threshold Limit Count Parameter" />
                      <button onClick={saveCapacityThreshold} className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-6 py-3 rounded-xl transition whitespace-nowrap">
                        Apply Hard Cap Constraints
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee] flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Operational Attendance Records Console</h2>
                      <p className="text-sm text-gray-500 mt-1">Export registered attendee datasets matrix via CSV binary pipelines straight from Node database arrays.</p>
                    </div>
                    <button onClick={downloadAttendanceSheet} className="bg-[#048c92] hover:bg-[#03767b] text-white font-bold px-6 py-3 rounded-xl shadow transition">
                      📥 Export Sheets (CSV)
                    </button>
                  </div>

                  {/* GALLERY ACCUMULATOR SYSTEM ARCHITECTURE CONTAINER */}
                  <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
                    <h2 className="text-xl font-bold text-[#048c92] mb-1">Gallery</h2>
                    <p className="text-xs text-gray-400 mb-4">Upload multiple images. Hover on any preview to reveal the delete button.</p>
                    
                    <div className="space-y-4">
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#cceeee] rounded-2xl p-6 bg-[#f4ffff]/30 hover:bg-[#f4ffff]/60 transition relative">
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*"
                          onChange={handleGallerySelectionAndPreview} 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <p className="text-sm font-semibold text-gray-600">Click or Drag & Drop Multiple Images Here</p>
                        <p className="text-xs text-gray-400 mt-1">Select multi images as many times as you want without losing previous ones</p>
                      </div>

                      {galleryPreviews.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Staged Images Batch ({galleryPreviews.length})</p>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            {galleryPreviews.map((url, index) => (
                              <div key={index} className="aspect-square w-full rounded-lg border overflow-hidden bg-white shadow-sm relative group">
                                <img src={url} className="w-full h-full object-cover transition" alt="Gallery Frame Preview Asset" />
                                <button
                                  type="button"
                                  onClick={() => removeSelectedImageTrack(index)}
                                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100 z-20 pointer-events-auto"
                                  title="Remove Image"
                                >
                                  ×
                                </button>
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition pointer-events-none" />
                              </div>
                            ))}
                          </div>

                          <button 
                            onClick={publishGalleryImages} 
                            className="w-full bg-[#048c92] hover:bg-[#03767b] text-white font-bold p-3 rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                          >
                            🚀 Publish Gallery Collection Frame
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {club?.type === "Technical" && (
                    <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">Technical Track Leaderboard Placements</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["first", "second", "third"].map((pos) => (
                          <div key={pos} className="border border-[#cceeee] p-4 rounded-xl bg-[#f4ffff]/50 text-center">
                            <span className="text-xs uppercase font-extrabold text-[#048c92] block mb-2">{pos} Core Spot</span>
                            <input type="text" placeholder="Attendee Name" className="w-full border border-[#cceeee] rounded-xl p-2 focus:outline-none text-xs mb-2 bg-white" />
                            <input type="text" placeholder="Roll Identity Core" className="w-full border border-[#cceeee] rounded-xl p-2 focus:outline-none text-xs bg-white" />
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 w-full bg-[#048c92] text-white font-bold py-2 rounded-xl text-xs hover:bg-[#03767b] transition">
                        Broadcast Leaderboard Placements Node
                      </button>
                    </div>
                  )}

                  <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">Live Synchronized Member Feedback Streams</h2>
                    <div className="space-y-3">
                      {liveFeedback && liveFeedback.length > 0 ? (
                        liveFeedback.map((fb, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-xl border text-sm">
                            <p className="font-semibold text-gray-700">"{fb.comment}"</p>
                            <span className="text-xs text-gray-400 block mt-1">— Participant Reference Matrix: {fb.userId || "Active Learner"} (Rating Matrix: {fb.rating || 5}/5)</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 italic">No feedback entries synchronized or pulled from MongoDB event database reference blocks yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}