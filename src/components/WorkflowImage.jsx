import React, { useState, useRef } from 'react';
import { analyzeImage, generateImage } from '../utils/apiHelpers';
import { UploadCloud, Image as ImageIcon, Search, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import ImageCard from './ImageCard';

export default function WorkflowImage({ setIsLoading, isLoading }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [finalImageUrl, setFinalImageUrl] = useState(null);
  const [errorStatus, setErrorStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(''); // 'Analyzing' | 'Generating' | ''
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setErrorStatus("Image must be smaller than 4MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setBase64Image(event.target.result);
      setSelectedImage(URL.createObjectURL(file));
      setErrorStatus('');
      setAnalysisResult('');
      setFinalImageUrl(null);
    };
    reader.onerror = () => {
      setErrorStatus("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeAndGenerate = async () => {
    if (!base64Image) return;
    setIsLoading(true);
    setErrorStatus('');
    
    try {
      setCurrentStep('Analyzing Visual Context...');
      const analysis = await analyzeImage(base64Image);
      setAnalysisResult(analysis);
      
      setCurrentStep('Generating Variation...');
      const variationPrompt = `A visually stunning high-quality digital art piece based EXACTLY on this description: ${analysis}. Apply perfect lighting, meticulous composition, and a striking artistic style.`;
      const url = await generateImage(variationPrompt);
      setFinalImageUrl(url);
    } catch (error) {
      setErrorStatus(error.message || 'Workflow failed during analysis or generation.');
    } finally {
      setIsLoading(false);
      setCurrentStep('');
    }
  };

  const resetState = () => {
    setSelectedImage(null);
    setBase64Image(null);
    setAnalysisResult('');
    setFinalImageUrl(null);
    setErrorStatus('');
    setCurrentStep('');
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white border border-slate-200/60 shadow-xl shadow-slate-200/50 rounded-3xl p-6 md:p-10 max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8 border-b border-slate-100 pb-6">
        <div className="bg-violet-50 text-violet-600 p-3 rounded-2xl">
          <Layers className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Style Lab</h2>
          <p className="text-slate-500 text-sm mt-1 font-medium">Reverse-engineer images and generate stunning variations</p>
        </div>
      </div>

      {errorStatus && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 animate-in zoom-in duration-300">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-700 text-sm font-medium">{errorStatus}</p>
        </div>
      )}

      {currentStep && (
        <div className="mb-8 p-4 bg-violet-50/50 border border-violet-100 rounded-2xl flex items-center justify-center space-x-3 text-violet-700 animate-pulse">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span className="font-semibold">{currentStep}</span>
        </div>
      )}

      {!finalImageUrl ? (
        <div className="space-y-8">
          {/* Step 1: Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">1. Source Image</label>
            {!selectedImage ? (
              <div 
                className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-slate-100 p-4 rounded-full inline-flex mb-4 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">
                  <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-violet-600" />
                </div>
                <p className="text-slate-700 font-semibold mb-1">Click to upload an image</p>
                <p className="text-slate-500 text-sm">PNG, JPG, WEBP up to 4MB</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-80 flex justify-center group">
                  <img src={selectedImage} alt="Uploaded source" className="object-contain max-h-80 w-auto" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      onClick={resetState}
                      disabled={isLoading}
                      className="bg-white text-slate-900 px-4 py-2 rounded-xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleAnalyzeAndGenerate}
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/30 px-8 py-3.5 rounded-xl font-bold transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search className="w-5 h-5" />
                    <span>Analyze & Transform</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-700 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Source Analysis</label>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 h-full flex flex-col justify-center">
                <img src={selectedImage} alt="Original" className="w-32 h-32 object-cover rounded-xl shadow-sm mb-6 mx-auto border border-slate-200" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Detected Characteristics</h4>
                <p className="text-sm text-slate-700 italic leading-relaxed text-center">
                  "{analysisResult}"
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">New Variation</label>
              <ImageCard url={finalImageUrl} prompt={`Generated from analysis: ${analysisResult.substring(0, 100)}...`} />
            </div>
          </div>
          
          <div className="flex justify-center border-t border-slate-100 pt-8">
            <button
              onClick={resetState}
              className="text-slate-500 hover:text-violet-600 bg-slate-50 hover:bg-violet-50 px-6 py-2.5 rounded-xl font-semibold transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Transform Another Image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
