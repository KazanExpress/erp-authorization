import { App } from "vue";
import Login from "./login/ui/index.vue";
import { EAuthLocales } from "shared/locales";
import { uncacheAccount, cacheAccount, getCachedAccount } from "shared/account";
import { IAuthAccountDto } from "shared/account/types";
declare const ErpAuth: {
    install: (app: App) => void;
};
export { ErpAuth, uncacheAccount, cacheAccount, getCachedAccount, EAuthLocales, IAuthAccountDto, Login };
