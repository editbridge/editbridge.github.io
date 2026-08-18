import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const root = process.cwd();
const output = path.join(root, "pages-dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(path.join(root, "public"), output, { recursive: true });

const vite = await createServer({
  root,
  configFile: false,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true, hmr: false, ws: false },
});

try {
  const pageModule = await vite.ssrLoadModule("/app/page.tsx");
  const page = renderToStaticMarkup(React.createElement(pageModule.default));
  const stylesheet = (await readFile(path.join(root, "app/globals.css"), "utf8"))
    .replace(/^@import\s+["']tailwindcss["'];?\s*/u, "");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>EditBridge | Ultra-High-Resolution Image Editing</title>
    <meta name="description" content="EditBridge is a faithful and efficient diffusion bridge framework for image editing at resolutions up to 4K." />
    <link rel="icon" href="./favicon.svg" />
    <meta property="og:title" content="EditBridge" />
    <meta property="og:description" content="Faithful and efficient ultra-high-resolution image editing at resolutions up to 4K." />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="./og.png" />
    <style>${stylesheet}</style>
  </head>
  <body>${page}</body>
</html>
`;

  await writeFile(path.join(output, "index.html"), html);
  await writeFile(path.join(output, ".nojekyll"), "");
} finally {
  await vite.close();
}
