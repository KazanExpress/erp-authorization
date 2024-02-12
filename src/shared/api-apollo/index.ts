export * from "./models/types";
export { gql, ApolloQueryResult, FetchResult } from "@apollo/client/core";
import { initApolloClient } from "./business";
import { cacheAccount } from "shared/account";
import { IAuthAccountDto } from "shared/account/types";
import { useAuthMethods } from "./use-auth-methods";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuth = (apiUrl: string) => {
  const {login: gqlLogin, refreshToken: gqlRefreshToken} = useAuthMethods(initApolloClient(apiUrl));

  const formatAccountResponse = data => {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      userInfo: {
        id: data.account.accountId,
        firstName: data.account.firstName,
        lastName: data.account.lastName,
        patronymic: data.account.patronymic,
        role: data.account.role.name,
        permissions: data.account.role.permissions
      }
    } as IAuthAccountDto;
  };

  const login = async (username: string, password: string) => {
    const response = await gqlLogin(username, password);

    if (response) {
      const formatedAccount = formatAccountResponse(response);
      cacheAccount(formatedAccount);

      return formatedAccount;
    }

    return null;
  };

  const refreshToken = async (token: string) => {
    const response = await gqlRefreshToken(token);

    if (response.data) {
      const formatedAccount = formatAccountResponse(response.data);
      cacheAccount(formatedAccount);

      return formatedAccount;
    }

    return null;
  };

  return {
    login,
    refreshToken
  };
};
