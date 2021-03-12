import React from 'react'
import { shallow } from 'enzyme'

import ToolTip from 'components/Account/ResourceList/Resource/ToolTip'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ToolTip {...props} />)
}

describe('components/Account/ResourceList/Resource/ToolTip', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render Yes and tooltip in renewable column for ILL items', () => {
    enzymeWrapper = setup({ value: true })
    expect.any(String)
  })
  it('should render No and tooltip in renewable column for ILL items', () => {
    enzymeWrapper = setup({ value: false })
    expect.any(String)
  })
})
