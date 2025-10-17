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
  const forwardedPath =
    req.headers["x-vercel-forwarded-path"] ||
    req.headers["x-forwarded-uri"] ||
    req.headers["x-vercel-original-path"];

  console.log(
    "[api] incoming request",
    req.method,
    req.url,
    "[forwarded:",
    forwardedPath,
    "]"
  );

  if (typeof req.url === "string") {
    try {
      const url = new URL(req.url, "http://localhost");
      const pathParam = url.searchParams.get("path");
      if (pathParam) {
        url.searchParams.delete("path");
        const decodedPath = decodeURIComponent(pathParam);
        const rebuiltPath = decodedPath.startsWith("/")
          ? decodedPath
          : `/${decodedPath}`;
        const remainingQuery = url.searchParams.toString();
        const rewrittenUrl = `/api${rebuiltPath}${remainingQuery ? `?${remainingQuery}` : ""}`;
        req.url = rewrittenUrl;
        req.originalUrl = rewrittenUrl;
        console.log("[api] rewritten url", req.url);
      }
    } catch (error) {
      console.error("Error parsing request URL", error);
    }
  }

  const app = await appPromise;
  return app(req as any, res as any);
}
