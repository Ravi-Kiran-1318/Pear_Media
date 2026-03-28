import React from 'react';
import { Sparkles, Code } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              Pear Media
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Ravi-Kiran-1318/Pear_Media"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-all"
            >
              <Code className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
