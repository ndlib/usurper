import React from 'react'
import { shallow } from 'enzyme'
import PagePresenter from '../../../../components/Contentful/News/presenter'
import ContactPoint from '../../../../components/Contentful/ContactPoint'
import PageTitle from '../../../../components/Layout/PageTitle'
import LibMarkdown from '../../../../components/LibMarkdown'
import Related from '../../../../components/Related'

const setup = (cfPageEntry) => {
  return shallow(<PagePresenter entry={cfPageEntry} />)
}

let enzymeWrapper
describe('components/Contentful/News/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      fields: {
        title: 'Fake Title',
        shortContent: 'Fake short content',
        content: 'Fake content',
        image: 'Fake image',
        author: 'Jon',
        publishedDate: '2017-05-08',
        relatedResources: ['Fake related resources'],
        relatedServices: ['Fake related services'],
        libguides: ['Fake related libguides'],
        searchPanelOpen: false,
      },
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should show the author of the news article', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title='Fake Title' itemProp='headline' subtitle='By Jon - May 8th 2017' />))
  })

  it('should render a top level div with correct class name', () => {
    expect(enzymeWrapper.is('.container-fluid')).toBe(true)
  })

  it('should render LibMarkdown for content', () => {
    expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>Fake content</LibMarkdown>)).toBe(true)
  })

  it('should render Related for related resources', () => {
    expect(enzymeWrapper.containsMatchingElement(<Related className="p-resources" title="Resources" showImages={false}>Fake related resources</Related>)).toBe(true)
  })
})
