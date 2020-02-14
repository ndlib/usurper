import reducer from 'reducers/contentful/allExhibits'
import * as actions from 'actions/contentful/allExhibits'
import * as statuses from 'constants/APIStatuses'

describe('allExhibits reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
    })
  })

  it('should handle CF_REQUEST_ALL_EXHIBITS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_ALL_EXHIBITS,
      })
    ).toEqual({
      status: statuses.FETCHING,
    })
  })

  it('should handle CF_RECEIVE_ALL_EXHIBITS', () => {
    const status = 'some status'
    const exhibits = [
      {
        sys: { id: '1' },
        fields: {
          slug: 'bar',
          externalUrl: 'test',
          representationalImage: {
            blah: 'blah',
          },
        },
      },
      {
        sys: { id: '2' },
        fields: {
          slug: 'foo',
          event: {
            sys: { id: 'eventMe' },
            fields: {
              slug: 'eventSlug',
              startDate: '2010-01-01T10:45:00-00:00',
              endDate: '2010-01-01T11:45:00-00:00',
              representationalImage: {
                the: 'image',
              },
            },
          },
        },
      },
    ]

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_ALL_EXHIBITS,
      status: status,
      allExhibits: exhibits,
    })
    expect(response.status).toEqual(status)
    expect(response.json).toHaveLength(exhibits.length)

    expect(response.json[0]).toMatchObject({
      id: exhibits[0].sys.id,
      slug: exhibits[0].fields.slug,
      linkTo: exhibits[0].fields.externalUrl,
      image: exhibits[0].fields.representationalImage,
    })
    // Check that nested event references are mapped correctly
    expect(response.json[1]).toMatchObject({
      id: exhibits[1].sys.id,
      slug: exhibits[1].fields.slug,
      event: expect.objectContaining({
        startDate: expect.any(Date),
        endDate: expect.any(Date),
      }),
      linkTo: `/event/${exhibits[1].fields.event.fields.slug}`,
      image: exhibits[1].fields.event.fields.representationalImage,
    })
  })
})
