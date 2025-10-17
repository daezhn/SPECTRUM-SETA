import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isWindows = process.platform === "win32";
const binExt = isWindows ? ".cmd" : "";

const run = (command, args) => {
  const executable = resolve(__dirname, "..", "node_modules", ".bin", `${command}${binExt}`);
  const result = spawnSync(executable, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run("vite", ["build"]);

if (!process.env.VERCEL) {
  run("esbuild", [
    "server/index.ts",
    "--platform=node",
    "--packages=external",
    "--bundle",
    "--format=esm",
    "--outdir=dist",
  ]);
}
