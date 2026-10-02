"""RAG Evidence Verification Engine for Nambikkai.

Provides indexed regulatory knowledge base (SEBI circulars, RBI fraud advisories,
NSE/BSE caution notices, Fin-Fact scam benchmarks) and hybrid retrieval for
grounded 5-tier financial claim verification.
"""
from .retriever import rag_retriever, HybridRAGRetriever
from .store import REGULATORY_KNOWLEDGE_BASE

__all__ = ["rag_retriever", "HybridRAGRetriever", "REGULATORY_KNOWLEDGE_BASE"]
