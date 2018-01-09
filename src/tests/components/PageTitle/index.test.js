import React from 'react'
import Related from '../../../components/Related'
import { shallow, configure } from 'enzyme'
import PageTitle from '../../../components/PageTitle'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let enzymeWrapper
const setup = (props) => {
  return shallow(<PageTitle {...props} />)
}

describe('components/PageTitle/index.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with title, tagline, subtitle', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        title: 'title',
        subtitle: 'subtitle',
        tagline: 'tagline',
        itemProp: 'itemProp'
      })
    })

    it('adds the h1 with the title', () => {
      expect(enzymeWrapper.containsMatchingElement(<h1 id='main-page-title' itemProp='itemProp'>title<small>subtitle</small></h1>)).toBe(true)
    })

    it('adds the small tag with the subtitle', () => {
      expect(enzymeWrapper.containsMatchingElement(<small>subtitle</small>)).toBe(true)
    })

    it('adds the div for the tagline', () => {
      expect(enzymeWrapper.containsMatchingElement(<div className='tagline'>tagline</div>)).toBe(true)
    })
  })

  describe('with no subititle', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        title: 'title',
        subtitle: '',
        tagline: 'tagline',
        itemProp: 'itemProp'
      })
    })

    it('adds the h1 with the title', () => {
      expect(enzymeWrapper.containsMatchingElement(<h1 id='main-page-title' itemProp='itemProp'>title</h1>)).toBe(true)
    })

    it('does not render the subtitle', () => {
      expect(enzymeWrapper.containsMatchingElement(<small>subtitle</small>)).toBe(false)
    })
  })

    describe('with no tagline', () => {
      beforeEach(() => {
        enzymeWrapper = setup({
          title: 'title',
          subtitle: '',
          tagline: '',
          itemProp: 'itemProp'
        })
      })

      it('does not render the tagline', () => {
        expect(enzymeWrapper.containsMatchingElement(<div className='tagline'>tagline</div>)).toBe(false)
      })
    })
})
