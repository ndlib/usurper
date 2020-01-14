import {
  getFavorites,
  getAllFavorites,
  addFavorite,
  removeFavorite,
  setFavorites,
  clearUpdateFavorites,
  clearAllFavorites,
  convertContentfulToFavorites,
  searchFavorites,
  KIND,
  RECEIVE_FAVORITES,
  REQUEST_FAVORITES,
  RECEIVE_UPDATE_FAVORITES,
  REQUEST_UPDATE_FAVORITES,
  RECEIVE_SEARCH_FAVORITES,
  REQUEST_SEARCH_FAVORITES,
} from 'actions/personal/favorites'
import { REQUEST_UPDATE_SETTINGS, DEFAULT_LIBRARY, KIND as SETTINGS_KIND } from 'actions/personal/settings'
import Config from 'shared/Configuration'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const state = {
  personal: {
    login: {
      token: 'fake token',
    },
  },
}

const favoriteResponse = {
  key: 'link-1',
  title: 'test',
  url: 'http://www.link.url/',
}

const favoritesResponse = [ favoriteResponse ]

const contentfulInternalLinks = [
  {
    sys: {
      id: '123',
      contentType: {
        sys: { id: 'internalLink' }
      },
    },
    fields: {
      usePageTitle: true,
      page: {
        sys: { id: 'somePage' },
        fields: {
          title: 'use me',
          slug: 'path/goes/here'
        }
      },
      title: 'not me',
    },
    order: 12,
  },
]

const contentfulResources = [
  {
    sys: {
      id: '456',
      contentType: {
        sys: { id: 'resource' }
      },
    },
    fields: {
      urls: [
        {
          title: 'link 1',
          url: 'the/link',
        },
        {
          title: 'link 2',
          url: 'is/here',
        }
      ],
      title: 'db',
    },
  }
]

const contentfulExternalLinks = [
  {
    sys: {
      id: '789',
      contentType: {
        sys: { id: 'externalLink' }
      },
    },
    fields: {
      url: 'link/path/here',
      title: 'title me',
    },
  },
]

