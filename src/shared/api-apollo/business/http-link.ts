import { createHttpLink, ApolloLink } from "@apollo/client/core";

// httpLink – just need it to work
export const httpLink = (apiUrl: string): ApolloLink => createHttpLink({ uri: apiUrl });
