"""Curated Regulatory & Fin-Fact Knowledge Base for Hybrid RAG.

Contains authoritative circulars, press releases, advisories, and benchmark fact-checking
rationales from:
- Securities and Exchange Board of India (SEBI)
- Reserve Bank of India (RBI)
- National Stock Exchange of India (NSE)
- Bombay Stock Exchange (BSE)
- National Securities Depository Limited (NSDL)
- Fin-Fact Financial Misinformation Benchmark Taxonomy
"""
from typing import List, Dict, Any

REGULATORY_KNOWLEDGE_BASE: List[Dict[str, Any]] = [
    {
        "id": "sebi-pr-04-2024",
        "authority": "SEBI",
        "reference_no": "PR No. 04/2024",
        "date": "2024-02-26",
        "title": "Caution against Fraudulent Trading Platforms claiming FII / Institutional Accounts",
        "category": "institutional_scam",
        "keywords": [
            "fii", "fpi", "institutional", "whatsapp", "sub-account", "block trade",
            "pre-ipo", "apk", "allotment", "vip account", "blackrock", "foreign investor"
        ],
        "excerpt": (
            "SEBI cautions public against fraudulent trading platforms operating via social media "
            "(WhatsApp & Telegram) falsely promising access to Foreign Portfolio Investor (FPI) or "
            "institutional trading accounts with pre-IPO or block trade quotas. Resident Indian retail "
            "investors are legally prohibited under SEBI FPI Regulations from trading through institutional "
            "sub-accounts. Unofficial APK downloads display simulated paper balances and steal deposits."
        ),
        "url": "https://www.sebi.gov.in/enforcement/press-releases/feb-2024/sebi-cautions-investors-against-fraudulent-trading-platforms_81804.html",
        "rule_verdict": "FALSE",
        "action_advice": "Never deposit funds into private accounts for 'institutional' quotas. Only trade through registered stock brokers listed on sebi.gov.in."
    },
    {
        "id": "sebi-pr-07-2024",
        "authority": "SEBI",
        "reference_no": "PR No. 07/2024",
        "date": "2024-05-18",
        "title": "Advisory on Unscrupulous Entities Luring Public with Assured Returns via Social Media",
        "category": "guaranteed_return",
        "keywords": [
            "assured returns", "guaranteed returns", "telegram", "whatsapp", "monthly returns",
            "jackpot", "vip channel", "fake sebi certificate", "40%", "100%", "derivatives"
        ],
        "excerpt": (
            "SEBI alerted investors about unscrupulous entities using Telegram channels and WhatsApp groups "
            "to distribute fake SEBI registration certificates, promise 40% to 100% monthly returns, and solicit "
            "upfront fees. SEBI never approves any social media group or communication channel. Registered "
            "Research Analysts (RAs) are strictly barred from guaranteeing returns, sharing profits, or managing client funds."
        ),
        "url": "https://www.sebi.gov.in/enforcement/press-releases/may-2024/sebi-cautions-investors_83478.html",
        "rule_verdict": "FALSE",
        "action_advice": "Cross-verify analyst credentials directly on sebi.gov.in. Any entity promising guaranteed returns in market-linked assets is operating illegally."
    },
    {
        "id": "sebi-cir-algo-2023",
        "authority": "SEBI",
        "reference_no": "SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2023/158",
        "date": "2023-12-14",
        "title": "Prohibition on Guarantees of Assured Returns by Intermediaries and Algorithmic Trading Providers",
        "category": "algo_trading",
        "keywords": [
            "algorithm", "algo bot", "ai trading", "zero risk", "assured returns", "automated trading",
            "backtest", "passive income", "software license"
        ],
        "excerpt": (
            "SEBI circular strictly prohibits stock brokers, registered intermediaries, and algorithmic solution "
            "providers from making direct or indirect references to past performance as a guarantee of future profits, "
            "or promising 'risk-free' automated returns. Algorithmic software cannot eliminate market risk, and marketing "
            "strategies as 'guaranteed profits' violates SEBI Code of Conduct."
        ),
        "url": "https://www.sebi.gov.in/legal/circulars/dec-2023/prohibition-of-assured-returns_79951.html",
        "rule_verdict": "FALSE",
        "action_advice": "Beware of software vendors marketing '100% win rate' bots. Trading derivatives or equities involves continuous capital risk."
    },
    {
        "id": "sebi-mf-statutory-disclosure",
        "authority": "SEBI",
        "reference_no": "SEBI/HO/IMD/DF2/CIR/P/2019/17",
        "date": "2019-01-22",
        "title": "Categorization, Rationalization and Mandatory Risk Disclosures for Mutual Fund Schemes",
        "category": "statutory_compliance",
        "keywords": [
            "mutual fund", "past performance", "does not guarantee", "future results", "market risks",
            "scheme related documents", "statutory disclosure", "disclaimer", "safest"
        ],
        "excerpt": (
            "Under SEBI Master Circular on Mutual Funds, all asset management companies and distributors must clearly "
            "state that 'Mutual Fund investments are subject to market risks, read all scheme related documents carefully' "
            "and that 'Past performance may or may not be sustained in future and is not a guarantee of future returns'. "
            "Claims representing past returns as proof of guaranteed safety or zero downside risk are deemed misleading."
        ),
        "url": "https://www.sebi.gov.in/legal/circulars/jan-2019/categorization-and-rationalization-of-mutual-fund-schemes_41774.html",
        "rule_verdict": "TRUE",
        "action_advice": "Mandatory statutory compliance disclosure. Check official Scheme Information Document (SID) and Key Information Memorandum (KIM)."
    },
    {
        "id": "sebi-order-pump-dump-yt",
        "authority": "SEBI",
        "reference_no": "WTM/ASB/EFD-1/2023-24/09",
        "date": "2023-03-02",
        "title": "SEBI Order on Pump-and-Dump Stock Manipulation via YouTube Channels",
        "category": "penny_stock_manipulation",
        "keywords": [
            "youtube", "penny stock", "multibagger", "1000%", "upper circuit", "sadhna broadcast",
            "sharpline", "false corporate news", "bonus shares", "target price"
        ],
        "excerpt": (
            "SEBI investigated and passed interim orders against coordinated syndicates using sponsored YouTube videos "
            "with deceptive corporate announcements, inflated financial prospects, and false contracts to artificially "
            "pump the stock price and liquidity of illiquid microcaps. Once retail buyers entered on market open, "
            "the scheme promoters dumped substantial holdings at peak prices."
        ),
        "url": "https://www.sebi.gov.in/enforcement/orders/mar-2023/interim-order-in-the-matter-of-pump-and-dump-scheme_68625.html",
        "rule_verdict": "FALSE",
        "action_advice": "Never invest in unknown penny stocks based on YouTube videos. Verify all announcements directly on nseindia.com or bseindia.com."
    },
    {
        "id": "rbi-forex-alert-list",
        "authority": "RBI",
        "reference_no": "RBI/2023-24/Alert-Forex",
        "date": "2023-11-24",
        "title": "RBI Alert List of Unauthorized Forex Trading Platforms and Mobile Applications",
        "category": "unauthorized_forex",
        "keywords": [
            "forex", "octafx", "olymp trade", "currency trading", "crypto", "usdt", "doubling",
            "unauthorized platform", "fema", "lrs violation"
        ],
        "excerpt": (
            "The Reserve Bank of India maintains an Alert List of unauthorized entities and apps providing electronic "
            "trading platforms for forex transactions without authorization under the Foreign Exchange Management Act "
            "(FEMA), 1999. Resident Indians remitting funds abroad or transferring funds domestically for unauthorized "
            "binary options, forex margins, or crypto doubling are liable to penal action under FEMA."
        ),
        "url": "https://www.rbi.org.in/scripts/BS_PressReleaseDisplay.aspx?prid=56801",
        "rule_verdict": "FALSE",
        "action_advice": "Forex trading in India is permitted only in currency pairs involving INR on recognized stock exchanges (NSE/BSE) through authorized dealers."
    },
    {
        "id": "rbi-mule-account-warning",
        "authority": "RBI",
        "reference_no": "RBI/2024-25/Caution-Mule",
        "date": "2024-04-03",
        "title": "RBI Cautionary Notice on Money Mule Bank Accounts and Unregulated Social Media Tipsters",
        "category": "mule_account",
        "keywords": [
            "upi", "mule account", "payment request", "pay ₹5,000", "activation fee", "personal account",
            "deposit", "trader99", "okhdfc", "cyber fraud"
        ],
        "excerpt": (
            "RBI cautions customers against transferring money to personal UPI handles or third-party savings accounts "
            "advertised on social media for investment fees, crypto mining, or stock tips. Fraudsters utilize recruited "
            "money mule accounts to quickly siphon funds before victims can report. Regulated market transactions "
            "must always be routed to designated Clearing Member or SEBI registered corporate accounts."
        ),
        "url": "https://www.rbi.org.in/scripts/FS_Notification.aspx?Id=12301",
        "rule_verdict": "FALSE",
        "action_advice": "Do not transfer money to personal UPI IDs or bank accounts for stock tips. Immediately report suspicious transactions to 1930."
    },
    {
        "id": "rbi-lottery-fake-notices",
        "authority": "RBI",
        "reference_no": "RBI/2022-23/Fraud-Advisory-02",
        "date": "2022-08-16",
        "title": "RBI Warning on Fictitious Offers of Money, Foreign Currency, and Lottery Winnings",
        "category": "fake_authority_claims",
        "keywords": [
            "rbi approved", "rbi cautionary notice", "lottery", "prize", "customs fee", "foreign fund",
            "rbi clearance", "central bank certificate"
        ],
        "excerpt": (
            "The Reserve Bank of India reiterates that it does not maintain accounts of individuals, does not approve "
            "personal investment schemes, and never issues lottery certificates or fund clearance letters. Any message "
            "claiming 'RBI Approved Scheme' or demanding advance clearance fees is a cyber-fraud attempt."
        ),
        "url": "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=54215",
        "rule_verdict": "TRUE",
        "action_advice": "RBI official cautionary notice warning the public against fictitious schemes. The warning itself is genuine and protective."
    },
    {
        "id": "nse-bse-investor-advisory-2024",
        "authority": "NSE/BSE",
        "reference_no": "NSE/INSP/2024/05",
        "date": "2024-01-18",
        "title": "Exchange Joint Advisory against Unsolicited Stock Tips and Unregistered Advisory Groups",
        "category": "unsolicited_tips",
        "keywords": [
            "nse", "bse", "unsolicited tips", "sms", "whatsapp", "telegram", "upper circuit",
            "guaranteed accuracy", "advisory"
        ],
        "excerpt": (
            "NSE and BSE jointly urge investors not to rely on unsolicited SMS or social media messages recommending "
            "stock trades. Exchange surveillance tracks abnormal volume and price movement resulting from tip distribution. "
            "Investors participating in artificial volume spikes risk getting trapped when trading is suspended or shifted "
            "to Trade-for-Trade surveillance."
        ),
        "url": "https://www.nseindia.com/invest/investor-alerts-advisories",
        "rule_verdict": "FALSE",
        "action_advice": "Disregard unsolicited stock recommendations received on WhatsApp or Telegram. Verify all exchange announcements on nseindia.com."
    },
    {
        "id": "finfact-deepfake-celebrity",
        "authority": "Fin-Fact Benchmark",
        "reference_no": "FF-TAX-2024-01",
        "date": "2024-03-10",
        "title": "Fin-Fact Benchmark: Deceptive Celebrity & Business Leader Deepfake Trading Scams",
        "category": "deepfake_endorsement",
        "keywords": [
            "mukesh ambani", "ratan tata", "narayana murthy", "trading bot", "ai platform", "deepfake",
            "voice clone", "quantum ai", "oil trading", "passive income"
        ],
        "excerpt": (
            "Fin-Fact and fact-checking verification records confirm widespread deepfake video campaigns impersonating "
            "prominent figures (such as Mukesh Ambani, Ratan Tata, or Azim Premji) falsely endorsing automated trading "
            "platforms. Reliance Industries and cyber authorities have officially clarified that such videos are synthesized "
            "AI voice clones designed to steal credit card and bank credentials."
        ),
        "url": "https://www.cybercrime.gov.in",
        "rule_verdict": "FALSE",
        "action_advice": "Never trust videos of public figures endorsing trading apps. Always check official corporate media releases."
    },
    {
        "id": "finfact-cherrypicked-returns",
        "authority": "Fin-Fact Benchmark",
        "reference_no": "FF-TAX-2024-02",
        "date": "2024-02-15",
        "title": "Fin-Fact Benchmark: Cherry-Picked Past Performance as Safety Proof",
        "category": "misleading_context",
        "keywords": [
            "25% last year", "safest investments", "zero market risk", "cherry picked", "bull run",
            "misleading", "proof of safety"
        ],
        "excerpt": (
            "Fin-Fact financial fact-checking taxonomy classifies claims that use isolated high past returns (e.g. 25% in a bull market) "
            "to assert an asset is 'one of the safest investments with zero risk' as MISLEADING. Market-linked equity and hybrid funds "
            "carry systemic volatility; high past returns reflect market conditions rather than guaranteed capital protection."
        ),
        "url": "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=3&smid=0&ssid=2",
        "rule_verdict": "MISLEADING",
        "action_advice": "Evaluate standard deviation, riskometer ratings, and multi-year rolling returns rather than a single year's performance."
    },
    {
        "id": "finfact-outdated-tax-incentive",
        "authority": "Fin-Fact Benchmark",
        "reference_no": "FF-TAX-2024-03",
        "date": "2023-04-01",
        "title": "Fin-Fact Benchmark: Lapsed or Defunct Tax Holiday and Exemption Claims",
        "category": "outdated_scheme",
        "keywords": [
            "outdated", "lapsed", "80ccg", "rajiv gandhi equity savings scheme", "rgess",
            "expired scheme", "defunct interest rate", "8% p.a. guaranteed saving certificate"
        ],
        "excerpt": (
            "Fin-Fact benchmark identifies promotional messages that advertise historically genuine government or tax schemes "
            "(such as the Rajiv Gandhi Equity Savings Scheme Section 80CCG or old 9% savings bonds) that have been formally "
            "withdrawn or expired in subsequent Finance Acts. While not fabricated from scratch, the information is OUTDATED "
            "and cannot be claimed for current investments."
        ),
        "url": "https://incometaxindia.gov.in",
        "rule_verdict": "OUTDATED",
        "action_advice": "Check current Finance Act guidelines and official Income Tax Department rules before claiming tax exemptions."
    }
]
