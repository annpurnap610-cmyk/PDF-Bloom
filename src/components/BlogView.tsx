/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/tools';
import { BookOpen, Calendar, User, ArrowRight, X } from 'lucide-react';

export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-in fade-in duration-300">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>PDF Bloom Journal</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Document Insights & Guides
        </h1>
        <p className="text-slate-600 text-lg">
          Expert tips on PDF productivity, AI research assistants, and secure document workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-bold">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.author}</span>
              </span>
              <span className="flex items-center space-x-1 text-purple-700 group-hover:translate-x-1 transition-transform">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto space-y-6">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
                {selectedPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{selectedPost.title}</h2>
              <p className="text-xs text-slate-500">By {selectedPost.author} • {selectedPost.date} • {selectedPost.readTime}</p>
            </div>
            <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700 whitespace-pre-wrap pt-4 border-t border-slate-100">
              {selectedPost.content}
            </div>
            <button
              onClick={() => setSelectedPost(null)}
              className="w-full py-3 rounded-xl bg-purple-700 text-white font-semibold text-sm hover:bg-purple-800 transition-colors"
            >
              Close Article
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
