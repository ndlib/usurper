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
        data: [
          {
            emp_url: 'https://library.nd.edu/directory/employees/one',
            netID: 'one',
            fname: 'dude',
            lname: 'man',
            email: 'my@email.address',
            jobTitle: 'Stuff Doer',
            mail_addr: '1234 here',
            phone: '877CASHNOW',
            pic: 'prettypic.url',
          },
          {
            emp_url: 'https://library.nd.edu/directory/employees/two',
            netID: 'two',
          },
        ],
      })
    ).toEqual({
      status: 'status from receiveContacts',
      contacts: [
        {
          directoryUrl: 'https://library.nd.edu/directory/employees/one',
          netID: 'one',
          name: 'dude man',
          email: 'my@email.address',
          jobTitle: 'Stuff Doer',
          mail_addr: '1234 here',
          phone: '877CASHNOW',
          photo: 'prettypic.url',
        },
        expect.objectContaining({
          directoryUrl: 'https://library.nd.edu/directory/employees/two',
          netID: 'two',
        }),
      ],
    })
  })
})
