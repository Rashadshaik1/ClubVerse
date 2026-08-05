import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import logo from "../../assets/logo.png";
import {
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";
export default function StudentAuth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);

const [forgotPassword, setForgotPassword] = useState(false);
const [forgotStep, setForgotStep] = useState(1);
const [newPassword, setNewPassword] = useState("");
const [confirmNewPassword, setConfirmNewPassword] = useState("");
const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  otp: "",
  resetOtp: ""
});

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
  if (step === 2 && timer > 0) {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [step, timer]);

useEffect(() => {
  const savedEmail = localStorage.getItem("rememberEmail");
  const savedPassword = localStorage.getItem("rememberPassword");
  const savedRemember = localStorage.getItem("rememberMe");

  if (savedRemember === "true") {
    setRememberMe(true);

    setForm((prev) => ({
      ...prev,
      email: savedEmail || "",
      password: savedPassword || "",
    }));
  }
}, []);




  // ================= LOGIN =================

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch(
      "https://clubverse-nsgq.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || "Login Failed");
      return;
    }

    localStorage.setItem("token", data.token);

    localStorage.setItem(
      "student",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
    // Remember Me
if (rememberMe) {
  localStorage.setItem("rememberMe", "true");
  localStorage.setItem("rememberEmail", form.email);
  localStorage.setItem("rememberPassword", form.password);
} else {
  localStorage.removeItem("rememberMe");
  localStorage.removeItem("rememberEmail");
  localStorage.removeItem("rememberPassword");
}

    navigate("/student-home");

  } catch {
    setError("Server Error");
  } finally {
    setLoading(false);
  }
};

  // ================= SEND OTP =================

  const sendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.endsWith("@gvpce.ac.in")) {
      setError("Only GVPCE emails allowed");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://clubverse-nsgq.onrender.com/api/auth/register-send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg);
        return;
      }

      setStep(2);

    } catch {
      setError("Server Error");
    }

    setLoading(false);
  };

  // ================= VERIFY OTP =================

  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(
        "https://clubverse-nsgq.onrender.com/api/auth/verify-otp-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: form.email,
            otp: form.otp
          })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg);
        return;
      }

      alert("Registration Successful");

      setIsLogin(true);
      setStep(1);

    } catch {
      setError("Server Error");
    }

    setLoading(false);
  };

  // ================= RESEND OTP =================
  const handleOtpChange = (value, index) => {
  if (!/^\d*$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value.slice(-1);
  setOtp(newOtp);

  if (value && index < 5) {
    inputRefs.current[index + 1].focus();
  }

  setForm({
    ...form,
    otp: newOtp.join("")
  });
};

const handleKeyDown = (e, index) => {
  if (
    e.key === "Backspace" &&
    !otp[index] &&
    index > 0
  ) {
    inputRefs.current[index - 1].focus();
  }
};
//resend-OTP
const resendOTP = async () => {
  try {
    setError("");

    const res = await fetch(
      "https://clubverse-nsgq.onrender.com/api/auth/resend-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg);
      return;
    }

    setTimer(60);
    setOtp(["", "", "", "", "", ""]);

    setForm({
      ...form,
      otp: ""
    });

    inputRefs.current[0]?.focus();

    alert("New OTP sent successfully!");

  } catch (err) {
    console.error(err);
    setError("Unable to resend OTP");
  }
};

// ================= FORGOT PASSWORD - SEND OTP =================

const sendForgotOtp = async (e) => {
  e.preventDefault();

  setError("");

  try {
    setLoading(true);

    const res = await fetch(
      "https://clubverse-nsgq.onrender.com/api/auth/forgot-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || "Failed to send OTP");
      return;
    }

    setForgotStep(2);
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);

  } catch (err) {
    console.error(err);
    setError("Server Error");
  } finally {
    setLoading(false);
  }
};

// ================= RESET PASSWORD =================

const handleResetPassword = async (e) => {
  e.preventDefault();

  setError("");

  if (newPassword !== confirmNewPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(
      "https://clubverse-nsgq.onrender.com/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          otp: otp.join(""),
          password: newPassword
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.msg || "Password reset failed");
      return;
    }

    alert("Password reset successful!");

    // Reset all forgot password state
    setForgotPassword(false);
    setForgotStep(1);
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmNewPassword("");

    setForm({
      ...form,
      password: "",
      resetOtp: "",
      otp: ""
    });

  } catch (err) {
    console.error(err);
    setError("Server Error");
  } finally {
    setLoading(false);
  }
};

