import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Presenter from 'components/Account/Preferences/presenter'
import ManageFavorites from 'components/Account/Preferences/ManageFavorites'
import NoFavorites from 'components/Account/Preferences/NoFavorites'
import HomePageDisplay from 'components/Account/Preferences/HomePageDisplay'
import PickUp from 'components/Account/Preferences/PickUp'
import InlineLoading from 'components/Messages/InlineLoading'
import AccountPageWrapper from 'components/Account/AccountPageWrapper'
import SideNav from 'components/Layout/Navigation/SideNav'

import { KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Account/Preferences/presenter.js', () => {
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
      homeLibraries: ['foo', 'bar', 'baz'],
      setHomeLibrary: jest.fn(),
      selectedLocation: 'bar',
      libraryStatus: statuses.SUCCESS,
      cfBranches: {
        status: statuses.SUCCESS,
      },
      hideFavorites: true,
      homePageDisplayLoading: false,
      defaultSearch: 'fake',
      clearAll: jest.fn(),
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should include SideNav component in sidebar', () => {
      const pageWrapper = enzymeWrapper.find(AccountPageWrapper)
      expect(pageWrapper.props().customSidebar.type).toEqual(SideNav)
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

    it('should render clear all preferences button', () => {
      const find = <button>Clear All Preferences</button>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should show confirmation before clearing favorites', () => {
      window.confirm = jest.fn().mockImplementation(() => true)

      const btn = enzymeWrapper.findWhere(el => el.type() === 'button' && el.text() === 'Clear All Preferences')
      expect(btn.exists()).toBe(true)

      btn.simulate('click')
      expect(window.confirm).toHaveBeenCalled()
      expect(props.clearAll).toHaveBeenCalled()
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
      homeLibraries: ['foo', 'bar', 'baz'],
      setHomeLibrary: jest.fn(),
      selectedLocation: 'bar',
      libraryStatus: statuses.SUCCESS,
      cfBranches: {
        status: statuses.SUCCESS,
      },
      hideFavorites: true,
      homePageDisplayLoading: false,
      defaultSearch: 'fake',
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should include SideNav component in sidebar', () => {
      const pageWrapper = enzymeWrapper.find(AccountPageWrapper)
      expect(pageWrapper.props().customSidebar.type).toEqual(SideNav)
    })

    it('should not render loading', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(false)
    })

    it('should render a section for each type of favorite', () => {
      const numFavoriteTypes = Object.keys(KIND).length
      expect(enzymeWrapper.find(ManageFavorites)).toHaveLength(numFavoriteTypes)
    })

    it('should render a section for each setting', () => {
      expect(enzymeWrapper.containsMatchingElement(<PickUp />)).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(<HomePageDisplay />)).toBe(true)
    })

    it('should render clear all preferences button', () => {
      const find = <button>Clear All Preferences</button>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
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
      homeLibraries: ['foo', 'bar', 'baz'],
      setHomeLibrary: jest.fn(),
      selectedLocation: 'bar',
      libraryStatus: statuses.SUCCESS,
      cfBranches: {
        status: statuses.SUCCESS,
      },
      hideFavorites: true,
      homePageDisplayLoading: false,
      defaultSearch: 'fake',
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should include SideNav component in sidebar', () => {
      const pageWrapper = enzymeWrapper.find(AccountPageWrapper)
      expect(pageWrapper.props().customSidebar.type).toEqual(SideNav)
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

    it('should render a section for each setting', () => {
      expect(enzymeWrapper.containsMatchingElement(<PickUp />)).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(<HomePageDisplay />)).toBe(true)
    })

    it('should render clear all preferences button', () => {
      const find = <button>Clear All Preferences</button>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })

  describe('while loading', () => {
    const props = {
      favoritesStatus: statuses.FETCHING,
      libraryStatus: statuses.FETCHING,
      cfBranches: {
        status: statuses.FETCHING,
      },
      hideFavorites: false,
      homePageDisplayLoading: true,
      defaultSearch: 'fake',
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
      expect(enzymeWrapper.containsMatchingElement(<PickUp />)).toBe(false)
      expect(enzymeWrapper.containsMatchingElement(<HomePageDisplay />)).toBe(false)
    })

    it('should render loading', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(true)
    })

    it('should not render clear all preferences button', () => {
      const find = <button>Clear All Preferences</button>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
    })
  })
})
