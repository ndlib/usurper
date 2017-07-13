import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Hours/Page/presenter'
import CurrentHours from '../../../../components/Hours/Current'

const setup = (hoursEntry) => {
  return shallow(<PagePresenter servicePoints={ hoursEntry } />)
}

let enzymeWrapper
describe('components/Hours/Page/presenter', () => {
  beforeEach(() => {
    let servicePoints = [{
      fields: {
        address: '117 Bond Hall',
        city: 'Notre Dame',
        country: 'United States',
        floor: {
          fields: {
            building: null,
            image: null,
            shortDescription: 'Map of Bond Hall (Campus)',
            slug: 'bond-1st-floor',
            title: 'Bond Hall 1st Floor',
          },
        },
        hoursCode: 'architecturelibrary',
        phoneNumber: '(574) 631-6654',
        state: 'IN',
        title: 'Architecture Library',
        type: 'Library',
        zipcode: '46556',
      },
      sys:{
        contentType: null,
        createdAt: '2017-05-04T14:11:02.530Z',
        id: '2NHpjJTyZyeaAIEwcEyKOg',
        revision: 5,
        space: null,
        type: 'Entry',
        updatedAt: '2017-07-03T18:23:15.202Z',
      },
    }]

    enzymeWrapper = setup(servicePoints)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  // it('Calls Current Hours for the key in the data', () => {
  //   expect(enzymeWrapper.containsMatchingElement(<CurrentHours />)).toBe(true)
  // })

  it('Adds a title to the page', () => {
    expect(enzymeWrapper.children().someWhere(n => n.node.props.title === 'Hours')).toBe(true)
  })
})
