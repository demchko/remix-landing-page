import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
  // Add SSR configuration to handle external dependencies
  ssr: {
    noExternal: ["lucide-react", "@radix-ui/*"], // Bundle these into SSR build
  },
  // Optimize build process
  build: {
    // Limit parallel file operations to avoid EMFILE
    rollupOptions: {
      maxParallelFileOps: 10,
    },
    // Ensure proper minification and chunking
    minify: "esbuild",
    // Optional: Increase memory limit if needed (Vercel has a 4GB limit)
    // Vercel auto-handles this, but good to know
    // maxMemory: 4096,
  },
});
