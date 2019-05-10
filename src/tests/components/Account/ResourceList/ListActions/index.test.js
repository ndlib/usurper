import React from 'react'
import { shallow } from 'enzyme'

import ListActions from 'components/Account/ResourceList/ListActions'
import DeleteButton from 'components/Account/ResourceList/ListActions/DeleteButton'
import ExportButton from 'components/Account/ResourceList/ListActions/ExportButton'
import RenewButton from 'components/Account/ResourceList/ListActions/RenewButton'

import typeConstants from 'components/Account/ResourceList/constants'

let enzymeWrapper

describe('components/Account/ResourceList/ListActions/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render correct buttons for each listType', () => {
    const renderedAtLeastOnce = {
      renew: false,
      export: false,
      delete: false,
    }

    Object.keys(typeConstants).forEach((listType) => {
      const props = {
        list: ['foo'],
        listType: listType,
      }
      enzymeWrapper = shallow(<ListActions {...props} />)

      let find = <RenewButton items={props.list} />
      let expected = typeConstants[props.listType].renewButton
      expect(enzymeWrapper.containsMatchingElement(find)).toEqual(expected)
      renderedAtLeastOnce.renew = renderedAtLeastOnce.renew || expected

      find = <ExportButton items={props.list} />
      expected = typeConstants[props.listType].exportButton
      expect(enzymeWrapper.containsMatchingElement(find)).toEqual(expected)
      renderedAtLeastOnce.export = renderedAtLeastOnce.export || expected

      find = <DeleteButton items={props.list} />
      expected = typeConstants[props.listType].deleteButton
      expect(enzymeWrapper.containsMatchingElement(find)).toEqual(expected)
      renderedAtLeastOnce.delete = renderedAtLeastOnce.delete || expected
    })

    // We can't be confident the test worked if none of the options are configured to render a given button
    expect(renderedAtLeastOnce).toEqual({
      renew: true,
      export: true,
      delete: true,
    })
  })
})
