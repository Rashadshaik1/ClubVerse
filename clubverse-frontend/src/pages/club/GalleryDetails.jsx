import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaCloudUploadAlt, FaArrowLeft, FaImages } from "react-icons/fa";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";

export default function GalleryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchEventGallery();
  }, [id]);

  const fetchEventGallery = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvent(res.data.event);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  // ఇమేజ్ అప్‌లోడ్ లాజిక్
  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/events/${id}/gallery`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      fetchEventGallery(); // అప్‌లోడ్ అయ్యాక డేటా రిఫ్రెష్
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

 const handleDelete = async (imageId) => {
  if (!window.confirm("Are you sure you want to delete this image?")) return;

  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/events/${id}/gallery/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchEventGallery();
  } catch (err) {
    alert("Failed to delete image");
  }
};

  if (loading) return <div className="text-center pt-20 text-[#048c92] font-black">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] to-[#edfdfd] flex">
      <ClubSidebar />
      <div className="flex-1 pt-24 px-8 pb-12">
        <ClubNavbar />
        
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-gray-500 font-bold text-xs hover:text-[#048c92]">
          <FaArrowLeft /> Back to Gallery
        </button>

        <div className="bg-white/60 p-6 rounded-3xl border border-[#cceeee] mb-8">
          <h1 className="text-xl font-black text-gray-800">{event?.title}</h1>
          <div className="mt-4 flex gap-4">
            <label className="flex items-center gap-2 bg-[#048c92] text-white px-5 py-3 rounded-2xl cursor-pointer text-xs font-black shadow-lg shadow-[#048c92]/20">
              <FaCloudUploadAlt /> {uploading ? "Uploading..." : "Upload Photos"}
              <input type="file" multiple className="hidden" onChange={handleUpload} accept="image/*" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
         {event?.gallery?.map((img, index) => (
  <div
    key={index}
    className="relative group rounded-2xl overflow-hidden border border-[#cceeee] bg-white"
  >
    <img
      src={img.image}
      alt="Gallery"
      onClick={() => setSelectedImage(img.image)}
      className="w-full h-40 object-cover cursor-zoom-in transition duration-300 group-hover:scale-105"
    />

    <button
      onClick={() => handleDelete(img._id)}
      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
    >
      <FaTrash size={12} />
    </button>
  </div>
))}
        </div>
        {selectedImage && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="relative max-w-5xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedImage(null)}
        className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 text-xl font-bold shadow-lg hover:bg-red-500 hover:text-white transition"
      >
        ✕
      </button>

      <img
        src={selectedImage}
        alt="Preview"
        className="w-full max-h-[85vh] object-contain rounded-2xl bg-white"
      />
    </div>
  </div>
)}
      </div>
    </div>
  );
}