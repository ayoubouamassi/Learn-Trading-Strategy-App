import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize GoogleGenAI client lazily to avoid crashing if GEMINI_API_KEY is not set immediately.
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Trading Coach / Analyzer
  app.post("/api/trading-coach", async (req, res) => {
    try {
      const { prompt, tradeHistory, scenarioName, strategyContext } = req.body;

      let promptContent = "";

      if (tradeHistory && tradeHistory.length > 0) {
        promptContent = `You are a professional trading coach. Please analyze my simulated trades for the scenario "${scenarioName}".
Strategy taught for this challenge: "${strategyContext || 'General technical analysis and disciplined risk management'}".

Here is my trading history in chronological order:
${JSON.stringify(tradeHistory, null, 2)}

Provide a highly professional, constructive, and actionable feedback session. Analyze:
1. Entry quality: Did I chase the market or find disciplined pullbacks/breakouts?
2. Risk management: Did I utilize stop losses? Was my trade sizing consistent?
3. Win rate and general stats based on these trades.
4. Emotional discipline or structural errors.
5. Next steps: 2 or 3 concrete technical recommendations on how to improve on this specific strategy.

Keep the response in clean Markdown with professional tone, helpful headings, and clear formatting (e.g., using bullet points and a concluding summary). Do not use dry clinical jargon or self-praising marketing hype.`;
      } else if (prompt) {
        promptContent = `You are a professional trading coach and veteran financial market expert.
Answer the following user query about trading strategies, indicators, market structures, or risk management:

"${prompt}"

Structure your response beautifully with:
- A brief direct answer.
- Detailed technical explanation with real-world examples (e.g. how institutional traders or retail technical analysts use this).
- Practical bullet points for how a learner can apply this in the interactive simulator today.
- Avoid flowery or promotional marketing language. Use clean, professional, educational tone. Markdown formatting is required.`;
      } else {
        res.status(400).json({ error: "Missing prompt or tradeHistory in request body" });
        return;
      }

      const ai = getAIClient();
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptContent,
        config: {
          systemInstruction: "You are an elite, highly encouraging, and strictly technical Trading Mentor. You explain price action, technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands), risk management, and market psychology. You always provide real-world insights, constructive critiques, and maintain absolute professional poise.",
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI Trading Coach Error:", error);
      res.status(500).json({
        error: error.message || "An error occurred while communicating with the AI Trading Coach.",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for all SPA routes in production
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
