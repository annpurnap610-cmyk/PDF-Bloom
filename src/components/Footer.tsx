/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FileText, Shield, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenLegal: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenLegal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-violet-400 flex items-center justify-center text-white shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                PDF BLOOM
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Every PDF Tool. One Powerful Workspace. Convert, edit, compress, organize and understand your documents with professional PDF and AI tools.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#twitter" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-purple-600 text-slate-300 hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#github" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-purple-600 text-slate-300 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#linkedin" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-purple-600 text-slate-300 hover:text-white transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* PDF Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Popular Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-purple-400 transition-colors">PDF to Word</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-purple-400 transition-colors">Word to PDF</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-purple-400 transition-colors">Merge PDF</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-purple-400 transition-colors">Split PDF</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-purple-400 transition-colors">Compress PDF</button></li>
              <li><button onClick={() => setActiveTab('tools')} className="hover:text-purple-400 transition-colors">PDF to JPG</button></li>
            </ul>
          </div>

          {/* AI Workspace */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">AI Document Suite</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-purple-400 transition-colors">AI PDF Summarizer</button></li>
              <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-purple-400 transition-colors">Chat With PDF</button></li>
              <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-purple-400 transition-colors">AI Quiz & MCQ Maker</button></li>
              <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-purple-400 transition-colors">AI Document Translator</button></li>
              <li><button onClick={() => setActiveTab('ai-tools')} className="hover:text-purple-400 transition-colors">Key Points Extractor</button></li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal & Trust</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-purple-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal('terms')} className="hover:text-purple-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onOpenLegal('cookies')} className="hover:text-purple-400 transition-colors">Cookie Policy</button></li>
              <li><button onClick={() => onOpenLegal('disclaimer')} className="hover:text-purple-400 transition-colors">Security & Disclaimer</button></li>
              <li><button onClick={() => setActiveTab('contact')} className="hover:text-purple-400 transition-colors">Contact Support</button></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 PDF BLOOM Inc. All rights reserved. Secured with 256-bit SSL encryption.</p>
          <div className="flex items-center space-x-1 mt-4 md:mt-0">
            <span>Built with precision for students & professionals</span>
            <Shield className="w-4 h-4 text-purple-400 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
