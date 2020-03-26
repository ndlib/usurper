import reducer from 'reducers/contentful/allRedirects'
import * as actions from 'actions/contentful/allRedirects'
import * as statuses from 'constants/APIStatuses'

describe('allRedirects reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      status: statuses.NOT_FETCHED,
      json: [],
    })
  })

  it('should handle CF_REQUEST_ALL_REDIRECTS', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_ALL_REDIRECTS,
      })
    ).toEqual({
      status: statuses.FETCHING,
      json: [],
    })
  })

  it('should handle CF_RECEIVE_ALL_REDIRECTS', () => {
    const status = 'someStatus'
    const localPath = {
      sys: { id: '1' },
      fields: {
        fromPath: '/test',
        toPath: '/somewhere',
        forwardPath: true,
        forwardQuery: true,
      },
    }
    const page = {
      sys: { id: '2' },
      fields: {
        fromPath: '/hi',
        toLink: {
          sys: {
            contentType: { sys: { id: 'page' }},
          },
          fields: {
            slug: 'sluggerMcSluggy',
          },
        },
        forwardPath: true,
        forwardQuery: false,
      },
    }
    const dynamicPage = {
      sys: { id: '3' },
      fields: {
        fromPath: '/yo',
        toLink: {
          sys: {
            contentType: { sys: { id: 'dynamicPage' }},
          },
          fields: {
            slug: 'slugfest',
          },
        },
        forwardPath: false,
        forwardQuery: true,
      },
    }
    const externalLink = {
      sys: { id: '4' },
      fields: {
        fromPath: '/here',
        toPath: 'https://www.ignore.me',
        toLink: {
          sys: {
            contentType: { sys: { id: 'externalLink' }},
          },
          fields: {
            url: 'https://follow.me',
          },
        },
        forwardPath: false,
        forwardQuery: false,
      },
    }
    const internalLink = {
      sys: { id: '5' },
      fields: {
        fromPath: '/place',
        toLink: {
          sys: {
            contentType: { sys: { id: 'internalLink' }},
          },
          fields: {
            page: {
              fields: {
                slug: 'goToThisSlug',
              },
            },
          },
        },
        forwardPath: false,
        forwardQuery: false,
      },
    }

    const redirects = [
      localPath,
      page,
      dynamicPage,
      externalLink,
      internalLink,
    ]

    const response = reducer(undefined, {
      type: actions.CF_RECEIVE_ALL_REDIRECTS,
      status: status,
      allRedirects: redirects,
    })
    expect(response.status).toEqual(status)
    expect(response.json).toHaveLength(redirects.length)

    expect(response.json[0]).toMatchObject({
      id: '1',
      fromPath: '/test',
      toPath: '/somewhere',
      forwardPath: true,
      forwardQuery: true,
    })
    expect(response.json[1]).toMatchObject({
      id: '2',
      fromPath: '/hi',
      toPath: '/sluggerMcSluggy',
      forwardPath: true,
      forwardQuery: false,
    })
    expect(response.json[2]).toMatchObject({
      id: '3',
      fromPath: '/yo',
      toPath: '/slugfest',
      forwardPath: false,
      forwardQuery: true,
    })
    expect(response.json[3]).toMatchObject({
      id: '4',
      fromPath: '/here',
      toPath: 'https://follow.me',
      forwardPath: false,
      forwardQuery: false,
    })
    expect(response.json[4]).toMatchObject({
      id: '5',
      fromPath: '/place',
      toPath: '/goToThisSlug',
      forwardPath: false,
      forwardQuery: false,
    })
  })
})
