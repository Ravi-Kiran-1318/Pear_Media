import React, { useState } from 'react';
import { Download, ExternalLink, Sparkles } from 'lucide-react';

export default function ImageCard({ url, prompt }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-2xl shadow-slate-200/40 group">
      <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex flex-col items-center justify-center space-y-3">
            <Sparkles className="w-8 h-8 text-slate-300 animate-spin-slow" />
            <span className="text-slate-400 font-medium text-sm">Loading visual asset...</span>
          </div>
        )}
        <img 
          src={url} 
          alt={prompt} 
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className={`object-cover w-full h-full transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />
        {isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 w-full flex justify-end space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <a 
                href={url} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-xl text-white transition-colors"
                title="Open Original"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a 
                href={url}
                download="pear-media-creation.png"
                className="bg-white text-slate-900 hover:bg-slate-50 shadow-lg p-3 rounded-xl transition-colors font-medium flex items-center space-x-2"
                title="Download"
              >
                <Download className="w-5 h-5" />
                <span className="sr-only sm:not-sr-only sm:pr-2 font-bold text-sm">Download</span>
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Final Generation Prompt</h3>
        <p className="text-sm text-slate-700 italic leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
          "{prompt}"
        </p>
      </div>
    </div>
  );
}
