import * as statuses from '../../../constants/APIStatuses'
import { mapStateToProps } from '../../../components/Courses'

describe('components/Courses/index.js', () => {
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
