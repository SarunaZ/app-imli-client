import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider } from "@apollo/client/react";
import App from "App";
import Authentication from "Providers/Authentication";
import { getCookieData } from "Utilities/cookieParser";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";

export default function ssrRender(url: string, options: object) {
  const httpLink = createHttpLink({
    uri: process.env.CLIENT_GRAPHQL_LINK,
  });
  const authLink = setContext((_, { headers }) => {
    const token = getCookieData("auth");

    return {
      headers: {
        ...headers,
        authorization: `${token}`,
      },
    };
  });

  const client = new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const stream = renderToPipeableStream(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <StaticRouter location={url}>
            <Helmet title="Imli Home Utility System" />
            <Authentication>
              <App />
            </Authentication>
          </StaticRouter>
        </HelmetProvider>
      </ApolloProvider>
    </React.StrictMode>,
    options,
  );

  return stream;
}
