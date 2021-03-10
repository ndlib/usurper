import React from 'react'
import { shallow } from 'enzyme'

import Cards from 'components/Account/ResourceList/Resource/Cards'
import Card from 'components/Account/ResourceList/Resource/Cards/Card'
import TitleCard from 'components/Account/ResourceList/Resource/Cards/TitleCard'
import FromIcon from 'components/Account/ResourceList/Resource/FromIcon'
import ToolTip from 'components/Account/ResourceList/Resource/ToolTip'

import typeConstants from 'components/Account/ResourceList/constants'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Cards {...props} />)
}

describe('components/Account/ResourceList/Resource/Cards', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  Object.keys(typeConstants).forEach((listType) => {
    describe(`listType - ${listType}`, () => {
      beforeEach(() => {
        props = {
          item: {
            fakeProp1: 'test',
            fakeProp2: 123,
            title: 'Do not need',
            author: 'dennie moore',
            status: 'lost',
            loanDate: '2019-05-06',
            dueDate: '2019-05-07',
            returnDate: '2019-05-08',
            from: 'ILL',
            renewable: false,
          },
          listType: listType,
        }
        enzymeWrapper = setup(props)
      })

      it('should render a title card', () => {
        expect(enzymeWrapper.containsMatchingElement(<TitleCard {...props.item} />)).toBe(true)
      })

      Object.keys(typeConstants[listType].columns).forEach((column) => {
        it('should render a card for column: ' + column, () => {
          if (column === 'from') {
            const find = <Card value={props.item[column]}><FromIcon code={props.item[column]} /></Card>
            expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
          } else if (column === 'title') {
            expect(enzymeWrapper.find(TitleCard).exists()).toBe(true)
          } else if (column === 'renewable') {
            expect(enzymeWrapper.find(ToolTip).exists()).toBe(true)
          } else {
            const found = enzymeWrapper.findWhere(el => {
              if (typeof el.props().value !== 'object') {
                return el.type() === Card && el.props().value === props.item[column]
              }
            })
            console.log(found.debug())
            expect(found.exists()).toBe(true)
          }
        })
      })
    })
  })

  describe('ILL item', () => {
    beforeEach(() => {
      props = {
        item: {
          author: 'dennie moore',
          loanDate: '2019-05-06',
          dueDate: '2019-05-07',
          returnDate: '2019-05-08',
          from: 'ILL',
        },
        listType: 'history',
      }
      enzymeWrapper = setup(props)
    })

    it('should render a title card', () => {
      expect(enzymeWrapper.containsMatchingElement(<TitleCard {...props.item} />)).toBe(true)
    })

    it('should render "Not Available" for return date', () => {
      const found = enzymeWrapper.findWhere(el => el.type() === Card && el.hasClass('returnDate'))
      expect(found.exists()).toBe(true)
      expect(found.props().value).toEqual('Not Available')
    })
  })

  describe('mobile view', () => {
    const listType = 'history'

    beforeEach(() => {
      props = {
        item: {
          author: 'dennie moore',
          loanDate: '2019-05-06',
          dueDate: '2019-05-07',
          from: 'NDU',
        },
        listType: listType,
        isMobileDetails: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should NOT render a title card', () => {
      expect(enzymeWrapper.find(TitleCard).exists()).toBe(false)
    })

    it('should NOT render a dueDate card', () => {
      const found = enzymeWrapper.findWhere(el => el.type() === Card && el.props().value === props.item['dueDate'])
      expect(found.exists()).toBe(false)
    })

    it('should NOT render a card for a column with no value', () => {
      const value = props.item['returnDate']
      expect(value).toBeFalsy()

      const found = enzymeWrapper.findWhere(el => el.type() === Card && el.props().value === value)
      expect(found.exists()).toBe(false)
    })

    Object.keys(typeConstants[listType].columns).forEach((column) => {
      // Omit columns that have already been tested above
      if (!['title', 'dueDate', 'returnDate'].includes(column)) {
        it('should render a card for column: ' + column, () => {
          const found = enzymeWrapper.findWhere(el => el.type() === Card && el.props().value === props.item[column])
          expect(found.exists()).toBe(true)
        })
      }
    })
  })
})
