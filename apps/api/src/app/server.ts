import Fastify from 'fastify';
import cachePlugin from './plugins/cache';
import rateLimitPlugin from './plugins/rate-limit';
import rbacPlugin from './plugins/rbac';
import tracingPlugin from './plugins/tracing';

const f = Fastify({ logger: true });

await f.register(tracingPlugin);
await f.register(rateLimitPlugin, { max: 120, refillPerSec: 2 });
await f.register(cachePlugin);
await f.register(rbacPlugin);

f.get('/health/live', async () => ({ ok: true }));

f.get('/secure/publish', async (req, reply) => {
  const user = { id: 'u1', role: 'editor' as const, perms: { layers: ['tourism.poi'] } };
  if (!f.authz.can({ user, action: 'publish', resource: { type: 'layer', id: 'tourism.poi' } })) {
    reply.code(403).send({ code: 'FORBIDDEN', message: 'Not allowed' });
    return;
  }
  return { ok: true };
});

export default f;
