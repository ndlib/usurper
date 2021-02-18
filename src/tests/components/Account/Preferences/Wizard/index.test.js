import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Wizard from 'components/Account/Preferences/Wizard'
import Presenter from 'components/Account/Preferences/Wizard/presenter'
import DatabaseStep from 'components/Account/Preferences/Wizard/DatabaseStep'
import SubjectStep from 'components/Account/Preferences/Wizard/SubjectStep'
import LibraryStep from 'components/Account/Preferences/Wizard/LibraryStep'
import InlineLoading from 'components/Messages/InlineLoading'

import { REQUEST_FAVORITES, REQUEST_UPDATE_FAVORITES, KIND as FAVORITES_KIND } from 'actions/personal/favorites'
import {
  REQUEST_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
  DEFAULT_LIBRARY,
  KIND as SETTINGS_KIND,
} from 'actions/personal/settings'
import { CF_REQUEST_BRANCHES } from 'actions/contentful/branches'
import { CF_REQUEST_DATABASE_DEFAULT_FAVORITES } from 'actions/contentful/database'
import { CF_REQUEST_SUBJECTS } from 'actions/contentful/subjects'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<Wizard store={store} {...ownProps} />)
}

const STEP_COUNT = 3
const ALL_STEPS = [FAVORITES_KIND.subjects, FAVORITES_KIND.databases, SETTINGS_KIND.homeLibrary]
const BASE_STATE = {
  favorites: {
    [FAVORITES_KIND.databases]: {
      state: statuses.NOT_FETCHED,
    },
    [FAVORITES_KIND.subjects]: {
      state: statuses.NOT_FETCHED,
    },
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
  cfDatabases: {
    defaultFavorites: { status: statuses.NOT_FETCHED },
  },
  personal: {
    login: { status: statuses.SUCCESS, token: 'fake token' }
  },
}

describe('components/Account/Preferences/Wizard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    store = undefined
  })

  describe('before loading', () => {
    beforeEach(() => {
      const props = {
        stepList: ALL_STEPS,
      }
      enzymeWrapper = setup(BASE_STATE, props)
      enzymeWrapper.dive().dive().instance()
    })

    it('should fetch data that has not been fetched yet', () => {
      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: CF_REQUEST_SUBJECTS, depth: expect.any(Number) },
        { type: CF_REQUEST_BRANCHES, depth: expect.any(Number) },
        { type: CF_REQUEST_DATABASE_DEFAULT_FAVORITES },
        { type: REQUEST_SETTINGS, kind: SETTINGS_KIND.homeLibrary, data: null },
        ...Object.values(FAVORITES_KIND).map((kind) => (
          { type: REQUEST_FAVORITES, kind: kind }
        ))
      ]))
    })

    it('should fetch subjects if data in store is not deep enough', () => {
      store.clearActions()

      const state = JSON.parse(JSON.stringify(BASE_STATE))
      Object.assign(state, {
        cfSubjects: {
          status: statuses.SUCCESS,
          data: [],
          depth: 0,
        },
      })
      const props = {
        stepList: ALL_STEPS,
      }
      enzymeWrapper = setup(state, props)
      enzymeWrapper.dive().dive().instance()

      expect(store.getActions()).toEqual(expect.arrayContaining([
        { type: CF_REQUEST_SUBJECTS, depth: expect.any(Number) },
      ]))
    })
  })

  describe('while loading', () => {
    beforeEach(() => {
      const state = JSON.parse(JSON.stringify(BASE_STATE))
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
        stepList: ALL_STEPS,
      }
      enzymeWrapper = setup(state, props)
    })

    it('should display loading indicator', () => {
      expect(enzymeWrapper.dive().dive().find(InlineLoading).exists()).toBe(true)
    })

    it('should not display normal step body', () => {
      expect(enzymeWrapper.dive().dive().find(SubjectStep).exists()).toBe(false)
      expect(enzymeWrapper.dive().dive().find(DatabaseStep).exists()).toBe(false)
      expect(enzymeWrapper.dive().dive().find(LibraryStep).exists()).toBe(false)
    })
  })

  describe('after data loaded', () => {
    const state = JSON.parse(JSON.stringify(BASE_STATE))
    Object.assign(state, {
      favorites: {
        [FAVORITES_KIND.databases]: {
          state: statuses.SUCCESS,
          items: [{
            itemKey: 'yo dawg',
            title: 'I heard you like memes',
            url: '/soiputamemeinyourcodesoyoucancodewhileyoumeme',
          }],
        },
        [FAVORITES_KIND.subjects]: {
          state: statuses.SUCCESS,
          items: [{
            itemKey: 'slugger',
            title: 'McSlug',
            url: '/slugger',
            order: 1,
          }],
        },
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
      cfDatabases: {
        defaultFavorites: {
          status: statuses.SUCCESS,
          data: [
            {
              title: 'default',
              url: 'somewhere.place',
            },
          ],
        },
      },
      cfSubjects: {
        status: statuses.SUCCESS,
        data: [
          {
            sys: {
              id: 'subme',
              contentType: { sys: { id: 'internalLink' }},
            },
            fields: {
              title: 'suuuuubject',
              usePageTitle: false,
              page: {
                fields: {
                  slug: 'slugger',
                  relatedResources: [
                    {
                      sys: { id: 'DONT_CHANGE_ME' },
                      fields: {
                        title: 'LEAVE_ME_BE',
                        url: '/srsly',
                        canFavorite: true,
                      },
                    },
                  ],
                  relatedExtraSections: [
                    {
                      sys: {
                        id: 'section',
                        contentType: { sys: { id: 'linkGroup' }},
                      },
                      fields: {
                        links: [
                          {
                            sys: {
                              id: 'LEAVE_ME_BE',
                              contentType: { sys: { id: 'resource' }},
                            },
                            fields: {
                              title: 'itza me, a resource in a section',
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
        depth: 999,
      },
    })

    it('should not dispatch fetch request for data', () => {
      const props = {
        stepList: ALL_STEPS,
      }
      enzymeWrapper = setup(state, props)
      expect(store.getActions()).toHaveLength(0)
    })

    it('should call close method when dismissed', () => {
      const props = {
        stepList: ALL_STEPS,
        closeCallback: jest.fn(),
      }
      enzymeWrapper = setup(state, props)

      const instance = enzymeWrapper.dive().dive().instance()
      instance.dismiss()
      expect(props.closeCallback).toHaveBeenCalled()
    })

    it('should flow through steps passing data correctly', () => {
      const props = {
        defaultStep: 0,
        stepList: ALL_STEPS,
      }
      enzymeWrapper = setup(state, props)

      const firstSubjectData = [state.cfSubjects.data[0]]
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

    it('should not pass data when skipping step', () => {
      const props = {
        defaultStep: 0,
        stepList: ALL_STEPS,
      }
      enzymeWrapper = setup(state, props)

      const instance = enzymeWrapper.dive().dive().instance()
      // First set up some data in the state temporarily
      instance.state.data = {
        ...instance.state.data,
        [props.stepList[props.defaultStep]]: [{ value: 'temp data' }],
      }
      expect(instance.state.data[props.stepList[props.defaultStep]]).toHaveLength(1)

      // Now skip the step and check that the state was updated with no data
      instance.nextStep()
      expect(instance.state.data[props.stepList[props.defaultStep]]).toHaveLength(0)
    })

    describe('step 1', () => {
      const props = {
        defaultStep: 0,
        stepList: ALL_STEPS,
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should display SubjectStep', () => {
        const found = enzymeWrapper.dive().dive().find(SubjectStep)
        expect(found.exists()).toBe(true)
        expect(found.props().step).toEqual(0)
        expect(found.props().stepCount).toEqual(STEP_COUNT)
        expect(found.props().data).toEqual(expect.arrayContaining([
          expect.objectContaining({
            sys: {
              id: 'subme',
              contentType: {
                sys: {
                  id: 'internalLink',
                },
              },
            },
          })
        ]))
      })
    })

    describe('step 2', () => {
      const props = {
        defaultStep: 1,
        stepList: ALL_STEPS,
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should display DatabaseStep', () => {
        const have = <DatabaseStep
          didSelectSubjects={false}
          step={1}
          stepCount={STEP_COUNT}
          data={store.getState().cfDatabases.data}
        />
        expect(enzymeWrapper.dive().dive().containsMatchingElement(have)).toBe(true)
      })
    })

    describe('step 3', () => {
      const props = {
        defaultStep: 2,
        stepList: ALL_STEPS,
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
        expect(enzymeWrapper.dive().dive().containsMatchingElement(have)).toBe(true)
      })
    })

    describe('unknown step', () => {
      const props = {
        defaultStep: 1354,
        stepList: ALL_STEPS,
      }

      beforeEach(() => {
        enzymeWrapper = setup(state, props)
      })

      it('should render empty presenter', () => {
        const found = enzymeWrapper.dive().dive().find(Presenter)
        expect(found.exists()).toBe(true)
        expect(found.props().children).toBeFalsy()
      })
    })
  })

  describe('while saving', () => {
    beforeEach(() => {
      const state = JSON.parse(JSON.stringify(BASE_STATE))
      Object.assign(state, {
        favorites: {
          [FAVORITES_KIND.databases]: {
            state: statuses.SUCCESS,
            items: [],
          },
          [FAVORITES_KIND.subjects]: {
            state: statuses.SUCCESS,
            items: [],
          },
          update: {
            [FAVORITES_KIND.databases]: {
              state: statuses.NOT_FETCHED,
            },
            [FAVORITES_KIND.subjects]: {
              state: statuses.FETCHING,
            },
          },
        },
        cfBranches: {
          status: statuses.SUCCESS,
          data: [],
          depth: 0,
        },
        cfSubjects: {
          status: statuses.SUCCESS,
          data: [],
          depth: 1,
        },
      })
      const props = {
        defaultStep: 0,
        stepList: ALL_STEPS,
        closeCallback: jest.fn(),
      }
      enzymeWrapper = setup(state, props)
    })

    it('should not allow closing the wizard', () => {
      const instance = enzymeWrapper.dive().dive().instance()
      instance.dismiss()
      expect(instance.props.closeCallback).not.toHaveBeenCalled()
    })

    it('should not allow moving to next step', () => {
      const instance = enzymeWrapper.dive().dive().instance()
      const beforeState = JSON.parse(JSON.stringify(instance.state))
      instance.nextStep()
      expect(instance.state).toEqual(beforeState)
    })

    it('should dismiss wizard once save completed', () => {
      const instance = enzymeWrapper.dive().dive().instance()
      instance.dismiss = jest.fn()

      enzymeWrapper.dive().dive().setProps({
        updateStatus: statuses.SUCCESS,
      })

      expect(enzymeWrapper.dive().props().closeCallback).toHaveBeenCalled()
    })
  })
})
