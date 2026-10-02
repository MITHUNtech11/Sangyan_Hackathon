"""Pydantic schemas for Nambikkai financial content analysis."""
from enum import Enum
from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class OverallStatus(str, Enum):
    POTENTIALLY_MISLEADING = "potentially_misleading"
    NEEDS_VERIFICATION = "needs_verification"
    NO_OBVIOUS_SIGNALS = "no_obvious_signals"


class VerificationVerdict(str, Enum):
    """5-tier authoritative verification verdict taxonomy."""
    TRUE = "TRUE"
    FALSE = "FALSE"
    MISLEADING = "MISLEADING"
    UNVERIFIED = "UNVERIFIED"
    OUTDATED = "OUTDATED"


class SeverityLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class ClaimType(str, Enum):
    FACTUAL = "factual"
    PROMOTIONAL = "promotional"
    PREDICTIVE = "predictive"
    OPINION = "opinion"


class ClaimStatus(str, Enum):
    NEEDS_VERIFICATION = "needs_verification"
    UNVERIFIED = "unverified"
    EDUCATIONAL = "educational"
    PLAUSIBLE = "plausible"


class EvidenceQuality(str, Enum):
    NO_EVIDENCE = "no_evidence"
    ANECDOTAL_CHERRYPICKED = "anecdotal_cherrypicked"
    AUDITED_FILING = "audited_filing"


class ClaimItem(BaseModel):
    claim: str = Field(..., description="The exact financial claim extracted from the content.")
    category: str = Field(..., description="Taxonomy category for the claim.")
    claim_type: ClaimType = Field(default=ClaimType.PROMOTIONAL, description="Type of claim.")
    severity: SeverityLevel = Field(default=SeverityLevel.MEDIUM, description="Risk severity level.")
    status: ClaimStatus = Field(default=ClaimStatus.NEEDS_VERIFICATION, description="Verification status.")
    why_it_matters: str = Field(..., description="Context on why retail investors should be aware.")
    action: str = Field(..., description="Actionable step: how to verify this claim independently.")
    evidence_quality: EvidenceQuality = Field(
        default=EvidenceQuality.NO_EVIDENCE,
        description="Assessed evidence backing this claim."
    )
    evidence_quality_label: str = Field(
        default="No Evidence / Assertion Only",
        description="Human readable evidence assessment."
    )


class WarningSignal(BaseModel):
    type: str = Field(..., description="Taxonomy signal code.")
    title: str = Field(..., description="Human readable title for the signal.")
    severity: SeverityLevel = Field(..., description="Severity level: high, medium, low.")
    evidence: str = Field(..., description="Exact quoted phrase from the content.")
    explanation: str = Field(..., description="Plain-language explanation of why this is a warning signal.")


class SimpleExplanation(BaseModel):
    en: str = Field(..., description="Simple, jargon-free explanation in English.")
    ta: str = Field(..., description="Simple, jargon-free explanation in Tamil (எளிய தமிழ் விளக்கம்).")
    key_takeaway: str = Field(..., description="Core one-line takeaway for the investor.")
    translations: Dict[str, str] = Field(
        default_factory=dict,
        description="Translations across top 10 Indian languages: hi, bn, mr, te, ta, gu, ur, kn, or, ml, en."
    )


class IntentBreakdown(BaseModel):
    """Promotion vs Education Classifier (SANGYAN Track E Direction)."""
    education_score: int = Field(default=10, description="Percentage score 0-100 for genuine investor education.")
    promotion_score: int = Field(default=80, description="Percentage score 0-100 for commercial / promotional selling.")
    deception_score: int = Field(default=10, description="Percentage score 0-100 for manipulative or deceptive cues.")
    intent_label: str = Field(default="Predominantly Promotional", description="Summary intent category.")
    commercial_intent_detected: Optional[str] = Field(
        default=None,
        description="What the content appears to be selling (e.g. VIP subscriptions, unverified advisory, paid signals)."
    )


