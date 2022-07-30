import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  concat,
  ApolloLink,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

function getHeaders() {
  const token = localStorage.getItem("apollo-token");
  if (token) {
    return {
      Authorization: "Bearer " + token,
    };
  }
  return { Authorization: "" };
}
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: getHeaders(),
  });
  return forward(operation);
});
const httpLink = createHttpLink({
  uri: "https://tidy-seasnail-24.hasura.app/v1/graphql",
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
