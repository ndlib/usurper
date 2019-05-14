import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Wizard from 'components/Account/Favorites/Wizard'
import DatabaseStep from 'components/Account/Favorites/Wizard/DatabaseStep'
import SubjectStep from 'components/Account/Favorites/Wizard/SubjectStep'
import LibraryStep from 'components/Account/Favorites/Wizard/LibraryStep'
import InlineLoading from 'components/Messages/InlineLoading'

import { REQUEST_UPDATE_FAVORITES, KIND as FAVORITES_KIND } from 'actions/personal/favorites'
import {
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  DEFAULT_LIBRARY,
  KIND as SETTINGS_KIND,
} from 'actions/personal/settings'
import { CF_REQUEST_BRANCHES } from 'actions/contentful/branches'
import { CF_REQUEST_SUBJECTS } from 'actions/contentful/subjects'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return mount(
    <Provider store={store}>
      <Wizard {...ownProps} />
    </Provider>
  )
}

const STEP_COUNT = 3

const BASE_STATE = {
  favorites: {
    update: {
      [FAVORITES_KIND.databases]: {
        state: statuses.NOT_FETCHED,
      },
      [FAVORITES_KIND.subjects]: {
        state: statuses.NOT_FETCHED,
      },
    },
  },
  settings: {
    [SETTINGS_KIND.homeLibrary]: {
      state: statuses.NOT_FETCHED,
    },
    update: {
      [SETTINGS_KIND.homeLibrary]: {
        state: statuses.NOT_FETCHED,
      },
    },
  },
  cfSubjects: { status: statuses.NOT_FETCHED },
  cfBranches: { status: statuses.NOT_FETCHED },
  personal: {
    login: { status: statuses.SUCCESS, token: 'fake token' }
  },
}

