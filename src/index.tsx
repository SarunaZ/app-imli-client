import './index.scss';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const GRAPHQL_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://imli-shop.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql';


const client = new ApolloClient({
  uri: GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);