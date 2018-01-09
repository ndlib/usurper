import React from 'react'
import { Provider } from 'react-redux'
import { mount, configure } from 'enzyme'
import configureStore from 'redux-mock-store'
import SearchOption from '../../../../../components/SearchDrawer/SearchOptionList/SearchOption'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <SearchOption {...props} />
    </Provider>
  )
}
let enzymeWrapper
let props = {
  item: {
    title: 'FAKE TITLE',
    description: 'A fake description',
  },
}

describe('component/SearchDrawer/SearchOptionList/SearchOption', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })
  afterEach(() => {
    enzymeWrapper = null
  })

  it('Renders a search option component with passed params', () => {
    expect(enzymeWrapper.find('li.uSearchOption').exists()).toBe(true)
  })

  it('Renders a title', () => {
    expect(enzymeWrapper.containsMatchingElement(<p>FAKE TITLE</p>)).toBe(true)
  })

  it('Renders a description', () => {
    expect(enzymeWrapper.containsMatchingElement(<small>A fake description</small>)).toBe(true)
  })
})
