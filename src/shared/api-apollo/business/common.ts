import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
  DefaultOptions
} from "@apollo/client/core";
import { errorLink } from "./error-link";
import { authLink } from "./auth-link";
import { httpLink } from "./http-link";
import { cache } from "./cache";
import packageSettings from "../../../../package.json";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all"
  }
};

export const initApolloClient = (apiUrl: string): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink(apiUrl)]),
    cache, // use cache in default
    defaultOptions,
    name: "erp-authorization",
    version: packageSettings.version
  });
}
  