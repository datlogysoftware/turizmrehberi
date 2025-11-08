import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyRequest } from 'fastify';

type Bucket = { tokens: number; updatedAt: number };

export default fp(async function rateLimitPlugin(f: FastifyInstance, opts: { max?: number, refillPerSec?: number } = {}){
  const max = opts.max ?? 60;
  const refillPerSec = opts.refillPerSec ?? 1;
  const buckets = new Map<string, Bucket>();

  f.addHook('onRequest', async (req, reply) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();
    const b = buckets.get(ip) || { tokens: max, updatedAt: now };
    // refill
    const elapsed = (now - b.updatedAt)/1000;
    b.tokens = Math.min(max, b.tokens + elapsed*refillPerSec);
    b.updatedAt = now;
    if (b.tokens < 1) {
      reply.code(429).send({ code: 'RATE_LIMIT', message: 'Too Many Requests' });
      return;
    }
    b.tokens -= 1;
    buckets.set(ip, b);
  });
});
