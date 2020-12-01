import reducer from 'reducers/contentful/subjects'
import * as actions from 'actions/contentful/subjects'
import * as statuses from 'constants/APIStatuses'

describe('Subjects reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_SUBJECTS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_SUBJECTS,
        depth: 3,
      })
    ).toEqual({
      status: statuses.FETCHING,
      depth: 3,
    })
  })

  it('should handle CF_RECEIVE_SUBJECTS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_SUBJECTS,
        status: 'status from receiveSubjects',
        depth: 1,
        data: {
          fields: {
            items: [
              {
                sys: {
                  contentType: {
                    sys: {
                      id: 'internalLink',
                    },
                  },
                },
                fields: {
                  page: null,
                  title: 'test title',
                  usePageTitle: false,
                },
              },
              {
                sys: {
                  contentType: {
                    sys: {
                      id: 'foo',
                    },
                  },
                },
                fields: {
                  text: 'bar',
                },
              },
            ],
          },
        },
      })
    ).toEqual({
      status: 'status from receiveSubjects',
      depth: 1,
      data: [
        {
          sys: {
            contentType: {
              sys: {
                id: 'internalLink',
              },
            },
          },
          fields: {
            page: null,
            title: 'test title',
            usePageTitle: false,
          },
          linkText: 'test title',
        },
        {
          sys: {
            contentType: {
              sys: {
                id: 'foo',
              },
            },
          },
          fields: {
            text: 'bar',
          },
        },
      ],
    })
  })
})
