import './index.scss';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { setContext } from "@apollo/client/link/context";

import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { getCookieData } from 'Utilities/cookieParser';
const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_LINK })
const authLink = setContext((_, { headers }) => {
  const token = getCookieData('auth');


  return {
    headers: {
      ...headers,
      authorization: `${token}`
    }
  }
})

const client = new ApolloClient({
  link:authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
