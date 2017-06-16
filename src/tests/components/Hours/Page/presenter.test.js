import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Hours/Page/presenter'
import CurrentHours from '../../../../components/Hours/Current'

const setup = (hoursEntry) => {
  return shallow(<PagePresenter hoursEntry={ hoursEntry } />)
}

let enzymeWrapper
describe('components/Hours/Page/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      "hesburghlibrary":{"name":"Hesburgh Libraries Service Points","today":{"date":"2017-05-16","display":"7am - 11pm","opens":"07:00","closes":"23:00"},"thisWeek":{"rows":[{"fromDay":"Sunday","toDay":null,"display":"10am - 11pm","rowDisplay":"Sunday"},{"fromDay":"Monday","toDay":"Friday","display":"7am - 11pm","rowDisplay":"Monday - Friday"},{"fromDay":"Saturday","toDay":null,"display":"9am - 11pm"}],"display":"May 14th - 20th","dates":["2017-05-14","2017-05-15","2017-05-16","2017-05-17","2017-05-18","2017-05-19","2017-05-20"]},"upcomingDifferentHours":{"rows":[{"fromDay":"Sunday","toDay":null,"display":"10am - 11pm","rowDisplay":"Sunday"},{"fromDay":"Monday","toDay":null,"display":"Closed","rowDisplay":"Monday"},{"fromDay":"Tuesday","toDay":"Friday","display":"7am - 11pm","rowDisplay":"Tuesday - Friday"},{"fromDay":"Saturday","toDay":null,"display":"9am - 11pm"}],"display":"May 28th - June 3rd","dates":["2017-05-28","2017-05-29","2017-05-30","2017-05-31","2017-06-01","2017-06-02","2017-06-03"]}}
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('Calls Current Hours for the key in the data', () => {
    expect(enzymeWrapper.containsMatchingElement(<CurrentHours />)).toBe(true)
  })

  it('Adds a title to the page', () => {
    expect(enzymeWrapper.find('h2').children().node).toBe('Hours')
  })
})
