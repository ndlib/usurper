import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Hours/Page/presenter'

const setup = (hoursEntry) => {
  return shallow(<PagePresenter hoursEntry={hoursEntry} />)
}

let enzymeWrapper
describe('components/Hours/Page/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      hesburghlibrariesservicepoints: {
        name: 'name',
        today: {
          date: '2017-05-16',
          display: '7am - 11pm',
          opens: '07:00',
          closes: '23:00',
        },
        thisWeek: {
          display: 'May 14th - 20th',
          rows:[
            {
              fromDay: 'Sunday',
              toDay: 'Saturday',
              display: '10am - 11pm',
              rowDisplay: 'Sunday - Saturday',
            },
          ],
          dates: ['2017-05-14', '2017-05-15', '2017-05-16', '2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20'],
        },
        upcomingDifferentHours: {
          display: 'May 14th - 20th',
          rows:[
            {
              fromDay: 'Sunday',
              toDay: 'Saturday',
              display: '10am - 11pm',
              rowDisplay: 'Sunday - Saturday',
            },
          ],
          dates: ['2017-05-14', '2017-05-15', '2017-05-16', '2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20'],
        },
      },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('Calls Current Hours for the key in the data', () => {
  })

  it('Adds a title to the page', () => {
    expect(enzymeWrapper.find('h2').children().node).toBe('Hours')
  })
})
