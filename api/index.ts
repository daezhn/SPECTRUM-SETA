import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const setupPromise = registerRoutes(app);

export default async function handler(req: any, res: any) {
	await setupPromise;
	return app(req as any, res as any);
}
