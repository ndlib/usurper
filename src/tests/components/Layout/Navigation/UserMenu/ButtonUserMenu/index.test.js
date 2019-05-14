import React from 'react'
import { shallow } from 'enzyme'

import ButtonUserMenu from 'components/Layout/Navigation/UserMenu/ButtonUserMenu'
import LogoutLink from 'components/Layout/Navigation/UserMenu/LogoutLink'
import Link from 'components/Interactive/Link'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ButtonUserMenu {...props} />)
}

describe('components/Layout/Navigation/ButtonUserMenu', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      location: {
        pathname: 'we/are/here',
      },
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

  it('should render a LogoutLink', () => {
    expect(enzymeWrapper.find(LogoutLink).exists()).toBe(true)
  })
})
