/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, Sparkles, Upload, ArrowRight, Shield, Zap, Layers, 
  CheckCircle, Star, Scissors, Minimize2, FileCheck, Table, Lock, Search, ChevronDown 
} from 'lucide-react';
import { ALL_PDF_TOOLS } from '../data/tools';
import { PdfTool } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: string) => void;
  onSelectTool: (tool: PdfTool) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, onSelectTool }) => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const popularTools = ALL_PDF_TOOLS.filter(t => t.popular);

  const faqs = [
    { q: 'Is PDF Bloom completely free to use?', a: 'Yes! PDF Bloom offers free access to essential PDF converters and tools. We also offer Pro plans for high-volume users and advanced Gemini AI features.' },
    { q: 'Are my uploaded documents secure?', a: 'Absolute privacy is guaranteed. All uploaded files are processed securely in isolated containers and automatically purged within 24 hours. We never train public AI models on your private documents.' },
    { q: 'Do I need to install any software?', a: 'No installation required! PDF Bloom runs entirely in your web browser with lightning-fast cloud-backed processing.' },
    { q: 'How does the AI PDF Summarizer work?', a: 'Our Gemini AI engine reads and parses your document content, extracting executive summaries, key takeaways, and answering your custom chat queries instantly.' }
  ];

  return (
    <div className="space-y-20 pb-20 animate-in fade-in duration-300">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-purple-50/60 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-xs animate-pulse-slow">
            <Sparkles className="w-4 h-4" />
            <span>Every PDF Tool. One Powerful Workspace.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
            Everything You Need to <span className="bg-gradient-to-r from-purple-700 to-violet-600 bg-clip-text text-transparent">Work With PDFs.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Convert, edit, compress, organize and understand your documents with powerful professional PDF and Gemini AI tools.
          </p>

          {/* Hero Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('tools')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-800 hover:to-violet-700 shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center space-x-3 text-base hover:scale-105"
            >
              <Upload className="w-5 h-5" />
              <span>Upload & Convert PDF</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-tools')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-all flex items-center justify-center space-x-3 text-base border border-purple-200"
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Try AI Document Studio</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto border-t border-slate-200/80">
            <div>
              <p className="text-3xl font-extrabold text-slate-900">40+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Professional Tools</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">100%</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Secure & Private</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">10M+</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Files Processed</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-slate-900">4.9 ★</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">User Satisfaction</p>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Popular PDF Tools</h2>
            <p className="text-slate-600 text-sm mt-1">Most frequently used conversion and editing utilities</p>
          </div>
          <button
            onClick={() => setActiveTab('tools')}
            className="flex items-center space-x-2 text-sm font-bold text-purple-700 hover:text-purple-800"
          >
            <span>View All 40+ Tools</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-700 text-purple-700 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="pt-2 flex items-center text-xs font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
                <span>Use Tool Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Document Assistant Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-violet-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4 max-w-xl relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 text-purple-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Gemini 2.5 Flash Integration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Chat With Any PDF or Report</h2>
            <p className="text-purple-200 text-base leading-relaxed">
              Upload research papers, financial reports, or textbooks and get instant AI summaries, key takeaways, and answer complex questions in seconds.
            </p>
            <button
              onClick={() => setActiveTab('ai-tools')}
              className="px-8 py-3.5 rounded-xl bg-white text-purple-900 font-bold hover:bg-purple-50 shadow-lg transition-all flex items-center space-x-2 text-sm"
            >
              <span>Launch AI Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full lg:w-96 space-y-4 relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">AI</div>
              <div>
                <p className="text-sm font-bold">PDF Bloom AI Assistant</p>
                <p className="text-xs text-purple-300">Ready for document queries</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/40 text-xs text-purple-100 italic">
              "What are the quarterly growth projections and core risks highlighted in page 14?"
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose PDF Bloom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Why Students & Professionals Choose PDF Bloom</h2>
          <p className="text-slate-600 text-base">Engineered for speed, accuracy, and absolute document privacy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Lightning Fast</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Optimized algorithms process large multi-page PDF documents in seconds without browser lag.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Bank-Grade Security</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              HTTPS encryption and 24-hour automatic file deletion guarantee your sensitive files remain strictly confidential.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Advanced AI Intelligence</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Go beyond basic conversion with Gemini AI summarization, translation, and interactive document chat.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-sm">Everything you need to know about PDF Bloom.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 hover:text-purple-700 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${faqOpen === index ? 'rotate-180 text-purple-700' : 'text-slate-400'}`} />
              </button>
              {faqOpen === index && (
                <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
