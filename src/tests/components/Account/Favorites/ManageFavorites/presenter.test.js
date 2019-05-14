import React from 'react'
import { shallow } from 'enzyme'
import ManageFavorites from 'components/Account/Favorites/ManageFavorites/presenter.js'
import FavoritesList from 'components/Account/Favorites/FavoritesList'
import Search from 'components/Account/Favorites/Search'
import InlineLoading from 'components/Messages/InlineLoading'

import * as statuses from 'constants/APIStatuses'

import { KIND } from 'actions/personal/favorites'

const setup = (props) => {
  return shallow(<ManageFavorites {...props} />)
}

let enzymeWrapper
let props

describe('components/Account/Favorites/ManageFavorites/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('not saving', () => {
    beforeEach(() => {
      props = {
        saveState: statuses.SUCCESS,
        kind: KIND.databases,
        favorited: ['MySQL', 'DynamoDB', 'MongoDB'],
      }
      enzymeWrapper = setup(props)
    })

    it('should render a FavoritesList component with items', () => {
      const have = <FavoritesList kind={props.kind} items={props.favorited} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should render a Search component', () => {
      const search = enzymeWrapper.find(Search)
      expect(search.exists()).toBe(true)
      expect(search.props().kind).toEqual(props.kind)
      expect(search.props().existingFavorites).toEqual(props.favorited)
    })
  })

  describe('while saving', () => {
    beforeEach(() => {
      props = {
        saveState: statuses.FETCHING,
        kind: KIND.subjects,
        favorited: ['korean', 'japanese', 'german'],
      }
      enzymeWrapper = setup(props)
    })

    it('should show loading element', () => {
      expect(enzymeWrapper.containsMatchingElement(<InlineLoading />)).toBe(true)
    })

    it('should disable form elements', () => {
      const submit = enzymeWrapper.find('button[type="submit"]')
      const search = enzymeWrapper.find(Search)
      const favesList = enzymeWrapper.find(FavoritesList)
      expect(submit.props().disabled).toBe(true)
      expect(search.props().disabled).toBe(true)
      expect(favesList.props().disabled).toBe(true)
    })
  })
})
