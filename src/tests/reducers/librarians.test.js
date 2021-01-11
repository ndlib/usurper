import reducer from 'reducers/librarians'
import * as actions from 'actions/librarians'
import * as statuses from 'constants/APIStatuses'

describe('librarians reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle REQUEST_LIBRARIANS', () => {
    expect(
      reducer(undefined, {
        type: actions.REQUEST_LIBRARIANS,
        netids: ['a123', 'b456'],
      })
    ).toEqual({
      status: statuses.FETCHING,
      netids: ['a123', 'b456'],
    })
  })

  it('should handle RECEIVE_LIBRARIANS', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_LIBRARIANS,
        status: 'status from receiveLibrarians',
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
      status: 'status from receiveLibrarians',
      json: [
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
