import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PickUp, { PickUpContainer } from 'components/Account/Favorites/PickUp'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import RadioList from 'components/Interactive/RadioList'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<PickUp store={store} {...ownProps} />)
}

describe('components/Account/Favorites/PickUp', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      entries: [],
      updateStatus: statuses.NOT_FETCHED,
      clearUpdateSettings: jest.fn(),
      setHomeLibrary: jest.fn(),
    }
    enzymeWrapper = setup(null, props)
  })

  it('should not render InlineLoading', () => {
    expect(enzymeWrapper.dive().find(InlineLoading).exists()).toBe(false)
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        entries: [],
        defaultValue: 'whereItIs',
        updateStatus: statuses.SUCCESS,
        clearUpdateSettings: jest.fn(),
        setHomeLibrary: jest.fn(),
      }
      enzymeWrapper = shallow(<PickUpContainer {...props} />)
    })

    it('should update home library on form submit', () => {
      const form = enzymeWrapper.find('form')
      expect(form.exists()).toBe(true)

      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.setHomeLibrary).toHaveBeenCalled()
    })

    it('should not submit again if save already in progress', () => {
      enzymeWrapper.setProps({
        updateStatus: statuses.FETCHING,
      })

      const form = enzymeWrapper.find('form')
      expect(form.exists()).toBe(true)

      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.setHomeLibrary).not.toHaveBeenCalled()
    })

    it('should change value in state when radio changed', () => {
      expect(enzymeWrapper.state().selectedValue).toEqual(enzymeWrapper.instance().props.defaultValue)

      const radio = enzymeWrapper.find(RadioList)
      expect(radio.exists()).toBe(true)

      const newValue = 'change is inevitable'
      radio.simulate('changeCallback', newValue)
      expect(enzymeWrapper.state().selectedValue).toBe(newValue)
    })

    it('should clear update message when radio changed', () => {
      const radio = enzymeWrapper.find(RadioList)
      expect(radio.exists()).toBe(true)
      radio.simulate('changeCallback', 'whatever')

      expect(props.clearUpdateSettings).toHaveBeenCalled()
    })

    it('should show update message with correct status', () => {
      enzymeWrapper.setProps({
        updateStatus: statuses.SUCCESS,
      })
      expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.SUCCESS} />)).toBe(true)

      enzymeWrapper.setProps({
        updateStatus: statuses.ERROR,
      })
      expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.ERROR} />)).toBe(true)
    })
  })
})
