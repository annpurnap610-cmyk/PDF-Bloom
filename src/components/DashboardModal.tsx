/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, FileText, Sparkles, History, HardDrive, Shield, 
  Settings, LogOut, CheckCircle, ArrowRight, Download, Trash2, X, RefreshCw 
} from 'lucide-react';
import { UserProfile, ConversionRecord } from '../types';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  history: ConversionRecord[];
  onLogout: () => void;
  onClearHistory: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  user,
  history,
  onLogout,
  onClearHistory
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'files' | 'settings'>('overview');

  if (!isOpen) return null;

  const totalConversions = history.length;
  const successfulConversions = history.filter(h => h.status === 'success').length;
  const storageUsed = history.reduce((acc, curr) => acc + (curr.fileSize || 1024 * 500), 0);
  const formattedStorage = (storageUsed / (1024 * 1024)).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row h-[85vh]">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : 'U')}
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{user?.displayName || 'My Account'}</p>
                  <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'overview' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Overview & Quota</span>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'history' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Conversion History</span>
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'files' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <HardDrive className="w-4 h-4" />
                <span>My Saved Files</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === 'settings' ? 'bg-purple-600 text-white font-semibold shadow-md' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </button>
            </nav>
          </div>

          <div className="pt-6 border-t border-slate-800">
            <button
              onClick={() => { onLogout(); onClose(); }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
          
          {/* Top Header */}
          <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'history' && 'Conversion History'}
                {activeTab === 'files' && 'My Saved Files'}
                {activeTab === 'settings' && 'Account Settings'}
              </h2>
              <p className="text-xs text-slate-500">Manage your documents, quota, and preferences</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            
            {activeTab === 'overview' && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Conversions</p>
                    <p className="text-3xl font-extrabold text-slate-900">{totalConversions}</p>
                    <p className="text-xs text-emerald-600 font-medium">+{successfulConversions} successful</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processed Data</p>
                    <p className="text-3xl font-extrabold text-slate-900">{formattedStorage} <span className="text-sm font-normal text-slate-500">MB</span></p>
                    <p className="text-xs text-blue-600 font-medium">Secure temporary cache</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan Quota</p>
                    <p className="text-3xl font-extrabold text-slate-900">Pro Tier</p>
                    <p className="text-xs text-emerald-600 font-medium">Unlimited Daily Tools</p>
                  </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900">Recent Conversion Activity</h3>
                    <button onClick={() => setActiveTab('history')} className="text-xs font-semibold text-purple-700 hover:underline">
                      View All
                    </button>
                  </div>
                  {history.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
                      <p className="text-sm font-medium">No conversion history yet.</p>
                      <p className="text-xs text-slate-400 mt-1">Convert a PDF or document to see your history here.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.slice(0, 5).map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{item.fileName}</p>
                              <p className="text-xs text-slate-500">{item.toolName} • {new Date(item.timestamp).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">All Conversion Logs</h3>
                  {history.length > 0 && (
                    <button
                      onClick={onClearHistory}
                      className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear History</span>
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <History className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">No conversion history recorded.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-all">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.fileName}</p>
                            <p className="text-xs text-slate-500">Tool: {item.toolName} • {new Date(item.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {item.status}
                          </span>
                          {item.downloadUrl && (
                            <a
                              href={item.downloadUrl}
                              download={item.fileName}
                              className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                              title="Download File"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'files' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900">My Saved & Processed Files</h3>
                <p className="text-xs text-slate-500">Converted files are temporarily stored securely and automatically purged after 24 hours.</p>
                {history.filter(h => h.downloadUrl).length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <HardDrive className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium">No saved files available for download.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {history.filter(h => h.downloadUrl).map((item) => (
                      <div key={item.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-slate-900 truncate">{item.fileName}</p>
                            <p className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <a
                          href={item.downloadUrl}
                          download={item.fileName}
                          className="px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shrink-0 flex items-center space-x-1.5"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs max-w-2xl">
                <h3 className="text-lg font-bold text-slate-900">Account Profile & Security</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase">Full Name</label>
                    <input
                      type="text"
                      disabled
                      value={user?.displayName || 'User'}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-100 text-sm text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-100 text-sm text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase">Account Status</label>
                    <div className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>Active Firebase Session (Verified)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
