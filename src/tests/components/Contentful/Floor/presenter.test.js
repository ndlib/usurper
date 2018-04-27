import React from 'react'
import { shallow } from 'enzyme'
import FloorPresenter from '../../../../components/Contentful/Floor/presenter'
import ServicePoint from '../../../../components/Contentful/ServicePoint'
import Image from '../../../../components/Image'

const setup = (props) => {
  return shallow(<FloorPresenter {...props} />)
}

let enzymeWrapper
describe('components/Contentful/Floor/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      cfFloorEntry: {
        fields: {
          title: 'Fake Title',
          shortDescription: 'Fake short description',
          content: 'Fake content',
          image: 'Fake image',
          building: {},
        },
        sys: { id: 'FakeId' },
      },
      extraData: {
        title: 'itemTitle',
        call_number: 'call no',
        author: 'author',
        collection_display: 'collection',
      },
      cfServicePoint: {},
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a top level div with correct key', () => {
    expect(enzymeWrapper.key() === 'ContentfulFloor_FakeId').toBe(true)
  })

  it('should renders the title of the content', () => {
    expect(enzymeWrapper.children().someWhere(n => n.node.props.title === 'Fake Title')).toBe(true)
  })

  it('should render LibMarkdown for content', () => {
    expect(enzymeWrapper.find('LibMarkdown').children().node).toBe('Fake short description')
  })

  it('should render Image for image', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={'Fake image'} />)).toBe(true)
  })

  it('should render a ServicePoint', () => {
    expect(enzymeWrapper.containsMatchingElement(<ServicePoint cfServicePoint={{}} />)).toBe(true)
  })

  it('should render the item call number', () => {
    expect(enzymeWrapper.containsMatchingElement(<strong>call no</strong>)).toBe(true)
  })

  it('should render the item title', () => {
    expect(enzymeWrapper.containsMatchingElement(<i>itemTitle</i>)).toBe(true)
  })
})
