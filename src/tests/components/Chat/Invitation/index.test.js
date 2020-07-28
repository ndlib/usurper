import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'
import ChatInvitation from 'components/Chat/Invitation'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ChatInvitation {...props} />)
}

describe('components/Chat/Invitation', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    jest.useFakeTimers()
    props = {
      onClose: jest.fn(),
      onConfirm: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render a ReactModal', () => {
    const modal = enzymeWrapper.find(ReactModal)
    expect(modal.exists()).toBe(true)
  })

  it('should render accept and decline buttons', () => {
    expect(enzymeWrapper.find('.proactive-chat-decline').exists()).toBe(true)
    expect(enzymeWrapper.find('.proactive-chat-accept').exists()).toBe(true)
  })

  it('should show second message and update local storage after declining', () => {
    expect(window.localStorage.getItem('proactiveChatDismiss')).toBeNull()
    const declineBtn = enzymeWrapper.find('.proactive-chat-decline')
    declineBtn.props().onClick()

    expect(enzymeWrapper.findWhere(el => el.text().toLowerCase().includes('close')).exists()).toBe(true)
    expect(enzymeWrapper.find('.proactive-chat-decline').exists()).toBe(false)
    expect(enzymeWrapper.find('.proactive-chat-accept').exists()).toBe(false)
    expect(window.localStorage.getItem('proactiveChatDismiss')).not.toBeNull()
  })

  it('should dismiss second message automatically after a while', () => {
    const declineBtn = enzymeWrapper.find('.proactive-chat-decline')
    declineBtn.props().onClick()

    expect(props.onClose).not.toHaveBeenCalled()
    jest.runAllTimers()
    expect(props.onClose).toHaveBeenCalled()
  })
})