return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff] flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8">

    {/* =====================================================
        FLOATING PARTICLES
    ===================================================== */}

    {[
      { size: 7, left: "8%", top: "18%", delay: 0 },
      { size: 5, left: "18%", top: "72%", delay: 1 },
      { size: 9, left: "30%", top: "12%", delay: 2 },
      { size: 6, left: "72%", top: "18%", delay: 0.5 },
      { size: 8, left: "86%", top: "35%", delay: 1.5 },
      { size: 5, left: "78%", top: "78%", delay: 2.5 },
      { size: 7, left: "12%", top: "45%", delay: 1.2 },
      { size: 5, left: "92%", top: "68%", delay: 0.8 },
    ].map((particle, index) => (
      <motion.span
        key={index}
        className="absolute rounded-full bg-[#8D76D8]/25 pointer-events-none"
        style={{
          width: particle.size,
          height: particle.size,
          left: particle.left,
          top: particle.top,
        }}
        animate={{
          y: [0, -18, 0],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 4 + (index % 3),
          repeat: Infinity,
          delay: particle.delay,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Soft background glow */}

    <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#8D76D8]/10 rounded-full blur-3xl" />

    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#6D4BC3]/10 rounded-full blur-3xl" />


    {/* =====================================================
        AUTH CARD
    ===================================================== */}

    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-[430px]"
    >

      <div className="w-full bg-white/55 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-[0_20px_60px_rgba(109,75,195,0.14)] p-4 sm:p-7 md:p-8">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="text-center mb-7 sm:mb-8">

          {/* Logo-style icon */}

         <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 flex items-center justify-center p-2 shadow-lg shadow-[#6D4BC3]/10">

  <img
    src={logo}
    alt="ClubVerse"
    className="w-full h-full object-contain rounded-xl"
  />

</div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#6D4BC3]">
  {forgotPassword
    ? "Reset Password"
    : isLogin
    ? "Student Login"
    : step === 2
    ? "Verify OTP"
    : "Student Register"}
</h1>

          <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
            {forgotPassword
              ? "Securely reset your ClubVerse password"
              : isLogin
              ? "Sign in to continue to ClubVerse"
              : step === 2
              ? "Verify your GVPCE email address"
              : "Create your ClubVerse student account"}
          </p>

        </div>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4 px-4 py-3 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 text-xs sm:text-sm font-semibold text-center shadow-sm"
  >
    {error}
  </motion.div>
)}


        {/* =================================================
            LOGIN
        ================================================= */}

        {isLogin && !forgotPassword && (

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Student Email
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Enter your GVPCE email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/70 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/70 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6D4BC3] transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* REMEMBER + FORGOT */}

            <div className="flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">

              <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 cursor-pointer select-none">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                  className="w-4 h-4 accent-[#6D4BC3] cursor-pointer"
                />

                Remember Me

              </label>


              <button
                type="button"
                onClick={() => {
                  setForgotPassword(true);
                  setForgotStep(1);
                  setError("");
                  setOtp(["", "", "", "", "", ""]);
                }}
                className="text-xs sm:text-sm text-[#6D4BC3] hover:underline font-semibold"
              >
                Forgot Password?
              </button>

            </div>


            {/* LOGIN BUTTON */}

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: loading ? 1 : 0.98 }}
   className={`w-full h-12 rounded-xl text-white text-sm font-black transition-all duration-300 ${
  loading
    ? "bg-[#8D76D8] cursor-not-allowed opacity-90"
    : "bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8] hover:shadow-lg hover:shadow-[#6D4BC3]/25 hover:-translate-y-0.5 active:translate-y-0"
}`}
            >

              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}

            </motion.button>

          </form>
        )}


        {/* =================================================
            FORGOT PASSWORD - STEP 1
        ================================================= */}

        {isLogin &&
          forgotPassword &&
          forgotStep === 1 && (

            <form
              onSubmit={sendForgotOtp}
              className="space-y-4"
            >

              <div>

                <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                  GVPCE Email
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                  <input
                    type="email"
                    placeholder="Enter your GVPCE email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/60 border border-[#DDD4F2] text-sm outline-none focus:bg-white/80 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/10"
                  />

                </div>

              </div>


              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl text-white text-sm font-black tracking-wide transition-all duration-300 ${
  loading
    ? "bg-[#8D76D8] cursor-not-allowed"
    : "bg-gradient-to-r from-[#6D4BC3] via-[#765FCE] to-[#8D76D8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6D4BC3]/25 active:translate-y-0"
}`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>


              <button
                type="button"
                onClick={() => {
                  setForgotPassword(false);
                  setForgotStep(1);
                  setError("");
                }}
                className="w-full text-xs sm:text-sm text-gray-500 hover:text-[#6D4BC3] font-semibold transition-colors"
              >
                Back to Login
              </button>

            </form>
          )}


        {/* =================================================
            FORGOT PASSWORD - STEP 2
        ================================================= */}

        {isLogin &&
          forgotPassword &&
          forgotStep === 2 && (

            <form
              onSubmit={handleResetPassword}
              className="space-y-4"
            >

              <div className="text-center">

                <p className="text-xs sm:text-sm text-gray-500">
                  Enter the OTP sent to
                </p>

                <p className="text-xs sm:text-sm font-bold text-[#6D4BC3] mt-1 break-all">
                  {form.email}
                </p>

              </div>


              {/* OTP */}

              <div className="flex justify-center gap-1 sm:gap-2 w-full">

                {otp.map((digit, index) => (

                  <input
                    key={index}
                    ref={(el) =>
                      (inputRefs.current[index] = el)
                    }
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(
                        e.target.value,
                        index
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                    className="w-9 h-10 xs:w-10 xs:h-11 sm:w-12 sm:h-12 rounded-xl text-center text-lg sm:text-xl font-black text-[#6D4BC3] bg-white/50 backdrop-blur-md border border-white/80 outline-none transition-all duration-200 focus:bg-white/80 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/20 hover:border-[#8D76D8]/40"
                  />

                ))}

              </div>


              {/* NEW PASSWORD */}

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full h-12 px-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/80 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
              />


              {/* CONFIRM */}

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) =>
                  setConfirmNewPassword(e.target.value)
                }
                className="w-full h-12 px-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/80 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
              />


              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl text-white text-sm font-black tracking-wide transition-all duration-300 ${
  loading
    ? "bg-[#8D76D8] cursor-not-allowed"
    : "bg-gradient-to-r from-[#6D4BC3] via-[#765FCE] to-[#8D76D8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6D4BC3]/25 active:translate-y-0"
}`}
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>

            </form>
          )}


        {/* =================================================
            REGISTER STEP 1
        ================================================= */}

        {!isLogin && step === 1 && (

          <form
            onSubmit={sendOTP}
            className="space-y-4"
          >

            {/* NAME */}

            <div>

              <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/70 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                GVPCE Email
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                <input
                  type="email"
                  placeholder="Enter your GVPCE email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/70 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Create password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/70 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6D4BC3] transition-all duration-200 hover:scale-110"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400/80 text-sm transition-colors" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword:
                        e.target.value,
                    })
                  }
                  className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/50 backdrop-blur-md border border-white/80 text-sm text-gray-700 placeholder:text-gray-400 outline-none transition-all duration-200 focus:bg-white/70 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/15 hover:border-[#8D76D8]/40"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6D4BC3] transition-all duration-200 hover:scale-110"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-xl text-white text-sm font-black tracking-wide transition-all duration-300 ${
  loading
    ? "bg-[#8D76D8] cursor-not-allowed"
    : "bg-gradient-to-r from-[#6D4BC3] via-[#765FCE] to-[#8D76D8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6D4BC3]/25 active:translate-y-0"
}`}
            >
              {loading
                ? "Sending OTP..."
                : "Send OTP"}
            </button>

          </form>
        )}


        {/* =================================================
            REGISTER OTP
        ================================================= */}

        {!isLogin && step === 2 && (

          <form
            onSubmit={verifyOTP}
            className="space-y-5"
          >

            <div className="text-center">

              <p className="text-xs sm:text-sm text-gray-500">
                We've sent a 6-digit verification code to
              </p>

              <p className="text-xs sm:text-sm font-bold text-[#6D4BC3] mt-1 break-all">
                {form.email}
              </p>

            </div>


            {/* OTP BOXES */}

            <div className="flex justify-center gap-1 sm:gap-2 w-full">

              {otp.map((digit, index) => (

                <input
                  key={index}
                  ref={(el) =>
                    (inputRefs.current[index] = el)
                  }
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(
                      e.target.value,
                      index
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, index)
                  }
                  className="w-9 h-10 xs:w-10 xs:h-11 sm:w-12 sm:h-12 rounded-xl text-center text-lg sm:text-xl font-black text-[#6D4BC3] bg-white/50 backdrop-blur-md border border-white/80 outline-none transition-all duration-200 focus:bg-white/80 focus:border-[#8D76D8] focus:ring-2 focus:ring-[#8D76D8]/20 hover:border-[#8D76D8]/40"
                />

              ))}

            </div>


            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-xl text-white text-sm font-black tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
  loading
    ? "bg-[#8D76D8] cursor-not-allowed"
    : "bg-gradient-to-r from-[#6D4BC3] via-[#765FCE] to-[#8D76D8] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#6D4BC3]/25 active:translate-y-0"
}`}
            >

              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}

            </button>


            <div className="text-center">

              {timer > 0 ? (

                <p className="text-xs sm:text-sm text-gray-500">
                  Resend OTP in{" "}
                  <span className="font-bold text-[#6D4BC3]">
                    {timer}s
                  </span>
                </p>

              ) : (

                <button
                  type="button"
                  onClick={resendOTP}
                  className="text-xs sm:text-sm text-[#6D4BC3] font-bold hover:text-[#8D76D8] hover:underline transition-colors"
                >
                  Resend OTP
                </button>

              )}

            </div>

          </form>
        )}


        {/* =================================================
            SWITCH LOGIN / REGISTER
        ================================================= */}

        {!forgotPassword && (

          <div className="mt-6 pt-5 border-t border-white/70 text-center">

            <p className="text-xs sm:text-sm text-gray-500">

              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsLogin(!isLogin);
                  setStep(1);
                }}
                className="ml-1 text-[#6D4BC3] font-bold hover:text-[#8D76D8] hover:underline transition-colors"
              >
                {isLogin
                  ? "Sign Up"
                  : "Login"}
              </button>

            </p>

          </div>

        )}

      </div>

    </motion.div>

  </div>
);
}
