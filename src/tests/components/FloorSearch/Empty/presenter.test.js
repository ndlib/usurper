import React from 'react'
import { shallow } from 'enzyme'

import Empty from 'components/FloorSearch/Empty/presenter'
import SearchCallout from 'components/Contentful/Floor/SearchCallout/index'
import Contact from 'components/Contact/ServicePoint'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Empty {...props} />)
}

describe('components/FloorSearch/Empty/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      points: [
        {
          sys: { id: 'fdafsphna' },
          fields: {
            title: 'Point 1',
          },
        },
        {
          sys: { id: 'zjgpdpe' },
          fields: {
            title: 'Point 2',
          },
        },
      ],
      location: {
        search: '?foo=bar',
      },
    }
    enzymeWrapper = setup(props)
  })

  it('renders a SearchCallout component', () => {
    expect(enzymeWrapper.containsMatchingElement(<SearchCallout location={props.location} />)).toBe(true)
  })

  it('renders a title and Contact card for each service point', () => {
    expect.assertions(props.points.length * 2)
    props.points.forEach(point => {
      expect(enzymeWrapper.findWhere(el => el.text() === point.fields.title).exists()).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(<Contact servicePoint={point} />)).toBe(true)
    })
  })
})
