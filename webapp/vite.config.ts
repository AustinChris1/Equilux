import { defineConfig, type PluginOption } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasmPlugin from 'vite-plugin-wasm'

// the package's CJS/ESM typings disagree under nodenext; the runtime default export is the factory
const wasm = ((wasmPlugin as unknown as { default?: () => PluginOption }).default ?? wasmPlugin) as unknown as () => PluginOption

// The compiled Compact contract lives in ../contract/build and imports
// @midnight-ntwrk/compact-runtime. Resolve it from THIS package so the hosted
// build (which installs only webapp's dependencies) finds one runtime copy.
const runtime = path.resolve(import.meta.dirname, 'node_modules/@midnight-ntwrk/compact-runtime')

export default defineConfig({
  plugins: [react(), tailwindcss(), wasm()],
  resolve: {
    alias: { '@midnight-ntwrk/compact-runtime': runtime },
    dedupe: ['@midnight-ntwrk/compact-runtime', '@midnight-ntwrk/onchain-runtime-v3'],
  },
  build: { target: 'esnext' },
  optimizeDeps: { exclude: ['@midnight-ntwrk/onchain-runtime-v3'], include: ['@midnight-ntwrk/compact-runtime > object-inspect'] },
  server: { fs: { allow: ['..'] } },
})
