const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ===============================
// 1. EVENT DESCRIPTION GENERATOR
// ===============================
exports.generateEventDescription = async (req, res) => {
  try {
    const { title, category, venue, date } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert college event content writer.

Write an attractive event description.

Event Title: ${title}
Category: ${category}
Venue: ${venue}
Date: ${date}

Rules:
- 120 to 180 words
- Simple English
- Attractive and engaging
- Encourage students to participate
- No markdown
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      description: text,
    });

  } catch (error) {
    console.error("GEMINI GENERATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};


// ===============================
// 2. CHATBOT AI (FIXED PROPER CHAT FORMAT)
// ===============================
exports.chatWithAI = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: "Messages array required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // 👉 Proper Gemini chat format
    const chat = model.startChat({
      history: messages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const reply = response.text();

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("GEMINI CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "AI chat failed",
    });
  }
};