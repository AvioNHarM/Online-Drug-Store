export interface SymptomData {
  [symptomName: string]: 0 | 1;
}

export interface DiagnosisPayload {
  symptoms: SymptomData;
  timestamp: string;
  selectedCount: number;
}

export interface AIApiResponse {
  status: string;
  message: string;
  payload?: DiagnosisPayload;
  diagnosis?: string;
  confidence?: number;
  recommendations?: string[];
}

export interface DiagnosisError {
  error: string;
  message: string;
  statusCode?: number;
}