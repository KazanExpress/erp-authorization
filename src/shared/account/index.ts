import { IAuthAccountDto } from "./types";
import { localStorageService } from "shared/services/local-storage";

const AUTH_KEY = "auth";

export const cacheAccount = (account: IAuthAccountDto): void =>
  localStorageService.set(AUTH_KEY, JSON.stringify(account));

export const uncacheAccount = (): void => localStorageService.remove(AUTH_KEY);

export const getCachedAccount = (): IAuthAccountDto | null => {
  const account = localStorageService.get(AUTH_KEY);

  if (account === null) {
    return null;
  }

  try {
    return JSON.parse(account);
  } catch {
    return null;
  }
};
