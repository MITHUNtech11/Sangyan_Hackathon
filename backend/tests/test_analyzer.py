"""Test suite for Nambikkai's core Analysis Engine and 10 benchmark test cases."""
import pytest
from app.analyzer import analyzer
from app.demo_data import TEST_CASES_DATA
from app.schemas import OverallStatus, AnalysisResult, SeverityLevel


@pytest.mark.asyncio
async def test_all_10_test_cases_schema_conformance():
    """Verify that every one of the 10 benchmark test cases parses into a valid AnalysisResult."""
    for tc in TEST_CASES_DATA:
        result = await analyzer.analyze_text(tc["content"], input_type="text")
        
        # Must be valid AnalysisResult instance
        assert isinstance(result, AnalysisResult), f"Failed for {tc['id']}"
        assert result.id is not None
        assert result.overall_status in [
            OverallStatus.POTENTIALLY_MISLEADING,
            OverallStatus.NEEDS_VERIFICATION,
            OverallStatus.NO_OBVIOUS_SIGNALS
        ]
        
        # Verify status matches expected outcome
        assert result.overall_status == tc["expected_status"], (
            f"Test case {tc['id']} '{tc['name']}' expected {tc['expected_status']} but got {result.overall_status}"
        )
        
        # Verify status label is populated
        assert len(result.status_label) > 0
        
        # Verify summary is present
        assert len(result.summary) > 10
        
        # Verify claims are non-empty
        assert len(result.claims) > 0
        for claim in result.claims:
            assert len(claim.claim) > 0
            assert len(claim.why_it_matters) > 0
            assert len(claim.action) > 0
            
        # Verify simple explanation exists in English and Tamil
        assert len(result.simple_explanation.en) > 15
        assert len(result.simple_explanation.ta) > 10
        assert len(result.simple_explanation.key_takeaway) > 5
        
        # Verify verification items are provided
        assert len(result.verification_items) >= 2
        
        # Verify before_you_act warning
        assert len(result.before_you_act) > 10
        
        # Verify micro lesson is assigned
        assert result.micro_lesson is not None
        assert len(result.micro_lesson.title) > 0
        assert len(result.micro_lesson.remember) > 0
        
        # Verify uncertainty boundaries
        assert len(result.uncertainty) > 0
        
        # Verify standard safety disclaimer
        assert "does not guarantee" in result.disclaimer.lower()


@pytest.mark.asyncio
async def test_obvious_fraud_outcome():
    """Test case 1: Obvious fraud must trigger 'potentially_misleading' with guaranteed return & payment signals."""
    content = "Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account. Limited slots available. Join VIP channel now!"
    result = await analyzer.analyze_text(content)
    
    assert result.overall_status == OverallStatus.POTENTIALLY_MISLEADING
    assert result.status_label == "Needs Caution"
    assert result.warning_signals_count >= 2
    
    signal_types = [s.type for s in result.signals]
    assert "guaranteed_return" in signal_types or "payment_request" in signal_types
    assert result.micro_lesson.topic in ["Guaranteed Returns", "Payment Security"]


@pytest.mark.asyncio
async def test_misleading_past_performance_outcome():
    """Test case 2: 25% return presented as proof of safety must trigger 'needs_verification'."""
    content = "This fund delivered 25% last year, proving it is one of the safest investments with zero market risk."
    result = await analyzer.analyze_text(content)
    
    assert result.overall_status == OverallStatus.NEEDS_VERIFICATION
    assert result.status_label == "Needs Verification"
    
    signal_types = [s.type for s in result.signals]
    assert "missing_risk_context" in signal_types or "risk_free_investment" in signal_types


@pytest.mark.asyncio
async def test_educational_disclaimer_outcome():
    """Test case 3: Legitimate mutual fund risk disclaimer must trigger 'no_obvious_signals'."""
    content = "A mutual fund's past performance does not guarantee future results. Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing."
    result = await analyzer.analyze_text(content)
    
    assert result.overall_status == OverallStatus.NO_OBVIOUS_SIGNALS
    assert result.status_label == "No Obvious Warning Signals Detected"
    assert result.warning_signals_count == 0


