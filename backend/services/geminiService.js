import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const analyzeMarketWithGemini = async (prompt) => {
  try {
    // If no API key is provided during testing, mock the response
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key') {
      console.log('Mocking Gemini response since API key is missing.');
      return {
        action: "HOLD",
        confidence: 50,
        reason: "Mock reason: API key not provided.",
        stop_loss: null,
        take_profit: null
      };
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using flash for faster analysis

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2, // Low temperature for more analytical responses
      },
      systemInstruction: "You are an expert crypto trading AI. You analyze market data and return JSON only. Your JSON must strictly follow this format: { \"action\": \"BUY\" | \"SELL\" | \"HOLD\", \"confidence\": number (0-100), \"reason\": \"string\", \"stop_loss\": number or null, \"take_profit\": number or null }.",
    });

    const contentText = result.response.text();
    
    // Parse the JSON from the text
    const jsonMatch = contentText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      throw new Error("Failed to parse JSON from Gemini response.");
    }
    
  } catch (error) {
    console.error('Error calling Gemini:', error.message);
    throw error;
  }
};
