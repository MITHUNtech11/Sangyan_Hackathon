"""URL & Sideloaded APK Inspector for Nambikkai.

Detects:
1. Sideloaded APK / DMG / executable downloads bypassing Google Play / App Store.
2. Typosquatting and domain impersonation of SEBI, RBI, NSE, BSE, NSDL, and major banks.
3. Obfuscated URL shorteners and redirectors (bit.ly, tinyurl, t.me, wa.me).
4. Suspicious TLDs commonly used in financial phishing schemes (.top, .vip, .xyz, etc.).
"""
import re
from typing import List, Optional
from urllib.parse import urlparse

from .schemas import UrlInspectionResult

# URL extraction regex supporting http, https, and bare domains
URL_REGEX = re.compile(
    r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
)

# Common URL shorteners and social redirectors
SHORTENER_DOMAINS = {
    "bit.ly",
    "tinyurl.com",
    "t.me",
    "cutt.ly",
    "is.gd",
    "rb.gy",
    "ow.ly",
    "goo.gl",
    "rebrand.ly",
    "wa.me",
    "chat.whatsapp.com",
}

# Suspicious TLDs heavily correlated with financial scam websites
SUSPICIOUS_TLDS = {
    "top", "vip", "xyz", "club", "work", "fit", "rest", "cam",
    "kim", "loan", "click", "buzz", "site", "online", "live"
}

# Official benchmark regulatory and institutional domains
OFFICIAL_DOMAINS = {
    "sebi.gov.in": "SEBI",
    "rbi.org.in": "RBI",
    "nseindia.com": "NSE",
    "bseindia.com": "BSE",
    "nsdl.co.in": "NSDL",
    "cdslindia.com": "CDSL",
    "cybercrime.gov.in": "National Cybercrime Reporting Portal",
    "scores.sebi.gov.in": "SEBI SCORES Portal"
}


def _matches_entity_token(token: str, domain: str) -> bool:
    """Check if entity (sebi, rbi, nse, bse, sbi, yono, blackrock) is targeted in domain.
    Matches discrete segments or hyphenated parts, e.g. 'sebi-free-bonus.in', 'nse-vip.top', 'rbi123.top'.
    Does NOT match false positive substrings in English words like 'turbines', 'response', 'webserver', 'transbias'.
    """
    pattern = rf"(^|[-._0-9]){re.escape(token)}([-._0-9]|$)"
    return bool(re.search(pattern, domain)) or domain.startswith(f"{token}-") or domain.startswith(f"{token}.") or f"-{token}" in domain or f".{token}" in domain


def extract_urls(text: str) -> List[str]:
    """Extract all URLs from a text string, including un-defanging obfuscated links."""
    # Un-defang common obfuscations: hxxp -> http, [.] -> ., [:]// -> ://
    normalized = re.sub(r"hxxp(s?)://", r"http\1://", text, flags=re.IGNORECASE)
    normalized = re.sub(r"\[\.\]", ".", normalized)
    normalized = re.sub(r"\[:\]//", "://", normalized)

    matches = URL_REGEX.findall(normalized)
    urls = []
    for m in matches:
        raw_url = m[0] if isinstance(m, tuple) else m
        # Normalize leading scheme for clean parsing
        if not raw_url.startswith(("http://", "https://")):
            clean_url = "https://" + raw_url
        else:
            clean_url = raw_url
        urls.append(clean_url)
    return urls


