import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';

type CacheAPI = {
  get: (k: string) => Promise<string|null>,
  set: (k: string, v: string, ttl?: number) => Promise<void>,
  del: (k: string) => Promise<void>,
};

declare module 'fastify' {
  interface FastifyInstance {
    cache: CacheAPI;
  }
}

async function makeRedis(url?: string) {
  // Placeholder in-memory map; replace with ioredis in production.
  const store = new Map<string,{v:string,exp?:number}>();
  return {
    async get(k:string){ 
      const it = store.get(k);
      if(!it) return null;
      if(it.exp && it.exp < Date.now()) { store.delete(k); return null; }
      return it.v;
    },
    async setEx(k:string, ttl:number, v:string){
      store.set(k,{v,exp: Date.now()+ttl*1000});
    },
    async del(k:string){ store.delete(k); }
  };
}

export default fp(async function cachePlugin(f: FastifyInstance){
  const redis = await makeRedis(process.env.REDIS_URL);
  const api: CacheAPI = {
    get: (k) => redis.get(k),
    set: async (k,v,ttl=300) => redis.setEx(k, ttl, v),
    del: (k) => redis.del(k)
  };
  f.decorate('cache', api);
});
