import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import LoanResources from '../../../components/LoanResources/presenter'
import AccountExpired from '../../../components/Messages/AccountExpired'
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
  canRenew: true,
}
describe('components/LoanResources/presenter.js', () => {
  describe('after load', () => {
    beforeEach(() => {
      enzymeWrapper = shallow(<LoanResources resources={props} userLoading={false} />)
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

  describe('loading', () => {
    beforeEach(() => {
      enzymeWrapper = shallow(<LoanResources resources={props} userLoading={true} />)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a loading checked out resources', () => {
      let have = <ResourceList list={ props.have.items } emptyText={props.have.emptyText} loading={true} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should render a loading pending resources', () => {
      let pending = <ResourceList list={ props.pending.items } emptyText={props.pending.emptyText} loading={true} />
      expect(enzymeWrapper.containsMatchingElement(pending)).toBe(true)
    })
  })

  describe('account expired', () => {
    let canRenew = false

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should not render message while loading', () => {
      enzymeWrapper = shallow(<LoanResources resources={props} canRenew={canRenew} userLoading={true} />)

      let have = <AccountExpired />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(false)
    })

    // TEMPORARILY DISABLED
    // it('should render message after loading', () => {
    //   enzymeWrapper = shallow(<LoanResources resources={props} canRenew={canRenew} userLoading={false} />)
    //
    //   let have = <AccountExpired />
    //   expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    // })
  })

  describe('account not expired', () => {
    let canRenew = true

    afterEach(() => {
      enzymeWrapper = undefined
    })

    // TEMPORARILY DISABLED
    it('should not render expiration message', () => {
      enzymeWrapper = shallow(<LoanResources resources={props} canRenew={canRenew} userLoading={false} />)

      let have = <AccountExpired />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(false)
    })
  })
})
