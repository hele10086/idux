<template>
  <IxSpace>
    <IxButton ref="hoverTriggerRef" v-bind="hoverTriggerEvents">Hover</IxButton>
    <IxButton ref="focusTriggerRef" v-bind="focusTriggerEvents">Focus</IxButton>
    <IxButton ref="clickTriggerRef" v-bind="clickTriggerEvents">Click</IxButton>
    <IxButton ref="contextmenuTriggerRef" v-bind="contextmenuTriggerEvents">Contextmenu</IxButton>
    <IxButton ref="manualTriggerRef" @click="toggleManualVisible">Manual</IxButton>
  </IxSpace>
  <CdkPortal target=".ix-popper-container">
    <div v-if="hoverVisibility" ref="hoverPopperRef" class="popper popper-hover" v-bind="hoverPopperEvents">Hover</div>
    <div v-if="focusVisibility" ref="focusPopperRef" class="popper popper-focus">Focus</div>
    <div v-if="clickVisibility" ref="clickPopperRef" class="popper popper-click">Click</div>
    <div v-if="contextmenuVisibility" ref="contextmenuPopperRef" class="popper popper-contextmenu">Contextmenu</div>
    <div v-if="manualVisibility" ref="manualPopperRef" class="popper popper-manual">Manual</div>
  </CdkPortal>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import { usePopper } from '@idux/cdk/popper'

export default defineComponent({
  name: 'Trigger',
  setup() {
    const hoverPopper = usePopper({ delay: 100 })
    const focusPopper = usePopper({ trigger: 'focus' })
    const clickPopper = usePopper({ trigger: 'click' })
    const contextmenuPopper = usePopper({ trigger: 'contextmenu' })
    const manualPopper = usePopper({ trigger: 'manual' })

    const manualVisible = ref(false)
    const toggleManualVisible = () => {
      manualVisible.value = !manualVisible.value
    }

    const instances = [hoverPopper, focusPopper, clickPopper, contextmenuPopper, manualPopper]

    onMounted(() => {
      instances.forEach(item => item.initialize())
    })
    onBeforeUnmount(() => {
      instances.forEach(item => item.destroy())
    })

    return {
      /* hover */
      hoverTriggerRef: hoverPopper.triggerRef,
      hoverTriggerEvents: hoverPopper.triggerEvents,
      hoverPopperRef: hoverPopper.popperRef,
      hoverPopperEvents: hoverPopper.popperEvents,
      hoverVisibility: hoverPopper.visibility,
      /* focus */
      focusTriggerRef: focusPopper.triggerRef,
      focusTriggerEvents: focusPopper.triggerEvents,
      focusPopperRef: focusPopper.popperRef,
      focusVisibility: focusPopper.visibility,
      /* click */
      clickTriggerRef: clickPopper.triggerRef,
      clickTriggerEvents: clickPopper.triggerEvents,
      clickPopperRef: clickPopper.popperRef,
      clickVisibility: clickPopper.visibility,
      /* contextmenu */
      contextmenuTriggerRef: contextmenuPopper.triggerRef,
      contextmenuTriggerEvents: contextmenuPopper.triggerEvents,
      contextmenuPopperRef: contextmenuPopper.popperRef,
      contextmenuVisibility: contextmenuPopper.visibility,
      /* manual */
      manualTriggerRef: manualPopper.triggerRef,
      manualPopperRef: manualPopper.popperRef,
      manualVisibility: manualPopper.visibility,
      toggleManualVisible,
    }
  },
})
</script>

<style lang="less" scoped>
.popper {
  padding: 8px 16px;
  color: #fff;

  &-hover {
    background: #f52727;
  }
  &-click {
    background: #fa721b;
  }
  &-focus {
    background: #fdaa1d;
  }
  &-contextmenu {
    background: #f8d81a;
  }
  &-manual {
    background: var(--ix-color-primary);
  }
}
</style>
