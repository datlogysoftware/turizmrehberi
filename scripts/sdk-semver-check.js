import { SDK_VERSION } from '../packages/sdk/src/version.js';
import fs from 'node:fs';

function parseVersion(v){ return v.split('.').map(x=>parseInt(x,10)); }
function compatible(a,b){
  const [aM,aN] = parseVersion(a), [bM,bN] = parseVersion(b);
  // Major must match, minor/sdk <= api minor allowed
  return aM === bM && aN <= bN;
}

const apiSpec = fs.readFileSync('./openapi/openapi.yaml','utf-8');
const m = apiSpec.match(/version:\s*([0-9]+\.[0-9]+\.[0-9]+)/);
const apiVersion = m ? m[1] : '0.0.0';

if (!compatible(SDK_VERSION, apiVersion)) {
  console.error(`SDK/API version mismatch: SDK=${SDK_VERSION} API=${apiVersion}`);
  process.exit(1);
} else {
  console.log(`SDK/API compatible ✓ SDK=${SDK_VERSION} API=${apiVersion}`);
}
