import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Contentful/Page/presenter'
import Image from '../../../../components/Image'
import Related from '../../../../components/Related'
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
            image: 'Fake image',
            relatedResources: 'Fake related resources',
            relatedServices: 'Fake related services',
            libguides: 'Fake related libguides',
          }
        }
      })
    })

    it('should render a top level div with correct class name', () => {
      expect(enzymeWrapper.is('.container-fluid')).toBe(true)
    })

    it('should renders the title of the content', () => {
      expect(enzymeWrapper.children().someWhere(n => n.children().node === 'Fake Title')).toBe(true)
    })

    it('should render LibMarkdown for content', () => {
      expect(enzymeWrapper.find('LibMarkdown').children().node).toBe('Fake content')
    })

    it('should render Image for image', () => {
      expect(enzymeWrapper.containsMatchingElement(<Image cfImage={ 'Fake image' } />)).toBe(true)
    })

    it('should render Related for related resources', () => {
      expect(enzymeWrapper.find('Related').someWhere(n => n.children().node === 'Fake related resources')).toBe(true)
    })

    it('should render Related for related services', () => {
      expect(enzymeWrapper.find('Related').someWhere(n => n.children().node === 'Fake related services')).toBe(true)
    })

    it('should render Related for libguides', () => {
      expect(enzymeWrapper.find('Related').someWhere(n => n.children().node === 'Fake related libguides')).toBe(true)
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
