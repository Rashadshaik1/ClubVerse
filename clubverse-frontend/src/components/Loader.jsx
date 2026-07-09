import logo from "../assets/logoclub.png";

export default function Loader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd]">

      {/* LOADER CONTAINER */}
      <div className="relative flex items-center justify-center">

        {/* Outer teal ring */}
        <div className="absolute w-32 h-32 rounded-full border-2 border-[#048c92]/40 animate-spin-slow"></div>

        {/* Inner light ring */}
        <div className="absolute w-40 h-40 rounded-full border border-[#43bfc3]/40 animate-spin-reverse"></div>

        {/* Logo */}
        <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center z-10">
          <img
            src={logo}
            alt="ClubVerse"
            className="w-14 h-14 object-contain animate-pulse drop-shadow-[0_0_15px_#43bfc3]"
          />
        </div>

      </div>

      {/* TEXT */}
      <p className="absolute bottom-20 text-[#048c92] font-bold tracking-widest text-sm">
        Loading...
      </p>

    </div>
  );
}