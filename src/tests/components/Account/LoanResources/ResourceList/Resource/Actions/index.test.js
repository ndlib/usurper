import { mapStateToProps } from 'components/Account/LoanResources/ResourceList/Resource/Actions'
import React, { Component } from 'react'
import Config from 'shared/Configuration'
import { renewAleph } from '../../../../../../../actions/personal/alephRenewal'

const illViewForm = '67'
const illWebForm = '75'

let state
let props
describe('components/Account/LoanResources/ResourceList/Resource/Actions/index.js', () => {
  describe('mapStateToProps with statusText', () => {
    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        alephId: 1234,
        renewal: {
          test: {
            data: {
              statusText: 'fake status',
            },
          },
        },
        borrowed: true,
      }

      state = {
        itemAction: 'test',
      }
    })

    afterEach(() => {
      props = undefined
      state = undefined
    })

    it('should contain the statusText as the renewMessage', () => {
      let item = props.item
      let renewal = props.renewal
      expect(mapStateToProps(state, props)).toHaveProperty('renewMessage', renewal[item.barcode].data.statusText)
    })

    it('should have the correct actionResponse', () => {
      expect(mapStateToProps(state, props)).toHaveProperty('actionResponse', state.itemAction)
    })

    it('should have correct illWebUrl', () => {
      let item = props.item
      expect(mapStateToProps(state, props)).toHaveProperty('illWebUrl', Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber))
    })

    it('should have correct illViewUrl', () => {
      let item = props.item
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
        alephId: 1234,
        renewal: {
          test: {
            data: {
              renewStatus: 304,
            },
          },
        },
        borrowed: true,
      }

      state = {
        itemAction: 'test',
      }
    })

    afterEach(() => {
      props = undefined
      state = undefined
    })

    it('should contain the text for renewStatus = 304 as the renewMessage', () => {
      let item = props.item
      let renewal = props.renewal
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
        alephId: 1234,
        renewal: {
          test: {
            data: {
              renewStatus: 200,
            },
          },
        },
        borrowed: true,
      }

      state = {
        itemAction: 'test',
      }
    })

    afterEach(() => {
      props = undefined
      state = undefined
    })

    it('should contain the renewMessage for renewStatus = 200', () => {
      let item = props.item
      let renewal = props.renewal
      expect(mapStateToProps(state, props)).toHaveProperty('renewMessage', 'Renew Successful')
    })
  })

  describe('mapStateToProps with no renewal', () => {
    beforeEach(() => {
      props = {
        item: {
          barcode: 'test',
          transactionNumber: 123456789,
        },
        alephId: 1234,
        renewal: null,
        borrowed: true,
      }

      state = {
        itemAction: 'test',
      }
    })

    afterEach(() => {
      props = undefined
      state = undefined
    })

    it('should contain undefined as the renewMessage', () => {
      let item = props.item
      let renewal = props.renewal
      expect(mapStateToProps(state, props)).toHaveProperty('renewMessage', undefined)
    })
  })
})
