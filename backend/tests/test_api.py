"""Integration tests for FastAPI endpoints."""
import pytest
from httpx import AsyncClient
import io
from PIL import Image, ImageDraw


@pytest.mark.asyncio
async def test_health_endpoint(async_client: AsyncClient):
    """Test /api/health returns 200 OK and expected structure."""
    resp = await async_client.get("/api/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "healthy"
    assert "has_live_llm" in data


@pytest.mark.asyncio
async def test_demo_samples_endpoint(async_client: AsyncClient):
    """Test /api/demo-samples returns the 3 flagship demo samples."""
    resp = await async_client.get("/api/demo-samples")
    assert resp.status_code == 200
    samples = resp.json()
    assert len(samples) == 3
    assert samples[0]["expected_status"] == "potentially_misleading"
    assert samples[1]["expected_status"] == "needs_verification"
    assert samples[2]["expected_status"] == "no_obvious_signals"


@pytest.mark.asyncio
async def test_test_cases_endpoint(async_client: AsyncClient):
    """Test /api/test-cases returns all 10 curated benchmark test cases."""
    resp = await async_client.get("/api/test-cases")
    assert resp.status_code == 200
    cases = resp.json()
    assert len(cases) == 10
    assert any(c["id"] == "tc-1" for c in cases)
    assert any(c["id"] == "tc-4" for c in cases)


@pytest.mark.asyncio
async def test_regulatory_advisories_and_modus_operandi_endpoints(async_client: AsyncClient):
    """Test /api/regulatory-advisories and /api/modus-operandi return official SEBI/NSDL datasets."""
    # 1. Advisories
    resp_adv = await async_client.get("/api/regulatory-advisories")
    assert resp_adv.status_code == 200
    advisories = resp_adv.json()
    assert len(advisories) >= 5
    assert any(a["authority"] == "SEBI" for a in advisories)
    assert any(a["authority"] == "NSDL" for a in advisories)
    assert any(a["platform"] in ["whatsapp", "telegram", "youtube"] for a in advisories)

    # 2. Modus Operandi
    resp_mo = await async_client.get("/api/modus-operandi")
    assert resp_mo.status_code == 200
    mo_items = resp_mo.json()
    assert len(mo_items) >= 4
    assert any(m["platform"] == "whatsapp" for m in mo_items)
    assert any(m["platform"] == "telegram" for m in mo_items)
    assert any(m["platform"] == "youtube" for m in mo_items)




@pytest.mark.asyncio
async def test_analyze_text_endpoint(async_client: AsyncClient):
    """Test /api/analyze/text with suspicious text."""
    payload = {
        "text": "Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account. Limited slots available. Join VIP channel now!",
        "language": "en"
    }
    resp = await async_client.post("/api/analyze/text", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["overall_status"] == "potentially_misleading"
    assert data["status_label"] == "Needs Caution"
    assert len(data["claims"]) > 0
    assert len(data["signals"]) > 0
    assert "simple_explanation" in data
    assert "ta" in data["simple_explanation"]
    assert len(data["verification_items"]) > 0


@pytest.mark.asyncio
async def test_analyze_text_short_validation(async_client: AsyncClient):
    """Test /api/analyze/text rejects empty or too-short inputs."""
    payload = {"text": "hi"}
    resp = await async_client.post("/api/analyze/text", json=payload)
    assert resp.status_code == 422 or resp.status_code == 400


@pytest.mark.asyncio
async def test_analyze_image_endpoint(async_client: AsyncClient):
    """Test /api/analyze/image with a generated synthetic image containing financial text."""
    # Create a small white image
    img = Image.new("RGB", (400, 150), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    draw.text((10, 30), "Guaranteed 40% returns every month.", fill=(0, 0, 0))
    draw.text((10, 60), "Pay 5000 today to register now!", fill=(0, 0, 0))

    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    files = {"file": ("screenshot.png", img_byte_arr.getvalue(), "image/png")}
    resp = await async_client.post("/api/analyze/image", files=files, data={"language": "en"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["input_type"] == "image"
    assert data["overall_status"] in ["potentially_misleading", "needs_verification"]


@pytest.mark.asyncio
async def test_analysis_retrieval_and_deletion(async_client: AsyncClient):
    """Test creating, retrieving by ID, and deleting an analysis."""
    payload = {"text": "This fund delivered 25% last year, proving it is one of the safest investments with zero market risk."}
    create_resp = await async_client.post("/api/analyze/text", json=payload)
    assert create_resp.status_code == 200
    analysis_id = create_resp.json()["id"]

    # Retrieve
    get_resp = await async_client.get(f"/api/analysis/{analysis_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == analysis_id

    # Delete
    del_resp = await async_client.delete(f"/api/analysis/{analysis_id}")
    assert del_resp.status_code == 200
    assert del_resp.json()["status"] == "deleted"


@pytest.mark.asyncio
async def test_explain_and_translate_endpoints(async_client: AsyncClient):
    """Test /api/explain and /api/translate endpoints."""
    explain_payload = {"text": "Guaranteed 40% monthly returns with zero risk.", "language": "en"}
    exp_resp = await async_client.post("/api/explain", json=explain_payload)
    assert exp_resp.status_code == 200
    exp_data = exp_resp.json()
    assert len(exp_data["en"]) > 0
    assert len(exp_data["ta"]) > 0

    trans_payload = {"text": "Guaranteed 40% monthly returns with zero risk.", "target_language": "ta"}
    trans_resp = await async_client.post("/api/translate", json=trans_payload)
    assert trans_resp.status_code == 200
    assert "translated" in trans_resp.json()


@pytest.mark.asyncio
async def test_lessons_endpoints(async_client: AsyncClient):
    """Test /api/lessons and /api/lessons/{topic}."""
    resp = await async_client.get("/api/lessons")
    assert resp.status_code == 200
    lessons = resp.json()
    assert len(lessons) >= 5

    topic_resp = await async_client.get("/api/lessons/guaranteed_returns")
    assert topic_resp.status_code == 200
    assert topic_resp.json()["topic"] == "Guaranteed Returns"


@pytest.mark.asyncio
async def test_multilingual_support(async_client: AsyncClient):
    """Test analysis returns translations for top 10 Indian languages."""
    payload = {
        "text": "Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account.",
        "language": "hi"
    }
    resp = await async_client.post("/api/analyze/text", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    simple_expl = data["simple_explanation"]
    assert "translations" in simple_expl
    translations = simple_expl["translations"]

    # Verify presence of top Indian languages
    for lang_code in ["hi", "bn", "mr", "te", "ta", "gu", "ur", "kn", "or", "ml", "en"]:
        assert lang_code in translations, f"Missing language code {lang_code}"
        assert len(translations[lang_code]) > 10, f"Translation for {lang_code} is too short"

    # Test translate endpoint for Hindi and Bengali
    hi_trans = await async_client.post("/api/translate", json={"text": payload["text"], "target_language": "hi"})
    assert hi_trans.status_code == 200
    assert len(hi_trans.json()["translated"]) > 10

    bn_trans = await async_client.post("/api/translate", json={"text": payload["text"], "target_language": "bn"})
    assert bn_trans.status_code == 200
    assert len(bn_trans.json()["translated"]) > 10


@pytest.mark.asyncio
async def test_verify_claim_api_endpoint(async_client: AsyncClient):
    """Test POST /api/verify/claim endpoint."""
    payload = {"claim": "Guaranteed 40% monthly returns"}
    resp = await async_client.post("/api/verify/claim", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["verdict"] == "FALSE"
    assert data["confidence"] >= 0.85
    assert len(data["retrieved_evidence"]) > 0


@pytest.mark.asyncio
async def test_inspect_url_api_endpoint(async_client: AsyncClient):
    """Test POST /api/inspect/url endpoint."""
    payload = {"url": "https://sebi-free-bonus.in/trading.apk"}
    resp = await async_client.post("/api/inspect/url", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["is_apk"] is True
    assert data["is_impersonating"] is True
    assert data["risk_level"] == "high"
