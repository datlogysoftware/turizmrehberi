import fp from 'fastify-plugin';
import type { FastifyInstance, FastifyRequest } from 'fastify';

type User = { id: string; role: 'user'|'editor'|'admin'; perms?: { layers?: string[] } };
type PolicyInput = { user: User, action: string, resource: { type: string, id?: string } };

function allow(input: PolicyInput): boolean {
  // Simple example policy: admin all, editor publish, user read
  if (input.user.role === 'admin') return true;
  if (input.action === 'read') return true;
  if (input.action === 'publish' && input.user.role === 'editor') return true;
  return false;
}

declare module 'fastify' {
  interface FastifyInstance {
    authz: {
      can: (input: PolicyInput) => boolean
    }
  }
}

export default fp(async function rbacPlugin(f: FastifyInstance){
  f.decorate('authz', { can: allow });
});
