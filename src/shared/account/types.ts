import { mapFactory } from "parakeet-mapper";

const enum EAccountRole {
  ADMIN = "admin"
}

const enum EPermissions {}

export interface IServerAuthUserInfo {
  firstName: string;
  lastName: string;
  role: EAccountRole;
  id: number;
  zoneId: number;
  linkedDeliveryPointId?: number;
  patronymic?: string;
}

export interface IAuthUserInfo {
  firstName: string;
  lastName: string;
  role: EAccountRole;
  permissions: EPermissions[];
  table?: number;
  id: number;
  zoneId?: number;
  linkedDeliveryPointId?: number;
  patronymic?: string;
}

export const ConvertAuthUserInfo = mapFactory<
  IServerAuthUserInfo,
  IAuthUserInfo
>({
  firstName: true,
  lastName: true,
  patronymic: true,
  role: true,
  permissions: () => [],
  id: true,
  zoneId: true
});

export interface IServerAuthAccountDto {
  access_token: string;
  token_type: string;
  refresh_token: string;
  scope: string;
  expires_in: number;
  userInfo: IServerAuthUserInfo;
}

export interface IAuthAccountDto {
  accessToken: string;
  tokenType?: string;
  refreshToken: string;
  scope?: string;
  expiresIn?: number;
  userInfo: IAuthUserInfo;
}

export const ConvertAuthAccount = mapFactory<
  IServerAuthAccountDto,
  IAuthAccountDto
>({
  accessToken: "access_token",
  expiresIn: "expires_in",
  refreshToken: "refresh_token",
  tokenType: "token_type",
  scope: true,
  userInfo: [ConvertAuthUserInfo]
});
