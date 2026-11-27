/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, FileText, Mail, Info, CheckCircle } from 'lucide-react';

interface LegalViewProps {
  page: string;
}

export const LegalView: React.FC<LegalViewProps> = ({ page }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 animate-in fade-in duration-300">
      
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
        
        {page === 'privacy' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500">Last updated: May 2026</p>
            <div className="prose text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>At PDF BLOOM ("we", "our", or "us"), we prioritize your document privacy and data security above all else. This Privacy Policy outlines how we collect, use, and protect your information.</p>
              <h3 className="text-base font-bold text-slate-900 pt-2">1. Automatic File Purging & Zero Retention</h3>
              <p>All files uploaded for conversion, merging, splitting, compression, OCR, or AI analysis are processed securely in isolated temporary containers. Files are automatically purged from our servers within 24 hours (or immediately upon session close).</p>
              <h3 className="text-base font-bold text-slate-900 pt-2">2. Firebase Authentication</h3>
              <p>We use Firebase Authentication for secure user accounts. We never store raw passwords or sensitive credentials in plaintext.</p>
            </div>
          </div>
        )}

        {page === 'terms' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
            <p className="text-xs text-slate-500">Last updated: May 2026</p>
            <div className="prose text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>By accessing or using PDF BLOOM, you agree to be bound by these Terms of Service. You must ensure you have lawful authorization to edit, convert, or process any uploaded documents.</p>
              <h3 className="text-base font-bold text-slate-900 pt-2">1. Acceptable Use</h3>
              <p>You agree not to upload malware, copyrighted materials without authorization, or illegal content.</p>
            </div>
          </div>
        )}

        {page === 'cookies' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Cookie Policy</h1>
            <p className="text-xs text-slate-500">Last updated: May 2026</p>
            <div className="prose text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>PDF Bloom uses essential cookies and local session storage to maintain authentication state and user tool preferences securely.</p>
            </div>
          </div>
        )}

        {page === 'disclaimer' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">Security & Disclaimer</h1>
            <p className="text-xs text-slate-500">Last updated: May 2026</p>
            <div className="prose text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>PDF Bloom provides document conversion and AI tools "as is". While we maintain 256-bit encryption and rigorous processing standards, users are advised to maintain local backups of critical files.</p>
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900">About PDF BLOOM</h1>
            <p className="text-xs text-slate-500">The All-in-One PDF & Document Platform</p>
            <div className="prose text-sm text-slate-700 space-y-4 leading-relaxed">
              <p>PDF Bloom was built to solve the frustration of juggling dozens of fragmented, ad-heavy, or insecure online PDF utilities. We unite every professional PDF conversion, editing, compression, OCR, and Gemini AI assistant tool into one lightning-fast, secure workspace.</p>
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-extrabold text-slate-900">Contact Support</h1>
            <p className="text-slate-600 text-sm">Need help or have a feature request? Our engineering support team is available 24/7.</p>
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-200 space-y-4">
              <div className="flex items-center space-x-3 text-purple-900 font-semibold text-sm">
                <Mail className="w-5 h-5 text-purple-700" />
                <span>support@pdfbloom.com</span>
              </div>
              <p className="text-xs text-slate-600">Response time: Usually within 2 hours.</p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
