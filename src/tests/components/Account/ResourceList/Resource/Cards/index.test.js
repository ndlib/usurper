import React from 'react'
import { shallow } from 'enzyme'

import Cards from 'components/Account/ResourceList/Resource/Cards'
import Card from 'components/Account/ResourceList/Resource/Cards/Card'
import TitleCard from 'components/Account/ResourceList/Resource/Cards/TitleCard'
import FromIcon from 'components/Account/ResourceList/Resource/FromIcon'

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
            author: 'dennie moore',
            status: 'lost',
            loanDate: '2019-05-06',
            dueDate: '2019-05-07',
            returnDate: '2019-05-08',
            from: 'NDU',
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
          const find = (column === 'from'
            ? <Card value={props.item[column]}><FromIcon code={props.item[column]} /></Card>
            : <Card value={props.item[column]} />)
          expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
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
      const find = <Card value={'Not Available'} label={typeConstants[props.listType].columns['returnDate']} />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })
})
