import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/Home/Exhibits/presenter'
import ExhibitCard from 'components/ExhibitCard'
import Link from 'components/Interactive/Link'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Home/Exhibits/presenter', () => {
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
          linkTo: 'link.go',
        },
        {
          id: 'second entry',
          slug: 'escargo',
          title: 'WORLD',
          linkTo: 'somewhere',
        },
      ],
    }
    enzymeWrapper = setup(props)
  })

  it('should render link to exhibits landing page', () => {
    expect(enzymeWrapper.containsMatchingElement(<Link to='/exhibits'>{expect.anything()}</Link>)).toBe(true)
  })

  it('should render ExhibitCard component for each entry', () => {
    expect(props.entries.length).toBeGreaterThan(0)
    expect(enzymeWrapper.find(ExhibitCard)).toHaveLength(props.entries.length)

    props.entries.forEach(entry => {
      expect(enzymeWrapper.findWhere(el => el.type() === ExhibitCard && el.props().entry === entry).exists()).toBe(true)
    })
  })
})
