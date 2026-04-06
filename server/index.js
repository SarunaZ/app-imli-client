import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { createServer as createViteServer } from 'vite'
import { getRouteAccess } from './routesMeta.js'
import { ROUTE_LOGIN_PAGE } from '../src/App/constants.ts'
import http from 'node:http';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(__dirname, '../.env') })
dotenv.config({ path: path.resolve(__dirname, '../.env.local'), override: true })

const PORT = process.env.PORT || 3000;
const isSsrEnabled = String(process.env.VITE_SSR_ON).toLowerCase() === 'true';

async function createServer() {
  const app = express()

  const server = http.createServer(app);


  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  // When the server restarts (for example after the user modifies
  // vite.config.js), `vite.middlewares` is still going to be the same
  // reference (with a new internal stack of Vite and plugin-injected
  // middlewares). The following is valid even after restarts.


  if (process.env.NODE_ENV === 'development') {
    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      server: {
        host: true,
        port: 3000,
        strictPort: true,
        hmr: {
          server,
          protocol: "ws",
          host: "localhost",
          port: 3000,
          clientPort: 3000
        },
        watch: {
          usePolling: true,
          interval: 100
        }
      },
      appType: 'custom',
    })

    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

    console.log("[vite] (client) dev build complete------------------");

    app.use(vite.middlewares)

    app.use('*all', async (req, res, next) => {
      const url = req.originalUrl

      try {
        // 1. Read index.html
        let template = fs.readFileSync(
          path.resolve(__dirname, '../index.html'),
          'utf-8',
        )


        // 2. Apply Vite HTML transforms. This injects the Vite HMR client,
        //    and also applies HTML transforms from Vite plugins, e.g. global
        //    preambles from @vitejs/plugin-react



        // 3. Load the server entry. ssrLoadModule automatically transforms
        //    ESM source code to be usable in Node.js! There is no bundling
        //    required, and provides efficient invalidation similar to HMR.
        const cookieHeader = req.headers.cookie ?? "";
        // const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

        // 4. render the app HTML. This assumes entry-server.js's exported
        //     `render` function calls appropriate framework SSR APIs,
        //    e.g. ReactDOMServer.renderToString()

        // const { html: appHtml, helmet } = await render({ url, cookieHeader, isLoggedIn: !!cookieHeader.includes("auth") })

        // 5. Inject the app-rendered HTML into the template.


        if (isSsrEnabled) {
          if (!req.headers.accept?.includes("text/html")) return next();

          const { html: appHtml, helmet } = await render({ url, cookieHeader, isLoggedIn: !!cookieHeader.includes("auth") })
          console.log(helmet, 'helmet');
          const html = template.replace("<!--ssr-outlet-->", appHtml)
            .replace("<!--ssr-head-->", helmet?.title?.toString() ?? "")
            .replace("<!--ssr-meta-->", helmet?.meta?.toString() ?? "")
            .replace("<!--ssr-link-->", helmet?.link?.toString() ?? "");

          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
          return;
        } else {
          template = await vite.transformIndexHtml(url, template)
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template)
        }
      } catch (e) {
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })
  }

  if (process.env.NODE_ENV === 'production') {
    app.use('*all', async (req, res, next) => {
      const url = req.originalUrl

      try {
        // 1. Read index.html
        let template = fs.readFileSync(
          path.resolve(__dirname, '../index.html'),
          'utf-8',
        )
        const cookieHeader = req.headers.cookie ?? "";

        if (getRouteAccess(url) === "private" && !cookieHeader.includes("auth")) {
          res.redirect(ROUTE_LOGIN_PAGE);
          return;
        }

        template = fs.readFileSync(path.resolve(__dirname, '../dist-client/index.html'), 'utf-8');
        const { render } = fs.readFileSync(path.resolve(__dirname, '../dist-server/entry-server.js'), 'utf-8');

        const { html: appHtml, helmet } = await render({ url, cookieHeader, isLoggedIn: !!cookieHeader.includes("auth") })
        const html = template.replace("<!--ssr-outlet-->", appHtml)
          .replace("<!--ssr-head-->", helmet?.title?.toString() ?? "")
          .replace("<!--ssr-meta-->", helmet?.meta?.toString() ?? "")
          .replace("<!--ssr-link-->", helmet?.link?.toString() ?? "");

        app.use("/assets", express.static(path.resolve(__dirname, "../dist/client/assets")));

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);

      } catch (e) {
        console.error(e)
        // If an error is caught, let Vite fix the stack trace so it maps back
        // to your actual source code.
        next(e)
      }
    })
  }


  server.listen(PORT)
}

createServer()
