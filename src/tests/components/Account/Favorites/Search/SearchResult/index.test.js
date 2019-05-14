import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import SearchResult from 'components/Account/Favorites/Search/SearchResult'
import FavoriteIcon from 'components/Account/Favorites/FavoriteIcon'
import Link from 'components/Interactive/Link'

import { KIND } from 'actions/personal/favorites'

let enzymeWrapper

const setup = (props) => {
  return shallow(<SearchResult {...props} />)
}

describe('components/Account/Favorites/Search/SearchResult', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  const props = {
    kind: KIND.subjects,
    id: 'usuallyAContentfulId',
    title: 'Whatever it is',
    url: 'www.fake.url',
    disabled: false,
    onAddFavorite: jest.fn(),
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  it('should contain FavoriteIcon to add item', () => {
    expect(enzymeWrapper.containsMatchingElement(<FavoriteIcon kind={props.kind} />)).toBe(true)
  })

  it('should display result item title', () => {
    expect(enzymeWrapper.text().includes(props.title)).toBe(true)
  })
})
