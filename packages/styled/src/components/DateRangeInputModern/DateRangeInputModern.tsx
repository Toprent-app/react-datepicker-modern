import React, {useRef, useEffect, useContext} from 'react'
import styled, {ThemeContext, ThemeProvider} from 'styled-components'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  zIndex,
  ZIndexProps,
  compose,
} from 'styled-system'
import {
  UseDatepickerProps,
  START_DATE,
  FormatFunction,
  getInputValue,
  END_DATE,
  FocusedInput,
} from '@datepicker-react/hooks'
import {dateRangeInputPhrases, DateRangeInputPhrases} from '../../phrases'
import Grid from '../Grid'
import Box from '../Box'
import InputRounded from '../InputRounded'
import Datepicker from '../Datepicker'
// eslint-disable-next-line import/no-unresolved
import {DateRangeInputTheme} from '../../@types/theme'
import useThemeProps from '../../hooks/useThemeProps'
import getThemeProp from '../../utils/getThemeProp'
import globalStyles from '../../globalStyles'

interface RtlProps {
  rtl: boolean
}
interface WrapperProps extends RtlProps, ZIndexProps {}
const Wrapper = styled(Box)<WrapperProps>`
  ${zIndex}
`

interface StyledGridProps extends BackgroundProps, BorderProps, BorderRadiusProps {}

const composeInputGridStyles = compose(background, border, borderRadius)

const InputGrid = styled(Grid)<StyledGridProps>`
  ${composeInputGridStyles};
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
`

function getPlacement(placement: 'bottom' | 'top', rtl: boolean) {
  if (placement === 'top' && !rtl) {
    return {
      dateRangeDatepickerWrapperTop: 'unset',
      dateRangeDatepickerWrapperRight: 'unset',
      dateRangeDatepickerWrapperBottom: '65px',
      dateRangeDatepickerWrapperLeft: '0',
    }
  } else if (placement === 'top' && rtl) {
    return {
      dateRangeDatepickerWrapperTop: 'unset',
      dateRangeDatepickerWrapperRight: '0',
      dateRangeDatepickerWrapperBottom: '65px',
      dateRangeDatepickerWrapperLeft: 'unset',
    }
  } else if (placement === 'bottom' && rtl) {
    return {
      dateRangeDatepickerWrapperTop: 'unset',
      dateRangeDatepickerWrapperRight: '0',
      dateRangeDatepickerWrapperBottom: 'unset',
      dateRangeDatepickerWrapperLeft: 'unset',
    }
  }

  return {
    dateRangeDatepickerWrapperTop: 'unset',
    dateRangeDatepickerWrapperRight: 'unset',
    dateRangeDatepickerWrapperBottom: 'unset',
    dateRangeDatepickerWrapperLeft: '0',
  }
}

export interface DateRangeInputModernProps extends UseDatepickerProps {
  displayFormat?: string | FormatFunction
  phrases?: DateRangeInputPhrases
  onFocusChange(focusInput: FocusedInput): void
  showStartDateCalendarIcon?: boolean
  showEndDateCalendarIcon?: boolean
  onClose?(): void
  vertical?: boolean
  showResetDates?: boolean
  showSelectedDates?: boolean
  showClose?: boolean
  rtl?: boolean
  placement?: 'top' | 'bottom'
  dayLabelFormat?(date: Date): string
  weekdayLabelFormat?(date: Date): string
  monthLabelFormat?(date: Date): string
  onDayRender?(date: Date): React.ReactNode
  startDateInputId?: string
  endDateInputId?: string
  unavailableDates?: Date[]
  initialVisibleMonth?: Date
  startDateLabel?: string
  endDateLabel?: string
  datepickerSelectDateGridTemplateColumns?: string
  datepickerBorderRadiusCustom?: string
  datepickerWidthCustom?: string
  datepickerHeightCustom?: string
  datepickerLeftCustom?: string
  datepickerTopCustom?: string
  datepickerZIndexCustom?: number | null
  datepickerPaddingCustom?: string | null
  datepickerCloseWrapperRightCustom?: string | null
}

