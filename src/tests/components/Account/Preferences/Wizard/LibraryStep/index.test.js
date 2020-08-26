import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import LibraryStep from 'components/Account/Preferences/Wizard/LibraryStep'
import Footer from 'components/Account/Preferences/Wizard/Footer'
import RadioList from 'components/Interactive/RadioList'

import { DEFAULT_LIBRARY } from 'actions/personal/settings'

let enzymeWrapper
let spy

const setup = (props) => {
  return shallow(<LibraryStep {...props} />)
}

describe('components/Account/Preferences/Wizard/LibraryStep', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  const props = {
    data: [],
    defaultValue: 'thisWouldBeASlug',
    step: 2,
    stepCount: 3,
    nextStep: jest.fn(),
    prevStep: jest.fn(),
  }

  beforeEach(() => {
    props.nextStep = jest.fn() // Create a new function for each test in case the tests inspect calls to it
    enzymeWrapper = setup(props)
  })

  it('should contain descriptive header', () => {
    expect(enzymeWrapper.find('#favoritesModalDesc').exists()).toBe(true)
  })

  it('should render a Footer component', () => {
    const have = enzymeWrapper.find(Footer)
    expect(have.exists()).toBe(true)
    expect(have.props().step).toEqual(props.step)
    expect(have.props().stepCount).toEqual(props.stepCount)
  })

  it('should render a RadioList', () => {
    const have = enzymeWrapper.find(RadioList)
    expect(have.exists()).toBe(true)
    expect(have.props().defaultValue).toEqual(props.defaultValue)

    // Sanity check that radio list gets the same number of entries passed to it
    expect(have.props().entries).toHaveLength(props.data.length)
    const newData = [
      { fields: { } },
      { fields: { } },
      { fields: { } },
    ]
    enzymeWrapper.setProps({ data: newData })

    const foundEntries = enzymeWrapper.find(RadioList).props().entries
    expect(foundEntries).toHaveLength(newData.length)
    expect(foundEntries.length).toBeGreaterThan(0)
  })

  it('should pass on selection when moving to next step', () => {
    const newValue = 'setToThis'
    expect(newValue).not.toEqual(props.defaultValue)

    const instance = enzymeWrapper.instance()
    instance.onRadioChanged(newValue)
    instance.nextStep() // Note that the instance's nextStep() method is NOT the same as the props.nextStep passed in

    expect(props.nextStep).toHaveBeenLastCalledWith(newValue)
  })

  it('should not pass data when skipping step', () => {
    const instance = enzymeWrapper.instance()
    instance.skipStep({ preventDefault: jest.fn() })

    expect(props.nextStep).toHaveBeenCalled()
    expect(props.nextStep).not.toHaveBeenLastCalledWith(DEFAULT_LIBRARY)
  })
})
