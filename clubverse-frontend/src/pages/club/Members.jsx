import React, { useState, useEffect } from "react";
import axios from "axios";
import ClubNavbar from "../../components/ClubNavbar";
import ClubSidebar from "../../components/ClubSidebar";
import Loader from "../../components/Loader";

const CORE_ROLES = ["President", "Secretary", "Treasurer", "Vice president", "Student coordinator", "Joint secretary", "Club advisor"];
const GOVERNING_ROLES = ["Event organizer", "Marketing lead", "Designing lead", "Documentation lead", "Content writing lead", "Promotions lead", "Social media lead", "Technical lead"];
const FACULTY_ROLES = ["Faculty Coordinator", "Faculty Advisor"];

export default function Members() {
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null); 
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [membersLoading, setMembersLoading] = useState(false);

  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isEditingBoard, setIsEditingBoard] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const [boardForm, setBoardForm] = useState({ academicYear: "" });
  const [memberForm, setMemberForm] = useState({
    id: "", name: "", branch: "", year: "1st Year", position: "President", customPosition: "", photo: ""
  });

  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const API_BASE = "http://localhost:5000/api";

  useEffect(() => { fetchBoards(); }, []);
  useEffect(() => { if (activeBoard) { fetchMembers(activeBoard._id); } }, [activeBoard]);

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/boards/my-boards`, axiosConfig);
      if (res.data.success) setBoards(res.data.data || []);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const fetchMembers = async (boardId) => {
  try {
    setMembersLoading(true);

    const res = await axios.get(
      `${API_BASE}/boards/my-boards`,
      axiosConfig
    );

    if (res.data.success) {
      const currentBoard = res.data.data.find(
        (b) => b._id === boardId
      );

      setMembers(currentBoard?.members || []);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setMembersLoading(false);
  }
};

  const handleBoardSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/boards`, boardForm, axiosConfig);
      if (res.data.success) {
        setBoards([...boards, res.data.board]);
        setActiveBoard(res.data.board);
      }
      setShowBoardModal(false);
      setBoardForm({ academicYear: "" });
    } catch (err) { alert("Error tracking boards"); }
  };

  const handleDeleteBoard = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await axios.delete(`${API_BASE}/boards/${activeBoard._id}`, axiosConfig);
      if (res.data.success) { setActiveBoard(null); setMembers([]); fetchBoards(); }
    } catch (err) { alert("Error"); }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMemberForm({ ...memberForm, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    const finalPosition = memberForm.position === "Other" ? memberForm.customPosition : memberForm.position;
    const payload = {
      boardId: activeBoard._id, name: memberForm.name, branch: memberForm.branch,
      year: memberForm.year, position: finalPosition, photo: memberForm.photo
    };
    if (isEditingMember) payload.memberId = memberForm.id;

    try {
      const res = await axios.post(`${API_BASE}/boards/sync-member`, payload, axiosConfig);
      if (res.data.success) { setMembers(res.data.data.members || []); setActiveBoard(res.data.data); }
      setShowMemberModal(false); resetMemberForm();
    } catch (err) { alert("Error updating member"); }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Delete record?")) return;
    try {
      const res = await axios.delete(`${API_BASE}/boards/remove-member/${activeBoard._id}/${memberId}`, axiosConfig);
      if (res.data.success) { setMembers(res.data.data.members || []); setActiveBoard(res.data.data); }
    } catch (err) { alert("Error"); }
  };

  const resetMemberForm = () => {
    setMemberForm({ id: "", name: "", branch: "", year: "1st Year", position: "President", customPosition: "", photo: "" });
  };

  const openEditMember = (m) => {
    const isCustom = !([...CORE_ROLES, ...GOVERNING_ROLES, ...FACULTY_ROLES].includes(m.position));
    setMemberForm({
      id: m._id, name: m.name, branch: m.branch, year: m.year,
      position: isCustom ? "Other" : m.position, customPosition: isCustom ? m.position : "", photo: m.photo
    });
    setIsEditingMember(true); setShowMemberModal(true); setActiveMenuId(null);
  };

  if (loading) {
  return <Loader />;
}
  return (
    // ✅ 1. ఇక్కడ నీ మిగిలిన పేజీల్లాగే క్లీన్ ఫ్లెక్స్ రాపర్ పెట్టాను
    <div className="min-h-screen bg-gradient-to-br from-[#eafcff] via-[#f7ffff] to-[#edfdfd] flex">
      
      {/* FIXED SIDEBAR */}
      <ClubSidebar />

      {/* ✅ 2. కంటెంట్ కంటైనర్ - అచ్చం నీ ఈవెంట్స్ పేజీ లాగే pt-24 ఇచ్చా */}
      <div className="flex-1 w-full pt-24 px-4 sm:px-8 pb-12 transition-all duration-300">
        
        {/* ✅ 3. నావ్‌బార్ ఇక్కడే టాప్ లో లోడ్ అవుతుంది */}
        <ClubNavbar />

        {/* ✅ 4. నీ మిగిలిన పేజీల స్టైల్ లోనే హెడర్ కార్డ్ సెట్ చేశా */}
        <div className="mb-8 bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-[#048c92] tracking-tight">Members Management</h1>
            <p className="text-xs text-gray-500 mt-1">Organize and manage your academic board committees seamlessly.</p>
          </div>
          {activeBoard && (
            <button 
              onClick={() => { setActiveBoard(null); setMembers([]); }}
              className="px-4 py-2 bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-2xl text-xs font-black text-[#048c92] hover:bg-[#eafcff] transition shadow-sm"
            >
              📂 View All Boards
            </button>
          )}
        </div>

        {/* ================= CASE 1: NO ACTIVE BOARD SELECTED ================= */}
        {!activeBoard ? (
          <div>
            {boards.length === 0 ? (
              <div className="bg-white/50 backdrop-blur-md border border-dashed border-[#cceeee] rounded-3xl p-12 text-center max-w-xl mx-auto mt-12 space-y-4">
                <h3 className="text-base font-extrabold text-gray-700">No Committee Boards Found</h3>
                <p className="text-xs text-gray-400 mt-1">Every active club panel can build structured sets tracking academic committees.</p>
                <button 
                  onClick={() => { setIsEditingBoard(false); setBoardForm({ academicYear: "" }); setShowBoardModal(true); }}
                  className="bg-[#048c92]/10 hover:bg-[#048c92]/20 text-[#048c92] text-xs font-black px-4 py-2 rounded-xl border border-[#048c92]/20 transition-all"
                >
                  + Add New Board
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-black text-[#048c92] uppercase tracking-wider">Active Committee Boards</h2>
                  <button 
                    onClick={() => { setIsEditingBoard(false); setShowBoardModal(true); }}
                    className="bg-[#048c92] hover:bg-[#43bfc3] text-white text-xs font-black px-4 py-2 rounded-xl transition shadow-sm"
                  >
                    + Create Board Panel
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {boards.map((b) => (
                    <div 
                      key={b._id} 
                      onClick={() => setActiveBoard(b)}
                      className="p-6 bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl shadow-sm hover:shadow-md cursor-pointer border-t-4 border-t-[#43bfc3] hover:scale-[1.01] transition transform duration-150"
                    >
                      <h3 className="text-lg font-extrabold text-[#048c92]">{b.academicYear} Board</h3>
                      <p className="text-[10px] text-gray-400 mt-1">Created: {new Date(b.createdAt).toLocaleDateString()}</p>
                      <span className="inline-block mt-4 text-xs font-bold text-[#048c92] bg-[#43bfc3]/10 px-3 py-1 rounded-full">Explore Board ➔</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ================= CASE 2: ACTIVE TARGET BOARD VIEW ================= */
          <div>
            <div className="p-6 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#048c92]">{activeBoard.academicYear} Executive Board</h2>
                <p className="text-xs text-gray-500 mt-1">Governing council structures and operational team alignments.</p>
              </div>
              <button 
                onClick={handleDeleteBoard}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl border border-red-100 transition"
              >
                🗑️ Wipe Board
              </button>
            </div>

            {membersLoading ? (
  <Loader />
) : members.length === 0 ? (
              <div className="text-center py-12 bg-white/50 backdrop-blur-md rounded-3xl border border-dashed border-[#cceeee] text-xs text-gray-400 mb-8">
                No executive board members added onto this academic layout loop yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {members.map((m) => (
                  <div key={m._id} className="relative bg-white/70 backdrop-blur-xl border border-[#cceeee] rounded-3xl shadow-sm p-6 flex flex-col items-center text-center hover:shadow-md transition">
                    <div className="absolute top-4 right-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === m._id ? null : m._id); }}
                        className="text-gray-400 hover:text-gray-600 font-bold tracking-wider text-sm px-2 rounded-lg"
                      >
                        ⋮
                      </button>
                      {activeMenuId === m._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-[#cceeee] rounded-2xl shadow-xl z-10 py-1 text-left">
                          <button onClick={() => openEditMember(m)} className="block w-full px-4 py-2 text-xs text-gray-700 hover:bg-[#eafcff] transition">Edit Details</button>
                          <button onClick={() => handleDeleteMember(m._id)} className="block w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold transition">Remove</button>
                        </div>
                      )}
                    </div>

                    <img 
                      src={m.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"} 
                      alt={m.name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-[#43bfc3] shadow-sm mb-4"
                    />
                    <h4 className="text-base font-extrabold text-[#048c92] line-clamp-1">{m.name}</h4>
                    <span className="mt-2 text-[10px] px-3 py-0.5 bg-[#43bfc3]/10 font-black text-[#048c92] rounded-full border border-[#43bfc3]/20 mb-3">{m.position}</span>
                    
                    <div className="w-full border-t border-[#cceeee] pt-3 mt-1 flex justify-around text-[10px] text-gray-400 font-bold">
                      <span>⚙️ {m.branch}</span>
                      <span className="text-gray-200">|</span>
                      <span>🎓 {m.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center">
              <button 
                onClick={() => { setIsEditingMember(false); resetMemberForm(); setShowMemberModal(true); }}
                className="px-6 py-2.5 bg-[#048c92] hover:bg-[#43bfc3] text-white text-xs font-black rounded-xl shadow-sm transition transform active:scale-95"
              >
                ➕ Add Board Member
              </button>
            </div>
          </div>
        )}

        {/* ================= MODALS AREA ================= */}
        {showBoardModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white border border-[#cceeee] rounded-3xl shadow-2xl w-full max-w-md p-6">
              <h3 className="text-base font-black text-[#048c92] mb-4">Setup New Academic Board</h3>
              <form onSubmit={handleBoardSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Academic Operational Year</label>
                  <input 
                    type="text" required placeholder="Example: 2026-27" value={boardForm.academicYear}
                    onChange={(e) => setBoardForm({ academicYear: e.target.value })}
                    className="w-full px-4 py-2 border border-[#cceeee] bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setShowBoardModal(false)} className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-xl">Dismiss</button>
                  <button type="submit" className="px-4 py-2 text-xs font-black bg-[#048c92] text-white rounded-xl hover:bg-[#43bfc3] transition shadow-sm">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showMemberModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white border border-[#cceeee] rounded-3xl shadow-2xl w-full max-w-lg p-6 my-8">
              <h3 className="text-base font-black text-[#048c92] mb-4">{isEditingMember ? "Edit Member Profile" : "Add Board Member Details"}</h3>
              <form onSubmit={handleMemberSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Circular Avatar Input</label>
                  <div className="flex items-center gap-4">
                    {memberForm.photo && <img src={memberForm.photo} alt="preview" className="w-14 h-14 rounded-full object-cover border border-[#cceeee]" />}
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-[10px] text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border file:border-[#cceeee] file:bg-[#eafcff] file:text-[#048c92] hover:file:bg-[#cceeee] transition" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Full Member Name</label>
                    <input type="text" required value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} className="w-full px-4 py-2 border border-[#cceeee] bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Academic Branch</label>
                    <input type="text" required value={memberForm.branch} onChange={(e) => setMemberForm({ ...memberForm, branch: e.target.value })} className="w-full px-4 py-2 border border-[#cceeee] bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Current Academic Year</label>
                    <select value={memberForm.year} onChange={(e) => setMemberForm({ ...memberForm, year: e.target.value })} className="w-full px-4 py-2 border border-[#cceeee] bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]">
                      <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Functional Position Assignment</label>
                    <select value={memberForm.position} onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })} className="w-full px-4 py-2 border border-[#cceeee] bg-[#f7ffff] rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]">
                      <optgroup label="🌟 Core Roles">{CORE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}</optgroup>
                      <optgroup label="⚙️ Leads">{GOVERNING_ROLES.map(r => <option key={r} value={r}>{r}</option>)}</optgroup>
                      <optgroup label="🏢 Faculty">{FACULTY_ROLES.map(r => <option key={r} value={r}>{r}</option>)}</optgroup>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {memberForm.position === "Other" && (
                  <div className="bg-[#eafcff]/50 p-4 rounded-xl border border-[#cceeee]">
                    <input type="text" required value={memberForm.customPosition} onChange={(e) => setMemberForm({ ...memberForm, customPosition: e.target.value })} className="w-full px-4 py-2 border border-[#cceeee] bg-white rounded-xl text-xs focus:outline-none focus:border-[#43bfc3]" placeholder="e.g. Media Head Coordinator" />
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4 border-t border-[#cceeee]">
                  <button type="button" onClick={() => setShowMemberModal(false)} className="px-4 py-2 text-xs font-bold text-gray-400 hover:bg-gray-50 rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-xs font-black bg-[#048c92] text-white rounded-xl hover:bg-[#43bfc3] transition shadow-sm">Save Member</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}