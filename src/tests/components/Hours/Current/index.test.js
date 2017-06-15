import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { CurrentHoursContainer } from '../../../../components/Hours/Current'
import PagePresenter from '../../../../components/Hours/Current/presenter'
import configureStore from 'redux-mock-store'
import * as statuses from '../../../../constants/APIStatuses'
import InlineContainer from '../../../../components/Hours/InlineContainer'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <CurrentHoursContainer {...props} />
    </Provider>)
}

let enzymeWrapper
let props
describe('components/Hours/Current/Container', () => {
  beforeEach(() => {
    props = {
      hoursEntry: { status: statuses.NOT_FETCHED },
      fetchHours: jest.fn(),
      jsonHoursApiKey: 'hesburghlibrary',
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('only renders InlineContainer with hoursEntry status and PagePresenter', () => {
    expect(enzymeWrapper
      .containsMatchingElement(
        <InlineContainer
          status={props.hoursEntry.status}
          hoursEntry={props.hoursEntry}
          presenter={PagePresenter} />))
      .toBe(true)
  })

  it('calls the bound fetch hours action on load', () => {
    expect(props.fetchHours.mock.calls.length).toBe(1)
  })
})
