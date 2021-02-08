import React from 'react'
import { shallow } from 'enzyme'
import Chat from 'components/Chat'

let enzymeWrapper

const setup = (props) => {
  return shallow(<Chat {...props} />)
}

describe('components/Chat', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup()
  })

  it('should render a placeholder div for libraryh3lp', () => {
    const element = <div className='libraryh3lp needs-js' aria-hidden='true' />
    expect(enzymeWrapper.containsMatchingElement(element)).toBe(true)
  })
})
