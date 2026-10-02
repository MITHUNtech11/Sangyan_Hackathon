"""Financial Literacy Micro-Lessons for Nambikkai.

Each lesson is designed as a focused, 30-60 second read tackling retail investor
vulnerabilities: guaranteed returns, past performance traps, regulatory verification,
urgency/FOMO manipulation, and digital payment security.
Includes intuitive everyday analogies tailored for Tier-2/3 Bharat investors.
"""
from typing import Dict, List
from .schemas import MicroLesson


LESSONS_DB: Dict[str, MicroLesson] = {
    "guaranteed_returns": MicroLesson(
        topic="Guaranteed Returns",
        title="Why 'Guaranteed Returns' in Market Investments Are a Myth",
        summary="Market-linked investments (stocks, mutual funds, derivatives, crypto) are inherently tied to price volatility and business risks. A promise of fixed or guaranteed high returns is a primary red flag.",
        remember="High return claims should always be considered together with risk and evidence. Regulators like SEBI prohibit registered entities from promising guaranteed returns.",
        learn_more=(
            "In legitimate finance, the Risk-Return Tradeoff is fundamental: risk-free returns only exist in sovereign-backed instruments "
            "(like RBI bonds or small savings schemes up to specified limits), which currently offer around 6-7.5% per annum. "
            "Whenever someone promises you 20%, 30%, or 50% guaranteed monthly returns, they are offering an economic impossibility. "
            "Such schemes inevitably collapse when new investor deposits dry up."
        ),
        everyday_analogy=(
            "Think of a farmer selling crops: no genuine farmer can guarantee an exact bumper harvest before the monsoon arrives. "
            "Anyone promising fixed massive profits regardless of market weather is running an illegal chit fund."
        )
    ),
    "past_performance": MicroLesson(
        topic="Past Performance Fallacy",
        title="Past Returns Do Not Guarantee Future Performance",
        summary="Just because a stock, fund, or trading strategy made 25% or 50% last year does NOT mean it will repeat that performance or that it is safe.",
        remember="A high return in a bull market is often luck or excessive risk-taking, not proof of safety.",
        learn_more=(
            "Under SEBI mutual fund advertising regulations, every communication must carry the statutory warning: "
            "'Past performance may or may not be sustained in the future and should not be used as a basis for comparison.' "
            "When analyzing an investment, look at the drawdown (how much it fell during market downturns), standard deviation, "
            "and portfolio composition rather than simply looking at peak historical percentage returns."
        ),
        everyday_analogy=(
            "Driving a motorcycle looking only into the rearview mirror: just because the highway behind you was straight and empty "
            "does not mean there won't be a sharp pothole or roadblock directly in front of you."
        )
    ),
    "regulatory_claims": MicroLesson(
        topic="Regulatory Verification",
        title="How to Verify Claims of 'SEBI Approved'",
        summary="Scammers frequently display forged SEBI certificates, fabricated registration numbers, or stamp official logos on private group messages.",
        remember="Anyone can copy-paste a SEBI logo onto a message. Legitimate approval can ONLY be confirmed on the official sebi.gov.in portal.",
        learn_more=(
            "To verify an intermediary: 1. Go to sebi.gov.in. 2. Navigate to 'Recognised Intermediaries'. 3. Search the exact registration number. "
            "Check that the registered email address and domain match the entity contacting you. "
            "Remember: SEBI never 'approves' specific stock tips, trading schemes, or guaranteed portfolio services."
        ),
        everyday_analogy=(
            "Anyone can wear a white coat and a stethoscope to look like a doctor, but you wouldn't let them perform surgery without "
            "checking their registered medical council license. Always verify regulatory registration on sebi.gov.in."
        )
    ),
    "urgency_manipulation": MicroLesson(
        topic="Urgency & Psychological Manipulation",
        title="The Psychology of Scarcity: Why Scammers Push You to Act Fast",
        summary="Phrases like 'Limited slots', 'Offer closing in 2 hours', and 'Act now before it's too late' are engineered psychological weapons.",
        remember="Genuine investments don't expire in 2 hours. If you feel rushed, that is your strongest signal to stop.",
        learn_more=(
            "Cognitive psychology demonstrates that artificial urgency activates the brain's fight-or-flight response, temporarily disabling "
            "deliberate logical reasoning. Scammers use this window to push victims into making irreversible transfers before they can consult friends, "
            "family, or financial advisors. The Golden Rule of investor safety: Always enforce a mandatory 24-hour cooling-off period."
        ),
        everyday_analogy=(
            "The street vendor shouting 'Only 3 pieces left at half price!': creating artificial rush so customers don't examine the torn fabric "
            "before handing over cash. In investing, hurry always costs money."
        )
    ),
    "unregistered_tipsters": MicroLesson(
        topic="Unregistered Tipsters & Telegram Groups",
        title="The Truth Behind 'VIP Trading Channels' and 'Jackpot Calls'",
        summary="Unsolicited invites to WhatsApp and Telegram trading channels are typically syndicates orchestrating pump-and-dump operations.",
        remember="In pump-and-dump schemes, the channel operators buy illiquid penny stocks first, hype them to retail followers, and dump at the peak.",
        learn_more=(
            "Providing investment advice without SEBI registration is a punishable legal offense in India. "
            "Screenshots showing massive Lakhs-of-rupees daily profits are easily faked using inspect element or paper-trading demo apps. "
            "Never rely on anonymous social media handles for financial livelihood decisions."
        ),
        everyday_analogy=(
            "A stranger at a bus stop whispering a 'sure-shot lottery winning secret' for ₹500: if they truly knew the secret to wealth, "
            "they wouldn't be selling tips to strangers on Telegram."
        )
    ),
    "upi_security": MicroLesson(
        topic="Payment Security",
        title="Never Send Investment Money to Personal UPI Handles",
        summary="Legitimate brokers and AMCs only accept client funds through regulated clearing corporations or registered escrow accounts—never via personal phone numbers or random QR codes.",
        remember="If the payment recipient is an individual's name or personal UPI ID, it is not a legitimate brokerage deposit.",
        learn_more=(
            "When investing through SEBI-registered brokers, payments are processed via BSE STAR MF, NSE NMF II, or direct bank payment gateways "
            "linked to your own registered PAN/bank account. Money sent to a personal UPI ID (e.g., name@okaxis, xyz@paytm) bypasses the banking clearing "
            "mechanism and cannot be reversed or retrieved by exchange investor protection funds."
        ),
        everyday_analogy=(
            "Paying for an official government passport by transferring UPI to an agent's personal tea-shop account: legitimate public and financial "
            "institutions only accept fees into verified corporate accounts with official receipt generation."
        )
    ),
    "general": MicroLesson(
        topic="Critical Financial Literacy",
        title="The Three Questions Every Retail Investor Must Ask",
        summary="Before putting your hard-earned money into any financial opportunity, ask: Who is offering this? Where is the risk? How can I verify it?",
        remember="Independent verification is your best defense. If an offer sounds too good to be true, it almost certainly is.",
        learn_more=(
            "1. Who: Are they registered with SEBI/RBI? Search their credentials on official .gov.in websites. "
            "2. Risk: What is the maximum amount I can lose? (All genuine assets have risk). "
            "3. Evidence: Where is the official offer document (Scheme Information Document / Red Herring Prospectus)? Never rely on forwarded chat messages."
        ),
        everyday_analogy=(
            "Testing gold at an independent assayer before paying: you would never buy jewellery based merely on the shopkeeper's glowing words. "
            "Always check the regulatory hallmark first."
        )
    )
}


