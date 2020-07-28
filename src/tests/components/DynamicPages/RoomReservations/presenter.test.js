import React from 'react'
import { shallow } from 'enzyme'
import RoomReservationsPresenter from 'components/DynamicPages/RoomReservations/presenter'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import MeetingSpacesTable from 'components/DynamicPages/RoomReservations/MeetingSpacesTable'
import LibMarkdown from 'components/LibMarkdown'

const setup = (props) => {
  return shallow(<RoomReservationsPresenter {...props} />)
}

let enzymeWrapper
describe('components/DynamicPages/RoomReservations/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      pathSlug: 'fakeSlug',
      preview: true,
      body: ['1', '2'],
      contactInfo: {
        contacts: [{
          directoryUrl: 'https://library.nd.edu/directory/employees/sone',
          name: 'some one',
          email: 'sone@nd.edu',
          netid: 'sone',
        }]
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
          contact: 'sone',
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
    })
  })
  
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render the sidebar component', () => {
    expect(enzymeWrapper.containsMatchingElement(<StaticSidebar slug='fakeSlug' preview={true} />)).toBe(true)
  })

  it('should render the static alert component', () => {
    expect(enzymeWrapper.containsMatchingElement(<StaticAlert slug='fakeSlug' preview={true} />)).toBe(true)
  })

  it('should render the LibMarkdown component that appears before {{Table}}', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>1</LibMarkdown>)).toBe(true)
  })

  it('should render the LibMarkdown component that appears after {{Table}}', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>2</LibMarkdown>)).toBe(true)
  })

  it('should render the MeetingSpacesTable component', () => {
    expect(enzymeWrapper.containsMatchingElement(<MeetingSpacesTable 
      contactInfo={{
        contacts: [{
          directoryUrl: 'https://library.nd.edu/directory/employees/sone',
          name: 'some one',
          email: 'sone@nd.edu',
          netid: 'sone',
        }]
      }}
      meetingSpacesData={[{
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
          contact: 'sone',
          floor: {
            fields: {
              slug: 'fake-slug',
            }
          },
          slug: 'fake-slug',
          title: 'fake title',
          type: ['Event Space'],
        },
      }]} />)).toBe(true)
  })
})
