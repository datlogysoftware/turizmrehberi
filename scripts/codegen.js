// Simple codegen that converts openapi.yaml to TS types using openapi-typescript.
// If openapi-typescript isn't installed, this will just exit gracefully.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
const spec = './openapi/openapi.yaml';
const out = './packages/sdk/src/types.generated.ts';
try {
  execSync(`npx openapi-typescript ${spec} -o ${out}`, { stdio: 'inherit' });
  // index.ts already exports './types' and './client'.
  // Optionally, you can switch imports to use './types.generated' instead.
  console.log('✅ Generated', out);
} catch (e) {
  console.warn('⚠️  openapi-typescript not available or failed. Using handcrafted types.');
  if (!existsSync(dirname(out))) mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, '// generation failed or tool missing; using handcrafted types in types.ts\n');
}
