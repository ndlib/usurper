import React from 'react'
import { shallow } from 'enzyme'
import FloorPresenter from '../../../../components/Contentful/Floor/presenter'
import Building from '../../../../components/Contentful/Building'
import Image from '../../../../components/Image'

const setup = (cfFloorEntry) => {
  const props = { cfFloorEntry }
  return shallow(<FloorPresenter {...props} />)
}

let enzymeWrapper
describe('components/Contentful/Floor/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      fields: {
        title: 'Fake Title',
        shortDescription: 'Fake short description',
        content: 'Fake content',
        image: 'Fake image',
        building: {},
      },
      sys: { id: 'FakeId' },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
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
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={'Fake image'} />)).toBe(true)
  })

  it('should render a Building', () => {
    expect(enzymeWrapper.containsMatchingElement(<Building cfBuildingEntry={{}} />)).toBe(true)
  })
})
