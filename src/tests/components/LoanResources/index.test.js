import * as statuses from '../../../constants/APIStatuses'
import { mapStateToProps } from '../../../components/LoanResources'

describe('components/LoanResources/index.js', () => {
  describe('with data', () => {
    let state = {
      personal: {
        login: {
          state: statuses.SUCCESS,
        },
        resources_have: {
          state: statuses.SUCCESS,
          web: ['web'],
          checkedOut: ['checkedOut'],
        },
        resources_pending: {
          state: statuses.SUCCESS,
          pending: ['pending'],
        },
      },
    }

    it('should identify if the user is logged in', () => {
      expect(mapStateToProps(state).loggedIn).toBe(true)
    })

    it('should contain checked out state', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.have).toBeTruthy()
      expect(resources.have.state).toBe(statuses.SUCCESS)
    })

    it('should contain pending state', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.pending).toBeTruthy()
      expect(resources.pending.state).toBe(statuses.SUCCESS)
    })

    it('should contain checked out items', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.have).toBeTruthy()
      expect(resources.have.items).toEqual(['web', 'checkedOut'])
    })

    it('should contain pending items', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.pending).toBeTruthy()
      expect(resources.pending.items).toEqual(['pending'])
    })
  })
})
