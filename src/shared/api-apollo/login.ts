import { apolloClient, gql, FetchResult } from ".";
import { Mutation_signIn } from "./models/types";
import { cacheAccount } from "shared/account";

export const login = async (
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
