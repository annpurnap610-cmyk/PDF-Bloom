/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, Upload, Send, MessageSquare, FileText, Bot, User, 
  HelpCircle, BookOpen, Globe, CheckCircle, RefreshCw, Copy, Check 
} from 'lucide-react';
import { AiChatMessage } from '../types';
import confetti from 'canvas-confetti';

export const AiWorkspace: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState<string>('');
  const [activeAiTool, setActiveAiTool] = useState<'summarize' | 'chat' | 'keypoints' | 'explain' | 'quiz' | 'translate'>('summarize');
  const [targetLanguage, setTargetLanguage] = useState('Spanish');
  const [promptInput, setPromptInput] = useState('');
  const [messages, setMessages] = useState<AiChatMessage[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am PDF Bloom AI. Upload a document or paste text above, then choose an AI feature to summarize, chat, or generate quizzes instantly.', timestamp: Date.now() }
  ]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Read text or mock document content
      const textSample = `Document: ${file.name} (${(file.size/1024).toFixed(1)} KB)\nThis document contains professional research, business data, and key analytical frameworks regarding modern digital transformation, document security, and cloud architecture.`;
      setDocumentText(textSample);
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'ai', text: `Successfully loaded "${file.name}". You can now run AI Summarizer, Chat, or Key Points extraction.`, timestamp: Date.now() }
      ]);
    }
  };

  const handleRunAiAction = async (actionType?: 'summarize' | 'chat' | 'keypoints' | 'explain' | 'quiz' | 'translate') => {
    const action = actionType || activeAiTool;
    const textContext = documentText || 'General PDF Bloom document context for analysis.';
    
    if (action === 'chat' && !promptInput.trim()) return;

    setLoading(true);
    const userMsgText = promptInput.trim() || `Run AI ${action} on uploaded document.`;
    
    if (action === 'chat') {
      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), sender: 'user', text: userMsgText, timestamp: Date.now() }
      ]);
      setPromptInput('');
    }

    try {
      const response = await fetch('/api/ai/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          text: textContext,
          prompt: userMsgText,
          targetLanguage
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'AI processing failed.');
      }

      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: data.result, timestamp: Date.now() }
      ]);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: `Error: ${err.message || 'Make sure GEMINI_API_KEY is configured in AI Studio Secrets.'}`, timestamp: Date.now() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-800 via-violet-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-purple-200">
            <Sparkles className="w-4 h-4" />
            <span>Gemini AI Document Intelligence Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">AI Document Studio & Chat</h1>
          <p className="text-purple-100 text-base">
            Upload any PDF or report and chat, summarize, translate, or generate quizzes instantly with advanced AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Document Upload & AI Tools */}
        <div className="space-y-6">
          
          {/* Upload Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span>1. Upload Document for AI</span>
            </h3>

            <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center bg-purple-50/30 hover:bg-purple-50/60 transition-all relative">
              <input
                type="file"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800 truncate">
                {selectedFile ? selectedFile.name : 'Click or drop PDF here'}
              </p>
              <p className="text-xs text-slate-500 mt-1">PDF, TXT, DOCX supported</p>
            </div>
          </div>

          {/* AI Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>2. Choose AI Action</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => { setActiveAiTool('summarize'); handleRunAiAction('summarize'); }}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeAiTool === 'summarize' ? 'bg-purple-700 text-white border-purple-700 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                📝 AI Summarizer
              </button>
              <button
                onClick={() => { setActiveAiTool('keypoints'); handleRunAiAction('keypoints'); }}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeAiTool === 'keypoints' ? 'bg-purple-700 text-white border-purple-700 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ⚡ Key Takeaways
              </button>
              <button
                onClick={() => { setActiveAiTool('explain'); handleRunAiAction('explain'); }}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeAiTool === 'explain' ? 'bg-purple-700 text-white border-purple-700 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                🧠 Chapter Explainer
              </button>
              <button
                onClick={() => { setActiveAiTool('quiz'); handleRunAiAction('quiz'); }}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  activeAiTool === 'quiz' ? 'bg-purple-700 text-white border-purple-700 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ❓ MCQ Quiz Maker
              </button>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase">Translate Document To</label>
              <div className="flex space-x-2">
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 outline-none"
                >
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Bengali">Bengali</option>
                </select>
                <button
                  onClick={() => { setActiveAiTool('translate'); handleRunAiAction('translate'); }}
                  className="px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-semibold hover:bg-purple-800 transition-colors"
                >
                  Translate
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: AI Chat & Results Interface */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-[650px] overflow-hidden">
          
          {/* Chat Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">PDF Bloom AI Assistant</h3>
                <p className="text-xs text-slate-500">Powered by Gemini 2.5 Flash</p>
              </div>
            </div>
            <button
              onClick={() => setMessages([{ id: '1', sender: 'ai', text: 'Chat cleared. Ask anything about your document!', timestamp: Date.now() }])}
              className="text-xs font-semibold text-slate-500 hover:text-purple-700"
            >
              Clear Chat
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-purple-600 text-white font-bold text-xs' : 'bg-slate-800 text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-purple-700 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-xs whitespace-pre-wrap'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm text-slate-500 flex items-center space-x-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                  <span>AI is analyzing document...</span>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => { e.preventDefault(); handleRunAiAction('chat'); }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Ask any question about your document..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-sm text-slate-900 outline-none"
              />
              <button
                type="submit"
                disabled={loading || !promptInput.trim()}
                className="px-6 py-3 rounded-xl bg-purple-700 text-white font-semibold hover:bg-purple-800 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-md shadow-purple-500/20"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
