import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function CreateClub() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "social",
    description: "",
    logo: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isMismatch =
    confirmPassword.length > 0 && form.password !== confirmPassword;

  // IMAGE UPLOAD
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, logo: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isMismatch) {
      setMsg("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(
        "https://clubverse-nsgq.onrender.com/api/admin/create-club",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.msg || "Error");
        setLoading(false);
        return;
      }

      setMsg("🎉 Club created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        type: "social",
        description: "",
        logo: "",
      });

      setConfirmPassword("");
      setPreview(null);
      setShowPassword(false);
    } catch (err) {
      setMsg("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Sidebar />

      <div className="lg:ml-72 w-full p-4 sm:p-6 md:p-10 flex items-center justify-center min-w-0">
        {/* LOADER OVERLAY */}
        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <Loader />
          </div>
        )}

        {/* CARD */}
        <div className="w-full max-w-[460px]">
          <div className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow">
            {/* HEADER */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#00C2FF]">
              Create Club
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm mt-1 mb-6">
              Add a new club to ClubVerse ecosystem
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* NAME */}
              <input
                placeholder="Club Name"
                className="p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-[#00C2FF] text-sm sm:text-base"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              {/* EMAIL */}
              <input
                placeholder="Club Email"
                className="p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-[#00C2FF] text-sm sm:text-base"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="p-3 pr-12 w-full rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-[#00C2FF] text-sm sm:text-base"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-[#00C2FF] text-sm sm:text-base"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {isMismatch && (
                <p className="text-xs text-red-400">
                  Passwords do not match
                </p>
              )}

              {/* TYPE */}
              <select
                className="p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none text-sm sm:text-base"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option className="text-black" value="social">
                  Social Club
                </option>
                <option className="text-black" value="technical">
                  Technical Club
                </option>
                <option className="text-black" value="cultural">
                  Cultural Club
                </option>
              </select>

              {/* IMAGE */}
              <label className="p-4 border border-dashed border-white/20 rounded-xl text-center cursor-pointer hover:border-[#00C2FF] transition text-sm sm:text-base">
                📸 Upload Logo
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>

              {/* PREVIEW */}
              {preview && (
                <div className="flex justify-center">
                  <img
                    src={preview}
                    alt="Logo Preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#00C2FF] object-cover"
                  />
                </div>
              )}

              {/* DESCRIPTION */}
              <textarea
                placeholder="Description"
                rows={3}
                className="p-3 rounded-xl bg-black/20 border border-white/10 text-white outline-none focus:border-[#00C2FF] text-sm sm:text-base"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              {/* BUTTON */}
              <button
                disabled={loading}
                className="p-3 rounded-xl bg-[#00C2FF] text-black font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? "Creating..." : "Create Club"}
              </button>
            </form>

            {/* MESSAGE */}
            {msg && (
              <p
                className={`text-sm mt-3 ${
                  msg.includes("❌") || msg.includes("Error")
                    ? "text-red-400"
                    : "text-green-400"
                }`}
              >
                {msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}