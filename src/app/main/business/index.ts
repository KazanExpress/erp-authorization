import "shared/themes/provider.styl";

import { createApp } from "vue";
import App from "../ui/app.vue";
import { ErpAuth } from "pages";

export const app = createApp(App).use(ErpAuth);
app.mount("#app");
