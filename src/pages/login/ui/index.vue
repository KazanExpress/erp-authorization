<template>
  <form class="wrapper" @submit.prevent="handleSubmit">
    <component :is="logo" class="logo" />
    <div class="form">
      <div v-if="state.error" class="error-wrapper" data-test-id="div__error">
        <warning-circle-fill class="icon" />
        {{ t[state.errorMessage] }}
      </div>
      <text-field
        v-maska="phoneMask"
        :label="t['username']"
        :invalid="v$.username.$dirty && !!v$.username.$silentErrors.length"
        data-test-id="input__phone"
        v-model="v$.username.$model"
      />
      <tooltip
        :text="t['capslock on']"
        placement="right"
        :is-visible="isCapsLockOn"
        :offset="[11, 5]"
        :is-hover-controlled="false"
        data-test-id="div__capslock"
      >
        <div class="password-wrapper">
          <text-field
            :type="!state.showPassword && 'password'"
            :label="t['password']"
            :invalid="v$.password.$dirty && !!v$.password.$silentErrors.length"
            data-test-id="input__password"
            v-model="v$.password.$model"
            @keyup="handlePasswordKeyUp"
          >
            <eye-show-line
              v-if="state.showPassword"
              data-test-id="icon__eye"
              @click="toggleShowPassword"
            />
            <eye-hide-line
              v-else
              data-test-id="icon__eye"
              @click="toggleShowPassword"
            />
          </text-field>
        </div>
      </tooltip>
    </div>
    <base-button
      :loading="state.loading"
      class="login-button"
      data-test-id="button__login"
    >
      {{ t["login"] }}
    </base-button>
  </form>
</template>

<script lang="ts">
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { maska } from "maska";
import { TimeoutError } from "ky";
import { computed, defineComponent, reactive, ref, PropType } from "vue";
import { EyeHideLine, EyeShowLine, WarningCircleFill } from "shared/icons";
import { BaseButton, Tooltip, TextField } from "shared/ui";
import { usePhone } from "shared/utils/phone";
import { EAuthLocales } from "shared/locales";

type TValues = {
  username: string;
  password: string;
};
const initialState = {
  loading: false,
  showPassword: false,
  error: false,
  errorMessage: ""
};
type TState = typeof initialState;

export default defineComponent({
  directives: { maska },
  components: {
    EyeHideLine,
    EyeShowLine,
    WarningCircleFill,
    BaseButton,
    Tooltip,
    TextField
  },
  props: {
    locale: {
      type: String as PropType<EAuthLocales>,
      default: EAuthLocales.RU
    },
    isProd: {
      type: Boolean,
      default: false
    },
    gql: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const t = require(`shared/locales/${props.locale}.json`);
    const logo =
      require(`../../../shared/assets/${props.locale}/logo.vue`).default;

    const { useAuth } = props.gql
      ? require("shared/api-apollo")
      : require("shared/api-wms");

    const { login } = useAuth(props.locale, props.isProd);

    const { phoneMask, unmaskPhone } = usePhone(props.locale);

    const form = reactive<TValues>({
      username: "",
      password: ""
    });
    const state = reactive<TState>(initialState);
    const isCapsLockOn = ref<boolean>(false);
    const rules = {
      username: {
        required
      },
      password: { required }
    };
    const v$ = useVuelidate(rules, form);
    const handleSubmit = () => {
      v$.value.$validate();
      state.error = false;
      state.errorMessage = "";
      if (!v$.value.$invalid) {
        const username = unmaskPhone(form.username);
        const password = form.password;
        state.loading = true;
        login(username, password)
          .then(account => {
            emit("on-login", account);
          })
          .catch(e => {
            state.error = true;
            if (window.navigator.onLine === false)
              state.errorMessage = "error login no internet";
            else if (
              e instanceof TimeoutError ||
              e.message.includes("NetworkError") ||
              e?.response?.status > 400
            )
              state.errorMessage = "error login cant connect to server";
            else state.errorMessage = "error login invalid";
          })
          .finally(() => (state.loading = false));
      }
    };
    const toggleShowPassword = () => (state.showPassword = !state.showPassword);
    const isDisabled = computed(() => state.loading || v$.value.$invalid);
    const handlePasswordKeyUp = (event: KeyboardEvent) => {
      isCapsLockOn.value = event.getModifierState?.("CapsLock");
    };

    return {
      t,
      logo,
      phoneMask,
      unmaskPhone,
      form,
      handleSubmit,
      v$,
      state,
      toggleShowPassword,
      isDisabled,
      handlePasswordKeyUp,
      isCapsLockOn
    };
  }
});
</script>

<style lang="stylus" scoped>
@require '../../../shared/themes/provider'
.logo
  align-self center

.wrapper
  LoginWrapper()
  width 380px
  display flex
  flex-direction column
  justify-content space-between
  row-gap 40px

.form
  display flex
  flex-direction column
  row-gap 24px

.error-wrapper
  LoginError()
  display grid
  grid-template-columns auto 1fr
  grid-column-gap 12px
  align-items center
  padding 12px
  border-radius 4px
  font-size 12px

.password-wrapper
  flex 1

.login-button
  height 42px
  justify-items center

@keyframes rotation
  to
    transform rotate(360deg)

.loading
  animation rotation 1s linear infinite

.icon {
  font-size 24px
  width 24px
  height 24px
}
</style>
