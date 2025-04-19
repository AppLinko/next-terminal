import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // 明确需要 polyfill 的模块
      globals: {
        crypto: true, // 为 crypto 模块提供 polyfill
        buffer: true, // 如果需要 buffer 模块
        stream: true, // 如果需要 stream 模块
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './'), // 路径别名
      // 将 crypto 模块指向 crypto-browserify
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true, // 解决 CommonJS 和 ES 模块混用的问题
    },
  },
});