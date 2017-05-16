import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import LoanResources from '../../../components/LoanResources/presenter'
import ResourceList from '../../../components/LoanResources/resourceList'

import { shallow } from 'enzyme'

let enzymeWrapper
describe('components/LoanResources/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = shallow(<LoanResources resources={{
      have: { items: ['items'] },
      pending: { items: ['items'] },
    }} />)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render checked out resources', () => {
    let have = <ResourceList list={ ['items'] } emptyText='You have no checked out items.' />
    expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
  })

  it('should render pending resources', () => {
    let pending = <ResourceList list={ ['items'] } emptyText='You have no pending items.' />
    expect(enzymeWrapper.containsMatchingElement(pending)).toBe(true)
  })
})
