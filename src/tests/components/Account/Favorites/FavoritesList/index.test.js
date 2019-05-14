import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import { Droppable } from 'react-beautiful-dnd'

import FavoritesList from 'components/Account/Favorites/FavoritesList'
import FavoriteItem from 'components/Account/Favorites/FavoritesList/FavoriteItem'

import { KIND } from 'actions/personal/favorites'

let enzymeWrapper
let spy

const setup = (props) => {
  return shallow(<FavoritesList {...props} />)
}

describe('components/Account/Favorites/FavoritesList/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    if (spy) {
      spy.mockReset()
      spy.mockRestore()
    }
  })

  const props = {
    kind: KIND.subjects,
    items: [
      { key: 'test 1', title: 'some title', url: 'anywhere' },
      { key: 'test 2', title: 'not some title', url: 'nowhere' },
    ],
    updateList: jest.fn(),
    disabled: false,
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  it('should render FavoriteItem components in a droppable', () => {
    const droppable = enzymeWrapper.findWhere((el) => {
      return el.type() === Droppable && el.props().droppableId === props.kind
    })
    expect(droppable.exists()).toBe(true)

    const fnResults = shallow(droppable.prop('children')({ droppableProps: {}, innerRef: '' }))
    const itemsFound = fnResults.find(FavoriteItem)

    expect(itemsFound).toHaveLength(props.items.length)
    props.items.forEach((item, index) => {
      expect(itemsFound.containsMatchingElement(
        <FavoriteItem
          id={item.key}
          kind={props.kind}
          url={item.url}
          title={item.title}
          index={index}
        />
      )).toBe(true)
    })
  })

  it('should render a droppable area to remove items', () => {
    const find = <Droppable droppableId='remove'>{expect.anything()}</Droppable>
    expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
  })

  it('onRemoveFavorite should call updateList with 1 less items', () => {
    const instance = enzymeWrapper.instance()
    spy = jest.spyOn(instance.props, 'updateList')

    instance.onRemoveFavorite(props.kind, props.items[0].key)

    const expected = props.items.slice(1)
    expect(spy).toHaveBeenCalledWith(expected)
  })

  it('onDragEnd should call updateList with reordered items', () => {
    const instance = enzymeWrapper.instance()
    spy = jest.spyOn(instance.props, 'updateList')

    instance.onDragEnd({
      destination: {
        index: 1,
      },
      source: {
        index: 0,
      },
      draggableId: props.items[0].key,
    })

    const expected = [ props.items[1], props.items[0] ]
    expect(spy).toHaveBeenCalledWith(expected)
  })

  it('should not update list if drag cancelled', () => {
    const instance = enzymeWrapper.instance()
    spy = jest.spyOn(instance.props, 'updateList')

    instance.onDragEnd({
      source: {
        index: 0,
      },
      draggableId: props.items[0].key,
    })

    expect(spy).not.toHaveBeenCalled()
  })

  it('should not update list if no change', () => {
    const instance = enzymeWrapper.instance()
    spy = jest.spyOn(instance.props, 'updateList')

    instance.onDragEnd({
      destination: {
        index: 0,
      },
      source: {
        index: 0,
      },
      draggableId: props.items[0].key,
    })

    expect(spy).not.toHaveBeenCalled()
  })
})
