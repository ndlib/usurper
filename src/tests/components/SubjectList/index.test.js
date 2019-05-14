import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SubjectList, { SubjectListContainer } from 'components/SubjectList'
import InternalLink from 'components/Contentful/InternalLink'
import Loading from 'components/Messages/Loading'

import { KIND as FAVORITES_KIND } from 'actions/personal/favorites'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props
let state
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<SubjectList store={store} {...props} />)
}

describe('components/SubjectList', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('after subjects loaded', () => {
    beforeEach(() => {
      props = {
        location: {},
      }
      state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
        },
        favorites: {
          [FAVORITES_KIND.subjects]: {
            state: statuses.NOT_FETCHED,
          },
        },
        cfSubjects: {
          status: statuses.SUCCESS,
          data: [
            { linkText: 'Link 3', sys: { id: 3 } },
            { linkText: 'Link 1', sys: { id: 1 } },
            { linkText: 'Link 1', sys: { id: 12 } },
            { linkText: 'Link 2', sys: { id: 2 } },
          ],
        },
      }

      enzymeWrapper = setup(state, props)
    })

    it('should render InternalLink for each subject', () => {
      state.cfSubjects.data.forEach((subject) => {
        expect(enzymeWrapper.dive().containsMatchingElement(<InternalLink cfEntry={subject} />))
      })
    })

    it('should sort subjects based on link text', () => {
      const expected = [
        state.cfSubjects.data[1].sys.id,
        state.cfSubjects.data[2].sys.id,
        state.cfSubjects.data[3].sys.id,
        state.cfSubjects.data[0].sys.id,
      ]
      expect(enzymeWrapper.dive().props().subjects.map(subject => subject.key)).toEqual(expected)
    })

    it('should not show loading', () => {
      expect(enzymeWrapper.dive().dive().find(Loading).exists()).toBe(false)
    })

    it('should fetch subjects if not fetched', () => {
      const mockFn = jest.fn()
      enzymeWrapper.dive().dive().setProps({
        subjectsStatus: statuses.NOT_FETCHED,
        fetchSubjects: mockFn,
      })
      expect(mockFn).toHaveBeenCalled()
    })
  })

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        location: {},
      }
      state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
        },
        favorites: {
          [FAVORITES_KIND.subjects]: {
            state: statuses.NOT_FETCHED,
          },
        },
        cfSubjects: {
          status: statuses.FETCHING,
        },
      }

      enzymeWrapper = setup(state, props)
    })

    it('should show loading', () => {
      expect(enzymeWrapper.dive().dive().find(Loading).exists()).toBe(true)
    })
  })
})
