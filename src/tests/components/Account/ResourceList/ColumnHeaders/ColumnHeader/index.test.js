import React from 'react'
import { shallow } from 'enzyme'

import ColumnHeader from 'components/Account/ResourceList/ColumnHeaders/ColumnHeader'
import typeConstants from 'components/Account/ResourceList/constants'

let enzymeWrapper

const setup = (props) => {
  return shallow(<ColumnHeader {...props} />)
}

describe('components/Account/ResourceList/ColumnHeaders/ColumnHeader/index.js', () => {
  const props = {
    listType: 'borrowed',
    displayName: 'SuperAwesomeName',
    columnKey: 'superawesome',
    sortClick: jest.fn(),
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should call sort on clicking element', () => {
    enzymeWrapper.simulate('click')
    expect(props.sortClick).toHaveBeenCalled()
  })

  it('should show the display name passed in', () => {
    expect(enzymeWrapper.text()).toContain(props.displayName)
  })
})