def inspect_url(raw_url: str) -> UrlInspectionResult:
    """Perform deep security and fraud inspection on a URL."""
    url = raw_url.strip()
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    parsed = urlparse(url)
    domain = parsed.netloc.lower().split(":")[0]  # remove port if present
    path = parsed.path.lower()
    query = parsed.query.lower()
    full_str = f"{domain}{path}?{query}"

    is_apk = False
    is_shortener = False
    is_impersonating = False
    impersonated_target: Optional[str] = None
    risk_level = "low"
    reasons: List[str] = []
    redirect_warning: Optional[str] = None

    # 1. APK & Sideloaded executable detection
    apk_indicators = [
        path.endswith((".apk", ".dmg", ".xapk", ".exe")),
        ".apk" in path,
        "download.php?app=" in full_str,
        "sideload" in full_str,
        any(h in domain for h in ["mediafire.com", "drive.google.com"]) and ".apk" in full_str
    ]
    if any(apk_indicators):
        is_apk = True
        risk_level = "high"
        reasons.append(
            "Direct APK / sideloaded app download detected outside Google Play Store / Apple App Store. "
            "SEBI warns that unauthorized APKs frequently contain banking spyware, OTP interceptors, or screen-mirroring malware."
        )
        redirect_warning = "NEVER install unknown APK files directly onto a device with banking or trading apps."

    # 2. Impersonation & Typosquatting of Indian Regulators and Banks
    # SEBI Impersonation
    if _matches_entity_token("sebi", domain):
        if domain == "sebi.gov.in" or domain.endswith(".sebi.gov.in"):
            if not is_apk:
                risk_level = "safe"
            reasons.append("Official SEBI regulatory domain (sebi.gov.in).")
        else:
            is_impersonating = True
            impersonated_target = "SEBI (Securities and Exchange Board of India)"
            risk_level = "high"
            reasons.append(f"Typosquatting detected: '{domain}' impersonates official regulator SEBI (genuine domain is sebi.gov.in).")
            redirect_warning = "Do not enter login credentials or bank details on this spoofed regulatory portal."

    # RBI Impersonation
    elif _matches_entity_token("rbi", domain):
        if domain == "rbi.org.in" or domain.endswith(".rbi.org.in"):
            if not is_apk:
                risk_level = "safe"
            reasons.append("Official RBI central bank domain (rbi.org.in).")
        else:
            is_impersonating = True
            impersonated_target = "Reserve Bank of India (RBI)"
            risk_level = "high"
            reasons.append(f"Typosquatting detected: '{domain}' impersonates central bank RBI (genuine domain is rbi.org.in).")
            redirect_warning = "The Reserve Bank of India never offers retail investment accounts or prizes."

    # NSE Impersonation
    elif _matches_entity_token("nse", domain) or _matches_entity_token("nseindia", domain):
        if domain == "nseindia.com" or domain.endswith(".nseindia.com"):
            if not is_apk:
                risk_level = "safe"
            reasons.append("Official National Stock Exchange domain (nseindia.com).")
        else:
            is_impersonating = True
            impersonated_target = "National Stock Exchange (NSE)"
            risk_level = "high"
            reasons.append(f"Typosquatting detected: '{domain}' mimics the National Stock Exchange of India (nseindia.com).")

    # BSE Impersonation
    elif _matches_entity_token("bse", domain) or _matches_entity_token("bseindia", domain):
        if domain == "bseindia.com" or domain.endswith(".bseindia.com"):
            if not is_apk:
                risk_level = "safe"
            reasons.append("Official Bombay Stock Exchange domain (bseindia.com).")
        else:
            is_impersonating = True
            impersonated_target = "Bombay Stock Exchange (BSE)"
            risk_level = "high"
            reasons.append(f"Typosquatting detected: '{domain}' mimics the Bombay Stock Exchange (bseindia.com).")

    # SBI / YONO Impersonation
    elif _matches_entity_token("sbi", domain) or _matches_entity_token("yono", domain):
        if domain.endswith("sbi.co.in") or domain.endswith("onlinesbi.sbi") or domain == "sbi.co.in":
            if not is_apk:
                risk_level = "safe"
            reasons.append("Official State Bank of India portal.")
        else:
            is_impersonating = True
            impersonated_target = "State Bank of India (SBI / YONO)"
            risk_level = "high"
            reasons.append(f"Phishing alert: '{domain}' impersonates official SBI banking infrastructure.")

    # Institutional Broker / Asset Manager Impersonation
    elif _matches_entity_token("blackrock", domain):
        if domain == "blackrock.com" or domain.endswith(".blackrock.com"):
            if not is_apk:
                risk_level = "safe"
            reasons.append("Official BlackRock portal (blackrock.com).")
        else:
            is_impersonating = True
            impersonated_target = "BlackRock Institutional"
            risk_level = "high"
            reasons.append(f"Impersonation alert: '{domain}' claims affiliation with BlackRock. BlackRock does not offer retail WhatsApp trading.")

    # 3. URL Shortener / Redirector Check
    if domain in SHORTENER_DOMAINS:
        is_shortener = True
        if risk_level != "high":
            risk_level = "medium"
            reasons.append(f"URL Shortener / Redirector ({domain}) hides the ultimate destination web address.")
            redirect_warning = "Exercise caution: scammers frequently use shorteners to mask deceptive or unverified domains."

    # 4. Suspicious TLD check
    tld = domain.split(".")[-1] if "." in domain else ""
    if tld in SUSPICIOUS_TLDS and risk_level == "low":
        risk_level = "medium"
        reasons.append(f"Registered on high-abuse TLD (.{tld}) commonly associated with disposable phishing campaigns.")

    # 5. Verified legitimate check
    if domain in OFFICIAL_DOMAINS:
        if not is_apk:
            risk_level = "safe"
        reasons.append(f"Verified official Indian regulatory/governmental portal ({OFFICIAL_DOMAINS[domain]}).")

    if not reasons:
        reasons.append("Standard domain format. Always confirm registration and verified payment channels before investing.")

    return UrlInspectionResult(
        url=url,
        domain=domain,
        is_apk=is_apk,
        is_shortener=is_shortener,
        is_impersonating=is_impersonating,
        impersonated_target=impersonated_target,
        risk_level=risk_level,
        reason=" | ".join(reasons),
        redirect_warning=redirect_warning
    )


def inspect_content_urls(text: str) -> Optional[UrlInspectionResult]:
    """Scan content for links and return the highest risk inspection result."""
    urls = extract_urls(text)
    if not urls:
        # Also check for explicit '.apk' mention even without protocol
        apk_match = re.search(r"([a-zA-Z0-9_\-]+\.apk)", text, re.IGNORECASE)
        if apk_match:
            apk_name = apk_match.group(1)
            return UrlInspectionResult(
                url=f"sideload://{apk_name}",
                domain=apk_name,
                is_apk=True,
                is_shortener=False,
                is_impersonating=False,
                risk_level="high",
                reason=f"Sideloaded Android APK package reference detected ('{apk_name}'). SEBI and Cybercrime police warn against installing APK packages distributed via chat apps.",
                redirect_warning="Never download or install APK packages shared over WhatsApp or Telegram."
            )
        return None

    results = [inspect_url(u) for u in urls]
    # Priority order: high > medium > low > safe
    severity_order = {"high": 3, "medium": 2, "low": 1, "safe": 0}
    results.sort(key=lambda r: severity_order.get(r.risk_level, 0), reverse=True)
    return results[0]
