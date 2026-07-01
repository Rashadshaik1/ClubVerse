import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
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
    <div className="flex min-h-screen bg-[#05080f] text-white">

      <Sidebar />

      <div className="ml-72 p-10 w-full">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#00C2FF]">
            Users Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage all registered users in ClubVerse
          </p>
        </div>

        {/* TABLE WRAPPER */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow">

          <table className="w-full">

            {/* HEADER */}
            <thead className="bg-white/5 border-b border-white/10">
              <tr className="text-left text-gray-300">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>

              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-white/5 hover:bg-white/10 transition-all duration-200"
                >

                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4 text-gray-300">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs 
                      bg-[#00C2FF]/10 text-[#00C2FF] border border-[#00C2FF]/30">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs 
                      bg-green-500/10 text-green-400 border border-green-400/30">
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
  );
}