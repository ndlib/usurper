import React from 'react'
import { shallow } from 'enzyme'
import InlineContainer from 'components/Hours/InlineContainer'
import * as statuses from 'constants/APIStatuses'
import InlineLoading from 'components/Messages/InlineLoading'
import HoursError from 'components/Hours/Error'

const setup = (hoursEntry, presenter) => {
  return shallow(<InlineContainer hoursEntry={hoursEntry} presenter={presenter} />)
}

describe('components/Hours/Page/presenter', () => {
  let enzymeWrapper
  let presenter

  describe('SUCCESS', () => {
    beforeEach(() => {
      presenter = jest.fn()
      presenter.mockReturnValue(null)

      enzymeWrapper = setup({ status: statuses.SUCCESS }, presenter)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('calls the presenter', () => {
      expect(presenter.mock.calls.length).toBe(1)
    })
  })

  describe('FETCHING', () => {
    beforeEach(() => {
      presenter = jest.fn()
      enzymeWrapper = setup({ status: statuses.FETCHING }, presenter)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('does not call the presenter', () => {
      expect(presenter.mock.calls.length).toBe(0)
    })

    it('sends a loading response', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
    })
  })

  describe('NOT_FETCHING', () => {
    beforeEach(() => {
      presenter = jest.fn()
      enzymeWrapper = setup({ status: statuses.NOT_FETCHING }, presenter)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('does not call the presenter', () => {
      expect(presenter.mock.calls.length).toBe(0)
    })

    it('sends a empty response', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })

  describe('ERROR', () => {
    beforeEach(() => {
      presenter = jest.fn()
      enzymeWrapper = setup({ status: statuses.ERROR }, presenter)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('does not call the presenter', () => {
      expect(presenter.mock.calls.length).toBe(0)
    })

    it('sends a empty response', () => {
      expect(enzymeWrapper.find(HoursError).exists()).toBe(true)
    })
  })

  describe('NOT_FOUND', () => {
    beforeEach(() => {
      presenter = jest.fn()
      enzymeWrapper = setup({ status: statuses.NOT_FOUND }, presenter)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('does not call the presenter', () => {
      expect(presenter.mock.calls.length).toBe(0)
    })

    it('sends a empty response', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})
