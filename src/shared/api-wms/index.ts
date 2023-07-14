import { computed, toRefs } from "vue";
import { useAuthMethods } from "./business/use-auth-methods";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuth = (
  apiUrl: string,
) => {
  const {
    authState,
    getAuthState,
    rehydrateAccount,
    refreshToken,
    login,
    logout
  } = useAuthMethods(apiUrl);
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
