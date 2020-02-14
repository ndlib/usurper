import React from 'react'
import { shallow } from 'enzyme'

import ExhibitCard from 'components/ExhibitCard'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ExhibitCard {...props} />)
}

describe('components/ExhibitCard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('with feature flag on', () => {
    beforeEach(() => {
      global.__APP_CONFIG__.features.exhibitsEnabled = true
    })

    beforeEach(() => {
      props = {
        entry: {
          slug: 'i am slug',
          title: 'i r title',
          type: 'digital',
          linkTo: 'test/goto',
          image: {
            somethin: 'imagine',
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should render link to correct page', () => {
      const link = enzymeWrapper.find(Link).first()
      expect(link.exists()).toBe(true)
      expect(link.props().to).toEqual(props.entry.linkTo)
    })

    it('should render Image', () => {
      const image = enzymeWrapper.find(Image)
      expect(image.exists()).toBe(true)
      expect(image.props().cfImage).toEqual(props.entry.image)
    })

    it('should render <h2> tag', () => {
      const header = enzymeWrapper.find('h2')
      expect(header.exists()).toBe(true)
    })
  })

  describe('with feature flag off', () => {
    beforeEach(() => {
      global.__APP_CONFIG__.features.exhibitsEnabled = false
      props = {
        entry: {
          slug: 'slug',
          title: 'title',
          type: 'type',
          linkTo: 'nowhere',
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})
