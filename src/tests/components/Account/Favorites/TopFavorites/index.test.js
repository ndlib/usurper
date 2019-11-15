import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import TopFavorites from 'components/Account/Favorites/TopFavorites'
import Link from 'components/Interactive/Link'

import { KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const FAVORITE_TYPES_COUNT = Object.keys(KIND).length
const MAX_PER_SECTION = 4
const MINIMAL_STATE = {
  favorites: {
    [KIND.databases]: { items: [] },
    [KIND.subjects]: { items: [] },
  },
}

const setup = (state) => {
  store = mockStore(state)
  return shallow(<TopFavorites store={store} />)
}

describe('components/Account/Favorites/TopFavorites', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
  })

  it('should show link for each favorite', () => {
    const state = {
      favorites: {
        [KIND.databases]: {
          items: [
            { itemKey: 'fooKey', title: 'fooTitle', url: 'fooUrl' },
            { itemKey: 'barKey', title: 'barTitle', url: 'barUrl' },
          ],
        },
        [KIND.subjects]: {
          items: [
            { itemKey: 'bazKey', title: 'bazTitle', url: 'bazUrl' },
          ],
        },
      },
    }
    enzymeWrapper = setup(state)

    for (const type in state.favorites) {
      state.favorites[type].items.forEach ((item) => {
        const a = enzymeWrapper.dive().dive().find({ to: item.url })
        expect(a.exists()).toBe(true)
        expect(a.childAt(0).text()).toEqual(item.title)
      })
    }
  })

  it('should limit number of displayed favorites', () => {
    const state = {
      favorites: {
        [KIND.databases]: {
          items: [
            { itemKey: 'a', title: 'a', url: 'a' },
            { itemKey: 'b', title: 'b', url: 'b' },
            { itemKey: 'c', title: 'c', url: 'c' },
            { itemKey: 'd', title: 'd', url: 'd' },
            { itemKey: 'e', title: 'e', url: 'e' },
          ],
        },
        [KIND.subjects]: {
          items: [
            { itemKey: 'v', title: 'v', url: 'v' },
            { itemKey: 'w', title: 'w', url: 'w' },
            { itemKey: 'x', title: 'x', url: 'x' },
            { itemKey: 'y', title: 'y', url: 'y' },
            { itemKey: 'z', title: 'z', url: 'z' },
          ],
        },
      },
    }
    enzymeWrapper = setup(state)

    const favoriteTypeCount = Object.keys(KIND).length

    expect(enzymeWrapper.dive().dive().find('.subsection-title')).toHaveLength(FAVORITE_TYPES_COUNT)

    const containers = enzymeWrapper.dive().dive().find('.linksgroup')
    expect(containers).toHaveLength(FAVORITE_TYPES_COUNT)
    containers.forEach((container) => {
      expect(container.find(Link)).toHaveLength(MAX_PER_SECTION)
    })

    // In case the max changes, this ensures that the test is still doing something
    for (const kind in state.favorites) {
      expect(state.favorites[kind].items.length).not.toEqual(MAX_PER_SECTION)
    }
  })

  it('should hide sections with no favorites', () => {
    const state = {
      favorites: {
        [KIND.databases]: {
          items: [
            { itemKey: 'a', title: 'a', url: 'a' },
          ],
        },
        [KIND.subjects]: {
          items: [],
        },
      },
    }
    enzymeWrapper = setup(state)

    expect(enzymeWrapper.dive().dive().find('.subsection-title')).toHaveLength(1)
  })

  it('should sort favorited items', () => {
    const state = {
      favorites: {
        [KIND.databases]: {
          items: [
            { itemKey: 'a', title: 'a', url: 'a', order: 4 },
            { itemKey: 'b', title: 'b', url: 'b', order: 5 },
            { itemKey: 'c', title: 'c', url: 'c', order: 3 },
            { itemKey: 'd', title: 'd', url: 'd', order: 1 },
            { itemKey: 'e', title: 'e', url: 'e', order: 2 },
          ],
        },
        [KIND.subjects]: {
          items: [],
        },
      },
    }
    enzymeWrapper = setup(state)

    const sorted = state.favorites[KIND.databases].items.sort((a, b) => {
      if (a.order === b.order) {
        return 0
      } else {
        return a.order > b.order ? 1 : -1
      }
    })

    const container = enzymeWrapper.dive().dive().find('.linksgroup')
    sorted.forEach((item, index) => {
      expect(container.containsMatchingElement(
        <Link
          to={item.url}
          aria-label={item.title}
        >{item.title}</Link>
      )).toBe(index < MAX_PER_SECTION)
    })
  })

  it('should link to full favorites page', () => {
    enzymeWrapper = setup(MINIMAL_STATE)

    const favoritesPath = '/favorites'
    const have = <Link to={favoritesPath}>{expect.any(String)}</Link>
    expect(enzymeWrapper.dive().dive().containsMatchingElement(have)).toBe(true)
  })

  it('should have icon link to favorites page', () => {
    enzymeWrapper = setup(MINIMAL_STATE)

    const favoritesPath = '/favorites'
    const have = (
      <Link to={favoritesPath}>
        <img />
      </Link>
    )
    expect(enzymeWrapper.dive().dive().containsMatchingElement(have)).toBe(true)
  })
})
