import ky from "ky";

type TKyApi = typeof ky;

export const useWmsBaseApi = (
  apiUrl: string,
): TKyApi => {
  const wmsBaseApi: TKyApi = ky.create({
    prefixUrl: apiUrl,
    headers: {
      Authorization: "Basic bXktY2xpZW50Om15LXNlY3JldA=="
    }
  });

  return wmsBaseApi;
};
