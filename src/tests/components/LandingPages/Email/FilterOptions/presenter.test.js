import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Email/FilterOptions/presenter'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/Email/FilterOptions/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      facets: [
        {
          key: 'my facet',
          options: [
            {
              key: 'opt1',
              value: 'value1',
              selected: false,
            },
            {
              key: 'optxyz',
              value: 'zyx',
              selected: false,
            },
          ],
        },
        {
          key: 'foooooo',
          label: 'facet LABEL',
          options: [],
        },
      ],
      selectedOptions: {
        'my facet': ['zyx'],
      },
      onOptionChange: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render each facet with an appropriate label', () => {
    expect(enzymeWrapper.findWhere(el => el.text() === 'Subscribe by My Facet').exists()).toBe(true)
    expect(enzymeWrapper.findWhere(el => el.text() === 'Subscribe by facet LABEL').exists()).toBe(true)
  })

  it('should render a checkbox for each facet option', () => {
    const check1 = (
      <label>
        <input type='checkbox' />
        <span>value1</span>
      </label>
    )
    const check2 = (
      <label>
        <input type='checkbox' />
        <span>zyx</span>
      </label>
    )

    expect(enzymeWrapper.containsMatchingElement(check1)).toBe(true)
    expect(enzymeWrapper.containsMatchingElement(check2)).toBe(true)
  })

  it('should include a disabled checkbox for all options', () => {
    const check = (
      <label>
        <input type='checkbox' disabled />
        <span>All</span>
      </label>
    )

    expect(enzymeWrapper.containsMatchingElement(check)).toBe(true)
  })

  it('should call onOptionChange when changing a checkbox', () => {
    const checkbox = enzymeWrapper.findWhere(el => el.type() === 'input' && el.props().type === 'checkbox').first()
    checkbox.simulate('change')
    expect(props.onOptionChange).toHaveBeenCalled()
  })
})
