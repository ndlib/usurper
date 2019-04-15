import React from 'react'
import * as statuses from '../../../../constants/APIStatuses'
import LoanResources from '../../../../components/Account/LoanResources/presenter'
import PageAlert from '../../../../components/Messages/PageAlert'
import ResourceList from '../../../../components/Account/LoanResources/ResourceList'

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
  expired: false,
}
describe('components/Account/LoanResources/presenter.js', () => {
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

    it('should not render page alert messages', () => {
      expect(enzymeWrapper.find('PageAlert').length).toBe(0)
    })
  })

  describe('account expired', () => {
    let expired = true

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should not render message while loading', () => {
      enzymeWrapper = shallow(<LoanResources resources={props} expired={expired} userLoading={true} />)

      expect(enzymeWrapper.find('PageAlert[id="accountExpired"]').exists()).toBe(false)
    })

    it('should render message after loading', () => {
      enzymeWrapper = shallow(<LoanResources resources={props} expired={expired} userLoading={false} />)

      expect(enzymeWrapper.find('PageAlert[id="accountExpired"]').exists()).toBe(true)
    })
  })

  describe('account not expired', () => {
    let expired = false

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should not render expiration message', () => {
      enzymeWrapper = shallow(<LoanResources resources={props} expired={expired} userLoading={false} />)

      expect(enzymeWrapper.find('PageAlert[id="accountExpired"]').exists()).toBe(false)
    })
  })
})
