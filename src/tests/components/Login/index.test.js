import * as statuses from '../../../constants/APIStatuses'
import { mapStateToProps } from '../../../components/Login'

describe('components/Login/index.js', () => {
  describe('when logged in', () => {
    let state = {
      personal: {
        login: {
          state: statuses.SUCCESS,
          buttonUrl: 'button',
          logoutUrl: 'logout',
          token: true,
        },
      },
    }

    it('should identify if the user is logged in', () => {
      expect(mapStateToProps(state).loggedIn).toBe(true)
    })

    it('should label as "my account"', () => {
      expect(mapStateToProps(state).label).toBe('My Account')
    })

    it('should contain the given button url', () => {
      expect(mapStateToProps(state).buttonUrl).toBe('button')
    })

    it('should contain a logout url', () => {
      expect(mapStateToProps(state).logoutUrl).toBe('logout')
    })
  })

  describe('when logged out', () => {
    let state = {
      personal: {
        login: {
          state: statuses.FETCHING,
          buttonUrl: 'button',
        },
      },
    }

    it('should identify if the user is logged in', () => {
      expect(mapStateToProps(state).loggedIn).toBe(false)
    })

    it('should label as "log in"', () => {
      expect(mapStateToProps(state).label).toBe('Log In')
    })

    it('should contain the given button url', () => {
      expect(mapStateToProps(state).buttonUrl).toBe('button')
    })

    it('should contain no logout url', () => {
      expect(mapStateToProps(state).logoutUrl).toBeUndefined()
    })
  })
})
