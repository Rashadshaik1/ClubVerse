import { useState } from "react";
import axios from "axios";

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  // ✅ FIX: system message add (IMPORTANT)
  const [messages, setMessages] = useState([
    {
      role: "system",
      content: "You are an AI assistant for college event management. Help users create and improve event descriptions."
    }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input }
    ];

    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        messages: newMessages
      });

      const reply = res?.data?.reply || "No response from AI";

      setMessages([
        ...newMessages,
        { role: "assistant", content: reply }
      ]);

    } catch (err) {
      console.error("AI CHAT ERROR:", err);

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "⚠️ AI server error. Please try again."
        }
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-[#048c92] text-white px-4 py-3 rounded-full shadow-lg"
      >
        🤖 AI
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-xl rounded-xl border p-3">
          
          {/* Messages */}
          <div className="h-60 overflow-y-auto space-y-2 text-sm">
            {messages
              .filter(m => m.role !== "system") // hide system message
              .map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "text-right text-blue-600"
                      : "text-left text-gray-700"
                  }
                >
                  {m.content}
                </div>
              ))}
          </div>

          {/* Input */}
          <div className="flex mt-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border flex-1 p-2 text-sm rounded"
              placeholder="Ask AI..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#048c92] text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}