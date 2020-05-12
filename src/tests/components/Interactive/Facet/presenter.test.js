import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Interactive/Facet/presenter.js'
import Accordion from 'components/Interactive/Accordion'

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

let props
let enzymeWrapper
describe('components/Interactive/Facet/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      label: 'Some Facet',
      options: [
        {
          key: 'subject1',
          value: 'Display Text 1',
          selected: true,
        },
        {
          key: 'subject2',
          value: 'Display Text 2',
          selected: true,
        },
        {
          key: 'subject3',
          value: 'Display Text 3',
          selected: true,
        },
        {
          key: 'SELECT_ME',
          value: 'Selected subject',
          selected: false,
        },
        {
          key: 'ACTIVATE',
          value: 'Active subject',
          selected: false,
        }
      ],
      onFacetChange: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render a mobile-only Accordion component', () => {
    const found = enzymeWrapper.find(Accordion)
    expect(found.exists()).toBe(true)
    expect(found.props().mobileOnly).toBe(true)
  })

  it('should render each option in props', () => {
    expect(props.options.length).toBeGreaterThan(0)
    props.options.forEach(option => {
      expect(enzymeWrapper.containsMatchingElement(<label><button>{option.value}</button></label>)).toBe(true)
    })
  })

  it('should render a checkbox for each option', () => {
    const checkboxes = enzymeWrapper.findWhere(el => el.type() === 'input' && el.props().type === 'checkbox')
    expect(checkboxes).toHaveLength(props.options.length)

    const checked = checkboxes.findWhere(checkbox => checkbox.props().checked)
    expect(checked).toHaveLength(props.options.filter(opt => opt.selected).length)
  })

  it('should call onFacetChange when clicking individual option', () => {
    const found = enzymeWrapper.findWhere(el => el.hasClass('linkText'))
    found.first().simulate('click')
    expect(props.onFacetChange).toHaveBeenCalled()
  })

  it('should call onFacetChange when clicking option checkbox', () => {
    const found = enzymeWrapper.findWhere(el => el.type() === 'input' && el.props().type === 'checkbox')
    found.first().simulate('change')
    expect(props.onFacetChange).toHaveBeenCalled()
  })
})
