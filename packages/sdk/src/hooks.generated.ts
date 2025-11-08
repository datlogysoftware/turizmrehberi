// Auto-generated React Query hooks. Do not edit manually.
import { useQuery, useMutation } from '@tanstack/react-query';
import { TourismApiClient } from './client';
import type { Place, RouteResponse, Review, ReviewInput, FeedbackInput } from './types';
const client = new TourismApiClient();

export const useListPlaces = (bbox:string, category?:string) => {
  return useQuery({ queryKey: ['places', bbox, category], queryFn: () => client.listPlaces({ bbox, category }) });
};

export const usePlace = (id:string) => {
  return useQuery({ queryKey: ['place', id], queryFn: () => client.getPlace(id), enabled: !!id });
};

export const useRoute = (mode:'walk'|'drive'|'transit', from:string, to:string) => {
  return useQuery({ queryKey: ['route', mode, from, to], queryFn: () => client.getRoute({ mode, from, to }), enabled: !!from && !!to });
};

export const useSubmitReview = () => {
  return useMutation({ mutationFn: (body: ReviewInput) => client.submitReview(body) });
};

export const useSubmitFeedback = () => {
  return useMutation({ mutationFn: (body: FeedbackInput) => client.submitFeedback(body) });
};
