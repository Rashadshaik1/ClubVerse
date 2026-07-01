import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useRef } from "react";

export default function StudentAuth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
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




  // ================= LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/login",
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
        "user",
        JSON.stringify(data.user)
      );

      navigate("/student-dashboard");

    } catch {
      setError("Server Error");
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
        "http://localhost:5000/api/auth/register-send-otp",
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
        "http://localhost:5000/api/auth/verify-otp-register",
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
      "http://localhost:5000/api/auth/resend-otp",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f4ff] via-[#eef2ff] to-[#e6f7ff]">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-[400px] p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-[#DDD4F2]"
      >

        <h2 className="text-2xl font-bold text-center text-[#6D4BC3] mb-5">
          {isLogin ? "Student Login" : "Student Register"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        {/* ================= LOGIN ================= */}

        {isLogin && (
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-3"
          >

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              className="p-3 rounded-lg bg-white/60 border border-[#DDD4F2] focus:outline-none focus:ring-2 focus:ring-[#8D76D8]"
            />

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
                className="w-full p-3 rounded-lg bg-white/60 border border-[#DDD4F2] focus:outline-none focus:ring-2 focus:ring-[#8D76D8]"
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <button
              className="py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8]"
            >
              Login
            </button>

          </form>
        )}

        {/* ================= REGISTER ================= */}

        {!isLogin && step === 1 && (
          <form
            onSubmit={sendOTP}
            className="flex flex-col gap-3"
          >

            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value
                })
              }
              className="p-3 rounded-lg bg-white/60 border border-[#DDD4F2] focus:outline-none focus:ring-2 focus:ring-[#8D76D8]"
            />

            <input
              type="email"
              placeholder="GVPCE Email"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
              className="p-3 rounded-lg bg-white/60 border border-[#DDD4F2] focus:outline-none focus:ring-2 focus:ring-[#8D76D8]"
            />

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
                className="w-full p-3 rounded-lg bg-white/60 border border-[#DDD4F2] focus:outline-none focus:ring-2 focus:ring-[#8D76D8]"
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword:
                      e.target.value
                  })
                }
                className="w-full p-3 rounded-lg bg-white/60 border border-[#DDD4F2] focus:outline-none focus:ring-2 focus:ring-[#8D76D8]"
              />

              <button
                type="button"
                className="absolute right-4 top-4 text-gray-500"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <button
              disabled={loading}
              className="py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#6D4BC3] to-[#8D76D8]"
            >
              Send OTP
            </button>

          </form>
        )}

{/* ================= OTP ================= */}

{!isLogin && step === 2 && (
  <form
    onSubmit={verifyOTP}
    className="flex flex-col gap-5"
  >

    <div className="text-center">

      <h3 className="text-lg font-semibold text-[#6D4BC3]">
        Verify OTP
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        We've sent a 6-digit verification code to
      </p>

      <p className="text-sm font-semibold text-[#6D4BC3]">
        {form.email}
      </p>

    </div>

    {/* OTP BOXES */}

    <div className="flex justify-center gap-3">

      {otp.map((digit, index) => (

        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
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
          className="w-12 h-12 rounded-xl text-center text-xl font-bold
          border border-[#DDD4F2]
          bg-white/70
          focus:outline-none
          focus:ring-2
          focus:ring-[#8D76D8]
          focus:border-[#8D76D8]"
        />

      ))}

    </div>

    <button
      disabled={loading}
      className="py-3 rounded-full text-white font-semibold
      bg-gradient-to-r
      from-[#6D4BC3]
      to-[#8D76D8]"
    >
      {loading ? "Verifying..." : "Verify OTP"}
    </button>

    <div className="text-center">

      {timer > 0 ? (

        <p className="text-sm text-gray-500">
          Resend OTP in{" "}
          <span className="font-semibold text-[#6D4BC3]">
            {timer}s
          </span>
        </p>

      ) : (

        <button
          type="button"
          onClick={resendOTP}
          className="text-[#6D4BC3] font-semibold hover:underline"
        >
          Resend OTP
        </button>

      )}

    </div>

  </form>
)}

        <p
          onClick={() => {
            setError("");
            setIsLogin(!isLogin);
            setStep(1);
          }}
          className="text-center mt-4 text-sm text-[#6D4BC3] cursor-pointer"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </motion.div>

    </div>
  );
}