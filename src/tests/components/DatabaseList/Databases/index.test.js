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
  describe('without filtering', () => {
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
        subjectFilter: [],
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

  describe('with subject filter', () => {
    beforeEach(() => {
      props = {
        list: [
          {
            sys: {
              id: 'many test',
            },
            fields: {
              subjects: [],
            },
          },
          {
            sys: {
              id: 'very id',
            },
            fields: {
              subjects: [
                {
                  sys: {
                    id: 'doge',
                  },
                },
              ],
            },
          },
          {
            sys: {
              id: 'much wow',
            },
            fields: {
              subjects: [],
            },
          },
        ],
        subjectFilter: ['doge', 'woof'],
        titleLabel: 'A',
        filterValue: '',
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should only render DatabaseSummary for records with matching subject', () => {
      const found = enzymeWrapper.find(DatabaseSummary)
      expect(found).toHaveLength(1)
      expect(found.props().item).toEqual(props.list[1])
    })
  })
})
