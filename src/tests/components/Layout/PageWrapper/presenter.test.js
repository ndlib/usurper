import React from 'react'
import { shallow } from 'enzyme'
import PageWrapper from 'components/Layout/PageWrapper/presenter.js'
import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'

const setup = (props) => {
  return shallow(
    <PageWrapper {...props} />
  )
}

let enzymeWrapper
let props = {
  clickOnPage: jest.fn(),
  children: <div>CHILD CONTENT</div>,
}

describe('components/Layout/PageWrapper/presenter.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('Renders a PageWrapper component with child content', () => {
    expect(enzymeWrapper.containsMatchingElement(props.children)).toBe(true)
  })

  it('Renders a Header component', () => {
    expect(enzymeWrapper.containsMatchingElement(<Header {...props} />)).toBe(true)
  })

  it('Renders a Footer component', () => {
    expect(enzymeWrapper.containsMatchingElement(<Footer />)).toBe(true)
  })
})
