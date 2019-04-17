import React from 'react'
import { shallow } from 'enzyme'
import FloorPresenter from 'components/Contentful/Floor/presenter'
import LibMarkdown from 'components/LibMarkdown'
import ServicePoint from 'components/Contentful/ServicePoint'
import PageTitle from 'components/Layout/PageTitle'
import Image from 'components/Image'

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
      location: {
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
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title="Fake Title" />)).toBe(true)
  })

  it('should render LibMarkdown for content', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>Fake short description</LibMarkdown>)).toBe(true)
  })

  it('should render Image for image', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={'Fake image'} />)).toBe(true)
  })

  it('should render a ServicePoint', () => {
    expect(enzymeWrapper.containsMatchingElement(<ServicePoint cfServicePoint={{}} />)).toBe(true)
  })

})
