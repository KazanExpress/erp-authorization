<template>
  <div class="circullar-loader" />
</template>
<style lang="stylus" scoped>
@require '~shared/themes/provider'

@keyframes rotate
  from
    transform rotate(0deg)

  to
    transform rotate(360deg)

@keyframes rotate
  from
    -webkit-transform rotate(0deg)

  to
    -webkit-transform rotate(360deg)

.circullar-loader
  width 10px
  height 10px
  border solid 2px Violet()
  border-radius 50%
  border-right-color transparent
  border-bottom-color transparent
  -webkit-transition all 0.5s ease-in
  -webkit-animation-name rotate
  -webkit-animation-duration 1s
  -webkit-animation-iteration-count infinite
  -webkit-animation-timing-function linear
  transition all 0.5s ease-in
  animation-name rotate
  animation-duration 1s
  animation-iteration-count infinite
  animation-timing-function linear
</style>
