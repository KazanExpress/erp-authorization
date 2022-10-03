import { EAuthLocales } from "shared/locales";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePhone = (locale: EAuthLocales = EAuthLocales.RU): any => {
  const { phoneMask, phoneRegex } = require(`../locales/${locale}.json`);

  const re = new RegExp(phoneRegex, "g");

  const unmaskPhone = (phone: string): string => phone.replace(re, "");

  return {
    phoneMask,
    unmaskPhone
  };
};
