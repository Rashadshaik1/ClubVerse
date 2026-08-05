
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaTrash,
  FaCloudUploadAlt,
  FaArrowLeft,
  FaImages,
} from "react-icons/fa";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";

/* =========================================================
   GALLERY DETAILS SKELETON
========================================================= */

const GalleryDetailsSkeleton = ({
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
      <div
        className={`flex-1 min-w-0 w-full pt-24 px-4 sm:px-6 lg:px-8 pb-12 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >

        {/* NAVBAR */}
        <ClubNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* ================= BACK BUTTON SKELETON ================= */}

        <div className="mb-5 sm:mb-6">
          <div className="h-4 w-28 rounded-md bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />
        </div>


        {/* ================= EVENT HEADER SKELETON ================= */}

        <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] mb-6 sm:mb-8 shadow-sm">

          {/* Event title */}
          <div className="h-6 sm:h-7 w-48 sm:w-64 rounded-xl bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

          {/* Small event information */}
          <div className="h-3 w-40 sm:w-52 rounded-md mt-3 bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

          {/* Upload button */}
          <div className="mt-5 h-10 sm:h-11 w-full sm:w-40 rounded-2xl bg-gradient-to-r from-[#d9f7f8] via-[#8ddfe2] to-[#d9f7f8] animate-pulse" />

        </div>


        {/* ================= SECTION TITLE ================= */}

        <div className="flex items-center justify-between mb-4 sm:mb-5">

          <div className="h-5 w-32 rounded-lg bg-gradient-to-r from-[#d9f7f8] via-[#bceff0] to-[#d9f7f8] animate-pulse" />

          <div className="h-3 w-20 rounded-md bg-gradient-to-r from-[#e5fafa] via-[#cdeff0] to-[#e5fafa] animate-pulse" />

        </div>


        {/* ================= IMAGE SKELETON GRID ================= */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((image) => (

            <div
              key={image}
              className="relative overflow-hidden rounded-2xl border border-[#cceeee] bg-white/60 shadow-sm"
            >

              {/* Image */}
              <div className="w-full aspect-square bg-gradient-to-r from-[#d9f7f8] via-[#aee8ea] to-[#d9f7f8] animate-pulse" />

              {/* Fake delete button */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gradient-to-r from-[#c5eeee] via-[#8ddfe2] to-[#c5eeee] animate-pulse" />

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};


/* =========================================================
   GALLERY DETAILS
========================================================= */

export default function GalleryDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  /* Sidebar state */
  const [sidebarOpen, setSidebarOpen] = useState(false);


  /* =========================================================
     FETCH EVENT GALLERY
  ========================================================= */

  useEffect(() => {
    fetchEventGallery();
  }, [id]);


  const fetchEventGallery = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const res = await axios.get(
      `https://clubverse-nsgq.onrender.com/api/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEvent(res.data.event);

  } catch (err) {
    console.error("Error fetching gallery:", err);

    if (err.response?.status === 401) {
      navigate("/login");
    }
  } finally {
    setLoading(false);
  }
};

  /* =========================================================
     UPLOAD IMAGES
  ========================================================= */

  const handleUpload = async (e) => {

    const files = e.target.files;

    if (!files || files.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {

      setUploading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        `https://clubverse-nsgq.onrender.com/api/events/${id}/gallery`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchEventGallery();

    } catch (err) {

      console.error(err);
      alert("Upload failed");

    } finally {

      setUploading(false);

      /* Allow same image to be selected again */
      e.target.value = "";

    }
  };


  /* =========================================================
     DELETE IMAGE
  ========================================================= */

  const handleDelete = async (imageId) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this image?"
      )
    ) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `https://clubverse-nsgq.onrender.com/api/events/${id}/gallery/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchEventGallery();

    } catch (err) {

      console.error(err);
      alert("Failed to delete image");

    }
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (
      <GalleryDetailsSkeleton
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    );

  }


  /* =========================================================
     PAGE
  ========================================================= */

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <ClubSidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="flex-1 min-w-0 w-full">

        {/* NAVBAR */}

        <ClubNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={() => navigate(-1)}
          className="mb-5 sm:mb-6 flex items-center gap-2 text-gray-500 font-bold text-xs hover:text-[#048c92] transition"
        >
          <FaArrowLeft />
          <span>Back to Gallery</span>
        </button>


        {/* =================================================
            EVENT HEADER
        ================================================= */}

        <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#cceeee] mb-6 sm:mb-8 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Event information */}

            <div className="min-w-0">

              <h1 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-800 truncate">
                {event?.title || "Event Gallery"}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-[10px] sm:text-xs text-gray-400 font-bold">

                <FaImages className="text-[#43bfc3]" />

                <span>
                  {event?.gallery?.length || 0} Photos
                </span>

              </div>

            </div>


            {/* Upload */}

            <label
              className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-2xl cursor-pointer text-xs font-black shadow-lg transition-all ${
                uploading
                  ? "bg-[#43bfc3] cursor-not-allowed"
                  : "bg-[#048c92] hover:bg-[#43bfc3] shadow-[#048c92]/20"
              } text-white`}
            >

              <FaCloudUploadAlt />

              <span>
                {uploading
                  ? "Uploading..."
                  : "Upload Photos"}
              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />

            </label>

          </div>

        </div>


        {/* =================================================
            GALLERY HEADER
        ================================================= */}

        <div className="flex items-center justify-between mb-4 sm:mb-5">

          <div>

            <h2 className="text-sm sm:text-base font-black text-[#048c92]">
              Event Photos
            </h2>

            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              Manage photos uploaded for this event.
            </p>

          </div>

          <div className="text-[10px] sm:text-xs font-bold text-gray-400">
            {event?.gallery?.length || 0} photos
          </div>

        </div>


        {/* =================================================
            EMPTY GALLERY
        ================================================= */}

        {!event?.gallery?.length ? (

          <div className="bg-white/50 backdrop-blur-md border border-dashed border-[#cceeee] rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center">

            <div className="w-14 h-14 rounded-2xl bg-[#048c92]/10 flex items-center justify-center mx-auto">

              <FaImages className="text-2xl text-[#048c92]" />

            </div>

            <h2 className="mt-5 text-base sm:text-lg font-black text-gray-700">
              No Photos Yet
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-sm mx-auto">
              Upload photos from this event to build its gallery.
            </p>

          </div>

        ) : (

          /* =================================================
             IMAGE GRID
          ================================================= */

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">

            {event.gallery.map((img, index) => (

              <div
                key={img._id || index}
                className="relative group rounded-xl sm:rounded-2xl overflow-hidden border border-[#cceeee] bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >

                {/* IMAGE */}

                <img
                  src={img.image}
                  alt={`Gallery ${index + 1}`}
                  onClick={() => setSelectedImage(img.image)}
                  className="w-full aspect-square object-cover cursor-zoom-in transition duration-500 group-hover:scale-105"
                />


                {/* DARK OVERLAY */}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition pointer-events-none" />


                {/* DELETE BUTTON */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(img._id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-red-500 text-white rounded-full shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 active:scale-95"
                  aria-label="Delete image"
                >
                  <FaTrash size={11} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* =====================================================
          IMAGE PREVIEW MODAL
      ===================================================== */}

      {selectedImage && (

        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >

          <div
            className="relative w-full max-w-6xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-1 sm:-top-4 sm:-right-4 bg-white text-black rounded-full w-9 h-9 sm:w-10 sm:h-10 text-lg sm:text-xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition z-10"
              aria-label="Close preview"
            >
              ✕
            </button>


            {/* IMAGE */}

            <img
              src={selectedImage}
              alt="Preview"
              className="w-full max-h-[85vh] object-contain rounded-xl sm:rounded-2xl bg-white"
            />

          </div>

        </div>

      )}

    </div>
  );
}
