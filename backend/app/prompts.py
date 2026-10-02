"""Prompt templates and system guidelines for Nambikkai's 3-stage intelligence engine.

Enforces:
1. Strict separation of extraction, signal detection, and explanation.
2. Objective, defensible language (no defamatory 'scam' declarations).
3. Plain-language synthesis in both English and Tamil.
4. Independent verification checklists and explicit boundary/uncertainty reporting.
"""

SYSTEM_PROMPT_CORE = """You are Nambikkai (நம்பிக்கை), an objective financial content literacy AI designed to protect Indian retail investors from misinformation, manipulative advertising, and predatory financial schemes.

Your principles:
1. Objectivity: Never say "This is definitely a scam" or make legal fraud judgments. Use measured, defensible terminology: "Potentially misleading", "Needs caution", or "Needs verification".
2. Direct Evidence: Every detected warning signal MUST be backed by an exact quote from the source text. Never extrapolate or fabricate evidence.
3. No Investment Advice: Never recommend buying, selling, or holding any financial asset or product.
4. Clarity & Bharat-First Accessibility: Provide explanations in plain English and natural Tamil (எளிய தமிழ்), avoiding financial jargon so a first-time investor can understand easily.
5. Verification Over Trust: Emphasize actionable, independent verification steps (e.g. SEBI registration search, official website check) rather than asking the user to trust you as the authority.
"""

STAGE1_EXTRACTION_PROMPT = """Extract all financial claims from the following content.

Content:
\"\"\"{content}\"\"\"

For each distinct claim, extract:
- exact claim: verbatim phrase or sentence
- category: one of [guaranteed_return, fixed_high_return, risk_free_investment, unrealistic_return, future_prediction, double_your_money, historical_performance, regulatory_claim, authority_endorsement, fee_or_deposit, educational_statement, general_market_comment]
- claim_type: one of [factual, promotional, predictive, opinion]
- severity: [high, medium, low]
- why_it_matters: why a retail investor should scrutinize this claim
- action: actionable steps to independently verify this specific claim

Return the output as a valid JSON object matching:
{
  "claims": [
    {
      "claim": "string",
      "category": "string",
      "claim_type": "factual | promotional | predictive | opinion",
      "severity": "high | medium | low",
      "why_it_matters": "string",
      "action": "string"
    }
  ]
}
"""

STAGE2_SIGNAL_DETECTION_PROMPT = """Analyze the extracted claims and raw content to identify warning signals from the predefined misinformation and manipulation taxonomy.

Raw Content:
\"\"\"{content}\"\"\"

Extracted Claims:
{claims_json}

Predefined Signal Taxonomy:
- Financial Claims: guaranteed_return, fixed_high_return, risk_free_investment, unrealistic_return, future_prediction, double_your_money
- Psychological Manipulation: urgency, scarcity, fear_fomo, pressure, emotional_language
- Authority & Legitimacy: fake_regulatory_claim, government_impersonation, celebrity_endorsement, expert_impersonation, fake_institutional_affiliation
- Evidence & Transparency: no_source, unsupported_statistic, missing_risk_context, cherry_picked_performance, misleading_comparison
- Direct Fraud Indicators: payment_request, personal_upi_account, otp_password_request, suspicious_contact, unverified_website

RULES:
- Do NOT declare the whole text as a scam.
- Every detected signal MUST include verbatim 'evidence' from the content.
- If no warning signals are present (e.g. content is educational or neutral), return an empty list of signals.

Return the output as a valid JSON object matching:
{
  "signals": [
    {
      "type": "taxonomy_code",
      "title": "Human Readable Title",
      "severity": "high | medium | low",
      "evidence": "Exact quote from text",
      "explanation": "Why this pattern poses a risk to retail investors"
    }
  ]
}
"""

STAGE3_EXPLANATION_PROMPT = """Generate an investor-friendly synthesis, simple explanations (in English and Tamil), verification checklist, and uncertainty boundaries based on the detected claims and signals.

Raw Content:
\"\"\"{content}\"\"\"

Extracted Claims:
{claims_json}

Detected Warning Signals:
{signals_json}

RULES:
1. Determine `overall_status`:
   - "potentially_misleading": if high-severity warning signals exist (guaranteed returns, payment requests, fake regulatory claims, personal UPI, etc.).
   - "needs_verification": if significant claims exist but insufficient evidence is present to verify them from the text alone.
   - "no_obvious_signals": if content contains proper risk disclosures, is educational, or contains no manipulative red flags.
2. Formulate `status_label`:
   - "Needs Caution" (for potentially_misleading)
   - "Needs Verification" (for needs_verification)
   - "No Obvious Warning Signals Detected" (for no_obvious_signals)
3. Write `summary`: 1-2 plain sentences explaining what this content is claiming.
4. Write `simple_explanation`:
   - `en`: Explain in clear, 5th-grade English what the message is saying and why one should be careful. Zero jargon.
   - `ta`: Provide a clean, natural Tamil translation of the explanation (எளிய தமிழில் தெளிவான விளக்கம்).
   - `key_takeaway`: 1 memorable rule of thumb.
   - `translations`: A dictionary containing natural, conversational translations in major Indian languages (hi, bn, mr, te, ta, gu, ur, kn, or, ml).
5. Create `verification_items`: 3-5 specific questions the user should investigate (e.g. "Is the entity registered on sebi.gov.in?", "Does their official website mention this scheme?").
6. Provide `before_you_act`: Immediate safety directive (e.g., "Do not transfer money via personal UPI or share OTPs before independent verification.").
7. State `uncertainty`: 1-3 bullet points acknowledging what this AI cannot verify from this text alone (e.g., "The system cannot determine if the company actually exists without external regulatory lookup.").

Return as a valid JSON object:
{
  "overall_status": "potentially_misleading | needs_verification | no_obvious_signals",
  "status_label": "string",
  "summary": "string",
  "simple_explanation": {
    "en": "string",
    "ta": "string",
    "key_takeaway": "string",
    "translations": {
      "hi": "string",
      "bn": "string",
      "mr": "string",
      "te": "string",
      "ta": "string",
      "gu": "string",
      "ur": "string",
      "kn": "string",
      "or": "string",
      "ml": "string"
    }
  },
  "verification_items": ["string"],
  "before_you_act": "string",
  "uncertainty": ["string"]
}
"""
