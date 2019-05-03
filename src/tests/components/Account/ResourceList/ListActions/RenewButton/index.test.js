import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  RenewButtonContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'components/Account/ResourceList/ListActions/RenewButton'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  const store = mockStore(state)
  const props = { ...mapStateToProps(state), ...mapDispatchToProps(store.dispatch), ...ownProps }
  return shallow(<RenewButtonContainer store={store} {...props} />)
}

describe('components/Account/ResourceList/ListActions/RenewButton/index.js', () => {
  const props = {
    items: [
      {
        id: 123,
        title: 'test',
        status: 'returned',
        returnDate: '2010-01-01',
        barcode: '555',
      },
      {
        id: 456,
        title: 'something',
        status: 'returned',
        returnDate: '2010-01-01',
        barcode: '222',
      }
    ],
    renewAleph: jest.fn(),
    receiveRenewal: jest.fn(),
  }

  afterEach(() => {
    enzymeWrapper = undefined
    jest.resetAllMocks()
  })

  describe('with valid account', () => {
    const state = {
      personal: {
        user: {
          state: statuses.SUCCESS,
          alephId: 'MLC0123456',
          expiryDate: '29990101',
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state, props)
    })

    it('should renew all items when clicked', () => {
      enzymeWrapper.simulate('click')

      props.items.forEach((item) => {
        expect(props.renewAleph).toHaveBeenCalledWith(item.barcode, state.personal.user.alephId)
      })
    })
  })

  describe('with expired account', () => {
    const state = {
      personal: {
        user: {
          state: statuses.SUCCESS,
          alephId: 'MLC0123456',
          expiryDate: '19990101',
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state, props)
    })

    it('should disable renew button', () => {
      expect(enzymeWrapper.props().disabled).toBe(true)
    })
  })
})