def get_lesson_for_signal(signal_type: str) -> MicroLesson:
    """Select the most relevant educational micro-lesson for a given red-flag signal."""
    mapping = {
        "guaranteed_return": "guaranteed_returns",
        "fixed_high_return": "guaranteed_returns",
        "unrealistic_return": "guaranteed_returns",
        "risk_free_investment": "guaranteed_returns",
        "double_your_money": "guaranteed_returns",
        "missing_risk_context": "past_performance",
        "cherry_picked_performance": "past_performance",
        "fake_regulatory_claim": "regulatory_claims",
        "government_impersonation": "regulatory_claims",
        "expert_impersonation": "regulatory_claims",
        "urgency": "urgency_manipulation",
        "scarcity": "urgency_manipulation",
        "fear_fomo": "urgency_manipulation",
        "pressure": "urgency_manipulation",
        "suspicious_contact": "unregistered_tipsters",
        "future_prediction": "unregistered_tipsters",
        "payment_request": "upi_security",
        "personal_upi_account": "upi_security",
        "otp_password_request": "upi_security",
    }
    lesson_key = mapping.get(signal_type, "general")
    return LESSONS_DB.get(lesson_key, LESSONS_DB["general"])


def get_all_lessons() -> List[MicroLesson]:
    """Retrieve all available micro-lessons for display or study."""
    return list(LESSONS_DB.values())
