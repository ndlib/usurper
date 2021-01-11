import React from 'react'
import { shallow } from 'enzyme'
import Table from 'components/Table'
import MeetingSpacesTable from 'components/DynamicPages/RoomReservations/MeetingSpacesTable'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<MeetingSpacesTable {...props} />)
}

describe('components/Contentful/DynamicPages/RoomReservations/MeetingSpacesTable', () => {
  beforeEach(() => {
    props = {
      contactInfo: {
        contacts: [{
          directoryUrl: 'https://library.nd.edu/directory/employees/sone',
          name: 'some one',
          email: 'sone@nd.edu',
          netID: 'sone',
        }],
      },
      meetingSpacesData: [{
        fields: {
          photo: {
            fields: {
              file: '//images.fake.com/path',
              description: 'fake alt text',
            }
          },
          additionalFeatures: ['1', '2', '3'],
          capactiy: 'fake amount',
          cardinalDirection: 'Direction',
          floor: {
            fields: {
              slug: 'fake-slug',
            }
          },
          slug: 'fake-slug',
          title: 'fake title',
          type: ['Event Space'],
        },
      }],
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })


  it('should render a Table component', () => {
    const table = enzymeWrapper.find(Table)
    expect(table.exists()).toBe(true)
  })

  it('should render a matching Object', () => {
    const table = enzymeWrapper.find(Table)
    expect(table.props().data[0]).toMatchObject(props.meetingSpacesData[0])
  })
})
