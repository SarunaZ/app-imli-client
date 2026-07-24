import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client/link/http";
import { SetContextLink } from "@apollo/client/link/context";
import { prerenderStatic } from "@apollo/client/react/ssr";
import Authentication from "Providers/Authentication";
import ThemeSwitcher from "Providers/ThemeProvider";
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetProvider, HelmetServerState } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import App from "./App/";

interface Props {
  url: string;
  cookieHeader: string;
  isLoggedIn: boolean;
}

export async function render({ url, cookieHeader, isLoggedIn }: Props) {
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_CLIENT_GRAPHQL_SCHEMA_LINK,
  });

  const helmetContext: { helmet?: HelmetServerState } = {};
  const authLink = new SetContextLink((prevContext) => {
    const { headers } = prevContext;
    const token = cookieHeader
      .split("; ")
      .find((row) => row.startsWith("auth="))
      ?.split("=")[1];

    return {
      headers: {
        ...headers,
        "Cache-Control": "max-age=3600",
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const { result: html } = await prerenderStatic({
    tree: (
      <StrictMode>
        <ApolloProvider client={client}>
          <HelmetProvider context={helmetContext}>
            <StaticRouter location={url}>
              <Helmet title="Imli Home Utility System" />
              <Authentication isLoggedIn={isLoggedIn}>
                <ThemeSwitcher>
                  <App />
                </ThemeSwitcher>
              </Authentication>
            </StaticRouter>
          </HelmetProvider>
        </ApolloProvider>
      </StrictMode>
    ),
    renderFunction: renderToString,
  });

  return {
    html,
    helmet: helmetContext.helmet,
    apolloState: client.extract(),
  };
}
