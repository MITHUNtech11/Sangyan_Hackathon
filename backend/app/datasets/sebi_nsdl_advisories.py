"""Official SEBI & NSDL Regulatory Datasets & Social Media Modus Operandi Database.

Curated from official public advisories, press releases, and circulars issued by
the Securities and Exchange Board of India (SEBI) and National Securities Depository Limited (NSDL).

Specific to SANGYAN Track E:
- WhatsApp Scams (Institutional/FII accounts, APKs, mule deposits)
- Telegram Scams (VIP jackpot options tips, fake SEBI certificates, manipulated P&Ls)
- YouTube Scams (Pump-and-dump penny stocks, algo bot guarantees, undisclosed sponsorships)
"""
from typing import Dict, List, Optional
from ..schemas import RegulatoryAdvisory, ModusOperandiItem, RegulatoryGrounding


# Master Database of Official SEBI & NSDL Advisories
OFFICIAL_ADVISORIES: List[RegulatoryAdvisory] = [
    RegulatoryAdvisory(
        id="sebi-pr-04-2024",
        authority="SEBI",
        reference_no="PR No. 04/2024",
        date="February 26, 2024",
        title="Caution against Fraudulent Trading Platforms claiming FII / Institutional Accounts",
        platform="whatsapp",
        summary="SEBI cautioned retail investors against fraudsters luring public through social media groups (WhatsApp & Telegram) falsely claiming to provide institutional trading accounts, FII/FPI sub-accounts, and block trading privileges.",
        key_red_flags=[
            "Claims that retail investors can trade via 'FII/FPI sub-accounts' (legally prohibited for resident Indians)",
            "Promising exclusive anchor investor quota or pre-IPO discounted allocations",
            "Urging users to download third-party trading APKs not available on official App Stores",
            "Directing deposits into personal or current bank accounts of unrelated private entities"
        ],
        official_action_advice="Resident Indians cannot access markets via the FPI route. Only trade through registered brokers listed on sebi.gov.in. Never deposit funds into individual bank accounts.",
        source_url="https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=4&smid=0&ssid=0"
    ),
    RegulatoryAdvisory(
        id="sebi-pr-07-2024",
        authority="SEBI",
        reference_no="PR No. 07/2024",
        date="May 18, 2024",
        title="Advisory on Unscrupulous Entities Luring Public with Assured Returns via Social Media Groups",
        platform="telegram",
        summary="SEBI alerted investors about unauthorized entities using Telegram and WhatsApp to distribute fake SEBI registration certificates, promise 40-100% monthly returns, and solicit upfront subscription fees.",
        key_red_flags=[
            "Display of fake SEBI certificates or registration numbers on Telegram channel headers",
            "Claims of 'SEBI Approved Telegram Channel' (SEBI never approves communication channels)",
            "Guarantees of fixed daily/weekly/monthly profit percentages in F&O derivatives",
            "Sharing cropped or inspect-element manipulated profit & loss (P&L) screenshots"
        ],
        official_action_advice="SEBI-registered Research Analysts (RAs) are legally barred from assuring returns or executing trades. Cross-verify registration numbers on sebi.gov.in before paying any advisory fees.",
        source_url="https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=4&smid=0&ssid=0"
    ),
    RegulatoryAdvisory(
        id="sebi-cir-algo-2023",
        authority="SEBI",
        reference_no="SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158",
        date="December 14, 2023",
        title="Prohibition on Guarantees of Assured Returns by Intermediaries and Algorithmic Trading Providers",
        platform="youtube",
        summary="SEBI strictly prohibited all regulated intermediaries, fintech brokers, and algorithmic solution vendors from directly or indirectly referencing past returns as a guarantee of future profits.",
        key_red_flags=[
            "YouTube videos claiming automated AI bots or algo strategies make 2-5% profit every single day",
            "Presenting past backtested data as 'proof of zero market risk'",
            "Selling unverified automated software licenses with promises of passive stock income"
        ],
        official_action_advice="Algorithmic trading carries market risk. Any provider promising 'guaranteed' or 'risk-free' algo execution is in direct breach of SEBI regulations.",
        source_url="https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&smid=0&ssid=0"
    ),
    RegulatoryAdvisory(
        id="nsdl-advisory-demat-2024",
        authority="NSDL",
        reference_no="NSDL/POLICY/2024/0022",
        date="March 12, 2024",
        title="NSDL Caution on Fake Demat Credit Statements & WhatsApp IPO Allocations",
        platform="whatsapp",
        summary="NSDL warned depository participants and retail investors about fake PDF holding statements and fake Demat credit SMS messages distributed via WhatsApp claiming allocation in high-demand IPOs.",
        key_red_flags=[
            "WhatsApp messages containing unofficial PDF 'allotment letters' demanding payment for shares",
            "SMS alerts originating from 10-digit mobile numbers instead of official NSDL/CDSL sender IDs (e.g. NSDL-DEP)",
            "Requests to transfer share purchase funds to UPI IDs of individuals instead of Clearing Corporations"
        ],
        official_action_advice="Check actual Demat holdings only via NSDL IDEAS (eservices.nsdl.com) or monthly Consolidated Account Statements (CAS). Never trust WhatsApp share allocation receipts.",
        source_url="https://investor.sebi.gov.in"
    ),
    RegulatoryAdvisory(
        id="nsdl-pooling-ban",
        authority="NSDL",
        reference_no="NSDL/CIR/2022/115",
        date="July 01, 2022",
        title="Prohibition on Unauthorized Pooling of Client Funds and Demat Securities",
        platform="general",
        summary="NSDL and SEBI enforced direct payout of securities to client Demat accounts. Unregulated third parties cannot collect money from investors into pool accounts under any pretext.",
        key_red_flags=[
            "Asking investors to pool money together into a common account for 'bulk institutional trading'",
            "Promising higher returns by pooling capital with a master trader",
            "Refusal to credit bought shares directly to the investor's individual 16-digit Demat ID"
        ],
        official_action_advice="Every share you buy must be credited directly to your own DP/Demat account. Never participate in pooled trading accounts.",
        source_url="https://investor.sebi.gov.in"
    ),
    RegulatoryAdvisory(
        id="sebi-pump-dump-youtube",
        authority="SEBI",
        reference_no="SEBI Order WTM/ASB/EFD-1/2023-24/09",
        date="March 02, 2023",
        title="SEBI Enforcement Action against Pump-and-Dump Stock Manipulation via YouTube Channels",
        platform="youtube",
        summary="SEBI impounded illegal gains and banned operators who created misleading YouTube videos with fake corporate contracts and false expansion news to artificially inflate penny stock volumes before dumping.",
        key_red_flags=[
            "Sensational YouTube video thumbnails claiming '1000% Multibagger target' on unknown micro-cap stocks",
            "Fabricated corporate acquisition news or unverified bonus share announcements",
            "Urgent call to buy immediately at market open before the stock hits upper circuit"
        ],
        official_action_advice="Verify corporate announcements exclusively on official BSE (bseindia.com) and NSE (nseindia.com) company filing portals before acting on YouTube recommendations.",
        source_url="https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=2&smid=0&ssid=0"
    )
]


