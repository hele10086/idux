/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TimelinePlacement, TimelineProps } from './types'
import type { VNode } from 'vue'

import { cloneVNode, defineComponent, h } from 'vue'

import { IxIcon } from '@idux/components/icon'

import IxTimelineItem from './TimelineItem'
import { timelineProps } from './types'

const timelinePrefixCls = 'ix-timeline'
const itemPrefixCls = 'ix-timeline-item'

export default defineComponent({
  name: 'IxTimeline',
  props: timelineProps,
  setup(props, { slots }) {
    return () => {
      const pendingSlots = slots?.pending?.()
      const pendingDotSlots = slots?.pendingDot?.()
      const defaultSlots = slots?.default?.() || []
      const pendingNode = pendingSlots || props.pending
      const pendingDotNode = pendingDotSlots || props.pendingDot || h(IxIcon, { name: 'loading' })
      let penddingItem: null | VNode = null

      if (pendingNode) {
        penddingItem = h(
          IxTimelineItem,
          { class: `${itemPrefixCls}-pending-dot` },
          { default: () => pendingNode, dot: () => pendingDotNode },
        )
      }

      const timelineItems = props.reverse ? [penddingItem, ...defaultSlots.reverse()] : [...defaultSlots, penddingItem]
      const nonNullItems = timelineItems.filter(item => !!item) as VNode[]
      const itemsLength = nonNullItems.length
      const items: VNode[] = []
      const itemPlacementArr: TimelinePlacement[] = []

      nonNullItems.forEach((item, index) => {
        const placement = getItemPlacement(item, index, props.placement)

        itemPlacementArr.push(placement)
        items.push(
          cloneVNode(item, {
            class: useItemClasses({
              hasPendingNode: !!pendingNode,
              placement,
              index,
              itemsLength,
              props: props,
            }),
          }),
        )
      })

      return h(
        'ul',
        {
          class: useClasses(itemPlacementArr, props),
        },
        items,
      )
    }
  },
})

const getItemPlacement = (node: VNode, index: number, placement: TimelinePlacement): TimelinePlacement => {
  const itemPlacement = node.props?.placement
  if (itemPlacement) {
    return itemPlacement
  }

  if (placement === 'alternate') {
    return index % 2 ? 'start' : 'end'
  }

  return placement
}

const getRealPlacement = (itemPlacementArr: TimelinePlacement[]): TimelinePlacement => {
  return itemPlacementArr.reduce((result: TimelinePlacement, nextPlacement, index) => {
    if (!index) {
      result = nextPlacement
    } else if (result !== nextPlacement) {
      result = 'alternate'
    }

    return result
  }, 'end')
}

const useClasses = (itemPlacementArr: TimelinePlacement[], props: TimelineProps): string => {
  const realPlacement = getRealPlacement(itemPlacementArr)
  const placementCls = `${timelinePrefixCls}-${realPlacement}`

  let cls = `${timelinePrefixCls} ${placementCls}`

  if (props.reverse) {
    cls += ` ${timelinePrefixCls}-reverse`
  }

  if (!props.both) {
    cls += ` ${timelinePrefixCls}-not-both`
  }

  return cls
}

const useItemClasses = ({
  hasPendingNode,
  placement,
  index,
  itemsLength,
  props,
}: {
  hasPendingNode: boolean
  placement: TimelinePlacement
  index: number
  itemsLength: number
  props: TimelineProps
}): string => {
  let cls = `${itemPrefixCls}-${placement}`

  if (hasPendingNode) {
    const isReversePending = props.reverse && index === 0
    const isPending = !props.reverse && index === itemsLength - 2

    if (isReversePending || isPending) {
      cls += ` ${itemPrefixCls}-pending`
    }
  }

  return cls
}
