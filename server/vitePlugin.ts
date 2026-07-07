import type { Plugin } from 'vite';
import { createApiApp } from './apiRouter.ts';

export function apiDevPlugin(): Plugin {
  return {
    name: 'smart-email-generator-api',
    configureServer(server) {
      server.middlewares.use('/api', createApiApp());
    },
  };
}
