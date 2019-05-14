import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Settings, { mapStateToProps } from 'components/Account/Settings'
import Presenter from 'components/Account/Settings/presenter.js'
import { KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const loggedInState = {
  cfBranches: {
    status: statuses.SUCCESS,
    depth: 0,
    data: [
      {
        fields: {
          title: 'fake branch 1',
        },
        sys: {
          id: 1,
        },
      },
      {
        fields: {
          title: 'fake branch 2',
          alternateTitle: 'show me',
        },
        sys: {
          id: 2,
        },
      },
    ],
  },
  personal: {
    login: {
      state: statuses.SUCCESS,
      token: 'anything',
    },
  },
  settings: {
    [KIND.hideHomeFavorites]: {
      state: statuses.NOT_FETCHED,
    },
    [KIND.defaultSearch]: {
      state: statuses.NOT_FETCHED,
    },
    update: {
      [KIND.homeLibrary]: statuses.NOT_FETCHED,
    },
  },
}

const setup = (state) => {
  let ownProps = {
    homeLibraries: [],
  }
  let props = { ...ownProps, ...mapStateToProps(state, ownProps) }
  let store = mockStore(state)
  return shallow(<Settings {...props} store={store} />)
}

let enzymeWrapper

describe('components/Account/Settings/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with full settings', () => {
    beforeEach(() => {
      const loggedInWithSettings = {
        ...loggedInState,
        settings: {
          [KIND.homeLibrary]: {
            state: statuses.SUCCESS,
            data: 'someLibrary',
          },
          [KIND.circStatus]: {
            state: statuses.SUCCESS,
            data: 'true',
          },
          [KIND.hideHomeFavorites]: {
            state: statuses.SUCCESS,
            data: 'true',
          },
          [KIND.defaultSearch]: {
            state: statuses.SUCCESS,
            data: 'searchType',
          },
          update: {
            [KIND.homeLibrary]: statuses.NOT_FETCHED,
          },
        },
      }
      enzymeWrapper = setup(loggedInWithSettings)
    })

    it('should render a Presenter', () => {
      expect(enzymeWrapper.dive().dive().find(Presenter).exists()).toBe(true)
    })

    it('should get settings props from store', () => {
      expect(enzymeWrapper.dive().props().loggedIn).toBe(true)
      for(const key in KIND) {
        expect(key).not.toBe(undefined)
      }
      expect(enzymeWrapper.dive().props().libraryStatus).toBe(statuses.SUCCESS)
      expect(enzymeWrapper.dive().props().cfBranches).toBe(loggedInState.cfBranches)
      expect(enzymeWrapper.dive().props().hideFavorites).toBe(true)
    })
  })
})
