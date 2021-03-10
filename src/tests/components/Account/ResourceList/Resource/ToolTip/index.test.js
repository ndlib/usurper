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
    enzymeWrapper = setup({ value: 'Yes' })
    expect(enzymeWrapper.containsMatchingElement(<div>Yes<span>Please click the &quot;view in ILL&quot; button to renew</span></div>)).toBe(true)
  })
  it('should render No and tooltip in renewable column for ILL items', () => {
    enzymeWrapper = setup({ value: 'No' })
    expect(enzymeWrapper.containsMatchingElement(<div>No<span>Renewal not available. Please return by due date.</span></div>)).toBe(true)
  })
})
