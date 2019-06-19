import reducer from 'reducers/contentful/database'
import * as actions from 'actions/contentful/database'
import * as statuses from 'constants/APIStatuses'

describe('database reducer', () => {
  it('should return the initial state', () => {
    const expectedState = {
      defaultFavorites: {
        status: statuses.NOT_FETCHED,
      },
    }
    'abcdefghijklmnopqrstuvwxyz#'.split('').forEach((char) => {
      expectedState[char] = { status: statuses.NOT_FETCHED }
    })


    expect(
      reducer(undefined, {})
    ).toEqual(expectedState)
  })

  it('should handle CF_REQUEST_DATABASE_LETTER', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_DATABASE_LETTER,
        letter: 'a',
      })
    ).toMatchObject({
      a: {
        status: statuses.FETCHING,
      },
    })
  })

  it('should handle CF_RECEIVE_DATABASE_LETTER', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_DATABASE_LETTER,
        status: 'status from receiveLetter',
        letter: 'c',
        data: [{
          text: 'some item data',
        }],
      })
    ).toMatchObject({
      c: {
        status: 'status from receiveLetter',
        data: [{
          text: 'some item data',
        }],
      },
    })
  })

  it('should handle CF_REQUEST_DATABASE_DEFAULT_FAVORITES', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_REQUEST_DATABASE_DEFAULT_FAVORITES,
      })
    ).toMatchObject({
      defaultFavorites: {
        status: statuses.FETCHING,
      },
    })
  })

  it('should handle CF_RECEIVE_DATABASE_DEFAULT_FAVORITES', () => {
    expect(
      reducer(undefined, {
        type: actions.CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
        status: 'status from receiveDefaultDbFavorites',
        data: [{
          text: 'some item data',
        }],
      })
    ).toMatchObject({
      defaultFavorites: {
        status: 'status from receiveDefaultDbFavorites',
        data: [{
          text: 'some item data',
        }],
      },
    })
  })
})
