import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Contentful/StaticContent/Alert/presenter'
import PageAlert from 'components/Contentful/Alert/Page'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Contentful/StaticContent/Alert/presenter', () => {
  beforeEach(() => {
    props = {
      cfStatic: {
        fields: {
          alerts: [],
        },
      },
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a PageAlert component', () => {
    expect(enzymeWrapper.find(PageAlert).exists()).toBe(true)
  })
})
