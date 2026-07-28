import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import StudentNavbar from "./StudentNavbar";
import SuccessModal from "./SuccessModal";

import {
  CalendarDays,
  MapPin,
  Building2,
  Users,
  Clock,
  Star,
  Image,
} from "lucide-react";

export default function StudentEventDetails() {

  const { id } = useParams();

  const [event, setEvent] = useState(null);

const [loading, setLoading] = useState(true);

const [registered, setRegistered] = useState(false);

const [totalRegistrations, setTotalRegistrations] = useState(0);

const [showSuccess, setShowSuccess] = useState(false);

const [gallery, setGallery] = useState([]);

const [rating, setRating] = useState(0);

const [comment, setComment] = useState("");

const [submittingFeedback, setSubmittingFeedback] = useState(false);
const [showPoster, setShowPoster] = useState(false);

const isUpcoming = event?.status === "upcoming";
const isOngoing = event?.status === "ongoing";
const isCompleted = event?.status === "completed";

  useEffect(() => {
  fetchEvent();
  checkRegistration();
  fetchGallery();
}, []);

  const fetchEvent = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/events/${id}`
      );
console.log("EVENT FROM API:", res.data.event);
     setEvent({
  ...res.data.event,
  totalRegistrations: res.data.totalRegistrations,
});
      setTotalRegistrations(res.data.totalRegistrations);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  const fetchGallery = async () => {

  try {

    const res = await axios.get(
      `http://localhost:5000/api/events/${id}/gallery`
    );

    setGallery(res.data.gallery || []);

  } catch (err) {

    console.log(err);

  }

};

  const checkRegistration = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/registration",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("MY REGISTRATIONS:", res.data.data);

    const exists = res.data.data.some(
      (reg) => reg.eventId?._id === id
    );

    console.log("REGISTERED:", exists);

    setRegistered(exists);

  } catch (err) {
    console.log(err);
  }
};
  const handleRegister = async () => {

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/registration",
      {
        eventId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRegistered(true);
setTotalRegistrations((prev) => prev + 1);
    setShowSuccess(true);

  } catch (err) {

    alert(
      err.response?.data?.msg ||
      "Registration Failed"
    );

  }

};