describe('favorites fetch action creator', () => {
  beforeEach(() => {
    nock(Config.userPrefsAPI)
      .defaultReplyHeaders({
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Authorization",
        "Content-Type": "application:json",
      })
      .intercept(() => true, 'OPTIONS')
      .reply(204, null)
      .persist()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  afterAll(() => {
    nock.restore()
  })

  describe('getFavorites', () => {
    describe('on success', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .get(/favorites/)
          .reply(200, favoritesResponse)
          .persist()
      })

      it('should first create a REQUEST_FAVORITES action', () => {
        const type = KIND.subjects
        const expectedAction = {
          type: REQUEST_FAVORITES,
          kind: type,
        }

        const store = mockStore(state)
        store.dispatch(getFavorites(type))
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })

      it('should create a RECEIVE_FAVORITES action', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_FAVORITES,
          kind: type,
          state: statuses.SUCCESS,
          items: favoritesResponse,
        }

        const store = mockStore(state)
        return store.dispatch(getFavorites(type))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })

    describe('on error', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .get(/favorites/)
          .reply(401)
          .persist()
      })

      it('should create a RECEIVE_FAVORITES action with a status of error', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_FAVORITES,
          kind: type,
          state: statuses.ERROR,
        }

        const store = mockStore(state)
        return store.dispatch(getFavorites(type))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })
  })

  describe('addFavorite', () => {
    describe('on success', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .post(/favorites/)
          .reply(200, favoriteResponse)
          .persist()
      })

      it('should first create a REQUEST_UPDATE_FAVORITES action', () => {
        const type = KIND.subjects
        const expectedAction = {
          type: REQUEST_UPDATE_FAVORITES,
          kind: type,
        }

        const store = mockStore(state)
        store.dispatch(addFavorite(type, 'key', 'title', 'url'))
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })

      it('should create a RECEIVE_UPDATE_FAVORITES action', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_UPDATE_FAVORITES,
          kind: type,
          state: statuses.SUCCESS,
        }

        const store = mockStore(state)
        return store.dispatch(addFavorite(type, 'key', 'title', 'url'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })

    describe('on error', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .post(/favorites/)
          .reply(401)
          .persist()
      })

      it('should create a RECEIVE_UPDATE_FAVORITES action with a status of error', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_UPDATE_FAVORITES,
          kind: type,
          state: statuses.ERROR,
        }

        const store = mockStore(state)
        return store.dispatch(addFavorite(type, 'key', 'title', 'url'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })
  })

  describe('removeFavorite', () => {
    describe('on success', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .delete(/favorites/)
          .reply(200, favoritesResponse)
          .persist()
      })

      it('should first create a REQUEST_UPDATE_FAVORITES action', () => {
        const type = KIND.subjects
        const expectedAction = {
          type: REQUEST_UPDATE_FAVORITES,
          kind: type,
        }

        const store = mockStore(state)
        store.dispatch(removeFavorite(type, 'key'))
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })

      it('should create a RECEIVE_UPDATE_FAVORITES action', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_UPDATE_FAVORITES,
          kind: type,
          state: statuses.SUCCESS,
        }

        const store = mockStore(state)
        return store.dispatch(removeFavorite(type, 'key'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })

    describe('on error', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .delete(/favorites/)
          .reply(401)
          .persist()
      })

      it('should create a RECEIVE_UPDATE_FAVORITES action with a status of error', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_UPDATE_FAVORITES,
          kind: type,
          state: statuses.ERROR,
        }

        const store = mockStore(state)
        return store.dispatch(removeFavorite(type, 'key'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })
  })

  describe('setFavorites', () => {
    describe('on success', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .post(/favorites/)
          .reply(200, favoritesResponse)
          .persist()
      })

      it('should first create a REQUEST_UPDATE_FAVORITES action', () => {
        const type = KIND.subjects
        const expectedAction = {
          type: REQUEST_UPDATE_FAVORITES,
          kind: type,
        }

        const store = mockStore(state)
        store.dispatch(setFavorites(type, favoritesResponse))
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })

      it('should create a RECEIVE_UPDATE_FAVORITES action', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_UPDATE_FAVORITES,
          kind: type,
          state: statuses.SUCCESS,
        }

        const store = mockStore(state)
        return store.dispatch(setFavorites(type, favoritesResponse))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })

    describe('on error', () => {
      beforeEach(() => {
        nock(Config.userPrefsAPI)
          .post(/favorites/)
          .reply(401)
          .persist()
      })

      it('should create a RECEIVE_UPDATE_FAVORITES action with a status of error', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_UPDATE_FAVORITES,
          kind: type,
          state: statuses.ERROR,
        }

        const store = mockStore(state)
        return store.dispatch(setFavorites(type, favoritesResponse))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })
  })

  describe('clearAllFavorites', () => {
    beforeEach(() => {
      nock(Config.userPrefsAPI)
        .post(() => true)
        .reply(200, '')
        .persist()
    })

    it('should send actions to the store for each favorite setting', () => {
      const store = mockStore(state)
      return store.dispatch(clearAllFavorites())
        .then(() => {
          expect(store.getActions()).toEqual(expect.arrayContaining([
            {
              type: REQUEST_UPDATE_FAVORITES,
              kind: KIND.databases,
            },
            {
              type: REQUEST_UPDATE_FAVORITES,
              kind: KIND.subjects,
            },
            {
              type: REQUEST_UPDATE_SETTINGS,
              kind: SETTINGS_KIND.homeLibrary,
            },
            {
              type: REQUEST_UPDATE_SETTINGS,
              kind: SETTINGS_KIND.hideHomeFavorites,
            },
            {
              type: REQUEST_UPDATE_SETTINGS,
              kind: SETTINGS_KIND.defaultSearch,
            },
          ]))
        })
    })
  })

  describe('searchFavorites', () => {
    describe('on success', () => {
      beforeEach(() => {
        nock(Config.contentfulAPI)
          .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
          .get('/query')
          .query(fullQuery => fullQuery.query.includes('content_type=resource'))
          .reply(200, contentfulResources)
          .get('/query')
          .query(fullQuery => fullQuery.query.includes('content_type=externalLink'))
          .reply(200, contentfulExternalLinks)
          .get('/query')
          .query(fullQuery => fullQuery.query.includes('content_type=internalLink'))
          .reply(200, contentfulInternalLinks)
          .persist()
      })

      it('should first create a REQUEST_SEARCH_FAVORITES action', () => {
        const type = KIND.subjects
        const expectedAction = {
          type: REQUEST_SEARCH_FAVORITES,
          kind: type,
        }

        const store = mockStore(state)
        store.dispatch(searchFavorites(type, 'search text'))
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })

      it('should receive subject favorites from Contentful', () => {
        const type = KIND.subjects
        const expectedAction = {
          type: RECEIVE_SEARCH_FAVORITES,
          kind: type,
          state: statuses.SUCCESS,
          searchText: 'search text',
          results: convertContentfulToFavorites(contentfulInternalLinks, type),
        }

        const store = mockStore(state)
        return store.dispatch(searchFavorites(type, 'search text'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })

      it('should receive database favorites from Contentful', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_SEARCH_FAVORITES,
          kind: type,
          state: statuses.SUCCESS,
          searchText: 'search text',
          results: convertContentfulToFavorites(contentfulResources.concat(contentfulExternalLinks), type),
        }

        const store = mockStore(state)
        return store.dispatch(searchFavorites(type, 'search text'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })

    describe('on error', () => {
      beforeEach(() => {
        nock(Config.contentfulAPI)
          .defaultReplyHeaders({ 'Access-Control-Allow-Origin': '*' })
          .get(() => true)
          .reply(401)
          .persist()
      })

      it('should create a RECEIVE_FAVORITES action with a status of error', () => {
        const type = KIND.databases
        const expectedAction = {
          type: RECEIVE_SEARCH_FAVORITES,
          kind: type,
          state: statuses.ERROR,
        }

        const store = mockStore(state)
        return store.dispatch(searchFavorites(type, 'search text'))
          .then(() => {
            expect(store.getActions()).toEqual(expect.arrayContaining([expect.objectContaining(expectedAction)]))
          })
      })
    })
  })

  describe('convertContentfulToFavorites', () => {
    it('should convert subject correctly', () => {
      const result = convertContentfulToFavorites(contentfulInternalLinks, KIND.subjects)
      expect(result).toEqual([
        {
          itemKey: '123',
          title: 'use me',
          url: '/path/goes/here',
          order: 12,
        },
      ])
    })

    it('should convert database with multiple urls correctly', () => {
      const result = convertContentfulToFavorites(contentfulResources, KIND.databases)
      expect(result).toEqual([
        {
          itemKey: '456_link_0',
          title: 'db - link 1',
          url: 'the/link',
        },
        {
          itemKey: '456_link_1',
          title: 'db - link 2',
          url: 'is/here',
        },
      ])
    })

    it('should convert external link correctly', () => {
      const result = convertContentfulToFavorites(contentfulExternalLinks, KIND.databases)
      expect(result).toEqual([
        {
          itemKey: '789_link_0',
          title: 'title me',
          url: 'link/path/here',
        },
      ])
    })
  })
})