class SebiCheckResult(BaseModel):
    """SEBI Registration Syntax & Fraud Deception Inspector."""
    has_sebi_mention: bool = Field(default=False, description="Whether SEBI or regulator was mentioned.")
    claimed_reg_number: Optional[str] = Field(default=None, description="Extracted SEBI registration code.")
    reg_type: Optional[str] = Field(default=None, description="Regulatory category (e.g. Research Analyst, Investment Adviser).")
    is_valid_format: Optional[bool] = Field(default=None, description="Whether registration string matches official SEBI syntax.")
    sebi_warning_note: Optional[str] = Field(default=None, description="Safety notice on fake SEBI certifications or deceptive claims.")
    official_verify_url: str = Field(
        default="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13",
        description="Direct link to SEBI recognized intermediary directory."
    )


class MicroLesson(BaseModel):
    topic: str = Field(..., description="Topic category (e.g. Guaranteed Returns, SEBI Registration).")
    title: str = Field(..., description="Title of the bite-sized lesson.")
    summary: str = Field(..., description="Short 2-3 sentence overview.")
    remember: str = Field(..., description="Key principle to remember.")
    learn_more: str = Field(..., description="30-60 second educational read.")
    everyday_analogy: Optional[str] = Field(
        default=None,
        description="Intuitive everyday Tier-2/3 analogy demystifying this concept for retail investors."
    )


class RegulatoryAdvisory(BaseModel):
    id: str
    authority: str = Field(..., description="SEBI or NSDL")
    reference_no: str = Field(..., description="Circular/Press Release No.")
    date: str
    title: str
    platform: str = Field(..., description="whatsapp, telegram, youtube, or general")
    summary: str
    key_red_flags: List[str] = Field(default_factory=list)
    official_action_advice: str
    source_url: str


class ModusOperandiItem(BaseModel):
    id: str
    platform: str
    tactic_name: str
    description: str
    how_it_works: List[str] = Field(default_factory=list)
    regulatory_precedent: str
    how_investor_protects: str


class RegulatoryGrounding(BaseModel):
    platform_detected: Optional[str] = None
    modus_operandi_title: Optional[str] = None
    modus_operandi_description: Optional[str] = None
    matched_advisories: List[RegulatoryAdvisory] = Field(default_factory=list)
    official_redressal_steps: List[str] = Field(default_factory=list)


class RAGEvidenceDoc(BaseModel):
    """Retrieved evidence document from the regulatory knowledge base."""
    id: Optional[str] = None
    title: str = Field(..., description="Official circular or document title.")
    authority: str = Field(..., description="Regulator or source: SEBI, RBI, NSE, BSE, Fin-Fact, etc.")
    reference_no: Optional[str] = Field(default=None, description="Official circular / press release number.")
    date: Optional[str] = Field(default=None, description="Date of issuance.")
    excerpt: str = Field(..., description="Verbatim or key excerpt explaining the regulatory stance.")
    url: Optional[str] = Field(default=None, description="Direct URL to official circular or announcement.")
    relevance_score: float = Field(default=0.0, description="Relevance similarity score (0.0 to 1.0).")


class UrlInspectionResult(BaseModel):
    """Deep inspection of detected URLs or sideloaded APK downloads."""
    url: str = Field(..., description="Scanned URL.")
    domain: str = Field(..., description="Extracted domain or hostname.")
    is_apk: bool = Field(default=False, description="Whether the link downloads an APK or executable outside official app stores.")
    is_shortener: bool = Field(default=False, description="Whether this is a URL shortener masking the destination.")
    is_impersonating: bool = Field(default=False, description="Whether the domain mimics an official authority or bank.")
    impersonated_target: Optional[str] = Field(default=None, description="Name of the impersonated authority/portal.")
    risk_level: str = Field(default="low", description="Safety rating: safe, low, medium, or high.")
    reason: str = Field(default="", description="Detailed explanation of safety findings.")
    redirect_warning: Optional[str] = Field(default=None, description="Precautionary warning regarding link navigation.")


class ClaimVerification(BaseModel):
    """5-tier grounded verification for an individual financial claim."""
    claim: str = Field(..., description="The financial claim being verified.")
    verdict: VerificationVerdict = Field(..., description="5-tier verification verdict (TRUE, FALSE, MISLEADING, UNVERIFIED, OUTDATED).")
    confidence: float = Field(default=0.85, description="Confidence score (0.0 to 1.0).")
    why_verdict: str = Field(..., description="Plain-language explanation grounded in official evidence.")
    retrieved_evidence: List[RAGEvidenceDoc] = Field(default_factory=list, description="Retrieved regulatory evidence.")


