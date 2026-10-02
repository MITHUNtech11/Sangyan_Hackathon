export type OverallStatus = 'potentially_misleading' | 'needs_verification' | 'no_obvious_signals';
export type SeverityLevel = 'high' | 'medium' | 'low';
export type ClaimType = 'factual' | 'promotional' | 'predictive' | 'opinion';
export type ClaimStatus = 'needs_verification' | 'unverified' | 'educational' | 'plausible';

export interface ClaimItem {
  claim: string;
  category: string;
  claim_type: ClaimType;
  severity: SeverityLevel;
  status: ClaimStatus;
  why_it_matters: string;
  action: string;
}

export interface WarningSignal {
  type: string;
  title: string;
  severity: SeverityLevel;
  evidence: string;
  explanation: string;
}

export interface SimpleExplanation {
  en: string;
  ta: string;
  key_takeaway: string;
}

export interface MicroLesson {
  topic: string;
  title: string;
  summary: string;
  remember: string;
  learn_more: string;
}

export interface AnalysisResult {
  id: string;
  input_type: string;
  original_content: string;
  overall_status: OverallStatus;
  status_label: string;
  summary: string;
  warning_signals_count: number;
  claims: ClaimItem[];
  signals: WarningSignal[];
  simple_explanation: SimpleExplanation;
  verification_items: string[];
  before_you_act: string;
  micro_lesson: MicroLesson;
  uncertainty: string[];
  disclaimer: string;
  processing_time_ms?: number;
}

export interface DemoSample {
  id: string;
  title: string;
  category: string;
  preview: string;
  content: string;
  expected_status: OverallStatus;
}
