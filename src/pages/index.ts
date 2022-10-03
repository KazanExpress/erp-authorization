import { App } from "vue";

import Login from "./login/ui/index.vue";
import { EAuthLocales } from "shared/locales";
import { uncacheAccount } from "shared/account";
import { IAuthAccountDto } from "shared/account/types";

const ErpAuth = {
  install: (app: App): void => {
    app.component("auth-login", Login);
  }
};

export { ErpAuth, uncacheAccount, EAuthLocales, IAuthAccountDto };
