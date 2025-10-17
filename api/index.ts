// When deployed on Vercel the build step transpiles the server entry to
// `server/index.js`. Import that compiled bundle explicitly so the serverless
// function does not attempt to resolve the raw TypeScript sources.
// In local development the bundler is not used, but Node will still resolve the
// `.js` extension correctly thanks to tsx.
import app from "../server/index.js";

export default app;
