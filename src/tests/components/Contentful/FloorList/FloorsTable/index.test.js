import React from 'react'
import { shallow } from 'enzyme'
import Table from 'components/Table'
import FloorsTable from 'components/Contentful/FloorList/FloorsTable'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<FloorsTable {...props} />)
}

describe('components/Contentful/FloorList/FloorsTable', () => {
  beforeEach(() => {
    props = {
        floorData: [1, 2, 3, 4]
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a table with an array', () => {
    const table = enzymeWrapper.find(Table)
    expect(table.exists()).toBe(true)
  })
})
