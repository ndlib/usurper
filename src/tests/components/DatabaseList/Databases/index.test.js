import React from 'react'
import { shallow } from 'enzyme'
import Databases from 'components/DatabaseList/Databases'
import DatabaseSummary from 'components/DatabaseList/Databases/DatabaseSummary'

const setup = (props) => {
  return shallow(<Databases {...props} />)
}

let props
let enzymeWrapper
describe('components/DatabaseList/Databases', () => {
  beforeEach(() => {
    props = {
      list: [
        {
          sys: {
            id: 'very id',
          },
        },
        {
          sys: {
            id: 'much wow',
          },
        },
      ],
      titleLabel: 'A',
      filterValue: '',
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a DatabaseSummary for each item in list', () => {
    expect(props.list.length).toBeGreaterThan(0)
    props.list.forEach((record) => {
      const have = <DatabaseSummary item={record} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })
})
