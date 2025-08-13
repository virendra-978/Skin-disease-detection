export interface PredictionResult {
  predicted_class: string;
  confidence: number;
}

export interface ApiResponse {
  predicted_class: string;
  confidence: number;
  message?: string;
}