describe('components/Account/Favorites/Wizard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
  })

  describe('before loading', () => {
    beforeEach(() => {
      const state = Object.assign({}, BASE_STATE)
      enzymeWrapper = setup(state)
    })

    it('should fetch data that has not been fetched yet', () => {
      const state = Object.assign({}, BASE_STATE)
      enzymeWrapper = setup(state)

      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: CF_REQUEST_SUBJECTS, depth: expect.any(Number) },
        { type: CF_REQUEST_BRANCHES, depth: expect.any(Number) },
        { type: REQUEST_SETTINGS, kind: SETTINGS_KIND.homeLibrary, data: null },
      ]))
    })

    it('should fetch subjects if data in store is not deep enough', () => {
      const state = Object.assign({}, BASE_STATE)
      Object.assign(state, {
        cfSubjects: {
          status: statuses.SUCCESS,
          data: [],
          depth: 0,
        },
      })
      enzymeWrapper = setup(state)

      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: CF_REQUEST_SUBJECTS, depth: expect.any(Number) },
      ]))
    })
  })

  describe('while loading', () => {
    beforeEach(() => {
      const state = Object.assign({}, BASE_STATE)
      Object.assign(state, {
        cfBranches: {
          status: statuses.FETCHING,
          data: [],
          depth: 0,
        },
        cfSubjects: {
          status: statuses.FETCHING,
          data: [],
          depth: 1,
        },
      })
      const props = {
        defaultStep: 0,
      }
      enzymeWrapper = setup(state, props)
    })

    it('should display loading indicator', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
    })

    it('should not display normal step body', () => {
      expect(enzymeWrapper.find(SubjectStep).exists()).toBe(false)
      expect(enzymeWrapper.find(DatabaseStep).exists()).toBe(false)
      expect(enzymeWrapper.find(LibraryStep).exists()).toBe(false)
    })
  })

  describe('after data loaded', () => {
    const state = Object.assign({}, BASE_STATE)
    Object.assign(state, {
      settings: {
        [SETTINGS_KIND.homeLibrary]: {
          state: statuses.SUCCESS,
          data: 'someLibrarySlug',
        },
        update: {
          [SETTINGS_KIND.homeLibrary]: {
            state: statuses.NOT_FETCHED,
          },
        },
      },
      cfBranches: {
        status: statuses.SUCCESS,
        data: [],
        depth: 999,
      },
      cfSubjects: {
        status: statuses.SUCCESS,
        data: [],
        depth: 999,
      },
    })

    it('should not dispatch fetch request for data', () => {
      enzymeWrapper = setup(state)
      expect(store.getActions()).toHaveLength(0)
    })

    it('should flow through steps passing data correctly', () => {
      const props = {
        defaultStep: 0,
      }
      store = mockStore(state)
      // Shallow mount because for some reason I couldn't call nextStep on the fully rendered instance
      enzymeWrapper = shallow(<Wizard store={store} {...props} />)

      const firstSubjectData = ['subject data']
      const secondSubjectData = ['redo', 'subjects']
      const firstDatabaseData = ['database data']
      const secondDatabaseData = ['data', 'base', 'data']
      const homeLibraryData = 'homeLibrarySlug'

      const instance = enzymeWrapper.dive().dive().instance()
      expect(instance.state.step).toEqual(0)
      instance.nextStep(firstSubjectData)
      expect(instance.state.step).toEqual(1)
      instance.nextStep(firstDatabaseData)
      expect(instance.state.step).toEqual(2)

      // Make sure when going backwards the previously saved data is retrieved
      instance.prevStep()
      expect(instance.state.step).toEqual(1)
      expect(instance.state.data[FAVORITES_KIND.databases]).toEqual(firstDatabaseData)
      instance.prevStep()
      expect(instance.state.step).toEqual(0)
      expect(instance.state.data[FAVORITES_KIND.subjects]).toEqual(firstSubjectData)

      instance.nextStep(secondSubjectData)
      expect(instance.state.step).toEqual(1)
      instance.nextStep(secondDatabaseData)
      expect(instance.state.step).toEqual(2)
      instance.nextStep(homeLibraryData)
      expect(instance.state.data[FAVORITES_KIND.subjects]).toEqual(secondSubjectData)
      expect(instance.state.data[FAVORITES_KIND.databases]).toEqual(secondDatabaseData)
      expect(instance.state.data[SETTINGS_KIND.homeLibrary]).toEqual(homeLibraryData)

      // Make sure everything was saved after final step
      expect(store.getActions()).toEqual([
        { kind: FAVORITES_KIND.subjects, type: REQUEST_UPDATE_FAVORITES, },
        { kind: FAVORITES_KIND.databases, type: REQUEST_UPDATE_FAVORITES, },
        { kind: SETTINGS_KIND.homeLibrary, type: REQUEST_UPDATE_SETTINGS, },
      ])
    })

    describe('step 1', () => {
      const props = {
        defaultStep: 0,
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should display SubjectStep', () => {
        const have = <SubjectStep
          step={0}
          stepCount={STEP_COUNT}
          data={store.getState().cfSubjects.data}
        />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })

      it('should show correct human-readable step number', () => {
        const container = enzymeWrapper.find('.wizard-step-count-top')
        expect(container.exists()).toBe(true)
        expect(container.text()).toEqual((props.defaultStep + 1) + '/' + STEP_COUNT)
      })
    })

    describe('step 2', () => {
      const props = {
        defaultStep: 1,
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should display DatabaseStep', () => {
        const have = <DatabaseStep
          step={1}
          stepCount={STEP_COUNT}
          data={[]}
        />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })

      it('should show correct human-readable step number', () => {
        const container = enzymeWrapper.find('.wizard-step-count-top')
        expect(container.exists()).toBe(true)
        expect(container.text()).toEqual((props.defaultStep + 1) + '/' + STEP_COUNT)
      })
    })

    describe('step 3', () => {
      const props = {
        defaultStep: 2,
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should display LibraryStep', () => {
        const have = <LibraryStep
          step={2}
          stepCount={STEP_COUNT}
          defaultValue={store.getState().settings[SETTINGS_KIND.homeLibrary].data}
          data={store.getState().cfBranches.data} />
      })

      it('should show correct human-readable step number', () => {
        const container = enzymeWrapper.find('.wizard-step-count-top')
        expect(container.exists()).toBe(true)
        expect(container.text()).toEqual((props.defaultStep + 1) + '/' + STEP_COUNT)
      })
    })
  })
})
