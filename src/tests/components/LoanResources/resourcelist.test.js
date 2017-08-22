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

  describe('with status', () => {
    beforeEach(() => {
      props = {
        list: [{
          title: 'title',
        }],
        emptyText: 'empty',
        showStatus: true,
      }
      setup(props)
    })

    it('should render column title', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-title sort-none'>{'Title'}</div>)).toBe(true)
    })

    it('should render column author', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-author sort-none'>{'Author'}</div>)).toBe(true)
    })

    it('should render column status', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-status sort-none'>{'Status'}</div>)).toBe(true)
    })

    it('should not render column due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-date sort-none'>{'Due Date'}</div>)).toBe(false)
    })

    it('should render item', () => {
      expect(enzymeWrapper.containsMatchingElement(<Resource item={props.list[0]} />)).toBe(true)
    })
  })

  describe('no status', () => {
    beforeEach(() => {
      props = {
        list: [{
          title: 'title',
        }],
        emptyText: 'empty',
        showStatus: false,
      }
      setup(props)
    })

    it('should render column title', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-title sort-none'>{'Title'}</div>)).toBe(true)
    })

    it('should render column author', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-author sort-none'>{'Author'}</div>)).toBe(true)
    })

    it('should not render column status', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-status sort-none'>{'Status'}</div>)).toBe(false)
    })

    it('should render column due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='sort-date sort-none'>{'Due Date'}</div>)).toBe(true)
    })

    it('should render item', () => {
      expect(enzymeWrapper.containsMatchingElement(<Resource item={props.list[0]} />)).toBe(true)
    })
  })

  describe('when empty', () => {
    beforeEach(() => {
      props = {
        list: [],
        emptyText: 'empty',
      }

      setup(props)
    })

    it('should render a loading message', () => {
      expect(enzymeWrapper.containsMatchingElement(<div>{props.emptyText}</div>)).toBe(true)
    })
  })
})
