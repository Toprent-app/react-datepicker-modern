import React, {useContext, useState, useEffect, useRef} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {parseDate} from '@datepicker-react/hooks'
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  borderRadius,
  BorderRadiusProps,
  space,
  SpaceProps,
  fontFamily,
  FontFamilyProps,
  fontSize,
  FontSizeProps,
  color,
  ColorProps,
  fontWeight,
  FontWeightProps,
  position,
  PositionProps,
  TopProps,
  LeftProps,
  width,
  WidthProps,
  HeightProps,
  display,
  DisplayProps,
  minHeight,
  MinHeightProps,
  boxShadow,
  BoxShadowProps,
  RightProps,
  style,
  ResponsiveValue,
  TLengthStyledSystem,
  compose,
} from 'styled-system'
import CalendarIconSimple from '../../icons/CalendarIconSimple'
// eslint-disable-next-line import/no-unresolved
import {InputTheme} from '../../@types/theme'
import useThemeProps from '../../hooks/useThemeProps'
import globalStyles from '../../globalStyles'
import {PaddingProperty} from 'csstype'
import getThemeProp from '../../utils/getThemeProp'

const placeholderColor = style({
  prop: 'placeholderColor',
  cssProperty: 'color',
})

const placeholderFontWeight = style({
  prop: 'placeholderFontWeight',
  cssProperty: 'fontWeight',
})

interface InputLabelProps
  extends PositionProps,
    BorderProps,
    BackgroundProps,
    DisplayProps,
    SpaceProps,
    BorderRadiusProps {
  $isFocused?: boolean
  $hasError?: boolean
  $rtl?: boolean
}

const composeInputLabelStyles = compose(position, border, background, display, borderRadius, space)

const getBorderColor = ({$isFocused, $hasError}: InputLabelProps) => {
  if ($hasError) return globalStyles.modern.colors.inputBorderError
  if ($isFocused) return globalStyles.modern.colors.inputBorderFocused
  return globalStyles.modern.colors.inputBorder
}

const InputLabel = styled('label')<InputLabelProps>`
  ${composeInputLabelStyles};
  position: relative;
  width: 335px;
  height: 60px;
  display: flex;
  align-items: center;
  flex-direction: ${({$rtl}) => ($rtl ? 'row-reverse' : 'row')};
  border-radius: 14px;
  border: 1px solid ${getBorderColor};

  &:hover {
    border-color: ${globalStyles.modern.colors.inputBorderFocused};
  }
`

interface CalendarWrapperProps
  extends PositionProps,
    LeftProps,
    RightProps,
    TopProps,
    HeightProps,
    WidthProps {
  $rtl?: boolean
}

const CalendarWrapper = styled('div')<CalendarWrapperProps>`
  position: absolute;
  top: 50%;
  ${({$rtl}) => ($rtl ? 'left: 20px;' : 'right: 20px;')}
  transform: translateY(-50%);
  cursor: pointer;

  svg {
    display: block;
  }
`

interface StyledInputProps
  extends BackgroundProps,
    SpaceProps,
    FontFamilyProps,
    ColorProps,
    FontWeightProps,
    BorderProps,
    WidthProps,
    MinHeightProps,
    BoxShadowProps,
    FontSizeProps {
  $rtl?: boolean
}

const composeStyledInputStyle = compose(
  background,
  space,
  fontFamily,
  fontSize,
  color,
  fontWeight,
  space,
  border,
  width,
  minHeight,
  boxShadow,
)

const StyledInput = styled('input')<StyledInputProps>`
  ${composeStyledInputStyle}
  flex: 1;
  min-height: 60px;
  cursor: pointer;
  box-sizing: border-box;
  outline: 0;
  border-top-left-radius: ${({$rtl}) => ($rtl ? '14px' : '0')};
  border-bottom-left-radius: ${({$rtl}) => ($rtl ? '14px' : '0')};
  border-top-right-radius: ${({$rtl}) => ($rtl ? '0' : '14px')};
  border-bottom-right-radius: ${({$rtl}) => ($rtl ? '0' : '14px')};
  padding-right: ${({$rtl}) => ($rtl ? '0' : '60px')};
  text-align: ${({$rtl}) => ($rtl ? 'right' : 'left')};

  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    ${placeholderFontWeight}
    ${placeholderColor}
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    ${placeholderFontWeight}
    ${placeholderColor}
  }
  :-moz-placeholder {
    /* Firefox 18- */
    ${placeholderFontWeight}
    ${placeholderColor}
  }
`

interface LabelProps extends ColorProps, FontSizeProps, FontWeightProps {
  $rtl?: boolean
}

const composeLabelStyles = compose(color, fontSize, fontWeight)

const Label = styled('span')<LabelProps>`
  ${composeLabelStyles}
  flex-shrink: 0;
  padding-left: ${({$rtl}) => ($rtl ? '0' : '16px')};
  padding-right: ${({$rtl}) => ($rtl ? '16px' : '0')};
  margin-right: 10px;
  margin-left: 10px;
  font-size: 14px;
  font-family: ${globalStyles.modern.fontFamily};
  text-align: ${({$rtl}) => ($rtl ? 'right' : 'left')};
`

interface InputProps {
  label: string
  placeholder: string
  value: string
  id: string
  ariaLabel: string
  onClick(): void
  showCalendarIcon: boolean
  vertical: boolean
  isActive: boolean
  rtl: boolean
  disableAccessibility?: boolean
  padding?: ResponsiveValue<PaddingProperty<TLengthStyledSystem>>
  onChange?(date: Date): void
  dateFormat: string
  hasError?: boolean
}

