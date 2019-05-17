import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import CircOptIn, { CircOptInContainer } from 'components/Account/Settings/CircOptIn'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import PolicyInfo from 'components/Account/Settings/CircOptIn/PolicyInfo'
import CircHistoryModal from 'components/Account/Settings/CircOptIn/CircHistoryModal'

import { KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<CircOptIn store={store} {...ownProps} />)
}

describe('components/Account/Settings/CircOptIn', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('after loading', () => {
    const state = {
      settings: {
        [KIND.circStatus]: {
          state: statuses.SUCCESS,
          data: false,
        },
        update: {
          [KIND.circStatus]: {
            state: statuses.NOT_FETCHED,
          },
        },
      },
      personal: {
        login: {
          token: 'asbfzbpignjdpsah',
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state)
    })

    it('should render PolicyInfo', () => {
      expect(enzymeWrapper.dive().dive().find(PolicyInfo).exists()).toBe(true)
    })

    it('should not render InlineLoading', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(false)
    })

    describe('without store', () => {
      beforeEach(() => {
        enzymeWrapper = shallow(<CircOptInContainer {...enzymeWrapper.dive().props()} />)
      })

      it('should open modal when clicking button', () => {
        expect(enzymeWrapper.state().modalOpen).toBe(false)

        // We don't have an identifier on the button, so fail this test if there is more than one button
        const btn = enzymeWrapper.find('button')
        expect(btn).toHaveLength(1)

        btn.simulate('click')
        expect(enzymeWrapper.state().modalOpen).toBe(true)

        const instance = enzymeWrapper.instance()
        expect(enzymeWrapper.containsMatchingElement(
          <CircHistoryModal isOpen optedIn={false} updating={false} onClose={instance.dismiss} onConfirm={instance.confirmToggleStatus} />
        )).toBe(true)
      })

      it('should close modal when finished updating', () => {
        const instance = enzymeWrapper.instance()
        instance.openModal()
        expect(enzymeWrapper.state().modalOpen).toBe(true)

        enzymeWrapper.setProps({
          updating: true,
        })
        enzymeWrapper.setProps({
          updating: false,
        })

        expect(enzymeWrapper.state().modalOpen).toBe(false)
      })

      it('should show update message after toggling opt-in status', () => {
        expect(enzymeWrapper.state().updated).toBe(false)

        const instance = enzymeWrapper.instance()
        instance.confirmToggleStatus()

        expect(enzymeWrapper.state().updated).toBe(true)
        enzymeWrapper.setProps({
          updateStatus: statuses.SUCCESS,
        })
        expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.SUCCESS} />)).toBe(true)

        // If it comes back with an error, should be an error status message
        enzymeWrapper.setProps({
          updateStatus: statuses.ERROR,
        })
        expect(enzymeWrapper.containsMatchingElement(<UpdateStatus status={statuses.ERROR} />)).toBe(true)
      })
    })
  })

  describe('while loading', () => {
    const state = {
      settings: {
        [KIND.circStatus]: {
          state: statuses.NOT_FETCHED,
        },
        update: {
          [KIND.circStatus]: {
            state: statuses.NOT_FETCHED,
          },
        },
      },
      personal: {
        login: {
          token: 'asbfzbpignjdpsah',
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state)
    })

    it('should render InlineLoading', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(true)
    })

    it('should not render modal', () => {
      expect(enzymeWrapper.dive().dive().find(CircHistoryModal).exists()).toBe(false)
    })
  })
})
