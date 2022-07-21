import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  concat,
  ApolloLink,
  split,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

function getHeaders() {
  const header = {
    "x-hasura-admin-secret":
      "NVs51OIy1kNqQiVO6zZK7ye3VGknsNWiPBK9tn4Aqb3uwgvn3uOXXDuJNG8kJ6m9",
    "x-hasura-role": "user",
    "x-hasura-user-name": localStorage.getItem("token"),
  };
  return header;
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
const wsLink = new WebSocketLink({
  uri: "wss://tidy-seasnail-24.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
    timeout: 30000,
    inactivityTimeout: 30000,
    connectionParams() {
      return {
        header: getHeaders(),
      };
    },
  },
});

const wsAndHttpsLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefination" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const apolloClient = new ApolloClient({
  link: concat(authMiddleware, wsAndHttpsLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
