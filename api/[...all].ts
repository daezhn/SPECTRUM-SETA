import type { IncomingMessage, ServerResponse } from "http";
import app from "../server/index";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: IncomingMessage, res: ServerResponse) {
  return app(req, res);
}
