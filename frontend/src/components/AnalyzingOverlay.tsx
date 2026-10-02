import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, CircleDot } from 'lucide-react';

interface AnalyzingOverlayProps {
  currentLang: 'en' | 'ta';
}

export const AnalyzingOverlay: React.FC<AnalyzingOverlayProps> = ({ currentLang }) => {
  const [progress, setProgress] = useState(15);
  const [step, setStep] = useState(0);

  const stepsEn = [
    'Reading content & text extraction...',
    'Identifying financial claims...',
    'Checking warning signals & red flags...',
    'Preparing simple explanation & verification checklist...',
  ];

  const stepsTa = [
    'செய்தியின் வரிகளை வாசிக்கிறது...',
    'நிதி சார்ந்த வாக்குறுதிகளை அடையாளம் காண்கிறது...',
    'எச்சரிக்கை அறிகுறிகள் மற்றும் அபாயங்களை சோதிக்கிறது...',
    'எளிய விளக்கம் மற்றும் சரிபார்ப்பு வழிகளை தயார் செய்கிறது...',
  ];

  const currentSteps = currentLang === 'ta' ? stepsTa : stepsEn;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          setStep(0);
          return prev + 5;
        } else if (prev < 60) {
          setStep(1);
          return prev + 6;
        } else if (prev < 85) {
          setStep(2);
          return prev + 5;
        } else if (prev < 95) {
          setStep(3);
          return prev + 2;
        }
        return prev;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 max-w-lg mx-auto text-center my-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {currentLang === 'ta' ? 'உள்ளடக்கம் ஆராயப்படுகிறது...' : 'Analyzing content...'}
      </h3>
      <p className="text-xs text-slate-500 mb-6">
        {currentLang === 'ta'
          ? 'முதலீட்டாளர் பாதுகாப்பு நெறிமுறைகளுடன் பகுப்பாய்வு செய்யப்படுகிறது'
          : 'Processing claims against investor protection safeguards'}
      </p>

      {/* Checklist items */}
      <div className="space-y-3 text-left mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        {currentSteps.map((s, idx) => {
          const isDone = step > idx;
          const isCurrent = step === idx;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-3 text-sm transition-all ${
                isDone
                  ? 'text-emerald-700 font-medium'
                  : isCurrent
                  ? 'text-sky-700 font-bold'
                  : 'text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <CircleDot className="w-4 h-4 text-sky-600 animate-pulse shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
              )}
              <span className="truncate">{s}</span>
            </div>
          );
        })}
      </div>

      {/* Progress Bar & Percentage */}
      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right text-xs font-bold text-slate-500">
        {progress}%
      </div>
    </div>
  );
};
