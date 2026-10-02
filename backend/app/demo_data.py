"""Curated test dataset and demo examples for Nambikkai.

Contains:
1. The 3 flagship hackathon presentation examples (Obvious Fraud, Misleading, Educational).
2. The 10 comprehensive benchmark test cases covering the 5-pillar taxonomy.
3. Deterministic ground-truth AnalysisResults for offline mode and automated testing.
"""
from typing import Dict, List
from .schemas import (
    AnalysisResult,
    OverallStatus,
    SeverityLevel,
    ClaimType,
    ClaimStatus,
    ClaimItem,
    WarningSignal,
    SimpleExplanation,
    MicroLesson,
    DemoSample,
)
from .lessons import LESSONS_DB
from .multilingual import build_multilingual_explanation
from .classifier import inspect_sebi_registration, classify_intent_and_evidence


DEMO_SAMPLES: List[DemoSample] = [
    DemoSample(
        id="demo-1",
        title="Obvious Fraud: Guaranteed Returns & UPI Payment",
        category="High Risk / Fraud Indicator",
        preview="Guaranteed 40% monthly returns. Pay ₹5,000 today. Limited slots.",
        content="Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account. Limited slots available. Join VIP channel now!",
        expected_status=OverallStatus.POTENTIALLY_MISLEADING,
    ),
    DemoSample(
        id="demo-2",
        title="Misleading: Past Performance as Proof of Safety",
        category="Misleading Context",
        preview="This fund delivered 25% last year, proving it is one of the safest investments.",
        content="This fund delivered 25% last year, proving it is one of the safest investments with zero market risk.",
        expected_status=OverallStatus.NEEDS_VERIFICATION,
    ),
    DemoSample(
        id="demo-3",
        title="Educational: Statutory Risk Disclosure",
        category="Educational / Compliant",
        preview="A mutual fund's past performance does not guarantee future results.",
        content="A mutual fund's past performance does not guarantee future results. Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing.",
        expected_status=OverallStatus.NO_OBVIOUS_SIGNALS,
    ),
]


