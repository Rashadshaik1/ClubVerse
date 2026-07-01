import logo from "../assets/logo.png";

export default function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#05080f]">

      {/* OUTER SPIN RING */}
      <div className="relative flex items-center justify-center">

        {/* glowing ring */}
        <div className="absolute w-28 h-28 rounded-full border-2 border-[#00C2FF]/40 animate-spin-slow"></div>

        <div className="absolute w-36 h-36 rounded-full border border-[#00C2FF]/20 animate-spin-reverse"></div>

        {/* logo */}
        <img
          src={logo}
          className="w-16 h-16 z-10 animate-pulse drop-shadow-[0_0_20px_#00C2FF]"
        />

      </div>

      {/* TEXT */}
      <p className="absolute bottom-20 text-gray-400 tracking-widest text-sm">
        Loading...
      </p>

    </div>
  );
}