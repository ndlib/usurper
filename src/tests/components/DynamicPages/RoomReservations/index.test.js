import React from 'react'
import { shallow } from 'enzyme'
import { RoomReservationsContainer, mapStateToProps, mapDispatchToProps } from 'components/DynamicPages/RoomReservations'
import * as statuses from 'constants/APIStatuses'

const setup = (props) => {
  return shallow(<RoomReservationsContainer {...props} />)
}

let enzymeWrapper
let props

describe('components/DynamicPages/RoomReservations', () => {
  beforeEach(() => {
    props = {
      fetchSidebar: jest.fn(),
      fetchContacts: jest.fn(),
      fetchMeetingSpaces: jest.fn(),
      allMeetingSpacesStatus: statuses.NOT_FETCHED,
      combinedStatus: statuses.NOT_FETCHED,
      cfStaticStatus: statuses.NOT_FETCHED,
      contactInfoStatus: statuses.NOT_FETCHED,
      preview: true,
      pathSlug: 'slug',
      meetingSpacesData: [
        {
          sys: {
            id: 'fakeID',
          },
          fields: {
            contact: 'one',
          }
        },
        {
          sys: {
            id: 'fakeID3',
          },
          fields: {
            contact: 'three'
          },
        },
        {
          sys: {
            id: 'fakeID4',
          },
          fields: {
            contact: 'three'
          },
        },
      ],
      cfStatic: {},
      contactInfo: {
        contacts: [{
          directoryUrl: 'https://library.nd.edu/directory/employees/sone',
          name: 'some one',
          email: 'sone@nd.edu',
          netid: 'one'
        },
        {
          directoryUrl: 'https://library.nd.edu/directory/employees/aone',
          name: 'another one',
          email: 'aone@nd.edu',
          netid: 'three'
        }
      ],
      }
    },

    enzymeWrapper = setup(props)
  })
  
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should call the fetch meeting space action with preview prop', () => {
    expect(props.fetchMeetingSpaces).toHaveBeenCalledWith(true)
  })

  it('should call the fetch static content action with preview prop', () => {
    expect(props.fetchSidebar).toHaveBeenCalledWith('slug', true)
  })

  it('should call the fetch contacts action', () => {
    expect(props.fetchContacts).not.toHaveBeenCalled()
    enzymeWrapper.setProps({ allMeetingSpacesStatus: statuses.SUCCESS })
      const netids = ['one','three']
    expect(props.fetchContacts).toHaveBeenCalledWith(netids)
  })

  describe('mapStateToProps', () => {
    it('should map props correctly', () => {
      const ownProps = {
        location: {
          pathname: 'pathname',
        }
      }
      const state = {
        contactInfo: {
          contacts: [{
            directoryUrl: 'https://library.nd.edu/directory/employees/sone',
            name: 'some one',
            email: 'sone@nd.edu',
            netid: 'one'
          },
          {
            directoryUrl: 'https://library.nd.edu/directory/employees/bone',
            name: 'bob one',
            email: 'bone@nd.edu',
            netid: 'three'
          }],
        },
        cfAllMeetingSpaces: {
          stuff: 'here',
          json: [
            {
              sys: {
                id: 'fakeID',
              },
              fields: {
                title: 'fake classroom',
                slug: 'fake-classroom-slug',
                cardinalDirection: 'Southeast',
                type: [
                  'Event Space'
                ],
                additionalFeatures: [
                  'fake features'
                ],
                floor: 'some floor',    
                capacity: '30 Fixed',
                contact: 'one',
              }
            },
            {
              sys: {
                id: 'fakeID2',
              },
              fields: {
                title: 'fake classroom number 2',
                slug: 'fake-slug-2',
                cardinalDirection: 'Southwest',
                type: [
                  'Study Space'
                ],
                additionalFeatures: [
                  'more features'
                ],
                floor: 'some floor',    
                capacity: '30 Fixed',
                contact: 'two'
              }
            },
            {
              sys: {
                id: 'fakeID3',
              },
              fields: {
                title: 'fake classroom number 3',
                slug: 'fake-slug-3',
                cardinalDirection: 'Southwest',
                type: [
                  'Event Space'
                ],
                additionalFeatures: [
                  'more features'
                ],
                floor: 'some floor',    
                capacity: '30 Fixed',
                contact: 'three'
              }
            },
          ],
        },
        cfStatic: {
          stuff: 'here',
          status: 'API_STATUS_SUCCESS',
          json: {
            fields: {
              title: 'Reserve a Meeting or Event Space',
              slug: 'room-reservations',
              shortDescription: 'This is a test',
              body: 'first {{Table}} second'
            }
          },
          slug: 'room-reservations',
          receivedAt: 1593612080131
        },
      }
      const newProps = mapStateToProps(state, ownProps)
      expect(newProps.meetingSpacesData.length).toEqual(2)
      expect(newProps.body.length).toEqual(2)
      })
    })
    
  describe('mapDispatchToProps', () => {
    it('creates expected actions', () => {
      const newProps = mapDispatchToProps(null)
      expect(newProps.fetchMeetingSpaces).toEqual(expect.any(Function))
    })
  })
})