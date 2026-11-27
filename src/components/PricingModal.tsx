/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Check, Sparkles, Shield, Zap, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingProps {
  onOpenAuth: (mode: 'signup') => void;
}

export const PricingModal: React.FC<PricingProps> = ({ onOpenAuth }) => {
  const [annualBilling, setAnnualBilling] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    if (planName !== 'Free') {
      onOpenAuth('signup');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Transparent Pricing</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Simple Plans for Every Document Need
        </h1>
        <p className="text-lg text-slate-600">
          Choose the right plan for students, professionals, and growing teams. Upgrade or downgrade anytime.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center space-x-4 pt-4">
          <span className={`text-sm font-semibold ${!annualBilling ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-14 h-8 rounded-full bg-purple-700 p-1 flex items-center transition-all cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${annualBilling ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-semibold ${annualBilling ? 'text-slate-900' : 'text-slate-500'}`}>
            Annual <span className="text-purple-600 font-bold text-xs">(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Free Tier */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Free</h3>
            <p className="text-sm text-slate-500">Essential PDF tools for casual everyday use.</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-slate-900">$0</span>
              <span className="text-slate-500 text-sm">/ forever</span>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-700">
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Basic PDF converters & merge</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Up to 5 conversions per day</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Standard file size limit (25MB)</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('Free')}
            className="w-full py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-all text-sm"
          >
            Get Started Free
          </button>
        </div>

        {/* Pro Tier (Popular) */}
        <div className="bg-gradient-to-b from-purple-900 to-indigo-900 text-white rounded-3xl border border-purple-800 p-8 shadow-xl flex flex-col justify-between space-y-6 relative transform lg:-translate-y-2">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-md">
            Most Popular
          </div>
          <div className="space-y-4 pt-2">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="text-purple-200 text-sm">For professionals, students, and heavy researchers.</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold">{annualBilling ? '$9' : '$12'}</span>
              <span className="text-purple-300 text-sm">/ month</span>
            </div>
            <ul className="space-y-3 pt-4 border-t border-purple-800 text-sm text-purple-100">
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited conversions & tools</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Gemini AI Document Suite</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Advanced OCR & multi-language</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Large files up to 200MB</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('Pro')}
            className="w-full py-3.5 rounded-xl font-bold text-purple-900 bg-white hover:bg-purple-50 shadow-lg transition-all text-sm flex items-center justify-center space-x-2"
          >
            <span>Start Pro Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Business Tier */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Business & Teams</h3>
            <p className="text-sm text-slate-500">For teams, law firms, and corporate workflows.</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-extrabold text-slate-900">{annualBilling ? '$29' : '$35'}</span>
              <span className="text-slate-500 text-sm">/ month</span>
            </div>
            <ul className="space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-700">
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Team workspaces & user roles</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bulk batch processing</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Priority 24/7 dedicated support</span>
              </li>
              <li className="flex items-center space-x-3">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Advanced security compliance</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleSelectPlan('Business')}
            className="w-full py-3 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 transition-all text-sm"
          >
            Contact Sales
          </button>
        </div>

      </div>

    </div>
  );
};
