import React, { useState } from 'react';
import { getEnhancedPrompt, generateImage } from '../utils/apiHelpers';
import { Wand2, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import ImageCard from './ImageCard';

export default function WorkflowText({ setIsLoading, isLoading }) {
  const [userPrompt, setUserPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [errorStatus, setErrorStatus] = useState('');

  const handleEnhance = async () => {
    if (!userPrompt.trim()) return;
    setIsLoading(true);
    setErrorStatus('');
    setIsApproved(false);
    setFinalImageUrl(null);
    try {
      const result = await getEnhancedPrompt(userPrompt);
      setEnhancedPrompt(result);
    } catch (error) {
      setErrorStatus(error.message || 'Failed to enhance prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!enhancedPrompt.trim()) return;
    setIsLoading(true);
    setErrorStatus('');
    try {
      const url = await generateImage(enhancedPrompt);
      setFinalImageUrl(url);
    } catch (error) {
      setErrorStatus(error.message || 'Image generation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8 border-b border-slate-100 pb-6">
        <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl">
          <Wand2 className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Creative Studio</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Transform simple ideas into descriptive masterpieces</p>
        </div>
      </div>

      {errorStatus && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 animate-in zoom-in duration-300">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-700 text-sm font-medium">{errorStatus}</p>
        </div>
      )}

      {!finalImageUrl ? (
        <div className="space-y-8">
          {/* Step 1: Input */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">1. Original Concept</label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="E.g., A futuristic city at night with neon lights..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[120px] resize-y placeholder:text-slate-400"
              disabled={isLoading}
            />
            <button
              onClick={handleEnhance}
              disabled={isLoading || !userPrompt.trim()}
              className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold transition-all"
            >
              <Wand2 className="w-4 h-4" />
              <span>Enhance Prompt</span>
            </button>
          </div>

          {/* Step 2: Approval */}
          {enhancedPrompt && (
            <div className="space-y-4 pt-8 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">2. Enhanced Masterpiece</label>
                <p className="text-sm text-slate-500 font-medium">Review and edit the AI-enhanced prompt before generating.</p>
              </div>
              <textarea
                value={enhancedPrompt}
                onChange={(e) => {
                  setEnhancedPrompt(e.target.value);
                  setIsApproved(false);
                }}
                className="w-full bg-indigo-50/30 border border-indigo-100 rounded-2xl p-5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all min-h-[160px] resize-y"
                disabled={isLoading}
              />
              <div className="flex items-center space-x-4 pt-2">
                {!isApproved ? (
                  <button
                    onClick={() => setIsApproved(true)}
                    className="flex items-center space-x-2 bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-xl font-bold transition-transform active:scale-95 shadow-lg shadow-slate-900/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Approve to Generate</span>
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-600/30 px-8 py-3.5 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span>Generate Final Image</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-500 space-y-8">
          <div className="max-w-xl mx-auto">
            <ImageCard url={finalImageUrl} prompt={enhancedPrompt} />
          </div>
          <div className="flex justify-center border-t border-slate-100 pt-8">
            <button
              onClick={() => {
                setFinalImageUrl(null);
                setUserPrompt('');
                setEnhancedPrompt('');
                setIsApproved(false);
              }}
              className="text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 px-6 py-2.5 rounded-xl font-semibold transition-colors"
            >
              Start New Creation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
