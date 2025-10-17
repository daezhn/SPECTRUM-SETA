import { build as viteBuild } from "vite";
import { build as esbuild } from "esbuild";

await viteBuild();

if (!process.env.VERCEL) {
  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    packages: "external",
    bundle: true,
    format: "esm",
    outdir: "dist",
  });
}
