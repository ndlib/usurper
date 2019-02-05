import React from 'react'
import ResourceList from '../../../components/LoanResources/ResourceList/presenter'
import Resource from '../../../components/LoanResources/ResourceList/Resource'
import { shallow } from 'enzyme'

let enzymeWrapper
const setup = (props) => {
  enzymeWrapper = shallow(<ResourceList {...props} />)
}

let props
describe('components/LoanResources/resourceList.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('pending', () => {
    beforeEach(() => {
      props = {
        list: [{
          title: 'title',
        }],
        borrowed: false,
        filterValue: 'title',
        filterChange: jest.fn(),
        sortClass: jest.fn(),
        sortClick: jest.fn(),
        assistSortDirection: jest.fn(),
        listType: 'listType',
        assistText: 'assistText'
      }
      setup(props)
    })

    it('should render column title', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Title'}</button>)).toBe(true)
    })

    it('should render column author', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Author'}</button>)).toBe(true)
    })

    it('should render column status', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Status'}</button>)).toBe(true)
    })

    it('should not render column due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Due Date'}</button>)).toBe(false)
    })

    it('should render item', () => {
      expect(enzymeWrapper.containsMatchingElement(<Resource item={props.list[0]} />)).toBe(true)
    })
  })

  describe('borrowed', () => {
    beforeEach(() => {
      props = {
        list: [{
          title: 'title',
        }],
        borrowed: true,
        filterValue: 'title',
        filterChange: jest.fn(),
        sortClass: jest.fn(),
        sortClick: jest.fn(),
        assistSortDirection: jest.fn(),
        listType: 'listType',
        assistText: 'assistText'
      }
      setup(props)
    })

    it('should render column title', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Title'}</button>)).toBe(true)
    })

    it('should render column author', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Author'}</button>)).toBe(true)
    })

    it('should not render column status', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Status'}</button>)).toBe(false)
    })

    it('should render column due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>{'Due Date'}</button>)).toBe(true)
    })

    it('should render item', () => {
      expect(enzymeWrapper.containsMatchingElement(<Resource item={props.list[0]} />)).toBe(true)
    })
  })
})
