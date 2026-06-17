import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { reihDevTunnel } from './vite-plugins/reihDevTunnel.js';
import {
  WIDGET_DEV_API_BASE_URL,
  WIDGET_DEV_APP_URL,
  WIDGET_LOCAL_API_BASE_URL,
  WIDGET_PROD_API_BASE_URL,
  WIDGET_PROD_APP_URL,
} from './src/widgetEnv.js';

const reihApiProxy = {
  '/api/reih': {
    target: WIDGET_DEV_API_BASE_URL,
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api\/reih/, ''),
  },
};

/** Point widget at dev app + same-origin session proxy (prod API blocks localhost CORS). */
function reihWidgetDevEnv() {
  return {
    name: 'reih-widget-dev-env',
    transform(code, id) {
      if (!id.includes('reimaginehome-widget')) {
        return;
      }

      return {
        code: code
          .replaceAll(WIDGET_PROD_API_BASE_URL, WIDGET_LOCAL_API_BASE_URL)
          .replaceAll(WIDGET_DEV_API_BASE_URL, WIDGET_LOCAL_API_BASE_URL)
          .replaceAll(WIDGET_PROD_APP_URL, WIDGET_DEV_APP_URL)
          .replace('return "prod"', 'return "dev"'),
        map: null,
      };
    },
  };
}

export default defineConfig({
  plugins: [reihWidgetDevEnv(), reihDevTunnel(), react()],
  optimizeDeps: {
    // Pre-bundle skips Vite transform plugins — keep prod API URL and CORS fails.
    exclude: ['reimaginehome-widget'],
  },
  server: {
    port: 5180,
    strictPort: true,
    proxy: reihApiProxy,
  },
  preview: {
    port: 5180,
    strictPort: true,
    proxy: reihApiProxy,
  },
});
