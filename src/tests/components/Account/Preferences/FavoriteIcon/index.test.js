import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import FavoriteIcon,
{
  FavoriteIconContainer,
  mapStateToProps,
  mapDispatchToProps,
}
from 'components/Account/Preferences/FavoriteIcon'

import { REQUEST_UPDATE_FAVORITES, KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const MINIMAL_STATE = {
  favorites: {
    update: {
      [KIND.databases]: { state: statuses.NOT_FETCHED },
      [KIND.subjects]: { state: statuses.NOT_FETCHED },
    }
  },
}

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<FavoriteIcon store={store} {...ownProps} />)
}

describe('components/Account/Preferences/FavoriteIcon', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
    props = undefined
  })

  describe('when logged in', () => {
    const state = {
      personal: {
        login: { status: statuses.SUCCESS, token: 'fake token' }
      },
    }
    Object.assign(state, MINIMAL_STATE)

    beforeEach(() => {
      props = {
        isFavorited: false,
        disabled: false,
        kind: KIND.databases,
        data: [],
      }
    })

    it('should see user as logged in', () => {
      enzymeWrapper = setup(state, props)
      expect(enzymeWrapper.dive().props().isLoggedIn).toBe(true)
    })

    it('should change hover text when item already favorited', () => {
      enzymeWrapper = setup(state, props)
      const props2 = {
        isFavorited: true,
        disabled: false,
        kind: KIND.databases,
        data: [],
      }
      const compare = setup(state, props2)

      const unfavoritedEl = enzymeWrapper.dive().dive().find('.favorite-action')
      const favoritedEl = compare.dive().dive().find('.favorite-action')
      expect(unfavoritedEl.exists()).toBe(true)
      expect(favoritedEl.exists()).toBe(true)
      expect(unfavoritedEl.props().title).not.toBe(favoritedEl.props().title)
    })

    it('should change state when hovering', () => {
      const testProps = { ...mapStateToProps(state, props), ...mapDispatchToProps(null, props), ...props }
      enzymeWrapper = shallow(<FavoriteIconContainer {...testProps} />)
      expect(enzymeWrapper.state().isHovered).toBe(false)
      enzymeWrapper.simulate('mouseEnter')
      expect(enzymeWrapper.state().isHovered).toBe(true)
      enzymeWrapper.simulate('mouseLeave')
      expect(enzymeWrapper.state().isHovered).toBe(false)

      // Should ignore hovering when disabled
      enzymeWrapper.setProps({ disabled: true })
      enzymeWrapper.simulate('mouseEnter')
      expect(enzymeWrapper.state().isHovered).toBe(false)
    })

    it('should update favorites when clicked', () => {
      props.data = [
        {
          itemKey: 'foo',
          title: 'bar',
          url: 'baz',
        },
      ]
      enzymeWrapper = setup(state, props)
      enzymeWrapper.dive().dive().simulate('click')

      expect(store.getActions()).toEqual([
        { type: REQUEST_UPDATE_FAVORITES, kind: KIND.databases }
      ])

      // Removing when already favorited
      store.clearActions()
      enzymeWrapper.setProps({ isFavorited: true })
      enzymeWrapper.dive().dive().simulate('click')

      expect(store.getActions()).toEqual([
        { type: REQUEST_UPDATE_FAVORITES, kind: KIND.databases }
      ])
    })

    it('should do nothing if clicked while disabled', () => {
      props.disabled = true
      enzymeWrapper = setup(state, props)
      enzymeWrapper.dive().dive().simulate('click')

      expect(store.getActions()).toHaveLength(0)
    })
  })

  describe('when not logged in', () => {
    const state = {
      personal: {
        login: { status: statuses.SUCCESS }
      },
    }
    Object.assign(state, MINIMAL_STATE)

    beforeEach(() => {
      props = {
        isFavorited: false,
        disabled: false,
        kind: KIND.databases,
        data: [],
      }
    })

    it('should not see user as logged in', () => {
      enzymeWrapper = setup(state, props)
      expect(enzymeWrapper.dive().props().isLoggedIn).toBe(false)
    })

    it('should render nothing', () => {
      enzymeWrapper = setup(state, props)
      expect(enzymeWrapper.dive().dive().text()).toBeFalsy()
    })
  })
})
