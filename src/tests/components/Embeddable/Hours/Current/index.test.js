import React from 'react'
import { Provider } from 'react-redux'
import { mount, configure } from 'enzyme'
import { CurrentHoursContainer } from '../../../../../components/Embeddable/Hours/Current'
import Presenter from '../../../../../components/Embeddable/Hours/Current/presenter'
import configureStore from 'redux-mock-store'
import * as statuses from '../../../../../constants/APIStatuses'
import InlineContainer from '../../../../../components/Hours/InlineContainer'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <CurrentHoursContainer {...props} />
    </Provider>)
}

let enzymeWrapper
let props
describe('components/Embeddable/Hours/Current/Container', () => {
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

  it('only renders InlineContainer with hoursEntry status and Presenter', () => {
    expect(enzymeWrapper
      .containsMatchingElement(
        <InlineContainer
          status={props.hoursEntry.status}
          hoursEntry={props.hoursEntry}
          presenter={Presenter} />))
      .toBe(true)
  })

  it('calls the bound fetch hours action on load', () => {
    expect(props.fetchHours.mock.calls.length).toBe(1)
  })
})
