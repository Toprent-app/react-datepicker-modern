import React from 'react'
import {render} from '@testing-library/react'
import CalendarIconSimple from '.'

test('should match snapshot', () => {
  const {container} = render(<CalendarIconSimple height="30px" width="30px" color="red" />)
  expect(container).toMatchSnapshot()
})

test('should get classname', () => {
  const {container} = render(
    <CalendarIconSimple height="30px" width="30px" color="red" className="test" />,
  )
  expect(container).toMatchSnapshot()
})
