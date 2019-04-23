import React from 'react'
import { shallow } from 'enzyme'
import Alphabet from 'components/DatabaseList/Alphabet/index.js'
import Link from 'components/Interactive/Link'

let setup = () => {
  return shallow(<Alphabet />)
}

let enzymeWrapper

describe('components/DatabaseList/Alphabet/index.js', () => {
  beforeEach(() => {
    enzymeWrapper = setup()
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('renders an aside', () => {
    expect(enzymeWrapper.find('aside').exists()).toBe(true)
  })

  it('renders a Link for each alphabet letter (and the # sign)', () => {
    'abcdefghijklmnopqrstuvwxyz#'.split('').forEach((letter) => {
      const have = <Link>{letter.toUpperCase()}</Link>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })
})
