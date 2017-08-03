import * as statuses from '../../../constants/APIStatuses'
import { mapStateToProps } from '../../../components/Courses'

describe('components/Courses/index.js', () => {
  describe('with data', () => {
    let state = {
      personal: {
        login: {
          state: statuses.SUCCESS,
        },
      },
      courses: ['courses']
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
      expect(mapStateToProps(state, ownProp).courses).toEqual(['courses'])
    })
  }
}