# Platform Specific Modus Operandi Database
PLATFORM_MODUS_OPERANDI: List[ModusOperandiItem] = [
    ModusOperandiItem(
        id="mo-wa-institutional",
        platform="whatsapp",
        tactic_name="WhatsApp 'Institutional FII Quota' Trap",
        description="Scammers add unsuspecting users to exclusive WhatsApp groups claiming to be senior analysts from global investment banks (BlackRock, Goldman, Morgan Stanley) offering institutional VIP allotment.",
        how_it_works=[
            "Step 1: Unsolicited addition to a WhatsApp group named 'Stock Wealth Academy' or 'Institutional VIP Club'.",
            "Step 2: Accomplices pose as satisfied students posting fake screenshots of massive profits.",
            "Step 3: Admin shares a direct link or APK file to download an unauthorized app displaying simulated balance.",
            "Step 4: Victim is asked to deposit funds into individual bank accounts via RTGS/UPI for 'institutional buying'.",
            "Step 5: When withdrawal is requested, victim is told their account is frozen and must pay 20% 'tax/clearance fee' to withdraw."
        ],
        regulatory_precedent="Documented in SEBI PR No. 04/2024. SEBI explicitly stated FPI route is prohibited for retail residents.",
        how_investor_protects="Immediately exit unknown WhatsApp groups. Never install APK files. All real IPO allocations happen through ASBA where funds stay in your own bank account until allotment."
    ),
    ModusOperandiItem(
        id="mo-tg-vip-jackpot",
        platform="telegram",
        tactic_name="Telegram 'SEBI Approved VIP Jackpot Channel' Trap",
        description="Telegram operators clone legitimate SEBI Research Analyst certificates, create channels with thousands of bought bots, and market guaranteed daily options calls.",
        how_it_works=[
            "Step 1: Broadcast channels post daily 'Jackpot Call: 100% Accuracy' messages with blurred screenshots.",
            "Step 2: Channel description cites a real SEBI RA number stolen from public SEBI registry to establish credibility.",
            "Step 3: User is pressured to pay upfront fees (₹5,000 to ₹50,000) for VIP private channel access.",
            "Step 4: After payment, users receive high-risk out-of-the-money options tips that result in total capital erosion."
        ],
        regulatory_precedent="SEBI PR No. 07/2024 & SEBI RA Master Circular. SEBI never approves social media channels.",
        how_investor_protects="Cross-check the analyst's contact number and official email domain on sebi.gov.in. Real SEBI analysts only accept payments to registered corporate bank accounts."
    ),
    ModusOperandiItem(
        id="mo-yt-pump-dump",
        platform="youtube",
        tactic_name="YouTube 'Multibagger Penny Stock' Pump-and-Dump",
        description="Finfluencers or sponsored video creators publish paid videos hyping low-volume microcap stocks with fabricated news, prompting retail buyers to push up the price while operators exit.",
        how_it_works=[
            "Step 1: Coordinated release of multiple YouTube videos with clickbait titles ('Next Reliance', '1000% target').",
            "Step 2: Presenting unverified future contracts, government subsidies, or fake multibagger projections.",
            "Step 3: Retail investors rush to buy on market open, creating artificial demand and upper circuits.",
            "Step 4: The fraudsters dump their pre-accumulated holdings, stock locks in continuous lower circuits, and retail investors are left holding illiquid shares."
        ],
        regulatory_precedent="SEBI Sharpline & Sadhna Broadcast Orders (2023). Banned 44+ entities and impounded ₹54+ Crore.",
        how_investor_protects="Never buy penny stocks based on YouTube videos. Verify all earnings, order books, and promoter shareholding patterns on nseindia.com and bseindia.com."
    ),
    ModusOperandiItem(
        id="mo-mule-upi",
        platform="general",
        tactic_name="The Mule Account UPI Depository Scam",
        description="Scammers avoid corporate banking compliance by asking investors to transfer margin or trading funds to random personal UPI IDs.",
        how_it_works=[
            "Step 1: After hook through WhatsApp/Telegram, user is told to fund their 'trading account'.",
            "Step 2: Payment details are given as individual UPI IDs (e.g. rajesh987@okaxis or grocery shop QR codes).",
            "Step 3: Funds are instantly routed through multiple mule accounts across states, making immediate bank recovery difficult."
        ],
        regulatory_precedent="SEBI Investor Alert & NSDL Circular on Direct Clearing Corporation Payments.",
        how_investor_protects="SEBI regulations require all trading fund transfers to be made strictly through the broker's authorized client bank account or direct UPI handle tied to the registered member name."
    )
]


