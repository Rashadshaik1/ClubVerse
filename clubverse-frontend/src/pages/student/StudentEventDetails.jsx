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
  Mail,
  Phone,
  UserRound,
  X,
} from "lucide-react";

function EventDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F4FF] via-[#EEF2FF] to-[#E8F3FF]">

      <div className="h-56 bg-gray-200 animate-pulse" />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <div className="-mt-20 relative mb-8">

              <div className="
                w-48
sm:w-56
md:w-64
h-64
sm:h-72
md:h-80
                rounded-3xl
                bg-gray-200
                animate-pulse
              " />

            </div>

            <div className="h-10 w-3/4 bg-gray-200 rounded-xl animate-pulse" />

            <div className="mt-6 bg-white rounded-3xl p-6 shadow-lg">

              <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />

              <div className="mt-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="h-40 bg-gray-200 rounded-3xl animate-pulse" />

              <div className="h-40 bg-gray-200 rounded-3xl animate-pulse" />

            </div>

          </div>

          <div>

            <div className="bg-white rounded-3xl shadow-xl p-7">

              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />

              <div className="space-y-4">

                {[1,2,3,4,5].map((item) => (
                  <div
                    key={item}
                    className="
                      h-20
                      rounded-2xl
                      bg-gray-200
                      animate-pulse
                    "
                  />
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

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

const [showRegisterModal, setShowRegisterModal] = useState(false);

const [user, setUser] = useState(null);

const [mobile, setMobile] = useState("");

const [registering, setRegistering] = useState(false);

const isUpcoming = event?.status === "upcoming";
const isOngoing = event?.status === "ongoing";
const isCompleted = event?.status === "completed";

const maxParticipants = Number(event?.maxParticipants || 0);

const remainingSeats =
  maxParticipants > 0
    ? Math.max(maxParticipants - totalRegistrations, 0)
    : null;

const registrationFull =
  maxParticipants > 0 && remainingSeats === 0;

useEffect(() => {
  fetchUser();
  fetchEvent();
  checkRegistration();
  fetchGallery();
}, []);

const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://clubverse-nsgq.onrender.com/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUser(res.data.user);

  } catch (err) {
    console.log("USER FETCH ERROR:", err);
  }
};

  const fetchEvent = async () => {

    try {

      const res = await axios.get(
        `https://clubverse-nsgq.onrender.com/api/events/${id}`
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
      `https://clubverse-nsgq.onrender.com/api/events/${id}/gallery`
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
      "https://clubverse-nsgq.onrender.com/api/registration",
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

  if (!mobile.trim()) {
    alert("Please enter your mobile number.");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (registrationFull) {
    alert("Registration is full.");
    setShowRegisterModal(false);
    return;
  }

  try {

    setRegistering(true);

    const token = localStorage.getItem("token");

    await axios.post(
      "https://clubverse-nsgq.onrender.com/api/registration",
      {
        eventId: id,
        mobile,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRegistered(true);

    setTotalRegistrations((prev) => prev + 1);

    setShowRegisterModal(false);

    setShowSuccess(true);

  } catch (err) {

    alert(
      err.response?.data?.msg ||
      err.response?.data?.message ||
      "Registration Failed"
    );

  } finally {

    setRegistering(false);

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

      `https://clubverse-nsgq.onrender.com/api/events/${id}/feedback`,

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
  return <EventDetailsSkeleton />;
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
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

<h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4B2E91]">

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
  {/* EVENT COORDINATORS */}

{event.coordinators?.length > 0 && (
  <div className="mt-6">

    <h3 className="text-lg font-bold text-[#4B2E91] mb-4">
      Event Coordinators
    </h3>

    <div className="space-y-4">

      {event.coordinators.slice(0, 2).map((coordinator, index) => (
        <div
          key={index}
          className="
            rounded-2xl
            bg-[#F8F7FF]
            border
            border-[#E8E1F8]
            p-4
          "
        >

          <div className="flex items-center gap-3">

            <div className="
              w-10
              h-10
              rounded-full
              bg-[#EDE9FE]
              flex
              items-center
              justify-center
            ">
              <UserRound
                size={19}
                className="text-[#6D4BC3]"
              />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Coordinator {index + 1}
              </p>

              <p className="font-semibold text-gray-800">
                {coordinator.name}
              </p>
            </div>

          </div>

          <div className="mt-3 space-y-2">

            <a
              href={`mailto:${coordinator.email}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6D4BC3]"
            >
              <Mail size={16} />
              {coordinator.email}
            </a>

            <a
              href={`tel:${coordinator.phone}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#6D4BC3]"
            >
              <Phone size={16} />
              {coordinator.phone}
            </a>

          </div>

        </div>
      ))}

    </div>

  </div>
)}

  <div className="flex items-center gap-4 bg-[#F8F7FF] rounded-2xl p-4">
  <Users className="text-[#6D4BC3]" size={22} />

  <div>
    <p className="text-xs text-gray-500">Maximum Participants</p>

    <p className="font-semibold text-gray-800">
      {event.maxParticipants || "Unlimited"}
    </p>

 {maxParticipants > 0 && (
  <p
    className={`text-sm font-semibold mt-1 ${
      registrationFull
        ? "text-red-600"
        : remainingSeats <= 5
        ? "text-orange-600"
        : "text-green-600"
    }`}
  >
    {registrationFull
      ? "🔴 Registration Full"
      : `Available Seats: ${remainingSeats}`}
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
    disabled={registered || registrationFull}
    onClick={() => setShowRegisterModal(true)}
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
          : registrationFull
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-[#6D4BC3] to-[#8B5CF6] hover:scale-[1.02] hover:shadow-2xl"
      }
    `}
  >
    {registered
      ? "✅ Already Registered"
      : registrationFull
      ? "🔴 Registration Full"
      : "Register Now"}
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

{showRegisterModal && (
  <div
    className="
      fixed
      inset-0
      z-[60]
      bg-black/50
      backdrop-blur-sm
      flex
      items-center
      justify-center
      p-4
    "
  >

    <div
      className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        shadow-2xl
        p-6
        md:p-8
        relative
      "
    >

      {/* Close */}

      <button
        onClick={() => setShowRegisterModal(false)}
        className="
          absolute
          top-4
          right-4
          w-9
          h-9
          rounded-full
          bg-gray-100
          flex
          items-center
          justify-center
          hover:bg-gray-200
        "
      >
        <X size={18} />
      </button>

      <h2 className="text-2xl font-bold text-[#4B2E91]">
        Confirm Registration
      </h2>

      <p className="text-gray-500 text-sm mt-2">
        Enter your details to confirm your participation.
      </p>

      {/* NAME */}

      <div className="mt-6">

        <label className="text-sm font-semibold text-gray-700">
          Name
        </label>

        <input
          type="text"
          value={user?.name || ""}
          readOnly
          className="
            w-full
            mt-2
            px-4
            py-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            text-gray-700
            outline-none
          "
        />

      </div>

      {/* EMAIL */}

      <div className="mt-4">

        <label className="text-sm font-semibold text-gray-700">
          Email
        </label>

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="
            w-full
            mt-2
            px-4
            py-3
            rounded-xl
            border
            border-gray-200
            bg-gray-50
            text-gray-700
            outline-none
          "
        />

      </div>

      {/* MOBILE */}

      <div className="mt-4">

        <label className="text-sm font-semibold text-gray-700">
          Mobile Number
        </label>

        <input
          type="tel"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          placeholder="Enter 10-digit mobile number"
          className="
            w-full
            mt-2
            px-4
            py-3
            rounded-xl
            border
            border-gray-300
            focus:border-[#6D4BC3]
            focus:ring-2
            focus:ring-[#6D4BC3]/20
            outline-none
          "
        />

      </div>

      {/* BUTTONS */}

      <div className="flex gap-3 mt-7">

        <button
          onClick={() => setShowRegisterModal(false)}
          disabled={registering}
          className="
            flex-1
            py-3
            rounded-xl
            border
            border-gray-300
            text-gray-600
            font-semibold
            hover:bg-gray-50
          "
        >
          Cancel
        </button>

        <button
          onClick={handleRegister}
          disabled={registering}
          className="
            flex-[1.5]
            py-3
            rounded-xl
            bg-gradient-to-r
            from-[#6D4BC3]
            to-[#8B5CF6]
            text-white
            font-semibold
            shadow-lg
            hover:shadow-xl
            disabled:opacity-60
          "
        >
          {registering
            ? "Registering..."
            : "Confirm Registration"}
        </button>

      </div>

    </div>

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