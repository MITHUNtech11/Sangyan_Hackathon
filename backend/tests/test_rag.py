"""Unit tests for the Hybrid RAG Evidence Verification Engine."""
import pytest
from app.rag.retriever import rag_retriever, HybridRAGRetriever
from app.schemas import VerificationVerdict, RAGEvidenceDoc, ClaimVerification


def test_rag_retrieval_fii_whatsapp():
    """Verify that queries about FII institutional accounts on WhatsApp retrieve SEBI PR No. 04/2024."""
    docs = rag_retriever.retrieve("FII institutional accounts on WhatsApp with pre-IPO allocation", top_k=3)
    assert len(docs) > 0
    top_doc = docs[0]
    assert top_doc.authority == "SEBI"
    assert "04/2024" in (top_doc.reference_no or "")
    assert top_doc.relevance_score >= 0.70
    assert "FPI" in top_doc.excerpt or "institutional" in top_doc.excerpt.lower()


def test_rag_retrieval_guaranteed_returns():
    """Verify that queries about guaranteed 40% returns retrieve SEBI PR No. 07/2024 or Algo Circular."""
    docs = rag_retriever.retrieve("guaranteed 40% monthly returns VIP telegram", top_k=3)
    assert len(docs) > 0
    top_refs = [d.reference_no for d in docs if d.reference_no]
    assert any("07/2024" in ref or "2023/158" in ref for ref in top_refs)


def test_verify_claim_obvious_fraud_verdict():
    """Verify that guaranteed returns claim is classified as FALSE with high confidence."""
    verif = rag_retriever.verify_claim("Guaranteed 40% monthly returns in F&O options")
    assert isinstance(verif, ClaimVerification)
    assert verif.verdict == VerificationVerdict.FALSE
    assert verif.confidence >= 0.90
    assert "SEBI" in verif.why_verdict
    assert len(verif.retrieved_evidence) > 0


def test_verify_claim_misleading_verdict():
    """Verify that selective past return claiming zero risk is classified as MISLEADING."""
    verif = rag_retriever.verify_claim("This fund delivered 25% last year, proving it is the safest investment with zero market risk")
    assert isinstance(verif, ClaimVerification)
    assert verif.verdict == VerificationVerdict.MISLEADING
    assert verif.confidence >= 0.85
    assert "MISLEADING" in verif.why_verdict


def test_verify_claim_true_statutory_disclosure():
    """Verify that standard mutual fund disclaimer is classified as TRUE."""
    verif = rag_retriever.verify_claim("Mutual fund investments are subject to market risks, read all scheme related documents carefully")
    assert isinstance(verif, ClaimVerification)
    assert verif.verdict == VerificationVerdict.TRUE
    assert verif.confidence >= 0.90


def test_verify_claim_deepfake_celebrity():
    """Verify that deepfake celebrity trading app claim is classified as FALSE."""
    verif = rag_retriever.verify_claim("Mukesh Ambani launched automated AI quantum trading app for citizens")
    assert isinstance(verif, ClaimVerification)
    assert verif.verdict == VerificationVerdict.FALSE
    assert "deepfake" in verif.why_verdict.lower() or "ai" in verif.why_verdict.lower()


def test_verify_claim_outdated_tax_scheme():
    """Verify that expired tax exemption scheme is classified as OUTDATED."""
    verif = rag_retriever.verify_claim("Invest under Rajiv Gandhi Equity Savings Scheme RGESS 80CCG for tax rebate")
    assert isinstance(verif, ClaimVerification)
    assert verif.verdict == VerificationVerdict.OUTDATED
    assert "OUTDATED" in verif.why_verdict


def test_verify_claim_unverified():
    """Verify that vague arbitrary claim with no regulatory precedent is marked UNVERIFIED."""
    verif = rag_retriever.verify_claim("Local bakery is expanding to three new branches in city center")
    assert isinstance(verif, ClaimVerification)
    assert verif.verdict == VerificationVerdict.UNVERIFIED


def test_verify_claim_percentages_not_blindly_false():
    """Verify that general percentages (40%, 100%) without guaranteed return promises are not marked FALSE."""
    verif_100 = rag_retriever.verify_claim("This portfolio holds 100% equity allocation in large caps.")
    assert verif_100.verdict == VerificationVerdict.UNVERIFIED

    verif_40 = rag_retriever.verify_claim("Nifty 50 rallied 40% over the last two years.")
    assert verif_40.verdict == VerificationVerdict.UNVERIFIED


def test_verify_claim_business_target_not_penny_pump():
    """Verify that legitimate business targets mentioning xyz company are not falsely flagged as penny pump scams."""
    verif = rag_retriever.verify_claim("Our business reached its revenue target, xyz consulting helped us.")
    assert verif.verdict == VerificationVerdict.UNVERIFIED


def test_verify_claim_neutral_bank_account_unverified():
    """Verify that opening a routine bank account does not trigger mule account scam flags."""
    verif = rag_retriever.verify_claim("I opened a bank account at SBI.")
    assert verif.verdict == VerificationVerdict.UNVERIFIED


def test_verify_claim_statutory_warning_statement_is_true():
    """Verify that authentic statements of SEBI/RBI prohibitions and cautions are verified as TRUE."""
    sebi_warn = rag_retriever.verify_claim("SEBI warned investors that guaranteed returns are strictly illegal.")
    assert sebi_warn.verdict == VerificationVerdict.TRUE

    rbi_caution = rag_retriever.verify_claim("RBI cautions the public against unauthorized forex trading platforms.")
    assert rbi_caution.verdict == VerificationVerdict.TRUE

