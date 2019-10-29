import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Facet from 'components/Interactive/Facet'
import Presenter from 'components/Interactive/Facet/presenter.js'
import { KIND } from 'actions/personal/favorites'

let enzymeWrapper
let props

const facet1 = {
  key: 'bar',
  value: 'A_First record',
  selected: true,
}
const facet2 = {
  key: 'foo',
  value: 'M_Middle 1',
  selected: true,
}
const facet3 = {
  key: 'baz',
  value: 'Z_Last record',
  selected: true,
}
const newFacet = {
  key: 'foobar',
  value: 'M_Middle 2',
  selected: false,
}

const setup = (props) => {
  return shallow(<Facet {...props} />)
}

describe('components/Interactive/Facet', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      name: 'facet',
      label: 'Some Facet',
      options: [
        facet2,
        facet1,
        facet3,
        newFacet,
      ],
      selectedValues: [
        facet1.key,
        facet2.key,
        facet3.key,
      ],
      onChangeCallback: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render a presenter', () => {
    const found = enzymeWrapper.find(Presenter)
    expect(found.exists()).toBe(true)
  })

  it('should sort facets by display value', () => {
    const found = enzymeWrapper.find(Presenter)
    expect(found.exists()).toBe(true)
    expect(found.props().options).toEqual([
      facet1,
      facet2,
      newFacet,
      facet3,
    ])
  })

  describe('onFacetChange', () => {
    it('should add item when not already active', () => {
      const instance = enzymeWrapper.instance()
      instance.onFacetChange(newFacet)

      expect(props.onChangeCallback).toHaveBeenCalledWith(props.name,
        expect.arrayContaining([
          facet1.key,
          facet2.key,
          facet3.key,
          newFacet.key,
        ])
      )
    })

    it('should remove item when already active', () => {
      const instance = enzymeWrapper.instance()
      instance.onFacetChange(facet2)

      expect(props.onChangeCallback).toHaveBeenCalledWith(props.name,
        [
          facet1.key,
          facet3.key,
        ]
      )
    })
  })
})
