import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { Draggable } from 'react-beautiful-dnd'

import FavoriteItem from 'components/Account/Favorites/FavoritesList/FavoriteItem'
import FavoriteIcon from 'components/Account/Favorites/FavoriteIcon'
import Link from 'components/Interactive/Link'

import { KIND } from 'actions/personal/favorites'

let enzymeWrapper

const setup = (props) => {
  return shallow(<FavoriteItem {...props} />)
}

describe('components/Account/Favorites/FavoritesList/FavoriteItem.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  const props = {
    kind: KIND.subjects,
    id: 'usuallyAContentfulId',
    index: 0,
    title: 'Whatever it is',
    url: 'www.fake.url',
    onRemoveFavorite: jest.fn(),
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  it('should render a draggable', () => {
    const draggable = enzymeWrapper.find(Draggable)
    expect(draggable.exists()).toBe(true)
    expect(draggable.props().draggableId).toBe(props.id)
    expect(draggable.props().isDragDisabled).toBe(false)
  })

  it('should contain FavoriteIcon to remove item', () => {
    const draggable = enzymeWrapper.find(Draggable)
    expect(draggable.exists()).toBe(true)
    const fnResults = shallow(draggable.prop('children')({ draggableProps: {}, innerRef: '' }, { isDragging: false }))

    expect(fnResults.containsMatchingElement(
      <FavoriteIcon kind={props.kind} />
    )).toBe(true)
  })

  it('should contain link to item', () => {
    const draggable = enzymeWrapper.find(Draggable)
    expect(draggable.exists()).toBe(true)
    const fnResults = shallow(draggable.prop('children')({ draggableProps: {}, innerRef: '' }, { isDragging: false }))

    expect(fnResults.containsMatchingElement(
      <Link to={props.url} aria-label={props.title}>{expect.any(String)}</Link>
    )).toBe(true)
  })

  it('should remove item when clicking remove icon', () => {
    const draggable = enzymeWrapper.find(Draggable)
    expect(draggable.exists()).toBe(true)
    const fnResults = shallow(draggable.prop('children')({ draggableProps: {}, innerRef: '' }, { isDragging: false }))

    const remove = fnResults.find('.remove-icon')
    expect(remove.exists()).toBe(true)
    remove.simulate('click')

    expect(props.onRemoveFavorite).toHaveBeenCalled()
  })
})