class AnalysisResult(BaseModel):
    id: str = Field(..., description="Unique analysis identifier.")
    input_type: str = Field(..., description="Input method: image, text, or url.")
    original_content: str = Field(..., description="The raw or OCR-extracted text that was analyzed.")
    overall_status: OverallStatus = Field(..., description="High-level status classification.")
    status_label: str = Field(..., description="Display label e.g., 'Needs Caution', 'Needs Verification', 'No Obvious Warning Signals Detected'.")
    verdict: Optional[VerificationVerdict] = Field(
        default=None,
        description="5-tier authoritative verification verdict (TRUE, FALSE, MISLEADING, UNVERIFIED, OUTDATED)."
    )
    summary: str = Field(..., description="Plain summary answering 'What is this content saying?'.")
    warning_signals_count: int = Field(default=0, description="Total count of warning signals detected.")
    claims: List[ClaimItem] = Field(default_factory=list, description="Extracted financial claims.")
    verified_claims: List[ClaimVerification] = Field(
        default_factory=list,
        description="Detailed verification of each claim against the regulatory RAG corpus."
    )
    signals: List[WarningSignal] = Field(default_factory=list, description="Detected warning and manipulation signals.")
    intent_breakdown: Optional[IntentBreakdown] = Field(default=None, description="Promotion vs Education breakdown.")
    sebi_check: Optional[SebiCheckResult] = Field(default=None, description="Regulatory registration check.")
    regulatory_grounding: Optional[RegulatoryGrounding] = Field(
        default=None,
        description="Cross-referenced official SEBI & NSDL regulatory advisories and modus operandi."
    )
    url_inspection: Optional[UrlInspectionResult] = Field(
        default=None,
        description="Security inspection of any detected URLs or APK download links."
    )
    simple_explanation: SimpleExplanation = Field(..., description="Simple multi-lingual breakdown.")
    verification_items: List[str] = Field(default_factory=list, description="Checklist questions to verify before acting.")
    before_you_act: str = Field(..., description="Urgent precautionary instruction.")
    micro_lesson: MicroLesson = Field(..., description="Targeted financial literacy micro-lesson.")
    uncertainty: List[str] = Field(default_factory=list, description="Explicit boundaries and what the AI cannot verify alone.")
    disclaimer: str = Field(
        default="This analysis does not guarantee that the content is accurate or safe. Verify important financial claims independently with official sources before investing.",
        description="Standard legal and trust disclaimer."
    )
    processing_time_ms: Optional[int] = Field(default=None, description="Elapsed processing time in milliseconds.")


# Request Payloads
class TextAnalysisRequest(BaseModel):
    text: str = Field(..., min_length=5, description="Financial text to analyze.")
    language: Optional[str] = Field(default="en", description="Preferred output language: en, hi, bn, mr, te, ta, gu, ur, kn, or, ml.")


class UrlAnalysisRequest(BaseModel):
    url: str = Field(..., description="URL containing financial content or claims.")
    language: Optional[str] = Field(default="en", description="Preferred output language: en, hi, bn, mr, te, ta, gu, ur, kn, or, ml.")


class ClaimVerifyRequest(BaseModel):
    claim: str = Field(..., min_length=3, description="Financial claim to verify against the regulatory knowledge base.")


class UrlInspectRequest(BaseModel):
    url: str = Field(..., description="URL to inspect for threats, typosquatting, and APK downloads.")


class ExplainRequest(BaseModel):
    text: str = Field(..., description="Text to explain simply.")
    language: str = Field(default="en", description="Language: en, hi, bn, mr, te, ta, gu, ur, kn, or, ml.")


class TranslateRequest(BaseModel):
    text: str = Field(..., description="Text to translate.")
    target_language: str = Field(default="ta", description="Target language code: en, hi, bn, mr, te, ta, gu, ur, kn, or, ml.")


class DemoSample(BaseModel):
    id: str
    title: str
    category: str
    preview: str
    content: str
    expected_status: OverallStatus
