import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import DatabaseStep from 'components/Account/Favorites/Wizard/DatabaseStep'
import Footer from 'components/Account/Favorites/Wizard/Footer'
import FavoritesList from 'components/Account/Favorites/FavoritesList'
import Search from 'components/Account/Favorites/Search'

import { KIND } from 'actions/personal/favorites'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (ownProps) => {
  store = mockStore()
  return shallow(<DatabaseStep store={store} {...ownProps} />)
}

describe('components/Account/Favorites/Wizard/DatabaseStep', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    const props = {
      data: [
        { itemKey: '55', order: 9999, url: 'www.fake.url', suggested: true },
        { itemKey: '16', title: 'stuff', suggested: true },
        { itemKey: '8', fake: 'whatever', suggested: true },
        { itemKey: '31561', title: 'blah', order: 1, suggested: true },
      ],
      step: 1,
      stepCount: 3,
      nextStep: jest.fn(),
      prevStep: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should contain descriptive header', () => {
    expect(enzymeWrapper.dive().find('#favoritesModalDesc').exists()).toBe(true)
  })

  it('should render a Footer component', () => {
    const have = enzymeWrapper.dive().find(Footer)
    expect(have.exists()).toBe(true)
    expect(have.props().step).toEqual(enzymeWrapper.props().step)
    expect(have.props().stepCount).toEqual(enzymeWrapper.props().stepCount)
  })

  it('should render a FavoritesList component with correct data', () => {
    expect(enzymeWrapper.dive().containsMatchingElement(
      <FavoritesList kind={KIND.databases} items={enzymeWrapper.props().data} />
    )).toBe(true)
  })

  it('should render a Search component with correct data', () => {
    expect(enzymeWrapper.dive().containsMatchingElement(
      <Search kind={KIND.databases} existingFavorites={enzymeWrapper.props().data} />
    )).toBe(true)
  })

  it('should pass on all added favorites in order when moving to next step', () => {
    const instance = enzymeWrapper.dive().instance()

    const expected = JSON.parse(JSON.stringify(enzymeWrapper.props().data))

    // Add one manually to make sure it gets saved as well
    const toAdd = { itemKey: 'fake key', title: 'fake title', url: null }
    expected.push(toAdd)
    instance.onAddFavorite(KIND.databases, toAdd.itemKey, toAdd.title, toAdd.url)

    // Expect that saved items should have their order overwritten with the index they are in the array
    for (let i = 0; i < expected.length; i++) {
      expected[i].order = i
    }

    instance.nextStep() // Note that the instance's nextStep() method is NOT the same as the props.nextStep passed in

    expect(enzymeWrapper.props().nextStep).toHaveBeenLastCalledWith(expected)
  })

  it('should not pass data when skipping step', () => {
    const instance = enzymeWrapper.dive().instance()
    instance.skipStep({ preventDefault: jest.fn() })

    expect(enzymeWrapper.props().nextStep).not.toHaveBeenLastCalledWith(expect.any(Array))
  })
})
