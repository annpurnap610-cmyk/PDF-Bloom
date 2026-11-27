/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ALL_PDF_TOOLS } from '../data/tools';
import { PdfTool, ToolCategory } from '../types';
import { FileText, Search, ArrowRight, Layers } from 'lucide-react';

interface AllToolsViewProps {
  onSelectTool: (tool: PdfTool) => void;
}

export const AllToolsView: React.FC<AllToolsViewProps> = ({ onSelectTool }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');

  const categories: { id: ToolCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'converter', label: 'Converters' },
    { id: 'editor', label: 'Editors' },
    { id: 'organizer', label: 'Organizers' },
    { id: 'compressor', label: 'Compressors' },
    { id: 'security', label: 'Security' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'ocr', label: 'OCR Tools' },
  ];

  const filteredTools = ALL_PDF_TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>PDF Bloom Suite</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          All PDF & Document Tools
        </h1>
        <p className="text-slate-600 text-lg">
          Explore our complete collection of professional conversion, editing, security, and OCR tools.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto pt-4">
          <Search className="absolute left-4 top-7 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools (e.g. Merge, Word, Compress, OCR)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-sm focus:ring-2 focus:ring-purple-600 focus:border-purple-600 text-sm text-slate-900 outline-none"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-700 text-white shadow-md shadow-purple-500/20'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onSelectTool(tool)}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-purple-300 transition-all cursor-pointer group space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-700 text-purple-700 group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 uppercase">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                {tool.name}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {tool.description}
              </p>
            </div>
            <div className="pt-2 flex items-center text-xs font-semibold text-purple-700 group-hover:translate-x-1 transition-transform">
              <span>Launch Tool</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No tools found matching your search.</p>
        </div>
      )}

    </div>
  );
};
