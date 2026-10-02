import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Play,
  Filter,
  ShieldAlert,
} from 'lucide-react';
import type { TestCaseItem, OverallStatus } from '../types';
import { fetchTestCases } from '../api';

interface DemoPageProps {
  onSelectContent: (content: string) => void;
  onBackToAnalyzer: () => void;
  isLoading: boolean;
}

export const DemoPage: React.FC<DemoPageProps> = ({
  onSelectContent,
  onBackToAnalyzer,
  isLoading,
}) => {
  const [testCases, setTestCases] = useState<TestCaseItem[]>([]);
  const [filter, setFilter] = useState<'all' | OverallStatus>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [loadingCases, setLoadingCases] = useState(true);

  useEffect(() => {
    fetchTestCases()
      .then((data) => {
        setTestCases(data);
        setLoadingCases(false);
      })
      .catch((err) => {
        console.error('Failed to load test cases:', err);
        setLoadingCases(false);
      });
  }, []);

  const filteredCases = testCases.filter((tc) => {
    if (filter === 'all') return true;
    return tc.expected_status === filter;
  });

  const getStatusBadge = (status: OverallStatus) => {
    switch (status) {
      case 'potentially_misleading':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: AlertTriangle,
          label: 'Needs Caution / High Risk',
        };
      case 'needs_verification':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: AlertCircle,
          label: 'Needs Verification',
        };
      case 'no_obvious_signals':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          label: 'Compliant / Educational',
        };
    }
  };

  const handleRunTest = (tc: TestCaseItem) => {
    setSelectedCaseId(tc.id);
    onSelectContent(tc.content);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={onBackToAnalyzer}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Analyzer</span>
        </button>

        <div className="flex items-center space-x-1.5 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Track E Evaluation Suite:</span>
          <span>10 Curated Misinformation Benchmark Scenarios</span>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Pre-loaded Test Scenarios</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          Investor Resilience Benchmark Scenarios
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Test real-world financial claims encountered by retail investors across WhatsApp forwards, Telegram tip channels, and social media. Each scenario maps to SEBI protection guidelines and tests our multi-pillar detection pipeline.
        </p>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
          <div className="flex items-center space-x-1 text-xs text-slate-400 mr-2 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            All Scenarios ({testCases.length})
          </button>
          <button
            onClick={() => setFilter('potentially_misleading')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'potentially_misleading'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            High Risk ({testCases.filter((c) => c.expected_status === 'potentially_misleading').length})
          </button>
          <button
            onClick={() => setFilter('needs_verification')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'needs_verification'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Needs Verification ({testCases.filter((c) => c.expected_status === 'needs_verification').length})
          </button>
          <button
            onClick={() => setFilter('no_obvious_signals')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter === 'no_obvious_signals'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Compliant / Educational ({testCases.filter((c) => c.expected_status === 'no_obvious_signals').length})
          </button>
        </div>
      </div>

      {/* Scenarios Grid */}
      {loadingCases ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading benchmark scenarios...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCases.map((tc, index) => {
            const badge = getStatusBadge(tc.expected_status);
            const Icon = badge.icon;
            const isProcessingThis = isLoading && selectedCaseId === tc.id;

            return (
              <div
                key={tc.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      Scenario {index + 1} • {tc.id.toUpperCase()}
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                    {tc.name}
                  </h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                    {tc.summary}
                  </p>

                  {/* Quoted Claim Text */}
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 text-xs font-mono text-slate-800 italic line-clamp-3 leading-relaxed">
                    "{tc.content}"
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-medium">
                    <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                    <span>{tc.signals_count || 0} Warning Signals</span>
                  </div>

                  <button
                    disabled={isLoading}
                    onClick={() => handleRunTest(tc)}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isProcessingThis ? (
                      <span>Analyzing...</span>
                    ) : (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Test Scenario →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Back Button */}
      <div className="text-center pt-4">
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
