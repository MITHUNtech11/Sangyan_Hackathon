export type OverallStatus = 'potentially_misleading' | 'needs_verification' | 'no_obvious_signals';
export type SeverityLevel = 'high' | 'medium' | 'low';
export type ClaimType = 'factual' | 'promotional' | 'predictive' | 'opinion';
export type ClaimStatus = 'needs_verification' | 'unverified' | 'educational' | 'plausible';
export type EvidenceQuality = 'no_evidence' | 'anecdotal_cherrypicked' | 'audited_filing';

export interface ClaimItem {
  claim: string;
  category: string;
  claim_type: ClaimType;
  severity: SeverityLevel;
  status: ClaimStatus;
  why_it_matters: string;
  action: string;
  evidence_quality?: EvidenceQuality;
  evidence_quality_label?: string;
}

export interface WarningSignal {
  type: string;
  title: string;
  severity: SeverityLevel;
  evidence: string;
  explanation: string;
}

export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'te'
  | 'ta'
  | 'gu'
  | 'ur'
  | 'kn'
  | 'or'
  | 'ml';

export interface SimpleExplanation {
  en: string;
  ta: string;
  key_takeaway: string;
  translations?: Record<string, string>;
}

export interface IntentBreakdown {
  education_score: number;
  promotion_score: number;
  deception_score: number;
  intent_label: string;
  commercial_intent_detected?: string | null;
}

export interface SebiCheckResult {
  has_sebi_mention: boolean;
  claimed_reg_number?: string | null;
  reg_type?: string | null;
  is_valid_format?: boolean | null;
  sebi_warning_note?: string | null;
  official_verify_url: string;
}

export interface MicroLesson {
  topic: string;
  title: string;
  summary: string;
  remember: string;
  learn_more: string;
  everyday_analogy?: string | null;
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
  intent_breakdown?: IntentBreakdown | null;
  sebi_check?: SebiCheckResult | null;
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
