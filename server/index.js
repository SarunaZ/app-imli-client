import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";
import { getRouteAccess } from "./routesMeta.js";
import { ROUTE_LOGIN_PAGE } from "../src/App/constants.ts";
import http from "node:http";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({
  path: path.resolve(__dirname, "../.env.local"),
  override: true,
});

const PORT = process.env.PORT || 3000;
const isSsrEnabled = String(process.env.VITE_SSR_ON).toLowerCase() === "true";

async function createServer() {
  const app = express();

  const server = http.createServer(app);

  if (process.env.NODE_ENV === "development") {
    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, "../vite.config.ts"),
      server: {
        host: true,
        port: 3001,
        strictPort: true,
        hmr: {
          server,
          protocol: "ws",
          host: "localhost",
          port: 3010,
          clientPort: 3001,
        },
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      appType: "custom",
    });

    console.log("[vite] (client) dev build complete------------------");

    app.use(vite.middlewares);

    app.use("*all", async (req, res, next) => {
      const url = req.originalUrl;

      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, "../index.html"),
          "utf-8",
        );

        template = await vite.transformIndexHtml(url, template);

        if (isSsrEnabled) {
          if (!req.headers.accept?.includes("text/html")) return next();

          const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
          const cookieHeader = req.headers.cookie ?? "";
          const { html: appHtml, helmet } = await render({
            url,
            cookieHeader,
            isLoggedIn: !!cookieHeader.includes("auth"),
          });
          const html = template
            .replace("<!--ssr-outlet-->", appHtml)
            .replace("<!--ssr-head-->", helmet?.title?.toString() ?? "")
            .replace("<!--ssr-meta-->", helmet?.meta?.toString() ?? "")
            .replace("<!--ssr-link-->", helmet?.link?.toString() ?? "");

          res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } else {
          res.status(200).set({ "Content-Type": "text/html" }).end(template);
        }
      } catch (e) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  }

  if (process.env.NODE_ENV === "production") {
    console.log(process.env.NODE_ENV);
    console.log(process.env.PORT);

    app.use(
      express.static(path.resolve(__dirname, "../dist-client"), {
        index: false,
      }),
    );

    app.use("*all", async (req, res, next) => {
      const url = req.originalUrl;
      console.log(url);

      try {
        // 1. Read index.html
        let template = fs.readFileSync(
          path.resolve(__dirname, "../index.html"),
          "utf-8",
        );

        const cookieHeader = req.headers.cookie ?? "";

        if (
          getRouteAccess(url) === "private" &&
          !cookieHeader.includes("auth")
        ) {
          res.redirect(ROUTE_LOGIN_PAGE);
          return;
        }

        template = fs.readFileSync(
          path.resolve(__dirname, "../dist-client/index.html"),
          "utf-8",
        );

        const { render } = await import(
          path.resolve(__dirname, "../dist-server/entry-server.js")
        );

        const {
          html: appHtml,
          helmet,
          apolloState,
        } = await render({
          url,
          cookieHeader,
          isLoggedIn: !!cookieHeader.includes("auth"),
        });

        // Serialize the SSR Apollo cache so the client can restore it and
        // hydrate against the same data (avoids the network refetch + hydration
        // mismatch). Escape `<` to prevent a `</script>` in the data breaking out.
        const stateScript = `<script>window.__APOLLO_STATE__=${JSON.stringify(
          apolloState,
        ).replace(/</g, "\\u003c")}</script>`;

        const html = template
          .replace("<!--ssr-outlet-->", appHtml)
          .replace("<!--ssr-head-->", helmet?.title?.toString() ?? "")
          .replace("<!--ssr-meta-->", helmet?.meta?.toString() ?? "")
          .replace("<!--ssr-link-->", helmet?.link?.toString() ?? "")
          .replace("</body>", `${stateScript}</body>`);

        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        console.error(e);
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        next(e);
      }
    });
  }

  server.listen(PORT);
  console.log(`server open to ${PORT}`);
}

createServer();
