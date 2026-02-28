import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"], // Build for CommonJS and ES modules
  dts: true, // Generate declaration file (.d.ts)
  minify: true, // Minify the output to ensure minimal bundle size
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react", "react-dom"], // Don't bundle React
});
