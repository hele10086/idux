/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { ɵFooterButtonProps } from '@idux/components/_private/footer'
import type { FormSize } from '@idux/components/form'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType, Slots, VNode, VNodeChild } from 'vue'

export type PresetRangeShortcut = 'today' | 'yesterday' | 'last24h' | 'last7d' | 'last30d' | 'last180d' | 'custom'

export interface RangeShortcutPanelRenderContext {
  slots: Slots
  setBuffer: (value: [Date, Date] | undefined) => void
  setValue: (value: [Date, Date] | undefined) => void
  ok: () => void
  cancel: () => void
}
export interface RangeShortcutOptions {
  key: VKey
  label: string
  confirmOnSelect?: boolean
  selectedLabel?: string
  value?: [Date, Date] | (() => [Date, Date])
  onClick?: (evt: MouseEvent) => void
  panelRenderer?: (context: RangeShortcutPanelRenderContext) => VNodeChild
}

export type RangeShortcut = PresetRangeShortcut | RangeShortcutOptions

export type RangeShortcutProp =
  | RangeShortcut[]
  | {
      showPanel?: boolean
      shortcuts: RangeShortcut[]
    }

export interface PickerTimePanelOptions {
  disabledHours?: (selectedAmPm: string | undefined) => number[]
  disabledMinutes?: (selectedHour: number | undefined, selectedAmPm: string | undefined) => number[]
  disabledSeconds?: (
    selectedHour: number | undefined,
    selectedMinute: number | undefined,
    selectedAmPm: string | undefined,
  ) => number[]
  hideDisabledOptions?: boolean
  hourStep?: number
  minuteStep?: number
  secondStep?: number
}

export interface TimePanelOptions extends PickerTimePanelOptions {
  hourEnabled?: boolean
  minuteEnabled?: boolean
  secondEnabled?: boolean
  use12Hours?: boolean
}

const datePickerCommonProps = {
  control: {
    type: [String, Number, Object, Array] as PropType<string | number | (string | number)[] | AbstractControl>,
    default: undefined,
  },
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  open: {
    type: Boolean,
    default: undefined,
  },

  allowInput: {
    type: [Boolean, String] as PropType<boolean | 'overlay'>,
    default: undefined,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  borderless: {
    type: Boolean,
    default: undefined,
  },
  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDate: Function as PropType<(date: Date) => boolean>,
  format: String,
  dateFormat: String,
  timeFormat: String,
  overlayClassName: String,
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  overlayTabindex: { type: Number, default: undefined },
  overlayRender: Function as PropType<(children: VNodeChild) => VNodeChild>,
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: String as PropType<FormSize>,
  status: String as PropType<ValidateStatus>,
  suffix: String,
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
  },

  // events
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(isOpen: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

export type DatePickerCommonProps = ExtractInnerPropTypes<typeof datePickerCommonProps>
export interface DatePickerCommonBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export const datePickerProps = {
  ...datePickerCommonProps,

  value: [String, Date, Number] as PropType<string | number | Date>,
  footer: { type: [Boolean, Array, Object] as PropType<boolean | ɵFooterButtonProps[] | VNode>, default: false },
  placeholder: String,
  timePanelOptions: Object as PropType<PickerTimePanelOptions>,

  onChange: [Function, Array] as PropType<MaybeArray<(value: Date | undefined, oldValue: Date | undefined) => void>>,
  onInput: [Function, Array] as PropType<MaybeArray<(evt: Event) => void>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date | undefined) => void>>,
} as const

export type DatePickerProps = ExtractInnerPropTypes<typeof datePickerProps>
export type DatePickerPublicProps = ExtractPublicPropTypes<typeof datePickerProps>
export type DatePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DatePickerPublicProps> & DatePickerPublicProps,
  DatePickerCommonBindings
>
export type DatePickerInstance = InstanceType<DefineComponent<DatePickerProps, DatePickerCommonBindings>>

export const dateRangePickerProps = {
  ...datePickerCommonProps,

  value: Array as PropType<(number | string | Date)[]>,
  footer: { type: [Boolean, Array, Object] as PropType<boolean | ɵFooterButtonProps[] | VNode>, default: true },
  placeholder: Array as PropType<string[]>,
  separator: [String, Object] as PropType<string | VNode>,
  shortcuts: [Array, Object] as PropType<RangeShortcut[] | RangeShortcutProp>,
  timePanelOptions: [Object, Array] as PropType<PickerTimePanelOptions | PickerTimePanelOptions[]>,

  onChange: [Function, Array] as PropType<
    MaybeArray<(value: Date[] | undefined, oldValue: Date[] | undefined) => void>
  >,
  onInput: [Function, Array] as PropType<MaybeArray<(isFrom: boolean, evt: Event) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<(selectingDate: (Date | undefined)[] | undefined) => void>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: Date[] | undefined) => void>>,
} as const

export type DateRangePickerProps = ExtractInnerPropTypes<typeof dateRangePickerProps>
export type DateRangePickerPublicProps = ExtractPublicPropTypes<typeof dateRangePickerProps>
export type DateRangePickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DateRangePickerPublicProps> & DateRangePickerPublicProps,
  DatePickerCommonBindings
>
export type DateRangePickerInstance = InstanceType<DefineComponent<DateRangePickerProps, DatePickerCommonBindings>>

export type DatePickerType = 'date' | 'week' | 'month' | 'quarter' | 'year' | 'datetime'

export const datePanelProps = {
  activeValue: Date as PropType<Date | undefined>,
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  value: Date as PropType<Date>,
  type: {
    type: String as PropType<DatePickerType>,
    default: undefined,
  },
  timePanelOptions: {
    type: Object as PropType<TimePanelOptions>,
    default: undefined,
  },
  visible: {
    type: [String, Boolean] as PropType<'datePanel' | 'timePanel' | boolean>,
    default: undefined,
  },

  onChange: [Function, Array] as PropType<MaybeArray<(value: Date | undefined) => void>>,
  'onUpdate:activeValue': [Function, Array] as PropType<MaybeArray<(date: Date | undefined) => void>>,
} as const
export type DatePanelProps = ExtractInnerPropTypes<typeof datePanelProps>
export type DatePanelPublicProps = ExtractPublicPropTypes<typeof datePanelProps>
export type DatePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DatePanelPublicProps> & DatePanelPublicProps
>
export type DatePanelInstance = InstanceType<DefineComponent<DatePanelProps>>

export const dateRangePanelProps = {
  activeValue: Array as PropType<Date[] | undefined>,
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  value: Array as PropType<Date[] | undefined>,
  type: {
    type: String as PropType<DatePickerType>,
    default: undefined,
  },
  timePanelOptions: {
    type: Array as PropType<TimePanelOptions[]>,
    default: undefined,
  },
  visible: {
    type: [String, Boolean] as PropType<'datePanel' | 'timePanel' | boolean>,
    default: undefined,
  },

  onChange: [Function, Array] as PropType<MaybeArray<(value: Date[] | undefined) => void>>,
  onSelect: [Function, Array] as PropType<MaybeArray<(selectingDate: (Date | undefined)[] | undefined) => void>>,
  'onUpdate:activeValue': [Function, Array] as PropType<MaybeArray<(date: Date[] | undefined) => void>>,
} as const
export type DateRangePanelProps = ExtractInnerPropTypes<typeof dateRangePanelProps>
export type DateRangePanelPublicProps = ExtractPublicPropTypes<typeof dateRangePanelProps>
export type DateRangePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DateRangePanelPublicProps> & DateRangePanelPublicProps
>
export type DateRangePanelInstance = InstanceType<DefineComponent<DateRangePanelProps>>