@pytest.mark.asyncio
async def test_tamil_investment_forward():
    """Test case 6: Tamil WhatsApp forward with guaranteed income must trigger warning and provide Tamil explanation."""
    content = "மாதம் ₹25,000 உத்தரவாத வருமானம்! ₹10,000 மட்டும் முதலீடு செய்து உடனடி வருமானம் பெறுங்கள். சீக்கிரம் சேருங்கள், சில இடங்கள் மட்டுமே!"
    result = await analyzer.analyze_text(content)
    
    assert result.overall_status == OverallStatus.POTENTIALLY_MISLEADING
    assert len(result.simple_explanation.ta) > 20
    # Must contain Tamil characters
    assert any('\u0b80' <= char <= '\u0bff' for char in result.simple_explanation.ta)


@pytest.mark.asyncio
async def test_arbitrary_unseen_text_heuristic():
    """Verify that arbitrary unseen text triggers the heuristic fallback gracefully."""
    unseen_content = "Special crypto mining bot assures 5% weekly payout without risk. Deposit 100 USDT now to start."
    result = await analyzer.analyze_text(unseen_content)
    
    assert isinstance(result, AnalysisResult)
    assert result.overall_status in [OverallStatus.POTENTIALLY_MISLEADING, OverallStatus.NEEDS_VERIFICATION]
    assert len(result.claims) > 0
    assert len(result.signals) > 0
    assert len(result.verification_items) > 0


@pytest.mark.asyncio
async def test_sangyan_track_e_sebi_and_intent_features():
    """Verify Track E additions: Intent breakdown, claim evidence quality, SEBI registration inspection, and analogies."""
    from app.schemas import EvidenceQuality, ClaimItem, WarningSignal, SeverityLevel
    from app.classifier import inspect_sebi_registration, classify_intent_and_evidence

    # 1. SEBI Inspector Unit Test
    sebi_claim_text = "Join our SEBI Approved Telegram Channel! Analyst Reg No: INH000012345. Daily jackpot options call."
    sebi_res = inspect_sebi_registration(sebi_claim_text)
    assert sebi_res.has_sebi_mention is True
    assert sebi_res.claimed_reg_number == "INH000012345"
    assert sebi_res.is_valid_format is True
    assert "Research Analyst" in sebi_res.reg_type
    assert sebi_res.sebi_warning_note is not None
    assert "Telegram" in sebi_res.sebi_warning_note or "prohibited" in sebi_res.sebi_warning_note

    # 2. Intent Classifier Unit Test
    test_claim = ClaimItem(
        claim="Guaranteed 10% monthly returns without risk",
        category="Returns",
        why_it_matters="Fraud risk",
        action="Avoid"
    )
    test_signal = WarningSignal(
        type="guaranteed_return",
        title="Guaranteed Return Claim",
        severity=SeverityLevel.HIGH,
        evidence="10% monthly",
        explanation="Guaranteed returns violate SEBI regulations."
    )
    intent_res, evaluated_claims = classify_intent_and_evidence(
        content=sebi_claim_text,
        overall_status=OverallStatus.POTENTIALLY_MISLEADING,
        signals=[test_signal],
        claims=[test_claim]
    )
    assert intent_res.promotion_score > intent_res.education_score
    assert "Promotional" in intent_res.intent_label
    assert evaluated_claims[0].evidence_quality in [EvidenceQuality.NO_EVIDENCE, EvidenceQuality.ANECDOTAL_CHERRYPICKED]

    # 3. End-to-End Analyzer Schema Test on Benchmark Case
    # Case 4 has SEBI advisor impersonation
    content = "Our SEBI registered advisory team (Reg No: INH000099999) offers exclusive guaranteed options tips on Telegram. Message +91-9876543210 to subscribe for ₹9,999/month."
    analysis = await analyzer.analyze_text(content)
    assert analysis.intent_breakdown is not None
    assert "Promotional" in analysis.intent_breakdown.intent_label
    assert analysis.sebi_check is not None
    assert analysis.sebi_check.has_sebi_mention is True
    assert analysis.sebi_check.claimed_reg_number == "INH000099999"
    assert analysis.micro_lesson.everyday_analogy is not None
    assert len(analysis.micro_lesson.everyday_analogy) > 10

