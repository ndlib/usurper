import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import { mapStateToProps } from '../../../components/Courses'
import CoursesPresenter from '../../../components/Courses/presenter'
import { mount, shallow } from 'enzyme'
import { CoursesContainer } from '../../../components/Courses'
import Link from '../../../components/Link'
import Loading from '../../../components/Messages/Loading'

const setup = (props) => {
  return shallow(<CoursesContainer {...props} />, { lifecycleExperimental: true })
}

let enzymeWrapper
let props
describe('components/Courses/index.js -- CoursesContainer', () => {
  describe('Courses Container - not link only', () => {
    beforeEach(() => {
      props = {
        linkOnly: false,
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
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('renders Courses Presenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<CoursesPresenter {...props} />))
        .toBe(true)
    })
  })

  describe('Courses Container - not link only', () => {
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
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('does not render Courses Presenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<CoursesPresenter {...props} />))
        .toBe(false)
    })

    it('only renders a link', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<Link to='/courses' className='button fright tab'>My Courses</Link>))
        .toBe(true)
    })
  })

  describe('Courses Container - Loading', () => {
    beforeEach(() => {
      props = {
        linkOnly: false,
        preview: true,
        loggedIn: false,
        login: {
          redirectUrl: '',
          token: 'fake token',
          state: statuses.SUCCESS,
        },
        courses: {
          state: statuses.NOT_FETCHED,
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('does not render Courses Presenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<CoursesPresenter {...props} />))
        .toBe(false)
    })

    it('renders Loading html', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<Loading />))
        .toBe(true)
    })
  })
})

describe('components/Courses/index.js -- mapStateToProps', () => {
  describe('with correct data', () => {
    let state = {
      personal: {
        login: {
          state: statuses.SUCCESS,
        },
        courses: ['courses']
      },
    }

    let ownProp = {
      location: {
        search: {
          preview: 'true'
        },
      },
    }

    it('should identify if the user is logged in', () => {
      expect(mapStateToProps(state, ownProp).loggedIn).toBe(true)
    })

    it('should be previewable', () => {
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

    let ownProp = {}

    it('should identify if the user is logged in', () => {
      expect(mapStateToProps(state, ownProp).loggedIn).toBe(false)
    })

    it('should not be previewable', () => {
      expect(mapStateToProps(state, ownProp).preview).toBe(false)
    })

    it('should not have courses', () => {
      expect(mapStateToProps(state, ownProp).courses).toEqual({state: statuses.NOT_FETCHED})
    })
  })
})
