/* eslint-disable no-useless-constructor */
export const AUTH_KEY = "auth";
class LocalStorageService {
  public set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public get(key: string): string | null {
    return localStorage.getItem(key);
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export const localStorageService = new LocalStorageService();
export const AUTHORIZATION_KEY = "auth";
