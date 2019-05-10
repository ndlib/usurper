import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  mapStateToProps,
  mapDispatchToProps,
  DeleteButtonContainer,
} from 'components/Account/ResourceList/ListActions/DeleteButton'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  const store = mockStore(state)
  const props = { ...mapStateToProps(state), ...mapDispatchToProps(store.dispatch), ...ownProps }
  return shallow(<DeleteButtonContainer store={store} {...props} />)
}

describe('components/Account/ResourceList/ListActions/DeleteButton/index.js', () => {
  const props = {
    items: [
      {
        id: 123,
        title: 'test',
        status: 'returned',
        returnDate: '2010-01-01',
      }
    ],
    deleting: false,
    deleteHistorical: jest.fn(),
  }
  const state = {
    personal: {
      deleteHistorical: {
        state: statuses.NOT_FETCHED,
      },
    },
  }

  beforeEach(() => {
    enzymeWrapper = setup(state, props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    jest.resetAllMocks()
  })

  it('should open modal on click', () => {
    const btn = enzymeWrapper.findWhere((el) => el.type() === 'button' && el.text().startsWith('Delete'))
    let modal = enzymeWrapper.find(ReactModal)
    expect(btn.exists()).toBe(true)
    expect(modal.exists()).toBe(true)
    expect(modal.props().isOpen).toBe(false)

    btn.simulate('click')

    expect(enzymeWrapper.find(ReactModal).props().isOpen).toBe(true)
  })

  it('should close modal when clicking cancel', () => {
    enzymeWrapper.setState({
      modalOpen: true,
    })
    expect(enzymeWrapper.find(ReactModal).props().isOpen).toBe(true)

    const found = enzymeWrapper.findWhere((el) => el.type() === 'button' && el.text() === 'Cancel')
    expect(found.exists()).toBe(true)
    found.simulate('click')

    expect(enzymeWrapper.find(ReactModal).props().isOpen).toBe(false)
  })

  it('should call deleteHistorical on confirm delete', () => {
    const found = enzymeWrapper.findWhere((el) => el.type() === 'button' && el.text() === 'Confirm')
    expect(found.exists()).toBe(true)
    found.simulate('click')

    expect(props.deleteHistorical).toHaveBeenCalled()
  })
})
