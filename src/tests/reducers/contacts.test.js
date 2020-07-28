import reducer from 'reducers/contacts'
import * as actions from 'actions/contacts'
import * as statuses from 'constants/APIStatuses'

describe('Page reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle REQUEST_CONTACTS', () => {
    expect(
      reducer(undefined, {
        type: actions.REQUEST_CONTACTS,
        netids: ['a123', 'b456'],
      })
    ).toEqual({
      status: statuses.FETCHING,
      netids: ['a123', 'b456'],
    })
  })

  it('should handle RECEIVE_CONTACTS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_CONTACTS,
        status: 'status from receiveContacts',
        data: {
          librarians: [
          {
            directoryUrl: 'https://library.nd.edu/directory/employees/one', 
          },
          {
            directoryUrl: 'https://library.nd.edu/directory/employees/two',
          }
        ]}
      })
    ).toEqual({
      status: 'status from receiveContacts',
      contacts: [
        {
          directoryUrl: 'https://library.nd.edu/directory/employees/one',
          netid: 'one'
        }, 
        {
          directoryUrl: 'https://library.nd.edu/directory/employees/two',
          netid: 'two'
        }
      ],
    })
  })

  it('should handle RECEIVE_CONTACTS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_CONTACTS,
        status: 'status from receiveContacts',
        data: 'page from receiveContacts',
      })
    ).toEqual({
      status: 'status from receiveContacts',
      contacts: [],
    })
  })
})
