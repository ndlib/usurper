import React from 'react'
import { shallow } from 'enzyme'
import ChatPage from 'components/ChatPage'
import PageTitle from 'components/Layout/PageTitle'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticBody from 'components/Contentful/StaticContent/Body'

let enzymeWrapper

const setup = (props) => {
  return shallow(<ChatPage {...props} />)
}

describe('components/ChatPage', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    const props = {
      location: {
        search: '?preview=true',
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render a PageTitle', () => {
    expect(enzymeWrapper.find(PageTitle).exists()).toBe(true)
  })

  it('should render a StaticAlert', () => {
    const alert = enzymeWrapper.find(StaticAlert)
    expect(alert.exists()).toBe(true)
    expect(alert.props().preview).toBe(true)
  })

  it('should render a StaticBody', () => {
    const body = enzymeWrapper.find(StaticBody)
    expect(body.exists()).toBe(true)
    expect(body.props().preview).toBe(true)
  })
})
