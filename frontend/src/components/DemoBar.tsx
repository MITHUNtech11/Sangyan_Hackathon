import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import type { DemoSample } from '../types';

interface DemoBarProps {
  samples: DemoSample[];
  onSelectSample: (sample: DemoSample) => void;
  disabled?: boolean;
}

export const DemoBar: React.FC<DemoBarProps> = ({ samples, onSelectSample, disabled }) => {
  if (!samples || samples.length === 0) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6">
      <div className="flex items-center space-x-2 mb-2 text-xs font-semibold text-slate-700 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Quick Demo Scenarios (Click to test):</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {samples.map((s, idx) => {
          let badgeColor = 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100';
          let Icon = AlertTriangle;

          if (s.expected_status === 'needs_verification') {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
            Icon = AlertCircle;
          } else if (s.expected_status === 'no_obvious_signals') {
            badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
            Icon = CheckCircle2;
          }

          return (
            <button
              key={s.id}
              disabled={disabled}
              onClick={() => onSelectSample(s)}
              className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${badgeColor} ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-1">
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold truncate">
                  Demo {idx + 1}: {s.expected_status === 'potentially_misleading' ? 'High Risk' : s.expected_status === 'needs_verification' ? 'Misleading' : 'Educational'}
                </span>
              </div>
              <p className="text-[11px] line-clamp-2 opacity-90 leading-tight">
                "{s.preview}"
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
