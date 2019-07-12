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
        sys: { id: 'abc' },
        fields: {
          title: 'MINE',
          page: {
            sys: { id: '123' },
            fields: { slug: 'foo', title: 'bar' },
          },
          usePageTitle: true,
        },
        order: 3,
      },
      {
        sys: { id: 'def' },
        fields: {
          title: 'IM H2O INTOLERANT',
          page: {
            sys: { id: '456' },
            fields: { slug: 'baz', alternateTitle: 'foobar' },
          },
          usePageTitle: false,
        },
        order: 1,
      },
      {
        sys: { id: 'ghi' },
        fields: {
          title: 'IM OBNOXIOUS',
          page: {
            sys: { id: 'xyz' },
            fields: { slug: 'qux', title: 'quux' },
          },
          usePageTitle: true,
        },
      },
      {
        sys: { id: 'jkl' },
        fields: {
          title: 'I SWIM WITH SHARKS',
          page: {
            sys: { id: 'auto' },
            fields: { slug: 'select', title: 'me' },
          },
          usePageTitle: false,
        },
        order: 17,
        selected: true,
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
      expect(container.exists()).toBe(true)
      expect(container.text()).toEqual(subject.fields.usePageTitle ? subject.fields.page.fields.title : subject.fields.title)
    })
  })

  it('should pass on full selected subject objects when moving to next step', () => {
    const instance = enzymeWrapper.instance()
    instance.onCheckboxChanged({ target: { name: props.data[0].sys.id, checked: true, order: 3 } })
    instance.onCheckboxChanged({ target: { name: props.data[2].sys.id, checked: true } })
    // Test selecting and deselecting
    instance.onCheckboxChanged({ target: { name: props.data[1].sys.id, checked: true, order: 1 } })
    instance.onCheckboxChanged({ target: { name: props.data[1].sys.id, checked: false, order: 1 } })
    // If null target, shouldn't error or do anything weird
    instance.onCheckboxChanged()

    instance.nextStep() // Note that the instance's nextStep() method is NOT the same as the props.nextStep passed in

    // props.data[3] was designated as selected in props, so that's why it is here
    const expected = [props.data[3], props.data[0], props.data[2]]
    expect(props.nextStep).toHaveBeenLastCalledWith(expected)
  })

  it('should not pass data when skipping step', () => {
    const instance = enzymeWrapper.instance()
    instance.skipStep({ preventDefault: jest.fn() })

    expect(props.nextStep).not.toHaveBeenLastCalledWith(expect.any(Array))
  })

  it('should add tooltip on hover for long titles', () => {
    const instance = enzymeWrapper.instance()

    const tip = 'remember to test your code'
    const fakeElement = { scrollWidth: 250, clientWidth: 200, textContent: tip }
    instance.onSubjectEnter({ target: fakeElement })
    expect(instance.state.hoveredSubject).toEqual(fakeElement)
    expect(instance.getTooltip(tip)).toEqual(tip)

    instance.onSubjectLeave()
    expect(instance.state.hoveredSubject).toBeFalsy()
    expect(instance.getTooltip(tip)).toBeFalsy()
  })

  it('should not show tooltip for short titles', () => {
    const instance = enzymeWrapper.instance()

    const tip = 'remember to test your code'
    const fakeElement = { scrollWidth: 200, clientWidth: 200, textContent: tip }
    instance.onSubjectEnter({ target: fakeElement })
    expect(instance.state.hoveredSubject).toEqual(fakeElement)
    expect(instance.getTooltip(tip)).toBeFalsy()
  })
})
