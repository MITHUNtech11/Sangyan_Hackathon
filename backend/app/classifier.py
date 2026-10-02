"""SANGYAN Track E Classifier: Promotion vs Education & Claim Evidence Checker.

Implements the official Track E problem statement directions:
1. Promotion vs Education Classifier: Distinguishes educational content from promotional/deceptive selling.
2. Claim Evidence-Checker: Assesses whether financial claims are backed by verifiable evidence.
3. SEBI Registration & Regulatory Fraud Inspector: Detects and validates SEBI registration syntax and deceptive regulatory claims.
"""
import re
from typing import List, Tuple, Optional
from .schemas import (
    OverallStatus,
    ClaimItem,
    WarningSignal,
    EvidenceQuality,
    IntentBreakdown,
    SebiCheckResult,
)


def inspect_sebi_registration(text: str) -> SebiCheckResult:
    """Detect and inspect claimed SEBI registration patterns and deceptive regulator claims."""
    # Look for SEBI registration patterns: IN[A-Z]\d{8,9} or mentions of SEBI
    sebi_reg_match = re.search(r'\b(IN[A-Z]\d{8,9})\b', text, re.IGNORECASE)
    has_sebi = bool(re.search(r'\b(sebi|security and exchange board of india|செபி|सेबी)\b', text, re.IGNORECASE))

    if sebi_reg_match:
        reg_num = sebi_reg_match.group(1).upper()
        prefix = reg_num[:3]
        reg_types = {
            "INH": "SEBI-Registered Research Analyst (RA)",
            "INA": "SEBI-Registered Investment Adviser (IA)",
            "INZ": "SEBI-Registered Stock Broker",
            "INM": "SEBI-Registered Merchant Banker",
            "INF": "SEBI-Registered Mutual Fund",
            "INP": "SEBI-Registered Portfolio Manager (PMS)"
        }
        reg_type = reg_types.get(prefix, "SEBI Intermediary")

        warning = None
        lower_text = text.lower()
        if any(w in lower_text for w in ["guarantee", "assured", "40%", "monthly", "zero risk"]):
            warning = f"Regulated entities ({reg_type}) are legally prohibited by SEBI from assuring or guaranteeing market returns. Promising fixed returns under a SEBI badge is a severe compliance violation."
        elif any(w in lower_text for w in ["telegram", "vip", "jackpot", "whatsapp group"]):
            warning = "Scammers often clone legitimate analysts' registration numbers and display them on unauthorized Telegram/WhatsApp channels."

        return SebiCheckResult(
            has_sebi_mention=True,
            claimed_reg_number=reg_num,
            reg_type=reg_type,
            is_valid_format=True,
            sebi_warning_note=warning or "Verify that the entity's official domain and bank account match SEBI's recognized intermediary directory."
        )

    if has_sebi:
        warning = None
        if re.search(r'sebi approved (telegram|group|channel|scheme|jackpot|return|plan)', text, re.IGNORECASE):
            warning = "SEBI never approves specific investment schemes, guaranteed plans, or social media trading channels. Any claim of 'SEBI Approved Scheme' is deceptive."
        return SebiCheckResult(
            has_sebi_mention=True,
            claimed_reg_number=None,
            reg_type=None,
            is_valid_format=False,
            sebi_warning_note=warning or "No valid SEBI registration number (e.g. INH... or INA...) was provided. Treat unverified regulatory endorsements with high caution."
        )

    return SebiCheckResult(has_sebi_mention=False)


def classify_intent_and_evidence(
    content: str,
    overall_status: OverallStatus,
    signals: List[WarningSignal],
    claims: List[ClaimItem]
) -> Tuple[IntentBreakdown, List[ClaimItem]]:
    """Promotion vs Education Classifier & Claim Evidence Quality Evaluator (SANGYAN Track E)."""
    # 1. Update Evidence Quality on each atomic claim
    updated_claims: List[ClaimItem] = []
    for c in claims:
        claim_lower = c.claim.lower()
        if any(term in claim_lower for term in ["guarantee", "assured", "zero risk", "safest", "pay ₹", "pay rs", "vip channel", "40%", "100%"]):
            c.evidence_quality = EvidenceQuality.NO_EVIDENCE
            c.evidence_quality_label = "No Evidence / Assertion Only"
        elif any(term in claim_lower for term in ["delivered", "last year", "historically", "grew", "surged", "25%"]):
            c.evidence_quality = EvidenceQuality.ANECDOTAL_CHERRYPICKED
            c.evidence_quality_label = "Cherry-picked Historical Data"
        elif any(term in claim_lower for term in ["market risks", "scheme related", "prospectus", "rbi", "statutory", "does not guarantee"]):
            c.evidence_quality = EvidenceQuality.AUDITED_FILING
            c.evidence_quality_label = "Regulated / Statutory Disclosure"
        else:
            c.evidence_quality = EvidenceQuality.NO_EVIDENCE
            c.evidence_quality_label = "Unverified Assertion"
        updated_claims.append(c)

    # 2. Determine Intent Breakdown (Promotion vs Education)
    if overall_status == OverallStatus.POTENTIALLY_MISLEADING:
        ed_score = 5
        prom_score = 75
        dec_score = 20
        label = "Predominantly Promotional / High-Risk Trap"
        commercial = "Selling paid VIP channel access or soliciting upfront payment"
    elif overall_status == OverallStatus.NEEDS_VERIFICATION:
        ed_score = 30
        prom_score = 55
        dec_score = 15
        label = "Promotional with Selective Disclosure"
        commercial = "Marketing investment product using selective historical performance"
    else:
        ed_score = 90
        prom_score = 10
        dec_score = 0
        label = "Genuine Investor Education"
        commercial = None

    intent = IntentBreakdown(
        education_score=ed_score,
        promotion_score=prom_score,
        deception_score=dec_score,
        intent_label=label,
        commercial_intent_detected=commercial
    )
    return intent, updated_claims
