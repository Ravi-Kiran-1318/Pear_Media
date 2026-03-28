import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WorkflowText from './components/WorkflowText';
import WorkflowImage from './components/WorkflowImage';
import { Loader2 } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('text');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <Navbar />
      
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300">
          <div className="flex flex-col items-center p-8 bg-white/90 backdrop-blur border border-white/50 rounded-2xl shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-25" />
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
            <p className="mt-6 text-sm font-medium text-slate-600 animate-pulse tracking-wide">Processing your request...</p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col items-center text-center mb-12 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Creative Workflows</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed font-medium">
            Bridge the gap between simple inputs and intelligent outputs. 
            Choose a workflow below to begin generating stunning assets.
          </p>
        </div>

        <div className="flex justify-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/60 inline-flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'text'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transform hover:-translate-y-0.5'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Creative Studio (Text)
            </button>
            <button
              onClick={() => setActiveTab('image')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'image'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20 transform hover:-translate-y-0.5'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Style Lab (Image)
            </button>
          </div>
        </div>

        <div className="relative">
          {activeTab === 'text' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <WorkflowText setIsLoading={setIsLoading} isLoading={isLoading} />
            </div>
          ) : (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <WorkflowImage setIsLoading={setIsLoading} isLoading={isLoading} />
             </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
