import React from 'react'
import { shallow } from 'enzyme'
import TableHeader from 'components/Table/TableHeader'

let enzymeWrapper
let props

const setup = (props) => {
    return shallow(<TableHeader {...props} />)
}

describe('components/Table/TableHeader', () => {
  beforeEach(() => {
    props = {
      columns: [
        { path: 'a', label: 'one' },
        { path: 'b', label: 'two' },
        { path: 'c', label: 'three' },
      ],
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render columns in a table', () => {
    const tableColumns = enzymeWrapper.find('th')
    expect(tableColumns.length).toEqual(props.columns.length)
  })
})