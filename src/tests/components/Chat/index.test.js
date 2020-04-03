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

  it('should render an iframe to libraryh3lp', () => {
    const iframe = enzymeWrapper.find('iframe')
    expect(iframe.exists()).toBe(true)
    expect(iframe.props().src).toEqual(expect.stringContaining('libraryh3lp.com'))
  })
})
