import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://dashing-mouse-23.hasura.app/v1/graphql",
});

//Auth

const middlewareAuth = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("loginToken");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(middlewareAuth, httpLink),
  cache,
});
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
