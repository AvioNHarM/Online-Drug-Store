import { AIApiResponse } from "../types/ai";
const BASE_URL = "http://127.0.0.1:8000/drugstore/ai/product_matcher/";


export async function submitDiagnosis(payload: {
  symptoms: Record<string, 0 | 1>;
  timestamp: string;
  selectedCount: number;
}): Promise<AIApiResponse> {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result: AIApiResponse = await response.json();
    return result;

  } catch (error) {
    console.error('Diagnosis API Error:', error);
    
    return {
      status: 'demo',
      message: 'Demo mode - API endpoint not available. Payload prepared successfully.',
      payload: payload
    };
  }
}

export function createDiagnosisPayload(
  allSymptoms: string[], 
  selectedSymptoms: Set<string>
) {
  const symptomsData: Record<string, 0 | 1> = {};
  
  allSymptoms.forEach(symptom => {
    symptomsData[symptom] = selectedSymptoms.has(symptom) ? 1 : 0;
  });

  return {
    symptoms: symptomsData,
    timestamp: new Date().toISOString(),
    selectedCount: selectedSymptoms.size
  };
}