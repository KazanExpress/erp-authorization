<template>
  <div>
    <div ref="slot" class="slot" v-bind="$attrs">
      <slot />
    </div>
    <transition name="tooltip">
      <div
        ref="tooltip"
        v-show="isHovered || isVisible"
        class="tooltip"
        role="tooltip"
        data-test-id="tooltip"
      >
        {{ text }}
        <div class="arrow" data-popper-arrow />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      default: "top"
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    isHoverControlled: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Array as () => number[],
      default: () => [0, 5]
    }
  },
  setup(props) {
    const slot = ref<HTMLElement>();
    const tooltip = ref<HTMLElement>();
    const isHovered = ref(false);

    const showTooltip = () => {
      if (slot.value && tooltip.value) {
        //todo: заменить на antdv
        /*console.log(slot.value, tooltip.value, {
          placement: props.placement,
          modifiers: [
            { name: 'flip', enabled: true, options: { boundary: [] } },
            {
              name: 'offset',
              options: {
                offset: props.offset,
              },
            },
            {
              name: 'arrow',
              options: {
                padding: 15,
              },
            },
          ],
        });*/
      }
    };

    const handleHover = () => {
      isHovered.value = true;
      showTooltip();
    };

    watch(
      () => props.isVisible,
      value => {
        if (value) {
          showTooltip();
        }
      }
    );

    const handleUnhover = () => {
      isHovered.value = false;
    };

    onMounted(() => {
      if (props.isHoverControlled) {
        slot.value?.addEventListener("mouseenter", handleHover);
        slot.value?.addEventListener("mouseleave", handleUnhover);
      }
    });

    return { slot, tooltip, isHovered };
  }
});
</script>

<style lang="stylus" scoped>
@require '../../themes/provider'

.slot
  display flex
  align-items center

.tooltip
  Tooltip()
  z-index 10
  padding 10px
  border-radius 4px

.arrow, .arrow::before
  position absolute
  width 8px
  height 8px
  background inherit

.arrow
  visibility hidden

.arrow::before
  visibility visible
  content ''
  transform rotate(45deg)

.tooltip[data-popper-placement^='top'] > .arrow
  bottom -4px

.tooltip[data-popper-placement^='bottom'] > .arrow
  top -4px

.tooltip[data-popper-placement^='left'] > .arrow
  right -4px

.tooltip[data-popper-placement^='right'] > .arrow
  left -4px
</style>
