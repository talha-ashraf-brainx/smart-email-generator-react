import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import { generateHandler } from './routes/generateHandler.ts';
import { ApiError } from './errors.ts';

// A full Express app (not a bare Router) so response helpers like res.status/res.json
// are patched correctly whether this is mounted inside Vite's dev middleware stack or
// inside the production Express app.
export function createApiApp(): Express {
  const app = express();

  app.use(express.json());
  app.post('/generate', generateHandler);

  app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ApiError) {
      res.status(error.status).json({ error: { message: error.message, code: error.code } });
      return;
    }
    console.error('[server] Unhandled API error', error);
    res.status(500).json({ error: { message: 'Internal server error.', code: 'INTERNAL_ERROR' } });
  });

  return app;
}
