import React from 'react'
import { shallow } from 'enzyme'
import Alphabet from 'components/DatabaseList/Alphabet/index.js'
import Link from 'components/Interactive/Link'
import Accordion from 'components/Interactive/Accordion'

const setup = (props) => {
  return shallow(<Alphabet {...props} />)
}

let enzymeWrapper

describe('components/DatabaseList/Alphabet/index.js', () => {
  const props = {
    onLetterFilterApply: jest.fn(),
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

  it('renders a mobile-only Accordion component', () => {
    const found = enzymeWrapper.find(Accordion)
    expect(found.exists()).toBe(true)
    expect(found.props().mobileOnly).toBe(true)
  })

  it('renders a clickable element for each alphabet letter (and the # sign)', () => {
    'abcdefghijklmnopqrstuvwxyz#'.split('').forEach((letter) => {
      const have = <span>{letter.toUpperCase()}</span>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  it('applies filter when clicking a letter', () => {
    const letterEl = enzymeWrapper.findWhere(el => el.hasClass('letter')).first()
    expect(letterEl.exists()).toBe(true)

    letterEl.simulate('click')
    expect(props.onLetterFilterApply).toHaveBeenCalledWith(letterEl.text().toLowerCase())
  })
})
