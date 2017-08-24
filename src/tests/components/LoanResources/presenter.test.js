import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import LoanResources from '../../../components/LoanResources/presenter'
import ResourceList from '../../../components/LoanResources/ResourceList'

import { shallow } from 'enzyme'

let enzymeWrapper
let props = {
  have: {
    items: ['have'],
    emptyText: 'have empty',
    loading: false,
  },
  pending: {
    items: ['pend'],
    emptyText: 'pending empty',
    loading: false,
  },
}
describe('components/LoanResources/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = shallow(<LoanResources resources={props} />)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render checked out resources', () => {
    let have = <ResourceList list={ props.have.items } emptyText={props.have.emptyText} loading={false} />
    expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
  })

  it('should render pending resources', () => {
    let pending = <ResourceList list={ props.pending.items } emptyText={props.pending.emptyText} loading={false} />
    expect(enzymeWrapper.containsMatchingElement(pending)).toBe(true)
  })
})
