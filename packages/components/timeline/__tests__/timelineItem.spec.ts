import { MountingOptions, mount } from '@vue/test-utils'

import { renderWork } from '@tests'

import IxTimelineItem from '../src/TimelineItem'
import { TimelineItemProps } from '../src/types'

describe('TimelineItem', () => {
  const timelineItemMount = (options?: MountingOptions<Partial<TimelineItemProps>>) =>
    mount(IxTimelineItem, { ...options })
  renderWork(IxTimelineItem)

  test('color work', async () => {
    const wrapper = timelineItemMount({
      props: {
        color: 'red',
      },
    })
    expect(wrapper.find('.ix-timeline-item-dot').classes()).toContain('ix-timeline-item-dot-red')
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      color: 'black',
    })

    expect(wrapper.find('.ix-timeline-item-dot-black').exists()).toBe(false)
    expect(wrapper.find('.ix-timeline-item-dot').html()).toContain('style="color: black; border-color: black;"')
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dot work', async () => {
    const dotText = 'dotText'
    const wrapper = timelineItemMount()
    expect(wrapper.find('.ix-timeline-item-dot-custom').exists()).toBe(false)
    expect(wrapper.find('.ix-timeline-item-dot').text()).toBe('')
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      dot: dotText,
    })
    expect(wrapper.find('.ix-timeline-item-dot-custom').exists()).toBe(true)
    expect(wrapper.find('.ix-timeline-item-dot').classes()).toContain('ix-timeline-item-dot-custom')
    expect(wrapper.find('.ix-timeline-item-dot').text()).toBe(dotText)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('dot slot work', async () => {
    const dotSlotText = 'dotSlotText'
    const dotText = 'dotText'
    const wrapper = timelineItemMount({
      slots: {
        dot: dotSlotText,
      },
    })
    expect(wrapper.find('.ix-timeline-item-dot-custom').exists()).toBe(true)
    expect(wrapper.find('.ix-timeline-item-dot').classes()).toContain('ix-timeline-item-dot-custom')
    expect(wrapper.find('.ix-timeline-item-dot').text()).toBe(dotSlotText)
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.setProps({
      dot: dotText,
    })
    expect(wrapper.find('.ix-timeline-item-dot').text()).toBe(dotSlotText)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
