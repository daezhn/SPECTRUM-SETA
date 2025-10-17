<<<<<< codex/fix-chatbot-integration-error-m5zlnd
// When deployed on Vercel the build step transpiles the server entry to
// `server/index.js`. Import that compiled bundle explicitly so the serverless
// function does not attempt to resolve the raw TypeScript sources.
// In local development the bundler is not used, but Node will still resolve the
// `.js` extension correctly thanks to tsx.
import app from "../server/index.js";
=======
import express from "express";
import { registerRoutes } from "../server/routes";
>>>>>> main

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const setupPromise = registerRoutes(app);

export default async function handler(req: any, res: any) {
	await setupPromise;
	return app(req as any, res as any);
}
