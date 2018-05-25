import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { HoursPageContainer } from '../../../../components/Hours/Page'
import HoursPagePresenter from '../../../../components/Hours/Page/presenter'
import APIPresenterFactory from '../../../../components/APIPresenterFactory'
import configureStore from 'redux-mock-store'
import * as statuses from '../../../../constants/APIStatuses'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <HoursPageContainer {...props} />
    </Provider>)
}

let enzymeWrapper
let props
describe('components/Hours/Page/Container', () => {
  beforeEach(() => {
    props = {
      hoursEntry: { status: statuses.NOT_FETCHED, json: {} },
      servicePointsWithHours: [],
      combinedStatus: statuses.NOT_FETCHED,
      hoursStatus: statuses.NOT_FETCHED,
      fetchHours: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('only renders APIPresenterFactory with hoursEntry slice and HoursPagePresenter', () => {
    expect(enzymeWrapper.
      find('APIPresenterFactory').getElements().length).toBe(1)
  })

  it('calls the bound fetch hours action on load', () => {
    expect(props.fetchHours.mock.calls.length).toBe(1)
  })
})
