import React from 'react'
import { shallow } from 'enzyme'

import UserMenu from 'components/Layout/Navigation/UserMenu/presenter'
import ButtonUserMenu from 'components/Layout/Navigation/UserMenu/ButtonUserMenu'
import MobileUserMenu from 'components/Layout/Navigation/UserMenu/MobileUserMenu'
import DropdownUserMenu from 'components/Layout/Navigation/UserMenu/DropdownUserMenu'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<UserMenu {...props} />)
}

describe('components/Layout/Navigation/UserMenu/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('buttons format', () => {
    beforeEach(() => {
      props = {
        format: 'buttons',
        subheading: 'Gobble gobble',
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ButtonUserMenu', () => {
      expect(enzymeWrapper.find(ButtonUserMenu).exists()).toBe(true)
    })

    it('should show subheading text', () => {
      expect(enzymeWrapper.findWhere((el) => el.text() === props.subheading).exists()).toBe(true)
    })
  })

  describe('mobile format', () => {
    beforeEach(() => {
      props = {
        format: 'mobile',
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ButtonUserMenu', () => {
      expect(enzymeWrapper.find(MobileUserMenu).exists()).toBe(true)
    })
  })

  describe('dropdown format', () => {
    beforeEach(() => {
      props = {
        format: 'dropdown',
      }
      enzymeWrapper = setup(props)
    })

    it('should render a DropdownUserMenu', () => {
      expect(enzymeWrapper.find(DropdownUserMenu).exists()).toBe(true)
    })
  })
})
