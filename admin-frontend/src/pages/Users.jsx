import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://clubverse-nsgq.onrender.com/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setUsers(data.data || []);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchUsers();
  }, []);

  // ================= LOADER =================
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen bg-[#05080f] text-white overflow-x-hidden">
      <Sidebar />

      <div className="lg:ml-72 p-4 sm:p-6 md:p-10 w-full min-w-0">
        {/* HEADER */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#00C2FF]">
            Users Management
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Manage all registered users in ClubVerse
          </p>
        </div>

        {/* TABLE WRAPPER */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[600px] border-collapse">
              {/* HEADER */}
              <thead className="bg-white/5 border-b border-white/10">
                <tr className="text-left text-gray-300 text-xs sm:text-sm">
                  <th className="p-3 sm:p-4 font-semibold">Name</th>
                  <th className="p-3 sm:p-4 font-semibold">Email</th>
                  <th className="p-3 sm:p-4 font-semibold">Role</th>
                  <th className="p-3 sm:p-4 font-semibold">Status</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-white/10 transition-all duration-200"
                  >
                    <td className="p-3 sm:p-4 font-medium whitespace-nowrap">
                      {user.name}
                    </td>

                    <td className="p-3 sm:p-4 text-gray-300 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30 inline-block">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-400/30 inline-block">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}