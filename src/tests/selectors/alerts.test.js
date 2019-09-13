import makeAlertSelector from 'selectors/alerts'
import * as statuses from 'constants/APIStatuses'

const selector = makeAlertSelector()
const now = new Date()
const dateOffset = (date, days) => {
  return new Date(new Date(date).setDate(date.getDate() + days))
}

describe('alerts selector', () => {
  it('should return an empty array before fetching', () => {
    const state = {
      allAlerts: {
        status: statuses.NOT_FETCHED,
      }
    }
    expect(selector(state)).toEqual([])
  })

  it('should return an empty array while fetching', () => {
    const state = {
      allAlerts: {
        status: statuses.FETCHING,
      }
    }
    expect(selector(state)).toEqual([])
  })

  it('should filter out page alerts', () => {
    const state = {
      allAlerts: {
        status: statuses.SUCCESS,
        json: [
          {
            sys: {
              id: 'page',
            },
            fields: {
              startTime: dateOffset(now, -1),
              endTime: dateOffset(now, 1),
              global: false,
            },
          },
          {
            sys: {
              id: 'global',
            },
            fields: {
              startTime: dateOffset(now, -1),
              endTime: dateOffset(now, 1),
              global: true,
            },
          },
        ],
      }
    }

    const result = selector(state)
    expect(result).toHaveLength(1)
    expect(result[0].sys.id).toEqual('global')
    expect(result[0].fields.global).toEqual(true)
  })

  it('should filter out global alerts that are not ongoing', () => {
    const state = {
      allAlerts: {
        status: statuses.SUCCESS,
        json: [
          {
            sys: {
              id: 'future',
            },
            fields: {
              startTime: dateOffset(now, 1),
              endTime: dateOffset(now, 60),
              global: true,
            },
          },
          {
            sys: {
              id: 'past',
            },
            fields: {
              startTime: dateOffset(now, -3),
              endTime: dateOffset(now, -1),
              global: true,
            },
          },
          {
            sys: {
              id: 'present',
            },
            fields: {
              startTime: dateOffset(now, -1),
              endTime: dateOffset(now, 1),
              global: true,
            },
          },
        ],
      }
    }

    const result = selector(state)
    expect(result).toHaveLength(1)
    expect(result[0].sys.id).toEqual('present')
  })
})