import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount, render } from 'enzyme'
import { Droppable } from 'react-beautiful-dnd'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import FavoritesList from 'components/Account/Favorites/FavoritesList'
import FavoriteItem from 'components/Account/Favorites/FavoritesList/FavoriteItem'

import { KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

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
      { itemKey: 'test 1', title: 'some title', url: 'anywhere' },
      { itemKey: 'test 2', title: 'not some title', url: 'nowhere' },
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
          id={item.itemKey}
          kind={props.kind}
          url={item.url}
          title={item.title}
          index={index}
        />
      )).toBe(true)
    })
  })

  it('onRemoveFavorite should call updateList with 1 less items', () => {
    const instance = enzymeWrapper.instance()
    spy = jest.spyOn(instance.props, 'updateList')

    instance.onRemoveFavorite(props.kind, props.items[0].itemKey)

    const expected = props.items.slice(1)
    expect(spy).toHaveBeenCalledWith(expected)
  })

  it('onDragEnd should call updateList with reordered items', () => {
    const instance = enzymeWrapper.instance()
    spy = jest.spyOn(instance.props, 'updateList')

    instance.onDragEnd({
      source: {
        droppableId: props.kind,
        index: 0,
      },
      destination: {
        droppableId: props.kind,
        index: 1,
      },
      draggableId: props.items[0].itemKey,
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
      draggableId: props.items[0].itemKey,
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
      draggableId: props.items[0].itemKey,
    })

    expect(spy).not.toHaveBeenCalled()
  })

  // Skip tests because this has been disabled
  describe.skip('drag-and-drop to remove', () => {
    it('should render a droppable area to remove items', () => {
      const find = <Droppable droppableId='remove'>{expect.anything()}</Droppable>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should change style of remove area while dragging', () => {
      const instance = enzymeWrapper.instance()
      instance.onDragStart()

      const container  = enzymeWrapper.findWhere((el) => el.type() === Droppable && el.props().droppableId === 'remove')
      // react-beautiful-dnd uses a function for its children, so we need to pass some stuff to it
      const provided = {
        innerRef: React.createRef(),
      }
      const snapshot = {
        isDraggingOver: false,
      }
      const child = shallow(container.props().children(provided, snapshot))

      expect(child.hasClass('dnd-remove-area')).toBe(true)
      expect(child.hasClass('dragging')).toBe(true)
    })

    it('onDragEnd should remove item when dropped in remove area', () => {
      const instance = enzymeWrapper.instance()
      spy = jest.spyOn(instance.props, 'updateList')

      instance.onDragEnd({
        source: {
          droppableId: props.kind,
          index: 0,
        },
        destination: {
          droppableId: 'remove',
          index: 0,
        },
        draggableId: props.items[0].itemKey,
      })

      const expected = [ props.items[1] ]
      expect(spy).toHaveBeenCalledWith(expected)
    })
  })
})
