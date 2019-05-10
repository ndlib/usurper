import React, { Component } from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Actions, {
  ActionsContainer,
  mapStateToProps,
  mapDispatchToProps,
} from 'components/Account/ResourceList/Resource/Actions'
import Presenter from 'components/Account/ResourceList/Resource/Actions/presenter'

import { renewAleph } from 'actions/personal/alephRenewal'

import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

const illViewForm = '67'
const illWebForm = '75'

let props
let state

describe('components/Account/ResourceList/Resource/Actions/index.js', () => {
  describe('render', () => {
    let enzymeWrapper

    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        listType: 'borrowed',
        onRenewClick: jest.fn(),
      }
      enzymeWrapper = shallow(<ActionsContainer {...props} />)
    })

    it('should render presenter with props', () => {
      const find = <Presenter {...props} />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should create onRenewClick prop', () => {
      const middlewares = [ thunk ]
      const store = configureMockStore(middlewares)()
      expect(mapDispatchToProps(store.dispatch).onRenewClick).toEqual(expect.any(Function))
    })
  })

  describe('mapStateToProps with statusText', () => {
    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        listType: 'borrowed',
      }

      state = {
        itemAction: 'test',
        personal: {
          user: {
            state: statuses.SUCCESS,
            alephId: 'MLC1234',
          },
        },
        renewal: {
         test: {
           data: {
             statusText: 'fake status',
           },
         },
        },
      }
    })

    it('should contain the statusText as the renewMessage', () => {
      const item = props.item
      const renewal = state.renewal
      expect(mapStateToProps(state, props)).toHaveProperty('renewMessage', renewal[item.barcode].data.statusText)
    })

    it('should have the correct actionResponse', () => {
      expect(mapStateToProps(state, props)).toHaveProperty('actionResponse', state.itemAction)
    })

    it('should have correct illWebUrl', () => {
      const item = props.item
      expect(mapStateToProps(state, props)).toHaveProperty('illWebUrl', Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber))
    })

    it('should have correct illViewUrl', () => {
      const item = props.item
      expect(mapStateToProps(state, props)).toHaveProperty('illWebUrl', Config.illiadBaseURL.replace('<<form>>', illViewForm).replace('<<value>>', item.transactionNumber))
    })
  })

  describe('mapStateToProps with renewStatus = 304', () => {
    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        listType: 'borrowed',
      }

      state = {
        itemAction: 'test',
        personal: {
          user: {
            state: statuses.SUCCESS,
            alephId: 'MLC1234',
          },
        },
        renewal: {
         test: {
           data: {
             renewStatus: 304,
           },
         },
        },
      }
    })

    it('should contain the text for renewStatus = 304 as the renewMessage', () => {
      const item = props.item
      const renewal = props.renewal
      expect(mapStateToProps(state, props)).toHaveProperty('renewMessage', 'Too early to renew. Try again closer to due date.')
    })
  })

  describe('mapStateToProps with renewStatus = 200', () => {
    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        listType: 'borrowed',
      }

      state = {
        itemAction: 'test',
        personal: {
          user: {
            state: statuses.SUCCESS,
            alephId: 'MLC1234',
          },
        },
        renewal: {
         test: {
           data: {
             renewStatus: 200,
           },
         },
        },
      }
    })

    it('should contain the renewMessage for renewStatus = 200', () => {
      let item = props.item
      let renewal = props.renewal
      expect(mapStateToProps(state, props)).toHaveProperty('renewMessage', 'Renew Successful')
    })

    it('should not have a renewal message with invalid listType', () => {
      const item = props.item
      const renewal = props.renewal
      props.listType = 'bogus'
      expect(mapStateToProps(state, props).renewMessage).toBeFalsy()
    })
  })

  describe('mapStateToProps with no renewal', () => {
    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        listType: 'borrowed',
      }

      state = {
        itemAction: 'test',
        personal: {
          user: {
            state: statuses.SUCCESS,
            alephId: 'MLC1234',
          },
        },
      }
    })

    it('should not have a renewal message', () => {
      const item = props.item
      const renewal = props.renewal
      expect(mapStateToProps(state, props).renewMessage).toBeFalsy()
    })
  })
})
