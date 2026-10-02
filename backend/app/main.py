"""FastAPI application for Nambikkai.

Provides RESTful endpoints for:
- Image screenshot analysis (Tesseract OCR + Analysis Engine)
- Text analysis
- URL content analysis
- Retrieval and deletion of analyses
- Explanations and translations
- Financial literacy micro-lessons
- Preset hackathon demo samples
"""
import time
import logging
from typing import Dict, List, Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
import httpx

from .schemas import (
    AnalysisResult,
    TextAnalysisRequest,
    UrlAnalysisRequest,
    ExplainRequest,
    TranslateRequest,
    SimpleExplanation,
    MicroLesson,
    DemoSample,
)
from .ocr import extract_text_from_image_bytes
from .analyzer import analyzer
from .lessons import LESSONS_DB, get_all_lessons, get_lesson_for_signal
from .demo_data import DEMO_SAMPLES, TEST_CASES_DATA

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nambikkai.api")

app = FastAPI(
    title="Nambikkai API",
    description="Multilingual financial content literacy & misinformation detection API.",
    version="1.0.0"
)

# Enable CORS for local Vite dev and frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary in-memory cache for recent analyses (privacy-first, ephemeral)
_ANALYSIS_CACHE: Dict[str, AnalysisResult] = {}


@app.get("/api/health")
async def health_check():
    """Health status and engine mode check."""
    return {
        "status": "healthy",
        "service": "nambikkai-backend",
        "has_live_llm": analyzer.has_live_llm(),
        "timestamp": time.time()
    }


@app.get("/api/demo-samples", response_model=List[DemoSample])
async def get_demo_samples():
    """Return the 3 flagship demo presentation examples for 1-click UI loading."""
    return DEMO_SAMPLES


@app.get("/api/test-cases")
async def get_all_test_cases():
    """Return all 10 benchmark test cases for the interactive Demo Scenarios page."""
    cases = []
    for tc in TEST_CASES_DATA:
        cases.append({
            "id": tc["id"],
            "name": tc["name"],
            "content": tc["content"],
            "expected_status": tc["expected_status"],
            "status_label": tc["status_label"],
            "summary": tc["summary"],
            "category": tc["claims"][0].category if tc.get("claims") else "General",
            "signals_count": len(tc.get("signals", [])),
            "micro_lesson_topic": tc.get("micro_lesson_topic", "general")
        })
    return cases


@app.get("/api/regulatory-advisories")
async def get_regulatory_advisories():
    """Return master database of official SEBI & NSDL advisories, circulars, and caution press releases."""
    from .datasets.sebi_nsdl_advisories import OFFICIAL_ADVISORIES
    return OFFICIAL_ADVISORIES


@app.get("/api/modus-operandi")
async def get_modus_operandi():
    """Return curated scam modus operandi database across WhatsApp, Telegram, and YouTube."""
    from .datasets.sebi_nsdl_advisories import PLATFORM_MODUS_OPERANDI
    return PLATFORM_MODUS_OPERANDI




@app.post("/api/analyze/text", response_model=AnalysisResult)
async def analyze_text_endpoint(payload: TextAnalysisRequest):
    """Analyze pasted financial content text."""
    if not payload.text or len(payload.text.strip()) < 5:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Content is too short to analyze. Please provide a substantive financial claim."
        )

    try:
        result = await analyzer.analyze_text(
            content=payload.text,
            input_type="text",
            preferred_language=payload.language or "en"
        )
        _ANALYSIS_CACHE[result.id] = result
        return result
    except Exception as e:
        logger.error(f"Error analyzing text: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )


@app.post("/api/analyze/image", response_model=AnalysisResult)
async def analyze_image_endpoint(
    file: UploadFile = File(...),
    language: Optional[str] = Form("en")
):
    """Upload and analyze a financial screenshot (WhatsApp, Instagram, Telegram, Ads)."""
    # Validate MIME type
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file must be a valid image (PNG, JPEG, WebP)."
        )

    try:
        image_bytes = await file.read()
        if len(image_bytes) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty."
            )

        # Step 1: OCR Extraction
        extracted_text = extract_text_from_image_bytes(image_bytes, lang="eng")

        if not extracted_text or len(extracted_text.strip()) < 5:
            # If OCR extracted minimal text, provide a helpful fallback message
            extracted_text = "Screenshot containing unreadable or graphical financial advertisement."

        # Step 2: Content Analysis
        result = await analyzer.analyze_text(
            content=extracted_text,
            input_type="image",
            preferred_language=language or "en"
        )
        _ANALYSIS_CACHE[result.id] = result
        return result

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing image: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Image processing failed: {str(e)}"
        )


