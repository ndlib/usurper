import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Contentful/Page/presenter'

function setup(cfPageEntry) {
  const props = { cfPageEntry }
  return shallow(<PagePresenter {...props} />)
}


let enzymeWrapper
describe('components/Contentful/Page/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('on loading', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        isFetching: true,
      })
    })

    it('should render a loading message', () => {
      expect(enzymeWrapper.find('span').text()).toBe('loading')
    })
  })

  describe('on page found', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        isFetching: false,
        status: 'success',
        json: {
          fields: {
            title: 'Fake Title',
            shortContent: 'Fake short content',
            content: 'Fake content',
          }
        }
      })
    })

    it('should render a top level div with correct class name', () => {
      expect(enzymeWrapper.find('div').at(0).hasClass('ContentfulPage')).toBe(true)
    })

    it('should render a header with the title of the content', () => {
      expect(enzymeWrapper.find('h1').text()).toBe('Fake Title')
    })

    it('should render LibMarkdown for short content, then one for content', () => {
      expect(enzymeWrapper.find('LibMarkdown').at(0).childAt(0).text()).toBe('Fake short content')
      expect(enzymeWrapper.find('LibMarkdown').at(1).childAt(0).text()).toBe('Fake content')
    })
  })

  describe('on page not found', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        isFetching: false,
        status: 'not found',
      })
    })

    it('should render a top level div with correct class name', () => {
      expect(enzymeWrapper.find('div').at(0).hasClass('NotFound')).toBe(true)
    })

    it('should render an error message', () => {
      expect(enzymeWrapper.find('h1').text()).toBe('Page Not Found')
    })
  })

  describe('on error loading', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        isFetching: false,
        status: 'error',
      })
    })

    it('should render an error message', () => {
      expect(enzymeWrapper.find('span').text()).toBe('Error')
    })
  })
})