function Input({
  label = '',
  placeholder,
  id,
  vertical,
  isActive,
  ariaLabel,
  onClick,
  value,
  showCalendarIcon,
  padding,
  rtl,
  disableAccessibility,
  dateFormat,
  onChange = () => {},
  hasError = false,
}: InputProps) {
  const [searchString, setSearchString] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    setSearchString(value)
  }, [value])
  const themeContext = useContext(ThemeContext)
  const theme: InputTheme = useThemeProps({
    fontFamily: globalStyles.modern.fontFamily,
    inputFontWeight: 400,
    inputFontSize: '16px',
    inputColor: getThemeProp('charcoal', globalStyles.colors.charcoal, themeContext),
    inputBackground: getThemeProp('white', globalStyles.colors.white, themeContext),
    inputMinHeight: '46px',
    inputWidth: '100%',
    inputPadding: padding,
    inputBorder: getThemeProp('inputBorder', globalStyles.modern.colors.inputBorder, themeContext),
    inputPlaceholderFontWeight: 500,
    inputPlaceholderColor: getThemeProp(
      'inputPlaceholder',
      globalStyles.modern.colors.inputPlaceholder,
      themeContext,
    ),
    inputCalendarWrapperPosition: 'absolute',
    inputCalendarWrapperHeight: '24px',
    inputCalendarWrapperWidth: '24px',
    inputCalendarWrapperTop: '50%',
    inputCalendarWrapperLeft: rtl ? '20px' : vertical ? '8px' : '16px',
    inputCalendarWrapperRight: rtl ? (vertical ? '8px' : '16px') : '20px',
    inputCalendarIconWidth: '24px',
    inputCalendarIconHeight: '24px',
    inputCalendarIconColor: getThemeProp(
      'inputPlaceholder',
      globalStyles.modern.colors.inputPlaceholder,
      themeContext,
    ),
    inputLabelDisplay: 'block',
    inputLabelPosition: 'relative',
    inputLabelBorder: `1px solid ${getThemeProp('graci', globalStyles.colors.graci, themeContext)}`,
    inputLabelBorderRadius: '2px',
    inputLabelBackground: getThemeProp('white', globalStyles.colors.white, themeContext),
    inputLabelMargin: '0',
    inputActiveBoxShadow: `inset 0px -3px 0 ${getThemeProp(
      'primaryColor',
      globalStyles.colors.primaryColor,
      themeContext,
    )}`,
    inputLabelColor: getThemeProp(
      'inputLabel',
      globalStyles.modern.colors.inputLabel,
      themeContext,
    ),
  })

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const dateValue = e.target.value
    setSearchString(dateValue)

    if (typeof ref.current === 'number') {
      // @ts-ignore
      clearTimeout(ref.current)
    }

    // @ts-ignore
    ref.current = setTimeout(() => {
      onClick()
      // @ts-ignore
      const parsedDate = parseDate(dateValue, dateFormat, new Date())

      // @ts-ignore
      if (!isNaN(parsedDate)) {
        onChange(parsedDate)
      }
    }, 1000)
  }

  return (
    <InputLabel
      htmlFor={id}
      display={theme.inputLabelDisplay}
      position={theme.inputLabelPosition}
      border={theme.inputLabelBorder}
      background={theme.inputLabelBackground}
      borderRadius={theme.inputLabelBorderRadius}
      m={theme.inputLabelMargin}
      $isFocused={isFocused}
      $hasError={hasError}
      $rtl={rtl}
    >
      {label && (
        <Label color={theme.inputLabelColor as string} $rtl={rtl}>
          {label}
        </Label>
      )}
      <StyledInput
        tabIndex={disableAccessibility ? -1 : 0}
        border={theme.inputBorder}
        p={theme.inputPadding}
        // @ts-ignore
        width={theme.inputWidth}
        minHeight={theme.inputMinHeight}
        background={theme.inputBackground}
        fontFamily={theme.fontFamily}
        // @ts-ignore
        color={theme.inputColor as string}
        fontSize={theme.inputFontSize}
        fontWeight={theme.inputFontWeight}
        placeholderColor={theme.inputPlaceholderColor}
        placeholderFontWeight={theme.inputPlaceholderFontWeight}
        boxShadow={isActive ? theme.inputActiveBoxShadow : 'none'}
        id={id}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={searchString}
        autoComplete="off"
        onChange={handleOnChange}
        onFocus={() => {
          setIsFocused(true)
          onClick()
        }}
        onBlur={() => setIsFocused(false)}
        data-testid="DatepickerInputModern"
        $rtl={rtl}
      />
      {showCalendarIcon && (
        <CalendarWrapper
          position={theme.inputCalendarWrapperPosition}
          height={theme.inputCalendarWrapperHeight}
          width={theme.inputCalendarWrapperWidth}
          top={theme.inputCalendarWrapperTop}
          left={theme.inputCalendarWrapperLeft}
          right={theme.inputCalendarWrapperRight}
          $rtl={rtl}
        >
          <CalendarIconSimple
            // @ts-ignore
            width={theme.inputCalendarIconWidth}
            // @ts-ignore
            height={theme.inputCalendarIconHeight}
            // @ts-ignore
            color={theme.inputCalendarIconColor}
          />
        </CalendarWrapper>
      )}
    </InputLabel>
  )
}

export default Input
