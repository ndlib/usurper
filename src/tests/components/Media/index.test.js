import React from 'react'
import Link from 'components/Interactive/Link'
import { shallow } from 'enzyme'
import Media from 'components/Media'

let enzymeWrapper
const setup = (props) => {
  return shallow(<Media {...props} />)
}

describe('components/Media/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with data', () => {
    let data
    beforeEach(() => {
      data = [{ fields: { title: 'title', type: 'image', url: 'example.com' } }]
      enzymeWrapper = setup({ data: data })
    })

    it('creates link to data entry', () => {
      expect(enzymeWrapper.containsMatchingElement(
        <Link to={data[0].fields.url} className={data[0].fields.type}>{data[0].fields.title}</Link>)
      ).toBe(true)
    })
  })

  describe('with no data', () => {
    beforeEach(() => {
      enzymeWrapper = setup({ data: null })
    })

    it('returns null', () => {
      expect(enzymeWrapper.instance()).toBe(null)
    })
  })
})