const submitFeedback = async () => {

  if (rating === 0) {

    return alert("Please select a rating.");

  }

  try {

    setSubmittingFeedback(true);

    const token = localStorage.getItem("token");

    const res = await axios.post(

      `http://localhost:5000/api/events/${id}/feedback`,

      {
        rating,
        comment,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

    alert(res.data.message);

  } catch (err) {

    alert(

      err.response?.data?.message ||

      "Failed to submit feedback."

    );

  } finally {

    setSubmittingFeedback(false);

  }

};



  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  }

  if (!event) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        Event not found
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <StudentNavbar />

      {/* Banner */}

    <div className="relative">

<img
  src={event.banner}
  alt={event.title}
  className="w-full h-56 object-cover"
/>

<div className="absolute inset-0 bg-black/30"></div>

</div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <div className="-mt-20 relative z-20 mb-8">

<img
    src={event.poster}
    alt={event.title}
    onClick={() => setShowPoster(true)}
    className="
    w-64
    h-80
    object-cover
    rounded-3xl
    shadow-2xl
    border-4
    border-white
    cursor-pointer
    hover:scale-105
    transition"
/>

<p className="text-sm text-gray-500 mt-3">
🔍 Click poster to view
</p>

</div>
<div className="flex items-center justify-between">

<h1 className="text-4xl font-bold text-[#4B2E91]">

{event.title}

</h1>

<span
className="
px-4
py-2
rounded-full
bg-green-100
text-green-700
font-semibold">

{event.status}

</span>

</div>

          <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

<h2 className="font-bold text-xl mb-3">

About Event

</h2>

<p className="leading-8 text-gray-600">

{event.description}

</p>

</div>

           <div className="grid md:grid-cols-2 gap-6 mt-8">

<div className="bg-white p-6 rounded-3xl shadow">

<h2 className="font-bold text-xl text-[#4B2E91]">

Rules

</h2>

<p className="mt-3">

{event.rules}

</p>

</div>

<div className="bg-white p-6 rounded-3xl shadow">

<h2 className="font-bold text-xl text-[#4B2E91]">

Requirements

</h2>

<p className="mt-3">

{event.requirements}

</p>

</div>

</div>

            {isCompleted && (

<div className="mt-12">

  <h2 className="text-2xl font-bold text-[#4B2E91] flex items-center gap-2">

    <Image size={26} />

    Event Gallery

  </h2>

  {
    gallery.length === 0 ? (

      <p className="mt-5 text-gray-500">

        Gallery will be available soon.

      </p>

    ) : (

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-6">

        {gallery.map((img, index) => (

          <img
            key={index}
            src={img.image}
            alt=""
            className="rounded-2xl shadow-lg h-52 w-full object-cover hover:scale-105 transition"
          />

        ))}

      </div>

    )
  }

</div>

)}

{isCompleted && registered && (

<div className="mt-12 bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold text-[#4B2E91] flex items-center gap-2">

<Star className="text-yellow-500"/>

Share Your Feedback

</h2>

<div className="flex gap-2 mt-6">

{[1,2,3,4,5].map((star)=>(

<Star

key={star}

size={34}

onClick={()=>setRating(star)}

className={`cursor-pointer transition

${
rating>=star
?"fill-yellow-400 text-yellow-400"
:"text-gray-300"
}`}

/>

))}

</div>

<textarea

value={comment}

onChange={(e)=>setComment(e.target.value)}

rows={5}

placeholder="Tell us about your experience..."

className="mt-6 w-full rounded-2xl border border-gray-300 p-4 outline-none focus:border-[#6D4BC3]"

/>

<button

onClick={submitFeedback}

disabled={submittingFeedback}

className="mt-6 w-full py-4 rounded-2xl bg-[#6D4BC3] text-white font-semibold hover:bg-[#5938B0] transition"

>

{submittingFeedback

? "Submitting..."

: "Submit Feedback"}

</button>

</div>

)}

          </div>

          

          {/* RIGHT */}

          <div>

           <div
  className="
  sticky
  top-24
  rounded-3xl
  bg-white/90
  backdrop-blur-xl
  border
  border-white
  shadow-2xl
  p-7
  overflow-hidden"
>
<h2 className="text-2xl font-bold text-[#4B2E91] mb-6">
  Event Information
</h2>
          <div className="space-y-4">

  <div className="flex items-center gap-4 bg-[#F8F7FF] rounded-2xl p-4">
    <CalendarDays className="text-[#6D4BC3]" size={22} />

    <div>
      <p className="text-xs text-gray-500">Event Date</p>
      <p className="font-semibold text-gray-800">
        {new Date(event.date).toLocaleDateString()}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 bg-[#F8F7FF] rounded-2xl p-4">
    <Clock className="text-[#6D4BC3]" size={22} />

    <div>
      <p className="text-xs text-gray-500">Time</p>
      <p className="font-semibold text-gray-800">
        {event.time || "TBA"}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 bg-[#F8F7FF] rounded-2xl p-4">
    <MapPin className="text-[#6D4BC3]" size={22} />

    <div>
      <p className="text-xs text-gray-500">Venue</p>
      <p className="font-semibold text-gray-800">
        {event.venue}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 bg-[#F8F7FF] rounded-2xl p-4">
    <Building2 className="text-[#6D4BC3]" size={22} />

    <div>
      <p className="text-xs text-gray-500">Organized By</p>
      <p className="font-semibold text-gray-800">
        {event.clubId?.name}
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 bg-[#F8F7FF] rounded-2xl p-4">
  <Users className="text-[#6D4BC3]" size={22} />

  <div>
    <p className="text-xs text-gray-500">Maximum Participants</p>

    <p className="font-semibold text-gray-800">
      {event.maxParticipants || "Unlimited"}
    </p>

    {event.maxParticipants > 0 && (
      <p className="text-sm text-green-600 mt-1">
        Available Seats:{" "}
        {event.maxParticipants - (event.totalRegistrations || 0)}
      </p>
    )}
  </div>
</div>

</div>
              <div className="mt-8">

  {isUpcoming && (
    <div className="rounded-2xl bg-green-50 border border-green-200 px-5 py-4 text-center">
      <p className="text-green-700 font-bold text-lg">
        🟢 Registration Open
      </p>
      <p className="text-green-600 text-sm mt-1">
        Register now to reserve your seat.
      </p>
    </div>
  )}

  {isOngoing && (
    <div className="rounded-2xl bg-orange-50 border border-orange-200 px-5 py-4 text-center">
      <p className="text-orange-700 font-bold text-lg">
        🟠 Event Live
      </p>
      <p className="text-orange-600 text-sm mt-1">
        This event is currently in progress.
      </p>
    </div>
  )}

  {isCompleted && (
    <div className="rounded-2xl bg-blue-50 border border-blue-200 px-5 py-4 text-center">
      <p className="text-blue-700 font-bold text-lg">
        🔵 Event Completed
      </p>
      <p className="text-blue-600 text-sm mt-1">
        Thank you for participating.
      </p>
    </div>
  )}

</div>
              {isUpcoming && (

<button
  disabled={registered}
  onClick={handleRegister}
  className={`
    w-full
    mt-6
    py-4
    rounded-2xl
    font-bold
    text-white
    shadow-xl
    transition-all
    duration-300

    ${
      registered
        ? "bg-green-500 cursor-not-allowed"
        : "bg-gradient-to-r from-[#6D4BC3] to-[#8B5CF6] hover:scale-105 hover:shadow-2xl"
    }
  `}
>
  {registered ? "✅ Already Registered" : "Register Now"}
</button>

)}

            </div>

          </div>

        </div>

      </div>
      {showPoster && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    onClick={() => setShowPoster(false)}
  >
    <img
      src={event.poster}
      alt={event.title}
      onClick={(e) => e.stopPropagation()}
      className="max-w-[90vw] max-h-[90vh] rounded-3xl shadow-2xl"
    />

    <button
      onClick={() => setShowPoster(false)}
      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-gray-700 text-2xl font-semibold hover:bg-gray-100 transition"
    >
      ×
    </button>
  </div>
)}
      <SuccessModal
  open={showSuccess}
  title="Registration Successful 🎉"
  message={`You have successfully registered for "${event?.title}". We look forward to seeing you at the event!`}
  onClose={() => setShowSuccess(false)}
/>

    </div>

  );

}