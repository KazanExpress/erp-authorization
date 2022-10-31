import ky from "ky";

import { EAuthLocales } from "shared/locales";

const WMS_API_URL_DEV: Record<EAuthLocales, string> = {
  [EAuthLocales.RU]: "https://wms-api.dev.cluster.kznexpess.com",
  [EAuthLocales.UZ]: "https://api.wms.dev.cluster.daymarket.uz"
};

const WMS_API_URL_PROD: Record<EAuthLocales, string> = {
  [EAuthLocales.RU]: "https://api.wms.kznexpress.ru",
  [EAuthLocales.UZ]: "https://api.wms.umarket.uz/"
};

type TKyApi = typeof ky;

export const useWmsBaseApi = (
  locale: EAuthLocales = EAuthLocales.RU,
  isProd: boolean
): TKyApi => {
  const wmsBaseApi: TKyApi = ky.create({
    prefixUrl: isProd ? WMS_API_URL_PROD[locale] : WMS_API_URL_DEV[locale],
    headers: {
      Authorization: "Basic bXktY2xpZW50Om15LXNlY3JldA=="
    }
  });

  return wmsBaseApi;
};
