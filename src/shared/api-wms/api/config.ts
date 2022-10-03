import ky from "ky";

import { EAuthLocales } from "shared/locales";

const WMS_API_URL: Record<EAuthLocales, string> = {
  [EAuthLocales.RU]: "https://wms-api.dev.cluster.kznexpess.com",
  [EAuthLocales.UZ]: "https://api.wms.dev.cluster.daymarket.uz"
};

type TKyApi = typeof ky;

export const useWmsBaseApi = (
  locale: EAuthLocales = EAuthLocales.RU
): TKyApi => {
  const wmsBaseApi: TKyApi = ky.create({
    prefixUrl: WMS_API_URL[locale],
    headers: {
      Authorization: "Basic bXktY2xpZW50Om15LXNlY3JldA=="
    }
  });

  return wmsBaseApi;
};
