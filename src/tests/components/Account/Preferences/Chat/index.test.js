import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Chat from 'components/Account/Preferences/Chat'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<Chat store={store} {...ownProps} />)
}

describe('components/Account/Preferences/Chat', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      defaultChecked: false,
      updateStatus: statuses.NOT_FETCHED,
    }
    enzymeWrapper = setup(null, props)
  })

  it('should not render InlineLoading', () => {
    expect(enzymeWrapper.dive().find(InlineLoading).exists()).toBe(false)
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        defaultChecked: true,
        updateStatus: statuses.SUCCESS,
        clearUpdateSettings: jest.fn(),
        setChatOptOut: jest.fn(),
      }
      enzymeWrapper = shallow(<Chat.WrappedComponent {...props} />)
    })

    it('should update chat preferences on form submit', () => {
      const form = enzymeWrapper.find('form')
      expect(form.exists()).toBe(true)

      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.setChatOptOut).toHaveBeenCalled()
    })

    it('should not submit again if save already in progress', () => {
      enzymeWrapper.setProps({
        updateStatus: statuses.FETCHING,
      })

      const form = enzymeWrapper.find('form')
      expect(form.exists()).toBe(true)

      form.simulate('submit', { preventDefault: jest.fn() })
      expect(props.setChatOptOut).not.toHaveBeenCalled()
    })

    it('should render a checkbox', () => {
      const input = enzymeWrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.props().type).toEqual('checkbox')
      expect(input.props().defaultChecked).toEqual(props.defaultChecked)
    })

    it('should clear update message when checkbox changed', () => {
      enzymeWrapper.setProps({
        updateStatus: statuses.SUCCESS,
      })

      const checkbox = enzymeWrapper.findWhere(el => el.type() === 'input' && el.props().type === 'checkbox')
      expect(checkbox.exists()).toBe(true)
      checkbox.simulate('change', {
        target: {
          checked: !props.defaultChecked,
        },
      })

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
