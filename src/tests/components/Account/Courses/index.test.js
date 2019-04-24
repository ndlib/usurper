import React from 'react'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as statuses from 'constants/APIStatuses'
import * as constants from 'actions/personal/constants'
import { mapStateToProps, mapDispatchToProps } from 'components/Account/Courses'
import CoursesPresenter from 'components/Account/Courses/presenter'
import CoursesComponent, { CoursesContainer } from 'components/Account/Courses'
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
            redirectUrl: '',
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
        const have = <CoursesPresenter preview={props.preview} courses={props.courses.courses} />
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
          },
          courses: {
            state: statuses.NOT_FETCHED,
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
            redirectUrl: '',
            token: 'fake token',
            state: statuses.SUCCESS,
          },
          loggedIn: true,
        })
        expect(store.getActions()).toContainEqual(expectedAction)
      })
    })

    describe('not logged in', () => {
      const realConsoleError = console.error

      beforeAll(() => {
        // Super hacky. Basically, this stops jsdom from complaining in the console when we mock window.location.
        console.error = jest.fn().mockImplementation((msg) => {
          if (msg.startsWith('Error: Not implemented: navigation')) {
            return
          }
          realConsoleError(msg)
        })
      })

      afterAll(() => {
        console.error = realConsoleError
      })

      beforeEach(() => {
        props = {
          linkOnly: false,
          preview: false,
          loggedIn: false,
          login: {
            redirectUrl: 'http://fake.redirect.url',
            state: statuses.SUCCESS,
          },
          courses: {
            state: statuses.NOT_FETCHED,
          },
          dispatch: jest.fn(),
        }
        enzymeWrapper = setup(props)
      })

      it('should redirect to login page', () => {
        // Mock the redirect function so we can spy on it
        window.location.replace = jest.fn()

        let instance = enzymeWrapper.instance()
        spy = jest.spyOn(instance, 'checkLoggedIn')
        instance.checkLoggedIn(instance.props)

        // Check that the redirect was called with the same url we passed in to the object
        expect(window.location.replace).toHaveBeenCalledWith(props.login.redirectUrl)
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
          redirectUrl: '',
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

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        linkOnly: false,
        preview: true,
        loggedIn: false,
        login: {
          state: statuses.FETCHING,
        },
        courses: {
          state: statuses.NOT_FETCHED,
        },
        dispatch: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('does not render Courses Presenter', () => {
      const have = <CoursesPresenter />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(false)
    })

    it('renders Loading component', () => {
      const have = <Loading />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })
})

describe('mapStateToProps', () => {
  describe('with correct data', () => {
    let state = {
      personal: {
        login: {
          state: statuses.SUCCESS,
          token: 'fake token',
        },
        courses: ['courses'],
      },
    }

    let ownProp = {
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

    it('should use preview content', () => {
      expect(mapStateToProps(state, ownProp).preview).toBe(true)
    })

    it('should have courses', () => {
      expect(mapStateToProps(state, ownProp).courses).toEqual(state.personal.courses)
    })
  })

  describe('with incorrect data', () => {
    let state = {
      personal: {
        login: {
          state: statuses.NOT_FOUND,
        },
      },
    }

    let ownProp = {
      dispatch: jest.fn(),
    }

    it('should not identify user as logged in', () => {
      expect(mapStateToProps(state, ownProp).loggedIn).toBe(false)
    })

    it('should not use preview content', () => {
      expect(mapStateToProps(state, ownProp).preview).toBe(false)
    })

    it('should not have courses', () => {
      expect(mapStateToProps(state, ownProp).courses.courses).toBeFalsy()
    })
  })
})
