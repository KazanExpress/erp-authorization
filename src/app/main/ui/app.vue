<template>
  <div id="app">
    <auth-login :locale="EAuthLocales.RU" gql />
  </div>
</template>

<script setup lang="ts">
import { EAuthLocales } from "pages"; // @kazanexpress/erp-authorization
</script>

<style lang="stylus" scoped>
#app
  height 100vh
  background-color #f5f7f9
</style>
