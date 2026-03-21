import "./index.scss";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { getCookieData } from "Utilities/cookieParser";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Authentication from "Providers/Authentication";
import ThemeSwitcher from "Providers/ThemeProvider";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => console.log("Service worker registration failed:", error));
  });
}

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_CLIENT_GRAPHQL_LINK,
});

const authLink = setContext((_, { headers }) => {
  const token = getCookieData("auth");

  return {
    headers: {
      ...headers,
      "Cache-Control": "max-age=3600",
      Authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__ as NormalizedCacheObject),
});

hydrateRoot(document.getElementById("app") as HTMLElement,
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <Helmet title="Imli Home Utility System" />
          <Authentication>
            <ThemeSwitcher>
              <App />
            </ThemeSwitcher>
          </Authentication>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>
);
