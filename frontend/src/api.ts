import type {
  AnalysisResult,
  ClaimVerification,
  DemoSample,
  MicroLesson,
  TestCaseItem,
  UrlInspectionResult,
} from './types';

const API_BASE = '/api';

export async function fetchHealth(): Promise<{ status: string; has_live_llm: boolean }> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Backend health check failed');
  return res.json();
}

export async function fetchDemoSamples(): Promise<DemoSample[]> {
  const res = await fetch(`${API_BASE}/demo-samples`);
  if (!res.ok) throw new Error('Failed to fetch demo samples');
  return res.json();
}

export async function analyzeText(text: string, language: string = 'en'): Promise<AnalysisResult> {
  const res = await fetch(`${API_BASE}/analyze/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Analysis failed. Please try again.');
  }
  return res.json();
}

export async function analyzeImage(file: File, language: string = 'en'): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('language', language);

  const res = await fetch(`${API_BASE}/analyze/image`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Image OCR analysis failed. Please try again.');
  }
  return res.json();
}

export async function analyzeUrl(url: string, language: string = 'en'): Promise<AnalysisResult> {
  const res = await fetch(`${API_BASE}/analyze/url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, language }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'URL analysis failed. Please try again.');
  }
  return res.json();
}

export async function deleteAnalysis(id: string): Promise<void> {
  await fetch(`${API_BASE}/analysis/${id}`, { method: 'DELETE' }).catch(() => {});
}

export async function fetchLessons(): Promise<MicroLesson[]> {
  const res = await fetch(`${API_BASE}/lessons`);
  if (!res.ok) throw new Error('Failed to fetch lessons');
  return res.json();
}

export async function fetchTestCases(): Promise<TestCaseItem[]> {
  const res = await fetch(`${API_BASE}/test-cases`);
  if (!res.ok) throw new Error('Failed to fetch test cases');
  return res.json();
}

export async function fetchRegulatoryAdvisories(): Promise<import('./types').RegulatoryAdvisory[]> {
  const res = await fetch(`${API_BASE}/regulatory-advisories`);
  if (!res.ok) throw new Error('Failed to fetch regulatory advisories');
  return res.json();
}

export async function fetchModusOperandi(): Promise<import('./types').ModusOperandiItem[]> {
  const res = await fetch(`${API_BASE}/modus-operandi`);
  if (!res.ok) throw new Error('Failed to fetch modus operandi');
  return res.json();
}

export async function verifyClaim(claim: string): Promise<ClaimVerification> {
  const res = await fetch(`${API_BASE}/verify/claim`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ claim }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Claim verification failed.');
  }
  return res.json();
}

export async function inspectUrl(url: string): Promise<UrlInspectionResult> {
  const res = await fetch(`${API_BASE}/inspect/url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'URL inspection failed.');
  }
  return res.json();
}


