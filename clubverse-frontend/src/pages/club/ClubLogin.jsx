
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     LOAD REMEMBERED EMAIL
  ========================================================= */

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("clubRememberEmail");

    if (rememberedEmail) {
      setForm((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));

      setRememberMe(true);
    }
  }, []);

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://clubverse-nsgq.onrender.com/api/clubs/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.msg || "Please enter valid club credentials."
        );
        setLoading(false);
        return;
      }

      /* =====================================================
         REMEMBER ME
      ===================================================== */

      if (rememberMe) {
        localStorage.setItem(
          "clubRememberEmail",
          form.email
        );
      } else {
        localStorage.removeItem("clubRememberEmail");
      }

      /* =====================================================
         STORE LOGIN DATA
      ===================================================== */

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "club",
        JSON.stringify(data.club)
      );

      navigate("/club-dashboard");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#dff8f8] flex items-center justify-center px-4 py-8 sm:px-6">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ===================================================== */}

      <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-[#43bfc3]/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 -right-32 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-[#048c92]/10 rounded-full blur-3xl" />

      <div className="absolute top-1/3 right-[10%] w-20 h-20 bg-white/40 rounded-full blur-2xl hidden sm:block" />

      {/* =====================================================
          LOGIN CARD
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-md"
      >

        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/65 backdrop-blur-2xl shadow-[0_25px_70px_rgba(4,140,146,0.14)] p-6 sm:p-8">

          {/* =================================================
              TOP GLOW
          ================================================= */}

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-[#43bfc3] to-transparent rounded-full" />

          {/* =================================================
              BRANDING
          ================================================= */}

          <div className="text-center mb-7 sm:mb-8">

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mx-auto mb-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#048c92] to-[#43bfc3] flex items-center justify-center shadow-lg shadow-[#048c92]/20"
            >
              <span className="text-white text-2xl sm:text-3xl font-black">
                C
              </span>
            </motion.div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#048c92] tracking-tight">
              ClubVerse
            </h1>

            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
              Club Administration Portal
            </p>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 px-4 py-3 rounded-xl border border-red-100 bg-red-50/80 text-red-600 text-xs sm:text-sm font-semibold text-center"
            >
              {error}
            </motion.div>
          )}

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* EMAIL */}

            <div>
              <label className="block mb-1.5 ml-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-500">
                Club Email
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />

                <input
                  type="email"
                  placeholder="Enter your club email"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-12 sm:h-[52px] pl-11 pr-4 rounded-xl bg-white/70 border border-[#cceeee] text-sm text-gray-700 font-medium placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#43bfc3] focus:ring-4 focus:ring-[#43bfc3]/10"
                />

              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block mb-1.5 ml-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-500">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={form.password}
                  autoComplete="current-password"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-12 sm:h-[52px] pl-11 pr-12 rounded-xl bg-white/70 border border-[#cceeee] text-sm text-gray-700 font-medium placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-[#43bfc3] focus:ring-4 focus:ring-[#43bfc3]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#048c92] transition"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>
            </div>

            {/* =================================================
                REMEMBER ME
            ================================================= */}

            <div className="flex items-center justify-between pt-1">

              <label className="flex items-center gap-2 cursor-pointer select-none">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="sr-only"
                />

                <span
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-200 ${
                    rememberMe
                      ? "bg-[#048c92] border-[#048c92]"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {rememberMe && (
                    <FaCheckCircle className="text-white text-[10px]" />
                  )}
                </span>

                <span className="text-xs font-semibold text-gray-500">
                  Remember me
                </span>

              </label>

              <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                Secure login
              </span>

            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <motion.button
              whileHover={{
                scale: loading ? 1 : 1.01,
              }}
              whileTap={{
                scale: loading ? 1 : 0.98,
              }}
              type="submit"
              disabled={loading}
              className={`w-full h-12 sm:h-[52px] mt-2 rounded-xl text-white font-black text-sm shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-[#43bfc3] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#048c92] to-[#43bfc3] hover:shadow-[#048c92]/25 hover:shadow-xl"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In to ClubVerse"
              )}
            </motion.button>

          </form>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="mt-7 pt-5 border-t border-gray-200/60 text-center">

            <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
              Authorized club administrators only
            </p>

            <p className="text-[10px] text-gray-300 mt-1">
              ClubVerse • College Club Management System
            </p>

          </div>

        </div>

      </motion.div>
    </div>
  );
}
