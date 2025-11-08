# Türkiye Turizm Rehberi & Rotalama — Monorepo

Bu repo; OpenAPI şeması ve **önceden üretilmiş TypeScript SDK** ile gelir.
Yerel ortamda başlamak için:

```bash
# pnpm önerilir (npm de kullanılabilir)
pnpm i

# OpenAPI'den SDK'yı tekrar üretmek için
pnpm run codegen

# SDK'yı kullanmak için
ls packages/sdk/src
```

> Not: Bu paket örnek iskelet içerir. API ve Web uygulamaları için klasörler oluşturuldu, fakat minimal yer tutucu dosyalar eklenmiştir.

## Fastify Plugin’leri
- `apps/api/src/app/plugins/cache.ts` — Redis sarmalayıcı (yerelde in-memory)
- `apps/api/src/app/plugins/rate-limit.ts` — IP bazlı token bucket
- `apps/api/src/app/plugins/rbac.ts` — Policy-as-code örneği
- `apps/api/src/app/plugins/tracing.ts` — Basit traceId

## Codegen
- `pnpm run codegen` → OpenAPI → `packages/sdk/src/types.generated.ts`
- `pnpm run hooks:codegen` → React Query hooks → `packages/sdk/src/hooks.generated.ts`
- `pnpm run sdk:semver-check` → SDK ve API sürüm uyumu kontrolü
