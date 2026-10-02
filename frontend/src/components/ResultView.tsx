import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Clock,
  Smartphone,
  Trash2,
  RotateCcw,
  Languages,
  CheckSquare,
  Square,
  ExternalLink,
  Volume2,
  Square as StopSquare,
  Share2,
  Check,
  Building2,
  Lightbulb,
  PieChart,
  ArrowLeft,
  Sparkles,
  FileText,
  ListChecks,
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

type ResultTab = 'verdict' | 'claims' | 'signals';

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onReset,
  onDelete,
  currentLang,
  returnView = 'analyzer',
  onNavigateToDemos,
}) => {
  // Tab state for clear progressive disclosure
  const [activeTab, setActiveTab] = useState<ResultTab>('verdict');

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

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  // 5-Tier Authoritative Verdict taxonomy
  const verdict = result.verdict || (
    result.overall_status === 'no_obvious_signals'
      ? 'TRUE'
      : result.overall_status === 'needs_verification'
      ? 'MISLEADING'
      : 'FALSE'
  );

  let bannerBg = 'from-rose-50 via-red-50/40 to-white border-rose-200 text-rose-950';
  let badgeBg = 'bg-rose-600 text-white';
  let statusBorder = 'border-rose-300';
  let StatusIcon = ShieldAlert;
  let verdictTitle = 'REFUTED / FRAUDULENT SCHEME';
  let verdictSub = 'Contradicted by official SEBI/RBI regulations or documented scam modus operandi.';
  let verdictBadgeLabel = 'FALSE';

  if (verdict === 'TRUE') {
    bannerBg = 'from-emerald-50 via-teal-50/40 to-white border-emerald-200 text-emerald-950';
    badgeBg = 'bg-emerald-600 text-white';
    statusBorder = 'border-emerald-300';
    StatusIcon = CheckCircle2;
    verdictTitle = 'OFFICIALLY VERIFIED & COMPLIANT';
    verdictSub = 'Supported by official statutory disclosures and regulatory rules.';
    verdictBadgeLabel = 'TRUE';
  } else if (verdict === 'MISLEADING') {
    bannerBg = 'from-amber-50 via-orange-50/40 to-white border-amber-200 text-amber-950';
    badgeBg = 'bg-amber-600 text-white';
    statusBorder = 'border-amber-300';
    StatusIcon = AlertCircle;
    verdictTitle = 'MISLEADING / MISSING CONTEXT';
    verdictSub = 'Omits mandatory risk disclosures or presents selective past performance as safety proof.';
    verdictBadgeLabel = 'MISLEADING';
  } else if (verdict === 'OUTDATED') {
    bannerBg = 'from-purple-50 via-violet-50/40 to-white border-purple-200 text-purple-950';
    badgeBg = 'bg-purple-600 text-white';
    statusBorder = 'border-purple-300';
    StatusIcon = Clock;
    verdictTitle = 'OUTDATED / LAPSED REGULATION';
    verdictSub = 'Refers to a discontinued regulatory scheme or interest rate that is no longer active.';
    verdictBadgeLabel = 'OUTDATED';
  } else if (verdict === 'UNVERIFIED') {
    bannerBg = 'from-slate-100 via-slate-50 to-white border-slate-300 text-slate-900';
    badgeBg = 'bg-slate-700 text-white';
    statusBorder = 'border-slate-300';
    StatusIcon = AlertCircle;
    verdictTitle = 'UNVERIFIED FINANCIAL CLAIM';
    verdictSub = 'No official SEBI/RBI record directly confirms this claim. Independent due diligence required.';
    verdictBadgeLabel = 'UNVERIFIED';
  }

  const intent = result.intent_breakdown;
  const sebi = result.sebi_check;

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans animate-in fade-in duration-200">
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

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShareCard}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
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
            className="px-3 py-1.5 bg-white text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.checkAnother}</span>
          </button>

          <button
            onClick={() => onDelete(result.id)}
            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
            title="Delete analysis immediately for privacy"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* 1. EXECUTIVE VERDICT HERO (Clear, Punchy, High-Impact) */}
      <div className={`rounded-3xl border-2 bg-gradient-to-b ${bannerBg} ${statusBorder} p-6 sm:p-7 shadow-sm transition-all`}>
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-2xl ${badgeBg} shadow-sm shrink-0`}>
              <StatusIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                  AUTHORITATIVE VERDICT:
                </span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${badgeBg}`}>
                  {verdictBadgeLabel}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  ({result.status_label})
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 mt-0.5">
                {verdictTitle}
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {verdictSub}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-mono font-bold text-slate-500 bg-white/80 border border-slate-200 px-2.5 py-1 rounded-full self-start sm:self-auto">
            Source: {result.input_type.toUpperCase()}
          </span>
        </div>

        {/* Big One-Line Takeaway */}
        <div className="bg-white/90 border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-5 shadow-sm">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-700 mb-1">
            Core Investor Takeaway:
          </div>
          <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            "{result.simple_explanation?.key_takeaway || result.summary}"
          </p>
        </div>

        {/* 3 Executive Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Metric 1: Red Flags */}
          <div className="bg-white/80 border border-slate-200 rounded-xl p-3 flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${result.warning_signals_count > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {result.warning_signals_count} Warning Signal{result.warning_signals_count === 1 ? '' : 's'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {result.warning_signals_count > 0 ? 'High risk indicators' : 'Clean of red flags'}
              </div>
            </div>
          </div>

          {/* Metric 2: Intent Score */}
          <div className="bg-white/80 border border-slate-200 rounded-xl p-3 flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${intent && intent.promotion_score > 50 ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'}`}>
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">
                {intent ? `${intent.promotion_score}% Commercial / Selling` : 'Content Intent Analyzed'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {intent?.intent_label || 'Evaluated'}
              </div>
            </div>
          </div>

          {/* Metric 3: SEBI Check */}
          <div className="bg-white/80 border border-slate-200 rounded-xl p-3 flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${sebi?.has_sebi_mention && sebi?.is_valid_format ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 truncate">
                {sebi?.has_sebi_mention
                  ? sebi.claimed_reg_number
                    ? `Claim: ${sebi.claimed_reg_number}`
                    : 'Unregistered Claim'
                  : 'No SEBI Claim'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {sebi?.has_sebi_mention ? (sebi.is_valid_format ? 'Check Registration' : 'Unverified Syntax') : 'Independent review'}
              </div>
            </div>
          </div>
        </div>

        {/* Claimed Quote */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-start space-x-2 text-xs text-slate-600">
          <span className="font-bold text-slate-700 shrink-0">Scanned Content:</span>
          <span className="italic line-clamp-2">"{result.original_content || result.summary}"</span>
        </div>
      </div>

      {/* 2. PROGRESSIVE DISCLOSURE TABS (Clean, Focused, No Information Overload) */}
      <div className="flex border-b border-slate-200 bg-slate-100/60 p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => setActiveTab('verdict')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'verdict'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>1. Plain Advice & Analogy</span>
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'claims'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <FileText className="w-4 h-4 text-indigo-500" />
          <span>2. Evidence & Verification (RAG) ({(result.verified_claims || result.claims).length})</span>
        </button>

        <button
          onClick={() => setActiveTab('signals')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'signals'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <ListChecks className="w-4 h-4 text-rose-500" />
          <span>3. Red Flags & Security ({result.warning_signals_count + (result.url_inspection ? 1 : 0)})</span>
        </button>
      </div>

      {/* 3. TAB 1: PLAIN ADVICE & EVERYDAY ANALOGY */}
      {activeTab === 'verdict' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Plain Language Explanation Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  {t.explainSimply}
                </h3>
              </div>

              {/* Language Pills + Listen Audio */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleSpeak}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                    isPlayingAudio
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                  }`}
                  title="Read explanation aloud using voice synthesis"
                >
                  {isPlayingAudio ? (
                    <>
                      <StopSquare className="w-3.5 h-3.5 fill-current" />
                      <span>Stop Voice</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>🔊 Listen Voice</span>
                    </>
                  )}
                </button>

                {/* Quick Language Toggle */}
                <select
                  value={explanationLang}
                  onChange={(e) => setExplanationLang(e.target.value as SupportedLanguage)}
                  className="text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
              {getExplanationText()}
            </p>
          </div>

          {/* Before You Act (Friction & Safety Warning) */}
          <div className="bg-gradient-to-r from-rose-500 to-amber-600 text-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider mb-1.5 text-white/90">
              <AlertTriangle className="w-4 h-4 text-amber-200" />
              <span>{t.beforeYouAct}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-snug">
              {result.before_you_act}
            </p>
          </div>

          {/* Everyday Bharat Analogy Card */}
          {result.micro_lesson && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-amber-700">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Everyday Bharat Analogy (रोजमर्रा का उदाहरण / எளிய உவமை)</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  Topic: {result.micro_lesson.title}
                </span>
              </div>

              {result.micro_lesson.everyday_analogy && (
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 mb-4 text-xs sm:text-sm text-amber-950 font-medium italic leading-relaxed">
                  "{result.micro_lesson.everyday_analogy}"
                </div>
              )}

              {/* Remember Rule */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3.5 rounded-r-xl mb-3 text-xs sm:text-sm font-bold text-indigo-950">
                <span className="text-indigo-800 font-extrabold uppercase text-[10px] block mb-0.5">
                  Golden Rule to Remember:
                </span>
                "{result.micro_lesson.remember}"
              </div>

              {/* Expandable details */}
              {lessonExpanded ? (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Full Lesson Insight:
                  </div>
                  <p>{result.micro_lesson.learn_more}</p>
                  <button
                    onClick={() => setLessonExpanded(false)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-800 pt-1 block cursor-pointer"
                  >
                    Hide Details
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setLessonExpanded(true)}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 pt-1 block cursor-pointer"
                >
                  Learn More About This Protection Rule →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. TAB 2: CLAIMS & SEBI ANALYSIS */}
      {activeTab === 'claims' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Hybrid RAG Evidence & Citations Verification Card */}
          {result.verified_claims && result.verified_claims.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-sky-600" />
                  <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">
                    Official Evidence & Regulatory Verification (Hybrid RAG)
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
                  Grounded against SEBI, RBI, Exchanges & Fin-Fact
                </span>
              </div>

              <div className="space-y-4">
                {result.verified_claims.map((vc, idx) => {
                  let vColor = 'bg-rose-100 text-rose-800 border-rose-300';
                  if (vc.verdict === 'TRUE') vColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                  else if (vc.verdict === 'MISLEADING') vColor = 'bg-amber-100 text-amber-800 border-amber-300';
                  else if (vc.verdict === 'OUTDATED') vColor = 'bg-purple-100 text-purple-800 border-purple-300';
                  else if (vc.verdict === 'UNVERIFIED') vColor = 'bg-slate-100 text-slate-800 border-slate-300';

                  return (
                    <div key={idx} className="rounded-xl border border-slate-200 p-4 bg-slate-50/60 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="text-xs font-bold text-slate-900">
                          <span className="text-slate-500 mr-1.5">Claim {idx + 1}:</span>
                          "{vc.claim}"
                        </div>
                        <div className="flex items-center space-x-2 shrink-0 self-start sm:self-auto">
                          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border uppercase ${vColor}`}>
                            {vc.verdict}
                          </span>
                          <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                            {Math.round(vc.confidence * 100)}% Confidence
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed shadow-2xs">
                        <strong className="text-slate-900 font-bold block mb-1">Grounded Regulatory Rationale:</strong>
                        {vc.why_verdict}
                      </div>

                      {vc.retrieved_evidence && vc.retrieved_evidence.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                            Retrieved Official Regulatory Excerpts:
                          </div>
                          {vc.retrieved_evidence.map((ev, eIdx) => (
                            <div key={eIdx} className="bg-sky-50/70 border border-sky-200 rounded-xl p-3 text-xs space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-sky-950">
                                  {ev.authority} {ev.reference_no ? `• ${ev.reference_no}` : ''}
                                </span>
                                {ev.relevance_score !== undefined && (
                                  <span className="text-[10px] font-bold text-sky-700 bg-white px-2 py-0.5 rounded border border-sky-200">
                                    Match: {Math.round(ev.relevance_score * 100)}%
                                  </span>
                                )}
                              </div>
                              <div className="font-semibold text-slate-800 text-[11px]">{ev.title}</div>
                              <p className="text-slate-700 text-[11px] italic leading-relaxed">
                                "{ev.excerpt}"
                              </p>
                              {ev.url && (
                                <div className="pt-1 flex justify-end">
                                  <a
                                    href={ev.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 underline"
                                  >
                                    <span>View Official Circular</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Official SEBI & NSDL Regulatory Grounding */}
          {result.regulatory_grounding && result.regulatory_grounding.matched_advisories && result.regulatory_grounding.matched_advisories.length > 0 && (
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 text-white rounded-2xl p-5 shadow-sm space-y-3.5 border border-indigo-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-amber-300" />
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">
                    Official Regulatory Grounding (SEBI & NSDL)
                  </h3>
                </div>
                {result.regulatory_grounding.platform_detected && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-sky-200 capitalize self-start sm:self-auto">
                    Channel: {result.regulatory_grounding.platform_detected}
                  </span>
                )}
              </div>

              {result.regulatory_grounding.modus_operandi_title && (
                <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
                  <div className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                    Matched Social Media Modus Operandi (SEBI Case Precedent):
                  </div>
                  <div className="text-sm font-bold text-white mb-1">
                    {result.regulatory_grounding.modus_operandi_title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {result.regulatory_grounding.modus_operandi_description}
                  </p>
                </div>
              )}

              {/* Matched Circulars */}
              <div className="space-y-2">
                <div className="text-[10px] font-extrabold text-slate-300 uppercase tracking-wider">
                  Relevant Regulatory Circulars & Investor Advisories:
                </div>
                {result.regulatory_grounding.matched_advisories.map((adv) => (
                  <div key={adv.id} className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sky-300">{adv.authority} • {adv.reference_no}</span>
                      <span className="text-[10px] text-slate-400">{adv.date}</span>
                    </div>
                    <div className="font-semibold text-white">{adv.title}</div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{adv.official_action_advice}</p>
                    <div className="pt-1 flex justify-end">
                      <a
                        href={adv.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-sky-300 hover:text-white underline"
                      >
                        <span>Official Source Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEBI Registration & Impersonation Inspector */}
          {sebi && sebi.has_sebi_mention && (
            <div className={`rounded-2xl border-2 p-5 shadow-sm ${
              sebi.is_valid_format
                ? 'bg-sky-50/60 border-sky-200'
                : 'bg-rose-50/80 border-rose-300'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Building2 className={`w-5 h-5 ${sebi.is_valid_format ? 'text-sky-700' : 'text-rose-700'}`} />
                  <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">
                    SEBI Registration & Compliance Inspector
                  </h3>
                </div>
                <span className={`text-xs font-extrabold px-3 py-0.5 rounded-full uppercase self-start sm:self-auto ${
                  sebi.is_valid_format ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {sebi.is_valid_format ? 'Valid Syntax Format' : 'Unverified Regulatory Claim'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block mb-0.5">CLAIMED REGISTRATION NUMBER</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {sebi.claimed_reg_number || 'None Specified'}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block mb-0.5">REGULATORY CATEGORY</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {sebi.reg_type || 'Unspecified Entity'}
                  </span>
                </div>
              </div>

              {sebi.sebi_warning_note && (
                <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium mb-3">
                  <strong className="text-amber-900">Compliance Notice: </strong>
                  {sebi.sebi_warning_note}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                <span className="text-[11px] text-slate-500 font-medium">
                  Verify registration on SEBI's official portal:
                </span>
                <a
                  href={sebi.official_verify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-sky-700 hover:text-sky-900 underline"
                >
                  <span>SEBI Intermediary Directory</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Promotion vs. Education Classifier */}
          {intent && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
                    Content Intent Breakdown
                  </h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                  {intent.intent_label}
                </span>
              </div>

              {/* Multi-segment Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-4 flex overflow-hidden p-0.5 mb-3">
                <div
                  style={{ width: `${intent.education_score}%` }}
                  className="bg-emerald-500 h-full rounded-l-full transition-all"
                  title={`Educational: ${intent.education_score}%`}
                />
                <div
                  style={{ width: `${intent.promotion_score}%` }}
                  className="bg-amber-500 h-full transition-all"
                  title={`Promotional: ${intent.promotion_score}%`}
                />
                <div
                  style={{ width: `${intent.deception_score}%` }}
                  className="bg-rose-500 h-full rounded-r-full transition-all"
                  title={`Deceptive cues: ${intent.deception_score}%`}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                  <span className="block font-black text-emerald-800 text-sm">{intent.education_score}%</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Educational</span>
                </div>
                <div className="bg-amber-50 p-2 rounded-xl border border-amber-100">
                  <span className="block font-black text-amber-800 text-sm">{intent.promotion_score}%</span>
                  <span className="text-[10px] text-amber-600 font-semibold">Promotional</span>
                </div>
                <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <span className="block font-black text-rose-800 text-sm">{intent.deception_score}%</span>
                  <span className="text-[10px] text-rose-600 font-semibold">Deceptive Cues</span>
                </div>
              </div>

              {intent.commercial_intent_detected && (
                <div className="mt-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-700">
                  <strong>Detected Solicitations: </strong> {intent.commercial_intent_detected}
                </div>
              )}
            </div>
          )}

          {/* Extracted Financial Claims with Evidence Quality */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Extracted Financial Claims ({result.claims.length})
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Each claim is assessed for verifiable evidence and statutory compliance.
            </p>

            <div className="space-y-3">
              {result.claims.map((claim, idx) => {
                let evBg = 'bg-rose-50 text-rose-700 border-rose-200';
                if (claim.evidence_quality === 'audited_filing') {
                  evBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                } else if (claim.evidence_quality === 'anecdotal_cherrypicked') {
                  evBg = 'bg-amber-50 text-amber-700 border-amber-200';
                }

                return (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        Claim {idx + 1}: "{claim.claim}"
                      </span>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase self-start sm:self-auto shrink-0 ${evBg}`}>
                        {claim.evidence_quality_label || 'Unverified Assertion'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-700">Why it matters:</strong> {claim.why_it_matters}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-sky-800">
                        Action: {claim.action}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: RED FLAGS & CHECKLIST */}
      {activeTab === 'signals' && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* URL & APK Safety Threat Assessment Card */}
          {result.url_inspection && (
            <div className={`rounded-2xl border-2 p-5 shadow-sm space-y-3.5 ${
              result.url_inspection.risk_level === 'high'
                ? 'bg-rose-50/80 border-rose-300 text-rose-950'
                : result.url_inspection.risk_level === 'medium'
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-black/10">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-rose-600" />
                  <h3 className="text-sm font-black uppercase tracking-wide">
                    URL & APK Security Threat Assessment
                  </h3>
                </div>
                <span className={`text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase self-start sm:self-auto ${
                  result.url_inspection.risk_level === 'high'
                    ? 'bg-rose-600 text-white'
                    : result.url_inspection.risk_level === 'medium'
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  {result.url_inspection.risk_level} Risk Rating
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="bg-white/90 p-3 rounded-xl border border-slate-200">
                  <span className="text-slate-400 font-bold block mb-0.5 text-[10px] uppercase">Scanned Link / Destination:</span>
                  <span className="font-mono font-bold text-slate-900 break-all text-xs">
                    {result.url_inspection.url}
                  </span>
                </div>

                {result.url_inspection.is_apk && (
                  <div className="p-3.5 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-start space-x-2.5 shadow-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-200" />
                    <div>
                      <div className="uppercase tracking-wider text-[11px] font-black">Sideloaded APK Download Detected</div>
                      <p className="font-medium text-[11px] text-white/90 mt-0.5 leading-relaxed">
                        This link attempts to install an Android APK application outside the official Google Play Store or Apple App Store. Regulators warn that fraudulent apps harvest banking OTPs and screen credentials.
                      </p>
                    </div>
                  </div>
                )}

                {result.url_inspection.is_impersonating && (
                  <div className="p-3 bg-rose-100 border border-rose-300 text-rose-950 rounded-xl text-xs font-medium">
                    <strong className="text-rose-900 font-bold">Typosquatting Alert: </strong> This website mimics official <strong>{result.url_inspection.impersonated_target}</strong> infrastructure to harvest credentials or illicit payments.
                  </div>
                )}

                {result.url_inspection.is_shortener && (
                  <div className="p-3 bg-amber-100 border border-amber-300 text-amber-950 rounded-xl text-xs font-medium">
                    <strong className="text-amber-900 font-bold">Masked URL / Shortener: </strong> Uses a link redirector ({result.url_inspection.domain}) to conceal the destination domain.
                  </div>
                )}

                <div className="p-3 bg-white/90 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-slate-900 font-bold">Security Analysis: </strong> {result.url_inspection.reason}
                </div>

                {result.url_inspection.redirect_warning && (
                  <div className="p-2.5 bg-amber-100/80 border border-amber-300 rounded-xl text-[11px] font-bold text-amber-950 flex items-center space-x-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>Precaution: {result.url_inspection.redirect_warning}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warning Signals Detected */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Warning Signals Detected ({result.signals.length})
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Automated Pattern Analysis
              </span>
            </div>

            {result.signals.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                No high-risk warning signals detected in this content.
              </div>
            ) : (
              <div className="space-y-3">
                {result.signals.map((sig, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-900 flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{sig.title}</span>
                      </span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        {sig.severity} Severity
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-700 bg-white/70 p-2 rounded border border-rose-100 italic">
                      Quoted: "{sig.evidence}"
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sig.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Investor Checklist */}
          {result.verification_items && result.verification_items.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-2">
                <CheckSquare className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Investor Due Diligence Checklist
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Tick these items off to verify this financial claim independently before investing.
              </p>

              <div className="space-y-2.5">
                {result.verification_items.map((item, idx) => {
                  const isChecked = !!checkedItems[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`w-full p-3 rounded-xl border text-left flex items-start space-x-3 transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                      <span className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-80' : 'font-medium'}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Uncertainty Limits */}
          {result.uncertainty && result.uncertainty.length > 0 && (
            <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-700 block">Analysis Boundaries & Uncertainty:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {result.uncertainty.map((u, idx) => (
                  <li key={idx}>{u}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation & Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{returnView === 'demos' ? 'Return to Demo Scenarios' : 'Analyze Another Piece of Content'}</span>
          </button>
          {onNavigateToDemos && (
            <button
              onClick={onNavigateToDemos}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
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

      {/* Legal Public-Good Disclaimer */}
      <p className="text-[11px] text-slate-400 text-center px-4">
        {result.disclaimer}
      </p>
    </div>
  );
};
