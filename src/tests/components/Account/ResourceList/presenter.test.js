import React from 'react'
import { shallow } from 'enzyme'

import ResourceList from 'components/Account/ResourceList/presenter'
import Resource from 'components/Account/ResourceList/Resource'
import ListActions from 'components/Account/ResourceList/ListActions'
import ColumnHeaders from 'components/Account/ResourceList/ColumnHeaders'
import InlineLoading from 'components/Messages/InlineLoading'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ResourceList {...props} />)
}

describe('components/Account/ResourceList/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('after loading', () => {
    beforeEach(() => {
      props = {
        loading: false,
        list: [
          {
            id: 111,
            title: 'foo',
          },
          {
            id: 222,
            title: 'bar',
          },
        ],
        count: 5, // This is the unfiltered count. May be different than size of "list" which is filtered
        filterValue: 'title',
        filterChange: jest.fn(),
        assistText: 'assistText',
        listType: 'pending',
      }
      enzymeWrapper = setup(props)
    })

    it('should render a Resource for each item', () => {
      props.list.forEach((item) => {
        const find = <Resource item={item} listType={props.listType} />
        expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
      })
    })

    it('should have header displaying total number of items', () => {
      const found = enzymeWrapper.find('h3')
      expect(found.exists()).toBe(true)
      expect(found.text()).toContain(`${props.count} Items`)
    })

    it('should render actions', () => {
      expect(enzymeWrapper.find(ListActions).exists()).toBe(true)
    })

    it('should render column headers', () => {
      expect(enzymeWrapper.find(ColumnHeaders).exists()).toBe(true)
    })

    it('should not render InlineLoading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
    })
  })

  describe('with no items', () => {
    beforeEach(() => {
      props = {
        loading: false,
        list: [],
        count: 0,
        filterValue: 'title',
        filterChange: jest.fn(),
        assistText: 'assistText',
        listType: 'pending',
      }
      enzymeWrapper = setup(props)
    })

    it('should not render actions', () => {
      expect(enzymeWrapper.find(ListActions).exists()).toBe(false)
    })

    it('should not render column headers', () => {
      expect(enzymeWrapper.find(ColumnHeaders).exists()).toBe(false)
    })

    it('should not render resources', () => {
      expect(enzymeWrapper.find(Resource).exists()).toBe(false)
    })
  })

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        loading: true,
        list: [{
          title: 'title',
        }],
        count: 1,
        filterValue: 'title',
        filterChange: jest.fn(),
        assistText: 'assistText',
        listType: 'pending',
      }
      enzymeWrapper = setup(props)
    })

    it('should render InlineLoading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
    })

    it('should not render actions', () => {
      expect(enzymeWrapper.find(ListActions).exists()).toBe(false)
    })

    it('should not render column headers', () => {
      expect(enzymeWrapper.find(ColumnHeaders).exists()).toBe(false)
    })

    it('should not render resources', () => {
      expect(enzymeWrapper.find(Resource).exists()).toBe(false)
    })
  })
})
