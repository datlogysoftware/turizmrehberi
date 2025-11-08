// Lightweight typed client (fetch-based). Replace or regenerate as needed.
import type { Place, RouteResponse, ReviewInput, Review, FeedbackInput, Mode } from './types';

export interface ClientOptions {
  baseUrl?: string;
  getToken?: () => Promise<string | undefined> | string | undefined;
}

export class TourismApiClient {
  private baseUrl: string;
  private getToken?: ClientOptions['getToken'];
  constructor(opts: ClientOptions = {}) {
    this.baseUrl = opts.baseUrl ?? 'https://api.example.com';
    this.getToken = opts.getToken;
  }

  private async req<T>(path: string, init?: RequestInit): Promise<T> {
    const headers: Record<string,string> = { 'content-type': 'application/json', ...(init?.headers as any || {}) };
    const token = this.getToken ? await this.getToken() : undefined;
    if (token) headers['authorization'] = `Bearer ${token}`;
    const res = await fetch(this.baseUrl + path, { ...init, headers });
    if (!res.ok) {
      const msg = await res.text().catch(()=>String(res.status));
      throw new Error(`HTTP ${res.status}: ${msg}`);
    }
    return res.json() as Promise<T>;
  }

  // GET /places?bbox&category
  listPlaces(params: { bbox: string; category?: string }): Promise<Place[]> {
    const q = new URLSearchParams({ bbox: params.bbox, ...(params.category?{category:params.category}:{}) });
    return this.req<Place[]>(`/places?` + q.toString());
  }

  // GET /places/{id}
  getPlace(id: string): Promise<Place> {
    return this.req<Place>(`/places/${encodeURIComponent(id)}`);
  }

  // GET /routing?mode&from&to
  getRoute(params: { mode: Mode; from: string; to: string }): Promise<RouteResponse> {
    const q = new URLSearchParams({ mode: params.mode, from: params.from, to: params.to });
    return this.req<RouteResponse>(`/routing?` + q.toString());
  }

  // POST /reviews
  submitReview(body: ReviewInput): Promise<Review> {
    return this.req<Review>(`/reviews`, { method: 'POST', body: JSON.stringify(body) });
  }

  // POST /feedback
  submitFeedback(body: FeedbackInput): Promise<{ ok: true }> {
    return this.req<{ ok: true }>(`/feedback`, { method: 'POST', body: JSON.stringify(body) });
  }
}
