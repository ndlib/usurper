import React from 'react'
import { shallow } from 'enzyme'
import SubjectSection from 'components/DatabaseList/Databases/BestBets/SubjectSection'
import DatabaseSummary from 'components/DatabaseList/Databases/DatabaseSummary'

const setup = (props) => {
  return shallow(<SubjectSection {...props} />)
}

let enzymeWrapper
let props

describe('components/DatabaseList/Databases/BestBets/SubjectSection', () => {
  beforeEach(() => {
    props = {
      databases: [
        {
          sys: {
            id: 'very id',
          },
          fields: {},
        },
        {
          sys: {
            id: 'much wow',
          },
          fields: {},
        },
      ],
      subjectName: 'doge',
      facets: [],
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a DatabaseSummary for each item in list', () => {
    expect(props.databases.length).toBeGreaterThan(0)
    props.databases.forEach((record) => {
      const have = <DatabaseSummary item={record} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  it('should render a heading with the subject name', () => {
    expect(enzymeWrapper.find('.subjectHeading').text()).toEqual(props.subjectName)
  })
})
