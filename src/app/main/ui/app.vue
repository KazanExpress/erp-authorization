<template>
  <div id="app">
    <auth-login :locale="EAuthLocales.RU" gql api-url="https://gateway-erp.dev.cluster.kznexpess.com/" @on-login="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { EAuthLocales, IAuthAccountDto } from "pages"; // @kazanexpress/erp-authorization

const handleLogin = (payload: IAuthAccountDto) => {
  console.log(payload);
};
</script>

<style lang="stylus" scoped>
#app
  height 100vh
  background-color #f5f7f9
</style>
