import { useState } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";

export default function CreateEvent() {
  const club = JSON.parse(localStorage.getItem("club") || "{}");
  const today = new Date().toISOString().split("T")[0];

  // Premium, soft interactive inputs
  const inputStyle =
    "w-full bg-white/80 border border-[#cceeee] rounded-2xl p-3.5 text-sm font-medium text-gray-700 transition-all duration-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#43bfc3]/40 focus:border-[#048c92] focus:bg-white";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",

    eventHour: "09",
    eventMinute: "00",
    eventPeriod: "AM",

    regStartDate: "",
    regStartHour: "09",
    regStartMinute: "00",
    regStartPeriod: "AM",

    regEndDate: "",
    regEndHour: "06",
    regEndMinute: "00",
    regEndPeriod: "PM",

    maxParticipants: "",
    rules: "",
    requirements: "",

    coordinator1Name: "",
    coordinator1Email: "",
    coordinator1Phone: "",

    coordinator2Name: "",
    coordinator2Email: "",
    coordinator2Phone: "",

    poster: null,
    banner: null,
  });

  const [preview, setPreview] = useState({
    poster: null,
    banner: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);

      setPreview((p) => ({
        ...p,
        [name]: url,
      }));

      if (name === "banner") {
        const img = new Image();

        img.onload = () => {
          if (img.width === 1280 && img.height === 720) {
            setFormData((p) => ({ ...p, banner: file }));
          } else {
            alert(`Banner must be 1280×720. Yours: ${img.width}×${img.height}`);
            e.target.value = "";
            setPreview((p) => ({ ...p, banner: null }));
          }
        };

        img.src = url;
        return;
      }

      setFormData((p) => ({ ...p, [name]: file }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login expired. Please login again.");
        return;
      }

      const payload = new FormData();

      const autoCategory =
        club?.type === "Technical"
          ? "Technical Event"
          : club?.type === "Cultural"
            ? "Cultural Event"
            : "Social Event";

      payload.append("category", autoCategory);

      Object.keys(formData).forEach((key) => {
        if (key === "poster" || key === "banner") {
          if (formData[key] instanceof File) {
            payload.append(key, formData[key]);
          }
          return;
        }
        const val =
          formData[key] === null || formData[key] === undefined
            ? ""
            : formData[key];
        payload.append(key, val);
      });

      const res = await axios.post(
        "http://localhost:5000/api/events",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("EVENT CREATED:", res.data);
      alert("Event Created Successfully!");
      window.location.href = "/club/manage-events";
    } catch (err) {
      console.error("CREATE EVENT ERROR:", err.response?.data || err.message);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to create event";
      alert("Error: " + errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      {/* FIXED SIDEBAR */}
      <ClubSidebar />

      {/* DASHBOARD CONTENT CONTAINER - Handles full screen tracking beautifully */}
      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12 transition-all duration-300">
        <ClubNavbar />

        {/* HERO HEADER BANNER */}
        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#048c92] tracking-tight">
              Create New Event
            </h1>
            <p className="text-gray-500 font-medium text-xs mt-1">
              Deploy structural timelines, artwork nodes, and parameters to the
              live feed.
            </p>
          </div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-white px-4 py-2 rounded-2xl border border-[#e2f8f8]">
            {club?.name || "Workspace Dashboard"}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
          {/* BASIC INFORMATION */}
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">
              Basic Information
            </h2>

            <input
              className={inputStyle}
              name="title"
              placeholder="Event Title"
              onChange={handleChange}
              required
            />

            <textarea
              className={`${inputStyle} h-32 resize-none`}
              name="description"
              placeholder="Tell your audience what this event is about..."
              onChange={handleChange}
              required
            />
          </div>

          {/* SCHEDULE & TIMINGS */}
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">
              Schedule & Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-1">
                  Event Date
                </label>
                <input
                  type="date"
                  className={inputStyle}
                  name="date"
                  min={today}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-1">
                  Venue / Location
                </label>
                <input
                  className={inputStyle}
                  name="venue"
                  placeholder="e.g. Open Air Theatre or Zoom"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-1">
                Event Timeline Node (Time)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <select
                  className={inputStyle}
                  name="eventHour"
                  onChange={handleChange}
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  className={inputStyle}
                  name="eventMinute"
                  onChange={handleChange}
                >
                  {["00", "15", "30", "45"].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select
                  className={inputStyle}
                  name="eventPeriod"
                  onChange={handleChange}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* ARTWORK MEDIA UPLOADS */}
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">
              Event Artwork
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* POSTER DROPZONE */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block px-1">
                  Vertical Poster
                </span>
                <div className="relative border-2 border-dashed border-[#cceeee] rounded-2xl p-4 hover:border-[#43bfc3] transition-all bg-white/40 flex flex-col items-center justify-center min-h-[180px]">
                  {!preview.poster ? (
                    <div className="text-center space-y-1">
                      <p className="text-xs font-bold text-gray-500">
                        Upload Standard Poster
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Supports PNG, JPG, WEBP
                      </p>
                      <input
                        type="file"
                        name="poster"
                        onChange={handleChange}
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="w-full relative group rounded-xl overflow-hidden">
                      <img
                        src={preview.poster}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold">
                          Change Image
                        </p>
                        <input
                          type="file"
                          name="poster"
                          onChange={handleChange}
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* BANNER DROPZONE */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide block px-1">
                  Horizontal Banner (1280×720){" "}
                  <span className="text-red-500">*</span>
                </span>
                <div className="relative border-2 border-dashed border-[#cceeee] rounded-2xl p-4 hover:border-[#43bfc3] transition-all bg-white/40 flex flex-col items-center justify-center min-h-[180px]">
                  {!preview.banner ? (
                    <div className="text-center space-y-1">
                      <p className="text-xs font-bold text-gray-500">
                        Upload Hero Banner
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Strictly 1280 × 720 aspect ratio
                      </p>
                      <input
                        type="file"
                        name="banner"
                        onChange={handleChange}
                        accept="image/*"
                        required
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  ) : (
                    <div className="w-full relative group rounded-xl overflow-hidden">
                      <img
                        src={preview.banner}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold">
                          Change Image
                        </p>
                        <input
                          type="file"
                          name="banner"
                          onChange={handleChange}
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* REGISTRATION PARAMETERS */}
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm space-y-6">
            <h2 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider">
              Registration Timeline Gate
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* START TIME */}
              <div className="bg-white/30 p-4 rounded-2xl border border-[#edfdfd] space-y-3">
                <span className="text-xs font-extrabold text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                  Opening Window
                </span>
                <input
                  type="date"
                  className={inputStyle}
                  name="regStartDate"
                  min={today}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-3 gap-2">
                  <select
                    className={inputStyle}
                    name="regStartHour"
                    onChange={handleChange}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select
                    className={inputStyle}
                    name="regStartMinute"
                    onChange={handleChange}
                  >
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    className={inputStyle}
                    name="regStartPeriod"
                    onChange={handleChange}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>

              {/* END TIME */}
              <div className="bg-white/30 p-4 rounded-2xl border border-[#edfdfd] space-y-3">
                <span className="text-xs font-extrabold text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />{" "}
                  Closing Window
                </span>
                <input
                  type="date"
                  className={inputStyle}
                  name="regEndDate"
                  min={formData.regStartDate || today}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-3 gap-2">
                  <select
                    className={inputStyle}
                    name="regEndHour"
                    onChange={handleChange}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select
                    className={inputStyle}
                    name="regEndMinute"
                    onChange={handleChange}
                  >
                    {["00", "15", "30", "45"].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                  <select
                    className={inputStyle}
                    name="regEndPeriod"
                    onChange={handleChange}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-1">
                Maximum Seats / Volume
              </label>
              <input
                className={inputStyle}
                name="maxParticipants"
                placeholder="e.g. 150 (Leave blank for infinite)"
                type="number"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* RULES & COMPLIANCE */}
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">
              Rules & Prerequisites
            </h2>
            <textarea
              className={`${inputStyle} h-24 resize-none`}
              name="rules"
              placeholder="Guidelines & Rules for participants..."
              onChange={handleChange}
            />
            <textarea
              className={`${inputStyle} h-24 resize-none`}
              name="requirements"
              placeholder="Hardware, software or skill requirements..."
              onChange={handleChange}
            />
          </div>

          {/* COORDINATORS NETWORKS */}
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-[#cceeee] shadow-sm space-y-4">
            <h2 className="text-sm font-extrabold text-[#048c92] uppercase tracking-wider mb-2">
              Point of Contacts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* COORDINATOR 1 */}
              <div className="bg-white/40 p-4 rounded-2xl border border-white/60 space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                  Coordinator 1
                </h3>
                <input
                  className={inputStyle}
                  name="coordinator1Name"
                  placeholder="Full Name"
                  onChange={handleChange}
                />
                <input
                  className={inputStyle}
                  name="coordinator1Email"
                  placeholder="Institutional Email"
                  type="email"
                  onChange={handleChange}
                />
                <input
                  className={inputStyle}
                  name="coordinator1Phone"
                  placeholder="Mobile Number"
                  onChange={handleChange}
                />
              </div>

              {/* COORDINATOR 2 */}
              <div className="bg-white/40 p-4 rounded-2xl border border-white/60 space-y-3">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
                  Coordinator 2
                </h3>
                <input
                  className={inputStyle}
                  name="coordinator2Name"
                  placeholder="Full Name"
                  onChange={handleChange}
                />
                <input
                  className={inputStyle}
                  name="coordinator2Email"
                  placeholder="Institutional Email"
                  type="email"
                  onChange={handleChange}
                />
                <input
                  className={inputStyle}
                  name="coordinator2Phone"
                  placeholder="Mobile  Number"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* DISPATCH ACTION TRIGGER */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#048c92] hover:bg-[#03767b] text-white text-sm font-black px-8 py-4 rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
              disabled={loading}
            >
              {loading ? "Syncing Workspace..." : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
