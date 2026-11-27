/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AllToolsView } from './components/AllToolsView';
import { ToolWorkspace } from './components/ToolWorkspace';
import { AiWorkspace } from './components/AiWorkspace';
import { PricingModal } from './components/PricingModal';
import { BlogView } from './components/BlogView';
import { LegalView } from './components/LegalView';
import { ContactView } from './components/ContactView';
import { AuthModal } from './components/AuthModal';
import { DashboardModal } from './components/DashboardModal';
import { UserProfile, PdfTool, ConversionRecord } from './types';
import { auth, onAuthStateChanged, signOut } from './firebase';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTool, setSelectedTool] = useState<PdfTool | null>(null);
  const [legalPage, setLegalPage] = useState<string>('privacy');
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  const [conversionHistory, setConversionHistory] = useState<ConversionRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pdf_bloom_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pdf_bloom_history', JSON.stringify(conversionHistory));
    } catch (e) {
      console.warn('Failed to save history:', e);
    }
  }, [conversionHistory]);

  const handleRecordConversion = (toolName: string, fileName: string, fileSize: number, downloadUrl: string) => {
    const newRecord: ConversionRecord = {
      id: Date.now().toString(),
      userId: user?.uid,
      toolName,
      fileName,
      fileSize,
      timestamp: Date.now(),
      status: 'success',
      downloadUrl
    };
    setConversionHistory(prev => [newRecord, ...prev]);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenLegal = (page: string) => {
    setLegalPage(page);
    setActiveTab('legal');
  };

  const handleSelectTool = (tool: PdfTool) => {
    setSelectedTool(tool);
    setActiveTab('tool-detail');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172033]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={handleOpenAuth}
        onOpenDashboard={() => setDashboardModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            onSelectTool={handleSelectTool}
          />
        )}

        {activeTab === 'tools' && (
          <AllToolsView
            onSelectTool={handleSelectTool}
          />
        )}

        {activeTab === 'tool-detail' && selectedTool && (
          <ToolWorkspace
            tool={selectedTool}
            onBack={() => setActiveTab('tools')}
            onRecordConversion={handleRecordConversion}
          />
        )}

        {activeTab === 'ai-tools' && (
          <AiWorkspace />
        )}

        {activeTab === 'pricing' && (
          <PricingModal
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView />
        )}

        {activeTab === 'about' && (
          <LegalView page="about" />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}

        {activeTab === 'legal' && (
          <LegalView page={legalPage} />
        )}
      </main>

      <Footer
        setActiveTab={setActiveTab}
        onOpenLegal={handleOpenLegal}
      />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => setAuthModalOpen(false)}
      />

      <DashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        user={user}
        history={conversionHistory}
        onLogout={handleLogout}
        onClearHistory={() => setConversionHistory([])}
      />
    </div>
  );
}
