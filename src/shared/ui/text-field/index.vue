<template>
  <div :class="!!label && 'withLabel'">
    <span v-if="!!label" class="label">
      {{ label }}
    </span>
    <div class="wrapper">
      <input
        ref="inputRef"
        :disabled="disabled"
        :class="{ input: true, invalid, success }"
        v-bind="$attrs"
        :value="$attrs.modelValue"
        @input="updateModel"
      />
      <div v-if="hasIconSlot" class="icons-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  Slots,
  watch
} from "vue";

export default defineComponent({
  name: "text-field",
  inheritAttrs: false,
  props: {
    invalid: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isAutoFocused: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, { slots, emit }) {
    const hasIconSlot = !!slots.default;
    const iconCount = ref(0);

    const gapCount = computed(() => iconCount.value || 1);

    const updateIconCount = (slotsContainer: Slots = slots) => {
      if (slotsContainer.default) {
        iconCount.value = slotsContainer
          .default()
          .filter(el => el.shapeFlag !== 8).length;
      } else {
        iconCount.value = 0;
      }
    };

    const inputRef = ref<HTMLInputElement | null>(null);

    const updateModel = data => {
      emit("update:modelValue", data.target?.value?.trim());
    };

    onMounted(() => {
      updateIconCount();
      nextTick(() => {
        if (!props.isAutoFocused) return;
        inputRef.value && inputRef.value.focus();
      });
    });

    watch(() => slots, updateIconCount, {
      deep: true,
      immediate: true
    });

    return { hasIconSlot, iconCount, gapCount, inputRef, updateModel };
  }
});
</script>
<style lang="stylus" scoped>
@require '~shared/themes/provider'

.wrapper
  position relative

.withLabel
  display grid
  grid-row-gap 8px

.label
  Typography(Medium M Short)

.icons-wrapper
  display grid
  grid-auto-flow column
  grid-column-gap 12px
  position absolute
  right 12px
  top 50%
  transform translateY(-50%)

.input
  TextField()
  width 100%
  overflow hidden
  padding-right: calc(v-bind(iconCount) * 32px + (12px * v-bind(gapCount)))

.invalid
  TextField(Invalid)

.success
  TextField(Success)
</style>
