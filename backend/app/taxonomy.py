"""Red-Flag and Misinformation Taxonomy for Nambikkai.

Defines the 5 core categories, sub-signals, severity weights, and verification guidance.
"""
from typing import Dict, Any


TAXONOMY: Dict[str, Dict[str, Any]] = {
    # 1. Financial Claims
    "guaranteed_return": {
        "pillar": "Financial Claims",
        "title": "Guaranteed Returns Claim",
        "default_severity": "high",
        "description": "Promises a fixed, guaranteed, or assured rate of return in market-linked investments.",
        "why_it_matters": "SEBI strictly prohibits market intermediaries from promising guaranteed returns. Equity and derivative markets inherently carry risk.",
        "verification_action": "Check SEBI regulations. Genuine SEBI-registered entities cannot promise guaranteed returns on equities or derivatives."
    },
    "fixed_high_return": {
        "pillar": "Financial Claims",
        "title": "Unusually High Fixed Return",
        "default_severity": "high",
        "description": "Claims fixed monthly or annual payouts significantly higher than standard benchmark rates (e.g., >12% p.a. guaranteed).",
        "why_it_matters": "High returns without risk are mathematically unsustainable and characteristic of Ponzi structures.",
        "verification_action": "Compare against bank FD or RBI benchmark rates. High return always implies high risk."
    },
    "risk_free_investment": {
        "pillar": "Financial Claims",
        "title": "Zero Risk / 100% Safe Claim",
        "default_severity": "high",
        "description": "Claims the investment has 0% risk or total capital protection while yielding high returns.",
        "why_it_matters": "Every investment vehicle carries risk (market risk, credit risk, liquidity risk). No market investment is risk-free.",
        "verification_action": "Look for the mandatory risk disclosure statement and offer document."
    },
    "unrealistic_return": {
        "pillar": "Financial Claims",
        "title": "Unrealistic Return Rate",
        "default_severity": "high",
        "description": "Claims returns such as 20%-50% per month, 100% in a week, or multi-bagger guarantees.",
        "why_it_matters": "Compounding at such rates is economically implausible; Warren Buffett averages ~20% annually.",
        "verification_action": "Perform a simple math check on annual compounding rates."
    },
    "future_prediction": {
        "pillar": "Financial Claims",
        "title": "Definite Future Price Target",
        "default_severity": "medium",
        "description": "Presents speculative future price movements as guaranteed certainties.",
        "why_it_matters": "Future market movements cannot be predicted with 100% certainty. It may be part of a pump-and-dump scheme.",
        "verification_action": "Check if this is an unregistered tipster running a trading syndicate."
    },
    "double_your_money": {
        "pillar": "Financial Claims",
        "title": "Money Doubling Scheme",
        "default_severity": "high",
        "description": "Promises to double or multiply principal within a fixed short period.",
        "why_it_matters": "Classic signature of illegal collective investment schemes or chit fund scams under Banning of Unregulated Deposit Schemes Act (BUDS).",
        "verification_action": "Check RBI's Sachet portal (sachet.rbi.org.in) to verify if the deposit scheme is registered."
    },

    # 2. Manipulation
    "urgency": {
        "pillar": "Psychological Manipulation",
        "title": "Artificial Urgency",
        "default_severity": "medium",
        "description": "Creates pressure with phrases like 'Act fast', 'Only 2 hours left', 'Join before closing'.",
        "why_it_matters": "Urgency is engineered to bypass critical thinking and prevent due diligence.",
        "verification_action": "Pause and take 24 hours before making any investment transfer."
    },
    "scarcity": {
        "pillar": "Psychological Manipulation",
        "title": "Artificial Scarcity / VIP Exclusivity",
        "default_severity": "medium",
        "description": "Claims limited slots (e.g., 'Only 15 slots remaining in our VIP group').",
        "why_it_matters": "Exclusivity tactics isolate the victim and build false prestige.",
        "verification_action": "Recognize that genuine financial institutions do not allocate legitimate public funds via Telegram slot limits."
    },
    "fear_fomo": {
        "pillar": "Psychological Manipulation",
        "title": "Fear of Missing Out (FOMO)",
        "default_severity": "medium",
        "description": "Exploits anxiety that you will be left behind or remain poor while others profit.",
        "why_it_matters": "Emotional triggers cloud objective financial assessment.",
        "verification_action": "Evaluate the investment on fundamental merit, not emotional pressure."
    },
    "pressure": {
        "pillar": "Psychological Manipulation",
        "title": "High Pressure Tactics",
        "default_severity": "medium",
        "description": "Repeated follow-ups, aggressive persuasion, or shaming into committing funds.",
        "why_it_matters": "Legitimate advisers provide space and documentation for informed consent.",
        "verification_action": "Disengage from any agent who refuses to give you time to consult independent advisers."
    },
    "emotional_language": {
        "pillar": "Psychological Manipulation",
        "title": "Manipulative Emotional Appeal",
        "default_severity": "low",
        "description": "Uses heavy emotional appeals regarding family duties, debt relief, or easy wealth.",
        "why_it_matters": "Replaces financial facts with sentimental persuasion.",
        "verification_action": "Focus strictly on regulatory filings, balance sheets, and transparent fee structures."
    },

    # 3. Authority
    "fake_regulatory_claim": {
        "pillar": "Authority & Legitimacy",
        "title": "Unverified Regulatory Approval Claim",
        "default_severity": "high",
        "description": "Claims approval from SEBI, RBI, IRDAI, or Government of India without verifiable registration number.",
        "why_it_matters": "Fraudulent entities frequently display forged certificates or misuse SEBI/RBI logos.",
        "verification_action": "Search the intermediary on SEBI's official portal (sebi.gov.in -> Recognised Intermediaries)."
    },
    "government_impersonation": {
        "pillar": "Authority & Legitimacy",
        "title": "Government Impersonation",
        "default_severity": "high",
        "description": "Claims endorsement by central government ministries or public sector schemes.",
        "why_it_matters": "Pretending to have state backing is a common method to gain blind trust.",
        "verification_action": "Verify on official '.gov.in' websites only."
    },
    "celebrity_endorsement": {
        "pillar": "Authority & Legitimacy",
        "title": "Suspected Unauthorized Celebrity Endorsement",
        "default_severity": "high",
        "description": "Uses photos or names of prominent business leaders (Ambani, Tata, Kamath) or celebrities promoting an investment.",
        "why_it_matters": "Deepfakes and fabricated articles misusing celebrity images are rampant across social media.",
        "verification_action": "Check the official verified social handles or PR releases of the named individual."
    },
    "expert_impersonation": {
        "pillar": "Authority & Legitimacy",
        "title": "Unregistered / Impersonated Advisor",
        "default_severity": "high",
        "description": "Poses as a certified Research Analyst (RA) or Investment Adviser (RIA).",
        "why_it_matters": "Providing personalized stock recommendations without SEBI registration is illegal in India.",
        "verification_action": "Check the SEBI Research Analyst registration number on sebi.gov.in."
    },
    "fake_institutional_affiliation": {
        "pillar": "Authority & Legitimacy",
        "title": "Fake Institutional Affiliation",
        "default_severity": "high",
        "description": "Claims association with reputed brands (e.g. HDFC, Tata Mutual Fund, BlackRock) using slight misspellings or WhatsApp groups.",
        "why_it_matters": "Scammers clone well-known corporate brands to trick investors into trust.",
        "verification_action": "Verify directly with the customer care number listed on the company's verified primary domain."
    },

    # 4. Evidence Problems
    "no_source": {
        "pillar": "Evidence & Transparency",
        "title": "Missing Source / Unsubstantiated Claim",
        "default_severity": "medium",
        "description": "Makes sweeping claims of profitability with no supporting evidence or official disclosures.",
        "why_it_matters": "Claims without proof cannot be audited or verified.",
        "verification_action": "Demand the audited Scheme Information Document (SID) or financial disclosures."
    },
    "unsupported_statistic": {
        "pillar": "Evidence & Transparency",
        "title": "Unsupported Statistics / Accuracy Rate",
        "default_severity": "medium",
        "description": "Quotes numbers like '99.4% win rate' or '10,000+ satisfied traders' without verifiable audit.",
        "why_it_matters": "Trading win rates of 95%+ in derivatives are statistically near-impossible over time.",
        "verification_action": "Check if performance is verified by SEBI-mandated Performance Validation Agencies (PVA)."
    },
    "missing_risk_context": {
        "pillar": "Evidence & Transparency",
        "title": "Historical Returns Presented as Proof of Safety",
        "default_severity": "medium",
        "description": "Highlights past high returns while omitting the fact that past performance does not guarantee future results.",
        "why_it_matters": "Investors may confuse a lucky bull-market period with safety and skill.",
        "verification_action": "Look for downside volatility, drawdowns, and read the statutory risk disclosure."
    },
    "cherry_picked_performance": {
        "pillar": "Evidence & Transparency",
        "title": "Cherry-Picked Results",
        "default_severity": "medium",
        "description": "Only displays winning trade screenshots while hiding losing positions or overall P&L.",
        "why_it_matters": "Photoshopped P&L screenshots on Instagram/Telegram are designed to lure beginners.",
        "verification_action": "Ask for verified Sensibull/broker verified P&L link covering at least 1-3 years."
    },
    "misleading_comparison": {
        "pillar": "Evidence & Transparency",
        "title": "Misleading Asset Comparison",
        "default_severity": "low",
        "description": "Compares high-risk equity/crypto directly with risk-free bank FDs without highlighting risk differential.",
        "why_it_matters": "Distorts risk-adjusted return expectations.",
        "verification_action": "Assess the risk rating (Riskometer) of each instrument."
    },

    # 5. Direct Fraud Indicators
    "payment_request": {
        "pillar": "Direct Fraud Indicators",
        "title": "Direct Payment / Joining Fee Request",
        "default_severity": "high",
        "description": "Demands fees, registration charges, or account activation funds directly into an account.",
        "why_it_matters": "Unregistered tipsters collect advance fees and vanish once funds are sent.",
        "verification_action": "Never pay advisory fees to an individual savings account or unregistered entity."
    },
    "personal_upi_account": {
        "pillar": "Direct Fraud Indicators",
        "title": "Personal UPI Account Request",
        "default_severity": "high",
        "description": "Instructs payment to a personal UPI ID, mobile number, or QR code rather than a SEBI-registered corporate bank account.",
        "why_it_matters": "Legitimate investment platforms never accept funds via personal UPI IDs or individual phone numbers.",
        "verification_action": "Check the name on the UPI handle. If it's a person's name or random ID, do not send money."
    },
    "otp_password_request": {
        "pillar": "Direct Fraud Indicators",
        "title": "Credential / OTP Request",
        "default_severity": "high",
        "description": "Asks for OTPs, net banking passwords, Demat credentials, or remote desktop screen-sharing.",
        "why_it_matters": "No legitimate financial advisor, broker, or official will EVER ask for your OTP or password.",
        "verification_action": "Immediately terminate contact and report to cybercrime.gov.in (1930)."
    },
    "suspicious_contact": {
        "pillar": "Direct Fraud Indicators",
        "title": "Unmonitored Private Channel Redirection",
        "default_severity": "medium",
        "description": "Redirects users to secret Telegram channels, anonymous WhatsApp groups, or direct messages.",
        "why_it_matters": "Scammers use Telegram/WhatsApp to evade regulatory surveillance and delete chats at will.",
        "verification_action": "Stick to official broker applications and regulated platforms."
    },
    "unverified_website": {
        "pillar": "Direct Fraud Indicators",
        "title": "Suspicious Link / Unofficial App Download",
        "default_severity": "high",
        "description": "Links to shortened URLs, unofficial domains, or asks to sideload an APK file.",
        "why_it_matters": "Cloned apps steal banking credentials and mimic trading profits with fake balances.",
        "verification_action": "Only download apps from official app stores (Google Play, Apple App Store) verified by SEBI brokers."
    }
}
