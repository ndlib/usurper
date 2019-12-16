import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as statuses from 'constants/APIStatuses'
import * as constants from 'actions/personal/constants'
import CoursesComponent, { CoursesContainer, mapStateToProps, mapDispatchToProps } from 'components/Account/Courses'
import CoursesPresenter from 'components/Account/Courses/presenter'
import Link from 'components/Interactive/Link'
import Loading from 'components/Messages/Loading'

let enzymeWrapper
let props
let spy
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (props, state) => {
  // Component with a store can be harder to test... Only use it when necessary
  if (state) {
    store = mockStore(state)
    props = { ...props, ...mapStateToProps(state, props), ...mapDispatchToProps(store.dispatch) }
  }

  return shallow(<CoursesContainer store={store} {...props} />)
}

describe('components/Account/Courses', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  describe('not link only', () => {
    describe('while logged in - with courses', () => {
      beforeEach(() => {
        props = {
          linkOnly: false,
          preview: true,
          loggedIn: true,
          login: {
            token: 'fake token',
            state: statuses.SUCCESS,
          },
          courses: {
            state: statuses.SUCCESS,
            courseData: {'key 1': {}, 'key 2': {}},
          },
          dispatch: jest.fn(),
        }
        enzymeWrapper = setup(props)
      })

      it('renders Courses Presenter', () => {
        const have = <CoursesPresenter courses={props.courses.courseData} />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })

      it('does not render Loading component', () => {
        const have = <Loading />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(false)
      })
    })

    describe('before courses fetched', () => {
      beforeEach(() => {
        const ownProps = {
          linkOnly: false,
          preview: true,
        }
        const state = {
          personal: {
            login: {
              state: statuses.FETCHING,
            },
            courses: {
              state: statuses.NOT_FETCHED,
            },
          },
        }
        enzymeWrapper = setup(ownProps, state)
      })

      it('should fetch courses after logged in', () => {
        const expectedAction = {
          type: constants.REQUEST_PERSONAL,
          requestType: 'courses',
        }
        expect(store.getActions()).not.toContainEqual(expectedAction)
        enzymeWrapper.setProps({
          login: {
            token: 'fake token',
            state: statuses.SUCCESS,
          },
          loggedIn: true,
        })
        expect(store.getActions()).toContainEqual(expectedAction)
      })
    })
  })

  describe('is link only', () => {
    beforeEach(() => {
      props = {
        linkOnly: true,
        preview: true,
        loggedIn: false,
        login: {
          token: 'fake token',
          state: statuses.SUCCESS,
        },
        courses: {
          state: statuses.SUCCESS,
        },
        dispatch: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('does not render Courses Presenter', () => {
      const have = <CoursesPresenter />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(false)
    })

    it('renders a Link to courses page', () => {
      const have = <Link to='/courses'>{expect.any(String)}</Link>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  describe('mapStateToProps', () => {
    describe('with correct data', () => {
      const state = {
        personal: {
          login: {
            state: statuses.SUCCESS,
            token: 'fake token',
          },
          courses: ['courses'],
        },
      }

      const ownProp = {
        location: {
          search: {
            preview: 'true',
          },
        },
        dispatch: jest.fn(),
      }

      it('should identify user as logged in', () => {
        expect(mapStateToProps(state, ownProp).loggedIn).toBe(true)
      })

      it('should have courses', () => {
        expect(mapStateToProps(state, ownProp).courses).toEqual(state.personal.courses)
      })
    })

    describe('with incorrect data', () => {
      const state = {
        personal: {
          login: {
            state: statuses.NOT_FOUND,
          },
          courses: {
            state: statuses.NOT_FOUND,
          },
        },
      }

      const ownProp = {
        dispatch: jest.fn(),
      }

      it('should not identify user as logged in', () => {
        expect(mapStateToProps(state, ownProp).loggedIn).toBe(false)
      })

      it('should not have courses', () => {
        expect(mapStateToProps(state, ownProp).courses.courseData).toBeFalsy()
      })
    })
  })
})
