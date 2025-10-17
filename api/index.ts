import type { Express } from "express";

const appPromise: Promise<Express> = (async () => {
  const isProduction = Boolean(
    process.env.VERCEL || process.env.NODE_ENV === "production"
  );

  const moduleUrl = isProduction
    ? new URL("../dist/server/index.js", import.meta.url)
    : new URL("../server/index.ts", import.meta.url);

  const mod = await import(moduleUrl.href);
  return mod.default as Express;
})();

export default async function handler(req: any, res: any) {
  const app = await appPromise;
  return app(req as any, res as any);
}
