import React from 'react'
import { shallow } from 'enzyme'

import Tags from 'components/Interactive/Tags'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Tags {...props} />)
}

const tag1 = {
  key: 'music',
  value: 'Music Display Text',
}
const tag2 = {
  key: 'math',
  value: 'Mathematics Display Text',
}
const tag3 = {
  key: 'hgauprobpn; fç≈',
  value: 'My Favorite',
}
const allTags = [ tag1, tag2, tag3 ]

describe('components/Interactive/Tags', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('inline/with remove', () => {
    beforeEach(() => {
      const clickHandler = jest.fn()
      props = {
        groups: [
          { ...tag1, onClick: clickHandler },
          [
            { ...tag2, onClick: clickHandler },
            { ...tag3, onClick: clickHandler },
          ],
        ],
        hasRemove: true,
        inline: true,
      }
      enzymeWrapper = setup(props)
    })

    it('should render span as wrapper', () => {
      expect(enzymeWrapper.first().type()).toEqual('span')
    })

    it('should render UI for each tag', () => {
      expect(allTags.length).toBeGreaterThan(0)

      allTags.forEach((tag) => {
        const found = enzymeWrapper.findWhere(el => el.hasClass('itemTag') && el.html().includes(tag.value))
        expect(found.exists()).toBe(true)
      })
    })

    it('should call onClick handler when clicking a tag', () => {
      const testTag = props.groups[1][0]
      const found = enzymeWrapper.findWhere(el => el.hasClass('itemTag') && el.html().includes(testTag.value))
      expect(found.exists()).toBe(true)
      found.simulate('click')

      expect(testTag.onClick).toHaveBeenCalledWith(testTag)
    })
  })

  describe('not inline/no remove', () => {
    beforeEach(() => {
      const clickHandler = jest.fn()
      props = {
        groups: [
          [
            { ...tag2, onClick: clickHandler },
            { ...tag3, onClick: clickHandler },
          ],
          { ...tag1, onClick: clickHandler },
        ],
        hasRemove: false,
        inline: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should render div as wrapper', () => {
      expect(enzymeWrapper.first().type()).toEqual('div')
    })

    it('should render UI for each tag', () => {
      expect(allTags.length).toBeGreaterThan(0)

      allTags.forEach((tag) => {
        const found = enzymeWrapper.findWhere(el => el.hasClass('itemTag') && el.html().includes(tag.value))
        expect(found.exists()).toBe(true)
      })
    })

    it('should call onClick handler when clicking a tag', () => {
      const testTag = props.groups[1]
      const found = enzymeWrapper.findWhere(el => el.hasClass('itemTag') && el.html().includes(testTag.value))
      expect(found.exists()).toBe(true)
      found.simulate('click')

      expect(testTag.onClick).toHaveBeenCalledWith(testTag)
    })
  })

  describe('no tags', () => {
    beforeEach(() => {
      props = {
        groups: [],
      }
      enzymeWrapper = setup(props)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})