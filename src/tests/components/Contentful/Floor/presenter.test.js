import React from 'react'
import { shallow } from 'enzyme'
import FloorPresenter from '../../../../components/Contentful/Floor/presenter'
import Building from '../../../../components/Contentful/Building'
import Image from '../../../../components/Image'
import Related from '../../../../components/Related'
import * as statuses from '../../../../constants/APIStatuses'
import Loading from '../../../../components/Messages/Loading'
import NotFound from '../../../../components/Messages/NotFound'
import ErrorMessage from '../../../../components/Messages/Error'

const setup = (cfFloorEntry) => {
  const props = { cfFloorEntry }
  return shallow(<FloorPresenter {...props} />)
}


let enzymeWrapper
describe('components/Contentful/Floor/presenter', () => {
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
      expect(enzymeWrapper.containsMatchingElement(<ErrorMessage/>)).toBe(true)
    })
  })

  describe('on page found', () => {
    beforeEach(() => {
      enzymeWrapper = setup({
        status: statuses.SUCCESS,
        json: {
          fields: {
            title: 'Fake Title',
            shortDescription: 'Fake short description',
            content: 'Fake content',
            image: 'Fake image',
            building: {},
          },
          sys: { id: 'FakeId' }
        }
      })
    })

    it('should render a top level div with correct key', () => {
      expect(enzymeWrapper.key() === 'ContentfulFloor_FakeId').toBe(true)
    })

    it('should renders the title of the content', () => {
      expect(enzymeWrapper.children().someWhere(n => n.children().node === 'Fake Title')).toBe(true)
    })

    it('should render LibMarkdown for content', () => {
      expect(enzymeWrapper.find('LibMarkdown').children().node).toBe('Fake short description')
    })

    it('should render Image for image', () => {
      expect(enzymeWrapper.containsMatchingElement(<Image cfImage={ 'Fake image' } />)).toBe(true)
    })

    it('should render a Building', () => {
      expect(enzymeWrapper.containsMatchingElement(<Building cfBuildingEntry={{}} />)).toBe(true)
    })
  })
})
