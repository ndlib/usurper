import reducer from 'reducers/contentful/allEvents'
import * as actions from 'actions/contentful/allEvents'
import * as statuses from 'constants/APIStatuses'

describe('allEvents reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_ALLEVENTS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_ALLEVENTS,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_ALLEVENTS', () => {
    const status = 'some status'
    const events = [
      {
        sys: { id: '1' },
        fields: {
          slug: 'bar',
        },
      },
      {
        sys: { id: '2' },
        fields: {
          slug: 'foo',
          startDate: '2010-01-01T10:45:00-00:00',
          endDate: '2010-01-01T11:45:00-00:00',
        },
      },
    ]

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_ALLEVENTS,
      status: status,
      allEvents: events,
    })
    expect(response.status).toEqual(status)
    expect(response.json).toHaveLength(events.length)

    expect(response.json[0]).toMatchObject({
      id: events[0].sys.id,
      slug: events[0].fields.slug,
    })
    expect(response.json[1]).toMatchObject({
      id: events[1].sys.id,
      slug: events[1].fields.slug,
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      displayDate: expect.any(String),
      displayTime: expect.any(String),
    })
  })



  it('should mark recurring events based on eventGroups eventIds', () => {
    const eventGroups = [
      {
        id: 'groupId',
        title: 'groupTitle',
        eventIds: [
          '222',
          '123',
          '444',
        ],
      },
      {
        id: 'groupId2',
        title: 'groupTitle2',
        eventIds: [
          '456',
        ],
      }
    ]
    const recurringEvent1 = {
      sys: { id: '123' },
      fields: {
        slug: 'foo',
        startDate: '2010-09-01T10:45:00-00:00',
        endDate: '2010-09-01T11:45:00-00:00',
      },
    }
    const recurringEvent2 = {
      sys: { id: '456' },
      fields: {
        slug: 'bar',
        startDate: '2010-09-08T10:45:00-00:00',
        endDate: '2010-09-08T11:45:00-00:00',
      },
    }
    const nonRecurringEvent = {
      sys: { id: '9761453498743' },
      fields: {
        slug: 'baz',
        startDate: '2010-09-08T10:45:00-00:00',
        endDate: '2010-09-08T11:45:00-00:00',
      },
    }

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_ALLEVENTS,
      status: 200,
      allEvents: [
        recurringEvent1,
        recurringEvent2,
        nonRecurringEvent,
      ],
      allEventGroups: eventGroups,
    })

    const expectArray = [
      expect.objectContaining({
        slug: recurringEvent1.fields.slug,
        recurring: true,
      }),
      expect.objectContaining({
        slug: recurringEvent2.fields.slug,
        recurring: true,
      }),
      expect.objectContaining({
        slug: nonRecurringEvent.fields.slug,
        recurring: false,
      }),
    ]
    expect(response.json).toEqual(expect.arrayContaining(expectArray))
  })
})
