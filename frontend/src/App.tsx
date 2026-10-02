import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DemoBar } from './components/DemoBar';
import { InputSection } from './components/InputSection';
import { AnalyzingOverlay } from './components/AnalyzingOverlay';
import { ResultView } from './components/ResultView';
import type { AnalysisResult, DemoSample } from './types';
import {
  fetchDemoSamples,
  analyzeText,
  analyzeImage,
  analyzeUrl,
  deleteAnalysis,
} from './api';
import { Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<'en' | 'ta'>('en');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [demoSamples, setDemoSamples] = useState<DemoSample[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load presentation demo samples
    fetchDemoSamples()
      .then((samples) => setDemoSamples(samples))
      .catch((err) => console.warn('Could not pre-load demo samples:', err));
  }, []);

  const handleAnalyzeText = async (text: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await analyzeText(text, currentLang);
      setAnalysisResult(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to analyze text.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeImage = async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await analyzeImage(file, currentLang);
      setAnalysisResult(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to analyze image screenshot.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeUrl = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await analyzeUrl(url, currentLang);
      setAnalysisResult(res);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to analyze URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSample = (sample: DemoSample) => {
    handleAnalyzeText(sample.content);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleDelete = async (id: string) => {
    await deleteAnalysis(id);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-sky-100 selection:text-sky-900">
      {/* Top Navigation */}
      <Header currentLang={currentLang} onToggleLang={setCurrentLang} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* View State Handling */}
        {isLoading ? (
          <AnalyzingOverlay currentLang={currentLang} />
        ) : analysisResult ? (
          <ResultView
            result={analysisResult}
            onReset={handleReset}
            onDelete={handleDelete}
            currentLang={currentLang}
          />
        ) : (
          <div>
            {/* Hero Section */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Track E — Financial Misinformation & Content Literacy</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight">
                {currentLang === 'ta' ? (
                  <>நம்புவதற்கு முன் <span className="text-sky-600">புரிந்துகொள்ளுங்கள்.</span></>
                ) : (
                  <>Understand before you <span className="text-sky-600">trust.</span></>
                )}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                {currentLang === 'ta'
                  ? 'சமூக ஊடகங்கள் மற்றும் வாட்ஸ்அப்பில் நீங்கள் காணும் நிதித் தகவல்களை ஆராய்ந்து, அதில் உள்ள அபாயங்களை எளிதில் புரிந்துகொள்ள உதவும் விழிப்புணர்வு தளம்.'
                  : 'Nambikkai helps Indian retail investors extract claims, identify red flags, and independently verify financial messages before they trust, share, or act.'}
              </p>
            </div>

            {/* Flagship Hackathon Presentation Demo Samples */}
            <DemoBar
              samples={demoSamples}
              onSelectSample={handleSelectSample}
              disabled={isLoading}
            />

            {/* Input Section (Upload / Paste / URL) */}
            <InputSection
              currentLang={currentLang}
              onAnalyzeText={handleAnalyzeText}
              onAnalyzeImage={handleAnalyzeImage}
              onAnalyzeUrl={handleAnalyzeUrl}
              isLoading={isLoading}
            />

            {/* 3 Pillar Value Badges (Capture -> Understand -> Check -> Explain -> Verify -> Learn) */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 mb-3 font-bold text-xs uppercase">
                  1. Capture & Understand
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Screenshot-First Analysis
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload screenshots directly from WhatsApp, Telegram, Instagram, or YouTube to isolate factual vs. promotional claims.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 mb-3 font-bold text-xs uppercase">
                  2. Check & Explain
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Plain Language & Tamil
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Detects manipulation signals (guaranteed returns, urgency, fake SEBI claims) and translates them into simple, jargon-free English and Tamil.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 mb-3 font-bold text-xs uppercase">
                  3. Verify & Learn
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Empowerment Over Censorship
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Actionable regulatory verification checklists and 30-second micro-lessons build lasting financial literacy without giving stock advice.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Nambikkai (நம்பிக்கை) — Sangyan Hackathon 2026 • Track E: Misinformation & Content Literacy
          </span>
          <span className="text-[11px] text-slate-400">
            Does not provide investment advice or stock recommendations.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