def match_regulatory_grounding(content: str) -> RegulatoryGrounding:
    """Analyze content and match against official SEBI & NSDL advisories and platform modus operandi."""
    text_lower = content.lower()
    matched_advs: List[RegulatoryAdvisory] = []
    platform_detected: Optional[str] = None
    matched_mo: Optional[ModusOperandiItem] = None

    # Detect Platform
    if any(k in text_lower for k in ["whatsapp", "wa.me", "group admin", "group link"]):
        platform_detected = "whatsapp"
    elif any(k in text_lower for k in ["telegram", "t.me", "channel", "vip channel"]):
        platform_detected = "telegram"
    elif any(k in text_lower for k in ["youtube", "youtu.be", "channel", "video", "subscribe"]):
        platform_detected = "youtube"

    # Match SEBI Advisories
    # 1. FII / Institutional account scam
    if any(k in text_lower for k in ["institutional", "fii", "fpi", "block trade", "pre-ipo", "allotment letter", "apk"]):
        for adv in OFFICIAL_ADVISORIES:
            if adv.id == "sebi-pr-04-2024":
                matched_advs.append(adv)
        for mo in PLATFORM_MODUS_OPERANDI:
            if mo.id == "mo-wa-institutional":
                matched_mo = mo

    # 2. Guaranteed / Assured returns & Telegram VIP
    if any(k in text_lower for k in ["guarantee", "assured", "monthly return", "vip", "jackpot", "fixed return", "40%"]):
        for adv in OFFICIAL_ADVISORIES:
            if adv.id in ["sebi-pr-07-2024", "sebi-cir-algo-2023"] and adv not in matched_advs:
                matched_advs.append(adv)
        if not matched_mo:
            for mo in PLATFORM_MODUS_OPERANDI:
                if mo.id == "mo-tg-vip-jackpot":
                    matched_mo = mo

    # 3. Penny stock pump & dump / YouTube
    if any(k in text_lower for k in ["multibagger", "1000%", "target", "circuit", "pump", "penny"]):
        for adv in OFFICIAL_ADVISORIES:
            if adv.id == "sebi-pump-dump-youtube" and adv not in matched_advs:
                matched_advs.append(adv)
        if not matched_mo:
            for mo in PLATFORM_MODUS_OPERANDI:
                if mo.id == "mo-yt-pump-dump":
                    matched_mo = mo

    # 4. NSDL Fake Demat / UPI pooling
    if any(k in text_lower for k in ["pay ₹", "pay rs", "upi", "deposit", "pool", "demat", "allotment"]):
        for adv in OFFICIAL_ADVISORIES:
            if adv.id in ["nsdl-advisory-demat-2024", "nsdl-pooling-ban"] and adv not in matched_advs:
                matched_advs.append(adv)
        if not matched_mo:
            for mo in PLATFORM_MODUS_OPERANDI:
                if mo.id == "mo-mule-upi":
                    matched_mo = mo

    # Default to SEBI Caution if nothing matched but high risk keywords exist
    if not matched_advs and any(k in text_lower for k in ["sebi", "invest", "trading", "return", "profit"]):
        for adv in OFFICIAL_ADVISORIES:
            if adv.id == "sebi-pr-07-2024":
                matched_advs.append(adv)

    # Standard Redressal steps according to SEBI & NSDL
    redressal = [
        "1. Verify Registration: Always verify the entity's registration at https://www.sebi.gov.in before transferring any money.",
        "2. Check Demat Holdings: Verify authentic share credits only on NSDL IDEAS (https://eservices.nsdl.com) or CDSL MyEasi.",
        "3. Lodge Regulatory Complaint: File a complaint on SEBI SCORES 2.0 (https://scores.sebi.gov.in).",
        "4. Report Cyber Fraud: In case of unauthorized financial transfer, call National Cybercrime Helpline 1930 or report at https://www.cybercrime.gov.in within the 'Golden Hour' to freeze fraudulent mule accounts."
    ]

    return RegulatoryGrounding(
        platform_detected=platform_detected,
        modus_operandi_title=matched_mo.tactic_name if matched_mo else None,
        modus_operandi_description=matched_mo.description if matched_mo else None,
        matched_advisories=matched_advs,
        official_redressal_steps=redressal
    )
