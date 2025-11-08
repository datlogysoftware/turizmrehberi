import fs from 'node:fs';

const spec = fs.readFileSync('./openapi/openapi.yaml','utf-8');

function hasPath(p){ return spec.includes('\n  ' + p + ':'); }

let code = `// Auto-generated React Query hooks. Do not edit manually.\n` +
`import { useQuery, useMutation } from '@tanstack/react-query';\n` +
`import { TourismApiClient } from '../packages/sdk/src/client';\n` +
`import type { Place, RouteResponse, Review, ReviewInput, FeedbackInput } from '../packages/sdk/src/types';\n` +
`const client = new TourismApiClient();\n`;

if (hasPath('/places')) {
  code += `\nexport const useListPlaces = (bbox:string, category?:string) => {\n` +
  `  return useQuery({ queryKey: ['places', bbox, category], queryFn: () => client.listPlaces({ bbox, category }) });\n};\n`;
}
if (hasPath('/places/{id}')) {
  code += `\nexport const usePlace = (id:string) => {\n` +
  `  return useQuery({ queryKey: ['place', id], queryFn: () => client.getPlace(id), enabled: !!id });\n};\n`;
}
if (hasPath('/routing')) {
  code += `\nexport const useRoute = (mode:'walk'|'drive'|'transit', from:string, to:string) => {\n` +
  `  return useQuery({ queryKey: ['route', mode, from, to], queryFn: () => client.getRoute({ mode, from, to }), enabled: !!from && !!to });\n};\n`;
}
if (hasPath('/reviews')) {
  code += `\nexport const useSubmitReview = () => {\n` +
  `  return useMutation({ mutationFn: (body: ReviewInput) => client.submitReview(body) });\n};\n`;
}
if (hasPath('/feedback')) {
  code += `\nexport const useSubmitFeedback = () => {\n` +
  `  return useMutation({ mutationFn: (body: FeedbackInput) => client.submitFeedback(body) });\n};\n`;
}

fs.mkdirSync('./packages/sdk/src', { recursive: true });
fs.writeFileSync('./packages/sdk/src/hooks.generated.ts', code);
console.log('Generated packages/sdk/src/hooks.generated.ts');
