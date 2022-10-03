import { setContext } from "@apollo/client/link/context";
import {
  AUTHORIZATION_KEY,
  localStorageService
} from "shared/services/local-storage";

// authLink – just need it to work with tokens in headers
export const authLink = setContext((_, { headers }) => {
  const auth = localStorageService.get(AUTHORIZATION_KEY) || "";
  let token;

  try {
    token = auth && JSON.parse(auth).accessToken;
  } catch (e) {
    console.log(e);
  }

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});
