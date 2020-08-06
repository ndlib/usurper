import React from 'react'
import { shallow } from 'enzyme'
import Table from 'components/Table'
import TableHeader from 'components/Table/TableHeader'
import TableBody from 'components/Table/TableBody'

let enzymeWrapper
let props

const setup = (props) => {
    return shallow(<Table {...props} />)
}

describe('components/Table', () => {
  beforeEach(() => {
    props = {
      columns: [
        { path: 'foo' },
        { path: 'bar' },
      ],
      data: [1, 2, 3, 4]
    }
    enzymeWrapper = setup(props)
  })
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a table header with an array', () => {
    const tableHeader = enzymeWrapper.find(TableHeader)
    expect(tableHeader.exists()).toBe(true)
    expect(tableHeader.props().columns).toEqual(props.columns)
  })

  it('should render a table body with an array', () => {
    const tableBody = enzymeWrapper.find(TableBody)
    expect(tableBody.exists()).toBe(true)
    expect(tableBody.props().data).toEqual([1, 2, 3, 4])
  })
})