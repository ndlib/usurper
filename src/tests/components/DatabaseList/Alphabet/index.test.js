import React from 'react'
import { shallow } from 'enzyme'
import Alphabet from 'components/DatabaseList/Alphabet/index.js'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<Alphabet {...props} />)
}

let enzymeWrapper

describe('components/DatabaseList/Alphabet/index.js', () => {
  const props = {
    history: {
      location: {
        search: '?test=test'
      },
    },
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
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

  it('maintains query parameters for link urls', () => {
    // String ends with same query params as those passed in to props
    const escapedInput = props.history.location.search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedInput + '$')

    'abcdefghijklmnopqrstuvwxyz#'.split('').forEach((letter) => {
      const found = enzymeWrapper.findWhere(el => el.type() === Link && el.props().to.startsWith(`/databases/${encodeURIComponent(letter)}`))
      expect(found.exists()).toBe(true)
      expect(found.props().to).toEqual(expect.stringMatching(regex))
    })
  })
})
