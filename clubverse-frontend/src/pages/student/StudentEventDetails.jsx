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

const [showSuccess, setShowSuccess] = useState(false);

const [gallery, setGallery] = useState([]);

const [rating, setRating] = useState(0);

const [comment, setComment] = useState("");

const [submittingFeedback, setSubmittingFeedback] = useState(false);

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

      setEvent(res.data.event);

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

      const exists = res.data.data.some(
        (reg) => reg.eventId?._id === id
      );

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

      <img
        src={event.banner}
        alt={event.title}
        className="w-full h-[340px] object-cover"
      />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2">

            <img
              src={event.poster}
              alt=""
              className="rounded-3xl shadow-xl w-full"
            />

            <h1 className="text-4xl font-bold mt-8 text-[#4B2E91]">

              {event.title}

            </h1>

            <p className="mt-6 leading-8 text-gray-600">

              {event.description}

            </p>

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-[#4B2E91]">

                Rules

              </h2>

              <p className="mt-3 text-gray-600">

                {event.rules || "No rules specified"}

              </p>

            </div>

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-[#4B2E91]">

                Requirements

              </h2>

              <p className="mt-3 text-gray-600">

                {event.requirements || "None"}

              </p>

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

            <div className="bg-white rounded-3xl shadow-xl p-7 sticky top-28">

              <div className="space-y-5">

                <div className="flex gap-3">

                  <CalendarDays />

                  <span>

                    {new Date(event.date).toLocaleDateString()}

                  </span>

                </div>

                <div className="flex gap-3">

                  <Clock />

                  <span>

                    {event.time || "TBA"}

                  </span>

                </div>

                <div className="flex gap-3">

                  <MapPin />

                  <span>

                    {event.venue}

                  </span>

                </div>

                <div className="flex gap-3">

                  <Building2 />

                  <span>

                    {event.clubId?.name}

                  </span>

                </div>

                <div className="flex gap-3">

                  <Users />

                  <span>

                    {event.maxParticipants || "Unlimited"} Seats

                  </span>

                </div>

              </div>
              <div className="mt-8">

  {isUpcoming && (
    <div className="rounded-xl bg-green-100 text-green-700 px-4 py-3 font-semibold text-center">
      ⏳ Registrations Open
    </div>
  )}

  {isOngoing && (
    <div className="rounded-xl bg-orange-100 text-orange-700 px-4 py-3 font-semibold text-center">
      ▶ Event is Live
    </div>
  )}

  {isCompleted && (
    <div className="rounded-xl bg-blue-100 text-blue-700 px-4 py-3 font-semibold text-center">
      ✔ Event Completed
    </div>
  )}

</div>

              {isUpcoming && (

<button
  disabled={registered}
  onClick={handleRegister}
  className={`w-full mt-6 py-4 rounded-2xl font-bold text-white transition

  ${
    registered
      ? "bg-green-500 cursor-not-allowed"
      : "bg-[#6D4BC3] hover:bg-[#5A3AB2]"
  }`}

>

  {registered
    ? "✅ Already Registered"
    : "Register Now"}

</button>

)}

            </div>

          </div>

        </div>

      </div>
      <SuccessModal
  open={showSuccess}
  title="Registration Successful 🎉"
  message={`You have successfully registered for "${event?.title}". We look forward to seeing you at the event!`}
  onClose={() => setShowSuccess(false)}
/>

    </div>

  );

}