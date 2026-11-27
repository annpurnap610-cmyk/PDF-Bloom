/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, Sparkles, Menu, X, User, LogOut, Shield, 
  ChevronDown, Layers, BookOpen, DollarSign, Info, Mail, LayoutDashboard 
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile | null;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onOpenDashboard,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: FileText },
    { id: 'tools', label: 'All Tools', icon: Layers },
    { id: 'ai-tools', label: 'AI Workspace', icon: Sparkles, badge: 'AI' },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-700 to-violet-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-800 to-violet-600 bg-clip-text text-transparent">
                PDF BLOOM
              </span>
              <span className="block text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
                Document AI Suite
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-50 text-purple-700 font-semibold'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-purple-700' : 'text-slate-500'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded-full animate-pulse-slow">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Auth & Profile Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-slate-100 border border-slate-200 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-purple-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
                  </div>
                  <div className="text-left pr-2 hidden xl:block">
                    <p className="text-xs font-semibold text-slate-800 truncate max-w-[120px]">
                      {user.displayName || 'My Account'}
                    </p>
                    <p className="text-[10px] text-slate-600 truncate max-w-[120px]">
                      {user.email}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab('dashboard'); setUserDropdownOpen(false); }}
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>User Dashboard</span>
                    </button>
                    <button
                      onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-purple-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-700 to-violet-600 hover:from-purple-800 hover:to-violet-700 shadow-md shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-98"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            {user && (
              <button
                onClick={onOpenDashboard}
                className="p-2 rounded-lg bg-purple-50 text-purple-700 font-semibold"
                title="Dashboard"
              >
                <User className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => { setActiveTab(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-700' : 'text-slate-500'}`} />
                <span>{link.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-200 space-y-3">
            {user ? (
              <>
                <button
                  onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold bg-purple-100 text-purple-800"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>My Dashboard</span>
                </button>
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold bg-red-50 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { onOpenAuth('signin'); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl font-semibold border border-slate-300 text-slate-700 text-center"
                >
                  Login
                </button>
                <button
                  onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
                  className="w-full py-3 rounded-xl font-semibold bg-purple-700 text-white text-center shadow-md shadow-purple-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
