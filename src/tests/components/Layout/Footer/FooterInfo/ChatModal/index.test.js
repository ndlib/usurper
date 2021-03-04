import React from 'react'
import { shallow } from 'enzyme'
import ChatModal, { mapStateToProps, mapDispatchToProps } from 'components/Layout/Footer/FooterInfo/ChatModal'
import Presenter from 'components/Layout/Footer/FooterInfo/ChatModal/presenter'
import { KIND as SETTINGS_KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ChatModal.WrappedComponent {...props} />)
}

describe('components/Layout/Footer/FooterInfo/ChatModal', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    window.localStorage.clear()
  })

  describe('normal page', () => {
    beforeEach(() => {
      props = {
        location: {
          pathname: '/anywhere',
        },
        chatOpen: false,
        openChat: jest.fn(),
        closeChat: jest.fn(),
        onClick: jest.fn(),
        getChatOptOut: jest.fn(),
        isLoggedIn: true,
        chatOptOut: false,
        chatOptOutFetchStatus: statuses.NOT_FETCHED,
        isChatPage: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should render presenter with valid props', () => {
      const presenter = enzymeWrapper.find(Presenter)
      expect(presenter.exists()).toBe(true)
      expect(presenter.prop('chatOpen')).toEqual(props.chatOpen)
      expect(presenter.prop('openChat')).toEqual(props.openChat)
      expect(presenter.prop('closeChat')).toEqual(props.closeChat)
    })

    describe('proactive chat', () => {
      it('should show proactive chat invite after timer elapsed', () => {
        expect(enzymeWrapper.prop('showInvite')).toEqual(false)
        jest.runAllTimers()
        expect(enzymeWrapper.prop('showInvite')).toEqual(true)
      })

      it('should not show proactive chat invite if user previously dismissed it', () => {
        window.localStorage.setItem('proactiveChatDismiss', new Date())
        jest.runAllTimers()
        expect(enzymeWrapper.prop('showInvite')).toEqual(false)
      })

      it('should not show proactive chat invite if user opted out in preferences', () => {
        enzymeWrapper.setProps({
          chatOptOut: true,
          chatOptOutFetchStatus: statuses.SUCCESS,
        })
        jest.runAllTimers()
        expect(enzymeWrapper.prop('showInvite')).toEqual(false)
      })

      it('should close proactive chat when onInviteClose called', () => {
        jest.runAllTimers()
        expect(enzymeWrapper.prop('showInvite')).toEqual(true)

        enzymeWrapper.props().onInviteClose()
        expect(enzymeWrapper.prop('showInvite')).toEqual(false)
      })

      it('should close invite when opening chat', () => {
        jest.runAllTimers()
        expect(enzymeWrapper.prop('showInvite')).toEqual(true)

        enzymeWrapper.props().onClick({})
        expect(enzymeWrapper.prop('showInvite')).toEqual(false)
        expect(props.onClick).toHaveBeenCalled
      })

      it('should open chat modal and close invite when accepting proactive chat invite', () => {
        jest.runAllTimers()
        expect(enzymeWrapper.prop('showInvite')).toEqual(true)
        expect(enzymeWrapper.prop('chatOpen')).toEqual(false)

        enzymeWrapper.props().onInviteConfirm()
        expect(enzymeWrapper.prop('showInvite')).toEqual(false)
        expect(enzymeWrapper.prop('openChat')).toHaveBeenCalled()
      })
    })
  })

  describe('on /chat page', () => {
    beforeEach(() => {
      props = {
        location: {
          pathname: '/chat',
        },
        chatOpen: false,
        openChat: jest.fn(),
        closeChat: jest.fn(),
        getChatOptOut: jest.fn(),
        isLoggedIn: true,
        isChatPage: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })

    it('should not trigger proactive chat invites', () => {
      jest.runAllTimers()
      expect(enzymeWrapper.state().showInvite).toEqual(false)
    })
  })

  describe('mapStateToProps', () => {
    const state = {
      chat: {
        chatOpen: false,
      },
      personal: {
        login: {
          token: 'fake token',
        },
      },
      settings: {
        [SETTINGS_KIND.chatOptOut]: {
          state: statuses.SUCCESS,
          data: true,
        },
      },
    }

    it('should map props as expected', () => {
      props = {
        location: {
          pathname: '/CHaT', // test case insensitive
        },
      }
      const result = mapStateToProps(state, props)
      expect(result).toMatchObject({
        chatOpen: false,
        onKeyDown: expect.any(Function),
        isLoggedIn: true,
        chatOptOut: true,
        chatOptOutFetchStatus: statuses.SUCCESS,
        isChatPage: true,
      })
    })

    it('should open chat page instead of modal when opened from keyboard', () => {
      props = {
        location: {
          pathname: '/anywhere',
        },
        history: {
          push: jest.fn(),
        },
      }
      const result = mapStateToProps(state, props)
      result.onKeyDown({
        preventDefault: jest.fn(),
        keyCode: 13, // enter
      })

      expect(props.history.push).toHaveBeenCalledWith('/chat')
    })
  })

  describe('mapDispatchToProps', () => {
    let dispatch
    beforeEach(() => {
      dispatch = jest.fn()
      window.innerWidth = 1024
    })

    it('should create functions for opening and closing chat', () => {
      const result = mapDispatchToProps(dispatch, props)
      expect(result).toMatchObject({
        openChat: expect.any(Function),
        closeChat: expect.any(Function),
        getChatOptOut: expect.any(Function),
      })
    })

    it('should dispatch function when calling openChat', () => {
      props = {
        location: {
          pathname: '/anywhere',
        },
        history: {
          push: jest.fn(),
        }
      }
      const result = mapDispatchToProps(dispatch, props)
      const e = {
        preventDefault: jest.fn(),
      }
      result.openChat(e)
      expect(props.history.push).not.toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalled()
    })

    it('should go to /chat page when opening on small screen', () => {
      props = {
        location: {
          pathname: '/anywhere',
        },
        history: {
          push: jest.fn(),
        }
      }
      const result = mapDispatchToProps(dispatch, props)
      const e = {
        preventDefault: jest.fn(),
      }
      window.innerWidth = 0
      result.openChat(e)
      expect(props.history.push).toHaveBeenCalledWith('/chat')
    })

    describe('on /chat page', () => {
      it('should not do anything when calling openChat', () => {
        props = {
          location: {
            pathname: '/chat',
          },
          history: {
            push: jest.fn(),
          }
        }
        const result = mapDispatchToProps(dispatch, props)
        const e = {
          preventDefault: jest.fn(),
        }
        result.openChat(e)
        expect(props.history.push).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })

      it('should not do anything when calling closeChat', () => {
        props = {
          location: {
            pathname: '/chat',
          },
          history: {
            push: jest.fn(),
          }
        }
        const result = mapDispatchToProps(dispatch, props)
        const e = {
          preventDefault: jest.fn(),
        }
        result.closeChat(e)
        expect(props.history.push).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })
})
