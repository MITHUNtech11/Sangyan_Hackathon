import type { SupportedLanguage } from '../types';

export interface TranslationStrings {
  header: {
    tagline: string;
    privacyBadge: string;
    selectLanguage: string;
  };
  hero: {
    trackBadge: string;
    titlePart1: string;
    titleHighlight: string;
    subtitle: string;
  };
  demoBar: {
    label: string;
    sublabel: string;
  };
  input: {
    tabScreenshot: string;
    tabText: string;
    tabUrl: string;
    screenshotTitle: string;
    screenshotSubtitle: string;
    chooseFile: string;
    dragDrop: string;
    formats: string;
    analyzingBtn: string;
    analyzeScreenshotBtn: string;
    textPlaceholder: string;
    analyzeTextBtn: string;
    urlPlaceholder: string;
    analyzeUrlBtn: string;
    privacyNotice: string;
  };
  overlay: {
    analyzingTitle: string;
    analyzingSubtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
  };
  result: {
    contentCheck: string;
    checkAnother: string;
    delete: string;
    whatIsClaiming: string;
    explainSimply: string;
    listenAudio: string;
    stopAudio: string;
    speaking: string;
    warningSignals: string;
    detectedClaims: string;
    howDoIVerify: string;
    verificationAction: string;
    whatToVerify: string;
    tickAsYouVerify: string;
    beforeYouAct: string;
    whatCanYouLearn: string;
    readTime: string;
    remember: string;
    learnMore: string;
    showLess: string;
    limitations: string;
    shareWarning: string;
    cardCopied: string;
    important: string;
    intentTitle?: string;
    education?: string;
    promotion?: string;
    deception?: string;
    sellingNotice?: string;
    sebiTitle?: string;
    officialLookup?: string;
    analogyTitle?: string;
    evidenceQuality?: string;
  };
  valueCards: {
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card3Badge: string;
    card3Title: string;
    card3Desc: string;
  };
  footer: {
    copyright: string;
    disclaimer: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  en: {
    header: {
      tagline: 'Understand before you trust',
      privacyBadge: 'Privacy-First • Zero Demat/Bank Logins',
      selectLanguage: 'Language',
    },
    hero: {
      trackBadge: 'Track E — Financial Misinformation & Content Literacy',
      titlePart1: 'Understand before you',
      titleHighlight: 'trust.',
      subtitle:
        'Nambikkai helps Indian retail investors extract claims, identify red flags, and independently verify financial messages before they trust, share, or act.',
    },
    demoBar: {
      label: '1-Click Pitch Demos',
      sublabel: 'Instant interactive test scenarios',
    },
    input: {
      tabScreenshot: 'Screenshot',
      tabText: 'Paste Text',
      tabUrl: 'Web Link',
      screenshotTitle: 'Upload financial screenshot',
      screenshotSubtitle: 'Drop your WhatsApp, Instagram, Telegram, or Ad image here',
      chooseFile: 'Choose Screenshot',
      dragDrop: 'or drag & drop here',
      formats: 'Supports PNG, JPG, WebP • Auto contrast & Tesseract OCR',
      analyzingBtn: 'Analyzing Content...',
      analyzeScreenshotBtn: 'Analyze Screenshot with OCR',
      textPlaceholder:
        "Paste financial message or social media post here (e.g., 'Guaranteed 40% monthly returns. Pay ₹5,000 today to activate your account. Limited slots available!')...",
      analyzeTextBtn: 'Analyze Financial Content',
      urlPlaceholder: 'Enter financial article or promo page URL (https://...)',
      analyzeUrlBtn: 'Fetch & Analyze URL',
      privacyNotice: 'Zero passwords, OTPs, or bank details are stored. In-memory ephemeral processing.',
    },
    overlay: {
      analyzingTitle: 'Analyzing Financial Content',
      analyzingSubtitle: 'Extracting atomic claims and checking against regulatory guardrails...',
      step1: '1. Capturing screenshot & preprocessing image contrast',
      step2: '2. Isolating atomic financial claims & assertions',
      step3: '3. Scanning 5-pillar red flag & manipulation taxonomy',
      step4: '4. Synthesizing multilingual explanation & verification checklist',
    },
    result: {
      contentCheck: 'Content Check',
      checkAnother: 'Check Another',
      delete: 'Delete Analysis',
      whatIsClaiming: 'What is this content saying?',
      explainSimply: 'Explain This Simply',
      listenAudio: 'Listen Voice',
      stopAudio: 'Stop Voice',
      speaking: 'Speaking...',
      warningSignals: 'Warning Signals',
      detectedClaims: 'Detected Financial Claims',
      howDoIVerify: 'How do I verify this?',
      verificationAction: 'Verification Action:',
      whatToVerify: 'What Should You Verify Before Acting?',
      tickAsYouVerify: 'Tick items as you verify them',
      beforeYouAct: 'Before You Act',
      whatCanYouLearn: 'What Can You Learn From This?',
      readTime: '30-60 sec read',
      remember: 'Remember',
      learnMore: 'Learn more about this pattern →',
      showLess: 'Show less ↑',
      limitations: 'System Limitations & Boundaries:',
      shareWarning: 'Share Warning Card',
      cardCopied: 'Fact-Check Summary copied to clipboard!',
      important: 'Important',
    },
    valueCards: {
      card1Badge: '1. Capture & Understand',
      card1Title: 'Screenshot-First Analysis',
      card1Desc:
        'Upload screenshots directly from WhatsApp, Telegram, Instagram, or YouTube to isolate factual vs. promotional claims.',
      card2Badge: '2. Check & Explain',
      card2Title: 'Plain Language & Native Audio',
      card2Desc:
        'Detects manipulation signals (guaranteed returns, urgency, fake SEBI claims) and explains them in 11 Indian languages with audio readout.',
      card3Badge: '3. Verify & Learn',
      card3Title: 'Empowerment Over Censorship',
      card3Desc:
        'Actionable regulatory verification checklists and 30-second micro-lessons build lasting financial literacy without giving stock advice.',
    },
    footer: {
      copyright: 'Nambikkai (நம்பிக்கை) — Sangyan Hackathon 2026 • Track E: Misinformation & Content Literacy',
      disclaimer: 'Does not provide investment advice or stock recommendations.',
    },
  },

  hi: {
    header: {
      tagline: 'विश्वास करने से पहले समझें',
      privacyBadge: 'गोपनीयता प्रथम • शून्य डीमैट/बैंक लॉगिन',
      selectLanguage: 'भाषा',
    },
    hero: {
      trackBadge: 'ट्रैक E — वित्तीय भ्रामक सूचना और सामग्री साक्षरता',
      titlePart1: 'विश्वास करने से पहले',
      titleHighlight: 'समझें।',
      subtitle:
        'नंबिकई भारतीय खुदरा निवेशकों को दावों की जांच करने, लाल झंडों को पहचानने और वित्तीय संदेशों पर कार्रवाई करने से पहले स्वतंत्र रूप से सत्यापित करने में मदद करता है।',
    },
    demoBar: {
      label: '1-क्लिक डेमो परिदृश्य',
      sublabel: 'त्वरित संवादात्मक परीक्षण',
    },
    input: {
      tabScreenshot: 'स्क्रीनशॉट',
      tabText: 'टेक्स्ट पेस्ट करें',
      tabUrl: 'वेब लिंक',
      screenshotTitle: 'वित्तीय स्क्रीनशॉट अपलोड करें',
      screenshotSubtitle: 'अपना व्हाट्सएप, इंस्टाग्राम, टेलीग्राम या विज्ञापन स्क्रीनशॉट यहां छोड़ें',
      chooseFile: 'स्क्रीनशॉट चुनें',
      dragDrop: 'या यहां खींचें और छोड़ें',
      formats: 'PNG, JPG, WebP समर्थित • स्वचालित कंट्रास्ट और OCR',
      analyzingBtn: 'सामग्री का विश्लेषण हो रहा है...',
      analyzeScreenshotBtn: 'OCR के साथ स्क्रीनशॉट का विश्लेषण करें',
      textPlaceholder:
        'वित्तीय संदेश या सोशल मीडिया पोस्ट यहां पेस्ट करें (उदा. गारंटीड 40% मासिक रिटर्न। खाता सक्रिय करने के लिए आज ही ₹5,000 का भुगतान करें)...',
      analyzeTextBtn: 'वित्तीय सामग्री का विश्लेषण करें',
      urlPlaceholder: 'वित्तीय लेख या पोस्ट URL दर्ज करें (https://...)',
      analyzeUrlBtn: 'URL प्राप्त करें और विश्लेषण करें',
      privacyNotice: 'कोई पासवर्ड, ओटीपी या बैंक विवरण संग्रहीत नहीं किया जाता। अल्पकालिक इन-मेमोरी प्रसंस्करण।',
    },
    overlay: {
      analyzingTitle: 'वित्तीय सामग्री का विश्लेषण',
      analyzingSubtitle: 'दावों को निकालना और विनियामक दिशानिर्देशों के अनुसार जांचना...',
      step1: '1. स्क्रीनशॉट कैप्चर और इमेज कंट्रास्ट प्रीप्रोसेसिंग',
      step2: '2. वित्तीय दावों और बयानों को अलग करना',
      step3: '3. 5-स्तंभ हेरफेर और चेतावनी संकेतों की स्कैनिंग',
      step4: '4. बहुभाषी व्याख्या और सत्यापन चेकलिस्ट तैयार करना',
    },
    result: {
      contentCheck: 'सामग्री जांच',
      checkAnother: 'दूसरा जांचें',
      delete: 'विश्लेषण हटाएं',
      whatIsClaiming: 'यह सामग्री क्या दावा कर रही है?',
      explainSimply: 'सरल भाषा में समझें',
      listenAudio: 'आवाज में सुनें',
      stopAudio: 'आवाज रोकें',
      speaking: 'सुनाई दे रहा है...',
      warningSignals: 'चेतावनी संकेत',
      detectedClaims: 'पाए गए वित्तीय दावे',
      howDoIVerify: 'मैं इसे कैसे सत्यापित करूं?',
      verificationAction: 'सत्यापन कार्रवाई:',
      whatToVerify: 'कदम उठाने से पहले क्या सत्यापित करें?',
      tickAsYouVerify: 'सत्यापन के साथ टिक करें',
      beforeYouAct: 'कदम उठाने से पहले',
      whatCanYouLearn: 'इससे आप क्या सीख सकते हैं?',
      readTime: '30-60 सेकंड पठन',
      remember: 'याद रखें',
      learnMore: 'इस पैटर्न के बारे में और जानें →',
      showLess: 'कम दिखाएं ↑',
      limitations: 'प्रणाली सीमाएं और दायरा:',
      shareWarning: 'चेतावनी कार्ड साझा करें',
      cardCopied: 'तथ्य-जांच सारांश क्लिपबोर्ड पर कॉपी किया गया!',
      important: 'महत्वपूर्ण',
    },
    valueCards: {
      card1Badge: '1. कैप्चर और समझें',
      card1Title: 'स्क्रीनशॉट-प्रथम विश्लेषण',
      card1Desc:
        'तथ्यात्मक बनाम प्रचार दावों को अलग करने के लिए व्हाट्सएप, टेलीग्राम या यूट्यूब से सीधे स्क्रीनशॉट अपलोड करें।',
      card2Badge: '2. जांच और व्याख्या',
      card2Title: 'सरल भाषा और भारतीय आवाज',
      card2Desc:
        'हेरफेर संकेतों का पता लगाता है और आवाज के साथ 11 भारतीय भाषाओं में सरल व्याख्या प्रदान करता है।',
      card3Badge: '3. सत्यापन और सीखें',
      card3Title: 'सेंसरशिप के बजाय सशक्तिकरण',
      card3Desc:
        'कार्रवाई योग्य सेबी सत्यापन चेकलिस्ट और 30-सेकंड के सूक्ष्म पाठ बिना स्टॉक सलाह दिए वित्तीय साक्षरता बनाते हैं।',
    },
    footer: {
      copyright: 'नंबिकई (Nambikkai) — संज्ञान हैकाथॉन 2026 • ट्रैक E: भ्रामक सूचना और सामग्री साक्षरता',
      disclaimer: 'यह निवेश सलाह या स्टॉक सिफारिशें प्रदान नहीं करता है।',
    },
  },

  bn: {
    header: {
      tagline: 'বিশ্বাস করার আগে বুঝুন',
      privacyBadge: 'গোপনীয়তা প্রথম • শূন্য ডিম্যাট/ব্যাঙ্ক লগইন',
      selectLanguage: 'ভাষা',
    },
    hero: {
      trackBadge: 'ট্র্যাক E — আর্থিক ভুল তথ্য এবং বিষয়বস্তু সাক্ষরতা',
      titlePart1: 'বিশ্বাস করার আগে',
      titleHighlight: 'বুঝুন।',
      subtitle:
        'নম্বিক্কাই ভারতীয় বিনিয়োগকারীদের দাবি বিশ্লেষণ করতে, প্রতারণার লক্ষণ চিহ্নিত করতে এবং স্বাধীনভাবে যাচাই করতে সহায়তা করে।',
    },
    demoBar: {
      label: '১-ক্লিক ডেমো',
      sublabel: 'তাত্ক্ষণিক ইন্টারেক্টিভ দৃশ্যকল্প',
    },
    input: {
      tabScreenshot: 'স্ক্রিনশট',
      tabText: 'টেক্সট পেস্ট করুন',
      tabUrl: 'ওয়েব লিংক',
      screenshotTitle: 'আর্থিক স্ক্রিনশট আপলোড করুন',
      screenshotSubtitle: 'হোয়াটসঅ্যাপ বা সোশ্যাল মিডিয়া স্ক্রিনশট এখানে ড্রপ করুন',
      chooseFile: 'স্ক্রিনশট বেছে নিন',
      dragDrop: 'অথবা এখানে ড্র্যাগ ও ড্রপ করুন',
      formats: 'PNG, JPG, WebP সমর্থিত • অটো বৈসাদৃশ্য ও OCR',
      analyzingBtn: 'বিশ্লেষণ করা হচ্ছে...',
      analyzeScreenshotBtn: 'OCR দিয়ে স্ক্রিনশট বিশ্লেষণ করুন',
      textPlaceholder: 'আর্থিক বার্তা বা পোস্টের টেক্সট এখানে পেস্ট করুন...',
      analyzeTextBtn: 'আর্থিক তথ্য বিশ্লেষণ করুন',
      urlPlaceholder: 'আর্থিক নিবন্ধের লিঙ্ক লিখুন (https://...)',
      analyzeUrlBtn: 'লিঙ্ক বিশ্লেষণ করুন',
      privacyNotice: 'কোনো পাসওয়ার্ড বা ব্যাঙ্ক বিবরণ সংরক্ষিত হয় না।',
    },
    overlay: {
      analyzingTitle: 'বিষয়বস্তু বিশ্লেষণ চলছে',
      analyzingSubtitle: 'দাবি নিষ্কাশন এবং নিয়ন্ত্রক বিধিমালার সাথে যাচাইকরণ...',
      step1: '১. স্ক্রিনশট ক্যাপচার এবং প্রসেসিং',
      step2: '২. আর্থিক দাবিগুলো পৃথকীকরণ',
      step3: '৩. প্রতারণা ও কারচুপির সংকেত অনুসন্ধান',
      step4: '৪. বহুভাষিক ব্যাখ্যা ও চেকলিস্ট প্রস্তুতকরণ',
    },
    result: {
      contentCheck: 'বিষয়বস্তু পরীক্ষা',
      checkAnother: 'অন্য একটি পরীক্ষা করুন',
      delete: 'মুছে ফেলুন',
      whatIsClaiming: 'এই বার্তায় কী দাবি করা হচ্ছে?',
      explainSimply: 'সহজ ভাষায় বুঝুন',
      listenAudio: 'কণ্ঠে শুনুন',
      stopAudio: 'থামান',
      speaking: 'বলছে...',
      warningSignals: 'সতর্কতার লক্ষণ',
      detectedClaims: 'শনাক্তকৃত আর্থিক দাবি',
      howDoIVerify: 'কীভাবে যাচাই করবেন?',
      verificationAction: 'যাচাইকরণ পদক্ষেপ:',
      whatToVerify: 'পদক্ষেপ নেওয়ার আগে কী যাচাই করবেন?',
      tickAsYouVerify: 'যাচাই শেষে টিক দিন',
      beforeYouAct: 'পদক্ষেপ নেওয়ার আগে সতর্কতা',
      whatCanYouLearn: 'এ থেকে কী শিখবেন?',
      readTime: '৩০-৬০ সেকেন্ড পাঠ',
      remember: 'মনে রাখবেন',
      learnMore: 'বিস্তারিত জানুন →',
      showLess: 'সংক্ষেপ করুন ↑',
      limitations: 'সিস্টেমের সীমাবদ্ধতা:',
      shareWarning: 'সতর্কতা কার্ড শেয়ার করুন',
      cardCopied: 'ক্লিপবোর্ডে কপি করা হয়েছে!',
      important: 'গুরুত্বপূর্ণ',
    },
    valueCards: {
      card1Badge: '১. ক্যাপচার ও বুঝুন',
      card1Title: 'স্ক্রিনশট বিশ্লেষণ',
      card1Desc: 'হোয়াটসঅ্যাপ বা টেলিগ্রাম থেকে সরাসরি স্ক্রিনশট আপলোড করে দাবিগুলো পরীক্ষা করুন।',
      card2Badge: '২. পরীক্ষা ও ব্যাখ্যা',
      card2Title: 'সহজ ভাষা ও ভয়েস রিডআউট',
      card2Desc: 'প্রতারণার লক্ষণ শনাক্ত করে এবং ভারতীয় ভাষায় অডিওসহ সহজ ব্যাখ্যা প্রদান করে।',
      card3Badge: '৩. যাচাই ও শিক্ষা',
      card3Title: 'সচেতনতা বৃদ্ধি',
      card3Desc: 'নিয়ন্ত্রক চেকলিস্ট এবং মাইক্রো-লেসনের মাধ্যমে টেকসই আর্থিক সাক্ষরতা গড়ে তোলে।',
    },
    footer: {
      copyright: 'নম্বিক্কাই (Nambikkai) — সংজ্ঞান হ্যাকাথন ২০২৬ • ট্র্যাক E',
      disclaimer: 'এটি কোনো স্টক সুপারিশ বা বিনিয়োগ পরামর্শ প্রদান করে না।',
    },
  },

  mr: {
    header: {
      tagline: 'विश्वास ठेवण्यापूर्वी समजून घ्या',
      privacyBadge: 'गोपनीयता प्रथम • शून्य डिमॅट/बँक लॉगिन',
      selectLanguage: 'भाषा',
    },
    hero: {
      trackBadge: 'ट्रॅक E — आर्थिक दिशाभूल आणि सामग्री साक्षरता',
      titlePart1: 'विश्वास ठेवण्यापूर्वी',
      titleHighlight: 'समजून घ्या.',
      subtitle:
        'नंबिक्कई भारतीय गुंतवणूकदारांना दावे तपासण्यास, संशयास्पद बाबी ओळखण्यास आणि स्वतंत्रपणे पडताळणी करण्यास मदत करते.',
    },
    demoBar: {
      label: '१-क्लिक डेमो',
      sublabel: 'त्वरित संवादात्मक परिस्थिती',
    },
    input: {
      tabScreenshot: 'स्क्रीनशॉट',
      tabText: 'मजकूर पेस्ट करा',
      tabUrl: 'वेब लिंक',
      screenshotTitle: 'आर्थिक स्क्रीनशॉट अपलोड करा',
      screenshotSubtitle: 'तुमचा व्हॉट्सॲप, इन्स्टाग्राम किंवा टेलिग्राम स्क्रीनशॉट येथे टाका',
      chooseFile: 'स्क्रीनशॉट निवडा',
      dragDrop: 'किंवा येथे ड्रॅग आणि ड्रॉप करा',
      formats: 'PNG, JPG, WebP समर्थित • स्वयंचलित कॉन्ट्रास्ट आणि OCR',
      analyzingBtn: 'विश्लेषण चालू आहे...',
      analyzeScreenshotBtn: 'OCR सह स्क्रीनशॉट तपासा',
      textPlaceholder: 'आर्थिक संदेश किंवा पोस्ट येथे पेस्ट करा...',
      analyzeTextBtn: 'आर्थिक माहिती तपासा',
      urlPlaceholder: 'वेब लिंक टाका (https://...)',
      analyzeUrlBtn: 'लिंक तपासा',
      privacyNotice: 'कोणतेही पासवर्ड किंवा बँक तपशील साठवले जात नाहीत.',
    },
    overlay: {
      analyzingTitle: 'सामग्रीचे विश्लेषण',
      analyzingSubtitle: 'दावे काढणे आणि नियमावलीनुसार तपासणे...',
      step1: '१. स्क्रीनशॉट कॅप्चर आणि प्रीप्रोसेसिंग',
      step2: '२. आर्थिक दावे वेगळे करणे',
      step3: '३. फसवणुकीचे धोके ओळखणे',
      step4: '४. बहुभाषिक स्पष्टीकरण आणि पडताळणी यादी तयार करणे',
    },
    result: {
      contentCheck: 'सामग्री तपासणी',
      checkAnother: 'दुसरे तपासा',
      delete: 'विश्लेषण हटवा',
      whatIsClaiming: 'हा संदेश काय सांगत आहे?',
      explainSimply: 'सोप्या भाषेत समजून घ्या',
      listenAudio: 'आवाजात ऐका',
      stopAudio: 'थांबवा',
      speaking: 'ऐकवत आहे...',
      warningSignals: 'धोक्याचे संकेत',
      detectedClaims: 'आढळलेले आर्थिक दावे',
      howDoIVerify: 'पडताळणी कशी करावी?',
      verificationAction: 'पडताळणी कृती:',
      whatToVerify: 'कृती करण्यापूर्वी काय तपासावे?',
      tickAsYouVerify: 'तपासणीनंतर खूण करा',
      beforeYouAct: 'कृती करण्यापूर्वी दक्षता',
      whatCanYouLearn: 'यावरून काय शिकाल?',
      readTime: '३०-६० सेकंद वाचन',
      remember: 'लक्षात ठेवा',
      learnMore: 'अधिक जाणून घ्या →',
      showLess: 'कमी दाखवा ↑',
      limitations: 'प्रणालीच्या मर्यादा:',
      shareWarning: 'चेतावणी कार्ड शेअर करा',
      cardCopied: 'क्लिपबोर्डवर कॉपी केले!',
      important: 'महत्त्वाचे',
    },
    valueCards: {
      card1Badge: '१. कॅप्चर आणि समजून घ्या',
      card1Title: 'स्क्रीनशॉट-प्रथम विश्लेषण',
      card1Desc: 'दावे तपासण्यासाठी सोशल मीडियावरील स्क्रीनशॉट थेट अपलोड करा.',
      card2Badge: '२. तपासणी आणि स्पष्टीकरण',
      card2Title: 'सोपी भाषा आणि मराठी आवाज',
      card2Desc: 'धोक्याचे संकेत शोधून भारतीय भाषांमध्ये आवाजासह सोपे स्पष्टीकरण देते.',
      card3Badge: '३. पडताळणी आणि शिका',
      card3Title: 'सक्षमीकरण',
      card3Desc: 'सेबी पडताळणी यादी आणि लहान धड्यांद्वारे आर्थिक साक्षरता निर्माण करते.',
    },
    footer: {
      copyright: 'नंबिक्कई (Nambikkai) — संज्ञान हॅकाथॉन २०२६ • ट्रॅक E',
      disclaimer: 'कोणतीही गुंतवणूक सल्ला किंवा शेअर्सच्या शिफारशी देत नाही.',
    },
  },

  te: {
    header: {
      tagline: 'నమ్మే ముందు అర్థం చేసుకోండి',
      privacyBadge: 'గోప్యత ప్రథమం • డీమ్యాట్/బ్యాంక్ లాగిన్ అవసరం లేదు',
      selectLanguage: 'భాష',
    },
    hero: {
      trackBadge: 'ట్రాక్ E — ఆర్థిక తప్పుడు సమాచారం & కంటెంట్ అక్షరాస్యత',
      titlePart1: 'నమ్మే ముందు',
      titleHighlight: 'అర్థం చేసుకోండి.',
      subtitle:
        'నంబిక్కై భారతీయ రిటైల్ ఇన్వెస్టర్లు వాదనలను విశ్లేషించడానికి, మోసపూరిత సంకేతాలను గుర్తించడానికి మరియు స్వతంత్రంగా ధృవీకరించడానికి సహాయపడుతుంది.',
    },
    demoBar: {
      label: '1-క్లిక్ డెమోలు',
      sublabel: 'తక్షణ ఇంటరాక్టివ్ పరీక్షలు',
    },
    input: {
      tabScreenshot: 'స్క్రీన్‌షాట్',
      tabText: 'టెక్స్ట్ పేస్ట్ చేయండి',
      tabUrl: 'వెబ్ లింక్',
      screenshotTitle: 'ఆర్థిక స్క్రీన్‌షాట్ అప్‌లోడ్ చేయండి',
      screenshotSubtitle: 'మీ వాట్సాప్, ఇన్‌స్టాగ్రామ్ లేదా టెలిగ్రామ్ స్క్రీన్‌షాట్‌ను ఇక్కడ డ్రాప్ చేయండి',
      chooseFile: 'స్క్రీన్‌షాట్‌ను ఎంచుకోండి',
      dragDrop: 'లేదా ఇక్కడ లాగండి & వదలండి',
      formats: 'PNG, JPG, WebP సపోర్ట్ • ఆటో కాంట్రాస్ట్ మరియు OCR',
      analyzingBtn: 'విశ్లేషిస్తోంది...',
      analyzeScreenshotBtn: 'OCRతో స్క్రీన్‌షాట్‌ను విశ్లేషించండి',
      textPlaceholder: 'ఆర్థిక సందేశం లేదా సోషల్ మీడియా పోస్ట్‌ను ఇక్కడ పేస్ట్ చేయండి...',
      analyzeTextBtn: 'కంటెంట్‌ను విశ్లేషించండి',
      urlPlaceholder: 'వెబ్ లింక్ నమోదు చేయండి (https://...)',
      analyzeUrlBtn: 'లింక్‌ను విశ్లేషించండి',
      privacyNotice: 'పాస్‌వర్డ్‌లు లేదా బ్యాంక్ వివరాలు నిల్వ చేయబడవు.',
    },
    overlay: {
      analyzingTitle: 'విశ్లేషణ జరుగుతోంది',
      analyzingSubtitle: 'వాదనలను సేకరించడం మరియు నిబంధనలకు అనుగుణంగా తనిఖీ చేయడం...',
      step1: '1. స్క్రీన్‌షాట్ క్యాప్చర్ మరియు ఇమేజ్ ప్రాసెసింగ్',
      step2: '2. ఆర్థిక వాదనలను వేరు చేయడం',
      step3: '3. 5-స్తంభాల మోసపూరిత సంకేతాల స్కానింగ్',
      step4: '4. బహుభాషా వివరణ మరియు చెక్‌లిస్ట్ సంశ్లేషణ',
    },
    result: {
      contentCheck: 'కంటెంట్ తనిఖీ',
      checkAnother: 'మరొకటి తనిఖీ చేయండి',
      delete: 'విశ్లేషణను తొలగించండి',
      whatIsClaiming: 'ఈ సందేశం ఏమి చెబుతోంది?',
      explainSimply: 'సులభంగా అర్థం చేసుకోండి',
      listenAudio: 'వాయిస్ వినండి',
      stopAudio: 'ఆపండి',
      speaking: 'మాట్లాడుతోంది...',
      warningSignals: 'హెచ్చరిక సంకేతాలు',
      detectedClaims: 'గుర్తించబడిన ఆర్థిక వాదనలు',
      howDoIVerify: 'దీన్ని ఎలా ధృవీకరించాలి?',
      verificationAction: 'ధృవీకరణ చర్య:',
      whatToVerify: 'నిర్ణయానికి ముందు ఏమి ధృవీకరించాలి?',
      tickAsYouVerify: 'ధృవీకరించిన తర్వాత టిక్ చేయండి',
      beforeYouAct: 'నిర్ణయం తీసుకునే ముందు హెచ్చరిక',
      whatCanYouLearn: 'దీని నుండి మీరు ఏమి నేర్చుకోవచ్చు?',
      readTime: '30-60 సెకన్ల చదువు',
      remember: 'గుర్తుంచుకోండి',
      learnMore: 'మరింత తెలుసుకోండి →',
      showLess: 'తక్కువ చూపించు ↑',
      limitations: 'సిస్టమ్ పరిమితులు:',
      shareWarning: 'హెచ్చరిక కార్డ్ భాగస్వామ్యం చేయండి',
      cardCopied: 'సారాంశం కాపీ చేయబడింది!',
      important: 'ముఖ్యమైనది',
    },
    valueCards: {
      card1Badge: '1. క్యాప్చర్ & అర్థం చేసుకోండి',
      card1Title: 'స్క్రీన్‌షాట్ విశ్లేషణ',
      card1Desc: 'వాట్సాప్ లేదా టెలిగ్రామ్ నుండి నేరుగా స్క్రీన్‌షాట్‌లను అప్‌లోడ్ చేసి వాదనలను తనిఖీ చేయండి.',
      card2Badge: '2. తనిఖీ & వివరణ',
      card2Title: 'సరళమైన భాష & తెలుగు వాయిస్',
      card2Desc: 'మోసపూరిత సంకేతాలను గుర్తించి తెలుగులో ఆడియోతో సులభమైన వివరణను అందిస్తుంది.',
      card3Badge: '3. ధృవీకరణ & నేర్చుకోండి',
      card3Title: 'సాధికారత',
      card3Desc: 'సెబీ చెక్‌లిస్ట్‌లు మరియు చిన్న పాఠాల ద్వారా దీర్ఘకాలిక ఆర్థిక అక్షరాస్యతను నిర్మిస్తుంది.',
    },
    footer: {
      copyright: 'నంబిక్కై (Nambikkai) — సంజ్ఞాన్ హ్యాకథాన్ 2026 • ట్రాక్ E',
      disclaimer: 'ఇది ఎటువంటి పెట్టుబడి సలహాలను లేదా స్టాక్ సిఫార్సులను అందించదు.',
    },
  },

  ta: {
    header: {
      tagline: 'நம்புவதற்கு முன் புரிந்துகொள்ளுங்கள்',
      privacyBadge: 'தனியுரிமைக்கு முதலிடம் • Demat/வங்கி உள்நுழைவு தேவையில்லை',
      selectLanguage: 'மொழி',
    },
    hero: {
      trackBadge: 'Track E — நிதி தவறான தகவல்கள் மற்றும் உள்ளடக்க விழிப்புணர்வு',
      titlePart1: 'நம்புவதற்கு முன்',
      titleHighlight: 'புரிந்துகொள்ளுங்கள்.',
      subtitle:
        'சமூக ஊடகங்கள் மற்றும் வாட்ஸ்அப்பில் நீங்கள் காணும் நிதித் தகவல்களை ஆராய்ந்து, அதில் உள்ள அபாயங்களை எளிதில் புரிந்துகொள்ள உதவும் விழிப்புணர்வு தளம்.',
    },
    demoBar: {
      label: '1-கிளிக் டெமோ காட்சிகள்',
      sublabel: 'உடனடி நேரடி மாதிரி சோதனைகள்',
    },
    input: {
      tabScreenshot: 'ஸ்கிரீன்ஷாட்',
      tabText: 'உரையை ஒட்டுக',
      tabUrl: 'இணைய இணைப்பு',
      screenshotTitle: 'நிதி தொடர்பான ஸ்கிரீன்ஷாட்டை பதிவேற்றவும்',
      screenshotSubtitle: 'உங்கள் WhatsApp, Instagram அல்லது Telegram ஸ்கிரீன்ஷாட்டை இங்கே பதிவேற்றவும்',
      chooseFile: 'படத்தை தேர்ந்தெடுக்கவும்',
      dragDrop: 'அல்லது இங்கே இழுத்து விடவும்',
      formats: 'PNG, JPG, WebP ஆதரிக்கப்படுகிறது • தானியங்கி மாறுபாடு மற்றும் OCR',
      analyzingBtn: 'செய்தி ஆராயப்படுகிறது...',
      analyzeScreenshotBtn: 'OCR மூலம் ஸ்கிரீன்ஷாட்டை ஆராய்க',
      textPlaceholder:
        "சமூக ஊடக பதிவை இங்கே ஒட்டவும் (எ.கா: 'மாதம் 40% உத்தரவாத லாபம். கணக்கை தொடங்க இன்றே ₹5,000 செலுத்தவும்')...",
      analyzeTextBtn: 'உரையை ஆராய்க',
      urlPlaceholder: 'இணையதள முகவரியை உள்ளிடவும் (https://...)',
      analyzeUrlBtn: 'இணைப்பை ஆராய்க',
      privacyNotice: 'கடவுச்சொற்கள் அல்லது வங்கி விவரங்கள் எதுவும் சேமிக்கப்படாது.',
    },
    overlay: {
      analyzingTitle: 'செய்தி ஆராயப்படுகிறது',
      analyzingSubtitle: 'தகவல்களைப் பிரித்தெடுத்து வழிகாட்டுதல்களின்படி சரிபார்க்கிறது...',
      step1: '1. ஸ்கிரீன்ஷாட் பட செயலாக்கம் மற்றும் OCR உரை எடுப்பு',
      step2: '2. நிதி உரிமைகோரல்களைத் தனிமைப்படுத்துதல்',
      step3: '3. 5-தூண் மோசடி மற்றும் எச்சரிக்கை அறிகுறிகளை ஸ்கேன் செய்தல்',
      step4: '4. எளிய தமிழ் விளக்கம் மற்றும் சரிபார்ப்பு பட்டியல் தொகுத்தல்',
    },
    result: {
      contentCheck: 'உள்ளடக்க சோதனை',
      checkAnother: 'மற்றொன்றை சோதிக்க',
      delete: 'முடிவுகளை நீக்கு',
      whatIsClaiming: 'இந்த செய்தி என்ன கூறுகிறது?',
      explainSimply: 'எளிய விளக்கம்',
      listenAudio: 'குரலில் கேட்க',
      stopAudio: 'நிறுத்து',
      speaking: 'பேசுகிறது...',
      warningSignals: 'எச்சரிக்கை அறிகுறிகள்',
      detectedClaims: 'கண்டறியப்பட்ட நிதி கோரிக்கைகள்',
      howDoIVerify: 'இதை எவ்வாறு சரிபார்ப்பது?',
      verificationAction: 'சரிபார்ப்பு செயல்முறை:',
      whatToVerify: 'முடிவெடுக்கும் முன் எதைச் சரிபார்க்க வேண்டும்?',
      tickAsYouVerify: 'சரிபார்த்தவுடன் டிக் செய்யவும்',
      beforeYouAct: 'செயல்படும் முன் எச்சரிக்கை',
      whatCanYouLearn: 'இதிலிருந்து என்ன கற்றுக்கொள்ளலாம்?',
      readTime: '30-60 வினாடி வாசிப்பு',
      remember: 'நினைவில் கொள்க',
      learnMore: 'இந்த உத்தியைப் பற்றி மேலும் அறிய →',
      showLess: 'குறைவாகக் காட்டு ↑',
      limitations: 'கணினி வரம்புகள் மற்றும் எல்லைகள்:',
      shareWarning: 'எச்சரிக்கை அட்டையைப் பகிர்க',
      cardCopied: 'சுருக்கம் நகலெடுக்கப்பட்டது!',
      important: 'முக்கியம்',
    },
    valueCards: {
      card1Badge: '1. பதிவேற்றி புரிந்து கொள்ளுங்கள்',
      card1Title: 'ஸ்கிரீன்ஷாட் அடிப்படையிலான பகுப்பாய்வு',
      card1Desc: 'வாட்ஸ்அப் அல்லது டெலிகிராமில் வரும் ஸ்கிரீன்ஷாட்களை நேரடியாகப் பதிவேற்றி ஆராயலாம்.',
      card2Badge: '2. சரிபார்த்து விளக்குதல்',
      card2Title: 'எளிய தமிழ் மற்றும் குரல் வடிவம்',
      card2Desc: 'அபாயகரமான உத்திகளைக் கண்டறிந்து, தமிழில் ஆடியோவுடன் எளிய விளக்கத்தை வழங்குகிறது.',
      card3Badge: '3. சுயமாக சரிபாருங்கள்',
      card3Title: 'தடைக்கு பதிலாக விழிப்புணர்வு',
      card3Desc: 'பங்கு பரிந்துரைகள் வழங்காமல், SEBI சரிபார்ப்பு பட்டியல்கள் மூலம் முதலீட்டுப் பாதுகாப்பை உறுதி செய்கிறது.',
    },
    footer: {
      copyright: 'நம்பிக்கை (Nambikkai) — சஞ்யான் ஹேக்கத்தான் 2026 • Track E',
      disclaimer: 'இது முதலீட்டு ஆலோசனையையோ அல்லது பங்கு பரிந்துரைகளையோ வழங்காது.',
    },
  },

  gu: {
    header: {
      tagline: 'વિશ્વાસ કરતાં પહેલાં સમજો',
      privacyBadge: 'ગોપનીયતા પ્રથમ • શૂન્ય ડીમેટ/બેંક લોગિન',
      selectLanguage: 'ભાષા',
    },
    hero: {
      trackBadge: 'ટ્રેક E — નાણાકીય ભ્રામક માહિતી અને સાક્ષરતા',
      titlePart1: 'વિશ્વાસ કરતાં પહેલાં',
      titleHighlight: 'સમજો.',
      subtitle:
        'નંબિક્કાઈ ભારતીય રોકાણકારોને દાવાઓ તપાસવા, લાલ ઝંડા ઓળખવા અને સ્વતંત્ર રીતે ચકાસવામાં મદદ કરે છે.',
    },
    demoBar: {
      label: '૧-ક્લિક ડેમો',
      sublabel: 'ત્વરિત ઇન્ટરેક્ટિવ દૃશ્યો',
    },
    input: {
      tabScreenshot: 'સ્ક્રીનશોટ',
      tabText: 'ટેક્સ્ટ પેસ્ટ કરો',
      tabUrl: 'વેબ લિંક',
      screenshotTitle: 'નાણાકીય સ્ક્રીનશોટ અપલોડ કરો',
      screenshotSubtitle: 'તમારો વોટ્સએપ કે સોશિયલ મીડિયા સ્ક્રીનશોટ અહીં મૂકો',
      chooseFile: 'સ્ક્રીનશોટ પસંદ કરો',
      dragDrop: 'અથવા અહીં ખેંચો અને છોડો',
      formats: 'PNG, JPG, WebP સપોર્ટેડ • ઓટો કોન્ટ્રાસ્ટ અને OCR',
      analyzingBtn: 'વિશ્લેષણ થઈ રહ્યું છે...',
      analyzeScreenshotBtn: 'OCR સાથે સ્ક્રીનશોટ તપાસો',
      textPlaceholder: 'સંદેશ અથવા પોસ્ટ અહીં પેસ્ટ કરો...',
      analyzeTextBtn: 'માહિતીનું વિશ્લેષણ કરો',
      urlPlaceholder: 'વેબ લિંક દાખલ કરો (https://...)',
      analyzeUrlBtn: 'લિંક તપાસો',
      privacyNotice: 'કોઈ પાસવર્ડ કે બેંક વિગતો સંગ્રહિત થતી નથી.',
    },
    overlay: {
      analyzingTitle: 'વિશ્લેષણ પ્રક્રિયા',
      analyzingSubtitle: 'દાવાઓ અલગ કરવા અને નિયમો મુજબ ચકાસણી કરવી...',
      step1: '૧. સ્ક્રીનશોટ પ્રોસેસિંગ અને ટેક્સ્ટ ઓળખ',
      step2: '૨. નાણાકીય દાવાઓ અલગ કરવા',
      step3: '૩. છેતરપિંડીના સંકેતો તપાસવા',
      step4: '૪. બહુભાષી સમજૂતી અને ચકાસણી યાદી તૈયાર કરવી',
    },
    result: {
      contentCheck: 'સામગ્રી ચકાસણી',
      checkAnother: 'બીજું તપાસો',
      delete: 'વિશ્લેષણ કાઢી નાખો',
      whatIsClaiming: 'આ સંદેશ શું દાવો કરે છે?',
      explainSimply: 'સરળ ભાષામાં સમજો',
      listenAudio: 'અવાજમાં સાંભળો',
      stopAudio: 'અટકાવો',
      speaking: 'બોલી રહ્યું છે...',
      warningSignals: 'ચેતવણી સંકેતો',
      detectedClaims: 'મળેલા નાણાકીય દાવાઓ',
      howDoIVerify: 'ચકાસણી કેવી રીતે કરવી?',
      verificationAction: 'ચકાસણી પગલું:',
      whatToVerify: 'પગલાં ભરતાં પહેલાં શું ચકાસવું?',
      tickAsYouVerify: 'ચકાસણી પછી ટીક કરો',
      beforeYouAct: 'નિર્ણય લેતાં પહેલાં સાવચેતી',
      whatCanYouLearn: 'આના પરથી શું શીખી શકાય?',
      readTime: '૩૦-૬૦ સેકન્ડ વાંચન',
      remember: 'યાદ રાખો',
      learnMore: 'વધુ જાણો →',
      showLess: 'ઓછું બતાવો ↑',
      limitations: 'સિસ્ટમ મર્યાદાઓ:',
      shareWarning: 'ચેતવણી કાર્ડ શેર કરો',
      cardCopied: 'ક્લિપબોર્ડ પર કૉપિ કર્યું!',
      important: 'મહત્વપૂર્ણ',
    },
    valueCards: {
      card1Badge: '૧. કેપ્ચર અને સમજો',
      card1Title: 'સ્ક્રીનશોટ વિશ્લેષણ',
      card1Desc: 'વોટ્સએપ કે ટેલિગ્રામ પરથી સીધા સ્ક્રીનશોટ અપલોડ કરીને દાવા તપાસો.',
      card2Badge: '૨. તપાસ અને સમજૂતી',
      card2Title: 'સરળ ભાષા અને ગુજરાતી અવાજ',
      card2Desc: 'છેતરપિંડી ઓળખીને ભારતીય ભાષાઓમાં ઓડિયો સાથે સરળ સમજૂતી આપે છે.',
      card3Badge: '૩. ચકાસો અને શીખો',
      card3Title: 'સશક્તિકરણ',
      card3Desc: 'સેબી ચકાસણી યાદીઓ અને નાના પાઠ દ્વારા નાણાકીય સાક્ષરતા બનાવે છે.',
    },
    footer: {
      copyright: 'નંબિક્કાઈ (Nambikkai) — સંજ્ઞાન હેકાથોન ૨૦૨૬ • ટ્રેક E',
      disclaimer: 'આ કોઈ રોકાણ સલાહ કે સ્ટોકની ભલામણ આપતું નથી.',
    },
  },

  ur: {
    header: {
      tagline: 'اعتماد کرنے سے پہلے سمجھیں',
      privacyBadge: 'رازداری اولین ترجیح • کوئی لاگ ان درکار نہیں',
      selectLanguage: 'زبان',
    },
    hero: {
      trackBadge: 'ٹریک E — مالیاتی گمراہ کن معلومات اور شعور',
      titlePart1: 'اعتماد کرنے سے پہلے',
      titleHighlight: 'سمجھیں۔',
      subtitle:
        'نمبیکئی ہندوستانی سرمایہ کاروں کو دھوکہ دہی کے اشارے پہچاننے اور دعووں کی آزادانہ تصدیق کرنے میں مدد فراہم کرتی ہے۔',
    },
    demoBar: {
      label: '1-کلک ڈیمو',
      sublabel: 'فوری انٹرایکٹو منظرنامے',
    },
    input: {
      tabScreenshot: 'اسکرین شاٹ',
      tabText: 'متن چسپاں کریں',
      tabUrl: 'ویب لنک',
      screenshotTitle: 'مالیاتی اسکرین شاٹ اپ لوڈ کریں',
      screenshotSubtitle: 'اپنا واٹس ایپ یا سوشل میڈیا اسکرین شاٹ یہاں ڈالیں',
      chooseFile: 'اسکرین شاٹ منتخب کریں',
      dragDrop: 'یا یہاں گھسیٹ کر چھوڑیں',
      formats: 'PNG, JPG, WebP سپورٹ • خودکار کنٹ్రాسٹ اور OCR',
      analyzingBtn: 'تجزیہ ہو رہا ہے...',
      analyzeScreenshotBtn: 'OCR کے ساتھ تجزیہ کریں',
      textPlaceholder: 'مالیاتی پیغام یا پوسٹ کا متن یہاں چسپاں کریں...',
      analyzeTextBtn: 'متن کا تجزیہ کریں',
      urlPlaceholder: 'ویب لنک درج کریں (https://...)',
      analyzeUrlBtn: 'لنک کا تجزیہ کریں',
      privacyNotice: 'کوئی پاس ورڈ یا بینک کی تفصیلات محفوظ نہیں کی جاتیں۔',
    },
    overlay: {
      analyzingTitle: 'تجزیہ جاری ہے',
      analyzingSubtitle: 'دعووں کو نکالنا اور ضوابط کے مطابق جانچنا...',
      step1: '1. اسکرین شاٹ پروسیسنگ اور متن کی شناخت',
      step2: '2. مالیاتی دعووں کو الگ کرنا',
      step3: '3. دھوکہ دہی کے اشاروں کی جانچ',
      step4: '4. کثیر لسانی وضاحت اور تصدیقی فہرست کی تیاری',
    },
    result: {
      contentCheck: 'مواد کی جانچ',
      checkAnother: 'دوسرا چیک کریں',
      delete: 'تجزیہ حذف کریں',
      whatIsClaiming: 'یہ پیغام کیا دعویٰ کر رہا ہے؟',
      explainSimply: 'آسان الفاظ میں سمجھیں',
      listenAudio: 'آواز میں سنیں',
      stopAudio: 'روکیں',
      speaking: 'بول رہا ہے...',
      warningSignals: 'انتباہی اشارے',
      detectedClaims: 'شناخت شدہ مالیاتی دعوے',
      howDoIVerify: 'اس کی تصدیق کیسے کریں؟',
      verificationAction: 'تصدیقی اقدام:',
      whatToVerify: 'اقدام کرنے سے پہلے کیا تصدیق کریں؟',
      tickAsYouVerify: 'تصدیق کے بعد نشان لگائیں',
      beforeYouAct: 'اقدام کرنے سے پہلے احتیاط',
      whatCanYouLearn: 'اس سے آپ کیا سیکھ سکتے ہیں؟',
      readTime: '30-60 سیکنڈ کا مطالعہ',
      remember: 'یاد رکھیں',
      learnMore: 'مزید جانیں →',
      showLess: 'کم دکھائیں ↑',
      limitations: 'سسٹم کی حدود:',
      shareWarning: 'انتباہی کارڈ شیئر کریں',
      cardCopied: 'کاپی ہو گیا!',
      important: 'اہم',
    },
    valueCards: {
      card1Badge: '1. کیپچر اور سمجھیں',
      card1Title: 'اسکرین شاٹ تجزیہ',
      card1Desc: 'واٹس ایپ یا ٹیلیگرام سے براہ راست اسکرین شاٹ اپ لوڈ کر کے دعوے چیک کریں۔',
      card2Badge: '2. جانچ اور وضاحت',
      card2Title: 'آسان زبان اور اردو آواز',
      card2Desc: 'دھوکہ دہی کو پہچان کر آڈیو کے ساتھ آسان وضاحت فراہم کرتا ہے۔',
      card3Badge: '3. تصدیق اور سیکھیں',
      card3Title: 'خود مختاری',
      card3Desc: 'بغیر کسی اسٹاک مشورے کے پائیدار مالیاتی شعور پیدا کرتا ہے۔',
    },
    footer: {
      copyright: 'نمبیکئی (Nambikkai) — سنجیان ہیکاتھون 2026 • ٹریک E',
      disclaimer: 'یہ سرمایہ کاری کا مشورہ یا اسٹاک کی سفارشات فراہم نہیں کرتا ہے۔',
    },
  },

  kn: {
    header: {
      tagline: 'ನಂಬುವ ಮೊದಲು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
      privacyBadge: 'ಗೌಪ್ಯತೆ ಮೊದಲು • ಡಿಮ್ಯಾಟ್/ಬ್ಯಾಂಕ್ ಲಾಗಿನ್ ಅಗತ್ಯವಿಲ್ಲ',
      selectLanguage: 'ಭಾಷೆ',
    },
    hero: {
      trackBadge: 'ಟ್ರಾಕ್ E — ಹಣಕಾಸಿನ ತಪ್ಪು ಮಾಹಿತಿ ಮತ್ತು ಸಾಕ್ಷರತೆ',
      titlePart1: 'ನಂಬುವ ಮೊದಲು',
      titleHighlight: 'ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
      subtitle:
        'ನಂಬಿಕೈ ಭಾರತೀಯ ಹೂಡಿಕೆದಾರರಿಗೆ ಹಕ್ಕುಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಎಚ್ಚರಿಕೆಯ ಚಿಹ್ನೆಗಳನ್ನು ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    },
    demoBar: {
      label: '1-ಕ್ಲಿಕ್ ಡೆಮೊಗಳು',
      sublabel: 'ತ್ವರಿತ ಸಂವಾದಾತ್ಮಕ ಸನ್ನಿವೇಶಗಳು',
    },
    input: {
      tabScreenshot: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್',
      tabText: 'ಪಠ್ಯ ಅಂಟಿಸಿ',
      tabUrl: 'ವೆಬ್ ಲಿಂಕ್',
      screenshotTitle: 'ಹಣಕಾಸಿನ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      screenshotSubtitle: 'ನಿಮ್ಮ ವಾಟ್ಸಾಪ್ ಅಥವಾ ಟೆಲಿಗ್ರಾಮ್ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಇಲ್ಲಿ ಹಾಕಿ',
      chooseFile: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಆಯ್ಕೆಮಾಡಿ',
      dragDrop: 'ಅಥವಾ ಇಲ್ಲಿಗೆ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ',
      formats: 'PNG, JPG, WebP ಬೆಂಬಲಿತ • ಆಟೋ ಕಾಂಟ್ರಾಸ್ಟ್ ಮತ್ತು OCR',
      analyzingBtn: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      analyzeScreenshotBtn: 'OCR ನೊಂದಿಗೆ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ವಿಶ್ಲೇಷಿಸಿ',
      textPlaceholder: 'ಸಂದೇಶ ಅಥವಾ ಪೋಸ್ಟ್ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ...',
      analyzeTextBtn: 'ವಿಷಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
      urlPlaceholder: 'ವೆಬ್ ಲಿಂಕ್ ನಮೂದಿಸಿ (https://...)',
      analyzeUrlBtn: 'ಲಿಂಕ್ ಪರಿಶೀಲಿಸಿ',
      privacyNotice: 'ಯಾವುದೇ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.',
    },
    overlay: {
      analyzingTitle: 'ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ',
      analyzingSubtitle: 'ಹಕ್ಕುಗಳನ್ನು ಹೊರತೆಗೆಯುವುದು ಮತ್ತು ನಿಯಮಗಳ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸುವುದು...',
      step1: '1. ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಪ್ರೊಸೆಸಿಂಗ್ ಮತ್ತು ಪಠ್ಯ ಗುರುತಿಸುವಿಕೆ',
      step2: '2. ಹಣಕಾಸಿನ ಹಕ್ಕುಗಳನ್ನು ಪ್ರತ್ಯೇಕಿಸುವುದು',
      step3: '3. ವಂಚನೆಯ ಚಿಹ್ನೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡುವುದು',
      step4: '4. ಬಹುಭಾಷಾ ವಿವರಣೆ ಮತ್ತು ಪರಿಶೀಲನಾ ಪಟ್ಟಿ ಸಂಶ್ಲೇಷಣೆ',
    },
    result: {
      contentCheck: 'ವಿಷಯ ಪರಿಶೀಲನೆ',
      checkAnother: 'ಇನ್ನೊಂದನ್ನು ಪರಿಶೀಲಿಸಿ',
      delete: 'ವಿಶ್ಲೇಷಣೆಯನ್ನು ಅಳಿಸಿ',
      whatIsClaiming: 'ಈ ಸಂದೇಶವು ಏನು ಹೇಳುತ್ತಿದೆ?',
      explainSimply: 'ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
      listenAudio: 'ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ',
      stopAudio: 'ನಿಲ್ಲಿಸಿ',
      speaking: 'ಮಾತನಾಡುತ್ತಿದೆ...',
      warningSignals: 'ಎಚ್ಚರಿಕೆಯ ಸಂಕೇತಗಳು',
      detectedClaims: 'ಪತ್ತೆಯಾದ ಹಣಕಾಸಿನ ಹಕ್ಕುಗಳು',
      howDoIVerify: 'ಪರಿಶೀಲಿಸುವುದು ಹೇಗೆ?',
      verificationAction: 'ಪರಿಶೀಲನಾ ಕ್ರಮ:',
      whatToVerify: 'ಕ್ರಮ ಕೈಗೊಳ್ಳುವ ಮುನ್ನ ಏನು ಪರಿಶೀಲಿಸಬೇಕು?',
      tickAsYouVerify: 'ಪರಿಶೀಲಿಸಿದ ನಂತರ ಗುರುತು ಹಾಕಿ',
      beforeYouAct: 'ಮುಂದುವರಿಯುವ ಮುನ್ನ ಎಚ್ಚರಿಕೆ',
      whatCanYouLearn: 'ಇದರಿಂದ ನೀವು ಏನು ಕಲಿಯಬಹುದು?',
      readTime: '30-60 ಸೆಕೆಂಡುಗಳ ಓದು',
      remember: 'ನೆನಪಿಡಿ',
      learnMore: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ →',
      showLess: 'ಕಡಿಮೆ ತೋರಿಸಿ ↑',
      limitations: 'ವ್ಯವಸ್ಥೆಯ ಮಿತಿಗಳು:',
      shareWarning: 'ಎಚ್ಚರಿಕೆ ಕಾರ್ಡ್ ಹಂಚಿಕೊಳ್ಳಿ',
      cardCopied: 'ನಕಲಿಸಲಾಗಿದೆ!',
      important: 'ಮುಖ್ಯ',
    },
    valueCards: {
      card1Badge: '1. ಸೆರೆಹಿಡಿಯಿರಿ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
      card1Title: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ವಿಶ್ಲೇಷಣೆ',
      card1Desc: 'ವಾಟ್ಸಾಪ್ ಅಥವಾ ಟೆಲಿಗ್ರಾಮ್‌ನಿಂದ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ನೇರವಾಗಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಹಕ್ಕುಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.',
      card2Badge: '2. ಪರಿಶೀಲಿಸಿ ಮತ್ತು ವಿವರಿಸಿ',
      card2Title: 'ಸರಳ ಭಾಷೆ ಮತ್ತು ಕನ್ನಡ ಧ್ವನಿ',
      card2Desc: 'ವಂಚನೆಯ ಸಂಕೇತಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ ಆಡಿಯೊದೊಂದಿಗೆ ಸರಳ ವಿವರಣೆಯನ್ನು ನೀಡುತ್ತದೆ.',
      card3Badge: '3. ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕಲಿಯಿರಿ',
      card3Title: 'ಸಬಲೀಕರಣ',
      card3Desc: 'ಸ್ಟಾಕ್ ಸಲಹೆ ನೀಡದೆ ಸೆಬಿ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಗಳ ಮೂಲಕ ಹಣಕಾಸಿನ ಸಾಕ್ಷರತೆಯನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ.',
    },
    footer: {
      copyright: 'ನಂಬಿಕೈ (Nambikkai) — ಸಂಜ್ಞಾನ್ ಹ್ಯಾಕಥಾನ್ 2026 • ಟ್ರ್ಯಾಕ್ E',
      disclaimer: 'ಇದು ಯಾವುದೇ ಹೂಡಿಕೆ ಸಲಹೆ ಅಥವಾ ಷೇರು ಶಿಫಾರಸುಗಳನ್ನು ನೀಡುವುದಿಲ್ಲ.',
    },
  },

  or: {
    header: {
      tagline: 'ବିଶ୍ୱାସ କରିବା ପୂର୍ବରୁ ବୁଝନ୍ତୁ',
      privacyBadge: 'ଗୋପନୀୟତା ପ୍ରଥମ • କୌଣସି ଲଗଇନ୍ ଆବଶ୍ୟକ ନାହିଁ',
      selectLanguage: 'ଭାଷା',
    },
    hero: {
      trackBadge: 'ଟ୍ରାକ୍ E — ଆର୍ଥିକ ଭ୍ରାନ୍ତ ସୂଚନା ଏବଂ ସାକ୍ଷରତା',
      titlePart1: 'ବିଶ୍ୱାସ କରିବା ପୂର୍ବରୁ',
      titleHighlight: 'ବୁଝନ୍ତୁ।',
      subtitle:
        'ନମ୍ବିକାଇ ଭାରତୀୟ ନିବେଶକମାନଙ୍କୁ ଦାବିଗୁଡ଼ିକର ବିଶ୍ଳେଷଣ କରିବା ଏବଂ ସତର୍କତା ସଙ୍କେତ ଚିହ୍ନଟ କରିବାରେ ସାହାଯ୍ୟ କରେ।',
    },
    demoBar: {
      label: '୧-କ୍ଲିକ୍ ଡେମୋ',
      sublabel: 'ତୁରନ୍ତ ଇଣ୍ଟରାକ୍ଟିଭ୍ ପରୀକ୍ଷଣ',
    },
    input: {
      tabScreenshot: 'ସ୍କ୍ରିନସଟ୍',
      tabText: 'ଟେକ୍ସଟ୍ ପେଷ୍ଟ କରନ୍ତୁ',
      tabUrl: 'ୱେବ୍ ଲିଙ୍କ୍',
      screenshotTitle: 'ଆର୍ଥିକ ସ୍କ୍ରିନସଟ୍ ଅପଲୋଡ୍ କରନ୍ତୁ',
      screenshotSubtitle: 'ଆପଣଙ୍କ ହ୍ୱାଟ୍ସଆପ୍ କିମ୍ବା ସୋସିଆଲ୍ ମିଡିଆ ସ୍କ୍ରିନସଟ୍ ଏଠାରେ ଛାଡନ୍ତୁ',
      chooseFile: 'ସ୍କ୍ରିନସଟ୍ ବାଛନ୍ତୁ',
      dragDrop: 'କିମ୍ବା ଏଠାକୁ ଟାଣନ୍ତୁ ଏବଂ ଛାଡନ୍ତୁ',
      formats: 'PNG, JPG, WebP ସମର୍ଥିତ • ଅଟୋ କଣ୍ଟ୍ରାଷ୍ଟ ଏବଂ OCR',
      analyzingBtn: 'ବିଶ୍ଳେଷଣ ଚାଲିଛି...',
      analyzeScreenshotBtn: 'OCR ସହିତ ସ୍କ୍ରିନସଟ୍ ଯାଞ୍ଚ କରନ୍ତୁ',
      textPlaceholder: 'ଆର୍ଥିକ ବାର୍ତ୍ତା କିମ୍ବା ପୋଷ୍ଟ ଟେକ୍ସଟ୍ ଏଠାରେ ପେଷ୍ଟ କରନ୍ତୁ...',
      analyzeTextBtn: 'ବିଷୟବସ୍ତୁ ବିଶ୍ଳେଷଣ କରନ୍ତୁ',
      urlPlaceholder: 'ୱେବ୍ ଲିଙ୍କ୍ ପ୍ରବେଶ କରନ୍ତୁ (https://...)',
      analyzeUrlBtn: 'ଲିଙ୍କ୍ ଯାଞ୍ଚ କରନ୍ତୁ',
      privacyNotice: 'କୌଣସି ପାସୱାର୍ଡ କିମ୍ବା ବ୍ୟାଙ୍କ ବିବରଣୀ ସଂରକ୍ଷଣ କରାଯାଏ ନାହିଁ।',
    },
    overlay: {
      analyzingTitle: 'ବିଶ୍ଳେଷଣ ଚାଲିଛି',
      analyzingSubtitle: 'ଦାବିଗୁଡିକ ବାହାର କରିବା ଏବଂ ନିୟମାବଳୀ ବିରୁଦ୍ଧରେ ଯାଞ୍ଚ କରିବା...',
      step1: '୧. ସ୍କ୍ରିନସଟ୍ ପ୍ରୋସେସିଂ ଏବଂ ଟେକ୍ସଟ୍ ଚିହ୍ନଟ',
      step2: '୨. ଆର୍ଥିକ ଦାବିଗୁଡ଼ିକୁ ପୃଥକ କରିବା',
      step3: '୩. ପ୍ରତାରଣା ସଙ୍କେତ ସ୍କାନିଂ',
      step4: '୪. ବହୁଭାଷୀ ବ୍ୟାଖ୍ୟା ଏବଂ ଯାଞ୍ଚ ତାଲିକା ପ୍ରସ୍ତୁତି',
    },
    result: {
      contentCheck: 'ବିଷୟବସ୍ତୁ ଯାଞ୍ଚ',
      checkAnother: 'ଅନ୍ୟ ଏକ ଯାଞ୍ଚ କରନ୍ତୁ',
      delete: 'ବିଶ୍ଳେଷଣ ବିଲୋପ କରନ୍ତୁ',
      whatIsClaiming: 'ଏହି ବାର୍ତ୍ତା କଣ ଦାବି କରୁଛି?',
      explainSimply: 'ସରଳ ଭାଷାରେ ବୁଝନ୍ତୁ',
      listenAudio: 'ସ୍ୱରରେ ଶୁଣନ୍ତୁ',
      stopAudio: 'ବନ୍ଦ କରନ୍ତୁ',
      speaking: 'ଶୁଣାଉଛି...',
      warningSignals: 'ସତର୍କତା ସଙ୍କେତ',
      detectedClaims: 'ଚିହ୍ନଟ ହୋଇଥିବା ଆର୍ଥିକ ଦାବି',
      howDoIVerify: 'ଏହାକୁ କିପରି ଯାଞ୍ଚ କରିବେ?',
      verificationAction: 'ଯାଞ୍ଚ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ:',
      whatToVerify: 'ପଦକ୍ଷେପ ପୂର୍ବରୁ କଣ ଯାଞ୍ଚ କରିବେ?',
      tickAsYouVerify: 'ଯାଞ୍ଚ ପରେ ଟିକ୍ କରନ୍ତୁ',
      beforeYouAct: 'ପଦକ୍ଷେପ ପୂର୍ବରୁ ସାବଧାନତା',
      whatCanYouLearn: 'ଏଥିରୁ ଆପଣ କଣ ଶିଖିପାରିବେ?',
      readTime: '୩୦-୬୦ ସେକେଣ୍ଡ ପଠନ',
      remember: 'ମନେରଖନ୍ତୁ',
      learnMore: 'ଅଧିକ ଜାଣନ୍ତୁ →',
      showLess: 'କମ୍ ଦେଖାନ୍ତୁ ↑',
      limitations: 'ସିଷ୍ଟମ୍ ସୀମାବଦ୍ଧତା:',
      shareWarning: 'ସତର୍କତା କାର୍ଡ ସେୟାର କରନ୍ତୁ',
      cardCopied: 'କପି ହୋଇଗଲା!',
      important: 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ',
    },
    valueCards: {
      card1Badge: '୧. କ୍ୟାପଚର ଏବଂ ବୁଝନ୍ତୁ',
      card1Title: 'ସ୍କ୍ରିନସଟ୍ ବିଶ୍ଳେଷଣ',
      card1Desc: 'ସୋସିଆଲ୍ ମିଡିଆରୁ ସିଧାସଳଖ ସ୍କ୍ରିନସଟ୍ ଅପଲୋଡ୍ କରି ଦାବି ଯାଞ୍ଚ କରନ୍ତୁ।',
      card2Badge: '୨. ଯାଞ୍ଚ ଏବଂ ବ୍ୟାଖ୍ୟା',
      card2Title: 'ସରଳ ଭାଷା ଏବଂ ଓଡ଼ିଆ ସ୍ୱର',
      card2Desc: 'ଠକେଇ ସଙ୍କେତ ଚିହ୍ନଟ କରି ଭାରତୀୟ ଭାଷାରେ ଅଡିଓ ସହିତ ସରଳ ବ୍ୟାଖ୍ୟା ପ୍ରଦାନ କରେ।',
      card3Badge: '୩. ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଶିଖନ୍ତୁ',
      card3Title: 'ସଶକ୍ତୀକରଣ',
      card3Desc: 'ଷ୍ଟକ୍ ପରାମର୍ଶ ବିନା SEBI ଯାଞ୍ଚ ତାଲିକା ମାଧ୍ୟମରେ ଆର୍ଥିକ ସାକ୍ଷରତା ସୃଷ୍ଟି କରେ।',
    },
    footer: {
      copyright: 'ନମ୍ବିକାଇ (Nambikkai) — ସଂଜ୍ଞାନ ହ୍ୟାକାଥନ୍ ୨୦୨୬ • ଟ୍ରାକ୍ E',
      disclaimer: 'ଏହା କୌଣସି ନିବେଶ ପରାମର୍ଶ କିମ୍ବା ଷ୍ଟକ୍ ସୁପାରିଶ ପ୍ରଦାନ କରେ ନାହିଁ।',
    },
  },

  ml: {
    header: {
      tagline: 'വിശ്വസിക്കുന്നതിന് മുമ്പ് മനസ്സിലാക്കുക',
      privacyBadge: 'സ്വകാര്യത പ്രധാനം • ഡീമാറ്റ്/ബാങ്ക് ലോഗിൻ ആവശ്യമില്ല',
      selectLanguage: 'ഭാഷ',
    },
    hero: {
      trackBadge: 'ട്രാക്ക് E — സാമ്പത്തിക തെറ്റായ വിവരങ്ങളും ഉള്ളടക്ക സാക്ഷരതയും',
      titlePart1: 'വിശ്വസിക്കുന്നതിന് മുമ്പ്',
      titleHighlight: 'മനസ്സിലാക്കുക.',
      subtitle:
        'ഇന്ത്യൻ നിക്ഷേപകർക്ക് അവകാശവാദങ്ങൾ വിശകലനം ചെയ്യാനും തട്ടിപ്പുകൾ തിരിച്ചറിയാനും സ്വതന്ത്രമായി പരിശോധിക്കാനും നമ്പിക്കൈ സഹായിക്കുന്നു.',
    },
    demoBar: {
      label: '1-ക്ലിക്ക് ഡെമോകൾ',
      sublabel: 'തത്സമയ ഇന്ററാക്ടീവ് പരീക്ഷണങ്ങൾ',
    },
    input: {
      tabScreenshot: 'സ്ക്രീൻഷോട്ട്',
      tabText: 'ടെക്സ്റ്റ് പേസ്റ്റ് ചെയ്യുക',
      tabUrl: 'വെബ് ലിങ്ക്',
      screenshotTitle: 'സാമ്പത്തിക സ്ക്രീൻഷോട്ട് അപ്‌ലോഡ് ചെയ്യുക',
      screenshotSubtitle: 'നിങ്ങളുടെ വാട്ട്‌സ്ആപ്പ് അല്ലെങ്കിൽ സോഷ്യൽ മീഡിയ സ്ക്രീൻഷോട്ട് ഇവിടെ നൽകുക',
      chooseFile: 'സ്ക്രീൻഷോട്ട് തിരഞ്ഞെടുക്കുക',
      dragDrop: 'അല്ലെങ്കിൽ ഇവിടെ ഡ്രാഗ് & ഡ്രോപ്പ് ചെയ്യുക',
      formats: 'PNG, JPG, WebP പിന്തുണയ്ക്കുന്നു • ഓട്ടോ കോൺട്രാസ്റ്റും OCR-ഉം',
      analyzingBtn: 'വിശകലനം ചെയ്യുന്നു...',
      analyzeScreenshotBtn: 'OCR ഉപയോഗിച്ച് സ്ക്രീൻഷോട്ട് പരിശോധിക്കുക',
      textPlaceholder: 'സന്ദേശമോ സോഷ്യൽ മീഡിയ പോസ്റ്റോ ഇവിടെ പേസ്റ്റ് ചെയ്യുക...',
      analyzeTextBtn: 'വിവരങ്ങൾ പരിശോധിക്കുക',
      urlPlaceholder: 'വെബ് ലിങ്ക് നൽകുക (https://...)',
      analyzeUrlBtn: 'ലിങ്ക് പരിശോധിക്കുക',
      privacyNotice: 'പാസ്‌വേഡുകളോ ബാങ്ക് വിവരങ്ങളോ സൂക്ഷിക്കാറില്ല.',
    },
    overlay: {
      analyzingTitle: 'വിശകലനം പുരോഗമിക്കുന്നു',
      analyzingSubtitle: 'അവകാശവാദങ്ങൾ വേർതിരിക്കുകയും ചട്ടങ്ങൾക്കനുസൃതമായി പരിശോധിക്കുകയും ചെയ്യുന്നു...',
      step1: '1. സ്ക്രീൻഷോട്ട് പ്രോസസ്സിംഗും ടെക്സ്റ്റ് തിരിച്ചറിയലും',
      step2: '2. സാമ്പത്തിക അവകാശവാദങ്ങൾ വേർതിരിക്കൽ',
      step3: '3. തട്ടിപ്പ് സൂചനകൾ സ്കാൻ ചെയ്യുന്നു',
      step4: '4. ബഹുഭാഷാ വിശദീകരണവും പരിശോധനാ പട്ടികയും തയ്യാറാക്കൽ',
    },
    result: {
      contentCheck: 'ഉള്ളടക്ക പരിശോധന',
      checkAnother: 'മറ്റൊന്ന് പരിശോധിക്കുക',
      delete: 'വിശകലനം ഇല്ലാതാക്കുക',
      whatIsClaiming: 'ഈ സന്ദേശം എന്താണ് അവകാശപ്പെടുന്നത്?',
      explainSimply: 'ലളിതമായി മനസ്സിലാക്കുക',
      listenAudio: 'ശബ്ദത്തിൽ കേൾക്കുക',
      stopAudio: 'നിർത്തുക',
      speaking: 'സംസാരിക്കുന്നു...',
      warningSignals: 'മുന്നറിയിപ്പ് സൂചനകൾ',
      detectedClaims: 'കണ്ടെത്തിയ സാമ്പത്തിക അവകാശവാദങ്ങൾ',
      howDoIVerify: 'എങ്ങനെ പരിശോധിക്കാം?',
      verificationAction: 'പരിശോധനാ നടപടി:',
      whatToVerify: 'നടപടിക്ക് മുമ്പ് എന്തൊക്കെ പരിശോധിക്കണം?',
      tickAsYouVerify: 'പരിശോധിച്ച ശേഷം ടിക്ക് ചെയ്യുക',
      beforeYouAct: 'നടപടിയെടുക്കുന്നതിന് മുമ്പുള്ള ജാഗ്രത',
      whatCanYouLearn: 'ഇതിൽ നിന്ന് എന്ത് പഠിക്കാം?',
      readTime: '30-60 സെക്കൻഡ് വായന',
      remember: 'ഓർക്കുക',
      learnMore: 'കൂടുതലറിയുക →',
      showLess: 'കുറച്ച് കാണിക്കുക ↑',
      limitations: 'സിസ്റ്റം പരിമിതികൾ:',
      shareWarning: 'മുന്നറിയിപ്പ് കാർഡ് പങ്കിടുക',
      cardCopied: 'കോപ്പി ചെയ്തു!',
      important: 'പ്രധാനം',
    },
    valueCards: {
      card1Badge: '1. കണ്ടെത്തുക & മനസ്സിലാക്കുക',
      card1Title: 'സ്ക്രീൻഷോട്ട് വിശകലനം',
      card1Desc: 'വാട്ട്‌സ്ആപ്പിൽ നിന്നോ ടെലിഗ്രാമിൽ നിന്നോ ഉള്ള സ്ക്രീൻഷോട്ടുകൾ നേരിട്ട് അപ്‌ലോഡ് ചെയ്ത് പരിശോധിക്കുക.',
      card2Badge: '2. പരിശോധന & വിശദീകരണം',
      card2Title: 'ലളിതമായ ഭാഷയും മലയാളം ശബ്ദവും',
      card2Desc: 'തട്ടിപ്പ് സൂചനകൾ കണ്ടെത്തി ഇന്ത്യൻ ഭാഷകളിൽ ഓഡിയോ സഹിതം ലളിതമായ വിശദീകരണം നൽകുന്നു.',
      card3Badge: '3. പരിശോധിക്കുക & പഠിക്കുക',
      card3Title: 'ശാക്തീകരണം',
      card3Desc: 'സ്റ്റോക്ക് ഉപദേശങ്ങൾ നൽകാതെ സെബി പരിശോധനാ പട്ടികകളിലൂടെ സാമ്പത്തിക സാക്ഷരത വളർത്തുന്നു.',
    },
    footer: {
      copyright: 'നമ്പിക്കൈ (Nambikkai) — സംജ്ഞാൻ ഹാക്കത്തോൺ 2026 • ട്രാക്ക് E',
      disclaimer: 'ഇത് നിക്ഷേപ ഉപദേശങ്ങളോ ഓഹരി നിർദ്ദേശങ്ങളോ നൽകുന്നില്ല.',
    },
  },
};
