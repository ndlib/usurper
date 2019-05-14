import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Search, { SearchContainer } from 'components/Account/Favorites/Search'
import SearchResult from 'components/Account/Favorites/Search/SearchResult'
import Link from 'components/Interactive/Link'
import InlineLoading from 'components/Messages/InlineLoading'

import { REQUEST_SEARCH_FAVORITES, RECEIVE_SEARCH_FAVORITES, KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let spy

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<Search store={store} {...ownProps} />)
}

const props = {
  kind: KIND.subjects,
  placeholder: 'Placeholder text in searchbox',
  buttonText: 'SEARCH ME PLZ!!!',
  existingFavorites: [
    { key: '1234', title: 'nothing', url: 'nowhere' },
  ],
  searchFavorites: jest.fn(),
  searchState: statuses.NOT_FETCHED,
  searchResults: [],
}

describe('components/Account/Favorites/Search', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('before searching', () => {
    const state = {
      favorites: {
        search: {
          [props.kind]: { state: statuses.NOT_FETCHED }
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state, props)
    })

    it('should display placeholder on search input', () => {
      const found = enzymeWrapper.dive().dive().find('#' + enzymeWrapper.dive().props().kind + '-search-field')
      expect(found.exists()).toBe(true)
      expect(found.props().placeholder).toEqual(enzymeWrapper.dive().props().placeholder)
    })

    it('should display buttonText on submit button', () => {
      const found = enzymeWrapper.dive().dive().find('[type="submit"]')
      expect(found).toHaveLength(1)
      expect(found.text()).toEqual(enzymeWrapper.dive().props().buttonText)
    })

    it('should not display loading indicator', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(false)
    })

    it('should initiate search upon submitting', () => {
      // First, set the text we are searching for because you can't search with an empty string
      const searchValue = 'sample text'
      const instance = enzymeWrapper.dive().dive().instance()
      instance.handleChange({ target: { value: searchValue } })
      instance.handleSubmit({ preventDefault: jest.fn() })

      expect(store.getActions()).toEqual([
        { type: REQUEST_SEARCH_FAVORITES, searchText: searchValue, kind: enzymeWrapper.dive().props().kind }
      ])
    })

    it('should clear search results upon submitting empty text', () => {
      const searchValue = ''
      const instance = enzymeWrapper.dive().dive().instance()
      instance.handleChange({ target: { value: '' } })
      instance.handleSubmit({ preventDefault: jest.fn() })

      expect(store.getActions()).toEqual([
        { type: RECEIVE_SEARCH_FAVORITES, searchText: searchValue, kind: enzymeWrapper.dive().props().kind, results: [], state: statuses.NOT_FETCHED }
      ])
    })

    it('should call submit function on form submit', () => {
      spy = jest.spyOn(SearchContainer.prototype, 'handleSubmit')

      const form = enzymeWrapper.dive().dive().find('form')
      expect(form.exists()).toBe(true)
      form.simulate('submit', { preventDefault: jest.fn() })

      expect(spy).toHaveBeenCalled()
    })

    it('should call change function upon searchbox changed', () => {
      spy = jest.spyOn(SearchContainer.prototype, 'handleChange')

      const inputElement = enzymeWrapper.dive().dive().find('#' + enzymeWrapper.dive().props().kind + '-search-field')
      expect(inputElement.exists()).toBe(true)
      inputElement.simulate('change', { target: { value: 'some value' } })

      expect(spy).toHaveBeenCalled()
    })

    it('should trigger searching timer (delayed) when searchbox changed', () => {
      enzymeWrapper = shallow(<SearchContainer {...props} />)

      const inputElement = enzymeWrapper.find('#' + props.kind + '-search-field')
      expect(inputElement.exists()).toBe(true)

      const instance = enzymeWrapper.instance()
      expect(instance.state.searchTimer).toBeFalsy()
      inputElement.simulate('change', { target: { value: 'waldo' } })

      expect(instance.state.searchTimer).toBeTruthy()
      inputElement.simulate('change', { target: { value: 'sammy' } })
      expect(instance.state.searchTimer).toBeTruthy()
      enzymeWrapper.unmount()
      expect(instance.state.searchTimer).toBeFalsy()
    })
  })

  describe('while searching', () => {
    const state = {
      favorites: {
        search: {
          [props.kind]: { state: statuses.FETCHING }
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(state, props)
    })

    it('should display loading indicator', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(true)
    })
  })

  describe('after searching', () => {
    describe('with results found', () => {
      const MAX_RESULT_COUNT = 10
      const state = {
        favorites: {
          search: {
            [props.kind]: {
              state: statuses.SUCCESS,
              results: [
                { key: '1', title: 'order me', url: 'meaningless' },
                { key: '2', title: 'a', url: 'www.fake.url' },
                { key: '3', title: 'b', url: 'www.fake.url' },
                { key: '4', title: 'c', url: 'www.fake.url' },
                { key: '1234', title: 'nothing', url: 'nowhere' },
                { key: '5', title: 'd', url: 'www.fake.url' },
                { key: '6', title: 'e', url: 'www.fake.url' },
                { key: '7', title: 'x', url: 'www.fake.url' },
                { key: '8', title: 'y', url: 'www.fake.url' },
                { key: '9', title: 'z', url: 'www.fake.url' },
                { key: '10', title: '1', url: 'www.fake.url' },
                { key: '11', title: '2', url: 'www.fake.url' },
              ],
            },
          },
        },
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should not get results for favorites already added (existingFavorites)', () => {
        props.existingFavorites.forEach((favorite) => {
          expect(enzymeWrapper.dive().props().searchResults.filter(r => r.key == favorite.key)).toHaveLength(0)
        })

        // Ensure that at least one of the items in the state was filtered out
        // Basically, just prevent a bogus test
        expect(enzymeWrapper.dive().props().searchResults.length).not.toBe(
          state.favorites.search[enzymeWrapper.dive().props().kind].results.length
        )
      })

      it('should limit number of search results displayed', () => {
        expect(enzymeWrapper.dive().dive().find(SearchResult)).toHaveLength(MAX_RESULT_COUNT)

        // If the number of results is equal to (or less than) the max displayed, the test is invalid
        expect(enzymeWrapper.dive().props().searchResults.length).toBeGreaterThan(MAX_RESULT_COUNT)
      })

      it('should not display loading indicator', () => {
        expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(false)
      })

      it('should show text indicating the correct number of results', () => {
        const resultCount = enzymeWrapper.dive().dive().find(SearchResult).length
        const expectedText = `Showing ${resultCount} of ${enzymeWrapper.dive().props().searchResults.length} results.`
        const container = enzymeWrapper.dive().dive().find('.search-results-text')
        expect(container.exists()).toBe(true)
        expect(container.text()).toEqual(expectedText)
      })

      it('should sort results by title', () => {
        const expectedData = enzymeWrapper.dive().props().searchResults
          .sort((a, b) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0))
          .slice(0, MAX_RESULT_COUNT)

        const container = enzymeWrapper.dive().dive().find('.search-results')
        expect(container.exists()).toBe(true)
        const results = container.find(SearchResult)
        for (let i = 0; i < expectedData.length; i++) {
          expect(results.at(i).matchesElement(
            <SearchResult
              kind={enzymeWrapper.dive().props().kind}
              id={expectedData[i].key}
              title={expectedData[i].title}
              url={expectedData[i].url}
            />
          )).toBe(true)
        }
      })
    })

    describe('with no results found', () => {
      const state = {
        favorites: {
          search: {
            [props.kind]: {
              state: statuses.SUCCESS,
              results: [],
            },
          },
        },
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should show appropriate text for no results', () => {
        const expectedText = 'No results found.'
        const container = enzymeWrapper.dive().dive().find('.search-results-text')
        expect(container.exists()).toBe(true)
        expect(container.text()).toEqual(expectedText)
      })

      it('should not render any SearchResult components', () => {
        expect(enzymeWrapper.dive().dive().find(SearchResult)).toHaveLength(0)
      })

      it('should not display loading indicator', () => {
        expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(false)
      })
    })
  })
})
