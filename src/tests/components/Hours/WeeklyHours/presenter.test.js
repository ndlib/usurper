import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Hours/WeeklyHours/presenter'

const setup = (hoursEntry) => {
  return shallow(<PagePresenter hours={hoursEntry} title='title' showEffectiveDates={true} />)
}

let enzymeWrapper
describe('components/Hours/WeeklyHours/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      display: 'this-week-display',
      rows:[
        {
          fromDay: 'rows-from-day',
          toDay: 'rows-to-day',
          display: 'rows-display',
          rowDisplay: 'rows-row-display',
        },
      ],
      dates: ['2017-05-14', '2017-05-15', '2017-05-16', '2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20'],
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('adds the title', () => {
    expect(enzymeWrapper.find('h5').children().node).toBe('title')
  })

  it('shows the effective dates message', () => {
    expect(enzymeWrapper.find('p').html()).toBe('<p> Effective this-week-display </p>')
  })

  it('has a dl for the list of rows', () => {
    expect(enzymeWrapper.find('dl.hours-grid').exists()).toBe(true)
  })
})
