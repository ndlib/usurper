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

  it('should render a script from libraryh3lp', () => {
    const script = enzymeWrapper.find('script')
    expect(script.exists()).toBe(true)
    expect(script.props().src).toEqual(expect.stringContaining('libraryh3lp.com'))
  })
})
