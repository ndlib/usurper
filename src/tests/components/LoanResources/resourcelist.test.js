import React from 'react'
import ResourceList from '../../../components/LoanResources/ResourceList/presenter'
import Resource from '../../../components/LoanResources/ResourceList/Resource'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

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
      }
      setup(props)
    })

    it('should render column title', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Title'}</a>)).toBe(true)
    })

    it('should render column author', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Author'}</a>)).toBe(true)
    })

    it('should render column status', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Status'}</a>)).toBe(true)
    })

    it('should not render column due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Due Date'}</a>)).toBe(false)
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
      }
      setup(props)
    })

    it('should render column title', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Title'}</a>)).toBe(true)
    })

    it('should render column author', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Author'}</a>)).toBe(true)
    })

    it('should not render column status', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Status'}</a>)).toBe(false)
    })

    it('should render column due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<a>{'Due Date'}</a>)).toBe(true)
    })

    it('should render item', () => {
      expect(enzymeWrapper.containsMatchingElement(<Resource item={props.list[0]} />)).toBe(true)
    })
  })
})
