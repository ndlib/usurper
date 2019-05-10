import React from 'react'
import { shallow } from 'enzyme'

import ColumnHeaders from 'components/Account/ResourceList/ColumnHeaders'
import ColumnHeader from 'components/Account/ResourceList/ColumnHeaders/ColumnHeader'
import typeConstants from 'components/Account/ResourceList/constants'

let enzymeWrapper

describe('components/Account/ResourceList/ColumnHeaders/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a ColumnHeader for each column in listType', () => {
    const sharedProps = {
      sortClick: jest.fn(),
    }

    Object.keys(typeConstants).forEach((listType) => {
      const props = {
        ...sharedProps,
        listType: listType,
      }
      enzymeWrapper = shallow(<ColumnHeaders {...props} />)
      Object.keys(typeConstants[listType].columns).forEach((column) => {
        const displayName = typeConstants[props.listType].columns[column]
        const find = <ColumnHeader columnKey={column} displayName={displayName} {...props} />
        expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
      })
    })
  })
})
