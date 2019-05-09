import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import InternalLink from 'components/Contentful/InternalLink'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<InternalLink {...props} />)
}

let enzymeWrapper
let props
describe('components/Contentful/InternalLink', () => {
  describe('using page title for link text', () => {
    beforeEach(() => {
      props = {
        cfEntry: {
          sys: {
            id: '1234',
          },
          fields: {
            title: 'Link Title - this is unimportant',
            page: {
              sys: {
                id: '5678',
              },
              fields: {
                slug: 'link-to-me',
                title: 'Show me please',
              },
            },
            usePageTitle: true,
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a link with appropriate url and text', () => {
      const find = <Link to={props.cfEntry.fields.page.fields.slug}>{props.cfEntry.fields.page.fields.title}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })

  describe('not using page title for link text', () => {
    beforeEach(() => {
      props = {
        cfEntry: {
          sys: {
            id: '1234',
          },
          fields: {
            title: 'Link Title - show me!',
            page: {
              sys: {
                id: '5678',
              },
              fields: {
                slug: 'link-to-me',
                title: 'Ignore this',
              },
            },
            usePageTitle: false,
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a link with appropriate url and text', () => {
      const find = <Link to={props.cfEntry.fields.page.fields.slug}>{props.cfEntry.fields.title}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })
})