@app.post("/api/analyze/url", response_model=AnalysisResult)
async def analyze_url_endpoint(payload: UrlAnalysisRequest):
    """Fetch text from a URL and analyze financial claims."""
    url = payload.url.strip()
    if not url.startswith("http://") and not url.startswith("https://"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="URL must begin with http:// or https://"
        )

    try:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
            resp = await client.get(url, headers={"User-Agent": "Nambikkai-Content-Literacy-Bot/1.0"})
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f"Could not fetch URL: received HTTP status {resp.status_code}"
                )
            page_text = resp.text[:4000]  # Take initial text chunk

        result = await analyzer.analyze_text(
            content=page_text,
            input_type="url",
            preferred_language=payload.language or "en"
        )
        _ANALYSIS_CACHE[result.id] = result
        return result
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing URL: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch and analyze URL: {str(e)}"
        )


@app.get("/api/analysis/{analysis_id}", response_model=AnalysisResult)
async def get_analysis_by_id(analysis_id: str):
    """Retrieve an existing analysis by ID."""
    if analysis_id in _ANALYSIS_CACHE:
        return _ANALYSIS_CACHE[analysis_id]

    # Check if this matches a test case ID
    for tc in TEST_CASES_DATA:
        if f"analysis-{tc['id']}" == analysis_id:
            from .demo_data import build_analysis_result_from_test_case
            return build_analysis_result_from_test_case(tc)

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Analysis not found or already deleted for privacy."
    )


@app.delete("/api/analysis/{analysis_id}")
async def delete_analysis_by_id(analysis_id: str):
    """Delete an analysis result immediately (privacy guarantee)."""
    if analysis_id in _ANALYSIS_CACHE:
        del _ANALYSIS_CACHE[analysis_id]
        return {"status": "deleted", "message": "Analysis data cleared from memory."}
    return {"status": "not_found", "message": "Analysis does not exist or was already cleared."}


@app.post("/api/explain", response_model=SimpleExplanation)
async def explain_simply(payload: ExplainRequest):
    """Explain a complex financial claim in simple English or Tamil."""
    res = await analyzer.analyze_text(payload.text)
    return res.simple_explanation


@app.post("/api/translate")
async def translate_text(payload: TranslateRequest):
    """Translate text between English and top Indian regional languages."""
    res = await analyzer.analyze_text(payload.text)
    target = payload.target_language.lower()
    translated = res.simple_explanation.translations.get(target)
    if not translated:
        if target == "ta":
            translated = res.simple_explanation.ta
        else:
            translated = res.simple_explanation.en
    return {"original": payload.text, "target_language": target, "translated": translated}


@app.get("/api/lessons", response_model=List[MicroLesson])
async def list_all_lessons():
    """List all available financial literacy micro-lessons."""
    return get_all_lessons()


@app.get("/api/lessons/{topic}", response_model=MicroLesson)
async def get_lesson_by_topic(topic: str):
    """Retrieve a micro-lesson by topic identifier."""
    lesson = LESSONS_DB.get(topic.lower())
    if not lesson:
        # Fallback to general
        lesson = LESSONS_DB["general"]
    return lesson
