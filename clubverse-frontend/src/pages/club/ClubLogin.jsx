import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/clubs/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.msg || "Please enter valid club credentials.");
        setLoading(false);
        return;
      }
       
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("club", JSON.stringify(data.club));

      navigate("/club-dashboard");

    } catch (err) {
      setError("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6f7ff] via-[#dff6f6] to-[#cceeee]">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[360px] p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-[#cceeee]"
      >

        <h2 className="text-2xl font-bold text-[#048c92] text-center mb-4">
          Club Login
        </h2>

        {error && (
          <div className="mb-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="email"
            placeholder="Club Email"
            value={form.email}
            className="p-3 rounded-lg bg-white/60 border border-[#cceeee] focus:outline-none focus:ring-2 focus:ring-[#43bfc3]"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              className="w-full p-3 pr-12 rounded-lg bg-white/60 border border-[#cceeee] focus:outline-none focus:ring-2 focus:ring-[#43bfc3]"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#048c92]"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            disabled={loading}
            className="py-2 rounded-full text-white font-semibold bg-gradient-to-r from-[#048c92] to-[#43bfc3]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </motion.div>
    </div>
  );
}