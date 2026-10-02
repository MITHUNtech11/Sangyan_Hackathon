import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ShieldAlert,
  Trash2,
  RotateCcw,
  Languages,
  CheckSquare,
  Square,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { AnalysisResult } from '../types';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onDelete: (id: string) => void;
  currentLang: 'en' | 'ta';
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onReset,
  onDelete,
  currentLang: initialLang,
}) => {
  // Explanation language toggle state ('en' vs 'ta')
  const [explanationLang, setExplanationLang] = useState<'en' | 'ta'>(initialLang);
  // Checked state for verification checklist items
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  // Expandable lesson state
  const [lessonExpanded, setLessonExpanded] = useState(false);
  // Expandable claim actions
  const [expandedClaims, setExpandedClaims] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleClaimAction = (idx: number) => {
    setExpandedClaims((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Status-dependent styling
  let bannerColor = 'bg-rose-50 border-rose-200 text-rose-900';
  let badgeColor = 'bg-rose-600 text-white';
  let StatusIcon = AlertTriangle;

  if (result.overall_status === 'needs_verification') {
    bannerColor = 'bg-amber-50 border-amber-200 text-amber-900';
    badgeColor = 'bg-amber-600 text-white';
    StatusIcon = AlertCircle;
  } else if (result.overall_status === 'no_obvious_signals') {
    bannerColor = 'bg-emerald-50 border-emerald-200 text-emerald-900';
    badgeColor = 'bg-emerald-600 text-white';
    StatusIcon = CheckCircle2;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Status Banner */}
      <div className={`rounded-2xl border-2 p-6 shadow-md ${bannerColor} transition-all`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center space-x-4">
            <div className={`p-3 rounded-2xl ${badgeColor} shadow-md shrink-0`}>
              <StatusIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-extrabold opacity-75">
                  Content Check
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/70">
                  {result.input_type.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                {result.status_label.toUpperCase()}
              </h2>
              <p className="text-sm font-semibold opacity-90 mt-1">
                {result.warning_signals_count > 0
                  ? `${result.warning_signals_count} warning signals detected`
                  : 'No predefined warning signals detected in this content'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={onReset}
              className="px-4 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Check Another</span>
            </button>
            <button
              onClick={() => onDelete(result.id)}
              className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
              title="Delete analysis immediately for privacy"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. What Is This Message Claiming? */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          What is this content saying?
        </h3>
        <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
          "{result.summary}"
        </p>
      </div>

      {/* 3. The "Explain Simply" Feature with Tamil Switcher */}
      <div className="bg-gradient-to-br from-indigo-50/60 to-sky-50/60 rounded-2xl border border-indigo-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-indigo-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
              <Languages className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-indigo-950">
              Explain This Simply (எளிய விளக்கம்)
            </h3>
          </div>

          {/* Bilingual Toggle Button */}
          <button
            onClick={() => setExplanationLang((prev) => (prev === 'en' ? 'ta' : 'en'))}
            className="self-start sm:self-auto px-3.5 py-1.5 bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
          >
            <span>{explanationLang === 'en' ? 'தமிழில் பார்க்கவும்' : 'View in English'}</span>
          </button>
        </div>

        {/* Dynamic Explanation Text */}
        <div className="text-slate-800 text-sm sm:text-base leading-relaxed mb-4">
          {explanationLang === 'ta' ? (
            <p className="font-normal font-sans">{result.simple_explanation.ta}</p>
          ) : (
            <p className="font-normal">{result.simple_explanation.en}</p>
          )}
        </div>

        {/* Key Takeaway Box */}
        <div className="bg-white p-3.5 rounded-xl border border-indigo-100 text-xs sm:text-sm font-bold text-indigo-900 flex items-start space-x-2">
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-extrabold text-[11px] uppercase shrink-0">
            Important
          </span>
          <span>{result.simple_explanation.key_takeaway}</span>
        </div>
      </div>

      {/* 4. Warning Signals Detected */}
      {result.signals.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
              Warning Signals ({result.signals.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {result.signals.map((sig, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900">{sig.title}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        sig.severity === 'high'
                          ? 'bg-rose-100 text-rose-800'
                          : sig.severity === 'medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {sig.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {sig.explanation}
                  </p>
                </div>
                {sig.evidence && (
                  <div className="bg-white p-2 rounded-lg border border-slate-200 text-[11px] text-slate-500 font-mono italic">
                    <span className="font-bold text-slate-700 not-italic">Quoted: </span>
                    "{sig.evidence}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Claim Cards */}
      {result.claims.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
              Detected Financial Claims ({result.claims.length})
            </h3>
          </div>

          <div className="space-y-3.5">
            {result.claims.map((claim, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 uppercase">
                      {claim.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {claim.status.replace('_', ' ')}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleClaimAction(idx)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 self-start sm:self-auto flex items-center space-x-1"
                  >
                    <span>How do I verify this?</span>
                    {expandedClaims[idx] ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <p className="text-sm font-bold text-slate-900 mb-1.5">
                  "{claim.claim}"
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-700">Why it matters: </span>
                  {claim.why_it_matters}
                </p>

                {/* Expandable Verification Action */}
                {expandedClaims[idx] && (
                  <div className="mt-3 p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-sky-950 flex items-start space-x-2">
                    <ExternalLink className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Verification Action: </span>
                      {claim.action}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. What Should You Verify? Checklist */}
      {result.verification_items.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                What Should You Verify Before Acting?
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Tick items as you verify them
            </span>
          </div>

          <div className="space-y-2.5">
            {result.verification_items.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100/70'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isChecked ? 'line-through opacity-80' : ''
                    }`}
                  >
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. "Before You Act" Security Banner */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 shadow-sm flex items-start space-x-3.5">
        <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 mb-1">
            Before You Act
          </h4>
          <p className="text-sm font-bold text-rose-950 leading-relaxed">
            {result.before_you_act}
          </p>
        </div>
      </div>

      {/* 8. "Teach Me" Financial Literacy Micro-Lesson */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
              What Can You Learn From This?
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            30-60 sec read
          </span>
        </div>

        <div className="mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Topic: {result.micro_lesson.topic}
          </span>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
            {result.micro_lesson.title}
          </h4>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          {result.micro_lesson.summary}
        </p>

        {/* Remember Box */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-xl mb-4 text-xs sm:text-sm font-bold text-amber-950">
          <span className="text-amber-800 font-extrabold uppercase text-[11px] block mb-0.5">
            Remember
          </span>
          "{result.micro_lesson.remember}"
        </div>

        {/* Expandable Deep Dive */}
        {lessonExpanded ? (
          <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <p>{result.micro_lesson.learn_more}</p>
            <button
              onClick={() => setLessonExpanded(false)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-2 block"
            >
              Show less ↑
            </button>
          </div>
        ) : (
          <button
            onClick={() => setLessonExpanded(true)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>Learn more about this pattern →</span>
          </button>
        )}
      </div>

      {/* 9. Uncertainty Limits & Legal Disclaimer */}
      <div className="text-xs text-slate-400 space-y-2 px-2 pb-4">
        {result.uncertainty.length > 0 && (
          <div className="bg-slate-100/70 p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-600 block mb-1">
              System Limitations & Boundaries:
            </span>
            <ul className="list-disc list-inside space-y-0.5">
              {result.uncertainty.map((u, idx) => (
                <li key={idx}>{u}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-[11px] text-slate-400 text-center">
          {result.disclaimer}
        </p>
      </div>
    </div>
  );
};
