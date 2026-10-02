import React, { useState, useRef, useEffect } from 'react';
import { Lock, Globe, ChevronDown, Check } from 'lucide-react';
import type { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/languages';
import { TRANSLATIONS } from '../i18n/translations';

interface HeaderProps {
  currentLang: SupportedLanguage;
  onToggleLang: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onToggleLang }) => {
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
                {activeLangInfo.nativeName}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {strings.header.tagline}
            </p>
          </div>
        </div>

        {/* Right side: Privacy Badge & Language Selector */}
        <div className="flex items-center space-x-3">
          {/* Privacy Pill */}
          <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{strings.header.privacyBadge}</span>
          </div>

          {/* Bharat Multilingual Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              title="Select Language / भाषा चुनें / மொழியைத் தேர்ந்தெடுக்கவும்"
            >
              <Globe className="w-4 h-4 text-sky-600 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-extrabold leading-tight text-slate-900">
                  {activeLangInfo.nativeName}
                </span>
                <span className="text-[10px] text-slate-500 leading-none">
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
                        className={`w-full px-3 py-2 flex items-center justify-between hover:bg-sky-50 transition-colors text-left ${
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
    </header>
  );
};
