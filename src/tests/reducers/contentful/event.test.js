import reducer from 'reducers/contentful/event'
import * as actions from 'actions/contentful/event'
import * as statuses from 'constants/APIStatuses'

describe('event reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_EVENT', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_EVENT,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_EVENT', () => {
    const status = 'some status'
    const inEvent = {
      test: 'data',
    }

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_EVENT,
      status: status,
      event: inEvent,
    })
    expect(response).toMatchObject({
      status: status,
      json: inEvent,
    })
  })

  it('should map single event correctly', () => {
    const dateStr = '2019-09-07'
    const inEvent = {
      sys: { id: '2' },
      fields: {
        slug: 'foo',
        startDate: '2010-01-01T10:45:00-00:00',
        endDate: '2010-01-04T00:00:00-00:00',
      },
    }

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_EVENT,
      status: 200,
      event: inEvent,
    })
    expect(response.json).toMatchObject({
      id: inEvent.sys.id,
      slug: inEvent.fields.slug,
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      displayDate: expect.any(String),
      displayTime: null,
    })
  })

  it('should map recurring event correctly', () => {
    const dateStr = '2019-09-07'
    const inEvent = {
      sys: { id: '2' },
      fields: {
        slug: 'foo',
        startDate: '2010-01-01T10:45:00-00:00',
        endDate: '2010-01-04T00:00:00-00:00',
        recurrenceDate: dateStr,
        dateSchedule: [
          '2010-01-01',
          '2010-01-03',
        ],
      },
    }

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_EVENT,
      status: 200,
      event: inEvent,
      recurrenceDate: dateStr,
    })
    expect(response.json).toMatchObject({
      id: inEvent.sys.id + dateStr,
      slug: inEvent.fields.slug,
      dateSchedule: inEvent.fields.dateSchedule,
      recurrenceDate: dateStr,
      startDate: expect.any(Date),
      endDate: expect.any(Date),
      displayDate: expect.any(String),
      displayTime: expect.any(String),
    })
  })
})
