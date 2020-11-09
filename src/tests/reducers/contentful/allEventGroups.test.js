import reducer from 'reducers/contentful/allEventGroups'
import * as actions from 'actions/contentful/allEventGroups'
import * as statuses from 'constants/APIStatuses'

describe('allEventGroups reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_ALL_EVENT_GROUPS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_ALL_EVENT_GROUPS,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_ALL_EVENT_GROUPS', () => {
    const status = 'some status'
    const eventGroups = [
      {
        sys: { id: '1' },
        fields: {
          title: 'foo',
          contentTypes: ['event'],
          items: [
            {
              sys: { type: 'Link', linkType: 'Entry', id: 'test' },
            },
            {
              sys: { type: 'Link', linkType: 'Entry', id: 'me' },
            },
          ],
        },
      },
      {
        sys: { id: '2' },
        fields: {
          title: 'bar',
          contentTypes: ['event'],
          items: [
            {
              sys: { type: 'Link', linkType: 'Entry', id: 'event' },
            },
            {
              sys: { type: 'Link', linkType: 'Entry', id: 'another' },
            },
          ],
        },
      },
    ]

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_ALL_EVENT_GROUPS,
      status: status,
      allEventGroups: eventGroups,
    })
    expect(response.status).toEqual(status)
    expect(response.json).toHaveLength(eventGroups.length)

    expect(response.json[0]).toMatchObject({
      id: '1',
      title: 'foo',
      eventIds: ['test', 'me'],
    })
    expect(response.json[1]).toMatchObject({
      id: '2',
      title: 'bar',
      eventIds: ['event', 'another'],
    })
  })
})
