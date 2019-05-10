import React from 'react'
import { shallow } from 'enzyme'

import ItemsRequests from 'components/Account/ItemsRequests/presenter'
import AccountError from 'components/Account/ItemsRequests/AccountError'
import AccountExpired from 'components/Account/ItemsRequests/AccountExpired'
import AccountBalance from 'components/Account/ItemsRequests/AccountBalance'
import ResourceList from 'components/Account/ResourceList'
import InlineLoading from 'components/Messages/InlineLoading'
import AccountPageWrapper from 'components/Account/AccountPageWrapper'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

describe('components/Account/ItemsRequests/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('after load', () => {
    beforeEach(() => {
      props = {
        userLoading: false,
        userExpired: false,
        userStatus: statuses.SUCCESS,
        balance: -10.30,
        resources: {
          have: {
            items: ['have'],
            loading: false,
          },
          pending: {
            items: ['pend'],
            loading: false,
          },
        },
      }
      enzymeWrapper = shallow(<ItemsRequests {...props} />)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should render checked out resources', () => {
      const find = <ResourceList list={ props.resources.have.items } loading={false} type='borrowed' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render pending resources', () => {
      const find = <ResourceList list={ props.resources.pending.items } loading={false} type='pending' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render AccountBalance component', () => {
      const find = <AccountBalance balance={props.balance} />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should not render AccountExpired', () => {
      expect(enzymeWrapper.find(AccountExpired).exists()).toBe(false)
    })

    it('should not render AccountError', () => {
      expect(enzymeWrapper.find(AccountError).exists()).toBe(false)
    })

    it('should not render InlineLoading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
    })
  })

  describe('loading user', () => {
    beforeEach(() => {
      props = {
        userLoading: true,
        userExpired: false,
        userStatus: statuses.FETCHING,
        balance: 0,
        resources: {
          have: {
            items: ['have'],
            loading: false,
          },
          pending: {
            items: ['pend'],
            loading: false,
          },
        },
      }
      enzymeWrapper = shallow(<ItemsRequests {...props} />)
    })

    it('should render InlineLoading component', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
    })

    it('should not render any ResourceList', () => {
      expect(enzymeWrapper.find(ResourceList).exists()).toBe(false)
    })

    it('should not render AccountBalance', () => {
      expect(enzymeWrapper.find(AccountBalance).exists()).toBe(false)
    })

    it('should not render AccountExpired', () => {
      expect(enzymeWrapper.find(AccountExpired).exists()).toBe(false)
    })

    it('should not render AccountError', () => {
      expect(enzymeWrapper.find(AccountError).exists()).toBe(false)
    })
  })

  describe('loading resources', () => {
    beforeEach(() => {
      props = {
        userLoading: false,
        userExpired: false,
        userStatus: statuses.SUCCESS,
        balance: 0,
        resources: {
          have: {
            items: ['have'],
            loading: true,
          },
          pending: {
            items: ['pend'],
            loading: true,
          },
        },
      }
      enzymeWrapper = shallow(<ItemsRequests {...props} />)
    })

    it('should render a loading checked out resources', () => {
      const find = <ResourceList list={ props.resources.have.items } loading={true} type='borrowed' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render a loading pending resources', () => {
      const find = <ResourceList list={ props.resources.pending.items } loading={true} type='pending' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })

  describe('account expired', () => {
    beforeEach(() => {
      props = {
        userLoading: false,
        userExpired: true,
        userStatus: statuses.SUCCESS,
        balance: 0,
        resources: {
          have: {
            items: ['have'],
            loading: false,
          },
          pending: {
            items: ['pend'],
            loading: false,
          },
        },
      }
      enzymeWrapper = shallow(<ItemsRequests {...props} />)
    })

    it('should render AccountExpired component', () => {
      expect(enzymeWrapper.find(AccountExpired).exists()).toBe(true)
    })
  })
})
