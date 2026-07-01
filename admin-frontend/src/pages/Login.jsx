import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.msg || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-[-120px] left-[-120px]" />
      <div className="absolute w-[450px] h-[450px] bg-blue-500/20 blur-3xl rounded-full bottom-[-120px] right-[-120px]" />

      {/* LOGIN CARD */}
      <div className="w-[400px] p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">

          <img
            src={logo}
            className="w-20 h-20 mb-3 drop-shadow-lg"
          />

          <h1 className="text-2xl font-bold text-[#00C2FF] tracking-wide">
            ClubVerse
          </h1>

          <p className="text-gray-400 text-sm">
            Super Admin Panel
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 p-2 rounded-lg bg-red-500/10 border border-red-400/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00C2FF] transition"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="p-3 pr-10 w-full rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-[#00C2FF] transition"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00C2FF] transition"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="p-3 rounded-xl bg-[#00C2FF] text-black font-bold hover:bg-cyan-400 transition-all duration-200 hover:scale-[1.02]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}