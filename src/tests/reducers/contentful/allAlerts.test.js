import reducer from 'reducers/contentful/allAlerts'
import * as actions from 'actions/contentful/allAlerts'
import * as statuses from 'constants/APIStatuses'

describe('allAlerts reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_ALLALERTS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_ALLALERTS,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_ALLALERTS', () => {
    const status = 'some status'
    const libraryAlert = {
      sys: { id: '1' },
      fields: {
        domains: ['library'],
      },
    }
    const illAlert = {
      sys: { id: '2' },
      fields: {
        domains: ['illiad'],
      },
    }
    const allAlert = {
      sys: { id: '3' },
      fields: {
        domains: [
          'primo',
          'primoNDU',
          'primoHCC',
          'library',
          'illiad',
        ],
      },
    }

    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_ALLALERTS,
        status: status,
        allAlerts: [
          libraryAlert,
          illAlert,
          allAlert,
        ],
      })
    ).toEqual({
      status: status,
      json: [
        libraryAlert,
        allAlert,
      ],
    })
  })
})
