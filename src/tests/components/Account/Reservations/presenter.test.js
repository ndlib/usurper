import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import typy from 'typy'
import AccountPageWrapper from 'components/Account/AccountPageWrapper'
import InlineLoading from 'components/Messages/InlineLoading'
import Table from 'components/Table'
import ReservationsPresenter from 'components/Account/Reservations/presenter'

const setup = (props) => {
  return shallow(<ReservationsPresenter {...props} />)
}

let enzymeWrapper
let props
describe('components/Account/Reservations/presenter', () => {
  describe('while loading', () => {
    beforeEach(() => {
      props = {
        isLoading: true,
        startDate: moment('2020-01-02', 'YYYY-MM-DD'),
        endDate: moment('2020-12-31', 'YYYY-MM-DD'),
        reservations: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a loading indicator', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
    })

    it('should not render Table component with data', () => {
      expect(enzymeWrapper.find(Table).exists()).toBe(false)
    })
  })

  describe('with data', () => {
    beforeEach(() => {
      props = {
        isLoading: false,
        startDate: moment('2020-01-02', 'YYYY-MM-DD'),
        endDate: moment('2020-12-31', 'YYYY-MM-DD'),
        reservations: [
          {
            foo: 'bar',
          },
        ],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should use AccountPageWrapper', () => {
      expect(enzymeWrapper.find(AccountPageWrapper).exists()).toBe(true)
    })

    it('should have title with formatted date range', () => {
      const pageWrapper = enzymeWrapper.find(AccountPageWrapper)
      expect(pageWrapper.props().title).toEqual(expect.stringContaining('January 2nd – December 31st'))
    })

    it('should render Table component with data', () => {
      const table = enzymeWrapper.find(Table)
      expect(table.exists()).toBe(true)
      expect(table.props().data).toHaveLength(props.reservations.length)
    })

    it('should not render a loading indicator', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
    })
  })
})
