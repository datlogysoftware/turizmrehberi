import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    traceId?: string;
  }
}

function genId(){ return Math.random().toString(16).slice(2) + Date.now().toString(16); }

export default fp(async function tracingPlugin(f: FastifyInstance){
  f.addHook('onRequest', async (req) => {
    req.traceId = req.headers['x-trace-id'] as string || genId();
  });
  f.addHook('onSend', async (req, reply, payload) => {
    reply.header('x-trace-id', req.traceId || '');
  });
});
