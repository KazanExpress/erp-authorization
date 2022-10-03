<template>
  <button :class="variant" :disabled="isLoading" @click="handleClick">
    <div v-if="isLoading" class="loader">
      <circullar-loader />
    </div>
    <slot />
  </button>
</template>
<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

import CircullarLoader from "../circullar-loader/index.vue";
import { TButtonVariant } from "./types";

interface IState {
  isError: boolean;
  isLoading: boolean;
}

export default defineComponent({
  name: "base-button",
  components: {
    CircullarLoader
  },
  props: {
    variant: {
      type: String as () => TButtonVariant,
      default: "primary"
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => ({})
    }
  },
  setup(props) {
    const state = reactive<IState>({ isError: false, isLoading: false });
    const handleClick = async (event: MouseEvent) => {
      try {
        state.isError = false;
        state.isLoading = true;
        return await props.onClick(event);
      } catch (e) {
        state.isError = true;
        throw e;
      } finally {
        state.isLoading = false;
      }
    };

    const isLoading = computed(() => props.loading || state.isLoading);
    const isError = computed(() => state.isError || props.error);

    return { handleClick, isLoading, isError };
  }
});
</script>
<style lang="stylus" scoped>
@require '~shared/themes/provider'

button
  cursor pointer
  outline none
  transition background-color 0.2s ease, transform 0.2s ease
  display grid
  grid-auto-flow column
  align-items center
  grid-column-gap 4px
  box-sizing border-box
  position relative
  font-size 14px
  font-weight 500
  font-family Inter, sans-serif

  &:disabled
    cursor default

.primary
  Button(Primary)

.primary-dark
  Button(PrimaryDark)

.secondary
  Button(Secondary)

.text
  Button(Text)

.text-blue
  Button(TextBlue)

.text-light
  Button(TextLight)

.error
  Button(ErrorModal)

.icon
  IconButton()
  border none
  padding 0
  background-color transparent

.loader
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background-color White(A80)
  display flex
  align-items center
  justify-content center
</style>