TEST_CASES_DATA: List[Dict] = [
    # 1. Obvious Fraud
    {
        "id": "tc-1",
        "name": "Obvious Fraud - Guaranteed 40% Return",
        "content": "Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account. Limited slots available. Join VIP channel now!",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "This message promises a guaranteed 40% monthly return and demands an upfront payment of ₹5,000 to reserve a limited spot.",
        "claims": [
            ClaimItem(
                claim="Guaranteed 40% monthly returns",
                category="guaranteed_return",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="No legitimate financial institution or market strategy can guarantee 40% monthly returns. In equity markets, returns fluctuate continuously.",
                action="Verify if the entity is SEBI-registered. SEBI rules prohibit registered entities from assuring or guaranteeing returns."
            ),
            ClaimItem(
                claim="Pay ₹5,000 today to activate your account",
                category="payment_request",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Demanding upfront registration fees directly to activate speculative accounts is standard practice among unregulated tipsters.",
                action="Never transfer money directly to personal bank or UPI accounts before verifying broker registration."
            ),
        ],
        "signals": [
            WarningSignal(
                type="guaranteed_return",
                title="Guaranteed Returns",
                severity=SeverityLevel.HIGH,
                evidence="Guaranteed 40% monthly returns",
                explanation="The content promises a fixed, specific, and mathematically impossible return rate in market-linked finance."
            ),
            WarningSignal(
                type="payment_request",
                title="Direct Upfront Payment",
                severity=SeverityLevel.HIGH,
                evidence="Pay ₹5,000 today",
                explanation="Demands an advance fee to participate in an unverified financial scheme."
            ),
            WarningSignal(
                type="urgency",
                title="Artificial Urgency",
                severity=SeverityLevel.MEDIUM,
                evidence="today",
                explanation="Pressures you to act immediately without taking time for proper due diligence."
            ),
            WarningSignal(
                type="scarcity",
                title="Artificial Scarcity",
                severity=SeverityLevel.MEDIUM,
                evidence="Limited slots available",
                explanation="Manufactures an illusion of high demand to trigger fear of missing out (FOMO)."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="The message claims you can make a huge, guaranteed profit (40% every single month) if you quickly pay ₹5,000. In reality, no investment can safely guarantee this kind of money. Genuine investments have ups and downs, and legitimate brokers never pressure you to pay money into private channels.",
            ta="இந்த செய்தி, ₹5,000 கட்டினால் மாதம் 40% உறுதியான லாபம் கிடைக்கும் என்று கூறுகிறது. உண்மை என்னவென்றால், எந்தவொரு சட்டபூர்வமான முதலீட்டிலும் இவ்வளவு அதிக லாபத்தை 'உத்தரவாதமாக' கொடுக்க முடியாது. அவசரப்பட்டு முன்பணம் செலுத்தாதீர்கள்.",
            key_takeaway="A promise of guaranteed high returns with urgency is the single biggest warning sign in personal finance."
        ),
        "verification_items": [
            "Is the entity registered as a SEBI Research Analyst or Investment Adviser?",
            "Can you find an official, audited prospectus supporting these return figures?",
            "Is the payment going to a SEBI-registered broker account or an individual's personal UPI/bank handle?",
            "Has the scheme been registered on RBI's Sachet portal?"
        ],
        "before_you_act": "Do NOT transfer the ₹5,000 or share any banking credentials until you have independently checked SEBI's intermediary register.",
        "micro_lesson_topic": "guaranteed_returns",
        "uncertainty": [
            "The system cannot verify the identity of the person behind this message.",
            "The system cannot determine if any actual trading takes place without access to external bank records."
        ]
    },

    # 2. Misleading Content
    {
        "id": "tc-2",
        "name": "Misleading - Past Performance as Proof of Safety",
        "content": "This fund delivered 25% last year, proving it is one of the safest investments with zero market risk.",
        "expected_status": OverallStatus.NEEDS_VERIFICATION,
        "status_label": "Needs Verification",
        "summary": "The message cites a 25% historical return from the previous year and concludes that the fund is therefore 100% safe and risk-free.",
        "claims": [
            ClaimItem(
                claim="This fund delivered 25% last year",
                category="historical_performance",
                claim_type=ClaimType.FACTUAL,
                severity=SeverityLevel.LOW,
                status=ClaimStatus.NEEDS_VERIFICATION,
                why_it_matters="A fund may have indeed delivered 25% in a bull year, but historical return must be verified against official NAV data.",
                action="Look up the scheme's Scheme Information Document (SID) and official NAV history on AMFI India (amfiindia.com)."
            ),
            ClaimItem(
                claim="proving it is one of the safest investments with zero market risk",
                category="risk_free_investment",
                claim_type=ClaimType.OPINION,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="High returns typically imply high risk. Equating past gains with 'safety' and 'zero risk' is deceptive and misleading.",
                action="Check the official Riskometer rating of the fund on its factsheet."
            )
        ],
        "signals": [
            WarningSignal(
                type="missing_risk_context",
                title="Historical Performance as Proof of Safety",
                severity=SeverityLevel.MEDIUM,
                evidence="proving it is one of the safest investments",
                explanation="Presents past market gains as definitive evidence of safety, omitting potential downside drawdowns."
            ),
            WarningSignal(
                type="risk_free_investment",
                title="Zero Risk Claim",
                severity=SeverityLevel.HIGH,
                evidence="zero market risk",
                explanation="Any fund delivering 25% equity-style returns inherently carries market volatility and drawdown risks."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="The message uses last year's good performance to convince you that this fund has no risk at all. While the fund might have made money last year, good past performance does not make an investment safe for the future. When markets go down, high-return funds can lose value quickly.",
            ta="சென்ற ஆண்டு 25% லாபம் கிடைத்ததால், இந்த முதலீட்டில் எந்தவித அபாயமும் இல்லை என்று இந்த செய்தி கூறுகிறது. கடந்த கால லாபம் எதிர்கால பாதுகாப்பிற்கு உத்தரவாதம் அல்ல. சந்தை சரியும்போது நஷ்டம் ஏற்படும் வாய்ப்பு உள்ளது.",
            key_takeaway="Past performance is a historical fact, never a guarantee of future safety or profit."
        ),
        "verification_items": [
            "What is the official Riskometer level (Low, Moderate, High, Very High) published in the fund factsheet?",
            "How much did this fund drop during major market corrections (drawdown)?",
            "Does the communication include the mandatory SEBI risk disclosure disclaimer?"
        ],
        "before_you_act": "Examine the fund's official AMFI factsheet to understand what assets it holds before assuming it is safe.",
        "micro_lesson_topic": "past_performance",
        "uncertainty": [
            "The system cannot verify the fund's exact historical NAV without knowing the specific fund name."
        ]
    },

    # 3. Educational Content
    {
        "id": "tc-3",
        "name": "Educational - Compliant Risk Disclosure",
        "content": "A mutual fund's past performance does not guarantee future results. Mutual fund investments are subject to market risks, read all scheme related documents carefully before investing.",
        "expected_status": OverallStatus.NO_OBVIOUS_SIGNALS,
        "status_label": "No Obvious Warning Signals Detected",
        "summary": "This is standard educational investor awareness content emphasizing the statutory mutual fund market risk disclaimer.",
        "claims": [
            ClaimItem(
                claim="A mutual fund's past performance does not guarantee future results",
                category="educational_statement",
                claim_type=ClaimType.FACTUAL,
                severity=SeverityLevel.LOW,
                status=ClaimStatus.EDUCATIONAL,
                why_it_matters="This is a foundational regulatory and financial literacy truth recognized globally.",
                action="No verification needed; this is a standard regulatory caution."
            ),
            ClaimItem(
                claim="Mutual fund investments are subject to market risks",
                category="educational_statement",
                claim_type=ClaimType.FACTUAL,
                severity=SeverityLevel.LOW,
                status=ClaimStatus.EDUCATIONAL,
                why_it_matters="Reminds investors that capital value can rise or fall based on underlying market securities.",
                action="Read the Scheme Information Document (SID) and Key Information Memorandum (KIM)."
            )
        ],
        "signals": [],
        "simple_explanation": SimpleExplanation(
            en="This content is an educational reminder mandated by regulators. It warns that just because an investment did well in the past, it might not do so in the future, and that market investments carry risk of loss. It does not try to sell or promise anything.",
            ta="இது முதலீட்டாளர்களுக்கு விழிப்புணர்வு ஏற்படுத்தும் ஒரு சட்டபூர்வ அறிவிப்பு. கடந்த கால லாபத்தை வைத்து எதிர்காலத்தை கணிக்க முடியாது என்றும், சந்தை அபாயங்களை படித்து புரிந்துகொள்ள வேண்டும் என்றும் அறிவுறுத்துகிறது.",
            key_takeaway="Responsible financial communications always highlight potential risks alongside opportunities."
        ),
        "verification_items": [
            "Always review the Scheme Information Document (SID) on amfiindia.com before investing.",
            "Assess whether the fund's risk profile aligns with your personal investment horizon."
        ],
        "before_you_act": "Continue your research into specific mutual funds through official SEBI-registered distributors or direct AMC portals.",
        "micro_lesson_topic": "past_performance",
        "uncertainty": [
            "The system notes that even legitimate disclaimers can be appended to unverified products; always check the underlying offering."
        ]
    },

    # 4. Fake SEBI Registration
    {
        "id": "tc-4",
        "name": "Fake SEBI Registration & Jackpot Call",
        "content": "100% SEBI approved jackpot options call. Target 500 points sure shot profit tomorrow morning. Contact @raj_trading_expert on Telegram.",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "Claims to offer a 100% SEBI-approved derivatives jackpot call with guaranteed 500-point profit on Telegram.",
        "claims": [
            ClaimItem(
                claim="100% SEBI approved jackpot options call",
                category="fake_regulatory_claim",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="SEBI never approves, endorses, or certifies individual stock or option calls.",
                action="Search SEBI's intermediary database at sebi.gov.in. SEBI does not approve 'calls'."
            ),
            ClaimItem(
                claim="Target 500 points sure shot profit tomorrow morning",
                category="future_prediction",
                claim_type=ClaimType.PREDICTIVE,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Derivatives trading carries severe risk; over 90% of retail F&O traders make losses according to SEBI study.",
                action="Consult SEBI's official study on retail F&O losses."
            )
        ],
        "signals": [
            WarningSignal(
                type="fake_regulatory_claim",
                title="Fake Regulatory Approval",
                severity=SeverityLevel.HIGH,
                evidence="100% SEBI approved",
                explanation="Falsely implies that SEBI has vetted or approved this specific options trading tip."
            ),
            WarningSignal(
                type="future_prediction",
                title="Sure Shot Profit Claim",
                severity=SeverityLevel.HIGH,
                evidence="sure shot profit tomorrow morning",
                explanation="Presents high-risk speculative derivative trades as guaranteed wins."
            ),
            WarningSignal(
                type="suspicious_contact",
                title="Telegram Channel Redirection",
                severity=SeverityLevel.MEDIUM,
                evidence="@raj_trading_expert on Telegram",
                explanation="Channels conversations onto unmonitored messaging apps where operators can vanish without trace."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="The message falsely claims that the market regulator SEBI has approved a specific stock options trade and promises a 'sure shot' profit. SEBI never approves stock tips. In options trading, 9 out of 10 retail traders lose money. This is an unregistered tipster channel.",
            ta="செபி (SEBI) அரசு அமைப்பு தங்களது பங்குச்சந்தை டிப்ஸிற்கு அனுமதி அளித்துள்ளதாக இந்த செய்தி தவறாக கூறுகிறது. செபி ஒருபோதும் குறிப்பிட்ட பங்குகளுக்கு ஒப்புதல் அளிக்காது. டெலிகிராம் வழியாக டிப்ஸ் தருபவர்களை நம்பி பணத்தை இழக்காதீர்கள்.",
            key_takeaway="SEBI regulates financial market institutions; it never approves specific trading tips or calls."
        ),
        "verification_items": [
            "Does the individual hold a valid SEBI Research Analyst (RA) registration number?",
            "Is the registration number verified on sebi.gov.in?",
            "Are they operating via a legitimate business entity rather than an anonymous Telegram handle?"
        ],
        "before_you_act": "Do not enter into derivative trades based on unverified social media tips.",
        "micro_lesson_topic": "regulatory_claims",
        "uncertainty": ["The true legal name of '@raj_trading_expert' cannot be resolved from this text alone."]
    },

    # 5. High-Pressure FOMO Stock Tip
    {
        "id": "tc-5",
        "name": "High-Pressure FOMO Stock Tip",
        "content": "URGENT ALERT: Penny stock XYZ is exploding tomorrow at 9:15 AM! Don't miss this life-changing multibagger opportunity. Buy now before market opens!",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "Pressures readers to buy an unnamed penny stock immediately at market open, claiming it will explode and make them rich.",
        "claims": [
            ClaimItem(
                claim="Penny stock XYZ is exploding tomorrow at 9:15 AM",
                category="future_prediction",
                claim_type=ClaimType.PREDICTIVE,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Classic signature of an illegal penny stock pump-and-dump syndicate.",
                action="Check BSE/NSE surveillance lists (ASM/GSM) for stock XYZ."
            )
        ],
        "signals": [
            WarningSignal(
                type="urgency",
                title="Extreme Artificial Urgency",
                severity=SeverityLevel.HIGH,
                evidence="URGENT ALERT... Buy now before market opens!",
                explanation="Creates acute panic to induce rapid buying without fundamental research."
            ),
            WarningSignal(
                type="fear_fomo",
                title="Fear of Missing Out (FOMO)",
                severity=SeverityLevel.MEDIUM,
                evidence="Don't miss this life-changing multibagger opportunity",
                explanation="Appeals to greed and fear of remaining poor to override investor skepticism."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="This message is trying to rush you into buying a low-value stock as soon as the market opens, claiming it will shoot up. This is a common pump-and-dump trick: the promoters buy the shares cheaply beforehand, convince retail investors to buy and drive up the price, and then sell off their own shares, leaving you with massive losses.",
            ta="சந்தை திறந்தவுடன் குறிப்பிட்ட சிறிய நிறுவனப் பங்கை உடனே வாங்குமாறு அவசரப்படுத்துகிறது. இது பெரும்பாலும் 'Pump and Dump' என்ற ஏமாற்று வேலையாகும். அவர்கள் முன்னரே வாங்கிவிட்டு, உங்களை வாங்கத் தூண்டி, விலையேறியதும் விற்றுவிட்டு ஓடிவிடுவார்கள்.",
            key_takeaway="When someone tells you to buy a specific stock urgently tomorrow morning, they are usually looking for someone to buy their shares."
        ),
        "verification_items": [
            "Is the stock under SEBI's Additional Surveillance Measure (ASM) or Graded Surveillance Measure (GSM)?",
            "What are the company's actual revenues, profits, and promoter holding on bseindia.com?",
            "Who is sending this tip, and what is their financial interest?"
        ],
        "before_you_act": "Do not place market orders on penny stocks recommended in mass forwarded messages.",
        "micro_lesson_topic": "unregistered_tipsters",
        "uncertainty": ["The financial fundamentals of stock XYZ cannot be verified without the full ticker."]
    },

    # 6. Multilingual Tamil Investment Forward
    {
        "id": "tc-6",
        "name": "Tamil WhatsApp Forward - Guaranteed Monthly Income",
        "content": "மாதம் ₹25,000 உத்தரவாத வருமானம்! ₹10,000 மட்டும் முதலீடு செய்து உடனடி வருமானம் பெறுங்கள். சீக்கிரம் சேருங்கள், சில இடங்கள் மட்டுமே!",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "A Tamil WhatsApp forward promising ₹25,000 guaranteed monthly income from a mere ₹10,000 one-time investment with limited slots.",
        "claims": [
            ClaimItem(
                claim="மாதம் ₹25,000 உத்தரவாத வருமானம் (Guaranteed ₹25,000 monthly income)",
                category="guaranteed_return",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Earning ₹25,000 monthly on a ₹10,000 deposit represents a 250% monthly return, an impossible Ponzi claim.",
                action="Check RBI Sachet portal to verify if this deposit scheme has statutory authorization."
            )
        ],
        "signals": [
            WarningSignal(
                type="guaranteed_return",
                title="உத்தரவாத வருமானம் (Guaranteed Return)",
                severity=SeverityLevel.HIGH,
                evidence="மாதம் ₹25,000 உத்தரவாத வருமானம்",
                explanation="Offers impossible guaranteed returns of 250% per month."
            ),
            WarningSignal(
                type="scarcity",
                title="செயற்கை தட்டுப்பாடு (Artificial Scarcity)",
                severity=SeverityLevel.MEDIUM,
                evidence="சீக்கிரம் சேருங்கள், சில இடங்கள் மட்டுமே",
                explanation="Uses scarcity tactics in Tamil to pressure first-time rural/semi-urban investors."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="The message in Tamil promises that a small deposit of ₹10,000 will give you ₹25,000 every month without fail. This is mathematically absurd and represents an impossible 250% monthly profit. Legitimate businesses and banks cannot offer this. It is a fraudulent money-collection pitch.",
            ta="₹10,000 முதலீட்டிற்கு மாதம் ₹25,000 உத்தரவாதமாக வரும் என்று இந்த செய்தி கூறுகிறது. இது 250% மாத லாபம் ஆகும், இது எந்தவொரு உண்மையான தொழிலிலும் சாத்தியமே இல்லை. இது மக்களை ஏமாற்றி பணம் பறிக்கும் மோசடி முயற்சியாகும்.",
            key_takeaway="₹10,000 முதலீட்டிற்கு மாதம் ₹25,000 தருவதாக கூறுவது 100% நம்பத்தகாத மோசடி வாக்குறுதியாகும்."
        ),
        "verification_items": [
            "Are they an RBI-registered Non-Banking Financial Company (NBFC)?",
            "Does the entity have a verified physical office address and company registration on mca.gov.in?",
            "Why would someone offering 250% monthly profit ask strangers on WhatsApp for ₹10,000?"
        ],
        "before_you_act": "ஒருபோதும் அறியாத நபர்களுக்கு பணத்தை அனுப்பாதீர்கள் (Never send money to unknown individuals).",
        "micro_lesson_topic": "guaranteed_returns",
        "uncertainty": ["The entity or person orchestrating this Tamil forward cannot be verified from the text."]
    },

    # 7. Celebrity Deepfake Claim
    {
        "id": "tc-7",
        "name": "Celebrity Deepfake AI Platform",
        "content": "Mukesh Ambani launches new automated AI trading platform that generates ₹1,50,000 daily for every Indian citizen with zero effort. Register here with your phone number.",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "Uses the name and likeness of Mukesh Ambani to promote an automated AI trading scheme claiming ₹1,50,000 daily returns.",
        "claims": [
            ClaimItem(
                claim="Mukesh Ambani launches new automated AI trading platform",
                category="celebrity_endorsement",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Prominent industrialists and celebrities are routinely impersonated in malicious social media ad campaigns.",
                action="Verify via Reliance Industries official press releases on relianceindustries.com."
            )
        ],
        "signals": [
            WarningSignal(
                type="celebrity_endorsement",
                title="Unauthorized Celebrity Endorsement",
                severity=SeverityLevel.HIGH,
                evidence="Mukesh Ambani launches",
                explanation="Misuses a prominent national figure's reputation to lower investor guard."
            ),
            WarningSignal(
                type="unrealistic_return",
                title="Unrealistic Automated Income",
                severity=SeverityLevel.HIGH,
                evidence="₹1,50,000 daily for every Indian citizen with zero effort",
                explanation="Offers fantastical sums of passive income with 'zero effort'."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="The ad claims business leader Mukesh Ambani has created an automated app giving ₹1,50,000 daily to anyone. This is a complete fabrication using unauthorized celebrity imagery. No such tool exists, and submitting your phone number will lead to persistent fraud calls.",
            ta="முகேஷ் அம்பானி தினசரி ₹1,50,000 தரும் செயலி ஒன்றை உருவாக்கியுள்ளதாக வரும் செய்தி முற்றிலும் போலியானது. பிரபலங்களின் புகைப்படங்களை திருடி இதுபோன்ற போலி விளம்பரங்கள் செய்யப்படுகின்றன.",
            key_takeaway="Prominent business leaders do not launch 'secret get-rich-quick apps' on social media."
        ),
        "verification_items": [
            "Is there any announcement on official company websites (e.g. ril.com)?",
            "Has any mainstream national newspaper (Mint, Economic Times, Business Standard) reported this?",
            "Is the website hosted on an official domain or a suspicious random web address?"
        ],
        "before_you_act": "Do not enter your phone number or email on unverified landing pages.",
        "micro_lesson_topic": "regulatory_claims",
        "uncertainty": ["The true origin of the domain cannot be verified without full web headers."]
    },

    # 8. Legitimate Regulatory / Awareness Notice
    {
        "id": "tc-8",
        "name": "RBI Cautionary Notice on Forex",
        "content": "RBI Cautionary Notice: The Reserve Bank of India cautions the public against unauthorized forex trading platforms and remittance of funds for unauthorized overseas transactions under FEMA.",
        "expected_status": OverallStatus.NO_OBVIOUS_SIGNALS,
        "status_label": "No Obvious Warning Signals Detected",
        "summary": "Official advisory from the Reserve Bank of India cautioning citizens against illegal forex trading apps under FEMA rules.",
        "claims": [
            ClaimItem(
                claim="RBI cautions the public against unauthorized forex trading platforms",
                category="educational_statement",
                claim_type=ClaimType.FACTUAL,
                severity=SeverityLevel.LOW,
                status=ClaimStatus.EDUCATIONAL,
                why_it_matters="RBI maintains an 'Alert List' of unauthorized forex trading portals operating in India.",
                action="Check RBI's official Alert List on rbi.org.in."
            )
        ],
        "signals": [],
        "simple_explanation": SimpleExplanation(
            en="This is an official cautionary statement from India's central bank (RBI). It warns investors that trading forex on unauthorized platforms is illegal under Indian foreign exchange laws (FEMA). It protects you from breaking the law.",
            ta="இது ரிசர்வ் வங்கியின் (RBI) அதிகாரப்பூர்வ எச்சரிக்கை அறிவிப்பு. அனுமதியில்லாத அந்நியச் செலாவணி (Forex) தளங்களில் பணப்பரிவர்த்தனை செய்வது சட்டவிரோதமானது என்று மக்களை எச்சரிக்கிறது.",
            key_takeaway="RBI maintains an active 'Alert List' of banned overseas forex trading apps on its website."
        ),
        "verification_items": [
            "Visit rbi.org.in and check the 'Alert List of Unauthorized Forex Entities'.",
            "Ensure that any financial platform you trade on is authorized by RBI/SEBI."
        ],
        "before_you_act": "Immediately stop trading on any offshore forex platform listed on RBI's Alert List.",
        "micro_lesson_topic": "regulatory_claims",
        "uncertainty": ["Always ensure you are reading notices from the official rbi.org.in domain."]
    },

    # 9. Cryptocurrency Doubling Scheme
    {
        "id": "tc-9",
        "name": "Crypto Doubling Smart Contract",
        "content": "Double your USDT in 15 days using our proprietary arbitrage smart contract. 100% automated payout directly to your wallet.",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "Promises to double crypto deposits in 15 days via an automated arbitrage smart contract.",
        "claims": [
            ClaimItem(
                claim="Double your USDT in 15 days",
                category="double_your_money",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Doubling capital in 15 days represents a mathematically impossible yield (>2400% annualized).",
                action="Never connect decentralized wallets to unverified smart contracts."
            )
        ],
        "signals": [
            WarningSignal(
                type="double_your_money",
                title="Money Doubling Scheme",
                severity=SeverityLevel.HIGH,
                evidence="Double your USDT in 15 days",
                explanation="Offers rapid multiplication of capital with no clear business logic or asset creation."
            ),
            WarningSignal(
                type="unrealistic_return",
                title="Astronomical Return Rate",
                severity=SeverityLevel.HIGH,
                evidence="Double your USDT in 15 days",
                explanation="Such yields only exist in Ponzi cycles where early users are paid from later victims."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="The message claims that a smart program will double your cryptocurrency in just 15 days. In the crypto world, this is a textbook drainer or Ponzi scheme. Once you send your crypto to their address, it cannot be recovered, as crypto transactions are irreversible.",
            ta="15 நாட்களில் உங்கள் கிரிப்டோ பணத்தை இரட்டிப்பாக்கி தருவதாக இது கூறுகிறது. இது ஒரு ஏமாற்றுத் திட்டம். இதில் உங்கள் பணத்தை அனுப்பினால் அதை மீண்டும் திரும்பப் பெற முடியாது.",
            key_takeaway="There is no computer algorithm in the world that can safely double money every 15 days."
        ),
        "verification_items": [
            "Are there independent security audits (CertiK, OpenZeppelin) for the contract?",
            "Is the entity registered with FIU-IND (Financial Intelligence Unit India)?",
            "Are token withdrawals locked by administrators?"
        ],
        "before_you_act": "Never send crypto assets or connect your Web3 wallet to unknown links.",
        "micro_lesson_topic": "guaranteed_returns",
        "uncertainty": ["The blockchain wallet address and contract code cannot be audited from this text alone."]
    },

    # 10. Unsolicited Telegram Syndicate Group
    {
        "id": "tc-10",
        "name": "Telegram Syndicate VIP Group with Personal UPI",
        "content": "Exclusive NSE insider club: Join our private Telegram channel for daily 99.8% accurate Nifty call/put options. Pay monthly membership ₹2,999 to UPI trader99@okhdfc.",
        "expected_status": OverallStatus.POTENTIALLY_MISLEADING,
        "status_label": "Needs Caution",
        "summary": "Offers an exclusive NSE insider Telegram group with 99.8% options win rate in exchange for ₹2,999 sent to a personal UPI ID.",
        "claims": [
            ClaimItem(
                claim="daily 99.8% accurate Nifty call/put options",
                category="unsupported_statistic",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="A 99.8% accuracy rate in derivative trading is statistically impossible in live financial markets.",
                action="Check SEBI-mandated Performance Validation Agency (PVA) reports."
            ),
            ClaimItem(
                claim="Pay monthly membership ₹2,999 to UPI trader99@okhdfc",
                category="personal_upi_account",
                claim_type=ClaimType.PROMOTIONAL,
                severity=SeverityLevel.HIGH,
                status=ClaimStatus.UNVERIFIED,
                why_it_matters="Receiving advisory fees in a personal UPI handle violates SEBI regulations for registered investment advisers.",
                action="Never pay advisory fees to a personal UPI ID."
            )
        ],
        "signals": [
            WarningSignal(
                type="unsupported_statistic",
                title="Unrealistic Accuracy Rate",
                severity=SeverityLevel.HIGH,
                evidence="daily 99.8% accurate",
                explanation="Fabricates a 99.8% success rate to lure retail participants into options trading."
            ),
            WarningSignal(
                type="personal_upi_account",
                title="Personal UPI Payment",
                severity=SeverityLevel.HIGH,
                evidence="UPI trader99@okhdfc",
                explanation="Instructs payment directly to a personal UPI handle, bypassing all regulated banking safeguards."
            ),
            WarningSignal(
                type="suspicious_contact",
                title="Private Telegram Channel",
                severity=SeverityLevel.MEDIUM,
                evidence="private Telegram channel",
                explanation="Uses private unmonitored channels to evade market surveillance."
            )
        ],
        "simple_explanation": SimpleExplanation(
            en="This message claims an accuracy rate of 99.8% in stock options and asks you to pay ₹2,999 to a personal UPI handle to join a Telegram group. No one in the world has a 99.8% win rate in options. Registered advisors are not allowed to collect fees through random personal UPI handles.",
            ta="99.8% துல்லியமான பங்குச்சந்தை டிப்ஸ் தருவதாக கூறி, டெலிகிராம் குழுவில் இணைய தனிநபர் UPI முகவரிக்கு ₹2,999 கேட்கிறார்கள். தனிநபர் UPI-க்கு கட்டணம் செலுத்தி இதுபோன்ற குழுக்களில் சேர்வது பணத்தை இழக்கவே வழிவகுக்கும்.",
            key_takeaway="Legitimate SEBI advisors never collect advisory fees through personal UPI IDs."
        ),
        "verification_items": [
            "Is the advisor registered on sebi.gov.in as a Research Analyst?",
            "Does the UPI account match a registered corporate entity or an unknown individual?",
            "Are they displaying a verified SEBI registration number and contact details?"
        ],
        "before_you_act": "Do not send any money to personal UPI handles for stock tips.",
        "micro_lesson_topic": "upi_security",
        "uncertainty": ["The identity of the UPI account holder cannot be confirmed without banking records."]
    }
]


def get_test_case_by_id(test_id: str) -> Dict:
    """Retrieve test case definition by ID."""
    for tc in TEST_CASES_DATA:
        if tc["id"] == test_id:
            return tc
    return TEST_CASES_DATA[0]


def build_analysis_result_from_test_case(tc: Dict, input_type: str = "text") -> AnalysisResult:
    """Construct a full AnalysisResult Pydantic object from a test case dictionary."""
    lesson = LESSONS_DB.get(tc.get("micro_lesson_topic", "general"), LESSONS_DB["general"])
    expl = tc["simple_explanation"]
    if not expl.translations:
        expl = build_multilingual_explanation(
            status=tc["expected_status"],
            en_override=expl.en,
            ta_override=expl.ta,
            key_takeaway_override=expl.key_takeaway
        )

    # SANGYAN Track E: Promotion vs Education classifier and SEBI verification
    sebi_res = inspect_sebi_registration(tc["content"])
    intent, evaluated_claims = classify_intent_and_evidence(
        tc["content"], tc["expected_status"], tc["signals"], list(tc["claims"])
    )

    return AnalysisResult(
        id=f"analysis-{tc['id']}",
        input_type=input_type,
        original_content=tc["content"],
        overall_status=tc["expected_status"],
        status_label=tc["status_label"],
        summary=tc["summary"],
        warning_signals_count=len(tc["signals"]),
        claims=evaluated_claims,
        signals=tc["signals"],
        intent_breakdown=intent,
        sebi_check=sebi_res,
        simple_explanation=expl,
        verification_items=tc["verification_items"],
        before_you_act=tc["before_you_act"],
        micro_lesson=lesson,
        uncertainty=tc["uncertainty"],
        processing_time_ms=120
    )
