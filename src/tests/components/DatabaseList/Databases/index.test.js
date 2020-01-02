import React from 'react'
import { shallow } from 'enzyme'
import Databases from 'components/DatabaseList/Databases'
import DatabaseSummary from 'components/DatabaseList/Databases/DatabaseSummary'
import BestBets from 'components/DatabaseList/Databases/BestBets'

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
            fields: {},
          },
          {
            sys: {
              id: 'much wow',
            },
            fields: {},
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
                  fields: {
                    id: 'doge',
                  },
                },
              ],
              bestBets: [
                {
                  sys: {
                    id: 'doge',
                  },
                  fields: {
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
              subjects: [
                {
                  sys: {
                    id: 'woof',
                  },
                  fields: {
                    id: 'woof',
                  },
                },
              ],
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

    it('should render BestBets with databases that match filter', () => {
      const bestBets = enzymeWrapper.find(BestBets)
      expect(bestBets.exists()).toBe(true)
      expect(bestBets.props().databases).toEqual([
        props.list[1],
        props.list[2],
      ])
    })

    it('should only render DatabaseSummary for records with matching subject that are not best bets', () => {
      const found = enzymeWrapper.find(DatabaseSummary)
      expect(found).toHaveLength(1)
      expect(found.props().item).toEqual(props.list[2])
    })
  })
})
