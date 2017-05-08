import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import * as statuses from '../../../../constants/APIStatuses'
import Loading from '../../../../components/Messages/Loading'
import NotFound from '../../../../components/Messages/NotFound'
import Error from '../../../../components/Messages/Error'

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
        status: statuses.FETCHING,
      })
    })

    it('should render a loading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Loading/>)).toBe(true)
    })
  })

  describe('on page found', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        status: statuses.SUCCESS,
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
        status: statuses.NOT_FOUND,
      })
    })

    it('should render a not found component', () => {
      expect(enzymeWrapper.containsMatchingElement(<NotFound/>)).toBe(true)
    })
  })

  describe('on error loading', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        status: statuses.ERROR,
      })
    })

    it('should render an error component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Error/>)).toBe(true)
    })
  })
})
