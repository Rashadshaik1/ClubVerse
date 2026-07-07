import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Camera,
  Mail,
  Calendar,
  User,
  Phone,
  MapPin,
  Lock,
  ShieldAlert,
  Info,
  Save,
  X,
} from "lucide-react";

// 🌟 Font Awesome నుంచి సోషల్ ఐకాన్స్ ఇంపోర్ట్ చేశాను
import { FaInstagram, FaLinkedin } from "react-icons/fa";

import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";

export default function Profile() {
  const [club, setClub] = useState({
    _id: "",
    name: "",
    type: "",
    email: "",
    createdAt: "",
  });
const [banner, setBanner] = useState(
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"
);

const [logo, setLogo] = useState(
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150&auto=format&fit=crop&q=80"
);

const [about, setAbout] = useState("");

const [estYear, setEstYear] = useState("");

const [facultyName, setFacultyName] = useState("");

const [facultyEmail, setFacultyEmail] = useState("");

const [contactNum, setContactNum] = useState("");

const [location, setLocation] = useState("");

const [socials, setSocials] = useState({
  instagram: "",
  linkedin: "",
});


  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchClubProfile();
  }, []);

const fetchClubProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/clubs/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data.data;

    setClub(data);

    // About
    setAbout(data.description || "");

    // Established Year
    setEstYear(data.establishedYear || "");

    // Faculty Coordinator
    setFacultyName(data.facultyCoordinator?.name || "");
    setFacultyEmail(data.facultyCoordinator?.email || "");

    // Contact
    setContactNum(data.contactNumber || "");
    setLocation(data.location || "");

    // Social Links
    setSocials({
      instagram: data.instagram || "",
      linkedin: data.linkedin || "",
    });

    // Images
    setLogo(
      data.logo ||
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150&auto=format&fit=crop&q=80"
    );

    setBanner(
      data.banner ||
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"
    );

  } catch (err) {
    console.log(err);
  }
};

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBanner(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };
 const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:5000/api/clubs/profile",
      {
        description: about,
        establishedYear: estYear,

        facultyCoordinator: {
          name: facultyName,
          email: facultyEmail,
        },

        contactNumber: contactNum,
        location: location,

        instagram: socials.instagram,
        linkedin: socials.linkedin,

        logo: logo,
        banner: banner,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile Updated Successfully");

    // Optional: Refresh profile after update
    fetchClubProfile();

  } catch (err) {
    console.log(err);
    alert("Failed to update profile");
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      <ClubSidebar />

      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12 transition-all duration-300">
        <ClubNavbar />

        <div className="max-w-5xl mx-auto space-y-8">
          {/* ================= 1 & 2. HERO BANNER & LOGO SECTION ================= */}
          <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm relative">
            <div className="h-64 w-full bg-gray-100 relative group">
              <img
                src={banner}
                alt="Club Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-4 py-2 rounded-xl border border-gray-200 shadow-md flex items-center gap-2 hover:bg-white transition">
                  <Camera className="w-4 h-4 text-[#048c92]" />
                  Change Banner
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="px-8 pb-6 pt-16 relative flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 border-b border-gray-100">
              <div className="absolute -top-16 left-8 sm:left-12 w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden group">
                <img
                  src={logo}
                  alt="Club Logo"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="sm:pl-40 text-center sm:text-left">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                  {club.name}
                </h2>
                <span className="inline-block mt-1 text-xs font-bold text-[#048c92] bg-[#43bfc3]/10 px-3 py-1 rounded-full border border-[#43bfc3]/20">
                  {club.type}
                </span>
              </div>
            </div>
          </div>

          {/* MAIN GRID CONTROL SPLIT */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LEFT / CENTER DEEP FORM COLUMNS */}
            <div className="md:col-span-2 space-y-8">
              {/* ================= 3. BASIC CLUB INFORMATION ================= */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-800 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#048c92]" /> Basic Club
                  Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Club Name (Read Only)
                    </label>
                    <input
                      type="text"
                      value={club.name}
                      readOnly
                      className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl text-xs font-semibold focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Club Type (Read Only)
                    </label>
                    <input
                      type="text"
                      value={club.type}
                      readOnly
                      className="w-full px-4 py-2.5 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl text-xs font-semibold focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                    Registered Email (Read Only)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={club.email}
                      readOnly
                      className="w-full pl-11 pr-4 py-2.5 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl text-xs font-semibold focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Established Year
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={estYear}
                        onChange={(e) => setEstYear(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                        placeholder="e.g. 2018"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      About Club
                    </label>
                    <textarea
                      rows="4"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition resize-none shadow-inner"
                      placeholder="Tell us about your club objective..."
                    />
                  </div>
                </div>
              </div>

              {/* ================= 4. FACULTY COORDINATOR ================= */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-800 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#048c92]" /> Faculty
                  Coordinator Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Coordinator Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={facultyName}
                        onChange={(e) => setFacultyName(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Coordinator Email ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={facultyEmail}
                        onChange={(e) => setFacultyEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= 5. CONTACT INFORMATION ================= */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-800 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#048c92]" /> Contact &
                  Communication
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Contact Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Club Room / Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              {/* ================= 6. SOCIAL MEDIA SECTION (🌟 FIXED: FaInstagram వాడాను) ================= */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-800 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <FaInstagram className="w-4 h-4 text-[#048c92]" /> Social
                  Connect Handles
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      Instagram
                    </label>
                    <div className="relative">
                      <FaInstagram className="absolute left-4 top-3 w-4 h-4 text-pink-500 text-sm" />
                      <input
                        type="text"
                        value={socials.instagram}
                        onChange={(e) =>
                          setSocials({ ...socials, instagram: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                        placeholder="Instagram URL"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                      LinkedIn
                    </label>
                    <div className="relative">
                      <FaLinkedin className="absolute left-4 top-3 w-4 h-4 text-blue-600 text-sm" />
                      <input
                        type="text"
                        value={socials.linkedin}
                        onChange={(e) =>
                          setSocials({ ...socials, linkedin: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-2.5 border border-gray-200 bg-white text-gray-700 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#43bfc3] transition shadow-inner"
                        placeholder="LinkedIn URL"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= 7. ACCOUNT INFORMATION CARD ================= */}
              <div className="bg-[#f0f9fa] border border-[#cceeee] rounded-3xl p-6 shadow-sm space-y-3.5">
                <h3 className="text-base font-black text-gray-800 border-b border-[#cceeee] pb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#048c92]" /> Meta
                  Account Scope
                </h3>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">
                    Club Global Identifier
                  </label>
                  <p className="text-xs font-mono font-bold text-gray-700 tracking-wide select-all bg-white/60 px-3 py-1.5 border border-[#cceeee] rounded-xl">
                    {club._id}
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">
                    Created Timestamp
                  </label>
                  <p className="text-xs font-bold text-gray-600 bg-white/60 px-3 py-1.5 border border-[#cceeee] rounded-xl">
                    {club.createdAt
                      ? new Date(club.createdAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              {/* ================= 8. SECURITY CARD SECTION ================= */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-base font-black text-gray-800 border-b border-gray-50 pb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#048c92]" /> Security Layout
                </h3>
                <p className="text-[11px] font-medium text-gray-400 leading-relaxed">
                  Ensure account integrity by maintaining distinct
                  authentication parameter keys regularly.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition duration-200"
                >
                  <Lock className="w-3.5 h-3.5 text-[#048c92]" /> Change
                  Password
                </button>
              </div>
            </div>
          </div>

          {/* ================= 9. BOTTOM CONTROL ACTION BAR ================= */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/60">
            <button
              type="button"
              className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-500 font-extrabold text-xs rounded-xl transition duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={updateProfile}
              className="px-6 py-2.5 bg-[#048c92] hover:bg-[#39adb2] text-white font-black text-xs rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition duration-200 transform active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* ================= SECURITY SYSTEM PASSWORD MODAL ================= */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-gray-200 w-full max-w-md rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 relative">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-gray-50 pb-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[#048c92]/10 flex items-center justify-center text-[#048c92]">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-black text-gray-800">
                  Change Account Password
                </h3>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 text-xs font-black bg-[#048c92] text-white rounded-xl hover:bg-[#39adb2] transition shadow-sm"
                  >
                    Update Password
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
