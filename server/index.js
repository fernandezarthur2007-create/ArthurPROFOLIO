import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // This "Prompt" tells the AI how to act for your portfolio
    const prompt = `You are a 3D AI assistant for a developer's portfolio. 
    Keep answers short and cool. User says: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).send("AI Error");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));