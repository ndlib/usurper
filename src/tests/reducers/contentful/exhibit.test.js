import reducer from 'reducers/contentful/exhibit'
import * as actions from 'actions/contentful/exhibit'
import * as statuses from 'constants/APIStatuses'

describe('exhibit reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_EXHIBIT', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_EXHIBIT,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_EXHIBIT', () => {
    const status = 'some status'
    const inExhibit = {
      sys: {
        id: 'item id',
      },
      fields: {
        test: 'data',
        title: 'your title',
        slug: 'your slug',
        preferOnHomepage: false,
        type: 'blah',
        externalUrl: 'go.here',
        representationalImage: {
          sample: 'sample',
        },
      },
    }

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_EXHIBIT,
      status: status,
      exhibit: inExhibit,
    })
    expect(response).toMatchObject({
      status: status,
      json: {
        id: 'item id',
        title: 'your title',
        slug: 'your slug',
        preferOnHomepage: false,
        type: 'blah',
        linkTo: 'go.here',
        image: {
          sample: 'sample',
        },
      },
    })
  })

  it('should map exhibit with event correctly', () => {
    const inExhibit = {
      sys: { id: '2' },
      fields: {
        slug: 'foo',
        event: {
          sys: { id: 'someEvent' },
          fields: {
            slug: 'eventSlug',
            startDate: '2010-01-01T10:45:00-00:00',
            endDate: '2010-01-04T00:00:00-00:00',
            representationalImage: {
              does: 'stuff',
            },
          },
        },
      },
    }

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_EXHIBIT,
      status: 200,
      exhibit: inExhibit,
    })
    expect(response.json).toMatchObject({
      id: inExhibit.sys.id,
      slug: inExhibit.fields.slug,
      event: expect.objectContaining({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      }),
      image: inExhibit.fields.event.fields.representationalImage,
      linkTo: `/event/${inExhibit.fields.event.fields.slug}`,
    })
  })
})
