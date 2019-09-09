import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/Home/Events/presenter'
import EventCard from 'components/EventCard'
import Link from 'components/Interactive/Link'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Home/Events/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      entries: [
        {
          id: 'first entry',
          slug: 'snail',
          title: 'HELLO',
        },
        {
          id: 'second entry',
          slug: 'escargo',
          title: 'WORLD',
        },
      ],
    }
    enzymeWrapper = setup(props)
  })

  it('should render link to events landing page', () => {
    expect(enzymeWrapper.containsMatchingElement(<Link to='/events'>{expect.anything()}</Link>)).toBe(true)
  })

  it('should render EventCard component for each entry', () => {
    expect(props.entries.length).toBeGreaterThan(0)
    expect(enzymeWrapper.find(EventCard)).toHaveLength(props.entries.length)

    props.entries.forEach(entry => {
      expect(enzymeWrapper.findWhere(el => el.type() === EventCard && el.props().entry === entry).exists()).toBe(true)
    })
  })
})
