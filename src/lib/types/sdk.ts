export interface SDKTestResult {
  endpoint: string;
  success: boolean;
  message: string;
  error?: {
    code: string;
    details: string;
    timestamp: string;
  };
  data?: any;
}

export interface SDKHealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
}

export interface SDKVersionResponse {
  version: string;
  latest: boolean;
  releaseDate: string;
}