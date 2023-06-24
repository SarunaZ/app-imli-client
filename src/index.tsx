import "./index.scss";
import React from "react";
import { createRoot } from "react-dom/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { getCookieData } from "./Utilities/cookieParser";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Authentication from "Providers/Authentication";

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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const container = createRoot(document.getElementById("app"));

container.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter>
          <Helmet title="Imli Home Utility System" />
          <Authentication>
            <App />
          </Authentication>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>,
);
