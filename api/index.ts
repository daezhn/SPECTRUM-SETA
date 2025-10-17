import type { Express } from "express";

const appPromise: Promise<Express> = (async () => {
  const isProduction = Boolean(
    process.env.VERCEL || process.env.NODE_ENV === "production"
  );

  if (isProduction) {
    const mod = await import("../dist/server/index.js");
    return mod.default as Express;
  }

  const mod = await import("../server/index");
  return mod.default as Express;
})();

export default async function handler(req: any, res: any) {
  const app = await appPromise;
  return app(req as any, res as any);
}
