import React from 'react'
import { shallow } from 'enzyme'
import TableBody from 'components/Table/TableBody'

let enzymeWrapper
let props

const setup = (props) => {
    return shallow(<TableBody {...props} />)
}

describe('components/Table/TableBody', () => {
  beforeEach(() => {
    props = {
      columns: [
        { path: 'a', label: 'one' },
        { path: 'b', label: 'two' },
        { path: 'c', label: 'three' },
        ],
      data: [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
        ],
      className: 'floorsTable'
    }
    enzymeWrapper = setup(props)
  })
    
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a string in a cell', () => {
    const tableData = enzymeWrapper.findWhere(cell => cell.type() === 'td' && cell.text().includes(1))
    expect(tableData.exists()).toBe(true)
  })

  it('should render a cell in a table', () => {
    const tableRow = enzymeWrapper.find('td')
    expect(tableRow.exists('td')).toBe(true)
  })

it('should render a row in a table', () => {
    const tableColumn = enzymeWrapper.find('tr')
    expect(tableColumn.exists('tr')).toBe(true)
  })
})