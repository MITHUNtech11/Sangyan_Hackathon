# Nambikkai (நம்பிக்கை) — Track E MVP

> **Understand before you trust.**  
> *Nambikkai helps Indian retail investors understand and verify financial content they encounter online—before they trust, share, or act on it.*

**Primary Hackathon Track:** Track E — Misinformation & Content Literacy  
**Secondary Impact:** Track A — Digital Fraud & Scam Resilience | Track C — Investor Education for Bharat

---

## The Core Loop

$$\text{Capture} \longrightarrow \text{Understand} \longrightarrow \text{Check} \longrightarrow \text{Explain} \longrightarrow \text{Verify} \longrightarrow \text{Learn}$$

1. **Capture**: Upload screenshots of WhatsApp messages, Instagram reels/posts, Telegram calls, YouTube claims, or investment ads (with Tesseract OCR).
2. **Understand**: Isolate and extract atomic financial claims (distinguishing factual, promotional, predictive, and opinion claims).
3. **Check**: Scan against a structured 5-pillar red flag and misinformation taxonomy.
4. **Explain**: Present simple, 5th-grade English explanations and natural Tamil translations (`தமிழில் விளக்கம்`).
5. **Verify**: Provide concrete, actionable checklists for official verification (e.g. SEBI registration search, RBI Sachet portal, official corporate domains).
6. **Learn**: Deliver 30-60 second bite-sized financial literacy micro-lessons directly addressing the detected red flag.

---

## Key Design Principles

- **Defensible Classifications**: Nambikkai never asserts *"This is 100% a scam"*. Instead, it classifies content into three clear, defensible outcomes:
  - 🚨 **Needs Caution** (`potentially_misleading`): High-severity warning signals detected (guaranteed returns, payment requests, fake regulatory claims).
  - ⚠️ **Needs Verification** (`needs_verification`): Important claims exist, but independent regulatory verification is required before trusting.
  - ✅ **No Obvious Warning Signals Detected** (`no_obvious_signals`): Educational, balanced, or compliant content with proper risk disclosures.
- **Evidence-First**: Every warning flag requires direct, quoted text evidence from the input.
- **Privacy-First**: Zero passwords, OTPs, Demat credentials, or bank details are ever requested or stored. Uploaded screenshots are processed in-memory and an instant *"Delete Analysis"* feature is provided.
- **Zero Investment Advice**: Nambikkai does not recommend stocks, buy/sell calls, or portfolios.

---

## 5-Pillar Red Flag Taxonomy

1. **Financial Claims**: Guaranteed returns, fixed high return, zero-risk claim, unrealistic returns, future price target, doubling schemes.
2. **Psychological Manipulation**: Urgency, scarcity (VIP slots), FOMO, pressure, emotional appeal.
3. **Authority & Legitimacy**: Fake regulatory approval (SEBI/RBI), government impersonation, celebrity deepfake/endorsement, unregistered advisor.
4. **Evidence Problems**: Missing sources, unsupported statistics (99.8% win rate), historical performance as safety proof, cherry-picked results.
5. **Direct Fraud Indicators**: Upfront fees, personal UPI IDs, credential/OTP requests, unmonitored Telegram redirects.

---

## Quickstart

### Prerequisites
- Python 3.11+
- Node.js v18+ and npm
- Tesseract OCR (installed and available on PATH)

### 1. Backend Setup

```powershell
cd backend

# Activate virtual environment
.venv\Scripts\activate

# Run automated tests (14 tests covering 10 benchmark test cases)
pytest -v

# Start FastAPI server
uvicorn app.main:app --port 8000 --reload
```

*Backend runs at `http://127.0.0.1:8000` with interactive docs at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup

```powershell
cd frontend

# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev
```

*Frontend runs at `http://localhost:5173` with automated API proxy to the backend.*

---

## 3 Flagship Presentation Demo Scenarios

In the UI, click any of the 3 top demo buttons for instant 1-click loading:

1. **Demo 1 — Obvious Fraud**:
   > *"Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account. Limited slots available. Join VIP channel now!"*  
   **Result:** 🚨 **Needs Caution** with Guaranteed Returns, Upfront Payment, Artificial Urgency, and Scarcity flags.

2. **Demo 2 — Misleading Past Performance**:
   > *"This fund delivered 25% last year, proving it is one of the safest investments with zero market risk."*  
   **Result:** ⚠️ **Needs Verification** with Missing Risk Context and Zero Risk claim flags.

3. **Demo 3 — Educational Disclaimer**:
   > *"A mutual fund's past performance does not guarantee future results. Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing."*  
   **Result:** ✅ **No Obvious Warning Signals Detected**.

---

## Project Structure

```text
Sangyan_Hackathon/
├── backend/
│   ├── app/
│   │   ├── analyzer.py       # 3-stage intelligence engine (Gemini API + offline fallback)
│   │   ├── demo_data.py      # 10 benchmark test cases and demo presentation data
│   │   ├── lessons.py        # Financial literacy micro-lessons database
│   │   ├── main.py           # FastAPI REST API endpoints
│   │   ├── ocr.py            # Tesseract OCR & image preprocessing pipeline
│   │   ├── prompts.py        # 3-stage prompts (Extraction, Signals, Explanation)
│   │   ├── schemas.py        # Pydantic v2 data models
│   │   └── taxonomy.py       # 5-pillar red flag and manipulation taxonomy
│   ├── tests/
│   │   ├── conftest.py       # Test fixtures
│   │   ├── test_analyzer.py  # Benchmark test suite for the 10 test cases
│   │   └── test_api.py       # Integration tests for FastAPI endpoints
│   ├── requirements.txt      # Python dependencies
│   └── pytest.ini            # Pytest configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyzingOverlay.tsx # Animated 4-step progress screen
│   │   │   ├── DemoBar.tsx          # 1-click presentation demo bar
│   │   │   ├── Header.tsx           # Brand, Tamil/EN switcher, privacy badge
│   │   │   ├── InputSection.tsx     # Screenshot upload, text, and URL tabs
│   │   │   └── ResultView.tsx       # Result screen with claims, signals, Tamil explain, checklist, micro-lesson
│   │   ├── api.ts            # Frontend API client
│   │   ├── types.ts          # TypeScript data contracts
│   │   ├── App.tsx           # Main application coordinator
│   │   └── index.css         # Tailwind directives
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── README.md
```
