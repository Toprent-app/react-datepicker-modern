import React, {useReducer} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {text, boolean} from '@storybook/addon-knobs'
import {
  dayLabelFormat as dayLabelFormatFn,
  weekdayLabelFormat as weekdayLabelFormatFn,
  monthLabelFormat as monthLabelFormatFn,
} from '@datepicker-react/hooks'
import {
  DateRangeInputModern,
  OnDatesChangeProps,
  FirstDayOfWeek,
  DateRangeInputPhrases,
  dateRangeInputPhrases,
} from '../../index'

const initialState: OnDatesChangeProps = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state: OnDatesChangeProps, action: Record<string, unknown>) {
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

interface AppProps {
  displayFormat?: string
  vertical?: boolean
  rtl?: boolean
  showResetDates?: boolean
  showClose?: boolean
  showSelectedDates?: boolean
  exactMinBookingDays?: boolean
  minBookingDays?: number
  numberOfMonths?: number
  firstDayOfWeek?: FirstDayOfWeek
  phrasesProp?: DateRangeInputPhrases
  isDateBlocked?(date: Date): boolean
  minBookingDate?: Date
  maxBookingDate?: Date
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  unavailableDates?: Date[]
  initialVisibleMonth?: Date
  datepickerCloseWrapperRightCustom?: string | null
  datepickerPaddingCustom?: string | null
}

function App({
  displayFormat = 'MM/DD/YYYY',
  showClose = true,
  showSelectedDates = true,
  showResetDates = false,
  vertical = false,
  rtl = false,
  exactMinBookingDays = false,
  minBookingDays = 1,
  numberOfMonths = 2,
  firstDayOfWeek = 1,
  phrasesProp = dateRangeInputPhrases,
  isDateBlocked = () => false,
  minBookingDate,
  maxBookingDate,
  initialVisibleMonth,
  dayLabelFormat = dayLabelFormatFn,
  weekdayLabelFormat = weekdayLabelFormatFn,
  monthLabelFormat = monthLabelFormatFn,
  onDayRender = undefined,
  unavailableDates = [],
  datepickerCloseWrapperRightCustom = null,
  datepickerPaddingCustom = null,
}: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DateRangeInputModern
      minBookingDate={minBookingDate}
      maxBookingDate={maxBookingDate}
      // @ts-ignore
      onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
      onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
      // @ts-ignore
      startDate={state.startDate}
      // @ts-ignore
      endDate={state.endDate}
      // @ts-ignore
      focusedInput={state.focusedInput}
      onClose={action('onClose')}
      displayFormat={displayFormat}
      vertical={vertical}
      rtl={rtl}
      showClose={showClose}
      showResetDates={showResetDates}
      showSelectedDates={showSelectedDates}
      exactMinBookingDays={exactMinBookingDays}
      minBookingDays={minBookingDays}
      numberOfMonths={numberOfMonths}
      firstDayOfWeek={firstDayOfWeek}
      phrases={phrasesProp}
      isDateBlocked={isDateBlocked}
      dayLabelFormat={dayLabelFormat}
      weekdayLabelFormat={weekdayLabelFormat}
      monthLabelFormat={monthLabelFormat}
      onDayRender={onDayRender}
      unavailableDates={unavailableDates}
      initialVisibleMonth={initialVisibleMonth}
      datepickerCloseWrapperRightCustom={datepickerCloseWrapperRightCustom}
      datepickerPaddingCustom={datepickerPaddingCustom}
    />
  )
}

storiesOf('DateRangeInputModern', module).add('Simple demo', () => (
  <App
    rtl={boolean('rtl', false)}
    vertical={boolean('vertical', false)}
    exactMinBookingDays={boolean('exactMinBookingDays', false)}
    showResetDates={boolean('showResetDates', true)}
    showClose={boolean('showClose', true)}
    showSelectedDates={boolean('showSelectedDates', true)}
    displayFormat={text('displayFormat', 'MM/dd/yyyy')}
    datepickerCloseWrapperRightCustom={text('datepickerCloseWrapperRightCustom', '10px')}
    datepickerPaddingCustom={text('datepickerPaddingCustom', '10px')}
  />
))
