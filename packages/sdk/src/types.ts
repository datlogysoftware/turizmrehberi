// Generated types (handcrafted for now). You can overwrite via `pnpm codegen` using openapi-typescript.
export interface GeoPoint { lon: number; lat: number; }
export interface OpenHours { [k: string]: any; }
export interface PriceInfo { currency: string; amount: number; }

export interface Place {
  id: string;
  name_tr: string;
  name_en?: string;
  category: string;
  geom: GeoPoint;
  open_hours?: OpenHours;
  price_info?: PriceInfo;
}

export type Mode = 'walk'|'drive'|'transit';

export interface RouteLeg {
  distance_m: number;
  duration_s: number;
  geometry?: { type: string; coordinates: number[][] };
}

export interface RouteResponse {
  mode: Mode;
  distance_m: number;
  duration_s: number;
  legs: RouteLeg[];
}

export interface ReviewInput { placeId: string; rating: number; comment?: string; }
export interface Review {
  id: string; placeId: string; rating: number; comment?: string;
  status: 'pending'|'approved'|'rejected'; createdAt: string;
}

export type FeedbackType = 'hours'|'price'|'accessibility'|'metadata'|'other';
export interface FeedbackInput {
  placeId: string; type: FeedbackType; payload: any;
  evidence?: { kind: 'photo'|'url'|'text'; url?: string }[];
}
