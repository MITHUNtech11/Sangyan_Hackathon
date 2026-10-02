import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  ShieldAlert,
  ExternalLink,
  MessageCircle,
  Send,
  Video,
  FileCheck,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import type { RegulatoryAdvisory, ModusOperandiItem } from '../types';
import { fetchRegulatoryAdvisories, fetchModusOperandi } from '../api';

interface RegulatoryWatchPageProps {
  onBackToAnalyzer: () => void;
}

export const RegulatoryWatchPage: React.FC<RegulatoryWatchPageProps> = ({
  onBackToAnalyzer,
}) => {
  const [advisories, setAdvisories] = useState<RegulatoryAdvisory[]>([]);
  const [modusOperandi, setModusOperandi] = useState<ModusOperandiItem[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<'advisories' | 'modus_operandi'>('advisories');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchRegulatoryAdvisories(), fetchModusOperandi()])
      .then(([advs, mo]) => {
        setAdvisories(advs);
        setModusOperandi(mo);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load regulatory datasets:', err);
        setLoading(false);
      });
  }, []);

  const filteredAdvisories = advisories.filter((a) => {
    if (selectedPlatform === 'all') return true;
    return a.platform.toLowerCase() === selectedPlatform.toLowerCase();
  });

  const filteredModusOperandi = modusOperandi.filter((m) => {
    if (selectedPlatform === 'all') return true;
    return m.platform.toLowerCase() === selectedPlatform.toLowerCase();
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4 text-emerald-500" />;
      case 'telegram':
        return <Send className="w-4 h-4 text-sky-500" />;
      case 'youtube':
        return <Video className="w-4 h-4 text-rose-500" />;
      default:
        return <Building2 className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={onBackToAnalyzer}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Analyzer</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span className="font-bold text-slate-800">SEBI & NSDL Grounding:</span>
          <span>Official Circulars & Modus Operandi Catalog</span>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
          <Building2 className="w-3.5 h-3.5 text-amber-300" />
          <span>Official Public Datasets & Advisories</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          SEBI & NSDL Regulatory Intelligence Hub
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Authoritative intelligence sourced directly from official cautionary press releases, enforcement orders, and circulars issued by SEBI and NSDL. Understand how fraudsters manipulate investors on WhatsApp, Telegram, and YouTube.
        </p>

        {/* Platform Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
          <span className="text-xs text-slate-400 font-semibold mr-2">Filter Channel:</span>
          {[
            { id: 'all', label: 'All Channels' },
            { id: 'whatsapp', label: 'WhatsApp Traps' },
            { id: 'telegram', label: 'Telegram Channels' },
            { id: 'youtube', label: 'YouTube Pump & Dump' },
            { id: 'general', label: 'NSDL Demat Alerts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPlatform(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedPlatform === tab.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 rounded-2xl gap-1">
        <button
          onClick={() => setActiveSection('advisories')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeSection === 'advisories'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <FileCheck className="w-4 h-4 text-sky-600" />
          <span>Official SEBI & NSDL Circulars ({filteredAdvisories.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('modus_operandi')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeSection === 'modus_operandi'
              ? 'bg-white text-sky-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Social Media Modus Operandi ({filteredModusOperandi.length})</span>
        </button>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading SEBI & NSDL regulatory intelligence...
        </div>
      ) : activeSection === 'advisories' ? (
        /* 1. SEBI & NSDL Circulars */
        <div className="space-y-4">
          {filteredAdvisories.map((adv) => (
            <div
              key={adv.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {adv.authority}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-600">
                    {adv.reference_no}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {getPlatformIcon(adv.platform)}
                    <span className="capitalize">{adv.platform}</span>
                  </span>
                  <span className="text-[11px] text-slate-400">{adv.date}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {adv.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                {adv.summary}
              </p>

              {/* Red Flags Identified by Regulator */}
              <div className="bg-rose-50/60 border border-rose-100 rounded-xl p-3.5 mb-4 space-y-1.5">
                <span className="text-xs font-extrabold uppercase text-rose-900 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Key Red Flags Highlighted by Regulator:</span>
                </span>
                <ul className="list-disc list-inside space-y-1 text-xs text-rose-950">
                  {adv.key_red_flags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              </div>

              {/* Official Action Advice */}
              <div className="bg-sky-50 border-l-4 border-sky-500 p-3 rounded-r-xl text-xs text-sky-950 font-medium mb-3">
                <strong className="text-sky-900">Official Protective Advice: </strong>
                {adv.official_action_advice}
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <a
                  href={adv.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-xs font-bold text-sky-600 hover:text-sky-800 underline"
                >
                  <span>Read Official Circular / Press Release on {adv.authority}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 2. Modus Operandi Encyclopedia */
        <div className="space-y-4">
          {filteredModusOperandi.map((mo) => (
            <div
              key={mo.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center space-x-1 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {getPlatformIcon(mo.platform)}
                  <span className="capitalize">{mo.platform} Modus Operandi</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                  SEBI Documented Tactic
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                {mo.tactic_name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                {mo.description}
              </p>

              {/* Step by Step Execution */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  How the Fraudsters Execute This:
                </span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  {mo.how_it_works.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-slate-400 font-bold shrink-0">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regulatory Precedent & Safeguard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-amber-950">
                  <strong className="block text-amber-900 mb-0.5">Regulatory Precedent:</strong>
                  {mo.regulatory_precedent}
                </div>
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-emerald-950">
                  <strong className="block text-emerald-900 mb-0.5">How Investors Protect Themselves:</strong>
                  {mo.how_investor_protects}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Grievance & Reporting Matrix */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-sky-400 mb-3 flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Official Investor Complaint & Fraud Redressal Portals</span>
        </h3>
        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          If you have been solicited by unauthorized tipsters or lost money through social media investment groups, use these official government and regulatory channels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white text-sm">SEBI SCORES 2.0</div>
              <div className="text-[11px] text-slate-300">File complaints against registered intermediaries</div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-400" />
          </a>

          <a
            href="https://mi.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white text-sm">SEBI Market Intelligence</div>
              <div className="text-[11px] text-slate-300">Tip-off portal for fake apps, Telegram channels & tips</div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-400" />
          </a>

          <a
            href="https://eservices.nsdl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white text-sm">NSDL IDEAS & e-Services</div>
              <div className="text-[11px] text-slate-300">Verify genuine Demat holdings directly</div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-400" />
          </a>

          <a
            href="https://www.cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition-colors flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-white text-sm">National Cybercrime Helpline: 1930</div>
              <div className="text-[11px] text-slate-300">Report UPI / Bank financial fraud immediately</div>
            </div>
            <ExternalLink className="w-4 h-4 text-sky-400" />
          </a>
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="text-center pt-2">
        <button
          onClick={onBackToAnalyzer}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-slate-700 hover:text-slate-900 border border-slate-300 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Content Analyzer</span>
        </button>
      </div>
    </div>
  );
};
