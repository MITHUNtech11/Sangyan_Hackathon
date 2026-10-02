import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { MicroLesson } from '../types';
import { fetchLessons } from '../api';

interface LessonsPageProps {
  onBackToAnalyzer: () => void;
}

export const LessonsPage: React.FC<LessonsPageProps> = ({ onBackToAnalyzer }) => {
  const [lessons, setLessons] = useState<MicroLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchLessons()
      .then((data) => {
        setLessons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load lessons:', err);
        setLoading(false);
      });
  }, []);

  const toggleExpand = (topic: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topic]: !prev[topic] }));
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
          <span className="font-semibold text-slate-700">Financial Literacy Curriculum:</span>
          <span>10 Micro-Lessons with Everyday Bharat Analogies</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-bold mb-4 backdrop-blur-sm border border-white/10">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>Investor Education Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          Investor Resilience Micro-Lessons
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
          Bite-sized, jargon-free lessons designed specifically for first-time retail investors from Tier-2 & Tier-3 India. Learn how to spot high-risk traps, understand regulatory protections, and make rational, deliberate financial decisions.
        </p>
      </div>

      {/* Lessons List */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-sm">
          Loading micro-lessons...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, idx) => {
            const isExpanded = !!expandedTopics[lesson.topic];

            return (
              <div
                key={lesson.topic}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Lesson Number & Topic */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">
                      Lesson {idx + 1} • {lesson.topic.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Tier-2/3 Everyday Analogy
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {lesson.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 mb-3.5 leading-relaxed">
                    {lesson.summary}
                  </p>

                  {/* Everyday Bharat Analogy Card */}
                  {lesson.everyday_analogy && (
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 mb-3.5">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-800 mb-1">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Everyday Bharat Analogy:</span>
                      </div>
                      <p className="text-xs text-amber-950 italic leading-relaxed">
                        "{lesson.everyday_analogy}"
                      </p>
                    </div>
                  )}

                  {/* Remember Box */}
                  <div className="bg-indigo-50 border-l-4 border-indigo-500 p-3 rounded-r-xl mb-3 text-xs font-bold text-indigo-950">
                    <span className="text-indigo-800 font-extrabold uppercase text-[10px] block mb-0.5 flex items-center space-x-1">
                      <CheckCircle2 className="w-3 h-3 text-indigo-600 inline" />
                      <span>Golden Rule to Remember:</span>
                    </span>
                    "{lesson.remember}"
                  </div>

                  {/* Expandable Learn More */}
                  {isExpanded && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-1.5 animate-in fade-in">
                      <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                        Deep Dive:
                      </div>
                      <p>{lesson.learn_more}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 mt-2 flex justify-end">
                  <button
                    onClick={() => toggleExpand(lesson.topic)}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Learn More Details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
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
