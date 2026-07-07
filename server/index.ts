import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createApiApp } from './apiRouter.ts';
import { getServerPort } from './lib/env.ts';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(dirname, '..', 'dist');

const app = express();
app.use('/api', createApiApp());
app.use(express.static(distDir));

const port = getServerPort();
app.listen(port, () => {
  console.log(`Smart Email Generator listening on http://localhost:${port}`);
});
