import { useState } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";

export default function CreateEvent() {
  const club = JSON.parse(localStorage.getItem("club") || "{}");

  const inputStyle =
    "w-full border border-[#cceeee] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#43bfc3] focus:border-[#43bfc3]";

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
    banner: null
  });

  const [preview, setPreview] = useState({
    poster: null,
    banner: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);

      setPreview((p) => ({
        ...p,
        [name]: url
      }));

      if (name === "banner") {
        const img = new Image();

        img.onload = () => {
          if (img.width === 1280 && img.height === 720) {
            setFormData((p) => ({ ...p, banner: file }));
          } else {
            alert(`Banner must be 1280×720. Yours: ${img.width}×${img.height}`);
            e.target.value = "";
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

      // Determine category automatically
      const autoCategory =
        club?.type === "Technical"
          ? "Technical Event"
          : club?.type === "Cultural"
          ? "Cultural Event"
          : "Social Event";

      payload.append("category", autoCategory);

      // Explicitly process form keys cleanly
      Object.keys(formData).forEach((key) => {
        // Handle files fields carefully
        if (key === "poster" || key === "banner") {
          if (formData[key] instanceof File) {
            payload.append(key, formData[key]);
          }
          return; // Skip appending null values
        }

        // Handle string values cleanly. If empty, pass empty string so backend logic avoids crashes
        const val = formData[key] === null || formData[key] === undefined ? "" : formData[key];
        payload.append(key, val);
      });

      const res = await axios.post(
        "http://localhost:5000/api/events",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("EVENT CREATED:", res.data);
      alert("Event Created Successfully!");
      
      // Redirect cleanly to manage events list page
      window.location.href = "/club/manage-events";
    } catch (err) {
      console.error("CREATE EVENT ERROR:", err.response?.data || err.message);
      
      const errMsg = err.response?.data?.message || err.response?.data?.error || "Failed to create event";
      alert("Error: " + errMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#f4ffff] flex">
      <ClubSidebar />

      <div className="flex-1 ml-72">
        <ClubNavbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold text-[#048c92]">Create Event</h1>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">

            {/* BASIC */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>

              <input
                className={inputStyle}
                name="title"
                placeholder="Event Title"
                onChange={handleChange}
                required
              />

              <textarea
                className={`${inputStyle} mt-4`}
                name="description"
                placeholder="Description"
                onChange={handleChange}
                required
              />
            </div>

            {/* SCHEDULE */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
              <h2 className="text-xl font-bold mb-4">Schedule</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input type="date" className={inputStyle} name="date" onChange={handleChange} required />
                <input className={inputStyle} name="venue" placeholder="Venue" onChange={handleChange} required />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <select className={inputStyle} name="eventHour" onChange={handleChange}>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
                  ))}
                </select>

                <select className={inputStyle} name="eventMinute" onChange={handleChange}>
                  {["00", "15", "30", "45"].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select className={inputStyle} name="eventPeriod" onChange={handleChange}>
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>

            {/* POSTER + BANNER */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
              <h2 className="text-xl font-bold mb-4">Poster & Banner</h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="font-semibold">Poster</label>
                  <input type="file" name="poster" onChange={handleChange} accept="image/*" />

                  {preview.poster && (
                    <img src={preview.poster} className="mt-3 w-full h-40 object-cover rounded-xl border" />
                  )}
                </div>

                <div>
                  <label className="font-semibold">Banner (1280×720)</label>
                  <input type="file" name="banner" onChange={handleChange} accept="image/*" required />

                  {preview.banner && (
                    <img src={preview.banner} className="mt-3 w-full h-40 object-cover rounded-xl border" />
                  )}
                </div>

              </div>
            </div>

            {/* REGISTRATION */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
              <h2 className="text-xl font-bold mb-4">Registration</h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <h3 className="font-semibold mb-2">Start</h3>
                  <input type="date" className={inputStyle} name="regStartDate" onChange={handleChange} />

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <select className={inputStyle} name="regStartHour" onChange={handleChange}>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
                      ))}
                    </select>

                    <select className={inputStyle} name="regStartMinute" onChange={handleChange}>
                      {["00","15","30","45"].map(m => <option key={m}>{m}</option>)}
                    </select>

                    <select className={inputStyle} name="regStartPeriod" onChange={handleChange}>
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">End</h3>
                  <input type="date" className={inputStyle} name="regEndDate" onChange={handleChange} />

                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <select className={inputStyle} name="regEndHour" onChange={handleChange}>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
                      ))}
                    </select>

                    <select className={inputStyle} name="regEndMinute" onChange={handleChange}>
                      {["00","15","30","45"].map(m => <option key={m}>{m}</option>)}
                    </select>

                    <select className={inputStyle} name="regEndPeriod" onChange={handleChange}>
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>

              </div>

              <input className={`${inputStyle} mt-4`} name="maxParticipants" placeholder="Max Participants" type="number" onChange={handleChange} />
            </div>

            {/* RULES */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
              <h2 className="text-xl font-bold mb-4">Rules & Requirements</h2>

              <textarea className={inputStyle} name="rules" placeholder="Rules" onChange={handleChange} />
              <textarea className={`${inputStyle} mt-4`} name="requirements" placeholder="Requirements" onChange={handleChange} />
            </div>

            {/* CONTACTS */}
            <div className="bg-white p-6 rounded-2xl shadow border border-[#cceeee]">
              <h2 className="text-xl font-bold mb-4">Contacts</h2>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="space-y-3">
                  <h3 className="font-semibold">Coordinator 1</h3>

                  <input
                    className={inputStyle}
                    name="coordinator1Name"
                    placeholder="Name"
                    onChange={handleChange}
                  />

                  <input
                    className={inputStyle}
                    name="coordinator1Email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                  />

                  <input
                    className={inputStyle}
                    name="coordinator1Phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">Coordinator 2</h3>

                  <input
                    className={inputStyle}
                    name="coordinator2Name"
                    placeholder="Name"
                    onChange={handleChange}
                  />

                  <input
                    className={inputStyle}
                    name="coordinator2Email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                  />

                  <input
                    className={inputStyle}
                    name="coordinator2Phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <button type="submit" className="bg-[#048c92] text-white px-6 py-3 rounded-xl disabled:opacity-50" disabled={loading}>
                {loading ? "Creating..." : "Publish Event"}
              </button>
            </div>

          </form>
        
        </div>
      </div>
    </div>
  );
}