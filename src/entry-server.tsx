import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from '@apollo/client/link/context'
import Authentication from 'Providers/Authentication'
import ThemeSwitcher from 'Providers/ThemeProvider'
import { StrictMode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import App from './App/'
import { renderToStringWithData } from '@apollo/client/react/ssr'
interface Props {
  url: string;
  cookieHeader: string;
  isLoggedIn: boolean;
}

export async function render({ url, cookieHeader, isLoggedIn }: Props) {
  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_CLIENT_GRAPHQL_SCHEMA_LINK,
  });

  const helmetContext: { helmet?: any } = {};
  const authLink = setContext((_, { headers }) => {
    const token = cookieHeader.split('; ').find(row => row.startsWith('auth='))?.split('=')[1];

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

  const html = await renderToStringWithData(
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
    </StrictMode>,
  )
  return { html, helmet: helmetContext.helmet }
}