function DateRangeInputModern({
  startDate,
  endDate,
  minBookingDate,
  maxBookingDate,
  firstDayOfWeek,
  onFocusChange,
  numberOfMonths,
  focusedInput,
  onDatesChange,
  exactMinBookingDays,
  dayLabelFormat,
  weekdayLabelFormat,
  monthLabelFormat,
  onDayRender,
  initialVisibleMonth,
  showClose = true,
  showSelectedDates = true,
  showResetDates = true,
  vertical = false,
  rtl = false,
  isDateBlocked = () => false,
  minBookingDays = 1,
  onClose = () => {},
  showStartDateCalendarIcon = true,
  showEndDateCalendarIcon = true,
  displayFormat = 'MM/dd/yyyy',
  phrases = dateRangeInputPhrases,
  placement = 'bottom',
  startDateInputId = 'startDate',
  endDateInputId = 'endDate',
  unavailableDates = [],
  startDateLabel = 'From',
  endDateLabel = 'To',
  datepickerSelectDateGridTemplateColumns,
  datepickerBorderRadiusCustom,
  datepickerWidthCustom,
  datepickerHeightCustom,
  datepickerLeftCustom,
  datepickerTopCustom,
  datepickerPaddingCustom,
  datepickerCloseWrapperRightCustom,
}: DateRangeInputModernProps) {
  const ref = useRef(null)
  const datepickerWrapperRef = useRef<HTMLDivElement>(null)
  const themeContext = useContext(ThemeContext)
  const theme: DateRangeInputTheme = useThemeProps({
    dateRangeZIndex: null,
    dateRangeBackground: 'transparent',
    dateRangeGridTemplateColumns: vertical ? '1fr 24px 1fr' : '194px 39px 194px',
    dateRangeGridTemplateRows: 'unset',
    dateRangeBorder: '0',
    dateRangeBorderRadius: '0',
    dateRangeArrowIconWidth: '15px',
    dateRangeArrowIconHeight: '12px',
    dateRangeArrowIconColor: getThemeProp('graci', globalStyles.colors.graci, themeContext),
    dateRangeArrowIconOpacity: 1,
    dateRangeStartDateInputPadding: vertical ? (rtl ? '0 32px 0 8px' : '0 8px 0 32px') : '0 0x',
    dateRangeEndDateInputPadding: vertical ? (rtl ? '0 32px 0 8px' : '0 8px 0 32px') : '0 0px',
    dateRangeDatepickerWrapperPosition: 'absolute',
    datepickerHeight: 'unset',
    datepickerLeft: '0px',
    datepickerTop: '0px',
    ...getPlacement(placement, rtl),
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', onClickOutsideHandler)
    }

    return () => {
      window.removeEventListener('click', onClickOutsideHandler)
    }
  })

  function onClickOutsideHandler(event: Event) {
    if (
      focusedInput !== null &&
      datepickerWrapperRef &&
      datepickerWrapperRef.current &&
      // @ts-ignore
      !datepickerWrapperRef.current.contains(event.target)
    ) {
      onFocusChange(null)
    }
  }

  function handleDatepickerClose() {
    onClose()
    onFocusChange(null)
  }

  function handleInputChange(date: Date) {
    // @ts-ignore
    if (ref && ref.current && ref.current.onDateSelect) {
      // @ts-ignore
      ref.current.onDateSelect(date)
    }
  }

  return (
    <ThemeProvider theme={(theme: Record<string, unknown>) => theme || {}}>
      <Wrapper
        zIndex={theme.dateRangeZIndex}
        rtl={rtl}
        position="relative"
        ref={datepickerWrapperRef}
      >
        <InputGrid
          data-testid="DateRangeInputGrid"
          background={theme.dateRangeBackground}
          gridTemplateColumns={theme.dateRangeGridTemplateColumns}
          gridTemplateRows={theme.dateRangeGridTemplateRows}
          border={theme.dateRangeBorder}
          borderRadius={theme.dateRangeBorderRadius}
        >
          <InputRounded
            id={startDateInputId}
            label={startDateLabel}
            ariaLabel={phrases.startDateAriaLabel}
            placeholder={phrases.startDatePlaceholder}
            value={getInputValue(startDate, displayFormat, '')}
            onClick={() => onFocusChange(START_DATE)}
            showCalendarIcon={showStartDateCalendarIcon}
            vertical={vertical}
            isActive={focusedInput === START_DATE}
            padding={theme.dateRangeStartDateInputPadding}
            rtl={rtl}
            onChange={handleInputChange}
            // @ts-ignore
            dateFormat={displayFormat}
          />
          <InputRounded
            label={endDateLabel}
            id={endDateInputId}
            ariaLabel={phrases.endDateAriaLabel}
            placeholder={phrases.endDatePlaceholder}
            value={getInputValue(endDate, displayFormat, '')}
            onClick={() => onFocusChange(!startDate ? START_DATE : END_DATE)}
            showCalendarIcon={showEndDateCalendarIcon}
            vertical={vertical}
            isActive={focusedInput === END_DATE}
            padding={theme.dateRangeEndDateInputPadding}
            rtl={rtl}
            disableAccessibility={focusedInput === START_DATE}
            onChange={handleInputChange}
            // @ts-ignore
            dateFormat={displayFormat}
          />
        </InputGrid>
        <Box
          position={theme.dateRangeDatepickerWrapperPosition}
          bottom={theme.dateRangeDatepickerWrapperBottom}
          left={datepickerLeftCustom || theme.dateRangeDatepickerWrapperLeft}
          top={datepickerTopCustom || theme.dateRangeDatepickerWrapperTop}
          right={theme.dateRangeDatepickerWrapperRight}
        >
          {focusedInput !== null && (
            <Datepicker
              onClose={handleDatepickerClose}
              startDate={startDate}
              endDate={endDate}
              minBookingDate={minBookingDate}
              maxBookingDate={maxBookingDate}
              firstDayOfWeek={firstDayOfWeek}
              numberOfMonths={numberOfMonths}
              focusedInput={focusedInput}
              displayFormat={displayFormat}
              onDatesChange={onDatesChange}
              minBookingDays={minBookingDays}
              isDateBlocked={isDateBlocked}
              exactMinBookingDays={exactMinBookingDays}
              showResetDates={showResetDates}
              vertical={vertical}
              showSelectedDates={showSelectedDates}
              showClose={showClose}
              rtl={rtl}
              dayLabelFormat={dayLabelFormat}
              weekdayLabelFormat={weekdayLabelFormat}
              monthLabelFormat={monthLabelFormat}
              onDayRender={onDayRender}
              phrases={phrases}
              unavailableDates={unavailableDates}
              ref={ref}
              initialVisibleMonth={initialVisibleMonth}
              datepickerSelectDateGridTemplateColumns={datepickerSelectDateGridTemplateColumns}
              datepickerBorderRadius={datepickerBorderRadiusCustom}
              datepickerWidth={datepickerWidthCustom}
              datepickerHeight={datepickerHeightCustom}
              datepickerPadding={datepickerPaddingCustom}
              datepickerCloseWrapperRight={datepickerCloseWrapperRightCustom}
            />
          )}
        </Box>
      </Wrapper>
    </ThemeProvider>
  )
}

export default DateRangeInputModern
