import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Layout/Footer/FooterInfo/ChatModal/presenter'
import ChatInvitation from 'components/Chat/Invitation'

let enzymeWrapper
const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Layout/Footer/FooterInfo/ChatModal/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('chat closed', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        chatOpen: false,
        showInvite: false,
        onClick: jest.fn(),
        onKeyDown: jest.fn(),
        onInviteConfirm: jest.fn(),
        onInviteClose: jest.fn(),
      })
    })

    it('should render a button to open chat', () => {
      const btn = enzymeWrapper.find('.chat-button')
      expect(btn.exists()).toBe(true)
    })

    it('should not render chat modal', () => {
      const modal = enzymeWrapper.find('#chat-modal')
      if (modal.exists()) {
        expect(modal.hasClass('hidden')).toBe(true)
      } else {
        expect(enzymeWrapper.findWhere(el => el.hasClass('chat-open')).exists()).toBe(false)
      }
    })

    it('should render chat invite when showInvite toggled', () => {
      expect(enzymeWrapper.find(ChatInvitation).exists()).toBe(false)

      enzymeWrapper.setProps({
        showInvite: true,
      })

      expect(enzymeWrapper.find(ChatInvitation).exists()).toBe(true)
    })
  })

  describe('chat open', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        chatOpen: true,
        showInvite: false,
        onClick: jest.fn(),
        onKeyDown: jest.fn(),
        onInviteConfirm: jest.fn(),
        onInviteClose: jest.fn(),
      })
    })

    it('should render a button to hide chat', () => {
      const btn = enzymeWrapper.find('.chat-button')
      expect(btn.exists()).toBe(true)
      expect(btn.text().toLowerCase()).toEqual(expect.stringContaining('hide'))
    })

    it('should render chat modal', () => {
      const modal = enzymeWrapper.find('#chat-modal')
      expect(modal.exists()).toBe(true)
      expect(modal.hasClass('hidden')).toBe(false)
    })

    it('should render chat invite when showInvite toggled', () => {
      expect(enzymeWrapper.find(ChatInvitation).exists()).toBe(false)

      enzymeWrapper.setProps({
        showInvite: true,
      })

      expect(enzymeWrapper.find(ChatInvitation).exists()).toBe(true)
    })
  })
})
