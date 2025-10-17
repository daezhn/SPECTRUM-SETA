declare module "../dist/server/index.js" {
  import type { Express } from "express";

  const app: Express;
  export default app;
}
