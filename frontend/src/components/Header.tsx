import React from 'react';
import { Lock } from 'lucide-react';

interface HeaderProps {
  currentLang: 'en' | 'ta';
  onToggleLang: (lang: 'en' | 'ta') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onToggleLang }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            ந
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                NAMBIKKAI
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                நம்பிக்கை
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {currentLang === 'ta' ? 'நம்புவதற்கு முன் புரிந்துகொள்ளுங்கள்.' : 'Understand before you trust.'}
            </p>
          </div>
        </div>

        {/* Right side: Privacy Badge & Language Switcher */}
        <div className="flex items-center space-x-3">
          {/* Privacy Pill */}
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privacy-First: Zero Credentials Stored</span>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => onToggleLang('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                currentLang === 'en'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onToggleLang('ta')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                currentLang === 'ta'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
