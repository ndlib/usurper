import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import ManageFavorites, { ManageFavoritesContainer } from 'components/Account/Favorites/ManageFavorites'
import Presenter from 'components/Account/Favorites/ManageFavorites/presenter.js'
import Wizard from 'components/Account/Favorites/Wizard'

import { REQUEST_UPDATE_FAVORITES, KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<ManageFavorites store={store} {...ownProps} />)
}

describe('components/Account/Favorites/ManageFavorites', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
    jest.restoreAllMocks()
  })

  beforeEach(() => {
    const state = {
      personal: {
        login: {
          status: statuses.SUCCESS,
          token: 'fake token',
        },
      },
      favorites: {
        update: {
          [KIND.databases]: {
            state: statuses.NOT_FETCHED,
          },
        },
      },
    }
    const props = {
      kind: KIND.databases,
      items: [
        { title: 'last item', order: 3, id: '1' },
        { title: 'first item', order: 1, id: '2' },
        { title: 'middle item', order: 2, id: '3' },
      ],
    }
    enzymeWrapper = setup(state, props)
  })

  const sortItems = (arr) => {
    return arr.sort((a, b) => {
      if (a.order === b.order || (!a.order && !b.order)) {
        return 0
      } else {
        return a.order > b.order ? 1 : -1
      }
    })
  }

  it('should render a Presenter component with sorted items', () => {
    const presenter = enzymeWrapper.dive().dive().find(Presenter)
    expect(presenter.exists()).toBe(true)
    expect(presenter.props().kind).toEqual(enzymeWrapper.dive().props().kind)
    expect(presenter.props().favorited).toEqual(sortItems(enzymeWrapper.dive().props().items))
  })

  it('should update list when adding an item', () => {
    const instance = enzymeWrapper.dive().dive().instance()
    const originalListItems = instance.state.listItems
    const newItem = {
      itemKey: 'some_id',
      title: 'title',
      url: 'url.to.thing',
    }

    // Mock this so it will not upset our state after adding item
    jest.spyOn(ManageFavoritesContainer, 'getDerivedStateFromProps').mockImplementation(() => null)

    instance.onAddFavorite(KIND.subjects, newItem.itemKey, newItem.title, newItem.url)
    expect(instance.state.listItems).toEqual(originalListItems.concat([newItem]))
  })

  it('should dispatch favorites update on saving modified list', () => {
    const instance = enzymeWrapper.dive().dive().instance()
    const newItem = {
      itemKey: 'some_id',
      title: 'title',
      url: 'url.to.thing',
    }
    instance.onAddFavorite(KIND.subjects, newItem.itemKey, newItem.title, newItem.url)
    instance.onSave()

    expect(store.getActions()).toEqual([
      { type: REQUEST_UPDATE_FAVORITES, kind: enzymeWrapper.dive().props().kind }
    ])
  })

  it('should update state when save complete', () => {
    // Set up a new wrapper since we need different props
    const state = {
      personal: {
        login: {
          status: statuses.SUCCESS,
          token: 'fake token',
        },
      },
      favorites: {
        update: {
          [KIND.subjects]: {
            state: statuses.SUCCESS,
          },
        },
      },
    }
    const props = {
      kind: KIND.subjects,
      items: [
        { title: 'last item', order: 3 },
        { title: 'first item', order: 1 },
      ],
    }
    enzymeWrapper = setup(state, props)

    const instance = enzymeWrapper.dive().dive().instance()
    const newItem = {
      itemKey: 'some_id',
      title: 'title',
      url: 'url.to.thing',
    }

    instance.onAddFavorite(KIND.subjects, newItem.itemKey, newItem.title, newItem.url)
    expect(instance.state.saved).toBe(true)
    expect(instance.state.modified).toBe(false)
  })

  it('should not dispatch update if list unmodified', () => {
    const instance = enzymeWrapper.dive().dive().instance()
    instance.setState({
      modified: false,
    })
    instance.onSave()

    expect(store.getActions()).toHaveLength(0)
  })

  describe('wizard', () => {
    const props = {
      kind: KIND.subjects,
      items: [
        { itemKey: 'last', url: '/last', title: 'last item', order: 3 },
        { itemKey: 'first', url: '/first', title: 'first item', order: 1 },
      ],
      saveState: statuses.NOT_FETCHED,
      setFavorites: jest.fn(),
      clearUpdateFavorites: jest.fn(),
    }

    beforeEach(() => {
      enzymeWrapper = shallow(<ManageFavoritesContainer {...props} />)
    })

    it('should render wizard when wizard open', () => {
      const instance = enzymeWrapper.instance()

      instance.openWizard()
      expect(enzymeWrapper.find(Wizard).exists()).toBe(true)

      // Add an item to simulate what the wizard might do while it is open
      const newItems = [...props.items, { itemKey: 'new', url: '/new', title: 'new item', order: 999 }]
      enzymeWrapper.setProps({
        items: newItems,
      })

      instance.closeWizard()
      expect(enzymeWrapper.find(Wizard).exists()).toBe(false)
      // Should update item list in state after closing wizard, in case the wizard updated them
      expect(instance.state.listItems).toEqual(expect.arrayContaining(newItems))
    })

    it('should not allow opening wizard if list modified', () => {
      window.alert = jest.fn() // Silence alert message in console

      enzymeWrapper.setState({
        modified: true,
      })

      const instance = enzymeWrapper.instance()
      instance.openWizard()

      expect(enzymeWrapper.state().wizardOpen).toBe(false)
      expect(window.alert).toHaveBeenCalled()
    })
  })
})
