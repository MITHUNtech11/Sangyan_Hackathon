export type OverallStatus = 'potentially_misleading' | 'needs_verification' | 'no_obvious_signals';
export type VerificationVerdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED' | 'OUTDATED';
export type SeverityLevel = 'high' | 'medium' | 'low';
export type ClaimType = 'factual' | 'promotional' | 'predictive' | 'opinion';
export type ClaimStatus = 'needs_verification' | 'unverified' | 'educational' | 'plausible';
export type EvidenceQuality = 'no_evidence' | 'anecdotal_cherrypicked' | 'audited_filing';

export interface RAGEvidenceDoc {
  id?: string;
  title: string;
  authority: string;
  reference_no?: string | null;
  date?: string | null;
  excerpt: string;
  url?: string | null;
  relevance_score?: number;
}

export interface UrlInspectionResult {
  url: string;
  domain: string;
  is_apk: boolean;
  is_shortener: boolean;
  is_impersonating: boolean;
  impersonated_target?: string | null;
  risk_level: string; // 'high' | 'medium' | 'low' | 'safe'
  reason: string;
  redirect_warning?: string | null;
}

export interface ClaimVerification {
  claim: string;
  verdict: VerificationVerdict;
  confidence: number;
  why_verdict: string;
  retrieved_evidence: RAGEvidenceDoc[];
}

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
  verdict?: VerificationVerdict | null;
  summary: string;
  warning_signals_count: number;
  claims: ClaimItem[];
  verified_claims?: ClaimVerification[];
  signals: WarningSignal[];
  intent_breakdown?: IntentBreakdown | null;
  sebi_check?: SebiCheckResult | null;
  regulatory_grounding?: RegulatoryGrounding | null;
  url_inspection?: UrlInspectionResult | null;
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

export type NavigationView = 'analyzer' | 'demos' | 'regulatory';

export interface TestCaseItem {
  id: string;
  name: string;
  content: string;
  expected_status: OverallStatus;
  status_label: string;
  summary: string;
  category?: string;
  signals_count?: number;
  micro_lesson_topic?: string;
}

export interface RegulatoryAdvisory {
  id: string;
  authority: string;
  reference_no: string;
  date: string;
  title: string;
  platform: string;
  summary: string;
  key_red_flags: string[];
  official_action_advice: string;
  source_url: string;
}

export interface ModusOperandiItem {
  id: string;
  platform: string;
  tactic_name: string;
  description: string;
  how_it_works: string[];
  regulatory_precedent: string;
  how_investor_protects: string;
}

export interface RegulatoryGrounding {
  platform_detected?: string | null;
  modus_operandi_title?: string | null;
  modus_operandi_description?: string | null;
  matched_advisories?: RegulatoryAdvisory[];
  official_redressal_steps?: string[];
}


