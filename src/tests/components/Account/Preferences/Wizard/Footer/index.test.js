import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import Footer from 'components/Account/Preferences/Wizard/Footer'
import InlineLoading from 'components/Messages/InlineLoading'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Footer {...props} />)
}

describe('components/Account/Preferences/Wizard/Footer', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should show saving indicator while saving', () => {
    const props = {
      step: 10,
      stepCount: 30,
      nextStep: jest.fn(),
      prevStep: jest.fn(),
      skipStep: jest.fn(),
      saving: true,
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)

    // Now set it to false and make sure the indicator went away
    enzymeWrapper.setProps({ saving: false })
    expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
  })

  it('should show accurate human-readable step number', () => {
    const props = {
      step: 0,
      stepCount: 3,
      nextStep: jest.fn(),
      prevStep: jest.fn(),
      skipStep: jest.fn(),
      saving: false,
    }
    enzymeWrapper = setup(props)

    const container = enzymeWrapper.find('.wizard-step-count-bottom')
    expect(container.exists()).toBe(true)
    expect(container.text()).toEqual((props.step + 1) + '/' + props.stepCount)

    // Do a few more tests with different values just to be sure there's no goofy hard-coding
    enzymeWrapper.setProps({ step: 13, stepCount: 25 })
    expect(enzymeWrapper.find('.wizard-step-count-bottom').text()).toEqual('14/25')
    enzymeWrapper.setProps({ step: 0, stepCount: 1 })
    expect(enzymeWrapper.find('.wizard-step-count-bottom').text()).toEqual('1/1')
    enzymeWrapper.setProps({ step: 10, stepCount: 11 })
    expect(enzymeWrapper.find('.wizard-step-count-bottom').text()).toEqual('11/11')
    enzymeWrapper.setProps({ step: 1336, stepCount: 9876 })
    expect(enzymeWrapper.find('.wizard-step-count-bottom').text()).toEqual('1337/9876')
  })

  describe('first step', () => {
    beforeEach(() => {
      const props = {
        step: 0,
        stepCount: 3,
        nextStep: jest.fn(),
        prevStep: jest.fn(),
        skipStep: jest.fn(),
        saving: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should not show Previous button', () => {
      expect(enzymeWrapper.find('.favorites-wizard-prev').exists()).toBe(false)
    })

    it('should show Next button', () => {
      expect(enzymeWrapper.find('.favorites-wizard-next').exists()).toBe(true)
    })

    it('should show Skip this step link', () => {
      expect(enzymeWrapper.find('.favorites-wizard-skip').exists()).toBe(true)
    })
  })

  describe('middle step', () => {
    beforeEach(() => {
      const props = {
        step: 1,
        stepCount: 3,
        nextStep: jest.fn(),
        prevStep: jest.fn(),
        skipStep: jest.fn(),
        saving: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should show Previous button', () => {
      expect(enzymeWrapper.find('.favorites-wizard-prev').exists()).toBe(true)
    })

    it('should show Next button', () => {
      expect(enzymeWrapper.find('.favorites-wizard-next').exists()).toBe(true)
    })

    it('should show Skip this step link', () => {
      expect(enzymeWrapper.find('.favorites-wizard-skip').exists()).toBe(true)
    })
  })

  describe('on final step', () => {
    beforeEach(() => {
      const props = {
        step: 2, // NOTE: zero indexed
        stepCount: 3, // NOTE: not zero indexed
        nextStep: jest.fn(),
        prevStep: jest.fn(),
        skipStep: jest.fn(),
        saving: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should show Previous button', () => {
      expect(enzymeWrapper.find('.favorites-wizard-prev').exists()).toBe(true)
    })

    it('should show Finish button', () => {
      expect(enzymeWrapper.find('.favorites-wizard-finish').exists()).toBe(true)
    })

    it('should not show Skip this step link', () => {
      expect(enzymeWrapper.find('.favorites-wizard-skip').exists()).toBe(false)
    })
  })
})
