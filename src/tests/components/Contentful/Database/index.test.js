import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import ContentfulDatabase, { ContentfulDatabaseContainer } from 'components/Contentful/Database'
import Presenter from 'components/Contentful/Database/presenter'
import PresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let store
let props
let state

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<ContentfulDatabase store={store} {...ownProps} />)
}

const DATABASE_ID = 'abc1234'

describe('components/Contentful/Database', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    state = undefined
  })

  describe('with store', () => {
    beforeEach(() => {
      state = {
        cfEntry: {
          [DATABASE_ID]: {
            status: statuses.SUCCESS,
            json: {
              sys: {
                id: DATABASE_ID,
              },
              fields: {
                access: 'access is here.',
                accessNotes: 'I am a silly little note',
                includes: 'multiline\ntext is included\n\nin this field',
                platform: 'foo',
                publisher: 'bar',
                provider: 'baz',
              },
            }
          },
        },
        personal: {
          login: 'token',
        },
      }
      props = {
        location: {
          search: '?preview=true',
        },
        match: {
          params: {
            id: DATABASE_ID,
          },
        },
      }
      enzymeWrapper = setup(state, props)
    })

    it('should render a PresenterFactory with appropriate props', () => {
      const found = enzymeWrapper.dive().dive().find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().presenter).toEqual(Presenter)
      expect(found.props().status).toEqual(statuses.SUCCESS)
      expect(found.props().props).toMatchObject({
        cfDatabaseEntry: state.cfEntry[DATABASE_ID].json,
        fieldData: {
          access: {
            title: 'Access',
            data: 'access is here.<br />I am a silly little note',
          },
          includes: {
            title: 'Includes',
            data: 'multiline<br />text is included<br /><br />in this field',
          },
          platform: {
            title: 'Platform',
            data: 'foo',
          },
          publisher: {
            title: 'Publisher',
            data: 'bar',
          },
          provider: {
            title: 'Provider',
            data: 'baz',
          },
        },
      })
    })
  })

  describe('without store', () => {
    beforeEach(() => {
      props = {
        databaseId: DATABASE_ID,
        cfDatabaseEntry: {
          status: statuses.NOT_FETCHED,
        },
        location: {
          search: '?preview=true',
        },
        match: {
          params: {
            id: DATABASE_ID,
          },
        },
        fetchEntry: jest.fn(),
      }
      enzymeWrapper = shallow(<ContentfulDatabaseContainer {...props} />)
    })

    it('should call fetchEntry with preview flag', () => {
      expect(props.fetchEntry).toHaveBeenCalledWith(DATABASE_ID, null, true)
    })
  })
})
