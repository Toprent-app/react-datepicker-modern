import React, {useState} from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {text, boolean} from '@storybook/addon-knobs'
import {ThemeProvider} from 'styled-components'
import Input from './InputRounded'

interface InputDemoProps {
  showCalendarIcon?: boolean
  vertical?: boolean
  rtl?: boolean
  placeholder?: string
  isActive?: boolean
  label?: string
}

function InputDemo({
  showCalendarIcon = true,
  vertical = false,
  rtl = false,
  placeholder = 'Select date',
  label = 'From',
  isActive = false,
}: InputDemoProps) {
  const [value, setValue] = useState('')

  return (
    <div style={{width: vertical ? '150px' : '200px'}}>
      <Input
        label={label}
        id="demo-input"
        ariaLabel="Date input"
        placeholder={placeholder}
        value={value}
        onClick={action('onClick')}
        showCalendarIcon={showCalendarIcon}
        vertical={vertical}
        isActive={isActive}
        rtl={rtl}
        dateFormat="MM/dd/yyyy"
        onChange={(date: Date) => {
          setValue(date.toLocaleDateString())
          action('onChange')(date)
        }}
      />
    </div>
  )
}

storiesOf('DateRangeInputModern/InputRounded', module)
  .add('Default', () => (
    <InputDemo
      label={text('label', 'From')}
      showCalendarIcon={boolean('showCalendarIcon', true)}
      vertical={boolean('vertical', false)}
      rtl={boolean('rtl', false)}
      isActive={boolean('isActive', false)}
      placeholder={text('placeholder', 'Select date')}
    />
  ))
  .add('Active state', () => (
    <InputDemo
      label={text('label', 'From')}
      showCalendarIcon={true}
      isActive={true}
      placeholder="Select date"
    />
  ))
  .add('Without calendar icon', () => (
    <InputDemo
      label={text('label', 'From')}
      showCalendarIcon={false}
      placeholder="Enter date manually"
    />
  ))
  .add('Vertical layout', () => (
    <InputDemo
      label={text('label', 'From')}
      showCalendarIcon={true}
      vertical={true}
      placeholder="Date"
    />
  ))
  .add('RTL mode', () => (
    <InputDemo
      label={text('label', 'From')}
      showCalendarIcon={true}
      rtl={true}
      placeholder="Select date"
    />
  ))
  .add('Custom theme', () => (
    <ThemeProvider
      theme={{
        reactDatepicker: {
          fontFamily: 'system-ui, -apple-system',
          inputLabelBorderRadius: '12px',
          inputMinHeight: '52px',
          inputFontSize: '16px',
          colors: {
            primaryColor: '#6366f1',
            graci: '#e5e7eb',
            charcoal: '#1f2937',
            silverCloud: '#9ca3af',
            white: '#ffffff',
          },
        },
      }}
    >
      <InputDemo
        label={text('label', 'From')}
        showCalendarIcon={boolean('showCalendarIcon', true)}
        placeholder={text('placeholder', 'Select date')}
      />
    </ThemeProvider>
  ))
  .add('Rounded corners (large radius)', () => (
    <ThemeProvider
      theme={{
        reactDatepicker: {
          inputLabelBorderRadius: '24px',
          inputMinHeight: '48px',
          inputCalendarWrapperLeft: '20px',
          colors: {
            graci: '#d1d5db',
          },
        },
      }}
    >
      <InputDemo
        label={text('label', 'From')}
        showCalendarIcon={true}
        placeholder="Rounded input"
      />
    </ThemeProvider>
  ))
