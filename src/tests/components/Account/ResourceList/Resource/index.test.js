import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import Resource, { ResourceContainer } from 'components/Account/ResourceList/Resource'
import Presenter from 'components/Account/ResourceList/Resource/presenter'

let enzymeWrapper
let props
let state
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<Resource store={store} {...props} />)
}

describe('components/Account/ResourceList/Resource', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with list type having actions', () => {
    beforeEach(() => {
      props = {
        item: {
          title: 'baz',
          barcode: 'supercalifragilisticexpialidocious',
        },
        listType: 'borrowed',
      }

      state = {
        renewal: {
          supercalifragilisticexpialidocious: {
            data: {
              renewStatus: 200,
              dueDate: '2999-01-01',
            }
          },
        },
      }

      enzymeWrapper = setup(state, props)
    })

    it('should render Presenter with correct item and type', () => {
      const expectedItem = {
        ...props.item,
        dueDate: state.renewal[props.item.barcode].data.dueDate,
      }
      const find = <Presenter item={expectedItem} listType={props.listType} />
      expect(enzymeWrapper.dive().dive().containsMatchingElement(find)).toBe(true)
    })

    it('should be able to toggle hidden state (for actions)', () => {
      props = {
        item: {
          title: 'stuff',
          barcode: 'things',
        },
        listType: 'borrowed',
      }
      enzymeWrapper = shallow(<ResourceContainer {...props} />)
      const instance = enzymeWrapper.instance()

      expect(instance.state.hidden).toEqual(true)
      instance.toggleHidden()
      expect(instance.state.hidden).toEqual(false)
      instance.toggleHidden()
      expect(instance.state.hidden).toEqual(true)
    })
  })
})
