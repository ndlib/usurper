import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from 'components/Hours/WeeklyHours/presenter'

const setup = (hoursEntry, title, effectiveDate) => {
  return shallow(<PagePresenter hours={hoursEntry} title={title} effectiveDate={effectiveDate} showEffectiveDates={true} />)
}

let enzymeWrapper
describe('components/Hours/WeeklyHours/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup([
      {
        rendered: 'rendered',
        title: 'title',
      },
    ],
    'this-week-display',
    'effectiveDate',
    )
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('adds the title', () => {
    expect(enzymeWrapper.containsMatchingElement(<h3>this-week-display</h3>)).toBe(true)
  })

  it('shows the effective dates message', () => {
    expect(enzymeWrapper.find('p').html()).toBe('<p> Starting On: effectiveDate</p>')
  })

  it('has a dl for the list of rows', () => {
    expect(enzymeWrapper.find('dl.hours-grid').exists()).toBe(true)
  })

  it('has a row for the hours', () => {
    expect(enzymeWrapper.find('dl span').html()).toBe('<span><dt>title</dt><dd>rendered</dd></span>')
  })
})
