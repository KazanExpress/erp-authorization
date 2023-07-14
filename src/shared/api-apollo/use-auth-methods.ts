import { gql, FetchResult } from ".";
import { RefreshToken_refreshToken, Mutation_signIn } from "./models/types";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client/core";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthMethods = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const login = async (
    username: string,
    password: string
  ): Promise<FetchResult<Mutation_signIn>> => {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation Mutation($username: String!, $password: String!) {
          signIn(username: $username, password: $password) {
            accessToken
            refreshToken
            account {
              accountId
              phone
              firstName
              lastName
              patronymic
              dateCreated
              role {
                name
                localizedName
                description
                permissions
              }
            }
          }
        }
      `,
      variables: {
        username,
        password
      }
    });
  
    return response?.data.signIn;
  };
  
  
  const refreshToken = async (
    refreshToken: string
  ): Promise<FetchResult<RefreshToken_refreshToken>> => {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation RefreshToken($refreshToken: String!) {
          refreshToken(refreshToken: $refreshToken) {
            accessToken
            refreshToken
          }
        }
      `,
      variables: {
        refreshToken
      }
    });
  
    return response.data;
  };

  return {login, refreshToken}
}

