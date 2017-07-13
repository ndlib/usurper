import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import ResourceList from '../../../components/LoanResources/resourceList'
import IlliadActions from '../../../components/LoanResources/illiadActions'
import { shallow } from 'enzyme'

import Config from '../../../shared/Configuration'
import Link from '../../../components/Link'

let enzymeWrapper
const setup = (props) => {
  enzymeWrapper = shallow(<ResourceList {...props} />)
}

let props
describe('components/LoanResources/resourceList.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('on success', () => {
    beforeEach(() => {
      props = {
        list: [{
          title: 'title',
          author: 'author',
          published: 'published',
          status: 'status',
          dueDate: '2017-05-31',
          transactionNumber: '4000',
        }],
        emptyText: 'empty',
      }
      setup(props)
    })

    it('should render item title', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='card-title'>{'title'}</div>)).toBe(true)
    })

    it('should render item author', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='card-subtitle'>{'author'}</div>)).toBe(true)
    })

    it('should render item published date', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='card-published'>{'Published: published'}</div>)).toBe(true)
    })

    it('should render item status', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='card-status'>{'Status: status'}</div>)).toBe(true)
    })

    it('should render item due date', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='card-due'>{'Due Date: 2017-05-31'}</div>)).toBe(true)
    })

    it('should render ILL actions', () => {
      expect(enzymeWrapper.containsMatchingElement(<IlliadActions item={props.list[0]} />)).toBe(true)
    })
  })

  describe('when empty', () => {
    beforeEach(() => {
      setup({
        list: [],
        emptyText: 'empty',
      })
    })

    it('should render a loading message', () => {
      expect(enzymeWrapper.containsMatchingElement(<div>empty</div>)).toBe(true)
    })
  })
})
