import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Presenter from 'components/Account/Favorites/presenter'
import ManageFavorites from 'components/Account/Favorites/ManageFavorites'
import NoFavorites from 'components/Account/Favorites/NoFavorites'
import InlineLoading from 'components/Messages/InlineLoading'
import AccountPageWrapper from 'components/Account/AccountPageWrapper'

import { KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Account/Favorites/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with favorites data', () => {
    const props = {
      favoritesStatus: statuses.SUCCESS,
      dbFavorites: {
        state: statuses.SUCCESS,
        items: ['fake db 1', 'fake db 2'],
      },
      subjectFavorites: {
        state: statuses.SUCCESS,
        items: ['fake subject 1', 'fake subject 2', 'fake subject 3'],
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should not render loading', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(false)
    })

    it('should render a section for each type of favorite', () => {
      const numFavoriteTypes = Object.keys(KIND).length
      expect(enzymeWrapper.find(ManageFavorites)).toHaveLength(numFavoriteTypes)

      expect(enzymeWrapper.containsMatchingElement(
        <ManageFavorites kind={KIND.databases} items={props.dbFavorites.items} />
      )).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(
        <ManageFavorites kind={KIND.subjects} items={props.subjectFavorites.items} />
      )).toBe(true)
    })

    it('should not render NoFavorites component', () => {
      expect(enzymeWrapper.containsMatchingElement(<NoFavorites />)).toBe(false)
    })
  })

  describe('with partial error', () => {
    const props = {
      favoritesStatus: statuses.ERROR,
      dbFavorites: {
        state: statuses.SUCCESS,
        items: ['fake db 1', 'fake db 2'],
      },
      subjectFavorites: {
        state: statuses.ERROR,
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should not render loading', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(false)
    })

    it('should render a section for each type of favorite', () => {
      const numFavoriteTypes = Object.keys(KIND).length
      expect(enzymeWrapper.find(ManageFavorites)).toHaveLength(numFavoriteTypes)
    })
  })

  describe('with no favorites', () => {
    const props = {
      preview: true,
      favoritesStatus: statuses.SUCCESS,
      dbFavorites: {
        state: statuses.SUCCESS,
        items: [],
      },
      subjectFavorites: {
        state: statuses.SUCCESS,
        items: [],
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should render NoFavorites component', () => {
      expect(enzymeWrapper.containsMatchingElement(<NoFavorites preview={props.preview} />)).toBe(true)
    })

    it('should not render individual favorites sections', () => {
      expect(enzymeWrapper.containsMatchingElement(<ManageFavorites />)).toBe(false)
    })

    it('should not render loading', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(false)
    })
  })

  describe('while loading', () => {
    const props = {
      favoritesStatus: statuses.FETCHING,
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should not render favorites display components', () => {
      expect(enzymeWrapper.containsMatchingElement(<ManageFavorites />)).toBe(false)
      expect(enzymeWrapper.containsMatchingElement(<NoFavorites />)).toBe(false)
    })

    it('should render loading', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(true)
    })
  })
})