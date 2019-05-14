import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import SubjectStep from 'components/Account/Favorites/Wizard/SubjectStep'
import Footer from 'components/Account/Favorites/Wizard/Footer'

let enzymeWrapper

const setup = (props) => {
  return shallow(<SubjectStep {...props} />)
}

describe('components/Account/Favorites/Wizard/SubjectStep', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  const props = {
    data: [
      {
        sys: { id: '123' },
        fields: { slug: 'foo', title: 'bar' },
      },
      {
        sys: { id: '456' },
        fields: { slug: 'baz', alternateTitle: 'foobar' },
      },
      {
        sys: { id: 'xyz' },
        fields: { slug: 'qux', title: 'quux' },
      },
    ],
    step: 0,
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

  it('should show one checkbox per subject', () => {
    props.data.forEach((subject) => {
      const have = <input type='checkbox' name={subject.fields.slug} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  it('should show subject title next to checkbox', () => {
    props.data.forEach((subject) => {
      const cbx = <input type='checkbox' name={subject.fields.slug} />
      const container = enzymeWrapper.findWhere(el => el.key() === subject.sys.id)
      expect(container.text()).toEqual(subject.fields.alternateTitle || subject.fields.title)
    })
  })

  it('should pass on full selected subject objects when moving to next step', () => {
    const instance = enzymeWrapper.instance()
    instance.onCheckboxChanged({ target: { name: props.data[0].fields.slug, checked: true } })
    instance.onCheckboxChanged({ target: { name: props.data[2].fields.slug, checked: true } })
    // Test selecting and deselecting
    instance.onCheckboxChanged({ target: { name: props.data[1].fields.slug, checked: true } })
    instance.onCheckboxChanged({ target: { name: props.data[1].fields.slug, checked: false } })

    instance.nextStep() // Note that the instance's nextStep() method is NOT the same as the props.nextStep passed in

    const expected = [props.data[0], props.data[2]]
    expect(props.nextStep).toHaveBeenLastCalledWith(expected)
  })

  it('should not pass data when skipping step', () => {
    const instance = enzymeWrapper.instance()
    instance.skipStep({ preventDefault: jest.fn() })

    expect(props.nextStep).not.toHaveBeenLastCalledWith(expect.any(Array))
  })
})
