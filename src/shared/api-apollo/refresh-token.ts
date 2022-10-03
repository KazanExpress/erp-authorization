import { apolloClient, gql, FetchResult } from ".";
import { RefreshToken_refreshToken } from "./models/types";

export const refreshToken = async (
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
