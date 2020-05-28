import React from 'react'
import { shallow } from 'enzyme'
import FloorPresenter from 'components/Contentful/Floor/presenter'
import PageAlerts from 'components/Contentful/Alert/Page'
import LibMarkdown from 'components/LibMarkdown'
import ServicePoint from 'components/Contentful/ServicePoint'
import PageTitle from 'components/Layout/PageTitle'
import Image from 'components/Image'

const setup = (props) => {
  return shallow(<FloorPresenter {...props} />)
}

let enzymeWrapper
describe('components/Contentful/Floor/presenter', () => {
  const testAlerts = [
    {
      fields: {
        startTime: '1920-01-01',
        endTime: '2999-01-01',
        test: 'example',
      },
    },
    {
      fields: {
        startTime: '1920-01-01',
        endTime: '2999-01-01',
        blah: 'blah',
      },
    },
  ]

  beforeEach(() => {
    enzymeWrapper = setup({
      cfFloorEntry: {
        fields: {
          title: 'Fake Title',
          floorNumber: 'Fake Floor Number',
          slug: 'Fake slug',
          shortDescription: 'Fake short description',
          content: 'Fake content',
          image: 'Fake image',
          building: {
            fields: {
              title: 'building title',
              slug: 'buiding slug',
              primaryServicePoint: 'fakeservicepoint',
              mapLink: 'fake map',
              image: 'fake image',
            },
          },
          callNumberRange: 'fake call number',
          spacesText: 'fake spaces text',
          spacesLinks: 'fake spaces links',
          alerts: testAlerts,
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
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title='building title Fake Title' />)).toBe(true)
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

  it('should render PageAlerts', () => {
    const found = enzymeWrapper.find(PageAlerts)
    expect(found.exists()).toBe(true)
    expect(found.props().alerts).toEqual(testAlerts)
  })
})
