import { computed, toRefs } from "vue";
import { useAuthMethods } from "./business/use-auth-methods";
import { EAuthLocales } from "shared/locales";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuth = (locale: EAuthLocales = EAuthLocales.RU) => {
  const {
    authState,
    getAuthState,
    rehydrateAccount,
    refreshToken,
    login,
    logout
  } = useAuthMethods(locale);
  const isAuthenticated = computed(() => authState?.account !== null);
  const token = computed(() => authState.account?.accessToken);
  const rtoken = computed(() => authState.account?.refreshToken);

  const role = computed(() => {
    return authState.account?.userInfo.role;
  });

  return {
    isAuthenticated: isAuthenticated.value,
    token: token.value,
    rtoken: rtoken.value,
    role,
    getAuthState,
    rehydrateAccount,
    refreshToken,
    login,
    logout,
    ...toRefs(authState)
  };
};
