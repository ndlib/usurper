import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from 'components/Contentful/Page/presenter'
import ContactPoint from 'components/Contentful/ContactPoint'
import LibMarkdown from 'components/LibMarkdown'
import Related from 'components/Contentful/Related'
import Link from 'components/Interactive/Link'

const setup = (cfPageEntry) => {
  return shallow(<PagePresenter cfPageEntry={cfPageEntry} />)
}

let enzymeWrapper
describe('components/Contentful/Page/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      fields: {
        title: 'Fake Title',
        shortContent: 'Fake short content',
        body: 'Fake content',
        image: 'Fake image',
        relatedResources: ['Fake related resources'],
        relatedServices: ['Fake related services'],
        libguides: ['Fake related libguides'],
        searchPanelOpen: false,
        parentPage: {
          fields: {
            slug: 'fake-slug',
            title: 'Fake breadcrumb'
          }
        },
        alerts: [],
      },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render a top level div with correct class name', () => {
    expect(enzymeWrapper.is('.container-fluid')).toBe(true)
  })

  it('should renders the title of the content', () => {
    expect(enzymeWrapper.find('PageTitle').text()).toBe('<PageTitle />')
  })

  it('should render LibMarkdown for content', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>Fake content</LibMarkdown>)).toBe(true)
  })

  it('should render Related for related resources', () => {
    expect(enzymeWrapper.containsMatchingElement(<Related className="p-resources" title="Featured Resources" showImages={false}>Fake related resources</Related>)).toBe(true)
  })

  it('should render Related for related services', () => {
    expect(enzymeWrapper.containsMatchingElement(<Related className="p-services" title="Featured Services" showImages={true}>Fake related services</Related>)).toBe(true)
  })

  it('should render Related for libguides', () => {
    expect(enzymeWrapper.containsMatchingElement(<Related className="p-guides" title="Guides" showTitle={false} showImages={false}>Fake related libguides</Related>)).toBe(true)
  })

  it('should render ContactPoint twice', () => {
    expect(enzymeWrapper.find('ContactPoint').length).toBe(2)
  })

  it('should render a breadcrumb link', () => {
    expect(enzymeWrapper.containsMatchingElement(<Link to='fake-slug' className='breadcrumb'>Back to Fake breadcrumb</Link>)).toBe(true)
  })
})
