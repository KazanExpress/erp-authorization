import {
  ConvertAuthAccount,
  IServerAuthAccountDto,
  IAuthAccountDto,
  IAuthBody
} from "../models";
import { useWmsBaseApi } from "./config";

const WMS_AUTH_ENDPOINT = "account/oauth/token";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthApi = (
  apiUrl: string,
) => {
  const wmsBaseApi = useWmsBaseApi(apiUrl);

  const login = async (authBody: IAuthBody): Promise<IAuthAccountDto> => {
    const formData = new FormData();

    formData.append("username", authBody.username);
    formData.append("password", authBody.password);
    formData.append("grant_type", authBody.grant_type);

    return wmsBaseApi
      .post(WMS_AUTH_ENDPOINT, {
        body: formData
      })
      .json<IServerAuthAccountDto>()
      .then(ConvertAuthAccount);
  };

  const refreshToken = async (refreshToken: string) => {
    const formData = new FormData();

    formData.append("refresh_token", refreshToken);
    formData.append("grant_type", "refresh_token");

    return wmsBaseApi
      .post(WMS_AUTH_ENDPOINT, {
        body: formData
      })
      .json<IServerAuthAccountDto>()
      .then(ConvertAuthAccount);
  };

  return {
    login,
    refreshToken
  };
};
