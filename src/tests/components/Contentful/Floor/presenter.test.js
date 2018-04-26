import React from 'react'
import { shallow } from 'enzyme'
import FloorPresenter from '../../../../components/Contentful/Floor/presenter'
import LibMarkdown from '../../../../components/LibMarkdown'
import PageTitle from '../../../../components/PageTitle'
import Building from '../../../../components/Contentful/Building'
import Image from '../../../../components/Image'

const setup = (cfFloorEntry, extraData) => {
  const props = { cfFloorEntry, extraData }
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
    }, {
      title: 'itemTitle',
      call_number: 'call no',
      author: 'author',
      collection_display: 'collection'
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a top level div with correct key', () => {
    expect(enzymeWrapper.key() === 'ContentfulFloor_FakeId').toBe(true)
  })

  it('should renders the title of the content', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title="Fake Title" />)).toBe(true)
  })

  it('should render LibMarkdown for content', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>Fake short description</LibMarkdown>)).toBe(true)
  })

  it('should render Image for image', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={'Fake image'} />)).toBe(true)
  })

  it('should render a Building', () => {
    expect(enzymeWrapper.containsMatchingElement(<Building cfBuildingEntry={{}} />)).toBe(true)
  })

  it('should render the item title', () => {
    expect(enzymeWrapper.containsMatchingElement(<h2>itemTitle</h2>)).toBe(true)
  })

  it('should render the item call number', () => {
    expect(enzymeWrapper.containsMatchingElement(<p>call no</p>)).toBe(true)
  })
})
