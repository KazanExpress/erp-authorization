/* eslint-disable camelcase */
export interface IAuthBody {
  grant_type: string;
  username: string;
  password: string;
}

export interface IRefreshBody {
  refresh_token: string;
}
