import { build as viteBuild } from "vite";
import { build as esbuild } from "esbuild";

await viteBuild();

await esbuild({
  entryPoints: ["server/index.ts"],
  platform: "node",
  packages: "external",
  bundle: true,
  format: "esm",
  outfile: "server/index.js",
});
