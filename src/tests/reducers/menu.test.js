import reducer, { hasNavigation } from 'reducers/menu'
import * as actions from 'actions/menu'
import * as statuses from 'constants/APIStatuses'

describe('Favorites reducer', () => {
  const dummyInitialState = {
    foo: {
      bar: 'baz',
    },
  }

  it('should return the initial state', () => {
    expect(
      reducer(dummyInitialState, {})
    ).toEqual(dummyInitialState)
  })

  it('should handle OPEN_MENU', () => {
    expect(
      reducer(undefined, {
        type: actions.OPEN_MENU,
        menuId: 13,
      })
    ).toMatchObject({
      menuId: 13,
    })
  })

  it('should handle CLOSE_MENUS', () => {
    expect(
      reducer({ menuId: 1 }, {
        type: actions.CLOSE_MENUS,
        menuId: 13,
      }).menuId
    ).toBeFalsy()
  })

  it('should handle NAV_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: actions.NAV_REQUEST,
      })
    ).toMatchObject({
      status: statuses.FETCHING,
    })
  })

  it('should handle NAV_RECEIVE', () => {
    expect(
      reducer(undefined, {
        type: actions.NAV_RECEIVE,
        status: statuses.SUCCESS,
      })
    ).toMatchObject({
      status: statuses.SUCCESS,
    })
  })

  it('should replace internal links after NAV_RECEIVE if supplied', () => {
    const suppliedInternalLinks = [
      {
        sys: {
          id: '1234abcd',
        },
        fields: {
          workIt: 'harder',
          makeIt: 'better',
          doIt: 'faster',
          makes: {
            us: 'stronger',
          },
        },
      },
    ]
    const actionData = {
      sys: {},
      fields: {
        columns: [{
          sys: {},
          fields: {
            columns: [{
              sys: {},
              fields: {
                sections: [{
                  sys: {},
                  fields: {
                    links: [
                      {
                        sys: {
                          id: '1234abcd',
                          contentType: {
                            sys: {
                              id: 'internalLink',
                            },
                          },
                        },
                        fields: {
                          ignoreMe: 'I get removed',
                        },
                      },
                      {
                        sys: {
                          id: 'qwertyuiop',
                          contentType: {
                            sys: {
                              id: 'internalLink',
                            },
                          },
                        },
                        fields: {
                          hello: 'world',
                        },
                      },
                    ]
                  },
                }],
              },
            }],
          },
        }],
      },
    }

    expect(
      reducer(undefined, {
        type: actions.NAV_RECEIVE,
        status: statuses.SUCCESS,
        data: actionData,
        internalLinks: suppliedInternalLinks,
      })
    ).toMatchObject({
      status: statuses.SUCCESS,
      data: {
        fields: {
          columns: [{
            fields: {
              columns: [{
                fields: {
                  sections: [{
                    fields: {
                      links: [
                        suppliedInternalLinks[0],
                        actionData.fields.columns[0].fields.columns[0].fields.sections[0].fields.links[1],
                      ],
                    },
                  }],
                },
              }],
            },
          }],
        },
      },
    })
  })

  describe('hasNavigation', () => {
    it('should return true when received success', () => {
      const result = hasNavigation({}, {
        type: actions.NAV_RECEIVE,
        status: statuses.SUCCESS,
      })
      expect(result).toBe(true)
    })

    it('should return false when received error', () => {
      const result = hasNavigation({}, {
        type: actions.NAV_RECEIVE,
        status: statuses.ERROR,
      })
      expect(result).toBe(false)
    })
  })
})
