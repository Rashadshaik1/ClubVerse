
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import logo from "../../assets/logoclub.png";

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

  /* =====================================================
     LOAD REMEMBERED EMAIL
  ===================================================== */

  useEffect(() => {
    const savedEmail = localStorage.getItem("clubRememberEmail");

    if (savedEmail) {
      setForm((prev) => ({
        ...prev,
        email: savedEmail,
      }));

      setRememberMe(true);
    }
  }, []);

  /* =====================================================
     LOGIN
  ===================================================== */

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

      /* Remember Email */

      if (rememberMe) {
        localStorage.setItem(
          "clubRememberEmail",
          form.email
        );
      } else {
        localStorage.removeItem("clubRememberEmail");
      }

      /* Store Login Data */

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "club",
        JSON.stringify(data.club)
      );

      navigate("/club-dashboard");

    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FLOATING PARTICLES
  ===================================================== */

  const particles = [
    { size: 7, left: "8%", top: "18%", delay: 0 },
    { size: 5, left: "18%", top: "72%", delay: 1 },
    { size: 9, left: "30%", top: "12%", delay: 2 },
    { size: 6, left: "72%", top: "18%", delay: 0.5 },
    { size: 8, left: "86%", top: "35%", delay: 1.5 },
    { size: 5, left: "78%", top: "78%", delay: 2.5 },
    { size: 7, left: "12%", top: "45%", delay: 1.2 },
    { size: 5, left: "92%", top: "68%", delay: 0.8 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#dff8f8] flex items-center justify-center px-4 py-8">

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#43bfc3]/30 pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + index % 3,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Soft background circles */}

      <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#43bfc3]/10 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#048c92]/10 rounded-full blur-3xl" />

      {/* =====================================================
          LOGIN CARD
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-[420px]"
      >

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/70 shadow-xl shadow-[#048c92]/10 p-6 sm:p-8">

          {/* =================================================
              LOGO
          ================================================= */}

          <div className="text-center mb-7">

            <img
              src={logo}
              alt="ClubVerse"
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto object-contain rounded-2xl mb-4"
            />

            <h1 className="text-2xl sm:text-3xl font-black text-[#048c92]">
              Club Login
            </h1>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Sign in to manage your club
            </p>

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold text-center">
              {error}
            </div>
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

              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Club Email
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type="email"
                  placeholder="Enter club email"
                  value={form.email}
                  autoComplete="email"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f8fdfd] border border-[#cceeee] text-sm text-gray-700 outline-none transition focus:bg-white focus:border-[#43bfc3] focus:ring-2 focus:ring-[#43bfc3]/10"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={form.password}
                  autoComplete="current-password"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-11 rounded-xl bg-[#f8fdfd] border border-[#cceeee] text-sm text-gray-700 outline-none transition focus:bg-white focus:border-[#43bfc3] focus:ring-2 focus:ring-[#43bfc3]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#048c92] transition"
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

            <div className="flex items-center">

              <label className="flex items-center gap-2 cursor-pointer select-none">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="w-4 h-4 accent-[#048c92] cursor-pointer"
                />

                <span className="text-xs font-semibold text-gray-500">
                  Remember me
                </span>

              </label>

            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full h-12 rounded-xl text-white text-sm font-black transition-all duration-200 ${
                loading
                  ? "bg-[#43bfc3] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#048c92] to-[#43bfc3] hover:shadow-lg hover:shadow-[#048c92]/20"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </motion.button>

          </form>

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="mt-6 pt-5 border-t border-gray-100 text-center">

            <p className="text-[10px] sm:text-xs text-gray-400">
              ClubVerse • College Club Management System
            </p>

          </div>

        </div>

      </motion.div>

    </div>
  );
}
