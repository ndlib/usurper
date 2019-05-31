import reducer from 'reducers/favorites'
import { KIND } from 'actions/personal/favorites'
import * as actions from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

describe('Favorites reducer', () => {
  const expectedInitialState = {
    [KIND.databases]: {
      state: statuses.NOT_FETCHED,
    },
    [KIND.subjects]: {
      state: statuses.NOT_FETCHED,
    },
    update: {
      [KIND.databases]: {
        state: statuses.NOT_FETCHED,
      },
      [KIND.subjects]: {
        state: statuses.NOT_FETCHED,
      },
    },
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(expectedInitialState)
  })

  it('should handle REQUEST_FAVORITES', () => {
    expect(
      reducer(undefined, {
        type: actions.REQUEST_FAVORITES,
        kind: KIND.databases,
      })
    ).toMatchObject({
      [KIND.databases]: {
        state: statuses.FETCHING,
      },
    })
  })

  it('should handle RECEIVE_FAVORITES', () => {
    expect(
      reducer(undefined, {
        type: actions.RECEIVE_FAVORITES,
        kind: KIND.subjects,
        state: 'status from receiveFavorites',
        items: [{
          text: 'some item data',
        }],
      })
    ).toMatchObject({
      [KIND.subjects]: {
        state: 'status from receiveFavorites',
        items: [{
          text: 'some item data',
        }],
      },
    })
  })
})
