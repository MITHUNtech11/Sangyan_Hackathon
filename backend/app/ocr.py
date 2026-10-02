"""OCR extraction and image preprocessing module for Nambikkai.

Uses Tesseract OCR with intelligent image preprocessing (grayscale, contrast, thresholding).
Handles WhatsApp, Instagram, Telegram screenshots cleanly.
"""
import io
import logging
from typing import Optional
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract

logger = logging.getLogger(__name__)


def preprocess_image_for_ocr(image: Image.Image) -> Image.Image:
    """Preprocess image to maximize OCR text recognition accuracy.

    - Converts to RGB if needed, then to Grayscale.
    - Enhances contrast to separate text from colored backgrounds (e.g. WhatsApp green, Instagram dark mode).
    - Slightly sharpens to define character edges.
    """
    # Convert RGBA or Palette to RGB first
    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    # Convert to grayscale
    gray = image.convert("L")

    # Enhance contrast
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(1.8)

    # Slight sharpening for crisp letters
    sharpened = enhanced.filter(ImageFilter.SHARPEN)

    return sharpened


def extract_text_from_image_bytes(image_bytes: bytes, lang: str = "eng") -> str:
    """Extract text from raw image bytes.

    Attempts multi-language extraction (English + Tamil if available),
    falling back to English if Tamil language pack is missing.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
    except Exception as e:
        logger.error(f"Failed to open image bytes: {e}")
        raise ValueError(f"Invalid image format: {e}")

    preprocessed = preprocess_image_for_ocr(image)

    extracted_text = ""
    # Try specified language combo first
    try:
        extracted_text = pytesseract.image_to_string(preprocessed, lang=lang)
    except pytesseract.TesseractError as e:
        logger.warning(f"Tesseract failed with lang='{lang}': {e}. Retrying with 'eng'...")
        try:
            extracted_text = pytesseract.image_to_string(preprocessed, lang="eng")
        except Exception as fallback_e:
            logger.error(f"Fallback OCR also failed: {fallback_e}")
            raise RuntimeError(f"OCR processing failed: {fallback_e}")

    clean_text = clean_ocr_text(extracted_text)
    return clean_text


def clean_ocr_text(text: str) -> str:
    """Clean up OCR artifacts, excessive newlines, and trailing noise."""
    if not text:
        return ""

    lines = [line.strip() for line in text.splitlines()]
    # Remove empty lines while preserving paragraph separation
    cleaned_lines = []
    prev_empty = False
    for line in lines:
        if line:
            cleaned_lines.append(line)
            prev_empty = False
        elif not prev_empty:
            cleaned_lines.append("")
            prev_empty = True

    result = "\n".join(cleaned_lines).strip()
    return result
