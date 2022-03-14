/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CSSProperties } from 'vue'

import { computed, defineComponent } from 'vue'

import { hasSlot } from '@idux/cdk/utils'
import { useGlobalConfig } from '@idux/components/config'
import { isPresetColor, isStatusColor } from '@idux/components/utils'

import { timelineItemProps } from './types'

export default defineComponent({
  name: 'IxTimelineItem',
  props: timelineItemProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const mergedPrefixCls = computed(() => `${common.prefixCls}-timeline`)
    const prefixCls = mergedPrefixCls.value
    const isPresetOrStatus = computed(() => isPresetColor(props.color) || isStatusColor(props.color))

    const dotStyle = computed(() => {
      if (isPresetOrStatus.value) {
        return {}
      }
      return {
        color: props.color,
        'border-color': props.color,
      }
    })

    const dotClass = computed(() => {
      return {
        [`${prefixCls}-item-dot`]: true,
        [`${prefixCls}-item-dot-custom`]: hasSlot(slots, 'dot') || !!props.dot,
        [`${prefixCls}-item-dot-${props.color}`]: isPresetOrStatus.value,
      }
    })

    return () => {
      return (
        <li class={`${prefixCls}-item`}>
          <div class={`${prefixCls}-item-line`}></div>
          <div class={dotClass.value} style={dotStyle.value as CSSProperties}>
            {slots.dot ? slots.dot() : props.dot}
          </div>
          <div class={`${prefixCls}-item-content`}>
            <div class={`${prefixCls}-item-label`}>{props.label || slots.label?.()}</div>
            <div class={`${prefixCls}-item-desc`}>{slots.default?.()}</div>
          </div>
        </li>
      )
    }
  },
})
