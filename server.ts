/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Initialize Gemini AI client if API key exists
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', aiConfigured: !!ai });
  });

  // AI Document Endpoint
  app.post('/api/ai/process', async (req, res) => {
    try {
      const { action, text, prompt, targetLanguage } = req.body;
      if (!ai) {
        return res.status(400).json({ 
          error: 'Gemini API key not configured. Please configure GEMINI_API_KEY in secrets.' 
        });
      }

      if (!text && !prompt) {
        return res.status(400).json({ error: 'Document text or prompt is required.' });
      }

      let systemInstruction = 'You are PDF Bloom AI, an expert document intelligence and research assistant. Provide accurate, professional, structured, and clear outputs.';
      let userMessage = '';

      switch (action) {
        case 'summarize':
          userMessage = `Please provide a comprehensive, structured executive summary of the following document text, including key takeaways and core insights:\n\n${text}`;
          break;
        case 'keypoints':
          userMessage = `Extract the most important key points, findings, and bullet takeaways from this document text:\n\n${text}`;
          break;
        case 'explain':
          userMessage = `Explain the core concepts and chapters of this document in clear, easy-to-understand terms with structured headings:\n\n${text}`;
          break;
        case 'quiz':
          userMessage = `Generate 5 multiple-choice questions (MCQs) with options (A, B, C, D) and correct answers based on this document:\n\n${text}`;
          break;
        case 'translate':
          userMessage = `Translate the following document text into ${targetLanguage || 'Spanish'}:\n\n${text}`;
          break;
        case 'grammar':
          userMessage = `Review and improve the grammar, clarity, and professional tone of this document text:\n\n${text}`;
          break;
        case 'chat':
        case 'ask':
        default:
          userMessage = `Based on the document context below, answer the user's question accurately and thoroughly.\n\nDocument Context:\n${text}\n\nUser Question: ${prompt || 'What are the main highlights of this document?'}`;
          break;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.3,
        }
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error('AI Processing Error:', error);
      res.status(500).json({ error: error.message || 'Failed to process document with AI.' });
    }
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
