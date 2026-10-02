import React, { useState, useEffect } from 'react';
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
  Volume2,
  Square as StopSquare,
  Share2,
  Check,
  Building2,
  Lightbulb,
  PieChart,
  ShoppingCart,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import type { AnalysisResult, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../i18n/languages';
import { TRANSLATIONS } from '../i18n/translations';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  onDelete: (id: string) => void;
  currentLang: SupportedLanguage;
  returnView?: 'analyzer' | 'demos';
  onNavigateToDemos?: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onReset,
  onDelete,
  currentLang,
  returnView = 'analyzer',
  onNavigateToDemos,
}) => {
  // Explanation language state (tracks user selection or defaults to currentLang)
  const [overrideLang, setOverrideLang] = useState<{ global: SupportedLanguage; local: SupportedLanguage }>({
    global: currentLang,
    local: currentLang,
  });

  const explanationLang = overrideLang.global === currentLang ? overrideLang.local : currentLang;

  const setExplanationLang = (newLang: SupportedLanguage) => {
    setOverrideLang({ global: currentLang, local: newLang });
  };

  // Checked state for verification checklist items
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  // Expandable lesson state
  const [lessonExpanded, setLessonExpanded] = useState(false);
  // Expandable claim actions
  const [expandedClaims, setExpandedClaims] = useState<Record<number, boolean>>({});
  // Speech synthesis state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  // Copied share card notification
  const [copiedNotification, setCopiedNotification] = useState(false);

  const t = TRANSLATIONS[currentLang]?.result || TRANSLATIONS.en.result;

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleClaimAction = (idx: number) => {
    setExpandedClaims((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Get active explanation text in selected language
  const getExplanationText = (): string => {
    if (result.simple_explanation?.translations && result.simple_explanation.translations[explanationLang]) {
      return result.simple_explanation.translations[explanationLang];
    }
    if (explanationLang === 'ta' && result.simple_explanation?.ta) {
      return result.simple_explanation.ta;
    }
    return result.simple_explanation?.en || '';
  };

  // Web Speech API Text-to-Speech handler
  const handleToggleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('Voice readout is not supported by your browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = getExplanationText();
    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const langInfo = getLanguageByCode(explanationLang);
    utterance.lang = langInfo.speechLang || 'en-IN';
    utterance.rate = 0.92;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Generate WhatsApp-friendly Fact-Check Card to copy and share
  const handleShareCard = () => {
    const text =
      `🛡️ *Nambikkai Financial Content Check*\n\n` +
      `📌 *Status:* ${result.status_label.toUpperCase()}\n` +
      `⚠️ *Warning Signals Detected:* ${result.warning_signals_count}\n\n` +
      `💬 *Summary:* "${result.summary}"\n\n` +
      `🔍 *Explanation (${getLanguageByCode(explanationLang).nativeName}):*\n${getExplanationText()}\n\n` +
      `🚨 *Before You Act:* ${result.before_you_act}\n\n` +
      `✅ *Verify before investing:* Always cross-check with sebi.gov.in.`;

    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
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

  const intent = result.intent_breakdown;
  const sebi = result.sebi_check;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{returnView === 'demos' ? '← Back to Demo Scenarios' : '← Back to Analyzer'}</span>
          </button>
          {onNavigateToDemos && (
            <>
              <span className="text-slate-300">|</span>
              <button
                onClick={onNavigateToDemos}
                className="text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors cursor-pointer"
              >
                Explore Other Scenarios (10)
              </button>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px]">
            Analysis ID: {result.id}
          </span>
        </div>
      </div>

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
                  {t.contentCheck}
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
            {/* Share Card Button */}
            <button
              onClick={handleShareCard}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5"
              title="Copy WhatsApp-ready fact-check summary"
            >
              {copiedNotification ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Card</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="px-3.5 py-2 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.checkAnother}</span>
            </button>
            <button
              onClick={() => onDelete(result.id)}
              className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5"
              title="Delete analysis immediately for privacy"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.delete}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. What Is This Message Claiming? */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          {t.whatIsClaiming}
        </h3>
        <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
          "{result.summary}"
        </p>
      </div>

      {/* 3. SANGYAN Track E Feature: Promotion vs. Education Classifier & Intent Gauge */}
      {intent && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <PieChart className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                Promotion vs. Education Classifier
              </h3>
            </div>
            <span
              className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase self-start sm:self-auto ${
                intent.deception_score > 15
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : intent.promotion_score > 50
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              }`}
            >
              {intent.intent_label}
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Distinguishes whether this message is educating you or selling you a financial scheme, course, or VIP channel.
          </p>

          {/* Tri-color Stacked Progress Bar */}
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex mb-2">
            <div
              style={{ width: `${intent.education_score}%` }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title={`Education: ${intent.education_score}%`}
            />
            <div
              style={{ width: `${intent.promotion_score}%` }}
              className="bg-amber-500 h-full transition-all duration-500"
              title={`Promotion: ${intent.promotion_score}%`}
            />
            <div
              style={{ width: `${intent.deception_score}%` }}
              className="bg-rose-500 h-full transition-all duration-500"
              title={`Deception / Trap: ${intent.deception_score}%`}
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs font-semibold pt-1 text-slate-600 gap-2">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Genuine Education ({intent.education_score}%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Commercial Promotion ({intent.promotion_score}%)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span>Deceptive Red Flags ({intent.deception_score}%)</span>
            </div>
          </div>

          {/* Commercial Intent Notice */}
          {intent.commercial_intent_detected && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start space-x-2">
              <ShoppingCart className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">What is being sold: </span>
                {intent.commercial_intent_detected}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. SANGYAN SEBI Regulatory Verification Inspector */}
      {sebi && sebi.has_sebi_mention && (
        <div className="bg-sky-50/70 rounded-2xl border-2 border-sky-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-sky-700" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-sky-950">
                SEBI Regulatory Verification Inspector
              </h3>
            </div>
            {sebi.claimed_reg_number && (
              <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white text-sky-800 border border-sky-200 rounded-lg">
                Claimed: {sebi.claimed_reg_number}
              </span>
            )}
          </div>

          {sebi.reg_type && (
            <div className="mb-2 text-xs font-bold text-sky-900">
              Regulator Category: <span className="font-normal">{sebi.reg_type}</span>
            </div>
          )}

          {sebi.sebi_warning_note && (
            <div className="p-3 bg-white border border-sky-100 rounded-xl text-xs text-slate-700 leading-relaxed mb-3">
              <span className="font-bold text-sky-900 block mb-0.5">Advisory Note:</span>
              {sebi.sebi_warning_note}
            </div>
          )}

          <a
            href={sebi.official_verify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-white px-3.5 py-2 rounded-xl border border-sky-300 shadow-sm hover:bg-sky-50 transition-all"
          >
            <span>Verify on Official SEBI Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* 5. The Multilingual "Explain Simply" Feature with 11-Language Selector & Voice Readout */}
      <div className="bg-gradient-to-br from-indigo-50/60 to-sky-50/60 rounded-2xl border border-indigo-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-indigo-100 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
              <Languages className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-indigo-950">
              {t.explainSimply} ({getLanguageByCode(explanationLang).nativeName})
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Voice Readout (Web Speech API) */}
            <button
              onClick={handleToggleSpeak}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-200'
              }`}
              title="Listen to explanation in native speech"
            >
              {isPlayingAudio ? (
                <>
                  <StopSquare className="w-3.5 h-3.5 fill-current" />
                  <span>{t.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{t.listenAudio}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 11 Indian Regional Languages Quick Pill Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-2.5 mb-3 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider mr-1">
            Read in:
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = explanationLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  if (isPlayingAudio) {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                  }
                  setExplanationLang(lang.code);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-indigo-50 border border-slate-200'
                }`}
              >
                {lang.nativeName}
              </button>
            );
          })}
        </div>

        {/* Dynamic Explanation Text */}
        <div className="text-slate-800 text-sm sm:text-base leading-relaxed mb-4">
          <p className="font-normal">{getExplanationText()}</p>
        </div>

        {/* Key Takeaway Box */}
        <div className="bg-white p-3.5 rounded-xl border border-indigo-100 text-xs sm:text-sm font-bold text-indigo-900 flex items-start space-x-2">
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-extrabold text-[11px] uppercase shrink-0">
            {t.important}
          </span>
          <span>{result.simple_explanation?.key_takeaway}</span>
        </div>
      </div>

      {/* 6. Warning Signals Detected */}
      {result.signals.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
              {t.warningSignals} ({result.signals.length})
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

      {/* 7. Claim Cards with SANGYAN Evidence-Checker Badges */}
      {result.claims.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
              {t.detectedClaims} ({result.claims.length})
            </h3>
          </div>

          <div className="space-y-3.5">
            {result.claims.map((claim, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 uppercase">
                      {claim.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {claim.status.replace('_', ' ')}
                    </span>
                    {/* SANGYAN Claim Evidence Quality Badge */}
                    {claim.evidence_quality_label && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          claim.evidence_quality === 'audited_filing'
                            ? 'bg-emerald-100 text-emerald-800'
                            : claim.evidence_quality === 'anecdotal_cherrypicked'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-rose-100 text-rose-800 border border-rose-200'
                        }`}
                      >
                        Evidence: {claim.evidence_quality_label}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleClaimAction(idx)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 self-start sm:self-auto flex items-center space-x-1"
                  >
                    <span>{t.howDoIVerify}</span>
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
                      <span className="font-bold">{t.verificationAction} </span>
                      {claim.action}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. What Should You Verify? Checklist */}
      {result.verification_items.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                {t.whatToVerify}
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {t.tickAsYouVerify}
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

      {/* 9. "Before You Act" Precaution Banner */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 shadow-sm flex items-start space-x-3.5">
        <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-rose-800 mb-1">
            {t.beforeYouAct}
          </h4>
          <p className="text-sm font-bold text-rose-950 leading-relaxed">
            {result.before_you_act}
          </p>
        </div>
      </div>

      {/* 10. "Teach Me" Financial Literacy Micro-Lesson with SANGYAN Bharat Everyday Analogy */}
      {result.micro_lesson && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-800">
                {t.whatCanYouLearn}
              </h3>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              {t.readTime}
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

          {/* SANGYAN Tier-2/3 Everyday Bharat Analogy Card */}
          {result.micro_lesson.everyday_analogy && (
            <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-xl mb-4">
              <div className="flex items-center space-x-1.5 text-xs font-extrabold uppercase tracking-wide text-amber-900 mb-1">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Everyday Bharat Analogy (எளிய உவமை / रोजमर्रा का उदाहरण)</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed italic">
                "{result.micro_lesson.everyday_analogy}"
              </p>
            </div>
          )}

          {/* Remember Box */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-r-xl mb-4 text-xs sm:text-sm font-bold text-indigo-950">
            <span className="text-indigo-800 font-extrabold uppercase text-[11px] block mb-0.5">
              {t.remember}
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
                {t.showLess}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLessonExpanded(true)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
            >
              <span>{t.learnMore}</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom Navigation & Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{returnView === 'demos' ? 'Return to Demo Scenarios' : 'Analyze Another Piece of Content'}</span>
          </button>
          {onNavigateToDemos && (
            <button
              onClick={onNavigateToDemos}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Explore All 10 Benchmark Scenarios</span>
            </button>
          )}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1"
        >
          ↑ Scroll to Top
        </button>
      </div>

      {/* 11. Uncertainty Limits & Legal Disclaimer */}
      <div className="text-xs text-slate-400 space-y-2 px-2 pb-4">
        {result.uncertainty && result.uncertainty.length > 0 && (
          <div className="bg-slate-100/70 p-3.5 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-600 block mb-1">
              {t.limitations}
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
