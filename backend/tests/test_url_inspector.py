"""Unit tests for URL and sideloaded APK inspector."""
from app.url_inspector import extract_urls, inspect_url, inspect_content_urls
from app.schemas import UrlInspectionResult


def test_apk_download_detection():
    """Verify that direct .apk links are detected as high risk sideloading."""
    res = inspect_url("https://malicious-invest.vip/download/trading_pro.apk")
    assert isinstance(res, UrlInspectionResult)
    assert res.is_apk is True
    assert res.risk_level == "high"
    assert "APK" in res.reason


def test_sebi_typosquatting_detection():
    """Verify lookalike SEBI domains are flagged as high risk impersonation."""
    res = inspect_url("https://sebi-free-bonus.in/claim-now")
    assert res.is_impersonating is True
    assert "SEBI" in (res.impersonated_target or "")
    assert res.risk_level == "high"
    assert "sebi.gov.in" in res.reason


def test_rbi_typosquatting_detection():
    """Verify lookalike RBI domains are flagged as high risk impersonation."""
    res = inspect_url("https://rbi-lottery-clearance.site/verify")
    assert res.is_impersonating is True
    assert "RBI" in (res.impersonated_target or "")
    assert res.risk_level == "high"


def test_official_sebi_domain_is_safe():
    """Verify genuine sebi.gov.in is marked safe."""
    res = inspect_url("https://www.sebi.gov.in/enforcement/press-releases/feb-2024/sebi-cautions-investors_81804.html")
    assert res.risk_level == "safe"
    assert res.is_impersonating is False


def test_shortener_detection():
    """Verify URL shorteners like bit.ly and tinyurl are flagged."""
    res = inspect_url("https://bit.ly/guaranteed-stock-profits")
    assert res.is_shortener is True
    assert res.risk_level in ["medium", "high"]


def test_inspect_content_urls_extraction():
    """Verify scanning text with embedded APK link extracts the threat."""
    text = "Join our WhatsApp VIP group and install our app: https://vip-trader.top/app.apk to receive 40% returns!"
    res = inspect_content_urls(text)
    assert res is not None
    assert res.is_apk is True
    assert res.risk_level == "high"


def test_inspect_content_urls_no_urls():
    """Verify text with no URLs returns None."""
    text = "A simple text message without any links or websites."
    res = inspect_content_urls(text)
    assert res is None


def test_regular_domains_with_substrings_not_flagged():
    """Verify common English words containing 'nse', 'rbi', 'bse', 'sbi' are not flagged as typosquatting."""
    for url in ["https://www.response.com", "https://www.turbines.com", "https://www.webserver.com", "https://transbias.com"]:
        res = inspect_url(url)
        assert res.is_impersonating is False, f"False positive impersonation on {url}"
        assert res.risk_level == "low", f"Unexpected risk level on {url}"


def test_apk_download_on_any_domain_is_high_risk():
    """Verify APK downloads retain high risk even if pointing to an otherwise known domain."""
    res = inspect_url("https://sebi.gov.in/downloads/app.apk")
    assert res.is_apk is True
    assert res.risk_level == "high"


def test_defanged_url_detection():
    """Verify defanged URLs (hxxps, [.], [:]//) are correctly extracted and analyzed."""
    text = "Download here: hxxps[:]//sebi-bonus[.]top/portal"
    res = inspect_content_urls(text)
    assert res is not None
    assert res.is_impersonating is True
    assert res.risk_level == "high"

