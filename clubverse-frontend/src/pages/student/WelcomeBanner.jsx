import { Sparkles } from "lucide-react";

export default function WelcomeBanner({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <section className="max-w-7xl mx-auto px-6 mt-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-10 text-white shadow-xl">

        <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute left-0 bottom-0 h-40 w-40 rounded-full bg-cyan-300/10 blur-2xl"></div>

        <div className="relative z-10">

          <div className="flex items-center gap-2 text-blue-100">

            <Sparkles size={20} />

            <span>ClubVerse Student Portal</span>

          </div>

          <h1 className="mt-5 text-5xl font-bold">

            {greeting},

            <br />

            {user?.name || "Student"} 👋

          </h1>

          <p className="mt-5 max-w-2xl text-blue-100 leading-8 text-lg">

            Stay connected with every club activity happening in
            your campus. Discover events, competitions,
            workshops and cultural programs all in one place.

          </p>

        </div>

      </div>
    </section>
  );
}