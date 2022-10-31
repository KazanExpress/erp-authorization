import { reactive, readonly } from "vue";
import { useAuthApi } from "../api";
import { IAuthAccountDto } from "../models";
import { EAuthLocales } from "shared/locales";
import { cacheAccount, uncacheAccount, getCachedAccount } from "shared/account";

interface IAuthState {
  account: IAuthAccountDto | null;
  error: string;
}

const initialAuthState: IAuthState = {
  account: null,
  error: ""
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthMethods = (
  locale: EAuthLocales = EAuthLocales.RU,
  isProd = false
) => {
  const authApi = useAuthApi(locale, isProd);

  const authState = reactive<IAuthState>(initialAuthState);

  const getAuthState = () => readonly<IAuthState>(authState);

  const rehydrateAccount: () => void = () => {
    authState.account = getCachedAccount();
  };

  const refreshToken: () => Promise<IAuthAccountDto> = async () => {
    if (!authState.account) {
      throw Error("Not authorized");
    }

    authState.account = await authApi.refreshToken(
      authState.account.refreshToken
    );
    cacheAccount(authState.account);

    return authState.account;
  };

  const login = async (
    username: string,
    password: string
  ): Promise<IAuthAccountDto> => {
    authState.account = await authApi.login({
      username,
      password,
      grant_type: "password"
    });

    if (authState.account) {
      cacheAccount(authState.account);
    }

    return authState.account;
  };

  const logout = (): void => {
    uncacheAccount();
    authState.account = null;
  };

  return {
    authState,
    getAuthState,
    rehydrateAccount,
    refreshToken,
    login,
    logout
  };
};
