import React from 'react'
import { shallow } from 'enzyme'
import InlineContainer from '../../../../components/Hours/InlineContainer'
import * as statuses from '../../../../constants/APIStatuses'

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
      expect(enzymeWrapper.html()).toBe('<div>Loading</div>')
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
      expect(enzymeWrapper.html()).toBe('<div></div>')
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
      expect(enzymeWrapper.html()).toBe('<div></div>')
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
      expect(enzymeWrapper.html()).toBe('<div></div>')
    })
  })
})
