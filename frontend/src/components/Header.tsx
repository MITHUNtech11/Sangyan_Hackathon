import React, { useState, useRef, useEffect } from 'react';
import {
  Lock,
  Globe,
  ChevronDown,
  Check,
  Search,
  Sparkles,
  BookOpen,
  Building2,
} from 'lucide-react';
import type { SupportedLanguage, NavigationView } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/languages';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onToggleLang: (lang: SupportedLanguage) => void;
  currentView: NavigationView;
  onNavigate: (view: NavigationView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  currentView,
  onNavigate,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeLangInfo = getLanguageByCode(currentLang);
  const strings = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand & Tagline - Clickable Home Button */}
        <button
          onClick={() => onNavigate('analyzer')}
          className="flex items-center space-x-3 text-left focus:outline-none cursor-pointer group"
          title="Return to Main Analyzer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform shrink-0">
            ந
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                NAMBIKKAI
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                {activeLangInfo.nativeName}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {strings.header.tagline}
            </p>
          </div>
        </button>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => onNavigate('analyzer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'analyzer'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Analyzer</span>
          </button>
          <button
            onClick={() => onNavigate('demos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'demos'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Demo Scenarios (10)</span>
          </button>
          <button
            onClick={() => onNavigate('lessons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'lessons'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Micro-Lessons</span>
          </button>
          <button
            onClick={() => onNavigate('regulatory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              currentView === 'regulatory'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SEBI & NSDL Watch</span>
          </button>
        </nav>

        {/* Right side: Privacy Badge & Language Selector */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Privacy Pill */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{strings.header.privacyBadge}</span>
          </div>

          {/* Bharat Multilingual Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
              title="Select Language / भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்"
            >
              <Globe className="w-4 h-4 text-sky-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold leading-tight text-slate-900">
                  {activeLangInfo.nativeName}
                </span>
                <span className="text-[10px] text-slate-500 leading-none hidden sm:inline">
                  {activeLangInfo.name}
                </span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 overflow-y-auto">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Language • भारतीय भाषाएं
                </div>
                <div className="py-1">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onToggleLang(lang.code);
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center justify-between hover:bg-sky-50 transition-colors text-left cursor-pointer ${
                          isSelected ? 'bg-sky-50/70 font-bold' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-6 text-center text-xs font-mono font-bold text-sky-700 bg-sky-100/60 rounded px-1 py-0.5">
                            {lang.code.toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 leading-tight">
                              {lang.nativeName}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-none">
                              {lang.name} • {lang.population}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-sky-600 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden border-t border-slate-100 px-4 py-1.5 flex items-center justify-around bg-slate-50/80">
        <button
          onClick={() => onNavigate('analyzer')}
          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer ${
            currentView === 'analyzer'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Analyzer</span>
        </button>
        <button
          onClick={() => onNavigate('demos')}
          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer ${
            currentView === 'demos'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Demos (10)</span>
        </button>
        <button
          onClick={() => onNavigate('lessons')}
          className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer ${
            currentView === 'lessons'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>Lessons</span>
        </button>
        <button
          onClick={() => onNavigate('regulatory')}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer ${
            currentView === 'regulatory'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>SEBI/NSDL</span>
        </button>
      </div>
    </header>
  );
};
