import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  ChevronDown,
  Check,
  Search,
  Sparkles,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import type { SupportedLanguage, NavigationView } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/languages';
import { TRANSLATIONS } from '../i18n/translations';
import { TrustLogo } from './TrustLogo';

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
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Tagline - Clickable Home Button with Trust Logo */}
        <button
          onClick={() => onNavigate('analyzer')}
          className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group shrink-0"
          title="Return to Main Analyzer"
        >
          <TrustLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                NAMBIKKAI
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/70 tracking-wider">
                Trust Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block leading-none mt-0.5">
              {strings.header.tagline}
            </p>
          </div>
        </button>

        {/* Center: Desktop Navigation Tabs with Icons */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
          <button
            onClick={() => onNavigate('analyzer')}
            className={`h-9 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentView === 'analyzer'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-sky-600" />
            <span>Analyzer</span>
          </button>
          <button
            onClick={() => onNavigate('demos')}
            className={`h-9 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentView === 'demos'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Demo Scenarios</span>
            <span
              className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ml-0.5 ${
                currentView === 'demos'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-slate-200/80 text-slate-700'
              }`}
            >
              10
            </span>
          </button>
          <button
            onClick={() => onNavigate('regulatory')}
            className={`h-9 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              currentView === 'regulatory'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SEBI & NSDL Watch</span>
          </button>
        </nav>

        {/* Right side: Privacy Badge & Language Selector */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Privacy Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/90 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-medium whitespace-nowrap shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Privacy-First • Zero Logins</span>
          </div>

          {/* Bharat Multilingual Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="h-9 flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-300/80 rounded-xl text-xs font-bold transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer whitespace-nowrap"
              title="Select Language / भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்"
            >
              <Globe className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="font-extrabold text-slate-900">
                {activeLangInfo.nativeName}
              </span>
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
      <div className="md:hidden border-t border-slate-100 px-3 py-2 flex items-center justify-around bg-slate-50/90 gap-1 overflow-x-auto">
        <button
          onClick={() => onNavigate('analyzer')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            currentView === 'analyzer'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Analyzer</span>
        </button>
        <button
          onClick={() => onNavigate('demos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            currentView === 'demos'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Demos (10)</span>
        </button>
        <button
          onClick={() => onNavigate('regulatory')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            currentView === 'regulatory'
              ? 'bg-sky-600 text-white shadow-xs'
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
