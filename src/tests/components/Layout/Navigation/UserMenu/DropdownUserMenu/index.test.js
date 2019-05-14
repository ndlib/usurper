import React from 'react'
import { shallow } from 'enzyme'

import DropdownUserMenu from 'components/Layout/Navigation/UserMenu/DropdownUserMenu'
import LogoutLink from 'components/Layout/Navigation/UserMenu/LogoutLink'
import Link from 'components/Interactive/Link'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<DropdownUserMenu {...props} />)
}

describe('components/Layout/Navigation/DropdownUserMenu', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('menu open', () => {
    beforeEach(() => {
      props = {
        open: true,
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

  describe('menu closed', () => {
    beforeEach(() => {
      props = {
        open: false,
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

    it('should not render anything', () => {
      expect(enzymeWrapper.text()).toBeFalsy()
    })
  })
})
