import React from 'react'
import { shallow } from 'enzyme'

import MobileUserMenu from 'components/Layout/Navigation/UserMenu/MobileUserMenu'
import Link from 'components/Interactive/Link'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<MobileUserMenu {...props} />)
}

describe('components/Layout/Navigation/MobileUserMenu', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      links: [
        {
          route: 'go-somewhere',
          key: 'Foo',
        },
        {
          route: 'do-something',
          key: 'Bar',
        },
        {
          route: 'be-amazed',
          key: 'Baz',
        },
      ],
    }
    enzymeWrapper = setup(props)
  })

  it('should render a Link for each set of link properties passed in', () => {
    props.links.forEach((link) => {
      expect(enzymeWrapper.containsMatchingElement(<Link to={link.route}>{link.key}</Link>)).toBe(true)
    })
  })

})
