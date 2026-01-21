import {ResponsiveValue, TLengthStyledSystem} from 'styled-system'
import {PaddingProperty} from 'csstype'
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
declare function Input({
  label,
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
  onChange,
  hasError,
}: InputProps): JSX.Element
export default Input
