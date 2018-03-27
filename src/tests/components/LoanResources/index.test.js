import * as statuses from '../../../constants/APIStatuses'
import { mapStateToProps } from '../../../components/LoanResources'

describe('components/LoanResources/index.js', () => {
  describe('with data', () => {
    let state = {
      personal: {
        login: {
          state: statuses.SUCCESS,
        },
        alephHave: {
          state: statuses.SUCCESS,
          web: ['web'],
          checkedOut: ['alephCheckedOut'],
        },
        alephPending: {
          state: statuses.SUCCESS,
          pending: ['alephPending'],
        },
        illHave: {
          state: statuses.SUCCESS,
          checkedOut: ['illCheckedOut'],
        },
        illPending: {
          state: statuses.SUCCESS,
          pending: ['illPending'],
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
      expect(resources.have.exists).toBe(statuses.SUCCESS)
    })

    it('should contain pending state', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.pending).toBeTruthy()
      expect(resources.pending.exists).toBe(statuses.SUCCESS)
    })

    it('should contain checked out items', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.have).toBeTruthy()
      expect(resources.have.items).toEqual(['web', 'alephCheckedOut', 'illCheckedOut'])
    })

    it('should contain pending items', () => {
      let resources = mapStateToProps(state).resources
      expect(resources).toBeTruthy()
      expect(resources.pending).toBeTruthy()
      expect(resources.pending.items).toEqual(['alephPending', 'illPending'])
    })
  })
})
