import React from 'react'
import { shallow } from 'enzyme'

import ResourceList from 'components/Account/ResourceList'
import Presenter from 'components/Account/ResourceList/presenter'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ResourceList {...props} />)
}

describe('components/Account/ResourceList/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      loading: false,
      list: [
        {
          id: 111,
          title: 'foo',
        },
        {
          id: 222,
          title: 'bar',
        },
        {
          id: 333,
          title: 'baz',
        }
      ],
      type: 'pending',
    }
    enzymeWrapper = setup(props)
  })

  it('should render a Presenter with sorted items', () => {
    const found = enzymeWrapper.find(Presenter)
    expect(found.exists()).toBe(true)
    expect(found.props().listType).toEqual(props.type)

    // Default sort should be title asc. Expect a list sorted accordingly
    expect(found.props().list).toEqual([
      props.list[1],
      props.list[2],
      props.list[0],
    ])
  })

  it('should invert sort order when sortChange called on currently sorted field', () => {
    const expectTitleAscSort = [
      props.list[1],
      props.list[2],
      props.list[0],
    ]
    const expectTitleDescSort = [
      props.list[0],
      props.list[2],
      props.list[1],
    ]
    const expectIdAscSort = props.list

    const instance = enzymeWrapper.instance()
    // Check the initial state is what we expect so we know the test is valid
    expect(instance.state.sortDir).toEqual('asc')
    expect(instance.state.sortValue).toEqual('title')
    expect(instance.state.filteredList).toEqual(expectTitleAscSort)

    instance.sortChange(null, instance.state.sortValue)
    expect(instance.state.filteredList).toEqual(expectTitleDescSort)

    // Now change it back
    instance.sortChange(null, instance.state.sortValue)
    expect(instance.state.filteredList).toEqual(expectTitleAscSort)

    // Changing sort field should use asc even if that's the current direction
    instance.sortChange(null, 'id')
    expect(instance.state.sortDir).toEqual('asc')
    expect(instance.state.sortValue).toEqual('id')
    expect(instance.state.filteredList).toEqual(expectIdAscSort)
  })

  it('should sort when updating list', () => {
    const newList = [
      {
        id: 123456,
        title: 'zzz',
      },
      {
        id: 4444,
        title: 'aaa',
      },
      {
        id: 789,
        title: 'ddd',
      },
    ]
    enzymeWrapper.setProps({
      list: newList,
    })

    expect(enzymeWrapper.props().list).toEqual([
      newList[1],
      newList[2],
      newList[0],
    ])
  })

  it('should filter list on filterChange', () => {
    expect(enzymeWrapper.props().list).toEqual(expect.arrayContaining(props.list))

    const instance = enzymeWrapper.instance()
    instance.filterChange({
      target: {
        value: 'ba',
      },
    })
    expect(enzymeWrapper.props().list).toEqual([
      props.list[1],
      props.list[2],
    ])
  })
})
